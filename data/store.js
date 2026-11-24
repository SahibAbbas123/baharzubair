const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'site_data.json');

const initialData = {
  admins: [],
  profile: {
    fullName: "Bahar Uddin Md. Zubair",
    shortName: "Bahar Zubair",
    headlineEn: "Assistant Professor & Head, Department of Accounting, Omargani M.E.S. College",
    headlineBn: "সহকারী অধ্যাপক ও বিভাগীয় প্রধান, হিসাববিজ্ঞান বিভাগ, ওমরগনি এম.ই.এস. কলেজ, চট্টগ্রাম",
    fullNameBn: "প্রফেসর বাহার উদ্দিন মোঃ জোবায়ের",
    shortNameBn: "বাহার জোবায়ের",
    avatarUrl: "/uploads/bahar_zubair_portrait.jpg",
    location: "Chattogram, Bangladesh",
    yearsOfExperience: "30+",
    studentsImpacted: "50,000+",
    youtubeSubscribers: "Growing Community",
    socialLinks: {
      youtube: "https://www.youtube.com/@baharzubair",
      facebook: "https://www.facebook.com/bahar.zubair",
      linkedin: "https://www.linkedin.com/in/bahar-zubair-4a2b241a7/"
    },
    bioCalling: {
      en: "For over three decades in the lecture halls of Chattogram, I have dedicated myself to demystifying the world of accounting and business studies. Teaching to me is far greater than textbooks and financial statements; it is the privilege of nurturing moral clarity, discipline, and practical wisdom in young minds who will build tomorrow's economy.",
      bn: "চট্টগ্রামের শ্রেণীকক্ষে তিন দশকেরও বেশি সময় ধরে আমি হিসাববিজ্ঞানের মতো প্রায়োগিক এবং জটিল বিষয়কে শিক্ষার্থীদের কাছে সহজ ও আনন্দময় করার নিরন্তর চেষ্টা করে আসছি। শিক্ষকতা কেবল একটি পেশা নয়, বরং তরুণ প্রজন্মের হৃদয়ে সততা, আর্থিক শৃঙ্খলা ও আত্মবিশ্বাস তৈরি করার এক আজীবন অঙ্গীকার।"
    },
    bioDigital: {
      en: "Education must never be constrained by physical walls. Through YouTube and digital lectures, I bring high-yield accounting principles, HSC board solutions, and conceptual clarity directly to learners across every district of Bangladesh—free and accessible to any student with curiosity and grit.",
      bn: "প্রযুক্তির যুগে শিক্ষাকে শুধু চার দেয়ালের ক্লাসরুমে সীমাবদ্ধ না রেখে, আমি ইউটিউবের মাধ্যমে হিসাববিজ্ঞানের মৌলিক নীতি, উচ্চমাধ্যমিক বোর্ডের প্রস্তুতি ও সঠিক বোঝাপড়া দেশের প্রত্যন্ত অঞ্চলের শিক্ষার্থীদের ঘরে ঘরে বিনামূল্যে পৌঁছে দেওয়ার উদ্যোগ নিয়েছি।"
    },
    bioCivic: {
      en: "Active citizenship is the natural extension of education. As a Trustee of REMA Trust and through leadership at Chattogram Laboratory School and College, I work to expand educational scholarships, community healthcare, and institutional excellence for those who need it most.",
      bn: "শিক্ষকতার পাশাপাশি রেমা (REMA) ট্রাস্ট এবং চট্টগ্রাম ল্যাবরেটরি স্কুল অ্যান্ড কলেজের গভর্নিং বডিতে থেকে সমাজের পিছিয়ে পড়া শিক্ষার্থীদের পাশে দাঁড়ানো, বৃত্তি সহায়তা ও সামাজিক মানোন্নয়নে সক্রিয় ভূমিকা রাখা আমার নাগরিক দায়িত্ব।"
    }
  },
  teachingPillars: [
    {
      id: "pillar-1",
      titleEn: "Conceptual Accounting Mastery",
      titleBn: "হিসাববিজ্ঞানের সহজ ও মৌলিক ভিত্তি",
      descEn: "Transforming abstract financial equations and ledger worksheets into crystal-clear mental frameworks that eliminate fear.",
      descBn: "কঠিন জাবেদা, খতিয়ান বা আর্থিক বিবরণীকে ভীতিমুক্ত করে বাস্তব উদাহরণের মাধ্যমে প্রাঞ্জলভাবে তুলে ধরা।"
    },
    {
      id: "pillar-2",
      titleEn: "Academic Excellence for HSC & Degree",
      titleBn: "এইচএসসি ও ডিগ্রি স্তরের ফলাফল নিশ্চিতকরণ",
      descEn: "Proven methodologies that have propelled tens of thousands of students into top public universities and corporate careers.",
      descBn: "বোর্ড পরীক্ষার সেরা প্রস্তুতি এবং উচ্চশিক্ষা ও ব্যবসায় প্রশাসনে ভর্তির মজবুত ভিত্তি গড়ে তোলা।"
    },
    {
      id: "pillar-3",
      titleEn: "Ethical Leadership & Character Building",
      titleBn: "নৈতিক মূল্যবোধ ও সততার শিক্ষা",
      descEn: "Teaching students that an accountant's true signature is unquestionable integrity, accountability, and discipline.",
      descBn: "হিসাবের প্রতিটি অঙ্কের সাথে সত্যবাদিতা, সততা ও মানবিক মূল্যবোধের নিবিড় চর্চা।"
    }
  ],
  socialInitiatives: [
    {
      id: "social-1",
      orgName: "REMA Trust",
      role: "Member & Trustee",
      roleBn: "সম্মানিত ট্রাস্টি সদস্য",
      tagline: "Social Welfare, Healthcare & Student Scholarships",
      descEn: "Driving philanthropic initiatives providing scholarships for underprivileged meritorious students, medical aid, and community assistance in Chattogram.",
      descBn: "অসচ্ছল অথচ মেধাবী শিক্ষার্থীদের শিক্ষাবৃত্তি, চিকিৎসা সহায়তা ও প্রান্তিক জনগোষ্ঠীর জীবনমান উন্নয়নে সক্রিয় অবদান।"
    },
    {
      id: "social-2",
      orgName: "Chattogram Laboratory School and College",
      role: "Governing Body Member & Patron",
      roleBn: "পরিচালনা পর্ষদের সম্মানিত সদস্য",
      tagline: "School Governance & Academic Quality Improvement",
      descEn: "Guiding institutional policy, modern curriculum delivery, teacher mentorship, and academic governance for future-ready school education.",
      descBn: "বিদ্যালয়ের শিক্ষাব্যবস্থার আধুনিকায়ন, শৃঙ্খলা রক্ষা ও গুণগত মান বৃদ্ধির নীতি নির্ধারণে প্রত্যক্ষ নেতৃত্ব।"
    },
    {
      id: "social-3",
      orgName: "Omargani M.E.S. College, Chattogram",
      role: "Assistant Professor & Head of Accounting",
      roleBn: "সহকারী অধ্যাপক ও বিভাগীয় প্রধান (হিসাববিজ্ঞান)",
      tagline: "Departmental Leadership & 30+ Years of Direct Mentorship",
      descEn: "Guiding faculty, organizing academic seminars, managing examination boards, and teaching generations of HSC and BBA students.",
      descBn: "বিভাগীয় নেতৃত্ব প্রদান, শিক্ষক-শিক্ষার্থী সমন্বয় এবং দীর্ঘ তিন দশক ধরে সরাসরি হাজার হাজার শিক্ষার্থীর শিক্ষাদান।"
    }
  ],
  featuredVideos: [
    {
      id: "vid-1",
      youtubeId: "VWwI4KN2N7M",
      titleEn: "Mastering Accounting Equations & Principles",
      titleBn: "হিসাব সমীকরণ ও প্রাথমিক ধারণার সহজ পাঠ",
      category: "Accounting Lectures"
    },
    {
      id: "vid-2",
      youtubeId: "iOLclVXkLEo",
      titleEn: "HSC Board Examination Problem Solving & Tips",
      titleBn: "বোর্ড পরীক্ষার সৃজনশীল প্রশ্ন সমাধান ও বিশেষ কৌশল",
      category: "Exam Prep"
    },
    {
      id: "vid-3",
      youtubeId: "r3St3_ro6eg",
      titleEn: "Worksheets & Financial Statements Step-by-Step",
      titleBn: "কার্যপত্র ও আর্থিক বিবরণীর পূর্ণাঙ্গ বিশ্লেষণ",
      category: "Core Curriculum"
    }
  ],
  articles: [
    {
      id: "art-1",
      slug: "why-accounting-is-the-language-of-life",
      isPlaceholder: true,
      titleEn: "[Sample Essay] Why Accounting is the Language of Real Life, Not Just Business",
      titleBn: "[নমুনা প্রবন্ধ] হিসাববিজ্ঞান কেন কেবল ব্যবসার নয়, জীবনেরও ভাষা",
      date: "2026-11-20",
      excerptEn: "(This is a starter sample essay provided to show how your essays will look on the site. You can edit or replace it with your own writing via the Admin Portal).",
      excerptBn: "(এটি ওয়েবসাইটের লেআউট প্রদর্শনের জন্য একটি নমুনা প্রবন্ধ। স্যার চাইলে অ্যাডমিন পোর্টাল থেকে যেকোনো সময় এটি সম্পাদনা বা মুছে নিজের প্রবন্ধ লিখতে পারবেন)।",
      contentEn: "Throughout my thirty years of standing before chalkboards and whiteboards in Chattogram, the most frequent hesitation I hear from young students is: 'Sir, I am afraid of large ledgers and balance sheets.'\n\nI always tell them: Accounting was never invented to intimidate. It was born out of humanity's need for honesty, order, and trust. When you write a debit and credit entry, you are honoring a universal principle: nothing comes without something given in return.\n\nWhen our young learners grasp this core truth, the panic evaporates. They stop memorizing and begin analyzing.",
      contentBn: "চট্টগ্রামের ক্লাসরুমে দীর্ঘ তিন দশক ধরে যখনই নতুন ব্যাচের শিক্ষার্থীদের সামনে দাঁড়িয়েছি, তাদের একটি সাধারণ ভয় দেখতে পেয়েছি—'স্যার, হিসাব মেলাতে গিয়ে ভুল হয়ে গেলে কী হবে?'\n\nআমি সবসময় বলি, হিসাববিজ্ঞান ভয়ের কোনো বিষয় নয়। এটি সততা, শৃঙ্খলা এবং আস্থার বিজ্ঞান। প্রতিটি জাবেদা বা লেনদেনের পেছনে একটি মৌলিক সত্য লুকিয়ে আছে: যা গ্রহণ করা হয়, তার বিপরীতে সমপরিমাণ কিছু ত্যাগও করতে হয়। এই সমতার শিক্ষাই জীবনের আসল শিক্ষা।"
    },
    {
      id: "art-2",
      slug: "democratizing-education-through-youtube",
      isPlaceholder: true,
      titleEn: "[Sample Essay] Beyond the Chalkboard: Reaching Students Beyond City Limits",
      titleBn: "[নমুনা প্রবন্ধ] চার দেয়ালের ক্লাসরুম পেরিয়ে: প্রত্যন্ত অঞ্চলের শিক্ষার্থীদের পাশে",
      date: "2026-11-10",
      excerptEn: "(Sample starter essay illustrating digital teaching reflections. Replace or customize anytime via Admin Portal).",
      excerptBn: "(অনলাইন শিক্ষা নিয়ে চিন্তাভাবনা ফুটিয়ে তোলার জন্য নমুনা প্রবন্ধ। অ্যাডমিন থেকে সহজেই নতুন লেখা যোগ করা যাবে)।",
      contentEn: "When colleges paused physical classes, many worried that rural students would fall irreversibly behind. That was the impetus behind the Bahar Zubair YouTube platform.\n\nRecording each lecture with clear voice and board-work felt like teaching directly into the living room of a student in a distant village. Today, receiving comments and messages from students across Bangladesh who passed with top grades brings a sense of fulfillment that words cannot capture.",
      contentBn: "করোনাকালে যখন শিক্ষাপ্রতিষ্ঠানগুলো বন্ধ ছিল, তখন সবচেয়ে বেশি ক্ষতিগ্রস্ত হচ্ছিল আমাদের মফস্বল ও প্রত্যন্ত অঞ্চলের শিক্ষার্থীরা। সেই সময় থেকেই ইউটিউব চ্যানেলে নিয়মিত ভিডিও আপলোড শুরু করি।\n\nআজ যখন দেখি দেশের প্রত্যন্ত কোনো গ্রাম থেকে একজন শিক্ষার্থী কমেন্ট করে জানায়—'স্যার আপনার ক্লাস দেখে আমি পরীক্ষায় এ প্লাস পেয়েছি'—একজন শিক্ষকের জীবনে এর চেয়ে বড় কোনো প্রাপ্তি হতে পারে না।"
    }
  ],
  gallery: [
    {
      id: "img-1",
      url: "/uploads/bahar_zubair_portrait.jpg",
      captionEn: "Professor Bahar Uddin Md. Zubair, Head of Accounting",
      captionBn: "সহকারী অধ্যাপক বাহার উদ্দিন মোঃ জোবায়ের"
    },
    {
      id: "img-2",
      url: "/uploads/thumb_VWwI4KN2N7M.jpg",
      captionEn: "Digital Whiteboard Lecture Session — Accounting Foundations",
      captionBn: "ডিজিটাল হোয়াইটবোর্ড ক্লাস — হিসাববিজ্ঞানের মূল ভিত্তি"
    },
    {
      id: "img-3",
      url: "/uploads/thumb_iOLclVXkLEo.jpg",
      captionEn: "Exam Preparation & Creative Board Problem Analysis",
      captionBn: "এইচএসসি বোর্ড পরীক্ষার সৃজনশীল প্রশ্ন সমাধান ক্লাস"
    },
    {
      id: "img-4",
      url: "/uploads/thumb_r3St3_ro6eg.jpg",
      captionEn: "Financial Statements and Ledger Masterclass",
      captionBn: "আর্থিক বিবরণী ও খতিয়ান বিশ্লেষণ পর্ব"
    },
    {
      id: "img-5",
      url: "/uploads/thumb_mnUgROi8Wuc.jpg",
      captionEn: "Conceptual Accounting Breakdown for College Learners",
      captionBn: "কলেজ শিক্ষার্থীদের জন্য হিসাববিজ্ঞানের সহজ ব্যাখ্যা"
    },
    {
      id: "img-6",
      url: "/uploads/thumb_vquSzQ63ZZ0.jpg",
      captionEn: "Step-by-Step Accounting Formula Walkthrough",
      captionBn: "ধাপে ধাপে হিসাববিজ্ঞানের সূত্র প্রয়োগ কৌশল"
    }
  ],
  contact: {
    email: "baharzubair@gmail.com",
    institution: "Omargani M.E.S. College, Zakir Hossain Road, Nasirabad, Chattogram",
    department: "Department of Accounting",
    officeHours: "Available for educational seminars, academic councils, and student guidance."
  }
};

