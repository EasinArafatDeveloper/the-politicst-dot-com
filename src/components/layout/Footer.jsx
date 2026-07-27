import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import { MapPin, Mail, Phone } from 'lucide-react';
import styles from './Footer.module.css';

// SVG icons for social media
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);
const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

export default function Footer() {
  const t = useTranslations('Navigation');
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          {/* Brand Info */}
          <div className={styles.brandInfo}>
            <h2 className={styles.logo}>The Politicst</h2>
            <p className={styles.tagline}>আপনার বিশ্বস্ত সংবাদ মাধ্যম। সত্য প্রকাশে অবিচল। আমরা সবসময় নির্ভুল এবং সর্বশেষ খবর আপনাদের সামনে তুলে ধরতে প্রতিশ্রুতিবদ্ধ।</p>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#" aria-label="Twitter"><TwitterIcon /></a>
              <a href="#" aria-label="Youtube"><YoutubeIcon /></a>
              <a href="#" aria-label="Instagram"><InstagramIcon /></a>
            </div>
          </div>

          {/* Quick Categories */}
          <div className={styles.linksSection}>
            <h3>খবরের ধরন</h3>
            <ul className={styles.links}>
              <li><Link href="/category/national">{t('national')}</Link></li>
              <li><Link href="/category/politics">{t('politics')}</Link></li>
              <li><Link href="/category/international">{t('international')}</Link></li>
              <li><Link href="/category/economy">{t('economy')}</Link></li>
              <li><Link href="/category/sports">{t('sports')}</Link></li>
              <li><Link href="/category/entertainment">{t('entertainment')}</Link></li>
            </ul>
          </div>

          {/* Important Links */}
          <div className={styles.linksSection}>
            <h3>প্রয়োজনীয় লিংক</h3>
            <ul className={styles.links}>
              <li><Link href="#">আমাদের সম্পর্কে</Link></li>
              <li><Link href="#">যোগাযোগ</Link></li>
              <li><Link href="#">গোপনীয়তা নীতি (Privacy Policy)</Link></li>
              <li><Link href="#">ব্যবহারের শর্তাবলী (Terms)</Link></li>
              <li><Link href="#">বিজ্ঞাপন দিন</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className={styles.contactSection}>
            <h3>যোগাযোগ</h3>
            <ul className={styles.contactList}>
              <li>
                <MapPin size={18} className={styles.contactIcon} />
                <span>১০১, কাজী নজরুল এভিনিউ, কারওয়ান বাজার, ঢাকা-১২১৫</span>
              </li>
              <li>
                <Mail size={18} className={styles.contactIcon} />
                <span>info@thepoliticst.com</span>
              </li>
              <li>
                <Phone size={18} className={styles.contactIcon} />
                <span>+৮৮০ ১২৩৪ ৫৬৭৮৯০</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomSection}>
          <p>&copy; {new Date().getFullYear()} The Politicst. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
