# Installation & Vercel Deployment Guide

This guide will walk you through installing the project locally and deploying it to Vercel with automatic deployments.

## Prerequisites

- Node.js 14+ installed
- Git installed
- MongoDB (local or Atlas account for cloud) - **Required for blog functionality**
- A GitHub account
- A Vercel account (free tier works)

---

## Part 1: Local Installation

### 1. Clone the Repository

```bash
git clone https://github.com/CarlosCerv/personal-portfolio.git
cd personal-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud - Recommended)**

See detailed instructions in [`DATABASE_SETUP.md`](./DATABASE_SETUP.md)

Quick setup:
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster (M0 free tier)
3. Get connection string
4. Add to `.env` file

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/personal-portfolio
ADMIN_PASSWORD=your-secure-password
EOF
```

Or for MongoDB Atlas:
```bash
cat > .env << EOF
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/personal-portfolio
ADMIN_PASSWORD=your-secure-password
EOF
```

### 5. Migrate Existing Posts (Optional)

If you have markdown posts in `/posts` directory:

```bash
npm run migrate
```

### 6. Run Locally

```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

The site will be available at: `http://localhost:3000`

---

## Part 2: Vercel Deployment Setup

### Option A: Deploy via Vercel Dashboard (Recommended)

This method automatically connects your GitHub repository for continuous deployment.

#### Step 1: Import from GitHub

1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. If not connected, click **"Connect GitHub Account"**
4. Authorize Vercel to access your repositories
5. Find and select: `CarlosCerv/personal-portfolio`
6. Click **"Import"**

#### Step 2: Configure Project Settings

Vercel will auto-detect your project settings:

- **Framework Preset**: Other
- **Root Directory**: `./` (default)
- **Build Command**: Leave empty (not needed)
- **Output Directory**: Leave empty (not needed)
- **Install Command**: `npm install` (default)

The `vercel.json` file in your repository handles the configuration automatically.

#### Step 3: Add Environment Variables (Required)

**You must add MongoDB connection string for the blog to work!**

1. Before clicking "Deploy", expand **"Environment Variables"**
2. Add variables:
   - **Name**: `MONGODB_URI`
   - **Value**: Your MongoDB Atlas connection string (see [`DATABASE_SETUP.md`](./DATABASE_SETUP.md))
   - **Environment**: All (Production, Preview, Development)
   - Click **"Add"**
   
   - **Name**: `ADMIN_PASSWORD`
   - **Value**: `your-secure-password`
   - **Environment**: All (Production, Preview, Development)
   - Click **"Add"**

**Important**: Use MongoDB Atlas (cloud) for Vercel deployment, not local MongoDB!

#### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for the build to complete
3. Your site will be live at: `https://personal-portfolio-[random].vercel.app`

#### Step 5: Verify Auto-Deployment

Once deployed, Vercel is automatically connected to your GitHub repository:

- Every push to `main` branch → Deploys to production
- Every push to other branches → Creates preview deployment
- Pull requests → Creates preview deployments with unique URLs

**Test it:**
```bash
# Make a small change
echo "# Test" >> README.md
git add README.md
git commit -m "Test auto-deployment"
git push origin main
```

Go to your Vercel dashboard to see the automatic deployment in progress!

---

### Option B: Deploy via Vercel CLI

Use this method if you prefer command-line deployment.

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

This will open your browser for authentication. Enter the code shown in your terminal.

#### Step 3: Deploy to Production

```bash
vercel --prod
```

