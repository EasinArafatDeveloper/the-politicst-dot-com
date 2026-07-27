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

const entertainmentArticles = [
  {
    title: { bn: 'ইমরান হাশমির নায়িকা হতে চান তাসনুভা তিশা', en: 'Tasnuva Tisha wants to be Emraan Hashmi\'s heroine' },
    content: { bn: 'বাংলাদেশের ছোট পর্দার জনপ্রিয় অভিনেত্রী তাসনুভা তিশা জানিয়েছেন, সুযোগ পেলে বলিউড অভিনেতা ইমরান হাশমির সঙ্গে অভিনয় করতে চান।', en: 'Tasnuva Tisha said...' },
    excerpt: { bn: 'বাংলাদেশের ছোট পর্দার জনপ্রিয় অভিনেত্রী তাসনুভা তিশা জানিয়েছেন, সুযোগ পেলে বলিউড অভিনেতা ইমরান হাশমির সঙ্গে অভিনয় করতে চান।', en: 'Tasnuva Tisha wants...' },
    slug: 'tasnuva-tisha-emraan-hashmi', category: 'entertainment', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: { bn: 'আরটিভিতে আজ (২৭ জুলাই) যা দেখবেন', en: 'What to watch on RTV today' },
    content: { bn: 'বৈচিত্র্যময় আয়োজন নিয়ে আজকের অনুষ্ঠানসূচি সাজিয়েছে বেসরকারি টেলিভিশন চ্যানেল আরটিভি।', en: 'RTV schedule today...' },
    excerpt: { bn: 'বৈচিত্র্যময় আয়োজন নিয়ে আজকের অনুষ্ঠানসূচি সাজিয়েছে বেসরকারি টেলিভিশন চ্যানেল আরটিভি।', en: 'RTV schedule today...' },
    slug: 'rtv-schedule-27-july', category: 'entertainment', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'প্রখ্যাত টেলিভিশন প্রযোজক মুস্তাফিজুর রহমান মারা গেছেন', en: 'Renowned TV producer Mostafizur Rahman passes away' },
    content: { bn: 'বাংলাদেশের টেলিভিশন অঙ্গনের অন্যতম প্রযোজক ও বিটিভির সাবেক মহাপরিচালক মুস্তাফিজুর রহমান আর নেই।', en: 'Producer passes away...' },
    excerpt: { bn: 'বাংলাদেশের টেলিভিশন অঙ্গনের অন্যতম প্রযোজক ও বিটিভির সাবেক মহাপরিচালক মুস্তাফিজুর রহমান আর নেই।', en: 'Producer passes away...' },
    slug: 'mostafizur-rahman-passes-away', category: 'entertainment', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'নিজের তন্বী চেহারার রহস্য জানালেন জয়া আহসান', en: 'Jaya Ahsan reveals her fitness secret' },
    content: { bn: 'জনপ্রিয় অভিনেত্রী জয়া আহসান সম্প্রতি কৌশিক গঙ্গোপাধ্যায় পরিচালিত সিনেমা আজও অর্ধাঙ্গিনীতে অভিনয়ের পর ব্যাপক প্রশংসা কুড়িয়েছেন।', en: 'Jaya Ahsan fitness...' },
    excerpt: { bn: 'জনপ্রিয় অভিনেত্রী জয়া আহসান সম্প্রতি কৌশিক গঙ্গোপাধ্যায় পরিচালিত সিনেমা আজও অর্ধাঙ্গিনীতে অভিনয়ের পর ব্যাপক প্রশংসা কুড়িয়েছেন।', en: 'Jaya Ahsan fitness...' },
    slug: 'jaya-ahsan-fitness-secret', category: 'entertainment', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'আজীবন সম্মাননা পাচ্ছেন আহমেদ শরীফ', en: 'Ahmed Sharif to get lifetime achievement award' },
    content: { bn: 'বাংলা চলচ্চিত্রে দীর্ঘ কয়েক দশকের অসামান্য অবদানের স্বীকৃতি হিসেবে বরেণ্য অভিনেতা আহমেদ শরীফকে আজীবন সম্মাননা দিতে যাচ্ছে নিউইয়র্ক বাংলা ফিল্ম ফেস্টিভ্যাল।', en: 'Ahmed Sharif lifetime award...' },
    excerpt: { bn: 'বাংলা চলচ্চিত্রে দীর্ঘ কয়েক দশকের অসামান্য অবদানের স্বীকৃতি হিসেবে বরেণ্য অভিনেতা আহমেদ শরীফকে আজীবন সম্মাননা দিতে যাচ্ছে নিউইয়র্ক বাংলা ফিল্ম ফেস্টিভ্যাল।', en: 'Ahmed Sharif lifetime award...' },
    slug: 'ahmed-sharif-lifetime-award', category: 'entertainment', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400'
  }
];

