import styles from './NewsGrid.module.css';
import ArticleCard from '../ui/ArticleCard';

import { Link } from '@/i18n/routing';

export default function NewsGrid({ title, articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Link href={`/category/${articles[0]?.category || '#'}`} className={styles.moreLink}>আরও &gt;</Link>
      </div>
      <div className={styles.grid}>
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} layout="vertical" />
        ))}
      </div>
    </section>
  );
}
