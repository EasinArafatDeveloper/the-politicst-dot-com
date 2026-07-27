import styles from './LifestyleGrid.module.css';
import ArticleCard from '../ui/ArticleCard';
import { Link } from '@/i18n/routing';

export default function LifestyleGrid({ title, articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Link href={`/category/${articles[0]?.category || '#'}`} className={styles.moreLink}>আরও &gt;</Link>
      </div>
      <div className={styles.grid}>
        {/* Left: 1 large article, 1 horizontal article */}
        <div className={styles.leftColumn}>
          {articles[0] && <ArticleCard article={articles[0]} layout="vertical" />}
          {articles[1] && <div className={styles.divider}></div>}
          {articles[1] && <ArticleCard article={articles[1]} layout="horizontal" />}
        </div>
        
        {/* Right: 4 horizontal articles */}
        <div className={styles.rightColumn}>
          {articles[2] && <ArticleCard article={articles[2]} layout="horizontal" />}
          {articles[3] && <div className={styles.divider}></div>}
          {articles[3] && <ArticleCard article={articles[3]} layout="horizontal" />}
          {articles[4] && <div className={styles.divider}></div>}
          {articles[4] && <ArticleCard article={articles[4]} layout="horizontal" />}
          {articles[5] && <div className={styles.divider}></div>}
          {articles[5] && <ArticleCard article={articles[5]} layout="horizontal" />}
        </div>
      </div>
    </section>
  );
}
