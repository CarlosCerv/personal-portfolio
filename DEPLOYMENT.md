# Deployment Guide

## Recommended: Deploy to Render (Free)

### Prerequisites
1. Create a GitHub account if you don't have one
2. Push your code to a GitHub repository

### Step-by-Step Deployment

#### 1. Prepare Your Code
```bash
# Make sure package.json has the correct start script
# This is already set up - no changes needed
```

#### 2. Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub

#### 3. Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `your-portfolio` (or any name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

#### 4. Add Environment Variables
In Render dashboard, add:
- **Key**: `ADMIN_PASSWORD`
- **Value**: Choose a strong password (not "admin123"!)
- **Key**: `NODE_ENV`
- **Value**: `production`

#### 5. Deploy
- Click "Create Web Service"
- Wait 2-3 minutes for deployment
- Your site will be live at: `https://your-portfolio.onrender.com`

### Important Notes

**Free Tier Limitations:**
- Service sleeps after 15 minutes of inactivity
- Takes ~30 seconds to wake up on first visit
- 750 hours/month (more than enough for personal use)

**Upgrade to Paid ($7/month) for:**
- Always-on service (no sleep)
- Better performance
- Custom domain support

---

## Alternative: Deploy to Railway

### Steps
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables:
   - `ADMIN_PASSWORD` = your secure password
   - `NODE_ENV` = production
6. Deploy automatically starts

**Free Tier:** $5 credit/month (usually sufficient)

---

## Alternative: Deploy to Fly.io

### Install Fly CLI
```bash
brew install flyctl
```

### Deploy
```bash
# Login/signup
flyctl auth signup

# Launch app (from project directory)
flyctl launch

# Follow prompts:
# - App name: choose a name
# - Region: select closest to you
# - PostgreSQL: No
# - Redis: No
# - Deploy now: Yes

# Set admin password
flyctl secrets set ADMIN_PASSWORD=your_secure_password
```

### Fly.io Benefits
- Always-on (doesn't sleep)
- 3 free VMs with 256MB RAM each
- Global deployment
- Custom domains (free)

---

## Environment Variables to Set

For production deployment, set these environment variables:

```env
NODE_ENV=production
ADMIN_PASSWORD=your_very_secure_password_here
PORT=3000
```

**Important:** Never use "admin123" in production!

---

## Post-Deployment

### Test Your Deployment
1. Visit your deployed URL
2. Test navigation and pages
3. Go to `/admin` and login
4. Create a test blog post
5. Verify it appears on `/blog`

### Custom Domain (Optional)
Most platforms support custom domains:
- **Render**: Settings → Custom Domains
- **Railway**: Settings → Domains
- **Fly.io**: `flyctl certs add yourdomain.com`

### Monitoring
- Check logs in your platform's dashboard
- Set up uptime monitoring: [UptimeRobot](https://uptimerobot.com) (free)

---

## Troubleshooting

### Build Fails
- Check Node.js version in package.json engines
- Verify all dependencies are in package.json
- Check build logs for specific errors

### App Crashes
- Review application logs in platform dashboard
- Common issues:
  - Port binding (use `process.env.PORT || 3000`)
  - Missing environment variables
  - File system paths (use `__dirname` for relative paths)

### Admin Not Working
- Verify `ADMIN_PASSWORD` environment variable is set
- Check browser console for errors
- Try clearing browser cache

---

## Cost Comparison

| Platform | Free Tier | Always-On | Custom Domain | Ease of Use |
|----------|-----------|-----------|---------------|-------------|
| Render   | Yes (sleeps) | No | Yes ($7/mo) | ⭐⭐⭐⭐⭐ |
| Railway  | $5 credit/mo | Yes | Yes | ⭐⭐⭐⭐⭐ |
| Fly.io   | 3 VMs | Yes | Yes | ⭐⭐⭐⭐ |
| Heroku   | Removed free tier | - | - | - |

**Recommendation:** Start with **Render** for simplicity, or **Fly.io** if you need always-on service.

---

## Security Checklist

Before deploying:

- [ ] Change `ADMIN_PASSWORD` from default
- [ ] Use environment variables (not hardcoded passwords)
- [ ] Enable HTTPS (automatically handled by platforms)
- [ ] Test admin authentication
- [ ] Review error messages don't leak sensitive info
- [ ] Consider rate limiting for `/admin` route (future enhancement)

---

## Continuous Deployment

Once set up, all platforms support auto-deploy:

1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```

2. Platform automatically:
   - Detects changes
   - Runs build
   - Deploys new version
   - Usually takes 2-3 minutes

---

## Need Help?

- **Render Docs**: https://render.com/docs
- **Railway Docs**: https://docs.railway.app
- **Fly.io Docs**: https://fly.io/docs

Good luck with your deployment! 🚀
