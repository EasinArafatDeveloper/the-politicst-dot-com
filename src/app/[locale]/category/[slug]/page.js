import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import Image from 'next/image';
import styles from './page.module.css';
import ArticleCard from '@/components/ui/ArticleCard';
import dbConnect from '@/lib/dbConnect';
import Article from '@/models/Article';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thepoliticst.com';

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const t = await getTranslations('Navigation');
  const translationKey = slug.replace('-', '_');

  let categoryName = slug;
  try {
    categoryName = t(translationKey);
  } catch (error) {
    categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
  }

  const isBn = locale === 'bn';
  const title = isBn ? `${categoryName} সম্পর্কিত খবর` : `${categoryName} News`;
  const description = isBn
    ? `দ্য পলিটিক্সটে ${categoryName} বিভাগের সর্বশেষ সংবাদ ও খবরাখবর পড়ুন।`
    : `Read the latest ${categoryName} news and updates on The Politicst.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/category/${slug}`,
      languages: {
        'bn-BD': `/bn/category/${slug}`,
        'en-US': `/en/category/${slug}`,
      },
    },
    openGraph: {
      title: `${title} | The Politicst`,
      description,
      url: `/${locale}/category/${slug}`,
    },
    twitter: {
      title: `${title} | The Politicst`,
      description,
    },
  };
}

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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'bn' ? 'প্রচ্ছদ' : 'Home',
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryTitle,
        item: `${SITE_URL}/${locale}/category/${slug}`,
      },
    ],
  };

  if (articles.length === 0) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <main className={styles.container}>
          <div className={styles.categoryHeader}>
            <h1 className={styles.categoryTitle}>{categoryTitle}</h1>
          </div>
          <p style={{ textAlign: 'center', padding: '50px', fontSize: '18px', color: '#666' }}>No articles found for this category.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
    </>
  );
}