const sportsArticles = [
  {
    title: { bn: 'খেলোয়াড়দের জন্য কি আলাদা টুথপেস্ট লাগে?', en: 'Do players need special toothpaste?' },
    content: { bn: 'খেলোয়াড়দের জন্য কি আলাদা টুথপেস্ট লাগে? বিশেষজ্ঞরা কী বলছেন...', en: 'Do players need special toothpaste?' },
    excerpt: { bn: 'খেলোয়াড়দের জন্য কি আলাদা টুথপেস্ট লাগে? বিশেষজ্ঞরা কী বলছেন...', en: 'Do players need special toothpaste?' },
    slug: 'players-special-toothpaste', category: 'sports', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'শিশু ভক্তের অনুরোধে ২০৩০ বিশ্বকাপ পর্যন্ত চুক্তিতে সই করলেন স্কালোনি', en: 'Scaloni signs contract till 2030' },
    content: { bn: 'শিশু ভক্তের অনুরোধে...', en: 'Scaloni signs contract till 2030' },
    excerpt: { bn: 'শিশু ভক্তের অনুরোধে...', en: 'Scaloni signs contract till 2030' },
    slug: 'scaloni-signs-2030', category: 'sports', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1508344928928-7137b29de216?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'দরজায় চিরকুট টাঙিয়ে জন্মস্থান ছাড়লেন স্কালোনি', en: 'Scaloni leaves hometown' },
    content: { bn: 'বিশ্বকাপ ফাইনালের পর নিজের জন্মস্থান পুজাতোতে কয়েকদিন কাটিয়ে সবার অগোচরে শহর ছেড়েছেন আর্জেন্টিনা জাতীয় ফুটবল দলের প্রধান কোচ লিওনেল স্কালোনি।', en: 'Scaloni leaves hometown...' },
    excerpt: { bn: 'বিশ্বকাপ ফাইনালের পর নিজের জন্মস্থান পুজাতোতে কয়েকদিন কাটিয়ে সবার অগোচরে শহর ছেড়েছেন আর্জেন্টিনা জাতীয় ফুটবল দলের প্রধান কোচ লিওনেল স্কালোনি। বিদায়ের আগে কাউকে কিছু না জানিয়ে তিনি বাবা-মায়ের বাড়ির...', en: 'Scaloni leaves hometown...' },
    slug: 'scaloni-leaves-hometown', category: 'sports', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: { bn: 'আর্জেন্টাইন কোচকে একহাত নিলেন স্পেনের ওলমো', en: 'Spain\'s Olmo criticizes Argentine coach' },
    content: { bn: 'আর্জেন্টাইন কোচকে একহাত নিলেন...', en: 'Spain\'s Olmo criticizes...' },
    excerpt: { bn: 'আর্জেন্টাইন কোচকে একহাত নিলেন...', en: 'Spain\'s Olmo criticizes...' },
    slug: 'olmo-criticizes-argentine-coach', category: 'sports', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'কোন খেলায় কোন দেশ বর্তমান বিশ্ব চ্যাম্পিয়ন, এক নজরে দেখে নিন সেরা দেশগুলো', en: 'Current world champions in different sports' },
    content: { bn: 'এক নজরে দেখে নিন...', en: 'Current world champions...' },
    excerpt: { bn: 'এক নজরে দেখে নিন...', en: 'Current world champions...' },
    slug: 'world-champions-in-sports', category: 'sports', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'বিশ্ব ফুটবলের সবচেয়ে দামি ১০ কোচের তালিকা', en: 'Top 10 most expensive football coaches' },
    content: { bn: 'সবচেয়ে দামি ১০ কোচের তালিকা...', en: 'Top 10 most expensive coaches...' },
    excerpt: { bn: 'সবচেয়ে দামি ১০ কোচের তালিকা...', en: 'Top 10 most expensive coaches...' },
    slug: 'top-10-expensive-coaches', category: 'sports', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'ছেলেদের ম্যাচে ধাক্কাধাক্কি থামাতে গিয়ে আহত নারী রেফারি, ভিডিও ভাইরাল', en: 'Female referee injured trying to stop fight' },
    content: { bn: 'ছেলেদের ম্যাচে ধাক্কাধাক্কি...', en: 'Female referee injured...' },
    excerpt: { bn: 'ছেলেদের ম্যাচে ধাক্কাধাক্কি...', en: 'Female referee injured...' },
    slug: 'female-referee-injured-video', category: 'sports', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?auto=format&fit=crop&q=80&w=400'
  }
];

