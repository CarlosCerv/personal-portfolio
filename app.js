// FILE: app.js
// Main Express server for the personal portfolio website

const express = require('express');
const path = require('path');
const { marked } = require('marked');
const mongoose = require('mongoose');
const Post = require('./models/Post');

const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const MongoStore = require('connect-mongo').default || require('connect-mongo');
const mongoSanitize = require('express-mongo-sanitize');
const sanitizeHtml = require('sanitize-html');

const app = express();
app.set('trust proxy', 1); // Respect Vercel's proxy for express-rate-limit
const PORT = process.env.PORT || 3000;

// MongoDB connection string (use environment variable in production)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-portfolio';

// Admin password (in production, use environment variables and proper authentication)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Connect to MongoDB with better error handling
if (process.env.NODE_ENV !== 'test') {
  const connectOptions = {
    serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    connectTimeoutMS: 10000,
  };
  
  mongoose.connect(MONGODB_URI, connectOptions)
    .then(() => {
      console.log('SUCCESS: Connected to MongoDB');
      console.log(`   Database: ${MONGODB_URI.split('/').pop().split('?')[0]}`);
    })
    .catch(err => {
      console.error('❌ MongoDB connection error:', err.message);
      console.error('\n⚠️  DATABASE NOT CONNECTED!');
      console.error('   The app will run, but blog functionality will not work.');
    });
}

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ==========================================
// SECURITY MIDDLEWARE
// ==========================================

// 1. Helmet: Secure HTTP headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://api.github.com", "https://cdn.jsdelivr.net"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://carloscervantes.qa"],
      connectSrc: ["'self'", "https://api.github.com"],
    },
  },
}));

// 2. CORS: Restrict domain access
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? ['https://carloscervantes.qa', 'https://personal-portfolio-kappa-five-68.vercel.app'] : '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2b. Cache-Control for HTML responses (revalidate, don't cache stale)
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.match(/\.(css|js|png|jpg|svg|ico|webp|woff2?)$/)) {
    res.setHeader('Cache-Control', 'no-cache');
  }
  next();
});

// 3. Compression: Improve performance and obscure size
app.use(compression());

// 4. Rate Limiting: Prevent abuse/scraping
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply rate limiting to all requests
app.use(limiter);

// 5. NoSQL Injection Prevention
app.use(mongoSanitize({
  replaceWith: '_'
}));

// 6. Session Management for Admin Auth
app.use(session({
  secret: process.env.SESSION_SECRET || 'qa-consultant-super-secret-key-2026',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: MONGODB_URI,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60, // 1 day
    autoRemove: 'native'
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true on HTTPS
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Admin Authentication Middleware
const requireAdmin = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  res.redirect('/admin');
};

// Specific stricter limit for admin routes
const adminLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 login attempts per hour
  message: 'Too many login attempts, please try again later'
});
app.use('/admin', adminLimiter);


// Explicit favicon route — placed before static middleware and rate limiter scope
// to guarantee it is served correctly in all environments
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Serve remaining static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '7d',
  etag: true,
  lastModified: true
}));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure marked for Markdown rendering
marked.setOptions({
  breaks: true,
  gfm: true
});

// ==========================================
// SIMPLE IN-MEMORY CACHE
// ==========================================
const cache = {
  _store: {},
  get(key) {
    const item = this._store[key];
    if (!item) return null;
    if (Date.now() > item.expiresAt) { delete this._store[key]; return null; }
    return item.value;
  },
  set(key, value, ttlMs) {
    this._store[key] = { value, expiresAt: Date.now() + ttlMs };
  }
};

/**
 * Helper function to read and parse all blog posts from database
 * Returns an array of post objects sorted by date (newest first)
 */
