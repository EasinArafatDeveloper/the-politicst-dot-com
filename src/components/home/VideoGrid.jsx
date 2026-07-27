import { Link } from '@/i18n/routing';
import { PlayCircle } from 'lucide-react';
import styles from './VideoGrid.module.css';

function VideoCard({ article }) {
  const title = typeof article.title === 'string' ? article.title : article.title?.bn || '';
  
  return (
    <div className={styles.card}>
      <Link href={`/article/${article.slug || '#'}`}>
        <div className={styles.imageWrapper}>
          <img src={article.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} alt={title} className={styles.image} />
          <div className={styles.playIconOverlay}>
            <PlayCircle size={48} className={styles.playIcon} />
          </div>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      </Link>
    </div>
  );
}

export default function VideoGrid({ title, articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Link href={`/category/${articles[0]?.category || '#'}`} className={styles.moreLink}>আরও &gt;</Link>
      </div>
      
      {/* Top large video */}
      <div className={styles.featuredVideo}>
        {articles[0] && <VideoCard article={articles[0]} />}
      </div>
      
      {/* Bottom 3 small videos */}
      <div className={styles.smallVideosGrid}>
        {articles.slice(1, 4).map((article, index) => (
          <VideoCard key={index} article={article} />
        ))}
      </div>
    </section>
  );
}
