export interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const sitemapEntries: SitemapEntry[] = [
  {
    url: 'https://abfinance.me/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: 1.0
  },
  {
    url: 'https://abfinance.me/dashboard',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: 0.9
  },
  {
    url: 'https://abfinance.me/income',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    url: 'https://abfinance.me/expenses',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    url: 'https://abfinance.me/goals',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    url: 'https://abfinance.me/profile',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.6
  },
  {
    url: 'https://abfinance.me/login',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.5
  },
  {
    url: 'https://abfinance.me/register',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    url: 'https://abfinance.me/questions',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.6
  }
];

export function generateSitemap(): string {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    ${entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `    <changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority ? `    <priority>${entry.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://abfinance.me/sitemap.xml

# Disallow private areas
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /static/

# Allow all other content
Allow: /dashboard
Allow: /income
Allow: /expenses
Allow: /goals
Allow: /profile
Allow: /login
Allow: /register
Allow: /questions`;
}
