# Deployment Guide

This guide provides comprehensive instructions for deploying the personal portfolio website to production using Vercel, as well as setting up local development environment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Variables](#environment-variables)
4. [MongoDB Configuration](#mongodb-configuration)
5. [Vercel Deployment](#vercel-deployment)
6. [GitHub Actions CI/CD](#github-actions-cicd)
7. [Post-Deployment Verification](#post-deployment-verification)
8. [Troubleshooting](#troubleshooting)
9. [Rollback Procedures](#rollback-procedures)

---

## Prerequisites

Before deploying, ensure you have the following:

- **Node.js** version 14.0.0 or higher
- **npm** or **yarn** package manager
- **Git** for version control
- **MongoDB** (local installation or MongoDB Atlas account)
- **Vercel account** (free tier available at https://vercel.com)
- **GitHub account** with repository access

### Verify Prerequisites

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/CarlosCerv/personal-portfolio.git
cd personal-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- express (web framework)
- ejs (templating engine)
- mongoose (MongoDB ODM)
- marked (markdown parser)
- gray-matter (frontmatter parser)

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/personal-portfolio

# Admin Panel Password
ADMIN_PASSWORD=your_secure_password_here

# Optional: GitHub Personal Access Token
GITHUB_TOKEN=ghp_your_github_token_here
```

### 4. Start MongoDB

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Windows:**
```bash
net start MongoDB
```

Or use the provided setup script:
```bash
./setup-mongodb.sh
```

### 5. Migrate Existing Posts (Optional)

If you have markdown posts in the `/posts` directory:

```bash
npm run migrate
```

### 6. Start Development Server

```bash
npm run dev
```

The server will start at `http://localhost:3000`

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/personal-portfolio` |
| `ADMIN_PASSWORD` | Password for admin panel access | `secure_password_123` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `3000` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `GITHUB_TOKEN` | GitHub API token for higher rate limits | `ghp_xxxxxxxxxxxxx` |

### Creating GitHub Token (Optional)

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scope: `public_repo`
4. Copy the generated token
5. Add to `.env` file

---

## MongoDB Configuration

### Option 1: Local MongoDB

**Installation:**

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

**Verify Installation:**
```bash
mongosh
# You should see MongoDB shell prompt
# Type 'exit' to quit
```

**Connection String:**
```
mongodb://localhost:27017/personal-portfolio
```

### Option 2: MongoDB Atlas (Cloud)

**Setup Steps:**

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0 Sandbox)
   - Select cloud provider and region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access" in left menu
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter username and password (save these)
   - Set role to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access" in left menu
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add specific IP addresses
   - Click "Confirm"

5. **Get Connection String**
   - Go back to "Database"
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password
   - Add database name before the `?`:
   
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/personal-portfolio?retryWrites=true&w=majority
   ```

---

## Vercel Deployment

### Method 1: Vercel Dashboard (Recommended for First Deployment)

1. **Connect GitHub Repository**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Select `personal-portfolio` repository

2. **Configure Project**
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Install Command: `npm install`

3. **Set Environment Variables**
   
   Click "Environment Variables" and add:
   
   | Name | Value |
   |------|-------|
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `ADMIN_PASSWORD` | Your secure admin password |
   | `NODE_ENV` | `production` |
   | `GITHUB_TOKEN` | (Optional) Your GitHub token |

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (1-2 minutes)
   - Visit your deployed site

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy to Production**
   ```bash
   vercel --prod
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add MONGODB_URI
   # Paste your MongoDB connection string when prompted
   # Select: Production, Preview, Development
   
   vercel env add ADMIN_PASSWORD
   # Enter your admin password
   # Select: Production, Preview, Development
   
   vercel env add NODE_ENV
   # Enter: production
   # Select: Production
   ```

5. **Redeploy with New Variables**
   ```bash
   vercel --prod
   ```

### Vercel Configuration

The project includes `vercel.json` with the following configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app.js"
    }
  ]
}
```

This configuration:
- Uses Node.js runtime
- Routes all requests to `app.js`
- Supports serverless functions

---

## GitHub Actions CI/CD

The project includes automated CI/CD workflows in `.github/workflows/`:

### deploy.yml (Continuous Deployment)

**Triggers:**
- Push to `main` branch
- Pull requests to `main` branch

**Jobs:**
1. **Test Job**
   - Checks out code
   - Sets up Node.js 18
   - Installs dependencies
   - Checks syntax errors
   - Sets up MongoDB for testing
   - Verifies server starts successfully

2. **Deploy Job**
   - Runs only on push to `main`
   - Triggers Render deploy hook (if configured)
   - Note: Vercel auto-deploys from GitHub

**Configuration:**

To add Render deploy hook (optional):
1. Go to GitHub repository Settings
2. Navigate to Secrets and variables > Actions
3. Click "New repository secret"
4. Name: `RENDER_DEPLOY_HOOK`
5. Value: Your Render webhook URL

### static-pages.yml (GitHub Pages)

**Trigger:** Manual workflow dispatch

This workflow is disabled by default. It can deploy a static version to GitHub Pages if needed.

---

## Post-Deployment Verification

### 1. Verify Deployment Status

**Vercel Dashboard:**
- Go to https://vercel.com/dashboard
- Check deployment status
- Review build logs if needed

**Command Line:**
```bash
vercel ls
```

### 2. Test Website Functionality

Visit your deployed site and verify:

- **Homepage** (`/`)
  - Hero section loads
  - Stats display correctly
  - Skills section renders
  - Dark mode toggle works

- **Blog** (`/blog`)
  - Blog posts list displays
  - Search functionality works
  - Tag filtering works

- **Projects** (`/projects`)
  - GitHub projects load
  - Project cards display correctly

- **Podcast** (`/podcast`)
  - Episodes display
  - Platform links work

- **Hobbies** (`/hobbies`)
  - Hobbies list displays
  - Individual hobby pages load

- **Admin Panel** (`/admin`)
  - Login page loads
  - Admin password authentication works
  - Blog editor accessible
  - Can create/edit/delete posts

### 3. Verify MongoDB Connection

Check Vercel deployment logs:
```
SUCCESS: Connected to MongoDB
Database: personal-portfolio
```

### 4. Test Environment Variables

Verify in Vercel dashboard:
- Settings > Environment Variables
- All required variables are set
- Values are correct for production

### 5. Performance Check

Use tools to verify performance:
- **Lighthouse** (Chrome DevTools)
- **GTmetrix** (https://gtmetrix.com)
- **WebPageTest** (https://www.webpagetest.org)

Target metrics:
- Performance score: 90+
- First Contentful Paint: < 2s
- Time to Interactive: < 3s

---

## Troubleshooting

### Deployment Fails

**Issue:** Vercel deployment fails with build errors

**Solutions:**
1. Check build logs in Vercel dashboard
2. Verify `package.json` has correct dependencies
3. Ensure Node.js version is compatible (>= 14.0.0)
4. Check for syntax errors: `node -c app.js`

### MongoDB Connection Error

**Issue:** `MongooseServerSelectionError: Could not connect to MongoDB`

**Solutions:**
1. Verify `MONGODB_URI` environment variable is set correctly
2. Check MongoDB Atlas network access allows Vercel IPs (use 0.0.0.0/0)
3. Verify database user credentials are correct
4. Ensure connection string includes database name

### Admin Panel Not Working

**Issue:** Cannot login to admin panel

**Solutions:**
1. Verify `ADMIN_PASSWORD` environment variable is set in Vercel
2. Clear browser cache and cookies
3. Check browser console for errors
4. Verify password matches exactly (case-sensitive)

### GitHub Projects Not Loading

**Issue:** Projects page shows fallback data or errors

**Solutions:**
1. Check GitHub API rate limits
2. Add `GITHUB_TOKEN` environment variable
3. Verify GitHub username in `app.js` is correct
4. Check browser console for API errors

### Static Assets Not Loading

**Issue:** CSS, JS, or images not loading

**Solutions:**
1. Verify files exist in `/public` directory
2. Check file paths are correct (case-sensitive)
3. Clear browser cache
4. Check Vercel deployment includes all files

### Environment Variables Not Working

**Issue:** Environment variables not available in production

**Solutions:**
1. Verify variables are set in Vercel dashboard
2. Ensure variables are set for "Production" environment
3. Redeploy after adding new variables
4. Check variable names match exactly (case-sensitive)

---

## Rollback Procedures

### Rollback to Previous Deployment

**Via Vercel Dashboard:**
1. Go to Vercel dashboard
2. Select your project
3. Click "Deployments" tab
4. Find previous successful deployment
5. Click three dots menu
6. Select "Promote to Production"

**Via Vercel CLI:**
```bash
# List recent deployments
vercel ls

# Promote specific deployment
vercel promote <deployment-url>
```

### Rollback via Git

**Revert Last Commit:**
```bash
git revert HEAD
git push origin main
```

**Revert to Specific Commit:**
```bash
git log --oneline
git revert <commit-hash>
git push origin main
```

### Emergency Rollback

If site is completely broken:

1. **Pause Vercel Deployment**
   - Vercel Dashboard > Settings > Git
   - Disable "Automatic Deployments"

2. **Fix Issues Locally**
   ```bash
   # Test locally
   npm run dev
   
   # Verify fixes work
   ```

3. **Deploy Fixed Version**
   ```bash
   git add .
   git commit -m "Fix: emergency deployment fix"
   git push origin main
   ```

4. **Re-enable Auto Deployment**
   - Vercel Dashboard > Settings > Git
   - Enable "Automatic Deployments"

---

## Deployment Checklist

### Pre-Deployment

- [ ] All code changes committed to Git
- [ ] Local testing completed successfully
- [ ] MongoDB connection tested
- [ ] Environment variables documented
- [ ] Admin password is secure
- [ ] GitHub token created (if needed)

### Vercel Setup

- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Environment variables configured
- [ ] MongoDB Atlas setup completed
- [ ] Network access configured

### Post-Deployment

- [ ] Deployment succeeded
- [ ] All pages load correctly
- [ ] MongoDB connection verified
- [ ] Admin panel accessible
- [ ] GitHub projects loading
- [ ] Blog posts displaying
- [ ] Performance metrics acceptable
- [ ] Error monitoring configured

---

## Additional Resources

- **Vercel Documentation**: https://vercel.com/docs
- **MongoDB Atlas Documentation**: https://docs.atlas.mongodb.com
- **Express.js Documentation**: https://expressjs.com
- **GitHub Actions Documentation**: https://docs.github.com/actions

---

## Support

For issues or questions:
1. Check this deployment guide
2. Review project README.md
3. Check existing GitHub issues
4. Create new issue with detailed description

---

Last Updated: 2026-02-02
