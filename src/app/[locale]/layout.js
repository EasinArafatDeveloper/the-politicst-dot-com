import { Geist, Geist_Mono } from "next/font/google";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import SiteLayout from '@/components/layout/SiteLayout';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { Toaster } from 'react-hot-toast';
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thepoliticst.com';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isBn = locale === 'bn';

  const titleDefault = isBn ? 'দ্য পলিটিক্সট - নির্ভরযোগ্য ও সর্বশেষ সংবাদ' : 'The Politicst - Unbiased & Latest News';
  const descriptionDefault = isBn 
    ? 'দ্য পলিটিক্সট ডট কম - জাতীয়, আন্তর্জাতিক, রাজনীতি, অর্থনীতি, খেলাধুলা, বিনোদন ও অন্যান্য সর্বশেষ বাংলা সংবাদ।'
    : 'The Politicst - Your trusted bilingual source for national, international, politics, economy, sports, and entertainment news.';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: titleDefault,
      template: `%s | ${isBn ? 'দ্য পলিটিক্সট' : 'The Politicst'}`,
    },
    description: descriptionDefault,
    applicationName: 'The Politicst',
    authors: [{ name: 'The Politicst Newsroom', url: SITE_URL }],
    generator: 'Next.js',
    keywords: isBn 
      ? ['সংবাদ', 'আজকের খবর', 'বাংলাদেশ সংবাদ', 'রাজনীতি', 'আন্তর্জাতিক খবর', 'দ্য পলিটিক্সট', 'The Politicst']
      : ['News', 'Latest News', 'Bangladesh News', 'Politics', 'International News', 'The Politicst'],
    referrer: 'origin-when-cross-origin',
    creator: 'The Politicst Team',
    publisher: 'The Politicst',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'bn-BD': '/bn',
        'en-US': '/en',
      },
    },
    openGraph: {
      title: titleDefault,
      description: descriptionDefault,
      url: `/${locale}`,
      siteName: 'The Politicst',
      locale: isBn ? 'bn_BD' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titleDefault,
      description: descriptionDefault,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale)) {
    notFound();
  }
 
  const messages = await getMessages();

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'The Politicst',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/${locale}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'The Politicst',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    sameAs: [],
  };

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SiteLayout>{children}</SiteLayout>
          <ScrollToTop />
          <Toaster position="top-right" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
