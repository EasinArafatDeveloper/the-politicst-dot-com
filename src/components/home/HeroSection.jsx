import styles from './HeroSection.module.css';
import ArticleCard from '../ui/ArticleCard';

export default function HeroSection({ featuredArticle, topArticles }) {
  if (!featuredArticle) return null;

  return (
    <section className={styles.heroSection}>
      <div className={styles.mainFeature}>
        <ArticleCard article={featuredArticle} layout="vertical" />
      </div>
      <div className={styles.sideArticles}>
        {topArticles && topArticles.slice(0, 4).map((article, index) => (
          <div key={index} className={styles.sideArticleWrapper}>
             <ArticleCard article={article} layout="horizontal" />
          </div>
        ))}
      </div>
    </section>
  );
}
