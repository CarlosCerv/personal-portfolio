// FILE: app.js
// Main Express server for the personal portfolio website

const express = require('express');
const path = require('path');
const { marked } = require('marked');
const mongoose = require('mongoose');
const Post = require('./models/Post');
const User = require('./models/User');
const Comment = require('./models/Comment');
const Hobby = require('./models/Hobby');
const bcrypt = require('bcrypt');
const { getHobbyData, getAllHobbies } = require('./data/hobbies');

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
const SITE_NAME = 'Carlos Cervantes';
const SITE_TITLE = 'Quality Assurance y Performance Engineering';
const DEFAULT_SITE_DESCRIPTION = 'Consultoría de QA, automatización y performance engineering para productos digitales que necesitan escalar con confianza.';
const GITHUB_USERNAME = 'CarlosCerv';
const PUBLIC_DIR = path.join(__dirname, 'public');
const FAVICON_PATH = path.join(PUBLIC_DIR, 'favicon.ico');
const BASE_URL = process.env.SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
  || (process.env.NODE_ENV === 'production' ? 'https://carloscervantes-qa.vercel.app' : 'http://localhost:3000');

// MongoDB connection string (use environment variable in production)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-portfolio';

// Admin password (in production, use environment variables and proper authentication)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

function truncateText(text = '', maxLength = 160) {
  const clean = String(text).replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.substring(0, maxLength - 1).trim()}…`;
}

function buildMeta({
  title,
  description,
  path = '/',
  image,
  type = 'website'
}) {
  const normalizedPath = path === '/' ? '' : path;
  const metaTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | ${SITE_TITLE}`;

  return {
    metaTitle,
    metaDescription: truncateText(description || DEFAULT_SITE_DESCRIPTION),
    metaUrl: `${BASE_URL}${normalizedPath || '/'}`.replace(/([^:]\/)\/+/g, '$1'),
    metaImage: image || `${BASE_URL}/images/og-image.png`,
    metaImageAlt: `${title || SITE_NAME} - vista previa del sitio`,
    metaType: type
  };
}

function buildAuthMeta(path, title, description) {
  return buildMeta({ title, description, path });
}

function renderPage(res, view, locals) {
  res.render(view, locals);
}

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
      imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://carloscervantes-qa.vercel.app"],
      connectSrc: ["'self'", "https://api.github.com"],
    },
  },
}));

// 2. CORS: Restrict domain access
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://carloscervantes-qa.vercel.app', 'https://personal-portfolio-kappa-five-68.vercel.app']
    : '*',
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
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// Middleware to add user and SEO defaults to all templates
app.use(async (req, res, next) => {
  res.locals.user = null;
  res.locals.isAdminAuthenticated = !!(req.session && req.session.isAuthenticated);
  res.locals.BASE_URL = BASE_URL;
  const defaultMeta = buildMeta({
    title: SITE_TITLE,
    description: DEFAULT_SITE_DESCRIPTION,
    path: req.path
  });
  res.locals.metaTitle = defaultMeta.metaTitle;
  res.locals.metaDescription = defaultMeta.metaDescription;
  res.locals.metaImage = defaultMeta.metaImage;
  res.locals.metaImageAlt = defaultMeta.metaImageAlt;
  res.locals.metaUrl = defaultMeta.metaUrl;
  res.locals.metaType = defaultMeta.metaType;
  
  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      res.locals.user = user;
    } catch (err) {
      console.error('Session user lookup error:', err);
    }
  }
  next();
});

// 7. Cache Control Middleware for Admin Security
// Prevents the browser from caching sensitive admin pages
const noCache = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
};

// Admin Authentication Middleware
const requireAdmin = (req, res, next) => {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  // If not authenticated, ensure we don't clear an accidental valid session
  res.redirect('/admin');
};

const requireUser = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }
  res.redirect('/login');
};

