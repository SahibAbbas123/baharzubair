# Professor Bahar Uddin Md. Zubair (প্রফেসর বাহার উদ্দিন মোঃ জোবায়ের)
### Personal Portfolio, Academic Archive & Digital Classroom

[![Live on Vercel](https://img.shields.io/badge/Vercel-Live%20Website-black?logo=vercel)](https://baharzubair.vercel.app)
[![Admin Portal](https://img.shields.io/badge/Admin-Secure%20Portal-1E293B?logo=shield)](https://baharzubair.vercel.app/login.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An editorial, anti-AI-slop personal portfolio and academic knowledge repository for **Professor Bahar Uddin Md. Zubair** (Assistant Professor & Head, Department of Accounting, Omargani M.E.S. College, Chattogram).

---

## 🌟 Key Highlights

- **Anti-AI-Slop & Editorial Aesthetics:** Designed following the *Contra Labs Frontier Benchmark* and *Tommy Geoco Portfolio Standards*. Avoids neon cards, synthetic glows, arbitrary eyebrow badges, and robotic defaults. Built with warm tactile off-white paper canvas (`#FAF9F5`), **Newsreader** editorial serif typography, and balanced layouts.
- **Full Bilingual Support (EN / বাংলা):** Seamless client-side language switching between English and authentic Bengali typography (`Hind Siliguri`).
- **3-Pillar Story Narrative:**
  1. *The Calling:* 30+ years in the lecture hall, demystifying accounting and nurturing moral integrity.
  2. *Digital Reach:* Free YouTube education democratizing accounting for rural students across Bangladesh.
  3. *Civic Governance:* Active leadership at **REMA Trust** and **Chattogram Laboratory School and College**.
- **Secure Senior-Friendly Admin Portal (`/admin`):**
  - Protected behind bcrypt-hashed credentials and HTTP-only JWT sessions (`/login.html`).
  - Case-insensitive duplicate username collision guards.
  - Senior-friendly large Bengali UI controls for writing articles, uploading photos, and curating YouTube lectures.
- **Search & Micro-Interactions:**
  - `⌘K` / `Ctrl+K` instant client search modal across lectures, essays, and topics.
  - Top scroll reading progress bar.
  - Tabular numerals (`tabular-nums`) preventing layout shift.
  - Concentric nested corner radius equation ($R_{\text{inner}} = R_{\text{outer}} - P$).
  - Full Apple HIG touch target compliance (min $44\times 44\text{pt}$ bounding boxes).
- **SEO & AI Search Readiness:**
  - Standardized `/llms.txt` feed for Perplexity, Claude, and Gemini indexing.
  - Automated `sitemap.xml`, `robots.txt`, Schema.org `Person` JSON-LD, and OpenGraph social cards.
  - Comprehensive SVG/PNG favicon suite.

---

## 📂 Project Structure

```
BaharZubairSite/
├── data/
│   ├── site_data.json         # Persistent JSON database (articles, videos, gallery, profile)
│   └── store.js               # Data abstraction and file I/O layer
├── public/
│   ├── index.html             # Public portfolio frontend (Bilingual)
│   ├── admin.html             # Senior-friendly content management dashboard
│   ├── login.html             # Secure authentication gateway
│   ├── llms.txt               # AI crawler knowledge summary
│   ├── robots.txt             # Search engine crawler policies
│   ├── sitemap.xml            # Canonical search engine sitemap
│   ├── favicon.svg            # Crisp editorial monogram favicon
│   └── uploads/               # User-uploaded images & lecture media
├── scripts/
│   └── audit_site.js          # Automated headless Playwright inspection suite
├── server.js                  # Express backend with auth, uploads, and API endpoints
├── vercel.json                # Vercel serverless deployment routing
└── eu_org_setup_guide.md      # Setup guide for free eu.org domain mapping
```

---

## 🚀 Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SahibAbbas123/baharzubair.git
   cd baharzubair
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   Open [http://localhost:3080](http://localhost:3080) to view the public site or [http://localhost:3080/login.html](http://localhost:3080/login.html) to enter the Admin Portal.

4. **Run Headless Browser Audit:**
   ```bash
   node scripts/audit_site.js
   ```

---

## 🌐 Production Deployments

- **Production URL:** [https://baharzubair.vercel.app](https://baharzubair.vercel.app)
- **Admin Gateway:** [https://baharzubair.vercel.app/login.html](https://baharzubair.vercel.app/login.html)

---

## 📜 License
Released under the [MIT License](LICENSE).
