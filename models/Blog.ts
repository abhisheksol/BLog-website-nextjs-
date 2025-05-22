import mongoose from 'mongoose';

// Make sure User model is registered before using it in ref
import './User';

const blogSchema = new mongoose.Schema({
  title: String,
  desc: String,
  image: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
