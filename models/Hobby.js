const mongoose = require('mongoose');

const stringList = [{
  type: String,
  trim: true
}];

const hobbySchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    trim: true
  },
  backgroundImage: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  why: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  highlights: stringList,
  goals: stringList,
  started: {
    type: String,
    trim: true
  },
  frequency: {
    type: String,
    trim: true
  },
  level: {
    type: String,
    trim: true
  },
  equipment: stringList,
  resources: stringList,
  order: {
    type: Number,
    default: 0
  },
  visible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

hobbySchema.index({ order: 1, title: 1 });

module.exports = mongoose.model('Hobby', hobbySchema);