async function getBlogPosts() {
  const cached = cache.get('blogPosts');
  if (cached) return cached;

  try {
    const posts = await Post.find({ published: true })
      .sort({ date: -1 })
      .lean();

    const result = posts.map(post => ({
      ...post,
      excerpt: post.content.trim().substring(0, 150).replace(/\n/g, ' ') + '...'
    }));

    cache.set('blogPosts', result, 5 * 60 * 1000); // 5 min TTL
    return result;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Helper function to get a single blog post by slug from database
 */
async function getBlogPost(slug) {
  try {
    return await Post.findOne({ slug, published: true }).lean();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

/**
 * Fetch README description for a repository
 */
async function getRepoDescription(username, repoName) {
  try {
    const readmeResponse = await fetch(
      `https://api.github.com/repos/${username}/${repoName}/readme`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    if (!readmeResponse.ok) {
      return null;
    }

    const readmeData = await readmeResponse.json();
    const readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf-8');

    // Extract first paragraph or first 200 characters
    const lines = readmeContent.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'));
    const firstParagraph = lines[0] || '';

    // Clean up markdown syntax and truncate
    const cleanText = firstParagraph
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove markdown links
      .replace(/[*_`]/g, '') // Remove markdown formatting
      .trim();

    return cleanText.length > 200 ? cleanText.substring(0, 200) + '...' : cleanText;
  } catch (error) {
    return null;
  }
}

/**
 * Helper function to fetch GitHub repositories dynamically
 */
async function getGitHubProjects() {
  const cached = cache.get('githubProjects');
  if (cached) return cached;

  try {
    const username = 'CarlosCerv';
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      ...(process.env.GITHUB_TOKEN && { 'Authorization': `token ${process.env.GITHUB_TOKEN}` })
    };

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=50`,
      { headers }
    );

    if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

    const repos = await response.json();
    const excludedRepos = ['personal-portfolio'];

    const filteredRepos = repos
      .filter(repo => !repo.private)
      .filter(repo => !excludedRepos.includes(repo.name))
      .slice(0, 30); // Cap at 30 to avoid excessive README fetches

    // Only fetch READMEs for repos without a description — limit concurrency
    const projectsPromises = filteredRepos.map(async (repo) => {
      let description = repo.description;
      if (!description || description.trim() === '') {
        const readmeDesc = await getRepoDescription(username, repo.name);
        description = readmeDesc || 'No description available';
      }
      return {
        name: repo.name,
        description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updated: repo.updated_at
      };
    });

    const result = await Promise.all(projectsPromises);
    cache.set('githubProjects', result, 10 * 60 * 1000); // 10 min TTL
    return result;

  } catch (error) {
    console.error('Error fetching from GitHub API:', error);
    return cache.get('githubProjects') || []; // Return stale cache if available
  }
}

// ==================== ROUTES ====================
app.get('/debug/db', (req, res) => {
  res.json({
    uri: process.env.MONGODB_URI ? process.env.MONGODB_URI.replace(/:([^:@]+)@/, ':***@') : 'MISSING',
    readyState: mongoose.connection.readyState
  });
});

/**
 * HOME PAGE - About Me
 */
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Home',
    currentPage: 'home'
  });
});

/**
 * PROJECTS PAGE - GitHub Projects
 */
app.get('/projects', async (req, res) => {
  try {
    const projects = await getGitHubProjects();
    res.render('projects', {
      title: 'Projects',
      currentPage: 'projects',
      projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.render('projects', {
      title: 'Projects',
      currentPage: 'projects',
      projects: [],
      error: 'Unable to load projects at this time.'
    });
  }
});

/**
 * BLOG PAGE - List of all blog posts
 */
app.get('/blog', async (req, res) => {
  const posts = await getBlogPosts();
  res.render('blog', {
    title: 'Blog',
    currentPage: 'blog',
    posts
  });
});

/**
 * SINGLE BLOG POST PAGE
 */
app.get('/blog/:slug', async (req, res) => {
  const { slug } = req.params;
  const post = await getBlogPost(slug);

  if (!post) {
    return res.status(404).render('404', {
      title: 'Post Not Found',
      currentPage: 'blog'
    });
  }

  // Convert markdown content to HTML
  const htmlContent = marked(post.content);

  res.render('post', {
    title: post.title,
    currentPage: 'blog',
    post: {
      ...post,
      htmlContent
    }
  });
});

/**
 * PODCAST PAGE
 */
app.get('/podcast', (req, res) => {
  res.render('podcast', {
    title: 'Podcast',
    currentPage: 'podcast'
  });
});

/**
 * HOBBIES PAGE
 */
app.get('/hobbies', (req, res) => {
  res.render('hobbies', {
    title: 'Hobbies',
    currentPage: 'hobbies'
  });
});

/**
 * Helper function to get hobby data
 */
function getHobbyData(slug) {
  const hobbies = {
    photography: {
      slug: 'photography',
      title: 'Photography',
      subtitle: 'Capturing moments and telling stories through the lens',
      icon: 'fas fa-camera',
      backgroundImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1600&h=400&fit=crop',
      description: 'Photography has been a creative passion of mine for several years. I started with basic smartphone photography and gradually evolved to using professional cameras. What began as a simple interest has transformed into a serious hobby where I constantly explore new techniques, compositions, and styles.',
      why: 'Photography allows me to see the world differently. It trains my eye to notice details, patterns, and beauty in everyday moments that others might overlook. Each photograph tells a story, preserves a memory, and captures emotions that words sometimes cannot express. It\'s my way of documenting life and sharing my perspective with others.',
      experience: 'I primarily focus on landscape and street photography, though I enjoy experimenting with different genres. I\'ve participated in local photography meetups in Guadalajara and have had some of my work featured in community exhibitions. The technical aspects of photography—understanding light, composition, and post-processing—continue to fascinate me.',
      highlights: [
        'Landscape photography in Jalisco\'s natural areas',
        'Street photography in Guadalajara\'s historic center',
        'Golden hour and blue hour photography',
        'Long exposure techniques',
        'Photo editing with Lightroom and Photoshop'
      ],
      goals: [
        'Build a cohesive portfolio of Jalisco landscapes',
        'Master advanced editing techniques',
        'Participate in photography competitions',
        'Create a photo blog to share my work'
      ],
      started: '2018',
      frequency: 'Weekly',
      level: 'Intermediate',
      equipment: [
        'Mirrorless camera',
        'Wide-angle lens',
        'Tripod for long exposures',
        'Adobe Lightroom',
        'Adobe Photoshop'
      ],
      resources: [
        'r/photography community',
        'YouTube photography channels',
        'Local photography workshops',
        'Instagram photography community'
      ]
    },
    gym: {
      slug: 'gym',
      title: 'Gym & Fitness',
      subtitle: 'Building strength, discipline, and a healthy lifestyle',
      icon: 'fas fa-dumbbell',
      backgroundImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=400&fit=crop',
      description: 'Fitness has become an integral part of my daily routine. I\'ve been committed to gym training for the past few years, focusing on both strength training and cardiovascular health. What started as a goal to improve physical health has evolved into a lifestyle that positively impacts my mental clarity, productivity, and overall well-being.',
      why: 'Regular exercise is essential for maintaining energy levels, especially in a demanding career like software quality assurance. The gym provides structure, discipline, and measurable progress. It\'s my time to disconnect from screens, challenge myself physically, and maintain the physical and mental stamina needed for long work hours and problem-solving.',
      experience: 'My fitness journey includes a mix of compound weightlifting movements, functional training, and cardio work. I follow structured workout programs and track my progress consistently. The discipline required in fitness training has translated well into my professional life, teaching me about consistency, goal-setting, and gradual improvement.',
      highlights: [
        'Consistent 5-day per week training schedule',
        'Progressive overload strength training',
        'HIIT cardio sessions',
        'Nutrition and meal planning',
        'Recovery and mobility work'
      ],
      goals: [
        'Achieve specific strength milestones',
        'Maintain consistent year-round training',
        'Improve flexibility and mobility',
        'Help others start their fitness journey'
      ],
      started: '2020',
      frequency: '5 times per week',
      level: 'Intermediate',
      equipment: [
        'Gym membership',
        'Workout tracking app',
        'Resistance bands',
        'Jump rope',
        'Foam roller'
      ],
      resources: [
        'Fitness YouTube channels',
        'MyFitnessPal for nutrition',
        'Personal training sessions',
        'Fitness subreddits'
      ]
    },
    cooking: {
      slug: 'cooking',
      title: 'Cooking',
      subtitle: 'Experimenting with flavors and creating delicious experiences',
      icon: 'fas fa-utensils',
      backgroundImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600&h=400&fit=crop',
      description: 'Cooking is my creative outlet beyond the digital world. I enjoy the entire process—from selecting fresh ingredients at local markets in Guadalajara to experimenting with different cuisines and techniques. The kitchen is where I can be creative, try new things, and share the results with family and friends.',
      why: 'Cooking is therapeutic and rewarding. There\'s something deeply satisfying about taking raw ingredients and transforming them into a delicious meal. It\'s also a practical skill that allows me to maintain a healthy diet, understand nutrition better, and explore cultures through their traditional dishes. Plus, sharing a home-cooked meal brings people together.',
      experience: 'I\'ve experimented with various cuisines including Italian, Asian, Mexican traditional dishes, and Mediterranean fare. I enjoy both following traditional recipes and improvising with available ingredients. Over time, I\'ve developed an intuition for flavor combinations and cooking techniques that make the process more enjoyable and less rigid.',
      highlights: [
        'Homemade pasta and Italian sauces',
        'Traditional Mexican dishes from Jalisco',
        'Asian stir-fries and noodle dishes',
        'Baking bread and pastries',
        'Experimenting with fusion cuisine'
      ],
      goals: [
        'Master knife skills and techniques',
        'Create a personal recipe collection',
        'Learn advanced baking techniques',
        'Host dinner parties for friends and family'
      ],
      started: '2019',
      frequency: '4-5 times per week',
      level: 'Intermediate',
      equipment: [
        'Chef\'s knife set',
        'Cast iron skillet',
        'Dutch oven',
        'Kitchen scale',
        'Food processor'
      ],
      resources: [
        'YouTube cooking channels',
        'Recipe websites and apps',
        'Local cooking classes',
        'Cookbooks collection'
      ]
    },
    reading: {
      slug: 'reading',
      title: 'Reading',
      subtitle: 'Exploring new worlds and expanding knowledge through books',
      icon: 'fas fa-book',
      backgroundImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&h=400&fit=crop',
      description: 'Reading has been a lifelong passion that continues to shape my thinking and worldview. I maintain a diverse reading list that includes science fiction, biographies, technical books, and non-fiction on various topics. Books are my gateway to different perspectives, ideas, and knowledge that I wouldn\'t encounter otherwise.',
      why: 'Reading expands my mind beyond my immediate experiences and profession. Science fiction stimulates creativity and imagination, biographies provide lessons from remarkable lives, and technical books keep me learning and growing professionally. Reading before bed helps me unwind, and it\'s a more enriching use of time compared to scrolling through social media.',
      experience: 'I try to read at least one book per month, though I often read multiple books simultaneously depending on my mood. I take notes on interesting concepts and maintain a reading journal. Some books have profoundly influenced my thinking about technology, society, and personal development.',
      highlights: [
        'Science fiction classics and contemporary works',
        'Biographies of tech pioneers and innovators',
        'Technical books on software testing and QA',
        'Philosophy and psychology',
        'Mexican and Latin American literature'
      ],
      goals: [
        'Read 20+ books per year',
        'Build a personal library',
        'Write book reviews and summaries',
        'Join or start a book club'
      ],
      started: 'Childhood',
      frequency: 'Daily',
      level: 'Advanced',
      equipment: [
        'Kindle e-reader',
        'Physical book collection',
        'Reading journal',
        'Goodreads account',
        'Library membership'
      ],
      resources: [
        'Goodreads recommendations',
        'r/books community',
        'Local bookstores in Guadalajara',
        'Book podcasts and reviews'
      ]
    },
    music: {
      slug: 'music',
      title: 'Music',
      subtitle: 'Finding rhythm, inspiration, and joy through sound',
      icon: 'fas fa-music',
      backgroundImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&h=400&fit=crop',
      description: 'Music has been a constant companion throughout my life. Whether I\'m playing guitar, discovering new artists, or attending live concerts, music provides a soundtrack to my experiences and a way to express emotions that words cannot capture. It\'s both a source of relaxation and inspiration.',
      why: 'Music has the unique power to change moods, evoke memories, and inspire creativity. Playing guitar is meditative and rewarding—it requires focus and practice, similar to coding, but engages a different part of my brain. Listening to music helps me concentrate during work, unwind after a long day, and connect with cultures and emotions across the world.',
      experience: 'I\'ve been playing guitar for several years, focusing mainly on acoustic fingerstyle and some electric guitar. I enjoy learning covers of my favorite songs and occasionally trying to write original pieces. My music taste is eclectic, ranging from rock and indie to electronic and Latin music. Live concerts in Guadalajara are a special experience that I try not to miss.',
      highlights: [
        'Acoustic guitar fingerstyle playing',
        'Attending live concerts and music festivals',
        'Discovering indie and underground artists',
        'Creating Spotify playlists for different moods',
        'Learning music theory and composition basics'
      ],
      goals: [
        'Write and record original songs',
        'Perform at an open mic night',
        'Master advanced guitar techniques',
        'Build a collection of quality instruments'
      ],
      started: '2017',
      frequency: '3-4 times per week',
      level: 'Intermediate',
      equipment: [
        'Acoustic guitar',
        'Electric guitar',
        'Guitar amplifier',
        'Audio interface',
        'Spotify Premium subscription'
      ],
      resources: [
        'YouTube guitar tutorials',
        'Ultimate Guitar tabs',
        'Music theory courses',
        'Local music venues in Guadalajara'
      ]
    },
    travel: {
      slug: 'travel',
      title: 'Travel',
      subtitle: 'Exploring new places and experiencing diverse cultures',
      icon: 'fas fa-plane',
      backgroundImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=400&fit=crop',
      description: 'Travel is my window to the world. Exploring new places, experiencing different cultures, and meeting people from diverse backgrounds has profoundly shaped who I am. Each trip teaches me something new about the world and myself, broadening my perspective and creating memories that last a lifetime.',
      why: 'Travel pushes me out of my comfort zone and challenges my assumptions about the world. It\'s humbling to experience how people live in different parts of the world, taste authentic cuisines, and see historical sites in person. Travel also provides a break from routine, sparking creativity and giving me stories and experiences to share.',
      experience: 'I\'ve traveled to various cities across Mexico and a few international destinations. I prefer a mix of planned activities and spontaneous exploration, often seeking out local experiences rather than typical tourist attractions. Photography and travel go hand-in-hand for me—I document my journeys through photos and travel journals.',
      highlights: [
        'Exploring Mexico\'s colonial cities and beaches',
        'Experiencing local food markets and street food',
        'Visiting historical and archaeological sites',
        'Meeting locals and learning about their culture',
        'Weekend trips from Guadalajara to nearby destinations'
      ],
      goals: [
        'Visit all states of Mexico',
        'International trips to South America and Europe',
        'Learn basic phrases in multiple languages',
        'Create a travel blog or vlog',
        'Take more extended trips beyond weekends'
      ],
      started: '2016',
      frequency: 'Monthly (local), Quarterly (extended)',
      level: 'Intermediate',
      equipment: [
        'Travel backpack',
        'Camera for photography',
        'Travel journal',
        'Maps and travel apps',
        'Power bank and adapters'
      ],
      resources: [
        'Travel blogs and vlogs',
        'TripAdvisor and Google Maps',
        'Local tourism websites',
        'Travel photography communities'
      ]
    }
  };

  return hobbies[slug] || null;
}

/**
 * Get all hobbies for related section
 */
function getAllHobbies() {
  return [
    { slug: 'photography', title: 'Photography', icon: 'fas fa-camera' },
    { slug: 'gym', title: 'Gym & Fitness', icon: 'fas fa-dumbbell' },
    { slug: 'cooking', title: 'Cooking', icon: 'fas fa-utensils' },
    { slug: 'reading', title: 'Reading', icon: 'fas fa-book' },
    { slug: 'music', title: 'Music', icon: 'fas fa-music' },
    { slug: 'travel', title: 'Travel', icon: 'fas fa-plane' }
  ];
}

/**
 * SINGLE HOBBY DETAIL PAGE
 */
app.get('/hobbies/:slug', (req, res) => {
  const { slug } = req.params;
  const hobby = getHobbyData(slug);

  if (!hobby) {
    return res.status(404).render('404', {
      title: 'Hobby Not Found',
      currentPage: 'hobbies'
    });
  }

  // Get related hobbies (all except current)
  const relatedHobbies = getAllHobbies().filter(h => h.slug !== slug);

  res.render('hobby-detail', {
    title: hobby.title,
    currentPage: 'hobbies',
    hobby,
    relatedHobbies
  });
});

// ==================== ADMIN ROUTES ====================

/**
 * Simple middleware to check admin password
 */
function checkAdminAuth(req, res, next) {
  const password = req.body.password || req.query.password || req.session?.password;

  if (password === ADMIN_PASSWORD) {
    if (!req.session) req.session = {};
    req.session.password = password;
    next();
  } else {
    res.status(401).render('admin-login', {
      title: 'Admin Login',
      currentPage: 'admin',
      error: req.body.password ? 'Invalid password' : null
    });
  }
}

/**
 * ADMIN LOGIN PAGE
 */
app.get('/admin', (req, res) => {
  // Check if already authenticated
  if (req.session && req.session.isAuthenticated) {
    return res.redirect('/admin/posts');
  }
  res.render('admin-login', {
    title: 'Admin Login',
    error: req.query.error
  });
});

/**
 * ADMIN - Login Process
 */
app.post('/admin/login', adminLimiter, (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    req.session.isAuthenticated = true;
    res.redirect('/admin/posts');
  } else {
    // Basic counter-measure for timing attacks
    setTimeout(() => {
      res.redirect('/admin?error=invalid');
    }, 500);
  }
});

/**
 * ADMIN - Logout
 */
app.get('/admin/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Could not log out.');
    }
    res.redirect('/admin');
  });
});

