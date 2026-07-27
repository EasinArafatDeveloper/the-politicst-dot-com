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

const internationalArticles = [
  {
    title: { bn: 'অস্ট্রেলিয়াজুড়ে হঠাৎ মোবাইলে বেজে উঠল জরুরি সতর্কবার্তা, ঘটনা কী', en: 'Emergency alert suddenly goes off on mobiles across Australia' },
    content: { bn: 'আকস্মিক এই ঘটনায় মুহূর্তের জন্য দেশজুড়ে সাধারণ মানুষের মধ্যে কিছুটা উৎকণ্ঠা ছড়িয়ে পড়ে। তবে স্ক্রিনে ভেসে ওঠা বার্তায় স্পষ্ট করা হয়, এটি ছিল দেশটির নতুন জাতীয় জরুরি সতর্কতা ব্যবস্থা ‘অসঅ্যালার্ট’', en: 'Sudden emergency alert in Australia...' },
    excerpt: { bn: 'আকস্মিক এই ঘটনায় মুহূর্তের জন্য দেশজুড়ে সাধারণ মানুষের মধ্যে কিছুটা উৎকণ্ঠা ছড়িয়ে পড়ে। তবে স্ক্রিনে ভেসে ওঠা বার্তায় স্পষ্ট করা হয়, এটি ছিল দেশটির নতুন জাতীয় জরুরি সতর্কতা ব্যবস্থা ‘অসঅ্যালার্ট’', en: 'Sudden emergency alert in Australia...' },
    slug: 'australia-emergency-alert', category: 'international', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: { bn: 'এবার যুক্তরাষ্ট্রে আতঙ্ক ছড়াচ্ছে ভয়ংকর ‘মাংসখেকো’ ব্যাকটেরিয়া', en: 'Flesh-eating bacteria spreading panic in US' },
    content: { bn: 'এবার যুক্তরাষ্ট্রে আতঙ্ক...', en: 'Flesh-eating bacteria...' },
    excerpt: { bn: 'এবার যুক্তরাষ্ট্রে আতঙ্ক...', en: 'Flesh-eating bacteria...' },
    slug: 'flesh-eating-bacteria-us', category: 'international', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'বাংলাদেশি আশ্রয়প্রার্থীদের উগান্ডাসহ পাঁচ দেশে পাঠানোর পরিকল্পনা', en: 'Plan to send Bangladeshi asylum seekers to 5 countries' },
    content: { bn: 'বাংলাদেশি আশ্রয়প্রার্থীদের...', en: 'Asylum seekers...' },
    excerpt: { bn: 'বাংলাদেশি আশ্রয়প্রার্থীদের...', en: 'Asylum seekers...' },
    slug: 'asylum-seekers-uganda', category: 'international', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'জার্মানিতে সমকামীদের মিছিলে হামলা', en: 'Attack on pride parade in Germany' },
    content: { bn: 'জার্মানিতে সমকামীদের মিছিলে...', en: 'Pride parade attack...' },
    excerpt: { bn: 'জার্মানিতে সমকামীদের মিছিলে...', en: 'Pride parade attack...' },
    slug: 'pride-parade-attack-germany', category: 'international', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1561726009-880be0bd78a9?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'ব্রিটিশ ভারতে যে রেলপথ তৈরিতে ঝরেছিল ২৪ হাজার প্রাণ', en: '24 thousand died building railway in British India' },
    content: { bn: 'ব্রিটিশ ভারতে...', en: 'British India railway...' },
    excerpt: { bn: 'ব্রিটিশ ভারতে...', en: 'British India railway...' },
    slug: 'british-india-railway-deaths', category: 'international', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'ভাইকে বিয়ে করা রানির শোক থেকেই জন্ম নিয়েছিল প্রাচীন বিশ্বের এক বিস্ময়', en: 'Ancient wonder born from grief of queen who married brother' },
    content: { bn: 'ভাইকে বিয়ে করা...', en: 'Ancient wonder grief...' },
    excerpt: { bn: 'ভাইকে বিয়ে করা...', en: 'Ancient wonder grief...' },
    slug: 'ancient-wonder-queen-grief', category: 'international', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'খেলনা ওরাংওটাংকে আঁকড়ে ধরা সেই ‘পাঞ্চ’ এখন সুস্থ, উদযাপিত হলো প্রথম জন্মদিন', en: 'Punch the orangutan celebrates first birthday' },
    content: { bn: 'খেলনা ওরাংওটাংকে...', en: 'Punch the orangutan...' },
    excerpt: { bn: 'খেলনা ওরাংওটাংকে...', en: 'Punch the orangutan...' },
    slug: 'punch-orangutan-first-birthday', category: 'international', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1540304616-09dc390979c5?auto=format&fit=crop&q=80&w=400'
  }
];

