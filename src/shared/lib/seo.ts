export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  siteName?: string;
  locale?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  canonical?: string;
  robots?: string;
  themeColor?: string;
  backgroundColor?: string;
}

export const defaultSEO: SEOConfig = {
  title: 'abFinance - Modern Finance Management App',
  description: 'Track your income, expenses, and financial goals with abFinance. A modern, intuitive personal finance management application with goal tracking, expense categorization, and financial insights.',
  keywords: [
    'finance management',
    'personal finance',
    'expense tracking',
    'income tracking',
    'financial goals',
    'budget management',
    'money management',
    'financial planning',
    'expense tracker',
    'budget tracker',
    'financial dashboard',
    'savings tracker',
    'PWA finance app',
    'mobile finance app'
  ],
  author: 'abFinance Team',
  image: '/favicon-data/web-app-manifest-512x512.png',
  url: 'https://abfinance.me',
  type: 'website',
  siteName: 'abFinance',
  locale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterSite: '@abfinance',
  twitterCreator: '@abfinance',
  robots: 'index, follow',
  themeColor: '#10B981',
  backgroundColor: '#ffffff'
};

export const pageSEOConfigs: Record<string, SEOConfig> = {
  home: {
    ...defaultSEO,
    title: 'abFinance - Personal Finance Management Made Simple',
    description: 'Take control of your finances with abFinance. Track income, manage expenses, set financial goals, and gain insights into your spending patterns with our intuitive finance management app.',
  },
  dashboard: {
    ...defaultSEO,
    title: 'Dashboard - abFinance',
    description: 'View your financial overview, track progress towards goals, and analyze your spending patterns with comprehensive charts and insights.',
  },
  income: {
    ...defaultSEO,
    title: 'Income Tracking - abFinance',
    description: 'Track and manage your income sources. Add salary, freelance work, investments, and other income streams with detailed categorization.',
  },
  expenses: {
    ...defaultSEO,
    title: 'Expense Management - abFinance',
    description: 'Monitor your spending habits, categorize expenses, and identify areas for savings with detailed expense tracking and analytics.',
  },
  goals: {
    ...defaultSEO,
    title: 'Financial Goals - abFinance',
    description: 'Set, track, and achieve your financial goals. Monitor progress, calculate daily savings needed, and stay motivated with visual progress tracking.',
  },
  profile: {
    ...defaultSEO,
    title: 'Profile Settings - abFinance',
    description: 'Manage your account settings, preferences, and personal information in your abFinance profile.',
  },
  login: {
    ...defaultSEO,
    title: 'Sign In - abFinance',
    description: 'Sign in to your abFinance account to access your personal finance dashboard and start managing your money effectively.',
  },
  register: {
    ...defaultSEO,
    title: 'Create Account - abFinance',
    description: 'Join abFinance and start your journey to better financial management. Create your free account today.',
  },
  questions: {
    ...defaultSEO,
    title: 'Financial Setup - abFinance',
    description: 'Complete your financial profile setup to get personalized insights and recommendations for your financial journey.',
  }
};

export function generateMetaTags(config: SEOConfig): string {
  const tags = [
    // Basic Meta Tags
    `<title>${config.title}</title>`,
    `<meta name="description" content="${config.description}">`,
    `<meta name="keywords" content="${config.keywords?.join(', ')}">`,
    `<meta name="author" content="${config.author}">`,
    `<meta name="robots" content="${config.robots}">`,
    
    // Open Graph Tags
    `<meta property="og:title" content="${config.title}">`,
    `<meta property="og:description" content="${config.description}">`,
    `<meta property="og:type" content="${config.type}">`,
    `<meta property="og:url" content="${config.url}">`,
    `<meta property="og:site_name" content="${config.siteName}">`,
    `<meta property="og:locale" content="${config.locale}">`,
    `<meta property="og:image" content="${config.image}">`,
    `<meta property="og:image:width" content="512">`,
    `<meta property="og:image:height" content="512">`,
    `<meta property="og:image:alt" content="${config.title}">`,
    
    // Twitter Card Tags
    `<meta name="twitter:card" content="${config.twitterCard}">`,
    `<meta name="twitter:site" content="${config.twitterSite}">`,
    `<meta name="twitter:creator" content="${config.twitterCreator}">`,
    `<meta name="twitter:title" content="${config.title}">`,
    `<meta name="twitter:description" content="${config.description}">`,
    `<meta name="twitter:image" content="${config.image}">`,
    
    // Additional Meta Tags
    `<meta name="theme-color" content="${config.themeColor}">`,
    `<meta name="msapplication-TileColor" content="${config.backgroundColor}">`,
    `<meta name="apple-mobile-web-app-title" content="${config.siteName}">`,
    `<meta name="application-name" content="${config.siteName}">`,
    
    // Canonical URL
    config.canonical ? `<link rel="canonical" href="${config.canonical}">` : '',
    
    // Structured Data (JSON-LD)
    `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "${config.siteName}",
      "description": "${config.description}",
      "url": "${config.url}",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Organization",
        "name": "${config.author}"
      },
      "screenshot": "${config.image}"
    }
    </script>`
  ].filter(Boolean);

  return tags.join('\n    ');
}

export function updatePageSEO(config: SEOConfig) {
  // Update document title
  document.title = config.title;
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', config.description);
  }
  
  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', config.title);
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute('content', config.description);
  
  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute('content', config.image || '');
  
  // Update Twitter Card tags
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', config.title);
  
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) twitterDescription.setAttribute('content', config.description);
  
  const twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (twitterImage) twitterImage.setAttribute('content', config.image || '');
}

export function getPageSEOConfig(pathname: string): SEOConfig {
  // Extract page name from pathname
  const pageName = pathname.split('/').filter(Boolean)[0] || 'home';
  
  // Return specific config or default
  return pageSEOConfigs[pageName] || defaultSEO;
}