// Specific stricter limit for admin login POST requests
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes instead of 1 hour
  max: 20, // Limit each IP to 20 login attempts per 15 minutes
  message: 'Too many login attempts, please try again after 15 minutes'
});
// REMOVED: app.use('/admin', adminLimiter) to avoid blocking authorized dashboard navigation


// Explicit favicon route — placed before static middleware and rate limiter scope
// to guarantee it is served correctly in all environments
app.get('/favicon.ico', (req, res) => {
  res.type('image/x-icon');
  res.sendFile(FAVICON_PATH);
});

// Serve remaining static files from the 'public' directory
app.use(express.static(PUBLIC_DIR, {
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

function toList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || '').trim()).filter(Boolean);
  }
  return String(value || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeHobbyRecord(hobby = {}) {
  return {
    slug: hobby.slug,
    title: hobby.title,
    subtitle: hobby.subtitle,
    icon: hobby.icon,
    backgroundImage: hobby.backgroundImage,
    description: hobby.description,
    why: hobby.why,
    experience: hobby.experience,
    highlights: toList(hobby.highlights),
    goals: toList(hobby.goals),
    started: hobby.started,
    frequency: hobby.frequency,
    level: hobby.level,
    equipment: toList(hobby.equipment),
    resources: toList(hobby.resources),
    order: Number.isFinite(Number(hobby.order)) ? Number(hobby.order) : 0,
    visible: hobby.visible !== false,
    source: hobby.source || 'database'
  };
}

async function getManagedHobbies() {
  const fallbackHobbies = getAllHobbies().map((item, index) => {
    const hobby = getHobbyData(item.slug);
    return normalizeHobbyRecord({ ...hobby, order: index, source: 'default' });
  });

  if (process.env.NODE_ENV === 'test' || mongoose.connection.readyState !== 1) {
    return fallbackHobbies;
  }

  try {
    const storedHobbies = await Hobby.find().sort({ order: 1, title: 1 }).lean();
    if (!storedHobbies.length) {
      return fallbackHobbies;
    }

    const storedMap = new Map(
      storedHobbies.map((hobby) => [hobby.slug, normalizeHobbyRecord(hobby)])
    );

    const mergedDefaults = fallbackHobbies
      .map((hobby) => storedMap.get(hobby.slug) || hobby)
      .filter((hobby) => hobby.visible !== false);

    const customHobbies = storedHobbies
      .map((hobby) => normalizeHobbyRecord(hobby))
      .filter((hobby) => !getHobbyData(hobby.slug))
      .filter((hobby) => hobby.visible !== false);

    return [...mergedDefaults, ...customHobbies];
  } catch (error) {
    console.error('Error fetching hobbies:', error);
    return fallbackHobbies;
  }
}

async function getManagedHobby(slug) {
  const fallbackHobby = getHobbyData(slug)
    ? normalizeHobbyRecord({ ...getHobbyData(slug), source: 'default' })
    : null;

  if (process.env.NODE_ENV === 'test' || mongoose.connection.readyState !== 1) {
    return fallbackHobby;
  }

  try {
    const hobby = await Hobby.findOne({ slug }).lean();
    if (!hobby) return fallbackHobby;
    if (hobby.visible === false) return null;
    return normalizeHobbyRecord(hobby);
  } catch (error) {
    console.error('Error fetching hobby:', error);
    return fallbackHobby;
  }
}

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
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      ...(process.env.GITHUB_TOKEN && { 'Authorization': `token ${process.env.GITHUB_TOKEN}` })
    };

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50`,
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
        const readmeDesc = await getRepoDescription(GITHUB_USERNAME, repo.name);
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

/**
 * STRATEGIC LANDING PAGE - Software Quality Assurance
 */
app.get('/', (req, res) => {
  const meta = buildMeta({
    title: 'Consultoría de QA y Performance',
    description: 'Carlos Cervantes ayuda a equipos de producto a mejorar calidad, automatización y performance para lanzar software más confiable.',
    path: '/'
  });
  renderPage(res, 'index', {
    title: 'Quality & Performance | Consultoría de QA',
    currentPage: 'home',
    ...meta
  });
});

/**
 * PROFESSIONAL PROFILE - Experience & Proof
 */
app.get('/profile', (req, res) => {
  const meta = buildMeta({
    title: 'Perfil Profesional',
    description: 'Conoce la trayectoria, experiencia y enfoque técnico de Carlos Cervantes en QA, automatización y performance engineering.',
    path: '/profile'
  });
  renderPage(res, 'profile', {
    title: 'Perfil Profesional | Carlos Cervantes',
    currentPage: 'profile',
    ...meta
  });
});

/**
 * SERVICIOS PAGE
 */
app.get('/servicios', (req, res) => {
  const meta = buildMeta({
    title: 'Servicios de Consultoría',
    description: 'Servicios de auditoría QA, automatización y performance testing.',
    path: '/servicios'
  });
  renderPage(res, 'servicios', {
    title: 'Servicios | Carlos Cervantes',
    currentPage: 'servicios',
    ...meta
  });
});

/**
 * CONTACTO PAGE
 */
app.get('/contacto', (req, res) => {
  const meta = buildMeta({
    title: 'Contacto',
    description: 'Ponte en contacto para elevar la calidad y rendimiento de tu software.',
    path: '/contacto'
  });
  renderPage(res, 'contacto', {
    title: 'Contacto | Carlos Cervantes',
    currentPage: 'contacto',
    ...meta
  });
});

/**
 * PROJECTS PAGE - GitHub Projects
 */
app.get('/projects', async (req, res) => {
  try {
    const projects = await getGitHubProjects();
    const meta = buildMeta({
      title: 'Proyectos',
      description: 'Explora proyectos, repositorios y trabajo técnico de Carlos Cervantes en testing, automatización y desarrollo.',
      path: '/projects'
    });
    renderPage(res, 'projects', {
      title: 'Proyectos',
      currentPage: 'projects',
      projects,
      ...meta
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    const meta = buildMeta({
      title: 'Proyectos',
      description: 'Explora proyectos, repositorios y trabajo técnico de Carlos Cervantes en testing, automatización y desarrollo.',
      path: '/projects'
    });
    renderPage(res, 'projects', {
      title: 'Proyectos',
      currentPage: 'projects',
      projects: [],
      error: 'No fue posible cargar los proyectos en este momento.',
      ...meta
    });
  }
});

/**
 * BLOG PAGE - List of all blog posts
 */
app.get('/blog', async (req, res) => {
  const posts = await getBlogPosts();
  const meta = buildMeta({
    title: 'Blog de QA y Performance',
    description: 'Artículos sobre calidad de software, performance, automatización y buenas prácticas para equipos de ingeniería.',
    path: '/blog'
  });
  renderPage(res, 'blog', {
    title: 'Blog',
    currentPage: 'blog',
    posts,
    ...meta
  });
});

/**
 * SINGLE BLOG POST PAGE
 */
app.get('/blog/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug });

    if (!post) {
      return res.status(404).render('404', {
      title: 'Post No Encontrado',
        currentPage: 'blog'
      });
    }

    // Convert markdown content to HTML
    post.htmlContent = marked(post.content);

    // Fetch comments
    const comments = await Comment.find({ post: post._id, status: 'approved' })
      .populate('user', 'name profilePicture')
      .sort({ createdAt: -1 });

    // Generate a clean text excerpt for meta description if not provided
    const meta = buildMeta({
      title: post.title,
      description: post.metaDescription || post.content.replace(/[#*`_~\[\]()]/g, '').replace(/\n/g, ' '),
      path: `/blog/${post.slug}`,
      image: post.coverImage,
      type: 'article'
    });

    renderPage(res, 'post', {
      title: post.title,
      currentPage: 'blog',
      ...meta,
      post,
      comments
    });
  } catch (err) {
    console.error('Blog post error:', err);
    res.status(500).send('Server Error');
  }
});

