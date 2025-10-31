// FILE: migrate-posts.js
// Script to migrate existing markdown posts to MongoDB

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const mongoose = require('mongoose');
const Post = require('./models/Post');

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-portfolio';

async function migratePosts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    const postsDirectory = path.join(__dirname, 'posts');
    
    // Check if posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      console.log('⚠️  No posts directory found');
      process.exit(0);
    }
    
    const files = fs.readdirSync(postsDirectory).filter(file => file.endsWith('.md'));
    
    if (files.length === 0) {
      console.log('⚠️  No markdown files found in posts directory');
      process.exit(0);
    }
    
    console.log(`📁 Found ${files.length} markdown files`);
    
    let migratedCount = 0;
    let skippedCount = 0;
    
    for (const filename of files) {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      
      // Parse frontmatter and content
      const { data, content } = matter(fileContents);
      
      const slug = data.slug || filename.replace('.md', '');
      
      // Check if post already exists
      const existingPost = await Post.findOne({ slug });
      
      if (existingPost) {
        console.log(`⏭️  Skipping "${data.title}" - already exists in database`);
        skippedCount++;
        continue;
      }
      
      // Create post in database
      await Post.create({
        slug,
        title: data.title || 'Untitled Post',
        date: data.date || new Date(),
        author: data.author || 'Carlos Cervantes',
        tags: data.tags || [],
        content: content.trim(),
        published: true
      });
      
      console.log(`✅ Migrated: "${data.title}"`);
      migratedCount++;
    }
    
    console.log('\n📊 Migration Summary:');
    console.log(`   Migrated: ${migratedCount} posts`);
    console.log(`   Skipped: ${skippedCount} posts (already in database)`);
    console.log(`   Total: ${files.length} files processed`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

// Run migration
migratePosts();
