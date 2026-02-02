# Content Update Guide

This guide covers how to update all content on your personal portfolio website, including blog posts, projects, hobbies, podcasts, and personal information.

## Table of Contents
1. [Blog Posts](#1-blog-posts)
2. [Personal Information](#2-personal-information)
3. [Projects (GitHub Integration)](#3-projects-github-integration)
4. [Hobbies](#4-hobbies)
5. [Podcast Episodes](#5-podcast-episodes)
6. [Navigation & Footer](#6-navigation--footer)
7. [Styling & Theme](#7-styling--theme)

---

## 1. Blog Posts

### Option A: Using the Admin Platform (Easiest)

The built-in admin platform provides a visual editor with live preview.

#### Access Admin
1. Navigate to: `https://your-site.vercel.app/admin`
2. Enter admin password (default: `admin123` or your custom password)

#### Create New Post
1. Click **"Create New Post"**
2. Fill in the form:
   - **Title**: Post title (auto-generates slug)
   - **Slug**: URL-friendly version (e.g., `my-first-post`)
   - **Date**: Publication date (YYYY-MM-DD)
   - **Author**: Your name
   - **Tags**: Comma-separated (e.g., `JavaScript, Tutorial, Web Dev`)
3. Write content in the markdown editor:
   - Use the toolbar for formatting (bold, italic, links, code, etc.)
   - Toggle preview with "Preview" button or `Cmd/Ctrl + P`
4. Click **"Save Post"** or press `Cmd/Ctrl + S`

#### Edit Existing Post
1. Go to: `https://your-site.vercel.app/admin/posts`
2. Click **"Edit"** next to the post you want to modify
3. Make changes in the editor
4. Click **"Save Post"**

#### Delete Post
1. Go to: `https://your-site.vercel.app/admin/posts`
2. Click **"Delete"** next to the post
3. Confirm deletion

### Option B: Manual File Editing

Edit markdown files directly in the `/posts` directory.

#### Create New Post

1. Create a new `.md` file in `/posts/` directory:
```bash
touch posts/my-new-post.md
```

2. Add frontmatter and content:
```markdown
---
title: "My New Post Title"
date: 2024-10-30
author: "Carlos Cervantes"
slug: "my-new-post"
tags: ["JavaScript", "Tutorial", "Web Development"]
---

# Introduction

Your blog post content goes here...

## Section 1

More content with **bold** and *italic* text.

```javascript
// Code examples
console.log("Hello, World!");
```

### Subsection

- Bullet point 1
- Bullet point 2
```

3. Commit and push:
```bash
git add posts/my-new-post.md
git commit -m "Add new blog post: My New Post"
git push origin main
```

#### Edit Existing Post

1. Open the markdown file:
```bash
vim posts/existing-post.md
# or use your preferred editor
```

2. Make changes and save

3. Commit and push:
```bash
git add posts/existing-post.md
git commit -m "Update blog post: Existing Post"
git push origin main
```

#### Delete Post

```bash
git rm posts/unwanted-post.md
git commit -m "Remove blog post: Unwanted Post"
git push origin main
```

### Markdown Formatting Reference

```markdown
# H1 Heading
## H2 Heading
### H3 Heading

**bold text**
*italic text*
***bold and italic***

[Link text](https://example.com)

![Image alt text](https://example.com/image.jpg)

`inline code`

```javascript
// Code block
function example() {
  return "formatted code";
}
```

- Bullet list item 1
- Bullet list item 2

1. Numbered list item 1
2. Numbered list item 2

> Blockquote text

---

Horizontal rule above
```

---

## 2. Personal Information

### Update Homepage Content

**File**: `views/index.ejs`

```bash
vim views/index.ejs
```

**Sections to update:**

#### Hero Section
```html
<!-- Line ~15-25 -->
<h1>Hi, I'm Carlos Cervantes</h1>
<h2>Mobile QA Engineer | Test Automation Specialist</h2>
<p class="lead">
    Change your bio here. Talk about your experience, 
    skills, and what you're passionate about.
</p>
```

#### About Section
```html
<!-- Line ~40-60 -->
<p>
    Update your detailed background story here.
    Include your journey, expertise, and goals.
</p>
```

#### Skills Section
```html
<!-- Line ~70-100 -->
<div class="skill-category">
    <h3>Your Skill Category</h3>
    <div class="skills">
        <span class="skill-tag">Skill 1</span>
        <span class="skill-tag">Skill 2</span>
    </div>
</div>
```

### Commit Changes
```bash
git add views/index.ejs
git commit -m "Update personal information on homepage"
git push origin main
```

---

## 3. Projects (GitHub Integration)

Projects are automatically fetched from your GitHub profile. To update:

### Update GitHub Username

**File**: `app.js` (line ~100)

```javascript
// Find this line:
const username = 'CarlosCerv';

// Change to your GitHub username:
const username = 'YourGitHubUsername';
```

### Add GitHub Token (Optional - Higher Rate Limits)

**File**: `app.js` (line ~105)

```javascript
const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
  headers: {
    'Authorization': 'token YOUR_GITHUB_TOKEN'
  }
});
```

**Or set as environment variable in Vercel:**
1. Go to Vercel dashboard → Settings → Environment Variables
2. Add: `GITHUB_TOKEN` = `your_token_here`
3. Update code:
```javascript
headers: {
  'Authorization': `token ${process.env.GITHUB_TOKEN || ''}`
}
```

### Customize Fallback Projects

If GitHub API fails, fallback data is used. Update it in `app.js`:

```javascript
// Line ~130-160
const fallbackProjects = [
  {
    name: 'Your Project Name',
    description: 'Project description here',
    html_url: 'https://github.com/yourusername/project',
    language: 'JavaScript',
    stargazers_count: 0,
    topics: ['topic1', 'topic2']
  },
  // Add more projects...
];
```

### Pin Specific Repositories

Modify the GitHub API URL to only fetch pinned repos:

```javascript
// Change line ~105:
const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);

// To use GraphQL API for pinned repos (more complex):
// You'll need to implement GraphQL query for pinnedItems
```

---

## 4. Hobbies

Hobbies are hardcoded in `app.js`. To update:

**File**: `app.js` (line ~180-400)

### Add New Hobby

```javascript
function getHobbyData(slug) {
  const hobbies = {
    // ... existing hobbies ...
    
    'your-new-hobby': {
      slug: 'your-new-hobby',
      title: 'Hobby Title',
      subtitle: 'Subtitle or tagline',
      icon: 'fas fa-icon-name', // Font Awesome icon class
      description: 'Main description paragraph',
      why: 'Why you enjoy this hobby',
      experience: 'Your experience level and background',
      highlights: [
        'Highlight point 1',
        'Highlight point 2',
        'Highlight point 3'
      ],
      goals: [
        'Future goal 1',
        'Future goal 2'
      ],
      metadata: {
        started: 'Year you started (e.g., 2020)',
        frequency: 'How often (e.g., Weekly, Daily)',
        level: 'Skill level (e.g., Intermediate, Advanced)',
        equipment: 'Equipment you use',
        resources: 'Favorite resources or references'
      }
    }
  };
  
  return hobbies[slug] || null;
}
```

### Update Hobbies List Page

**File**: `app.js` (line ~250-300)

```javascript
app.get('/hobbies', (req, res) => {
  const hobbies = [
    // ... existing hobbies ...
    
    {
      slug: 'your-new-hobby',
      title: 'Hobby Title',
      subtitle: 'Short description',
      icon: 'fas fa-icon-name'
    }
  ];
  
  res.render('hobbies', { title: 'Hobbies', hobbies, currentPage: 'hobbies' });
});
```

### Find Font Awesome Icons

1. Browse icons: https://fontawesome.com/icons
2. Copy the class name (e.g., `fas fa-camera`)
3. Use in your hobby object

### Commit Changes
```bash
git add app.js
git commit -m "Add new hobby: Your Hobby Name"
git push origin main
```

---

## 5. Podcast Episodes

**File**: `views/podcast.ejs`

### Update Podcast Information

#### Hero Section (Line ~15-30)
```html
<h1>Your Podcast Name</h1>
<p class="podcast-tagline">Your podcast tagline or description</p>

<div class="podcast-stats">
    <div class="stat-item">
        <span class="stat-number">50+</span> <!-- Update episode count -->
        <span class="stat-label">Episodes</span>
    </div>
    <!-- Update other stats -->
</div>
```

#### Add/Edit Episodes (Line ~50-150)
```html
<div class="episode-card">
    <div class="episode-image">
        <img src="/images/episode-01.jpg" alt="Episode 1">
        <div class="play-button">
            <i class="fas fa-play"></i>
        </div>
    </div>
    <div class="episode-content">
        <span class="episode-number">Episode 1</span>
        <h3 class="episode-title">Your Episode Title</h3>
        <p class="episode-description">
            Episode description goes here. Make it engaging!
        </p>
        <div class="episode-meta">
            <span><i class="far fa-calendar"></i> Oct 30, 2024</span>
            <span><i class="far fa-clock"></i> 45 min</span>
        </div>
        <div class="episode-tags">
            <span class="tag">Tag1</span>
            <span class="tag">Tag2</span>
        </div>
    </div>
</div>
```

### Update Subscription Links (Line ~200-220)
```html
<div class="subscribe-platforms">
    <a href="YOUR_APPLE_PODCAST_URL" class="platform-btn apple">
        <i class="fab fa-apple"></i> Apple Podcasts
    </a>
    <a href="YOUR_SPOTIFY_URL" class="platform-btn spotify">
        <i class="fab fa-spotify"></i> Spotify
    </a>
    <a href="YOUR_GOOGLE_URL" class="platform-btn google">
        <i class="fab fa-google"></i> Google Podcasts
    </a>
    <a href="YOUR_RSS_FEED_URL" class="platform-btn rss">
        <i class="fas fa-rss"></i> RSS Feed
    </a>
</div>
```

### Add Episode Images

Place images in `/public/images/` directory:
```bash
cp ~/Downloads/episode-01.jpg public/images/
```

Update image source in episode card:
```html
<img src="/images/episode-01.jpg" alt="Episode 1">
```

---

## 6. Navigation & Footer

### Update Navigation Menu

**File**: `views/partials/navigation.ejs`

#### Change Brand Name
```html
<!-- Line ~5-10 -->
<a class="navbar-brand" href="/">
    <i class="fas fa-code"></i> Your Name
</a>
```

#### Add/Remove Menu Items
```html
<!-- Line ~20-40 -->
<ul class="navbar-nav">
    <li class="nav-item">
        <a class="nav-link <%= currentPage === 'home' ? 'active' : '' %>" href="/">
            Home
        </a>
    </li>
    <li class="nav-item">
        <a class="nav-link <%= currentPage === 'your-page' ? 'active' : '' %>" href="/your-page">
            Your New Page
        </a>
    </li>
    <!-- Add more items -->
</ul>
```

### Update Footer

**File**: `views/partials/footer.ejs`

#### Update Social Links (Line ~10-30)
```html
<a href="https://github.com/YourUsername" target="_blank">
    <i class="fab fa-github"></i>
</a>
<a href="https://linkedin.com/in/YourProfile" target="_blank">
    <i class="fab fa-linkedin"></i>
</a>
<a href="https://twitter.com/YourHandle" target="_blank">
    <i class="fab fa-twitter"></i>
</a>
<a href="mailto:your.email@example.com">
    <i class="fas fa-envelope"></i>
</a>
```

#### Update Copyright Text
```html
<!-- Line ~40-45 -->
<p>&copy; 2024 Your Name. All rights reserved.</p>
```

---

## 7. Styling & Theme

### Update Colors

**File**: `public/css/style.css`

#### CSS Custom Properties (Line ~5-30)
```css
:root {
  /* Change primary color */
  --primary-color: #3498db;      /* Blue */
  --primary-dark: #2980b9;       /* Darker blue */
  
  /* Change secondary color */
  --secondary-color: #2ecc71;    /* Green */
  
  /* Change text colors */
  --text-color: #333333;
  --text-light: #666666;
  
  /* Change background colors */
  --bg-color: #ffffff;
  --bg-secondary: #f8f9fa;
}

/* Dark mode variables */
[data-theme="dark"] {
  --primary-color: #5dade2;      /* Lighter blue for dark mode */
  --text-color: #e0e0e0;
  --bg-color: #1a1a1a;
  --bg-secondary: #2d2d2d;
}
```

### Update Fonts

**File**: `public/css/style.css` (Line ~35-45)

```css
body {
  font-family: 'Your Font', 'Segoe UI', Arial, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Your Heading Font', 'Georgia', serif;
}
```

**Add Google Fonts** in `views/partials/header.ejs`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@400;700&display=swap" rel="stylesheet">
```

### Customize Components

Modify specific component styles in `style.css`:

- **Navigation**: Lines ~100-200
- **Hero Section**: Lines ~300-400
- **Cards**: Lines ~500-600
- **Buttons**: Lines ~700-800
- **Forms**: Lines ~900-1000

---

## Quick Update Checklist

### New Blog Post
- [ ] Go to `/admin` or create `.md` file in `/posts`
- [ ] Add title, date, author, slug, tags
- [ ] Write content in markdown
- [ ] Save/commit and push

### Update Personal Info
- [ ] Edit `views/index.ejs`
- [ ] Update hero, about, and skills sections
- [ ] Commit and push

### Update Projects
- [ ] Change GitHub username in `app.js`
- [ ] (Optional) Add GitHub token for higher rate limits
- [ ] Update fallback projects if needed
- [ ] Commit and push

### Add New Hobby
- [ ] Add hobby object in `app.js` `getHobbyData()` function
- [ ] Add hobby to list in `/hobbies` route
- [ ] Choose Font Awesome icon
- [ ] Commit and push

### Update Podcast
- [ ] Edit `views/podcast.ejs`
- [ ] Update episode cards with new content
- [ ] Add episode images to `/public/images`
- [ ] Update subscription links
- [ ] Commit and push

### Update Navigation/Footer
- [ ] Edit `views/partials/navigation.ejs` for menu
- [ ] Edit `views/partials/footer.ejs` for footer
- [ ] Update social links and copyright
- [ ] Commit and push

### Change Theme/Colors
- [ ] Edit CSS custom properties in `public/css/style.css`
- [ ] Update `:root` and `[data-theme="dark"]` variables
- [ ] (Optional) Add Google Fonts
- [ ] Commit and push

---

## Deployment Workflow

After making any content changes:

```bash
# 1. Check your changes
git status

# 2. Stage changes
git add .

# 3. Commit with descriptive message
git commit -m "Update: describe your changes here"

# 4. Push to GitHub
git push origin main

# 5. Vercel automatically deploys
# Wait 1-2 minutes and check your live site
```

**Verify deployment:**
- Go to Vercel dashboard
- Check latest deployment status
- Click deployment to see build logs
- Visit your live site to confirm changes

---

## Pro Tips

### Preview Changes Locally First
```bash
npm run dev
# Visit http://localhost:3000
# Test all changes before pushing
```

### Use Git Branches for Major Changes
```bash
git checkout -b feature/new-content
# Make changes
git push origin feature/new-content
# Creates Vercel preview deployment
# Merge to main when ready
```

### Backup Content Before Deleting
```bash
# Create a backup branch
git checkout -b backup/old-content
git push origin backup/old-content

# Switch back to main
git checkout main
# Now safely delete content
```

### Keep Admin Password Secure
- Use environment variable in Vercel
- Don't commit `.env` file
- Use strong, unique password

---

## Need Help?

- **Documentation**: Check `README.md` for project overview
- **Installation**: See `INSTALLATION.md` for setup guide
- **Issues**: Check existing issues or create new one on GitHub
- **Copilot**: Use `@workspace` commands for AI assistance

Your content is now ready to be updated easily!
