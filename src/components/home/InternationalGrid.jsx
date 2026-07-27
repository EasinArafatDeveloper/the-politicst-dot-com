import styles from './InternationalGrid.module.css';
import ArticleCard from '../ui/ArticleCard';
import { Link } from '@/i18n/routing';

export default function InternationalGrid({ title, articles }) {
  if (!articles || articles.length < 7) return null;

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
        
        {/* Middle: 2 vertical articles */}
        <div className={styles.middleColumn}>
          <ArticleCard article={articles[1]} layout="vertical" />
          <div className={styles.divider}></div>
          <ArticleCard article={articles[2]} layout="vertical" />
        </div>
        
        {/* Right: 4 horizontal articles */}
        <div className={styles.rightColumn}>
          <ArticleCard article={articles[3]} layout="horizontal" />
          <div className={styles.divider}></div>
          <ArticleCard article={articles[4]} layout="horizontal" />
          <div className={styles.divider}></div>
          <ArticleCard article={articles[5]} layout="horizontal" />
          <div className={styles.divider}></div>
          <ArticleCard article={articles[6]} layout="horizontal" />
        </div>
      </div>
    </section>
  );
}
