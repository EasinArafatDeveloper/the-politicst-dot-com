import {getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import ArticleCard from '@/components/ui/ArticleCard';
import ClientImage from '@/components/ui/ClientImage';
import ShareButtons from '@/components/ui/ShareButtons';
import dbConnect from '@/lib/dbConnect';
import Article from '@/models/Article';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thepoliticst.com';

export const dynamic = 'force-dynamic';

async function fetchArticleForMetadata(slug) {
  await dbConnect();
  return Article.findOne({ slug }).lean();
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const rawArticle = await fetchArticleForMetadata(slug);

  if (!rawArticle) {
    return { title: 'Article Not Found' };
  }

  const title = rawArticle.title?.[locale] || rawArticle.title?.['bn'] || 'News Article';
  const excerpt = rawArticle.excerpt?.[locale] || rawArticle.excerpt?.['bn'] || '';
  const description = excerpt.replace(/<[^>]*>?/gm, '').slice(0, 160);
  const imageUrl = rawArticle.imageUrl || `${SITE_URL}/favicon.ico`;
  const authorName = rawArticle.author || 'The Politicst Desk';

  return {
    title,
    description,
    authors: [{ name: authorName }],
    keywords: [rawArticle.category, 'The Politicst', 'News', title],
    alternates: {
      canonical: `/${locale}/article/${slug}`,
      languages: {
        'bn-BD': `/bn/article/${slug}`,
        'en-US': `/en/article/${slug}`,
      },
    },
    openGraph: {
      title: `${title} | The Politicst`,
      description,
      url: `/${locale}/article/${slug}`,
      type: 'article',
      publishedTime: rawArticle.publishedAt ? new Date(rawArticle.publishedAt).toISOString() : undefined,
      modifiedTime: rawArticle.updatedAt ? new Date(rawArticle.updatedAt).toISOString() : (rawArticle.publishedAt ? new Date(rawArticle.publishedAt).toISOString() : undefined),
      authors: [authorName],
      section: rawArticle.category,
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | The Politicst`,
      description,
      images: [imageUrl],
    },
  };
}

async function getArticleBySlug(slug) {
  await dbConnect();
  // We don't use lean() here because we might want to update the views count
  const article = await Article.findOne({ slug });
  if (!article) return null;

  // Increment views
  article.views += 1;
  await article.save();

  return JSON.parse(JSON.stringify(article));
}

async function getRelatedArticles(category, excludeId) {
  await dbConnect();
  const articles = await Article.find({ category, _id: { $ne: excludeId } })
    .sort({ publishedAt: -1 })
    .limit(4)
    .lean();
  return JSON.parse(JSON.stringify(articles));
}

export default async function ArticlePage({ params }) {
  const { slug, locale } = await params;
  const t = await getTranslations('Common');
  const tNav = await getTranslations('Navigation');

  const rawArticle = await getArticleBySlug(slug);
  
  if (!rawArticle) {
    notFound();
  }

  const rawRelated = await getRelatedArticles(rawArticle.category, rawArticle._id);

  // Format data according to locale
  const article = {
    ...rawArticle,
    title: rawArticle.title[locale] || rawArticle.title['bn'],
    content: rawArticle.content[locale] || rawArticle.content['bn'],
    excerpt: rawArticle.excerpt[locale] || rawArticle.excerpt['bn'],
  };

  const relatedArticles = rawRelated.map(a => ({
    ...a,
    title: a.title[locale] || a.title['bn'],
    excerpt: a.excerpt[locale] || a.excerpt['bn'],
    content: a.content[locale] || a.content['bn'],
  }));

  // Format date
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const formattedDate = new Date(article.publishedAt).toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-US', dateOptions);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: (article.excerpt || '').replace(/<[^>]*>?/gm, '').slice(0, 200),
    image: [article.imageUrl],
    datePublished: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
    dateModified: article.updatedAt ? new Date(article.updatedAt).toISOString() : (article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined),
    author: {
      '@type': 'Person',
      name: article.author || 'The Politicst Desk',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Politicst',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${locale}/article/${slug}`,
    },
  };

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
        name: article.category,
        item: `${SITE_URL}/${locale}/category/${article.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `${SITE_URL}/${locale}/article/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className={styles.container}>
      <div className={styles.layout}>
        {/* Left Column - Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.categoryTag} style={{textTransform: 'capitalize'}}>{article.category}</div>
          <h1 className={styles.title}>{article.title}</h1>
          
          <div className={styles.metaRow}>
            <div className={styles.metaLeft}>
              <span className={styles.author}>{article.author || 'The Politicst Desk'}</span>
              <span className={styles.date}>{formattedDate}</span>
              <span className={styles.views} style={{marginLeft: '15px', color: '#666', fontSize: '14px'}}>{article.views} Views</span>
            </div>
            <ShareButtons title={article.title} locale={locale} />
          </div>

          <div className={styles.imageContainer}>
            <ClientImage src={article.imageUrl} alt={article.title} className={styles.mainImage} />
          </div>

          <div 
            className={styles.articleBody} 
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} 
          />

          <ShareButtons title={article.title} locale={locale} variant="full" />

          {relatedArticles.length > 0 && (
            <div className={styles.relatedSection}>
              <h3 className={styles.relatedTitle}>{locale === 'bn' ? 'আরও পড়ুন' : 'Read More'}</h3>
              <div className={styles.relatedGrid}>
                {relatedArticles.slice(0, 2).map((item, i) => (
                  <ArticleCard key={i} article={item} layout="vertical" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <h3 className={styles.sidebarTitle} style={{textTransform: 'capitalize'}}>{article.category} - {locale === 'bn' ? 'আরও খবর' : 'More News'}</h3>
            <div className={styles.sidebarList}>
              {relatedArticles.map((item, i) => (
                <ArticleCard key={i} article={item} layout="horizontal" />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
    </>
  );
}
