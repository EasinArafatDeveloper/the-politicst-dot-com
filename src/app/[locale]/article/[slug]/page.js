import {getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';
import ArticleCard from '@/components/ui/ArticleCard';
import ClientImage from '@/components/ui/ClientImage';
import { Share2 } from 'lucide-react';
import dbConnect from '@/lib/dbConnect';
import Article from '@/models/Article';

export const dynamic = 'force-dynamic';

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

  return (
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
            <button className={styles.shareButton} aria-label="Share">
              <Share2 size={18} />
            </button>
          </div>

          <div className={styles.imageContainer}>
            <ClientImage src={article.imageUrl} alt={article.title} className={styles.mainImage} />
          </div>

          <div 
            className={styles.articleBody} 
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} 
          />

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
  );
}
