'use client';

import { useState } from 'react';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';
import { useRouter } from 'next/navigation';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { Menu, X, Search, MapPin, CalendarDays } from 'lucide-react';
import { CalendarBengaliRevised } from 'date-bengali-revised';
import styles from './Header.module.css';

export default function Header() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  const currentDate = new Date().toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const bengaliMonths = [
    'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 
    'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'
  ];

  const englishToBengaliNumber = (num) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(digit => bengaliDigits[digit] || digit).join('');
  };

  const getBengaliDateString = () => {
    try {
      const bDate = new CalendarBengaliRevised().fromDate(new Date());
      const bDay = englishToBengaliNumber(bDate.day);
      const bYear = englishToBengaliNumber(bDate.year);
      const bMonth = bengaliMonths[bDate.month - 1];
      return `${bDay} ${bMonth} ${bYear}`;
    } catch (e) {
      return '';
    }
  };

  const fullDateString = `${currentDate}${getBengaliDateString() ? `, ${getBengaliDateString()}` : ''}`;

  const isActive = (path) => pathname === path ? styles.active : '';

  return (
    <header className={styles.header}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.topBarLeft}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', marginRight: '12px' }}>
              <MapPin size={14} /> ঢাকা
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CalendarDays size={14} /> {fullDateString}
            </span>
          </div>
          <div className={styles.topBarRight}>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Logo Area */}
      <div className={styles.logoArea}>
        <div className={styles.container}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <h1 className={styles.logo}>
              <span className={styles.logoThe}>The</span>
              <span className={styles.logoPolitics}>Politicst</span>
            </h1>
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <ul className={styles.navLinks}>
            <li><Link href="/" className={isActive('/')}>{t('home')}</Link></li>
            <li><Link href="/category/special-report" className={isActive('/category/special-report')}>{t('special_report')}</Link></li>
            <li><Link href="/category/national" className={isActive('/category/national')}>{t('national')}</Link></li>
            <li><Link href="/category/politics" className={isActive('/category/politics')}>{t('politics')}</Link></li>
            <li><Link href="/category/economy" className={isActive('/category/economy')}>{t('economy')}</Link></li>
            <li><Link href="/category/international" className={isActive('/category/international')}>{t('international')}</Link></li>
            <li><Link href="/category/entertainment" className={isActive('/category/entertainment')}>{t('entertainment')}</Link></li>
            <li><Link href="/category/sports" className={isActive('/category/sports')}>{t('sports')}</Link></li>
            
            <li className={styles.dropdownContainer}>
              <button 
                className={styles.menuButton} 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="More categories"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                <span>{t('more')}</span>
              </button>
              
              {isMenuOpen && (
                <ul className={styles.dropdownMenu}>
                  <li><Link href="/category/nationwide" className={isActive('/category/nationwide')} onClick={() => setIsMenuOpen(false)}>{t('nationwide')}</Link></li>
                  <li><Link href="/category/lifestyle" className={isActive('/category/lifestyle')} onClick={() => setIsMenuOpen(false)}>{t('lifestyle')}</Link></li>
                  <li><Link href="/category/expatriate" className={isActive('/category/expatriate')} onClick={() => setIsMenuOpen(false)}>{t('expatriate')}</Link></li>
                  <li><Link href="/category/technology" className={isActive('/category/technology')} onClick={() => setIsMenuOpen(false)}>{t('technology')}</Link></li>
                  <li><Link href="/category/education" className={isActive('/category/education')} onClick={() => setIsMenuOpen(false)}>{t('education')}</Link></li>
                  <li><Link href="/category/jobs" className={isActive('/category/jobs')} onClick={() => setIsMenuOpen(false)}>{t('jobs')}</Link></li>
                  <li><Link href="/category/social-media" className={isActive('/category/social-media')} onClick={() => setIsMenuOpen(false)}>{t('social_media')}</Link></li>
                </ul>
              )}
            </li>

          </ul>
          
          {/* Search Box */}
          <div className={styles.searchContainer}>
            <button 
              className={styles.searchToggleButton}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              <Search size={20} />
            </button>
            
            {isSearchOpen && (
              <form onSubmit={handleSearch} className={styles.searchForm}>
                <input 
                  type="text" 
                  placeholder={t('search') || 'Search...'} 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                  autoFocus
                />
                <button type="submit" className={styles.searchButton}>
                  <Search size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
