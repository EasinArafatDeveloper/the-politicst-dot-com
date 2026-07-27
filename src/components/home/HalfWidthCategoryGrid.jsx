import styles from './HalfWidthCategoryGrid.module.css';
import ArticleCard from '../ui/ArticleCard';
import { Link } from '@/i18n/routing';

export default function HalfWidthCategoryGrid({ title, articles }) {
  if (!articles || articles.length < 4) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Link href={`/category/${articles[0]?.category || '#'}`} className={styles.moreLink}>আরও &gt;</Link>
      </div>
      <div className={styles.grid}>
        {/* Left: 1 large article */}
        <div className={styles.leftColumn}>
          <ArticleCard article={articles[0]} layout="vertical" />
        </div>
        
        {/* Right: 3 horizontal articles */}
        <div className={styles.rightColumn}>
          <ArticleCard article={articles[1]} layout="horizontal" />
          <div className={styles.divider}></div>
          <ArticleCard article={articles[2]} layout="horizontal" />
          <div className={styles.divider}></div>
          <ArticleCard article={articles[3]} layout="horizontal" />
        </div>
      </div>
    </section>
  );
}