const videoArticles = [
  {
    title: { bn: 'Rtv Moddhanner Songbad | মধ্যাহ্নের সংবাদ | ২৬ জুলাই, ২০২৬ | Rtv News', en: 'Rtv Midday News' },
    content: { bn: 'Rtv Moddhanner Songbad', en: 'Rtv Midday News' },
    excerpt: { bn: 'Rtv Moddhanner Songbad', en: 'Rtv Midday News' },
    slug: 'rtv-moddhanner-songbad-26-july', category: 'video', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: { bn: 'Rtv Sokaler Songbad | সকালের সংবাদ | ২৬ জুলাই, ২০২৬ | Rtv News', en: 'Rtv Morning News' },
    content: { bn: 'Rtv Sokaler Songbad', en: 'Rtv Morning News' },
    excerpt: { bn: 'Rtv Sokaler Songbad', en: 'Rtv Morning News' },
    slug: 'rtv-sokaler-songbad-26-july', category: 'video', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'Rtv Rater News | রাতের সংবাদ | ২৫ জুলাই, ২০২৬ | Rtv News', en: 'Rtv Night News' },
    content: { bn: 'Rtv Rater News', en: 'Rtv Night News' },
    excerpt: { bn: 'Rtv Rater News', en: 'Rtv Night News' },
    slug: 'rtv-rater-news-25-july', category: 'video', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1478641300939-010664f5552b?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'Rtv Jela News | জেলা সংবাদ | ২৪ জুলাই, ২০২৬ | Rtv News', en: 'Rtv District News' },
    content: { bn: 'Rtv Jela News', en: 'Rtv District News' },
    excerpt: { bn: 'Rtv Jela News', en: 'Rtv District News' },
    slug: 'rtv-jela-news-24-july', category: 'video', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=400'
  }
];

const photoArticles = [
  {
    title: { bn: 'ঔষধি গুণসম্পন্ন পুষ্টির ভাণ্ডার সুপারফুড সজনে পাতা', en: 'Moringa leaves superfood' },
    content: { bn: 'ঔষধি গুণসম্পন্ন...', en: 'Moringa leaves superfood' },
    excerpt: { bn: 'ঔষধি গুণসম্পন্ন...', en: 'Moringa leaves superfood' },
    slug: 'moringa-leaves-superfood', category: 'photo', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: { bn: 'যেখানে শিশিরভেজা সবুজ পাতায় সূর্যের আলো পড়ে মুক্তার মতো ঝলমল করে', en: 'Dew drops on green leaves shining like pearls' },
    content: { bn: 'যেখানে শিশিরভেজা...', en: 'Dew drops on green leaves...' },
    excerpt: { bn: 'যেখানে শিশিরভেজা...', en: 'Dew drops on green leaves...' },
    slug: 'dew-drops-green-leaves', category: 'photo', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1438786657495-640937046d18?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'কুয়াশাচ্ছন্ন সকালে ধানের কচি পাতা এক স্নিগ্ধ ও কাব্যিক দৃশ্য', en: 'Foggy morning paddy leaves' },
    content: { bn: 'কুয়াশাচ্ছন্ন সকালে...', en: 'Foggy morning paddy leaves...' },
    excerpt: { bn: 'কুয়াশাচ্ছন্ন সকালে...', en: 'Foggy morning paddy leaves...' },
    slug: 'foggy-morning-paddy-leaves', category: 'photo', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1499914485622-a88fac536970?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'বাংলার কৃষক হলো মাটির শিল্পী, তাদের হাতেই ফলে সোনালী ফসল। ওয়াসিম আকরাম', en: 'Bengal farmer artist of soil' },
    content: { bn: 'বাংলার কৃষক...', en: 'Bengal farmer artist...' },
    excerpt: { bn: 'বাংলার কৃষক...', en: 'Bengal farmer artist...' },
    slug: 'bengal-farmer-artist-soil', category: 'photo', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=400'
  }
];

