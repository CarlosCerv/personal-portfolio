# GitHub Actions & Deployment Guide

## 🎯 Quick Summary

Your portfolio is a **Node.js server application**, which means it needs a hosting platform that can run Node.js. GitHub Pages only hosts **static files** (HTML/CSS/JS), so it's not ideal for your setup.

**Recommended Approach:** Keep using Render + GitHub Actions for CI/CD

---

## ✅ Option 1: GitHub Actions + Render (RECOMMENDED)

This is the best approach for your Node.js application.

### What It Does:
- ✅ Runs tests on every push
- ✅ Automatically deploys to Render when you push to `main`
- ✅ Provides continuous integration and deployment (CI/CD)

### Setup Steps:

#### 1. GitHub Actions is Already Configured
The workflow file `.github/workflows/deploy.yml` is ready to use.

#### 2. Get Your Render Deploy Hook (Optional)
1. Go to your Render dashboard
2. Select your web service
3. Go to **Settings** → **Deploy Hook**
4. Copy the webhook URL

#### 3. Add Deploy Hook to GitHub (Optional)
1. Go to your GitHub repo: https://github.com/CarlosCerv/personal-portfolio
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `RENDER_DEPLOY_HOOK`
5. Value: Paste your Render webhook URL
6. Click **Add secret**

> **Note:** Even without the deploy hook, Render automatically deploys when you push to GitHub.

#### 4. Test It!
```bash
git add .
git commit -m "Add GitHub Actions workflow"
git push
```

Go to your repo → **Actions** tab to see the workflow running!

---

## 🌐 Option 2: Static Site on GitHub Pages

If you want a free `.github.io` URL, you can generate a static version of your site.

### ⚠️ Limitations:
- ❌ No admin blog platform (requires server)
- ❌ No dynamic GitHub projects fetching
- ❌ No server-side rendering
- ✅ Free hosting at `https://carloscerv.github.io/personal-portfolio`

### Setup Steps:

#### 1. Enable GitHub Pages
1. Go to your repo: https://github.com/CarlosCerv/personal-portfolio
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**

#### 2. Run the Static Site Generator
1. Go to **Actions** tab
2. Select **Generate Static Site for GitHub Pages**
3. Click **Run workflow** → **Run workflow**

#### 3. Access Your Site
After deployment completes, your site will be at:
```
https://carloscerv.github.io/personal-portfolio
```

### What Gets Generated:
- ✅ Homepage
- ✅ Projects page
- ✅ Blog posts
- ✅ Podcast page
- ✅ Hobbies pages
- ❌ Admin platform (won't work without server)

---

## 🚀 Option 3: Use Both! (Best of Both Worlds)

You can have:
- **Primary site on Render**: Full functionality with admin panel
  - `https://your-site.onrender.com`
- **Static backup on GitHub Pages**: Fast, free hosting
  - `https://carloscerv.github.io/personal-portfolio`

### Custom Domain Setup (Optional)

If you have a custom domain (e.g., `carloscervantes.dev`):

#### For Render:
1. Render Dashboard → Settings → Custom Domains
2. Add your domain
3. Update DNS records as instructed

#### For GitHub Pages:
1. Settings → Pages → Custom domain
2. Enter your domain
3. Add CNAME record: `carloscerv.github.io`

---

## 📊 Comparison Table

| Feature | Render (Current) | GitHub Pages | Both |
|---------|-----------------|--------------|------|
| **URL** | yoursite.onrender.com | carloscerv.github.io | Both URLs |
| **Admin Platform** | ✅ Yes | ❌ No | ✅ Render only |
| **Dynamic Content** | ✅ Yes | ❌ No | ✅ Render only |
| **Cost** | Free (sleeps) | Free (always on) | Free |
| **Custom Domain** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Auto Deploy** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Performance** | Good | Excellent | Best |

---

## 🔧 Workflow Details

### deploy.yml (Render Deployment)
```yaml
on:
  push:
    branches: [ main ]  # Triggers on push to main

jobs:
  test:     # Runs tests first
  deploy:   # Then deploys to Render
```

### static-pages.yml (GitHub Pages)
```yaml
on:
  workflow_dispatch:  # Manual trigger only

jobs:
  build:    # Generates static HTML files
  deploy:   # Deploys to GitHub Pages
```

---

## 📝 Next Steps

### Recommended:
1. ✅ Commit the GitHub Actions workflows
2. ✅ Keep using Render for main deployment
3. ✅ Optionally enable GitHub Pages for backup/portfolio link

### Commands:
```bash
# Commit the new workflows
git add .github/workflows/
git commit -m "Add GitHub Actions CI/CD workflows"
git push

# View workflows in action
# Go to: https://github.com/CarlosCerv/personal-portfolio/actions
```

---

## 🆘 Troubleshooting

### Workflow Fails
- Check **Actions** tab for error details
- Ensure `package.json` has correct Node.js version
- Verify all dependencies are in `package.json`

### GitHub Pages Not Working
- Ensure GitHub Pages is enabled in repo settings
- Check workflow completed successfully
- Wait 2-3 minutes for DNS propagation

### Render Deploy Not Triggering
- Verify `RENDER_DEPLOY_HOOK` secret is set correctly
- Check Render dashboard for deployment logs
- Render auto-deploys even without webhook

---

## 💡 Pro Tips

1. **Use Render for Development**: Full features, admin panel, dynamic content
2. **Use GitHub Pages for Resume**: Fast loading, always-on, great for sharing
3. **Add Both URLs to Your Resume**: Shows technical versatility
4. **Set Up Custom Domain**: More professional (optional)

---

## 🔗 Useful Links

- **Your Repo**: https://github.com/CarlosCerv/personal-portfolio
- **GitHub Actions Docs**: https://docs.github.com/actions
- **GitHub Pages Docs**: https://docs.github.com/pages
- **Render Docs**: https://render.com/docs

---

Need help with any of these options? Let me know which approach you'd like to use! 🚀
