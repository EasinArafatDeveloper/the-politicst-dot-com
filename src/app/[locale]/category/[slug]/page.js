import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import Image from 'next/image';
import styles from './page.module.css';
import ArticleCard from '@/components/ui/ArticleCard';
import dbConnect from '@/lib/dbConnect';
import Article from '@/models/Article';

async function getArticlesByCategory(category) {
  await dbConnect();
  const articles = await Article.find({ category }).sort({ publishedAt: -1 }).lean();
  return JSON.parse(JSON.stringify(articles));
}

export default async function CategoryPage({ params }) {
  const { slug, locale } = await params;
  const t = await getTranslations('Navigation');
  const translationKey = slug.replace('-', '_');
  
  let categoryTitle = slug;
  try {
    categoryTitle = t(translationKey);
  } catch (error) {
    categoryTitle = slug.charAt(0).toUpperCase() + slug.slice(1);
  }
  
  const rawArticles = await getArticlesByCategory(slug);
  
  // Map bilingual fields to current locale
  const articles = rawArticles.map(a => ({
    ...a,
    title: a.title[locale] || a.title['bn'],
    excerpt: a.excerpt[locale] || a.excerpt['bn'],
    content: a.content[locale] || a.content['bn'],
  }));

  const topArticles = articles.slice(0, 2);
  const middleArticles = articles.slice(2, 6);
  const listArticles = articles.slice(6);

  if (articles.length === 0) {
    return (
      <main className={styles.container}>
        <div className={styles.categoryHeader}>
          <h1 className={styles.categoryTitle}>{categoryTitle}</h1>
        </div>
        <p style={{ textAlign: 'center', padding: '50px', fontSize: '18px', color: '#666' }}>No articles found for this category.</p>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      {/* Category Header */}
      <div className={styles.categoryHeader}>
        <h1 className={styles.categoryTitle}>{categoryTitle}</h1>
      </div>

      {/* Top Section: 1 Huge + 1 Smaller */}
      <div className={styles.topGrid}>
        {topArticles[0] && (
          <div className={styles.topMain}>
            <ArticleCard article={topArticles[0]} layout="vertical" />
          </div>
        )}
        {topArticles[1] && (
          <div className={styles.topSecondary}>
            <ArticleCard article={topArticles[1]} layout="vertical" />
          </div>
        )}
      </div>

      {/* Middle Section: 4 Vertical Cards */}
      {middleArticles.length > 0 && (
        <div className={styles.middleGrid}>
          {middleArticles.map((article, i) => (
            <div key={i} className={styles.middleCard}>
              <ArticleCard article={article} layout="vertical" />
            </div>
          ))}
        </div>
      )}

      {/* Bottom Section: Vertical List */}
      {listArticles.length > 0 && (
        <div className={styles.listSection}>
          {listArticles.map((article, i) => (
            <Link key={i} href={`/article/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className={styles.listItem}>
                <div className={styles.listImageWrapper}>
                  <img src={article.imageUrl} alt={article.title} className={styles.listImage} />
                </div>
                <div className={styles.listContent}>
                  <h2 className={styles.listTitle}>{article.title}</h2>
                  <p className={styles.listExcerpt}>{article.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
