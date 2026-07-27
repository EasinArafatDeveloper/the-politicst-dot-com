const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://the-politicst:q6g2EW6EEhwjVmKF@cluster0.biasmpt.mongodb.net/the-politicst?retryWrites=true&w=majority";

const ArticleSchema = new mongoose.Schema({
  title: { en: { type: String, required: true }, bn: { type: String, required: true } },
  content: { en: { type: String, required: true }, bn: { type: String, required: true } },
  excerpt: { en: { type: String, required: true }, bn: { type: String, required: true } },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  section: { type: String, required: true },
  imageUrl: { type: String, required: true },
  author: { type: String },
  publishedAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 }
}, { timestamps: true });

const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);

const nationalArticles = [
  { // Left 1
    title: { bn: 'টুথপেস্টে মাইক্রোপ্লাস্টিক বিষয়ে কী বলছেন বিশেষজ্ঞরা', en: 'What experts say about microplastics in toothpaste' },
    content: { bn: 'বিশেষজ্ঞরা বলছেন...', en: 'Experts say...' },
    excerpt: { bn: 'বিশেষজ্ঞরা বলছেন...', en: 'Experts say...' },
    slug: 'microplastic-experts-say', category: 'national', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=400'
  },
  { // Left 2
    title: { bn: 'সহজে চিনে নিন ক্ষতিকর ‘মাইক্রোপ্লাস্টিক’যুক্ত টুথপেস্ট', en: 'Easily identify harmful microplastic toothpastes' },
    content: { bn: 'সহজে চিনে নিন...', en: 'Easily identify...' },
    excerpt: { bn: 'সহজে চিনে নিন...', en: 'Easily identify...' },
    slug: 'identify-harmful-toothpaste', category: 'national', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=400'
  },
  { // Middle 1
    title: { bn: 'টুথপেস্টে থাকা মাইক্রোপ্লাস্টিক শরীরের জন্য কতটা ক্ষতিকর', en: 'How harmful are microplastics in toothpaste for the body' },
    content: { bn: 'দৈনন্দিন জীবনের অপরিহার্য পণ্য টুথপেস্টেই মিলেছে মাইক্রোপ্লাস্টিকের উপস্থিতি...', en: 'Microplastics found in daily essential toothpaste...' },
    excerpt: { bn: 'দৈনন্দিন জীবনের অপরিহার্য পণ্য টুথপেস্টেই মিলেছে মাইক্রোপ্লাস্টিকের উপস্থিতি, যা জনস্বাস্থ্য ও পরিবেশ উভয়ের জন্যই নতুন উদ্বেগের কারণ হয়ে উঠেছে।', en: 'Microplastics found in daily essential toothpaste, causing health concerns.' },
    slug: 'microplastic-harmful-effects', category: 'national', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1590455581177-3312c1c68270?auto=format&fit=crop&q=80&w=800' // blue paste image
  },
  { // Right 1
    title: { bn: 'সরকারি চাকরিজীবীদের টানা ৪ দিনের ছুটির সুযোগ', en: 'Govt employees 4-day holiday' },
    content: { bn: 'আগস্ট মাসে...', en: 'In August...' },
    excerpt: { bn: 'আগস্ট মাসে...', en: 'In August...' },
    slug: 'govt-holiday-4-days', category: 'national', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1541872516-2ba9ab43be2b?auto=format&fit=crop&q=80&w=400'
  },
  { // Right 2
    title: { bn: 'যে ৮ টুথপেস্টে পাওয়া যায়নি মাইক্রোপ্লাস্টিক', en: '8 toothpastes without microplastics' },
    content: { bn: 'গবেষণায় দেখা গেছে...', en: 'Research shows...' },
    excerpt: { bn: 'গবেষণায় দেখা গেছে...', en: 'Research shows...' },
    slug: '8-toothpaste-no-microplastic', category: 'national', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=400'
  },
  { // Right 3
    title: { bn: 'নবম পে-স্কেল বাস্তবায়ন নিয়ে নতুন জটিলতা, পিছিয়ে দেওয়ার পরামর্শ আইএমএফের', en: 'New complications in 9th pay scale implementation' },
    content: { bn: 'আইএমএফ বলছে...', en: 'IMF says...' },
    excerpt: { bn: 'আইএমএফ বলছে...', en: 'IMF says...' },
    slug: '9th-pay-scale-delay-imf', category: 'national', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=400'
  },
  { // Right 4
    title: { bn: 'এক বছর পর আবারও সচল হলো ঢাকা-নারিতা সরাসরি ফ্লাইট', en: 'Dhaka-Narita direct flight resumes after a year' },
    content: { bn: 'ঢাকা থেকে নারিতা...', en: 'Dhaka to Narita...' },
    excerpt: { bn: 'ঢাকা থেকে নারিতা...', en: 'Dhaka to Narita...' },
    slug: 'dhaka-narita-flight-resumes', category: 'national', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=400'
  }
];

async function seedNational() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully!");
    
    // Insert new data
    await Article.insertMany(nationalArticles);
    console.log("National realistic dummy data inserted successfully.");
    
    process.exit(0);
  } catch (err) {
    console.error("Error during seeding:", err);
    process.exit(1);
  }
}

seedNational();
