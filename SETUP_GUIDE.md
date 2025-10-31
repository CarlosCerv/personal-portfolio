# 🚀 Personal Portfolio Website - Setup Guide

A modern, responsive personal portfolio website built with Node.js, Express, and MongoDB. This template is perfect for QA Engineers, Software Developers, and Tech Professionals who want to showcase their work, blog, projects, and expertise.

![Portfolio Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- **Modern Design**: Clean, professional UI with dark/light mode toggle
- **Responsive**: Mobile-first design that works on all devices
- **Blog System**: Markdown-based blog with frontmatter support
- **Projects Showcase**: Automatic GitHub integration or manual project cards
- **Podcast Section**: Dedicated page for podcast episodes and platforms
- **Hobbies/Interests**: Share your personal interests with detailed pages
- **Admin Panel**: Built-in blog editor with live markdown preview
- **SEO Optimized**: Open Graph meta tags for beautiful link previews
- **Animations**: Smooth scroll animations and interactive elements
- **Performance**: Fast loading with optimized assets

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (Local or MongoDB Atlas) - [Get free cluster](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download here](https://git-scm.com/)
- **Code Editor** - VS Code recommended

## 🛠️ Installation

### 1. Clone or Download the Repository

```bash
git clone https://github.com/CarlosCerv/personal-portfolio.git
cd personal-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/personal-portfolio
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/personal-portfolio

# Admin Password for Blog Management
ADMIN_PASSWORD=your_secure_password_here

# Optional: GitHub Token for Projects API (higher rate limits)
GITHUB_TOKEN=your_github_token_here
```

### 4. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
brew install mongodb-community  # macOS
# or follow instructions for your OS

# Start MongoDB service
brew services start mongodb-community

# Your connection string:
MONGODB_URI=mongodb://localhost:27017/personal-portfolio
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and add it to `.env`

### 5. Start the Application

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

Visit `http://localhost:3000` to see your portfolio!

---

## 🎨 Customization Guide

### Step 1: Update Personal Information

#### **1.1 Homepage Hero Section**
Edit `views/index.ejs` (lines 13-33):

```html
<h1 class="hero-title">Hi, I'm <span class="text-gradient">Your Name</span></h1>
<p class="hero-subtitle">Your Job Title | Your Specialization</p>
<p class="hero-description">
  Your compelling description about what you do, your expertise, 
  and what makes you unique in your field.
</p>
<p class="hero-location">
  <i class="fas fa-map-marker-alt"></i> Your City, Country
</p>
```

#### **1.2 About Me Section**
Edit `views/index.ejs` (lines 75-95):

```html
<h2 class="section-title">About Me</h2>
<p class="section-description">
  Write your professional bio here. Talk about your background,
  experience, what drives you, and your career journey.
</p>

<p>
  Add more paragraphs about your expertise, methodologies you follow,
  tools you use, and your approach to your work.
</p>
```

#### **1.3 Professional Stats**
Edit `views/index.ejs` (lines 35-60):

```html
<div class="stat-card">
  <div class="stat-icon"><i class="fas fa-briefcase"></i></div>
  <div class="stat-number" data-target="6">0+</div>
  <div class="stat-label">Years Experience</div>
</div>
```

Update the `data-target` values with your numbers.

#### **1.4 Contact Information**
Edit `views/index.ejs` (lines 110-140):

```html
<!-- Location Card -->
<div class="contact-card">
  <i class="fas fa-map-marker-alt"></i>
  <h3>Location</h3>
  <p>Your City, Country</p>
</div>

<!-- LinkedIn Card -->
<div class="contact-card">
  <i class="fab fa-linkedin"></i>
  <h3>LinkedIn</h3>
  <a href="https://linkedin.com/in/your-username">your-username</a>
</div>

<!-- GitHub Card -->
<div class="contact-card">
  <i class="fab fa-github"></i>
  <h3>GitHub</h3>
  <a href="https://github.com/your-username">@your-username</a>
</div>
```

### Step 2: Update Navigation & Branding

#### **2.1 Logo & Brand Name**
Edit `views/partials/navigation.ejs` (line 7):

```html
<a href="/" class="nav-brand">
  <img src="/images/logo-shield.svg" alt="Your Initials Logo" class="brand-logo">
  <span class="brand-name">Your Job Title</span>
</a>
```

#### **2.2 Create Your Logo**
1. Open `public/images/create-og-image.html` in a browser
2. Edit the logo initials (line 131): Change `CC` to your initials
3. Take a screenshot and save as `logo-shield.svg` or create using design tools
4. Update all favicon files with your branding

#### **2.3 Footer Social Links**
Edit `views/partials/footer.ejs` (lines 10-30):

```html
<div class="social-links">
  <a href="https://github.com/your-username" target="_blank">
    <i class="fab fa-github"></i>
  </a>
  <a href="https://linkedin.com/in/your-username" target="_blank">
    <i class="fab fa-linkedin"></i>
  </a>
  <a href="https://twitter.com/your-username" target="_blank">
    <i class="fab fa-twitter"></i>
  </a>
  <!-- Add more social links as needed -->
</div>

<p>&copy; 2024 Your Name. All rights reserved.</p>
```

### Step 3: Customize Skills Section

Edit `views/index.ejs` (lines 145-250):

```html
<div class="skill-category">
  <div class="category-header">
    <i class="fas fa-code"></i>
    <h3>Your Skill Category</h3>
  </div>
  <div class="skill-tags">
    <span class="skill-tag">Skill 1</span>
    <span class="skill-tag">Skill 2</span>
    <span class="skill-tag">Skill 3</span>
    <!-- Add more skills -->
  </div>
</div>
```

**Categories to customize:**
- Programming Languages
- Testing Tools
- Frameworks
- DevOps & CI/CD
- Databases
- Other Skills

### Step 4: Update Experience Timeline

Edit `views/index.ejs` (lines 255-320):

```html
<div class="experience-item">
  <div class="experience-period">
    <i class="fas fa-calendar-alt"></i>
    Start Date - End Date
  </div>
  <div class="experience-content">
    <h3>Job Title</h3>
    <h4>Company Name</h4>
    <ul>
      <li>Key achievement or responsibility</li>
      <li>Another achievement with metrics</li>
      <li>Technology or methodology you used</li>
    </ul>
  </div>
</div>
```

### Step 5: Add Your Education

Edit `views/index.ejs` (lines 325-370):

```html
<div class="education-item">
  <div class="education-icon">
    <i class="fas fa-graduation-cap"></i>
  </div>
  <div class="education-content">
    <h3>Degree Name</h3>
    <h4>University Name</h4>
    <p class="education-period">
      <i class="fas fa-calendar-alt"></i>
      Graduation Year
    </p>
    <p>Additional information about your studies, major, or achievements</p>
  </div>
</div>
```

### Step 6: Add Certifications

Edit `views/index.ejs` (lines 375-450):

```html
<div class="cert-card">
  <div class="cert-icon">
    <i class="fas fa-certificate"></i>
  </div>
  <div class="cert-content">
    <h3>Certification Name</h3>
    <p class="cert-issuer">Issuing Organization</p>
    <p class="cert-date">
      <i class="fas fa-calendar-check"></i>
      Issue Date
    </p>
    <div class="cert-verification">
      <i class="fas fa-check-circle"></i>
      <span>Verified</span>
    </div>
  </div>
</div>
```

### Step 7: Configure GitHub Projects

#### **Option A: Automatic GitHub Integration**
Edit `app.js` (line ~100):

```javascript
async function getGitHubProjects() {
  const username = 'your-github-username'; // Change this
  // Rest of the function stays the same
}
```

**Optional: Add GitHub Token for higher rate limits**
1. Go to GitHub Settings → Developer Settings → Personal Access Tokens
2. Generate a token with `public_repo` scope
3. Add to `.env`: `GITHUB_TOKEN=your_token_here`
4. Update `app.js` to use the token in API calls

#### **Option B: Manual Projects**
Replace the `getGitHubProjects()` function with hardcoded data:

```javascript
async function getGitHubProjects() {
  return [
    {
      name: 'Project Name',
      description: 'Project description',
      html_url: 'https://github.com/username/repo',
      language: 'JavaScript',
      stargazers_count: 10,
      forks_count: 5,
      topics: ['tag1', 'tag2']
    },
    // Add more projects
  ];
}
```

### Step 8: Add Blog Posts

#### **Method A: Using Admin Panel** (Recommended)
1. Go to `http://localhost:3000/admin`
2. Login with your `ADMIN_PASSWORD`
3. Click "Create New Post"
4. Write your post using the visual markdown editor
5. Click "Save Post"

#### **Method B: Manual File Creation**
Create a new `.md` file in the `posts/` directory:

```markdown
---
title: "Your Blog Post Title"
date: 2024-10-31
author: "Your Name"
slug: "url-friendly-slug"
tags: ["Tag1", "Tag2", "Tag3"]
---

Your blog post content in markdown format...

## Section Heading

Paragraph text with **bold** and *italic* formatting.

### Code Example

\`\`\`javascript
const example = 'code';
console.log(example);
\`\`\`

- List item 1
- List item 2
```

### Step 9: Customize Hobbies Section

Edit `app.js` (lines ~200-400) in the `getHobbyData()` function:

```javascript
{
  slug: 'your-hobby-slug',
  title: 'Hobby Name',
  subtitle: 'Brief tagline',
  icon: 'fas fa-icon-name', // Font Awesome icon
  description: 'Detailed description of your hobby',
  why: 'Why you enjoy this hobby',
  experience: 'Your experience level and journey',
  highlights: [
    'Achievement 1',
    'Achievement 2',
    'Achievement 3'
  ],
  goals: [
    'Future goal 1',
    'Future goal 2'
  ],
  metadata: {
    started: 'Year Started',
    frequency: 'How often',
    level: 'Beginner/Intermediate/Advanced',
    equipment: 'Equipment used',
    resources: 'Recommended resources'
  }
}
```

### Step 10: Set Up Podcast Section (Optional)

Edit `views/podcast.ejs`:

#### **10.1 Hero Section** (lines 10-40)
```html
<h1 class="podcast-hero-title">Your Podcast Name</h1>
<p class="podcast-hero-subtitle">Your Podcast Tagline</p>
<p class="podcast-hero-description">
  Description of what your podcast is about, topics covered,
  and what listeners can expect.
</p>

<!-- Update Stats -->
<div class="stat">
  <div class="stat-number">XX</div>
  <div class="stat-label">Episodes</div>
</div>
```

#### **10.2 Platform Links** (lines 80-120)
```html
<a href="your-apple-podcasts-url" class="platform-btn">
  <i class="fab fa-apple"></i>
  <span>Apple Podcasts</span>
</a>
<a href="your-spotify-url" class="platform-btn">
  <i class="fab fa-spotify"></i>
  <span>Spotify</span>
</a>
<!-- Add more platforms -->
```

#### **10.3 Episodes** (lines 130-200)
```html
<div class="episode-card">
  <div class="episode-image">
    <button class="episode-play-btn">
      <i class="fas fa-play"></i>
    </button>
  </div>
  <div class="episode-content">
    <div class="episode-meta">
      <span><i class="far fa-calendar"></i> Date</span>
      <span><i class="far fa-clock"></i> Duration</span>
    </div>
    <h3>Episode Title</h3>
    <p>Episode description...</p>
    <div class="episode-tags">
      <span class="tag">Topic</span>
    </div>
  </div>
</div>
```

### Step 11: Update SEO & Meta Tags

Edit `views/partials/header.ejs` (lines 5-30):

```html
<meta name="description" content="Your professional title and expertise description">
<meta name="author" content="Your Name">
<meta name="keywords" content="Your Keywords, Separated By Commas">

<!-- Open Graph -->
<meta property="og:title" content="Your Name - Your Title">
<meta property="og:description" content="Your professional description">
<meta property="og:url" content="https://yourdomain.com">
<meta property="og:image" content="https://yourdomain.com/images/og-image.jpg">

<!-- Twitter Card -->
<meta name="twitter:title" content="Your Name - Your Title">
<meta name="twitter:description" content="Your professional description">
```

#### **11.1 Create OG Image**
1. Open `public/images/create-og-image.html` in browser
2. Update text with your information
3. Take a 1200x630px screenshot
4. Save as `public/images/og-image.jpg`

### Step 12: Customize Theme Colors

Edit `public/css/style.css` (lines 10-40):

```css
:root {
  /* Primary Colors - Change these to your brand colors */
  --primary-color: #4a9eff;    /* Your main color */
  --primary-hover: #3b8ae6;    /* Darker shade */
  --primary-rgb: 74, 158, 255; /* RGB values for transparency */
  
  --secondary-color: #6bb0ff;   /* Accent color */
  --secondary-rgb: 107, 176, 255;
  
  /* Or use a different color scheme */
  /* Purple: --primary-color: #667eea; */
  /* Green: --primary-color: #10b981; */
  /* Orange: --primary-color: #f59e0b; */
}
```

---

## 📱 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel --prod
```

4. **Set Environment Variables in Vercel**
- Go to your Vercel dashboard
- Select your project
- Go to Settings → Environment Variables
- Add all variables from your `.env` file

### Deploy to Other Platforms

**Heroku:**
```bash
heroku create your-app-name
git push heroku main
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set ADMIN_PASSWORD=your_password
```

**Railway:**
1. Connect your GitHub repo
2. Add environment variables in dashboard
3. Deploy automatically on push

**DigitalOcean App Platform:**
1. Connect repository
2. Configure environment variables
3. Deploy

---

## 🎯 Quick Customization Checklist

- [ ] Update personal information in `views/index.ejs`
- [ ] Change name, job title, location
- [ ] Update About Me section
- [ ] Modify professional stats
- [ ] Update contact information
- [ ] Create and upload your logo
- [ ] Update favicon files
- [ ] Customize navigation brand name
- [ ] Edit footer with your name and socials
- [ ] Add your skills in categories
- [ ] Add work experience timeline
- [ ] Add education information
- [ ] Add certifications
- [ ] Configure GitHub username for projects
- [ ] Add blog posts (admin panel or manual)
- [ ] Customize hobbies/interests
- [ ] Update podcast section (if applicable)
- [ ] Create OG image for social sharing
- [ ] Update SEO meta tags
- [ ] Customize theme colors (optional)
- [ ] Test on mobile devices
- [ ] Deploy to production
- [ ] Set up custom domain (optional)

---

## 🔧 Advanced Customization

### Add Google Analytics
Add to `views/partials/header.ejs`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Add Contact Form
Use services like:
- Formspree
- EmailJS
- Netlify Forms
- SendGrid

### Add Resume Download
1. Add your resume PDF to `public/files/`
2. Add button in hero section:
```html
<a href="/files/your-resume.pdf" class="btn btn-secondary" download>
  <i class="fas fa-download"></i> Download Resume
</a>
```

### Custom Domain
1. Buy domain from Namecheap, GoDaddy, etc.
2. Configure DNS in Vercel/your hosting platform
3. Update all URLs in meta tags

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
brew services list  # macOS
sudo systemctl status mongod  # Linux

# Verify connection string format
mongodb://localhost:27017/personal-portfolio
# OR
mongodb+srv://username:password@cluster.mongodb.net/database
```

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
# Or use different port in .env
PORT=3001
```

### Blog Posts Not Showing
- Check MongoDB connection
- Verify posts exist in database
- Check file format in `posts/` directory
- Ensure frontmatter is properly formatted

### Styles Not Loading
```bash
# Clear cache and restart
rm -rf node_modules
npm install
npm run dev
```

---

## 📚 Resources

- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Tutorial](https://docs.mongodb.com/manual/tutorial/getting-started/)
- [EJS Templating](https://ejs.co/#docs)
- [Markdown Guide](https://www.markdownguide.org/basic-syntax/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [Vercel Documentation](https://vercel.com/docs)

---

## 🤝 Support

If you encounter any issues:

1. Check this guide thoroughly
2. Review the troubleshooting section
3. Check console for error messages
4. Verify all environment variables are set
5. Ensure MongoDB is connected

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🎉 You're All Set!

Your portfolio is now ready to showcase your professional work to the world. Remember to:

- Keep your blog updated with fresh content
- Add new projects as you build them
- Update your experience and certifications
- Share your portfolio on LinkedIn and social media
- Regularly check and update dependencies

**Happy building! 🚀**

---

**Made with ❤️ for developers, by developers**
