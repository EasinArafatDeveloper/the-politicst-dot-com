'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import styles from './BreakingNewsTicker.module.css';

export default function BreakingNewsTicker() {
  const [news, setNews] = useState([]);
  const locale = useLocale();

  useEffect(() => {
    fetch('/api/articles?section=breaking&limit=10')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setNews(data.data);
        }
      })
      .catch(err => console.error('Error fetching breaking news:', err));
  }, []);

  if (news.length === 0) return null;

  return (
    <div className={styles.tickerContainer}>
      <div className={styles.container}>
        <div className={styles.tickerLabel}>
          {locale === 'bn' ? 'ব্রেকিং নিউজ' : 'Breaking News'}
        </div>
        <div className={styles.tickerWrapper}>
          <div className={styles.tickerTrack}>
            {news.map((item, index) => (
              <span key={item._id} className={styles.tickerItem}>
                <Link href={`/category/${item.category}/${item.slug}`} className={styles.newsLink}>
                  {item.title[locale]}
                </Link>
                <span className={styles.separator}>•</span>
              </span>
            ))}
            {/* Duplicate for infinite scroll */}
            {news.map((item, index) => (
              <span key={`dup-${item._id}`} className={styles.tickerItem}>
                <Link href={`/category/${item.category}/${item.slug}`} className={styles.newsLink}>
                  {item.title[locale]}
                </Link>
                <span className={styles.separator}>•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