const lifestyleArticles = [
  {
    title: { bn: 'টুথপেস্টে মাইক্রোপ্লাস্টিক বিষয়ে কী বলছেন বিশেষজ্ঞরা', en: 'What experts say about microplastics in toothpaste' },
    content: { bn: 'প্রতিদিনের প্রয়োজনীয় স্বাস্থ্যসুরক্ষা পণ্য টুথপেস্টেই মিলেছে মাইক্রোপ্লাস্টিকের উপস্থিতি। দেশের বাজারে বিক্রি হওয়া বিভিন্ন ব্র্যান্ডের টুথপেস্ট নিয়ে পরিচালিত এক গবেষণায় দেখা গেছে...', en: 'Microplastics found in daily essential toothpaste...' },
    excerpt: { bn: 'প্রতিদিনের প্রয়োজনীয় স্বাস্থ্যসুরক্ষা পণ্য টুথপেস্টেই মিলেছে মাইক্রোপ্লাস্টিকের উপস্থিতি। দেশের বাজারে বিক্রি হওয়া বিভিন্ন ব্র্যান্ডের টুথপেস্ট নিয়ে পরিচালিত এক গবেষণায় দেখা গেছে, পরীক্ষিত নমুনার ৭৬', en: 'Microplastics found in daily essential toothpaste...' },
    slug: 'microplastic-experts-say-lifestyle', category: 'lifestyle', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: { bn: 'সহজে চিনে নিন ক্ষতিকর ‘মাইক্রোপ্লাস্টিক’যুক্ত টুথপেস্ট', en: 'Easily identify harmful microplastic toothpastes' },
    content: { bn: 'সহজে চিনে নিন...', en: 'Easily identify...' },
    excerpt: { bn: 'সহজে চিনে নিন...', en: 'Easily identify...' },
    slug: 'identify-harmful-toothpaste-lifestyle', category: 'lifestyle', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'টুথপেস্ট টিউবের নিচে রঙিন দাগ কেন থাকে?', en: 'Why are there colored marks under toothpaste tubes?' },
    content: { bn: 'টুথপেস্ট টিউবের নিচে রঙিন দাগ...', en: 'Colored marks under toothpaste...' },
    excerpt: { bn: 'টুথপেস্ট টিউবের নিচে রঙিন দাগ...', en: 'Colored marks under toothpaste...' },
    slug: 'toothpaste-colored-marks', category: 'lifestyle', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'গ্রামীণ কাঠকয়লা-নিমের ডাল, দাঁতের যত্নে কোনটি বেশি উপকারী?', en: 'Charcoal or Neem for teeth?' },
    content: { bn: 'গ্রামীণ কাঠকয়লা-নিমের ডাল...', en: 'Charcoal or Neem...' },
    excerpt: { bn: 'গ্রামীণ কাঠকয়লা-নিমের ডাল...', en: 'Charcoal or Neem...' },
    slug: 'charcoal-neem-teeth', category: 'lifestyle', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'ফিটকিরিতেই মিলবে তেলতেলে ত্বক ও ব্রণের সমস্যার সমাধান', en: 'Alum solves oily skin and acne problems' },
    content: { bn: 'ফিটকিরিতেই মিলবে...', en: 'Alum solves...' },
    excerpt: { bn: 'ফিটকিরিতেই মিলবে...', en: 'Alum solves...' },
    slug: 'alum-oily-skin-acne', category: 'lifestyle', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1615397323209-6bc2e54101e9?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'ওজন কমাতে সাহায্য করে আতাফল', en: 'Custard apple helps in weight loss' },
    content: { bn: 'ওজন কমাতে সাহায্য করে...', en: 'Custard apple helps...' },
    excerpt: { bn: 'ওজন কমাতে সাহায্য করে...', en: 'Custard apple helps...' },
    slug: 'custard-apple-weight-loss', category: 'lifestyle', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=400'
  }
];


async function seedSections() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully!");
    
    await Article.insertMany(entertainmentArticles);
    await Article.insertMany(sportsArticles);
    await Article.insertMany(lifestyleArticles);

    console.log("Sections dummy data inserted successfully.");
    
    process.exit(0);
  } catch (err) {
    console.error("Error during seeding:", err);
    process.exit(1);
  }
}

seedSections();
