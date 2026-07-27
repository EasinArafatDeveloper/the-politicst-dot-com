'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/routing';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale) => {
    router.replace(pathname, {locale: newLocale});
  };

  return (
    <div className={styles.switcher}>
      <button 
        className={locale === 'bn' ? styles.active : ''} 
        onClick={() => handleLanguageChange('bn')}
      >
        বাংলা
      </button>
      <span className={styles.divider}>|</span>
      <button 
        className={locale === 'en' ? styles.active : ''} 
        onClick={() => handleLanguageChange('en')}
      >
        English
      </button>
    </div>
  );
}