const politicsArticles = [
  {
    title: { bn: 'ইনসাফের কথা বলা অপকর্মকারীদের জনগণ বিশ্বাস করে না: এ্যানি', en: 'People do not believe wrongdoers talking about justice' },
    content: { bn: 'রোববার (২৬ জুলাই) সন্ধ্যায় লক্ষ্মীপুর শহরের একটি চাইনিজ রেস্টুরেন্টে জেলা আইনজীবী ফোরামের উদ্যোগে আয়োজিত নবীন আইনজীবীদের সংবর্ধনা অনুষ্ঠানে তিনি এ কথা বলেন।', en: 'People do not believe...' },
    excerpt: { bn: 'রোববার (২৬ জুলাই) সন্ধ্যায় লক্ষ্মীপুর শহরের একটি চাইনিজ রেস্টুরেন্টে জেলা আইনজীবী ফোরামের উদ্যোগে আয়োজিত নবীন আইনজীবীদের সংবর্ধনা অনুষ্ঠানে তিনি এ কথা বলেন।', en: 'People do not believe...' },
    slug: 'justice-wrongdoers-annie', category: 'politics', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: { bn: 'রফিকুল ইসলাম মিয়ার খাদ্যনালীতে অস্ত্রোপচার', en: 'Rafiqul Islam Miah surgery' },
    content: { bn: 'রফিকুল ইসলাম মিয়ার...', en: 'Rafiqul Islam Miah surgery' },
    excerpt: { bn: 'রফিকুল ইসলাম মিয়ার...', en: 'Rafiqul Islam Miah surgery' },
    slug: 'rafiqul-islam-miah-surgery', category: 'politics', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'ইসিতে আয়-ব্যয়ের হিসাব দিল জাতীয় পার্টি', en: 'Jatiya Party submits income expenditure account to EC' },
    content: { bn: 'ইসিতে আয়-ব্যয়ের...', en: 'Jatiya Party submits...' },
    excerpt: { bn: 'ইসিতে আয়-ব্যয়ের...', en: 'Jatiya Party submits...' },
    slug: 'jatiya-party-ec-account', category: 'politics', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'চাঁদপুরে বিএনপি নেতা মাহবুব আনোয়ার আর নেই', en: 'BNP leader Mahbub Anwar no more' },
    content: { bn: 'চাঁদপুরে বিএনপি নেতা...', en: 'BNP leader no more' },
    excerpt: { bn: 'চাঁদপুরে বিএনপি নেতা...', en: 'BNP leader no more' },
    slug: 'bnp-leader-mahbub-anwar', category: 'politics', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=400'
  }
];

const economyArticles = [
  {
    title: { bn: 'চট্টগ্রামে চায়না ইকোনমিক জোনের উদ্বোধন', en: 'China Economic Zone inaugurated in Chattogram' },
    content: { bn: 'প্রায় এক দশকের অপেক্ষা ও নানা প্রশাসনিক জটিলতা কাটিয়ে চট্টগ্রামের আনোয়ারায় বাংলাদেশ-চীন অর্থনৈতিক ও শিল্পাঞ্চল (চায়নিজ ইকোনমিক অ্যান্ড ইন্ডাস্ট্রিয়াল জোন-সিইআইজেড) নির্মাণকাজ আনুষ্ঠানিকভাবে যাত্রা শুরু করেছে।', en: 'China Economic Zone...' },
    excerpt: { bn: 'প্রায় এক দশকের অপেক্ষা ও নানা প্রশাসনিক জটিলতা কাটিয়ে চট্টগ্রামের আনোয়ারায় বাংলাদেশ-চীন অর্থনৈতিক ও শিল্পাঞ্চল (চায়নিজ ইকোনমিক অ্যান্ড ইন্ডাস্ট্রিয়াল জোন-সিইআইজেড) নির্মাণকাজ আনুষ্ঠানিকভাবে যাত্রা শুরু করেছে।', en: 'China Economic Zone...' },
    slug: 'china-economic-zone-chattogram', category: 'economy', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: { bn: 'গ্যাস খুঁজতে আরও দুটি রিগ কেনার উদ্যোগ', en: 'Initiative to buy two more rigs to search for gas' },
    content: { bn: 'গ্যাস খুঁজতে...', en: 'Initiative to buy rigs...' },
    excerpt: { bn: 'গ্যাস খুঁজতে...', en: 'Initiative to buy rigs...' },
    slug: 'buy-two-more-gas-rigs', category: 'economy', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'দেশের বাজারে আবারও বাড়ল সোনার দাম', en: 'Gold price rises again in the country' },
    content: { bn: 'দেশের বাজারে...', en: 'Gold price rises...' },
    excerpt: { bn: 'দেশের বাজারে...', en: 'Gold price rises...' },
    slug: 'gold-price-rises-again', category: 'economy', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1610375461246-83ff852e5313?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: { bn: 'নবম পে-স্কেল বাস্তবায়ন নিয়ে নতুন জটিলতা, পিছিয়ে দেওয়ার পরামর্শ আইএমএফের', en: 'New complications in 9th pay scale implementation' },
    content: { bn: 'নবম পে-স্কেল...', en: '9th pay scale complications...' },
    excerpt: { bn: 'নবম পে-স্কেল...', en: '9th pay scale complications...' },
    slug: '9th-pay-scale-complications-imf', category: 'economy', section: 'latest', 
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400'
  }
];

async function seedSections3() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully!");
    
    await Article.insertMany(internationalArticles);
    await Article.insertMany(videoArticles);
    await Article.insertMany(photoArticles);
    await Article.insertMany(politicsArticles);
    await Article.insertMany(economyArticles);

    console.log("Sections dummy data 3 inserted successfully.");
    
    process.exit(0);
  } catch (err) {
    console.error("Error during seeding:", err);
    process.exit(1);
  }
}

seedSections3();
