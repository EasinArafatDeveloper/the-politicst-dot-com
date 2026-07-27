'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import PushNotificationPrompt from '../ui/PushNotificationPrompt';

export default function SiteLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname && pathname.includes('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 16px', minHeight: '60vh' }}>
        {children}
      </div>
      <Footer />
      <PushNotificationPrompt />
    </>
  );
}