/**
 * ADMIN - Posts List
 */
app.get('/admin/posts', requireAdmin, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }).lean();
    res.render('admin-posts', {
      title: 'Gestión de Posts',
      posts: posts
    });
  } catch (error) {
    console.error('Error in /admin/posts:', error);
    res.status(500).send('Error interno del servidor');
  }
});

/**
 * ADMIN - New Post Form
 */
app.get('/admin/posts/new', requireAdmin, (req, res) => {
  res.render('admin-editor', {
    title: 'Nuevo Post',
    post: null
  });
});

/**
 * ADMIN - SAVE POST API
 */
app.post('/admin/posts/save', requireAdmin, express.json(), async (req, res) => {
  const { slug, title, date, author, tags, content, originalSlug } = req.body;

  if (!slug || !title || !content) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const cleanContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'span']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        'img': ['src', 'alt', 'class'],
        'span': ['class', 'style']
      }
    });

    const postData = {
      title,
      slug,
      content: cleanContent,
      published: true,
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(tag => tag.trim()) : []),
      author: author || 'Carlos Cervantes',
      date: date || new Date()
    };

    if (originalSlug) {
      if (originalSlug !== slug) {
         const existing = await Post.findOne({ slug });
         if (existing) return res.status(400).json({ error: 'El slug ya existe' });
      }
      await Post.findOneAndUpdate({ slug: originalSlug }, postData, { upsert: true });
    } else {
      const existing = await Post.findOne({ slug });
      if (existing) return res.status(400).json({ error: 'El slug ya existe' });
      await Post.create(postData);
    }

    cache.set('blogPosts', null, 0); 
    res.json({ success: true, slug });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: `Error al guardar: ${error.message}` });
  }
});

/**
 * ADMIN - Delete Post (API specific endpoint for the JS fetch)
 */
app.delete('/api/admin/posts/:slug', requireAdmin, async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({ slug: req.params.slug });
    
    if (!deletedPost) {
      return res.status(404).json({ success: false, message: 'Post no encontrado' });
    }

    cache.set('blogPosts', null, 0); 
    res.json({ success: true, message: 'Post eliminado correctamente' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * ADMIN - Edit Post Form
 */
app.get('/admin/posts/edit/:slug', requireAdmin, async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).lean();
    if (!post) return res.status(404).send('Post no encontrado');

    res.render('admin-editor', {
      title: 'Editar Post',
      post: post
    });
  } catch (error) {
    console.error('Error in /admin/posts/edit:', error);
    res.status(500).send('Error interno del servidor');
  }
});

/**
 * 404 ERROR HANDLER
 */
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found',
    currentPage: ''
  });
});

// Start the server only when this file is run directly (not required by Vercel or tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

// Export the app instance directly for Vercel compatibility
// Attach helpers to the app object so tests can still access them
app.getHobbyData = getHobbyData;
app.getAllHobbies = getAllHobbies;

module.exports = app;
