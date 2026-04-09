const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'spam'],
    default: 'approved' // Set to pending if moderation is needed
  }
}, {
  timestamps: true
});

// Index for performance
commentSchema.index({ post: 1, createdAt: -1 });

module.exports = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
