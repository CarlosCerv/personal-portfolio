# Database Setup Guide

This application uses MongoDB to store blog posts. You can use either a local MongoDB instance or a cloud-hosted database like MongoDB Atlas.

## Table of Contents
- [Local MongoDB Setup](#local-mongodb-setup)
- [MongoDB Atlas Setup (Cloud)](#mongodb-atlas-setup-cloud)
- [Vercel Deployment with MongoDB](#vercel-deployment-with-mongodb)
- [Migrating Existing Posts](#migrating-existing-posts)
- [Environment Variables](#environment-variables)

---

## Local MongoDB Setup

### 1. Install MongoDB

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows:**
Download and install from: https://www.mongodb.com/try/download/community

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 2. Verify MongoDB is Running

```bash
# Check if MongoDB is running
mongosh

# You should see MongoDB shell prompt
# Type 'exit' to quit
```

### 3. Start Your Application

```bash
npm start
```

The app will automatically connect to `mongodb://localhost:27017/personal-portfolio`

---

## MongoDB Atlas Setup (Cloud)

MongoDB Atlas provides a free tier that's perfect for personal portfolios.

### 1. Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Choose the free tier (M0)

### 2. Create a Cluster

1. Click **"Build a Database"**
2. Choose **"FREE"** tier (M0 Sandbox)
3. Select your preferred cloud provider and region
4. Click **"Create Cluster"**

### 3. Create Database User

1. Go to **"Database Access"** in the left menu
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter username and password (save these!)
5. Set **"Built-in Role"** to **"Read and write to any database"**
6. Click **"Add User"**

### 4. Configure Network Access

1. Go to **"Network Access"** in the left menu
2. Click **"Add IP Address"**
3. For development: Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. For production: Add your server's specific IP address
5. Click **"Confirm"**

### 5. Get Connection String

1. Go back to **"Database"**
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual database user password
6. Add database name before the `?`: 
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/personal-portfolio?retryWrites=true&w=majority
   ```

### 6. Set Environment Variable

**Local development** - Create `.env` file:
```bash
echo "MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/personal-portfolio?retryWrites=true&w=majority" > .env
```

**Or export directly:**
```bash
export MONGODB_URI="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/personal-portfolio?retryWrites=true&w=majority"
```

### 7. Update Your App (Optional)

If you want to use .env file, install dotenv:
```bash
npm install dotenv
```

Add to top of `app.js`:
```javascript
require('dotenv').config();
```

---

## Vercel Deployment with MongoDB

### 1. Set Environment Variable in Vercel

**Via Dashboard:**
1. Go to your Vercel project
2. Click **"Settings"** → **"Environment Variables"**
3. Add variable:
   - **Name**: `MONGODB_URI`
   - **Value**: Your MongoDB Atlas connection string
   - **Environments**: Select all (Production, Preview, Development)
4. Click **"Save"**

**Via CLI:**
```bash
vercel env add MONGODB_URI
# Paste your connection string when prompted
# Select all environments
```

### 2. Redeploy

```bash
vercel --prod
```

Your Vercel deployment will now connect to MongoDB Atlas!

---

## Migrating Existing Posts

If you have existing markdown posts in the `/posts` directory, migrate them to MongoDB:

### 1. Ensure MongoDB is Running

**Local MongoDB:**
```bash
# Check if running
mongosh
```

**MongoDB Atlas:**
- Make sure `MONGODB_URI` environment variable is set

### 2. Run Migration Script

```bash
npm run migrate
```

This will:
- ✅ Connect to MongoDB
- ✅ Read all `.md` files from `/posts` directory
- ✅ Parse frontmatter and content
- ✅ Create database records for each post
- ✅ Skip posts that already exist in database

**Example output:**
```
✅ Connected to MongoDB
📁 Found 3 markdown files
✅ Migrated: "Getting Started with Node.js and Express"
✅ Migrated: "Building Scalable Microservices"
✅ Migrated: "Journey from Bootcamp to Senior Developer"

📊 Migration Summary:
   Migrated: 3 posts
   Skipped: 0 posts (already in database)
   Total: 3 files processed
```

### 3. Verify Migration

Visit your blog page to see all migrated posts!

---

## Environment Variables

### Required Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/personal-portfolio` | `mongodb+srv://user:pass@cluster.mongodb.net/personal-portfolio` |
| `ADMIN_PASSWORD` | Admin platform password | `admin123` | `your-secure-password` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |

### Setting Environment Variables

**Local development** - `.env` file:
```bash
MONGODB_URI=mongodb://localhost:27017/personal-portfolio
ADMIN_PASSWORD=your-secure-password
PORT=3000
```

**Production (Vercel)**:
```bash
vercel env add MONGODB_URI
vercel env add ADMIN_PASSWORD
```

---

## Database Schema

### Post Model

```javascript
{
  title: String,        // Post title
  slug: String,         // URL-friendly identifier (unique)
  content: String,      // Markdown content
  author: String,       // Author name
  date: Date,           // Publication date
  tags: [String],       // Array of tags
  published: Boolean,   // Visibility status
  createdAt: Date,      // Auto-generated
  updatedAt: Date       // Auto-generated
}
```

---

## Troubleshooting

### Connection Error: MongooseServerSelectionError

**Problem**: Can't connect to MongoDB

**Solutions**:
- **Local MongoDB**: Make sure MongoDB is running (`brew services start mongodb-community` or `sudo systemctl start mongod`)
- **MongoDB Atlas**: 
  - Check your connection string is correct
  - Verify network access allows your IP
  - Confirm database user credentials are correct

### Migration Script Not Finding Posts

**Problem**: Migration script says "No markdown files found"

**Solution**: 
- Ensure `/posts` directory exists
- Check that files have `.md` extension
- Run migration from project root directory

### Slug Already Exists Error

**Problem**: Can't save post - slug already exists

**Solution**:
- Change the slug to something unique
- Or edit the existing post instead of creating new one

### Posts Not Showing on Blog Page

**Problem**: Created posts but they don't appear

**Solutions**:
- Check MongoDB connection is successful (look for "✅ Connected to MongoDB" in console)
- Verify `published` field is `true`
- Check browser console for errors

---

## Database Management

### View All Posts in MongoDB

**Using mongosh:**
```bash
mongosh
use personal-portfolio
db.posts.find().pretty()
```

**Using MongoDB Compass:**
1. Download: https://www.mongodb.com/products/compass
2. Connect using your connection string
3. Navigate to `personal-portfolio` database → `posts` collection

### Delete All Posts (Careful!)

```bash
mongosh
use personal-portfolio
db.posts.deleteMany({})
```

### Backup Database

**Export to JSON:**
```bash
mongoexport --db=personal-portfolio --collection=posts --out=posts-backup.json
```

**Import from JSON:**
```bash
mongoimport --db=personal-portfolio --collection=posts --file=posts-backup.json
```

---

## Next Steps

1. ✅ Set up MongoDB (local or Atlas)
2. ✅ Configure `MONGODB_URI` environment variable
3. ✅ Run migration script to import existing posts
4. ✅ Test admin platform at `/admin`
5. ✅ Deploy to Vercel with environment variables

Your blog now uses MongoDB for persistent, scalable storage! 🚀
