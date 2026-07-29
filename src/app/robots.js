const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thepoliticst.com';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api', '/api/*'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
