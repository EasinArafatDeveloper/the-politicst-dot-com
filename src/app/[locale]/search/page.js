import { getTranslations } from 'next-intl/server';
import dbConnect from '@/lib/dbConnect';
import Article from '@/models/Article';
import ArticleCard from '@/components/ui/ArticleCard';

export default async function SearchPage({ params, searchParams }) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams?.q || '';

  await dbConnect();
  
  let articles = [];
  if (q) {
    const query = {
      $or: [
        { 'title.bn': { $regex: q, $options: 'i' } },
        { 'title.en': { $regex: q, $options: 'i' } }
      ]
    };
    const fetchedArticles = await Article.find(query).sort({ publishedAt: -1 }).lean();
    articles = JSON.parse(JSON.stringify(fetchedArticles));
  }

  // map for localized
  const localizedArticles = articles.map(a => ({
    ...a,
    title: a.title[locale] || a.title['bn'],
    excerpt: a.excerpt[locale] || a.excerpt['bn'],
    content: a.content[locale] || a.content['bn'],
  }));

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 16px', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: 'var(--primary)', borderBottom: '2px solid var(--primary)', paddingBottom: '10px' }}>
        Search Results for: {q}
      </h1>
      
      {localizedArticles.length === 0 ? (
        <p style={{ fontSize: '18px', color: '#666' }}>No news found matching your search.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {localizedArticles.map(article => (
            <ArticleCard key={article._id} article={article} layout="vertical" />
          ))}
        </div>
      )}
    </div>
  );
}