Answer the prompts:
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No** (first time) or **Yes** (if project exists)
- Project name? **personal-website** (or your preferred name)
- Code directory? **./`** (default)
- Want to modify settings? **No**
- Connect to git repository? **Yes**

#### Step 4: Connect GitHub Repository (for Auto-Deploy)

After deployment, you need to manually connect in the dashboard:

1. Go to: https://vercel.com/[your-username]/personal-website
2. Click **"Settings"** → **"Git"**
3. Click **"Connect Git Repository"**
4. Select **GitHub**
5. Choose: `CarlosCerv/personal-portfolio`
6. Click **"Connect"**
7. Set Production Branch to: `main`
8. Click **"Save"**

Now every push to `main` will auto-deploy!

---

## Part 3: Post-Deployment Configuration

### Set Custom Domain (Optional)

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Domains"**
3. Click **"Add"**
4. Enter your domain (e.g., `carloscervantes.com`)
5. Follow the instructions to update your DNS records
6. Wait for DNS propagation (can take up to 48 hours)

### Configure Environment Variables

Add the admin password in Vercel:

1. Go to **"Settings"** → **"Environment Variables"**
2. Click **"Add New"**
3. **Key**: `ADMIN_PASSWORD`
4. **Value**: Your secure password
5. **Environments**: Select all (Production, Preview, Development)
6. Click **"Save"**
7. Redeploy for changes to take effect

### View Deployment Logs

Monitor your deployments:

1. Go to your project dashboard
2. Click on **"Deployments"**
3. Click on any deployment to see:
   - Build logs
   - Function logs
   - Deployment status
   - Preview URL

Or use CLI:
```bash
vercel logs
```

---

## Part 4: Continuous Deployment Workflow

### How It Works

Once connected, your workflow is:

```bash
# 1. Make changes locally
vim app.js

# 2. Test locally
npm run dev

# 3. Commit changes
git add .
git commit -m "Update feature"

# 4. Push to GitHub
git push origin main

# 5. Vercel automatically:
#    - Detects the push
#    - Builds the project
#    - Runs tests (if any)
#    - Deploys to production
#    - Updates your live site
```

### Branch Previews

Create preview deployments for testing:

```bash
# Create a feature branch
git checkout -b feature/new-design

# Make changes and push
git push origin feature/new-design
```

Vercel will create a preview URL like:
`https://personal-portfolio-[branch]-[username].vercel.app`

### Pull Request Previews

When you create a pull request on GitHub:
- Vercel automatically comments with a preview URL
- Each commit updates the preview
- Perfect for reviewing changes before merging

---

## Part 5: Troubleshooting

### Build Fails

**Check logs:**
1. Go to Vercel dashboard → Deployments
2. Click the failed deployment
3. Check "Build Logs" for errors

**Common issues:**
- Missing dependencies → Run `npm install` locally first
- Port conflicts → Vercel handles this automatically
- Environment variables → Make sure they're set in Vercel settings

### Site Not Updating

**Check deployment status:**
```bash
vercel ls
```

**Force redeploy:**
```bash
vercel --prod --force
```

**Verify GitHub connection:**
1. Go to Settings → Git in Vercel dashboard
2. Ensure repository is connected
3. Verify production branch is set to `main`

### Admin Password Not Working

**Set via Vercel dashboard:**
1. Settings → Environment Variables
2. Add `ADMIN_PASSWORD`
3. Redeploy the project

**Or via CLI:**
```bash
vercel env add ADMIN_PASSWORD
# Enter your password when prompted
# Select: Production, Preview, Development
vercel --prod
```

### GitHub Auto-Deploy Not Working

**Verify connection:**
1. Go to Vercel dashboard → Settings → Git
2. If disconnected, click "Connect Git Repository"
3. Reauthorize GitHub if needed

**Check GitHub permissions:**
1. Go to GitHub → Settings → Applications
2. Find "Vercel" in OAuth Apps
3. Ensure it has access to your repository

---

## Part 6: Useful Commands

### Local Development
```bash
npm run dev          # Start dev server with auto-reload
npm start            # Start production server
npm install          # Install dependencies
```

### Vercel CLI
```bash
vercel               # Deploy to preview
vercel --prod        # Deploy to production
vercel ls            # List deployments
vercel logs          # View latest logs
vercel logs [url]    # View specific deployment logs
vercel env ls        # List environment variables
vercel env add       # Add environment variable
vercel env rm        # Remove environment variable
vercel domains ls    # List domains
vercel domains add   # Add custom domain
vercel projects ls   # List all projects
vercel --help        # Show all commands
```

### Git Workflow
```bash
git status           # Check changes
git add .            # Stage all changes
git commit -m "msg"  # Commit with message
git push origin main # Push to GitHub (triggers Vercel)
git log --oneline    # View commit history
```

---

## Summary

✅ **Installation**: Clone → `npm install` → `npm run dev`

✅ **Vercel Setup**: Import from GitHub → Configure → Deploy

✅ **Auto-Deploy**: Push to `main` → Automatic deployment

✅ **Admin Access**: `/admin` with password (set in environment variables)

✅ **Custom Domain**: Add in Vercel dashboard settings

Your site is now live with continuous deployment! Every push to GitHub automatically updates your production site. 🚀