// Determine writable path: in Vercel Serverless environment, /var/task is read-only.
// /tmp is the only writable directory on AWS Lambda / Vercel Serverless Functions.
const BUNDLED_DATA_FILE = path.join(__dirname, 'site_data.json');
const WRITABLE_DATA_FILE = process.env.VERCEL ? path.join('/tmp', 'site_data.json') : BUNDLED_DATA_FILE;

// Memory cache to maintain state across invocations in the same warm serverless instance
let memoryCache = null;

function getSiteData() {
  if (memoryCache) return memoryCache;

  // On Vercel, if /tmp/site_data.json doesn't exist yet, seed it from bundled site_data.json
  if (process.env.VERCEL && !fs.existsSync(WRITABLE_DATA_FILE)) {
    try {
      if (fs.existsSync(BUNDLED_DATA_FILE)) {
        const bundled = fs.readFileSync(BUNDLED_DATA_FILE, 'utf-8');
        fs.writeFileSync(WRITABLE_DATA_FILE, bundled, 'utf-8');
      }
    } catch (e) {
      console.warn("Could not copy bundled data to /tmp:", e);
    }
  }

  const targetPath = fs.existsSync(WRITABLE_DATA_FILE) ? WRITABLE_DATA_FILE : BUNDLED_DATA_FILE;

  if (fs.existsSync(targetPath)) {
    try {
      const raw = fs.readFileSync(targetPath, 'utf-8');
      memoryCache = JSON.parse(raw);
      return memoryCache;
    } catch (err) {
      console.error("Error reading site data, returning initial data", err);
    }
  }

  memoryCache = JSON.parse(JSON.stringify(initialData));
  return memoryCache;
}

function saveSiteData(data) {
  memoryCache = data;
  try {
    fs.writeFileSync(WRITABLE_DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn("Could not persist to disk, retained in memoryCache:", err.message);
  }
}

module.exports = {
  getSiteData,
  saveSiteData
};
