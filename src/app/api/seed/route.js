import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Article from '@/models/Article';

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
      bn: 'দীর্ঘ প্রতীক্ষার পর আজ সকালে ঢাকার নতুন একটি মেট্রো রেল রুটের উদ্বোধন করা হয়েছে। এই রুটটি চালুর ফলে শহরের এক প্রান্ত থেকে অন্য প্রান্তে যাতায়াতের সময় অনেক কমে যাবে...',
      en: 'After a long wait, a new metro rail route was inaugurated in Dhaka this morning. With the launch of this route, the travel time from one end of the city to the other will be greatly reduced...'
    },
    excerpt: {
      bn: 'যানজট নিরসনে নতুন মাইলফলক। আজ থেকে যাত্রীদের জন্য উন্মুক্ত হলো নতুন মেট্রো রুট।',
      en: 'A new milestone in relieving traffic congestion. A new metro route has been opened for passengers starting today.'
    },
    slug: 'dhaka-new-metro-rail-route-open',
    category: 'national',
    section: 'latest',
    imageUrl: 'https://images.unsplash.com/photo-1596700676450-7053e1f0e21a?auto=format&fit=crop&q=80&w=800',
  }
];

export async function GET() {
  try {
    await dbConnect();
    
    // Clear existing data
    await Article.deleteMany({});

    // Insert new dummy data
    await Article.insertMany(dummyData);

    return NextResponse.json({ success: true, message: 'Database cleared and seeded with real dummy data.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
