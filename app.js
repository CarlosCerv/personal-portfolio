// FILE: app.js
// Main Express server for the personal portfolio website

const express = require('express');
const path = require('path');
const fs = require('fs');
const { marked } = require('marked');
const matter = require('gray-matter');
const mongoose = require('mongoose');
const Post = require('./models/Post');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection string (use environment variable in production)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-portfolio';

// Admin password (in production, use environment variables and proper authentication)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Connect to MongoDB with better error handling
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('SUCCESS: Connected to MongoDB');
    console.log(`   Database: ${MONGODB_URI.split('/').pop().split('?')[0]}`);
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('\n⚠️  DATABASE NOT CONNECTED!');
    console.error('   The app will run, but blog functionality will not work.');
    console.error('   To fix this:');
    console.error('   1. Install MongoDB: brew install mongodb-community');
    console.error('   2. Start MongoDB: brew services start mongodb-community');
    console.error('   3. Or use MongoDB Atlas (see DATABASE_SETUP.md)\n');
  });

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure marked options for better rendering
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false
});

/**
 * Helper function to read and parse all blog posts from database
 * Returns an array of post objects sorted by date (newest first)
 */
async function getBlogPosts() {
  try {
    const posts = await Post.find({ published: true })
      .sort({ date: -1 })
      .lean();
    
    // Add excerpt to each post
    return posts.map(post => ({
      ...post,
      excerpt: post.content.trim().substring(0, 150).replace(/\n/g, ' ') + '...'
    }));
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
  try {
    // GitHub username - update this if needed
    const username = 'CarlosCerv';
    
    // Fetch repositories from GitHub API
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // Optional: Add GitHub Personal Access Token for higher rate limits
          // 'Authorization': 'token YOUR_GITHUB_TOKEN'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos = await response.json();
    
    // Include all public repositories (original repos and forks)
    const filteredRepos = repos
      .filter(repo => !repo.private) // Only public repos
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)); // Sort by most recently updated
    
    // Fetch descriptions from README if repo description is missing
    const projectsPromises = filteredRepos.map(async (repo) => {
      let description = repo.description;
      
      // If no description, try to get it from README
      if (!description || description.trim() === '') {
        const readmeDesc = await getRepoDescription(username, repo.name);
        description = readmeDesc || 'No description available';
      }
      
      return {
        name: repo.name,
        description: description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updated: repo.updated_at
      };
    });
    
    return await Promise.all(projectsPromises);
    
  } catch (error) {
    console.error('Error fetching from GitHub API:', error);
    
    // Fallback to placeholder data if API fails
    return [
      {
        name: 'personal-portfolio',
        description: 'Personal portfolio website with admin blog platform built with Node.js, Express, and EJS',
        url: 'https://github.com/CarlosCerv/personal-portfolio',
        language: 'JavaScript',
        stars: 0,
        forks: 0
      }
    ];
  }
}

// ==================== ROUTES ====================

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
  const password = req.query.password;
  if (password === ADMIN_PASSWORD) {
    return res.redirect('/admin/posts');
  }
  
  res.render('admin-login', {
    title: 'Admin Login',
    currentPage: 'admin',
    error: null
  });
});

/**
 * ADMIN LOGIN POST
 */
app.post('/admin', (req, res) => {
  if (req.body.password === ADMIN_PASSWORD) {
    res.redirect('/admin/posts?password=' + req.body.password);
  } else {
    res.render('admin-login', {
      title: 'Admin Login',
      currentPage: 'admin',
      error: 'Invalid password'
    });
  }
});

/**
 * ADMIN POSTS LIST
 */
app.get('/admin/posts', async (req, res) => {
  const password = req.query.password;
  if (password !== ADMIN_PASSWORD) {
    return res.redirect('/admin');
  }
  
  const posts = await getBlogPosts();
  res.render('admin-posts', {
    title: 'Manage Posts',
    currentPage: 'admin',
    posts,
    password
  });
});

/**
 * ADMIN NEW POST PAGE
 */
app.get('/admin/posts/new', (req, res) => {
  const password = req.query.password;
  if (password !== ADMIN_PASSWORD) {
    return res.redirect('/admin');
  }
  
  res.render('admin-editor', {
    title: 'New Post',
    currentPage: 'admin',
    post: null,
    password
  });
});

/**
 * ADMIN EDIT POST PAGE
 */
app.get('/admin/posts/edit/:slug', async (req, res) => {
  const password = req.query.password;
  if (password !== ADMIN_PASSWORD) {
    return res.redirect('/admin');
  }
  
  const { slug } = req.params;
  
  try {
    const post = await Post.findOne({ slug });
    
    if (!post) {
      return res.status(404).send('Post not found');
    }
    
    res.render('admin-editor', {
      title: 'Edit Post',
      currentPage: 'admin',
      post: {
        slug: post.slug,
        title: post.title,
        date: post.date.toISOString().split('T')[0],
        author: post.author,
        tags: post.tags,
        content: post.content
      },
      password
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send('Server error');
  }
});

/**
 * ADMIN SAVE POST API
 */
app.post('/admin/posts/save', express.json(), async (req, res) => {
  const password = req.body.password || req.query.password;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { slug, title, date, author, tags, content, originalSlug } = req.body;
  
  // Validate required fields
  if (!slug || !title || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  try {
    const postData = {
      slug,
      title,
      date: date || new Date(),
      author: author || 'Carlos Cervantes',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      content,
      published: true
    };
    
    // If editing existing post (originalSlug exists)
    if (originalSlug) {
      // If slug changed, check if new slug is available
      if (originalSlug !== slug) {
        const existingPost = await Post.findOne({ slug });
        if (existingPost) {
          return res.status(400).json({ error: 'Slug already exists' });
        }
      }
      
      // Update the post
      await Post.findOneAndUpdate({ slug: originalSlug }, postData, { upsert: true });
    } else {
      // Creating new post - check if slug exists
      const existingPost = await Post.findOne({ slug });
      if (existingPost) {
        return res.status(400).json({ error: 'Slug already exists' });
      }
      
      // Create new post
      await Post.create(postData);
    }
    
    res.json({ success: true, slug });
  } catch (error) {
    console.error('Error saving post:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to save post';
    if (error.name === 'MongooseServerSelectionError' || error.name === 'MongoNetworkError') {
      errorMessage = 'Database connection failed. Please ensure MongoDB is running.';
    } else if (error.name === 'ValidationError') {
      errorMessage = `Validation error: ${error.message}`;
    } else if (error.code === 11000) {
      errorMessage = 'A post with this slug already exists';
    }
    
    res.status(500).json({ error: errorMessage, details: error.message });
  }
});

/**
 * ADMIN DELETE POST API
 */
app.post('/admin/posts/delete/:slug', async (req, res) => {
  const password = req.body.password || req.query.password;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { slug } = req.params;
  
  try {
    const result = await Post.findOneAndDelete({ slug });
    
    if (!result) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