/**
 * PODCAST PAGE
 */
app.get('/podcast', (req, res) => {
  const meta = buildMeta({
    title: 'Podcast',
    description: 'Una propuesta editorial sobre calidad, automatización y performance para equipos que construyen software confiable.',
    path: '/podcast'
  });
  renderPage(res, 'podcast', {
    title: 'Podcast',
    currentPage: 'podcast',
    ...meta
  });
});

/**
 * HOBBIES PAGE
 */
app.get('/hobbies', async (req, res) => {
  const hobbyCards = await getManagedHobbies();

  const meta = buildMeta({
    title: 'Intereses',
    description: 'Conoce los intereses de Carlos Cervantes fuera del trabajo: fotografía, música, viajes, lectura, cocina y fitness.',
    path: '/hobbies'
  });

  renderPage(res, 'hobbies', {
    title: 'Intereses',
    currentPage: 'hobbies',
    hobbyCards,
    ...meta
  });
});

/**
 * SINGLE HOBBY DETAIL PAGE
 */
app.get('/hobbies/:slug', async (req, res) => {
  const { slug } = req.params;
  const hobby = await getManagedHobby(slug);

  if (!hobby) {
    return res.status(404).render('404', {
      title: 'Interés No Encontrado',
      currentPage: 'hobbies'
    });
  }

  const relatedHobbies = (await getManagedHobbies()).filter((item) => item.slug !== slug);

  renderPage(res, 'hobby-detail', {
    title: hobby.title,
    currentPage: 'hobbies',
    hobby,
    relatedHobbies,
    ...buildMeta({
      title: hobby.title,
      description: `${hobby.subtitle}. ${truncateText(hobby.description, 110)}`,
      path: `/hobbies/${hobby.slug}`,
      image: hobby.backgroundImage
    })
  });
});

