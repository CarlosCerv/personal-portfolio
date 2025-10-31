// FILE: models/Post.js
// MongoDB schema for blog posts

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  tags: [{
    type: String,
    trim: true
  }],
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Index for faster slug lookups
postSchema.index({ slug: 1 });

// Index for date sorting
postSchema.index({ date: -1 });

module.exports = mongoose.model('Post', postSchema);
