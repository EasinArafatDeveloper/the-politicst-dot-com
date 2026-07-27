import styles from './FeaturedMiddleGrid.module.css';
import ArticleCard from '../ui/ArticleCard';

export default function FeaturedMiddleGrid({ title, articles }) {
  if (!articles || articles.length < 3) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.grid}>
        <div className={styles.sideColumn}>
          <ArticleCard article={articles[0]} layout="vertical" />
        </div>
        <div className={styles.middleColumn}>
          <ArticleCard article={articles[1]} layout="vertical" />
        </div>
        <div className={styles.sideColumn}>
          <ArticleCard article={articles[2]} layout="vertical" />
        </div>
      </div>
    </section>
  );
}
