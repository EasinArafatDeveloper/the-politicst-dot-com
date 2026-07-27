import styles from './NationalGrid.module.css';
import ArticleCard from '../ui/ArticleCard';
import { Link } from '@/i18n/routing';

export default function NationalGrid({ title, articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Link href={`/category/${articles[0]?.category || '#'}`} className={styles.moreLink}>আরও &gt;</Link>
      </div>
      <div className={styles.grid}>
        {/* Left: 2 vertical articles */}
        <div className={styles.leftColumn}>
          {articles[0] && <ArticleCard article={articles[0]} layout="vertical" />}
          {articles[1] && <div className={styles.divider}></div>}
          {articles[1] && <ArticleCard article={articles[1]} layout="vertical" />}
        </div>
        
        {/* Middle: 1 large article */}
        <div className={styles.middleColumn}>
          {articles[2] && <ArticleCard article={articles[2]} layout="vertical" />}
        </div>
        
        {/* Right: 4 horizontal articles */}
        <div className={styles.rightColumn}>
          {articles[3] && <ArticleCard article={articles[3]} layout="horizontal" />}
          {articles[4] && <div className={styles.divider}></div>}
          {articles[4] && <ArticleCard article={articles[4]} layout="horizontal" />}
          {articles[5] && <div className={styles.divider}></div>}
          {articles[5] && <ArticleCard article={articles[5]} layout="horizontal" />}
          {articles[6] && <div className={styles.divider}></div>}
          {articles[6] && <ArticleCard article={articles[6]} layout="horizontal" />}
        </div>
      </div>
    </section>
  );
}