app.get('/account', requireUser, async (req, res) => {
  try {
    const accountUser = res.locals.user || await User.findById(req.session.userId).lean();
    if (!accountUser) {
      req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
      });
      return;
    }

    const [userPostsLiked, userCommentsCount, userComments] = await Promise.all([
      Post.countDocuments({ likes: req.session.userId }),
      Comment.countDocuments({ user: req.session.userId, status: 'approved' }),
      Comment.find({ user: req.session.userId, status: 'approved' })
        .populate('post', 'title slug')
        .sort({ createdAt: -1 })
        .limit(6)
        .lean()
    ]);

    const memberSince = accountUser?.createdAt
      ? new Date(accountUser.createdAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'long' })
      : 'Reciente';

    renderPage(res, 'account', {
      title: 'Mi Panel',
      currentPage: 'account',
      user: accountUser,
      userStats: {
        likes: userPostsLiked,
        comments: userCommentsCount,
        memberSince
      },
      recentComments: userComments,
      ...buildMeta({
        title: 'Mi Panel',
        description: 'Gestiona tu sesión, revisa tu actividad reciente y participa en el blog de Carlos Cervantes.',
        path: '/account'
      })
    });
  } catch (error) {
    console.error('Account panel error:', error);
    res.status(500).render('login', {
      title: 'Bienvenido de Nuevo',
      error: 'No fue posible cargar tu panel en este momento.',
      currentPage: 'login',
      formData: { email: '' },
      ...buildAuthMeta('/login', 'Iniciar sesión', 'Accede para comentar, interactuar con el blog y seguir el contenido de Carlos Cervantes.')
    });
  }
});

// ==================== ADMIN ROUTES ====================

/**
 * ADMIN LOGIN PAGE
 */
app.get('/admin', noCache, (req, res) => {
  // Check if already authenticated
  if (req.session && req.session.isAuthenticated) {
    return res.redirect('/admin/posts');
  }
  renderPage(res, 'admin-login', {
    title: 'Acceso Admin',
    error: req.query.error === 'invalid' ? 'Contraseña incorrecta. Intenta de nuevo.' : null,
    currentPage: 'admin',
    currentAdminSection: 'login',
    ...buildMeta({
      title: 'Acceso Admin',
      description: 'Acceso privado al panel administrativo del sitio de Carlos Cervantes.',
      path: '/admin'
    })
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
    res.clearCookie('connect.sid'); // Clear the session cookie explicitly
    res.redirect('/admin');
  });
});

