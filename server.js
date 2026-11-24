const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getSiteData, saveSiteData } = require('./data/store');

const app = express();
const PORT = process.env.PORT || 3080;
const JWT_SECRET = process.env.JWT_SECRET || 'bahar_zubair_portfolio_secure_secret_2026';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'photo-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Auth Middleware
function requireAuth(req, res, next) {
  const token = req.cookies.admin_token || req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    if (req.path.startsWith('/api/')) {
      return res.status(401).json({ error: 'Unauthorized. Please login.' });
    }
    return res.redirect('/login.html');
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminUser = decoded;
    next();
  } catch (err) {
    if (req.path.startsWith('/api/')) {
      return res.status(401).json({ error: 'Session expired. Please login again.' });
    }
    return res.redirect('/login.html');
  }
}

// Check auth status
app.get('/api/auth/status', (req, res) => {
  const data = getSiteData();
  const hasAdmin = Array.isArray(data.admins) && data.admins.length > 0;
  const token = req.cookies.admin_token;
  let loggedIn = false;
  let username = null;
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      loggedIn = true;
      username = decoded.username;
    } catch (e) {}
  }
  res.json({ hasAdmin, loggedIn, username });
});

// Admin Sign Up (Allowed only if no admins exist or with setup secret)
app.post('/api/auth/register', async (req, res) => {
  try {
    const data = getSiteData();
    data.admins = data.admins || [];
    const { username, password, setupKey } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const cleanUsername = username.trim();

    // Check if username is already taken (case-insensitive)
    const existingUser = data.admins.find(
      a => a.username.toLowerCase() === cleanUsername.toLowerCase()
    );
    if (existingUser) {
      return res.status(409).json({ 
        error: `Username "${cleanUsername}" is already taken. Please choose another username or log in.` 
      });
    }

    if (data.admins.length > 0 && setupKey !== 'admin-invite-bahar') {
      return res.status(403).json({ error: 'An admin already exists. Please login instead.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = {
      id: 'admin-' + Date.now(),
      username: username.trim(),
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    data.admins.push(newAdmin);
    saveSiteData(data);

    const token = jwt.sign({ id: newAdmin.id, username: newAdmin.username }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('admin_token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ success: true, message: 'Account created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const data = getSiteData();
    const { username, password } = req.body;
    const admin = (data.admins || []).find(a => a.username.toLowerCase() === username.toLowerCase().trim());

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials. User not found.' });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('admin_token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ success: true, message: 'Logged in successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('admin_token');
  res.json({ success: true });
});

// Public API
app.get('/api/data', (req, res) => {
  const data = getSiteData();
  const safeData = { ...data };
  delete safeData.admins; // Never expose admin credentials or hashes
  res.json(safeData);
});

// Protected Mutating APIs
app.post('/api/profile', requireAuth, (req, res) => {
  try {
    const data = getSiteData();
    data.profile = { ...data.profile, ...req.body };
    saveSiteData(data);
    res.json({ success: true, profile: data.profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/articles', requireAuth, (req, res) => {
  try {
    const data = getSiteData();
    const { id, titleEn, titleBn, excerptEn, excerptBn, contentEn, contentBn, date, isPlaceholder } = req.body;
    
    if (id) {
      const index = data.articles.findIndex(a => a.id === id);
      if (index !== -1) {
        data.articles[index] = {
          ...data.articles[index],
          titleEn: titleEn || data.articles[index].titleEn,
          titleBn: titleBn || data.articles[index].titleBn,
          excerptEn: excerptEn || data.articles[index].excerptEn,
          excerptBn: excerptBn || data.articles[index].excerptBn,
          contentEn: contentEn || data.articles[index].contentEn,
          contentBn: contentBn || data.articles[index].contentBn,
          date: date || data.articles[index].date,
          isPlaceholder: isPlaceholder !== undefined ? isPlaceholder : false
        };
      }
    } else {
      const newArticle = {
        id: 'art-' + Date.now(),
        slug: (titleEn || 'article').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        titleEn,
        titleBn,
        excerptEn,
        excerptBn,
        contentEn,
        contentBn,
        date: date || new Date().toISOString().split('T')[0],
        isPlaceholder: false
      };
      data.articles.unshift(newArticle);
    }
    
    saveSiteData(data);
    res.json({ success: true, articles: data.articles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/articles/:id', requireAuth, (req, res) => {
  try {
    const data = getSiteData();
    data.articles = data.articles.filter(a => a.id !== req.params.id);
    saveSiteData(data);
    res.json({ success: true, articles: data.articles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/videos', requireAuth, (req, res) => {
  try {
    const data = getSiteData();
    const { id, youtubeId, titleEn, titleBn, category } = req.body;
    if (id) {
      const idx = data.featuredVideos.findIndex(v => v.id === id);
      if (idx !== -1) {
        data.featuredVideos[idx] = { ...data.featuredVideos[idx], youtubeId, titleEn, titleBn, category };
      }
    } else {
      data.featuredVideos.push({
        id: 'vid-' + Date.now(),
        youtubeId,
        titleEn,
        titleBn,
        category: category || "Lecture"
      });
    }
    saveSiteData(data);
    res.json({ success: true, featuredVideos: data.featuredVideos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/videos/:id', requireAuth, (req, res) => {
  try {
    const data = getSiteData();
    data.featuredVideos = data.featuredVideos.filter(v => v.id !== req.params.id);
    saveSiteData(data);
    res.json({ success: true, featuredVideos: data.featuredVideos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/upload', requireAuth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }
    const fileUrl = '/uploads/' + req.file.filename;
    const { captionEn, captionBn, setAsAvatar } = req.body;
    const data = getSiteData();

    if (setAsAvatar === 'true' || setAsAvatar === true) {
      data.profile.avatarUrl = fileUrl;
    }

    const newPhoto = {
      id: 'img-' + Date.now(),
      url: fileUrl,
      captionEn: captionEn || "Professor Bahar Zubair Photo",
      captionBn: captionBn || "সহকারী অধ্যাপক বাহার জোবায়ের ছবি"
    };
    data.gallery.unshift(newPhoto);
    saveSiteData(data);

    res.json({ success: true, photo: newPhoto, avatarUrl: data.profile.avatarUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/gallery/:id', requireAuth, (req, res) => {
  try {
    const data = getSiteData();
    const item = data.gallery.find(g => g.id === req.params.id);
    if (item && item.url && item.url.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, 'public', item.url);
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (e) {}
      }
    }
    data.gallery = data.gallery.filter(g => g.id !== req.params.id);
    saveSiteData(data);
    res.json({ success: true, gallery: data.gallery });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Route Protected with requireAuth
app.get('/admin', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Catch-all route
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bahar Zubair Site & Secure Admin running on http://localhost:${PORT}`);
  });
}

module.exports = app;
