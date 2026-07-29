import dbConnect from '@/lib/dbConnect';
import Article from '@/models/Article';

export const dynamic = 'force-dynamic';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thepoliticst.com';

const CATEGORIES = [
  'national',
  'international',
  'politics',
  'sports',
  'economy',
  'entertainment',
  'nationwide',
  'lifestyle',
  'video',
  'photo',
];

const LOCALES = ['bn', 'en'];

export default async function sitemap() {
  await dbConnect();
  
  let articles = [];
  try {
    articles = await Article.find({}, 'slug updatedAt publishedAt category').lean();
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error);
  }

  const routes = [];

  // Home pages
  LOCALES.forEach((locale) => {
    routes.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1.0,
    });
  });

  // Category pages
  LOCALES.forEach((locale) => {
    CATEGORIES.forEach((cat) => {
      routes.push({
        url: `${SITE_URL}/${locale}/category/${cat}`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.8,
      });
    });
  });

  // Article pages
  articles.forEach((article) => {
    LOCALES.forEach((locale) => {
      routes.push({
        url: `${SITE_URL}/${locale}/article/${article.slug}`,
        lastModified: article.updatedAt ? new Date(article.updatedAt) : (article.publishedAt ? new Date(article.publishedAt) : new Date()),
        changeFrequency: 'daily',
        priority: 0.7,
      });
    });
  });

  return routes;
}
