import { Link } from '@/i18n/routing';
import { Camera } from 'lucide-react';
import styles from './PhotoGalleryGrid.module.css';

function PhotoCard({ article }) {
  const title = typeof article.title === 'string' ? article.title : article.title?.bn || '';
  
  return (
    <div className={styles.card}>
      <Link href={`/article/${article.slug || '#'}`}>
        <div className={styles.imageWrapper}>
          <img src={article.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} alt={title} className={styles.image} />
          <div className={styles.iconOverlay}>
            <Camera size={24} className={styles.icon} />
          </div>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      </Link>
    </div>
  );
}

export default function PhotoGalleryGrid({ title, articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Link href={`/category/${articles[0]?.category || '#'}`} className={styles.moreLink}>আরও &gt;</Link>
      </div>
      
      {/* Top large photo */}
      <div className={styles.featuredPhoto}>
        {articles[0] && <PhotoCard article={articles[0]} />}
      </div>
      
      {/* Bottom 3 small photos */}
      <div className={styles.smallPhotosGrid}>
        {articles.slice(1, 4).map((article, index) => (
          <PhotoCard key={index} article={article} />
        ))}
      </div>
    </section>
  );
}
