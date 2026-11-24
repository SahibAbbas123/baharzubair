const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.message));

  console.log('--- 1. Auditing Public Site Desktop (1280x800) ---');
  await page.goto('http://localhost:3080/', { waitUntil: 'networkidle' });

  // Heuristic & HIG Audit
  const auditResults = await page.evaluate(() => {
    const issues = [];
    
    // Check Touch Targets / Clickable items under 44x44
    const buttonsAndLinks = document.querySelectorAll('button, a, input');
    let smallTargets = 0;
    buttonsAndLinks.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && (rect.width < 32 || rect.height < 32)) {
        smallTargets++;
      }
    });

    // Check Eyebrow labels
    const allCapsTags = Array.from(document.querySelectorAll('*')).filter(el => {
      return el.children.length === 0 && 
             el.textContent.trim().length > 0 && 
             el.textContent.trim().length < 35 && 
             el.textContent === el.textContent.toUpperCase() && 
             /^[A-Z\s\/\-_\[\]]+$/.test(el.textContent.trim());
    }).map(e => e.textContent.trim());

    // Check image missing alt
    const imagesWithoutAlt = Array.from(document.querySelectorAll('img')).filter(img => !img.alt || img.alt.trim() === '').length;

    // Check nested radius distortion on portrait
    const portraitContainer = document.querySelector('.relative.w-64');
    let radiusCheck = 'N/A';
    if (portraitContainer) {
      const outerR = window.getComputedStyle(portraitContainer).borderRadius;
      const innerImg = portraitContainer.querySelector('div');
      const innerR = innerImg ? window.getComputedStyle(innerImg).borderRadius : 'None';
      radiusCheck = `Outer: ${outerR}, Inner: ${innerR}`;
    }

    return {
      smallTargets,
      allCapsTags,
      imagesWithoutAlt,
      radiusCheck,
      documentTitle: document.title
    };
  });

  console.log('Desktop Audit Results:', JSON.stringify(auditResults, null, 2));

  console.log('--- 2. Auditing Public Site Mobile Breakpoint (375x667 - iPhone SE) ---');
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(500);

  const mobileScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log('Mobile horizontal overflow detected:', mobileScrollWidth);

  console.log('--- 3. Auditing Admin & Login Flow ---');
  await page.goto('http://localhost:3080/admin', { waitUntil: 'networkidle' });
  const redirectedUrl = page.url();
  console.log('Admin unauthorized redirect target:', redirectedUrl);

  await browser.close();
  console.log('Console Errors captured:', consoleErrors);
})();
