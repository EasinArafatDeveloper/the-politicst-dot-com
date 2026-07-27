'use client';
import {Link} from '@/i18n/routing';
import styles from './ArticleCard.module.css';

export default function ArticleCard({ article, layout = 'vertical' }) {
  // If layout is 'vertical', image is on top, text below.
  // If layout is 'horizontal', image is left, text right.

  const title = typeof article.title === 'string' ? article.title : article.title?.bn || '';
  const excerpt = typeof article.excerpt === 'string' ? article.excerpt : article.excerpt?.bn || '';
  
  const handleImageError = (e) => {
    e.target.src = 'https://placehold.co/600x400/001a4d/ffffff?text=ThePoliticst';
  };

  return (
    <div className={`${styles.card} ${styles[layout]}`}>
      <div className={styles.imageWrapper}>
        <img 
          src={article.imageUrl || 'https://placehold.co/600x400/001a4d/ffffff?text=ThePoliticst'} 
          alt={title} 
          className={styles.image} 
          onError={handleImageError}
        />
      </div>
      <div className={styles.content}>
        <Link href={`/article/${article.slug || '#'}`}>
          <h3 className={styles.title}>{title}</h3>
        </Link>
        {layout === 'vertical' && excerpt && (
          <p className={styles.excerpt}>{excerpt.substring(0, 100)}...</p>
        )}
        <div className={styles.meta}>
          {article.publishedAt && (
            <span className={styles.date}>
              {new Date(article.publishedAt).toLocaleDateString('bn-BD')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
