export default function handler(req, res) {
  // Set the content type to plain text
  res.setHeader('Content-Type', 'text/plain');
  
  // Set cache headers
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
  
  // Generate the robots.txt content
  const robotsTxt = `User-agent: *
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

  res.status(200).send(robotsTxt);
}
