import {getTranslations} from 'next-intl/server';
import dbConnect from '@/lib/dbConnect';
import Article from '@/models/Article';
import HeroSection from '@/components/home/HeroSection';
import NewsGrid from '@/components/home/NewsGrid';
import FeaturedMiddleGrid from '@/components/home/FeaturedMiddleGrid';
import EntertainmentGrid from '@/components/home/EntertainmentGrid';
import VideoGrid from '@/components/home/VideoGrid';
import PhotoGalleryGrid from '@/components/home/PhotoGalleryGrid';
import InternationalGrid from '@/components/home/InternationalGrid';
import LifestyleGrid from '@/components/home/LifestyleGrid';
import NationalGrid from '@/components/home/NationalGrid';
import SpecialReportCarousel from '@/components/home/SpecialReportCarousel';
import HalfWidthCategoryGrid from '@/components/home/HalfWidthCategoryGrid';

export const dynamic = 'force-dynamic';

async function getArticles() {
  await dbConnect();
  // Fetch all articles, sort by newest
  const articles = await Article.find({}).sort({ publishedAt: -1 }).lean();
  return JSON.parse(JSON.stringify(articles)); // Convert to plain object to pass to client components
}

export default async function Home({ params }) {
  const { locale } = await params;
  const t = await getTranslations('Navigation');
  
  const rawArticles = await getArticles();

  // Map articles to the correct language structure expected by components
  const localizedArticles = rawArticles.map(a => ({
    ...a,
    title: a.title[locale] || a.title['bn'],
    excerpt: a.excerpt[locale] || a.excerpt['bn'],
    content: a.content[locale] || a.content['bn'],
  }));

  // Group by category/section (Basic grouping for demo, you can expand this logic)
  const featured = localizedArticles.filter(a => a.section === 'featured');
  const latest = localizedArticles.filter(a => a.section === 'latest');
  const trending = localizedArticles.filter(a => a.section === 'trending');

  const national = localizedArticles.filter(a => a.category === 'national');
  const international = localizedArticles.filter(a => a.category === 'international');
  const sports = localizedArticles.filter(a => a.category === 'sports');
  const economy = localizedArticles.filter(a => a.category === 'economy');
  const politics = localizedArticles.filter(a => a.category === 'politics');
  const entertainment = localizedArticles.filter(a => a.category === 'entertainment');
  const nationwide = localizedArticles.filter(a => a.category === 'nationwide');
  const lifestyle = localizedArticles.filter(a => a.category === 'lifestyle');
  const video = localizedArticles.filter(a => a.category === 'video');
  const photo = localizedArticles.filter(a => a.category === 'photo');

  // Fallback to first article if no featured exists
  const heroFeatured = featured.length > 0 ? featured[0] : (localizedArticles[0] || null);
  const heroTopList = latest.length > 0 ? latest.slice(0, 4) : localizedArticles.slice(0, 4);

  return (
    <div>
      <main>
        {heroFeatured && <HeroSection featuredArticle={heroFeatured} topArticles={heroTopList} />}
        
        <SpecialReportCarousel title={t('special_report')} articles={trending} />
        
        <NationalGrid title={t('national')} articles={national.slice(0, 8)} />
        
        <div className="halfWidthContainer">
          <HalfWidthCategoryGrid title={t('politics')} articles={politics.slice(0, 4)} />
          <HalfWidthCategoryGrid title={t('economy')} articles={economy.slice(0, 4)} />
        </div>
        
        <NewsGrid title={t('nationwide')} articles={nationwide.slice(0, 4)} />
        
        <InternationalGrid title={t('international')} articles={international.slice(0, 8)} />
        
        <EntertainmentGrid title={t('entertainment')} articles={entertainment.slice(0, 5)} />
        
        <NationalGrid title={t('sports')} articles={sports.slice(0, 8)} />
        
        <LifestyleGrid title={t('lifestyle')} articles={lifestyle.slice(0, 6)} />
        
        <div className="halfWidthContainer">
          <VideoGrid title={t('video')} articles={video.slice(0, 4)} />
          <PhotoGalleryGrid title={t('photo')} articles={photo.slice(0, 4)} />
        </div>
      </main>
    </div>
  );
}
