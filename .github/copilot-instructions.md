# Copilot Instructions for Personal Portfolio Website

## Architecture Overview

This is a Node.js/Express personal portfolio website with server-side rendering using EJS templates. The app follows a traditional MVC pattern with routes in `app.js`, views in `/views`, and static assets in `/public`.

**Key Components:**
- **Blog System**: Markdown files in `/posts` with frontmatter, parsed using `gray-matter` and `marked`
- **Dynamic Projects**: GitHub API integration with fallback to hardcoded data
- **Hobby System**: Detailed hobby pages with rich structured data in `app.js`
- **Responsive Design**: Mobile-first CSS with dark/light mode toggle

## Development Workflows

**Local Development:**
```bash
npm run dev  # Uses nodemon for auto-restart
npm start    # Production mode
```

**File Structure Pattern:**
- Routes and data logic: `app.js` (single file for simplicity)
- Templates: `/views/*.ejs` with partials in `/views/partials/`
- Content: Markdown files in `/posts/` with YAML frontmatter
- Assets: `/public/css/`, `/public/js/`, `/public/images/`

## Critical Conventions

### Blog Post Format
All blog posts must include frontmatter:
```yaml
---
title: "Post Title"
date: 2024-10-15
author: "Author Name"
slug: "url-slug"
tags: ["Tag1", "Tag2"]
---
```

### EJS Template Pattern
Every page template receives:
- `title`: Page title for `<title>` tag
- `currentPage`: For navigation active state highlighting
- Page-specific data (posts, projects, hobby, etc.)

### Route Structure
- Homepage: `/` → `views/index.ejs`
- Blog list: `/blog` → `views/blog.ejs`
- Blog post: `/blog/:slug` → `views/post.ejs`
- Projects: `/projects` → `views/projects.ejs` (GitHub API)
- Hobbies: `/hobbies` → `views/hobbies.ejs`
- Hobby detail: `/hobbies/:slug` → `views/hobby-detail.ejs`

### GitHub Integration
The `getGitHubProjects()` function fetches from GitHub API with fallback data. Update the `username` variable in `app.js` and optionally add a GitHub token for higher rate limits.

## Content Management

### Admin Platform (NEW)
Access the blog admin platform at `/admin` with password authentication (default: `admin123`, configurable via `ADMIN_PASSWORD` env var).

**Admin Features:**
- Visual markdown editor with live preview
- Frontmatter form fields (title, slug, date, author, tags)
- Markdown toolbar for formatting (bold, italic, code, links, etc.)
- Auto-slug generation from title
- List all posts with edit/delete actions
- Keyboard shortcuts: Ctrl/Cmd+S to save, Ctrl/Cmd+P to toggle preview

**Admin Routes:**
- `/admin` - Login page
- `/admin/posts` - List all posts
- `/admin/posts/new` - Create new post
- `/admin/posts/edit/:slug` - Edit existing post
- API: `POST /admin/posts/save` - Save post
- API: `POST /admin/posts/delete/:slug` - Delete post

### Adding Blog Posts (Manual)
1. Create `.md` file in `/posts/` directory
2. Include required frontmatter (title, date, author, slug, tags)
3. Use standard markdown syntax
4. The `slug` field determines the URL (`/blog/slug`)

### Adding Hobbies
Hobby data is hardcoded in the `getHobbyData()` function in `app.js`. Each hobby needs:
- slug, title, subtitle, icon (Font Awesome class)
- description, why, experience, highlights, goals
- metadata: started, frequency, level, equipment, resources

### Customizing Personal Info
- Navigation brand: `views/partials/navigation.ejs`
- Homepage content: `views/index.ejs`
- Footer social links: `views/partials/footer.ejs`
- GitHub username: `app.js` line ~100

## Frontend Behavior

### Theme System
Dark/light mode toggle persists via localStorage. The theme state is managed in `/public/js/main.js` with CSS custom properties in `/public/css/style.css`.

### Blog Filtering
Client-side search and tag filtering implemented in `main.js`. Blog cards have `data-tags` attributes for filtering. Search works on title and excerpt text.

### Mobile Navigation
Hamburger menu with body scroll prevention when active. Navigation automatically closes on link clicks and outside clicks.

## Deployment Notes

- No environment variables required for basic functionality
- GitHub API is optional (has fallback data)
- Requires Node.js 14+ (specified in `package.json`)
- All routes return proper 404s via catch-all handler

When making changes, remember this is a personal portfolio site - maintain the professional QA engineer theme and ensure all content reflects the owner's expertise in mobile automation and quality assurance.