import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    bn: { type: String, required: true }
  },
  content: {
    en: { type: String, required: true },
    bn: { type: String, required: true }
  },
  excerpt: {
    en: { type: String, required: true },
    bn: { type: String, required: true }
  },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true }, // e.g. 'national', 'politics'
  section: { type: String, required: true }, // e.g. 'latest', 'trending', 'featured'
  imageUrl: { type: String, required: true },
  author: { type: String },
  publishedAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);
