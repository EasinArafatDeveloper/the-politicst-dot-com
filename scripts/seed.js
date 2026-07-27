const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://the-politicst:q6g2EW6EEhwjVmKF@cluster0.biasmpt.mongodb.net/the-politicst?retryWrites=true&w=majority";

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
  category: { type: String, required: true },
  section: { type: String, required: true },
  imageUrl: { type: String, required: true },
  author: { type: String },
  publishedAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 }
}, { timestamps: true });

const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);

const dummyData = [
  {
    title: {
      bn: 'সরকারি চাকরিজীবীদের টানা ৪ দিনের ছুটির সুযোগ',
      en: 'Government employees have the opportunity for a 4-day continuous holiday'
    },
    content: {
      bn: 'আগস্ট মাসে সরকারি চাকরিজীবীদের জন্য বিশেষ ছুটির সুযোগ আসছে। আগামী ১৫ই আগস্ট জাতীয় শোক দিবস উপলক্ষে সাধারণ ছুটি। এর সাথে শুক্র ও শনিবার সাপ্তাহিক ছুটি মিলিয়ে টানা কয়েকদিনের ছুটির ফাঁদে পড়তে যাচ্ছে দেশ...',
      en: 'A special holiday opportunity is coming for government employees in August. August 15 is a public holiday for National Mourning Day. Combined with the Friday-Saturday weekend, the country is going to fall into a continuous holiday trap...'
    },
    excerpt: {
      bn: 'জুলাই মাস শেষ হতে চললেও এ মাসে সরকারি চাকরিজীবীদের জন্য কোনো সাধারণ ছুটি ছিল না। তবে আগস্টের শুরুতেই...',
      en: 'Although July is coming to an end, there was no general holiday for government employees this month. But at the beginning of August...'
    },
    slug: 'govt-holiday-august-2026',
    category: 'national',
    section: 'featured',
    imageUrl: 'https://images.unsplash.com/photo-1541872516-2ba9ab43be2b?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: {
      bn: 'নতুন বাজেটে মোবাইল ও ইন্টারনেটের খরচ বাড়ছে',
      en: 'Mobile and internet costs are increasing in the new budget'
    },
    content: {
      bn: 'আগামী অর্থবছরের বাজেটে টেলিকম খাতের ওপর নতুন করারোপের প্রস্তাব করা হয়েছে। এর ফলে সাধারণ গ্রাহকদের মোবাইল কথা বলার খরচ এবং ইন্টারনেট ব্যবহারের খরচ বাড়তে পারে...',
      en: 'New taxes have been proposed on the telecom sector in the budget for the upcoming fiscal year. As a result, mobile calling and internet usage costs for general customers may increase...'
    },
    excerpt: {
      bn: 'প্রস্তাবিত নতুন বাজেটে টেলিকম সেবার ওপর সম্পূরক শুল্ক বাড়ানোর কথা বলা হয়েছে, যার প্রভাব পড়বে সরাসরি গ্রাহকের ওপর।',
      en: 'The proposed new budget mentions increasing supplementary duty on telecom services, which will directly impact customers.'
    },
    slug: 'new-budget-telecom-cost-increase',
    category: 'economy',
    section: 'trending',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: {
      bn: 'বিশ্বকাপ ক্রিকেটে বাংলাদেশের অবিস্মরণীয় জয়',
      en: 'Bangladesh\'s unforgettable victory in the World Cup'
    },
    content: {
      bn: 'আজকের রোমাঞ্চকর ম্যাচে প্রতিপক্ষকে বড় ব্যবধানে হারিয়েছে বাংলাদেশ দল। দলের তরুণ খেলোয়াড়দের দুর্দান্ত পারফরম্যান্স এবং অধিনায়কের দারুণ নেতৃত্ব এই জয়ের মূল কারণ...',
      en: 'Bangladesh team defeated the opponent by a large margin in today\'s thrilling match. The brilliant performance of the team\'s young players and the captain\'s great leadership are the main reasons for this victory...'
    },
    excerpt: {
      bn: 'টানটান উত্তেজনার ম্যাচে শক্তিশালী প্রতিপক্ষকে হারিয়ে পয়েন্ট টেবিলের শীর্ষে উঠে এলো বাংলাদেশ।',
      en: 'In a tense match, Bangladesh defeated a strong opponent and rose to the top of the points table.'
    },
    slug: 'bangladesh-cricket-world-cup-win',
    category: 'sports',
    section: 'latest',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: {
      bn: 'প্যারিসে জলবায়ু সম্মেলন শুরু, বিশ্বনেতাদের উপস্থিতি',
      en: 'Climate conference begins in Paris, presence of world leaders'
    },
    content: {
      bn: 'ফ্রান্সের রাজধানী প্যারিসে আজ থেকে শুরু হয়েছে গ্লোবাল ক্লাইমেট সামিট। কার্বন নিঃসরণ কমানো এবং নবায়নযোগ্য শক্তির ব্যবহার বৃদ্ধি নিয়ে আলোচনা করতে বিশ্বের বিভিন্ন দেশের রাষ্ট্রপ্রধানরা যোগ দিয়েছেন...',
      en: 'The Global Climate Summit started today in Paris, France. Heads of state from various countries around the world have joined to discuss reducing carbon emissions and increasing the use of renewable energy...'
    },
    excerpt: {
      bn: 'বিশ্ব উষ্ণায়ন রোধে গুরুত্বপূর্ণ সিদ্ধান্ত আসতে পারে এবারের প্যারিস জলবায়ু সম্মেলন থেকে।',
      en: 'Important decisions to prevent global warming may come from this year\'s Paris climate conference.'
    },
    slug: 'paris-climate-summit-starts',
    category: 'international',
    section: 'trending',
    imageUrl: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: {
      bn: 'ঢাকায় নতুন মেট্রো রেল রুটের উদ্বোধন',
      en: 'Inauguration of a new metro rail route in Dhaka'
    },
    content: {
      bn: 'দীর্ঘ প্রতীক্ষার পর আজ সকালে ঢাকার নতুন একটি মেট্রো রেল রুটের উদ্বোধন করা হয়েছে।',
      en: 'After a long wait, a new metro rail route was inaugurated in Dhaka this morning.'
    },
    excerpt: {
      bn: 'যানজট নিরসনে নতুন মাইলফলক।',
      en: 'A new milestone in relieving traffic congestion.'
    },
    slug: 'dhaka-new-metro-rail-route-open',
    category: 'national',
    section: 'latest',
    imageUrl: 'https://images.unsplash.com/photo-1596700676450-7053e1f0e21a?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: { bn: 'আসন্ন নির্বাচনে নতুন রাজনৈতিক দলের ইশতেহার ঘোষণা', en: 'New political party announces manifesto in upcoming elections' },
    content: { bn: 'আজ এক বিশাল জনসভায় নতুন রাজনৈতিক দল তাদের ইশতেহার ঘোষণা করেছে।', en: 'Today, a new political party announced its manifesto in a huge public gathering.' },
    excerpt: { bn: 'রাজনীতির মাঠে নতুন চমক।', en: 'New surprise in the political arena.' },
    slug: 'new-party-election-manifesto', category: 'politics', section: 'latest', imageUrl: 'https://images.unsplash.com/photo-1541872516-2ba9ab43be2b?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: { bn: 'নতুন সিনেমায় শাকিব খানের ভিন্ন লুক', en: 'Shakib Khan\'s different look in new movie' },
    content: { bn: 'আসন্ন ঈদে মুক্তি পেতে যাওয়া সিনেমায় সুপারস্টার শাকিব খানকে সম্পূর্ণ নতুন রূপে দেখা যাবে।', en: 'Superstar Shakib Khan will be seen in a completely new look in the upcoming Eid movie.' },
    excerpt: { bn: 'ভক্তদের মাঝে উন্মাদনা তুঙ্গে।', en: 'Excitement is at its peak among fans.' },
    slug: 'shakib-khan-new-movie-look', category: 'entertainment', section: 'trending', imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: { bn: 'দেশজুড়ে ভারী বৃষ্টির পূর্বাভাস, নদীগুলোতে পানি বাড়ছে', en: 'Heavy rain forecast nationwide, water levels rising in rivers' },
    content: { bn: 'আবহাওয়া অধিদপ্তর জানিয়েছে আগামী ৩ দিন দেশজুড়ে ভারী বৃষ্টির সম্ভাবনা রয়েছে।', en: 'The meteorological department said there is a possibility of heavy rain across the country for the next 3 days.' },
    excerpt: { bn: 'সতর্ক অবস্থায় প্রশাসন।', en: 'Administration on alert.' },
    slug: 'heavy-rain-forecast-nationwide', category: 'nationwide', section: 'latest', imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: { bn: 'সুস্থ থাকতে প্রতিদিন সকালে হাঁটার ৫টি উপকারিতা', en: '5 benefits of walking every morning to stay healthy' },
    content: { bn: 'সুস্থ জীবনযাপনের জন্য নিয়মিত হাঁটার কোনো বিকল্প নেই। বিশেষজ্ঞরা বলছেন...', en: 'There is no alternative to regular walking for a healthy lifestyle. Experts say...' },
    excerpt: { bn: 'সুস্থ থাকতে মেনে চলুন এই টিপসগুলো।', en: 'Follow these tips to stay healthy.' },
    slug: 'benefits-of-morning-walk', category: 'lifestyle', section: 'featured', imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: { bn: 'মধ্যপ্রাচ্যে নতুন কাজের সুযোগ, প্রবাসীদের জন্য সুখবর', en: 'New job opportunities in the Middle East, good news for expatriates' },
    content: { bn: 'সৌদি আরব এবং আরব আমিরাতে প্রচুর কর্মী নেওয়ার ঘোষণা দিয়েছে কয়েকটি বড় কোম্পানি।', en: 'Several big companies have announced hiring a large number of workers in Saudi Arabia and UAE.' },
    excerpt: { bn: 'প্রবাসীদের জন্য বিশাল সুযোগ।', en: 'Huge opportunity for expatriates.' },
    slug: 'new-job-middle-east-probash', category: 'probash', section: 'trending', imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: { bn: 'স্মার্টফোন আসক্তি কমানোর কার্যকরী উপায় (ভিডিও)', en: 'Effective ways to reduce smartphone addiction (Video)' },
    content: { bn: 'ভিডিও প্রতিবেদনে দেখুন কীভাবে অতিরিক্ত স্মার্টফোন ব্যবহার থেকে নিজেকে দূরে রাখবেন।', en: 'Watch the video report on how to keep yourself away from excessive smartphone use.' },
    excerpt: { bn: 'ভিডিওটি দেখুন এবং শেয়ার করুন।', en: 'Watch and share the video.' },
    slug: 'smartphone-addiction-reduce-video', category: 'video', section: 'latest', imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: { bn: 'সেন্টমার্টিন দ্বীপের অপরূপ সৌন্দর্য (ছবি)', en: 'Breathtaking beauty of Saint Martin Island (Photo)' },
    content: { bn: 'সেন্টমার্টিন দ্বীপের মনোমুগ্ধকর কিছু ছবি নিয়ে আমাদের আজকের এই ফটো গ্যালারি।', en: 'Our photo gallery today with some fascinating pictures of Saint Martin Island.' },
    excerpt: { bn: 'ছবিতে দেখুন প্রকৃতির অপরূপ রূপ।', en: 'See the breathtaking beauty of nature in pictures.' },
    slug: 'saint-martin-beauty-photos', category: 'photo', section: 'featured', imageUrl: 'https://images.unsplash.com/photo-1506461883276-594543d0e228?auto=format&fit=crop&q=80&w=800'
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully!");
    
    // Clear the DB completely as requested
    await mongoose.connection.db.dropDatabase();
    console.log("Database cleared completely.");

    // Insert new data
    await Article.insertMany(dummyData);
    console.log("Dummy data inserted successfully.");
    
    process.exit(0);
  } catch (err) {
    console.error("Error during seeding:", err);
    process.exit(1);
  }
}

seed();
