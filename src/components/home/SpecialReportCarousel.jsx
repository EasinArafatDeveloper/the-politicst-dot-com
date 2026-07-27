import styles from './SpecialReportCarousel.module.css';
import { Link } from '@/i18n/routing';
import { ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';

function SpecialCard({ article }) {
  const title = typeof article.title === 'string' ? article.title : article.title?.bn || '';
  
  return (
    <div className={styles.card}>
      <Link href={`/article/${article.slug || '#'}`}>
        <div className={styles.imageWrapper}>
          <img src={article.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} alt={title} className={styles.image} />
          <div className={styles.playIconOverlay}>
            <PlayCircle size={40} className={styles.playIcon} />
          </div>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      </Link>
    </div>
  );
}

export default function SpecialReportCarousel({ title, articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <Link href="#" className={styles.moreLink}>আরও &gt;</Link>
        </div>
        
        <div className={styles.carouselWrapper}>
          <button className={`${styles.navButton} ${styles.prevButton}`}>
            <ChevronLeft size={24} />
          </button>
          
          <div className={styles.grid}>
            {articles.slice(0, 4).map((article, index) => (
              <SpecialCard key={index} article={article} />
            ))}
          </div>

          <button className={`${styles.navButton} ${styles.nextButton}`}>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