/**
 * ADMIN - Posts List
 */
app.get('/admin/posts', requireAdmin, noCache, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }).lean();
    renderPage(res, 'admin-posts', {
      title: 'Gestión de Posts',
      posts: posts,
      currentPage: 'admin',
      currentAdminSection: 'posts'
    });
  } catch (error) {
    console.error('Error in /admin/posts:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * ADMIN - New Post Form
 */
app.get('/admin/posts/new', requireAdmin, noCache, (req, res) => {
  renderPage(res, 'admin-editor', {
    title: 'Nuevo Post',
    post: null,
    currentPage: 'admin',
    currentAdminSection: 'new-post'
  });
});

/**
 * ADMIN - SAVE POST API
 */
app.post('/admin/posts/save', requireAdmin, noCache, express.json(), async (req, res) => {
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
      author: req.body.author,
      tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
      published: req.body.published !== undefined ? req.body.published : true,
      metaDescription: req.body.metaDescription,
      coverImage: req.body.coverImage,
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
app.delete('/api/admin/posts/:slug', requireAdmin, noCache, async (req, res) => {
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
app.get('/admin/posts/edit/:slug', requireAdmin, noCache, async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).lean();
    if (!post) return res.status(404).send('Post no encontrado');

    renderPage(res, 'admin-editor', {
      title: 'Editar Post',
      post: post,
      currentPage: 'admin',
      currentAdminSection: 'posts'
    });
  } catch (error) {
    console.error('Error in /admin/posts/edit:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * ADMIN - Hobbies List
 */
app.get('/admin/hobbies', requireAdmin, noCache, async (req, res) => {
  try {
    const hobbies = await getManagedHobbies();
    renderPage(res, 'admin-hobbies', {
      title: 'Gestión de Intereses',
      hobbies,
      currentPage: 'admin',
      currentAdminSection: 'hobbies'
    });
  } catch (error) {
    console.error('Error in /admin/hobbies:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * ADMIN - New Hobby Form
 */
app.get('/admin/hobbies/new', requireAdmin, noCache, (req, res) => {
  renderPage(res, 'admin-hobby-editor', {
    title: 'Nuevo Interés',
    hobby: null,
    currentPage: 'admin',
    currentAdminSection: 'new-hobby'
  });
});

/**
 * ADMIN - Edit Hobby Form
 */
app.get('/admin/hobbies/edit/:slug', requireAdmin, noCache, async (req, res) => {
  try {
    const hobby = await getManagedHobby(req.params.slug);
    if (!hobby) return res.status(404).send('Interés no encontrado');

    renderPage(res, 'admin-hobby-editor', {
      title: 'Editar Interés',
      hobby,
      currentPage: 'admin',
      currentAdminSection: 'hobbies'
    });
  } catch (error) {
    console.error('Error in /admin/hobbies/edit:', error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * ADMIN - Save Hobby
 */
app.post('/admin/hobbies/save', requireAdmin, noCache, express.json(), async (req, res) => {
  const { slug, title, subtitle, description, icon, originalSlug } = req.body;

  if (!slug || !title || !subtitle || !description || !icon) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const hobbyData = normalizeHobbyRecord({
      slug,
      title,
      subtitle,
      icon,
      backgroundImage: req.body.backgroundImage,
      description,
      why: req.body.why,
      experience: req.body.experience,
      highlights: req.body.highlights,
      goals: req.body.goals,
      started: req.body.started,
      frequency: req.body.frequency,
      level: req.body.level,
      equipment: req.body.equipment,
      resources: req.body.resources,
      order: req.body.order,
      visible: req.body.visible !== false
    });

    const slugInUseInDefaults = !originalSlug && !!getHobbyData(hobbyData.slug);
    if (slugInUseInDefaults) {
      return res.status(400).json({ error: 'Ese slug ya existe dentro de los intereses actuales.' });
    }

    if (originalSlug && originalSlug !== hobbyData.slug) {
      const existing = await Hobby.findOne({ slug: hobbyData.slug });
      if (existing || getHobbyData(hobbyData.slug)) {
        return res.status(400).json({ error: 'El slug ya existe.' });
      }
    }

    if (!originalSlug) {
      const existing = await Hobby.findOne({ slug: hobbyData.slug });
      if (existing) {
        return res.status(400).json({ error: 'El slug ya existe.' });
      }
      await Hobby.create(hobbyData);
    } else {
      await Hobby.findOneAndUpdate({ slug: originalSlug }, hobbyData, {
        upsert: true,
        new: true,
        runValidators: true
      });
    }

    res.json({ success: true, slug: hobbyData.slug });
  } catch (error) {
    console.error('Error saving hobby:', error);
    res.status(500).json({ error: `Error al guardar: ${error.message}` });
  }
});

/**
 * ADMIN - Delete Hobby
 */
app.delete('/api/admin/hobbies/:slug', requireAdmin, noCache, async (req, res) => {
  try {
    const deletedHobby = await Hobby.findOneAndDelete({ slug: req.params.slug });

    if (!deletedHobby) {
      return res.status(404).json({ success: false, message: 'Ese interés no se puede eliminar desde base de datos.' });
    }

    res.json({ success: true, message: 'Interés eliminado correctamente' });
  } catch (error) {
    console.error('Error deleting hobby:', error);
    res.status(500).json({ success: false, message: error.message });
  }
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

// ==========================================
// USER AUTHENTICATION (READERS)
// ==========================================

// Register Page
app.get('/register', (req, res) => {
  if (req.session.userId) return res.redirect('/account');
  renderPage(res, 'register', {
    title: 'Únete a la Comunidad',
    error: null,
    formData: { name: '', email: '' },
    currentPage: 'register',
    ...buildAuthMeta(
      '/register',
      'Registro',
      'Crea una cuenta para comentar y participar en el blog de Carlos Cervantes.'
    )
  });
});

// Register Action
app.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const formData = {
    name: (name || '').trim(),
    email: (email || '').trim().toLowerCase()
  };
  const registerMeta = buildAuthMeta(
    '/register',
    'Registro',
    'Crea una cuenta para comentar y participar en el blog de Carlos Cervantes.'
  );

  try {
    if (!formData.name || formData.name.length < 2) {
      return res.render('register', {
        title: 'Únete a la Comunidad',
        error: 'Ingresa un nombre válido.',
        formData,
        currentPage: 'register',
        ...registerMeta
      });
    }

    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      return res.render('register', {
        title: 'Únete a la Comunidad',
        error: 'Ingresa un correo válido.',
        formData,
        currentPage: 'register',
        ...registerMeta
      });
    }

    if (!password || password.length < 8) {
      return res.render('register', {
        title: 'Únete a la Comunidad',
        error: 'La contraseña debe tener al menos 8 caracteres.',
        formData,
        currentPage: 'register',
        ...registerMeta
      });
    }

    if (password !== confirmPassword) {
      return res.render('register', {
        title: 'Únete a la Comunidad',
        error: 'La confirmación de contraseña no coincide.',
        formData,
        currentPage: 'register',
        ...registerMeta
      });
    }

    const existingUser = await User.findOne({ email: formData.email });
    if (existingUser) {
      return res.render('register', {
        title: 'Únete a la Comunidad',
        error: 'El correo ya está registrado.',
        formData,
        currentPage: 'register',
        ...registerMeta
      });
    }

    const user = new User({
      name: formData.name,
      email: formData.email,
      password
    });
    await user.save();
    req.session.userId = user._id;
    res.redirect('/account');
  } catch (err) {
    console.error('Register error:', err);
    res.render('register', {
      title: 'Únete a la Comunidad',
      error: 'Error al crear la cuenta.',
      formData,
      currentPage: 'register',
      ...registerMeta
    });
  }
});

// Login Page
app.get('/login', (req, res) => {
  if (req.session.userId) return res.redirect('/account');
  renderPage(res, 'login', {
    title: 'Bienvenido de Nuevo',
    error: null,
    formData: { email: '' },
    currentPage: 'login',
    ...buildAuthMeta(
      '/login',
      'Iniciar sesión',
      'Accede para comentar, interactuar con el blog y seguir el contenido de Carlos Cervantes.'
    )
  });
});

// Login Action
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const formData = {
    email: (email || '').trim().toLowerCase()
  };
  const loginMeta = buildAuthMeta(
    '/login',
    'Iniciar sesión',
    'Accede para comentar, interactuar con el blog y seguir el contenido de Carlos Cervantes.'
  );

  try {
    if (!formData.email || !password) {
      return res.render('login', {
        title: 'Bienvenido de Nuevo',
        error: 'Completa correo y contraseña.',
        formData,
        currentPage: 'login',
        ...loginMeta
      });
    }

    const user = await User.findOne({ email: formData.email });
    if (!user || !(await user.comparePassword(password))) {
      return res.render('login', {
        title: 'Bienvenido de Nuevo',
        error: 'Correo o contraseña inválidos.',
        formData,
        currentPage: 'login',
        ...loginMeta
      });
    }

    req.session.userId = user._id;
    res.redirect('/account');
  } catch (err) {
    console.error('Login error:', err);
    res.render('login', {
      title: 'Bienvenido de Nuevo',
      error: 'Error al iniciar sesión.',
      formData,
      currentPage: 'login',
      ...loginMeta
    });
  }
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

// ==========================================
// ENGAGEMENT API (VIEWS, LIKES)
// ==========================================

// Track View
app.post('/api/posts/:slug/view', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (post) {
      post.views += 1;
      await post.save();
      return res.json({ success: true, views: post.views });
    }
    res.status(404).json({ error: 'Post not found' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Toggle Like
app.post('/api/posts/:slug/like', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const userId = req.session.userId;
    const index = post.likes.indexOf(userId);

    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();
    res.json({ success: true, liked: index === -1, likeCount: post.likes.length });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Post Comment
app.post('/posts/:slug/comment', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login');

  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).send('Post not found');

    const comment = new Comment({
      post: post._id,
      user: req.session.userId,
      content: req.body.content
    });

    await comment.save();
    
    // Increment count
    post.commentCount += 1;
    await post.save();

    res.redirect(`/blog/${req.params.slug}#comments`);
  } catch (err) {
    res.status(500).send('Error posting comment');
  }
});

// ==================== API ROUTES ====================

/**
 * API: Diagnóstico IA (Anthropic)
 * POST /api/diagnostico
 */
app.post('/api/diagnostico', express.json(), async (req, res) => {
  const { appType, appScale, mainProblem, nombre, email } = req.body;

  if (!appType || !mainProblem || !email) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    return res.status(503).json({ error: 'Servicio de IA no disponible temporalmente' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 600,
        system: `Eres Carlos Cervantes, QA consultant con 6+ años de experiencia en performance testing, automatización y calidad de software. 
Genera un diagnóstico inicial en exactamente 3 párrafos en español:
1) Riesgo principal según el tipo de app (${appType}) y escala de usuarios (${appScale})
2) Top 3 recomendaciones concretas y accionables
3) El paquete de servicio más adecuado (Diagnóstico QA $500 / Automatización $2,500 / Performance Engineering $1,800) con justificación.
Tono: experto, directo, accesible. Sin bullet points, párrafos corridos.`,
        messages: [
          {
            role: 'user',
            content: `App: ${appType} | Escala: ${appScale} usuarios en pico\nProblema: ${mainProblem}`
          }
        ]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic error:', errText);
      return res.status(502).json({ error: 'Error al generar diagnóstico' });
    }

    const data = await response.json();
    const diagnostico = data.content?.[0]?.text || '';

    // Also send notification email if Resend is configured
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY && email) {
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Carlos Cervantes QA <noreply@carloscervantes-qa.vercel.app>',
          to: ['carlos.cervart@icloud.com'],
          subject: `[Diagnóstico QA] ${nombre || 'Visitante'} — ${appType}`,
          html: `<h2>Nuevo diagnóstico solicitado</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>App:</strong> ${appType} | <strong>Escala:</strong> ${appScale}</p>
            <p><strong>Problema:</strong> ${mainProblem}</p>
            <hr>
            <h3>Diagnóstico generado:</h3>
            <p>${diagnostico.replace(/\n\n/g, '</p><p>')}</p>`
        })
      }).catch(err => console.error('Resend notification error:', err));
    }

    res.json({ diagnostico });
  } catch (err) {
    console.error('Diagnostico API error:', err);
    res.status(500).json({ error: 'Error interno' });
  }
});

/**
 * API: Formulario de contacto (Resend)
 * POST /api/contacto
 */
app.post('/api/contacto', express.json(), async (req, res) => {
  const { nombre, email, empresa, servicio, descripcion } = req.body;

  if (!nombre || !email || !descripcion) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    // Graceful degradation: acknowledge without actually sending
    console.log(`[Contacto] ${nombre} <${email}> — ${servicio}: ${descripcion.substring(0, 80)}`);
    return res.json({ success: true, note: 'logged_only' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <noreply@carloscervantes-qa.vercel.app>',
        to: ['carlos.cervart@icloud.com'],
        reply_to: email,
        subject: `[Contacto Web] ${nombre}`,
        html: `<h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${empresa ? `<p><strong>Empresa:</strong> ${empresa}</p>` : ''}
          <p><strong>Servicio:</strong> ${servicio || 'No especificado'}</p>
          <p><strong>Mensaje:</strong></p>
          <blockquote>${descripcion.replace(/\n/g, '<br>')}</blockquote>`
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Resend error:', errText);
      return res.status(502).json({ error: 'Error al enviar email' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Contacto API error:', err);
    res.status(500).json({ error: 'Error interno' });
  }
});

/**
 * API: Chat widget (Anthropic)
 * POST /api/chat
 */
app.post('/api/chat', express.json(), async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Mensajes inválidos' });
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    return res.json({
      reply: 'Hola, soy el asistente de Carlos. En este momento el servicio de chat no está disponible, pero puedes escribirle directamente a carlos.cervart@icloud.com o visitar /servicios para conocer sus paquetes.'
    });
  }

  try {
    // Limit to last 10 messages to control tokens
    const limitedMessages = messages.slice(-10).map(m => ({
      role: m.role,
      content: String(m.content).substring(0, 1000)
    }));

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 350,
        system: `Eres el asistente virtual de Carlos Cervantes, QA consultant con 6+ años de experiencia en performance testing, automatización y calidad de software. 
Responde siempre en español, máximo 3 párrafos cortos y directos.
Para consultas sobre servicios, dirígelos a /servicios.
Para experiencia o CV, dirígelos a /profile.
Para contacto directo, sugiere /contacto o carlos.cervart@icloud.com.
Tono: experto pero accesible. No inventes información. Si no sabes algo, dilo honestamente.`,
        messages: limitedMessages
      })
    });

    if (!response.ok) {
      return res.json({ reply: 'Lo siento, no puedo responder en este momento. Puedes escribir a carlos.cervart@icloud.com' });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text || 'No pude generar una respuesta.';
    res.json({ reply });
  } catch (err) {
    console.error('Chat API error:', err);
    res.json({ reply: 'Error temporal. Escribe a carlos.cervart@icloud.com' });
  }
});

/**
 * 404 ERROR HANDLER
 */
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Página No Encontrada',
    currentPage: ''
  });
});

module.exports = app;
