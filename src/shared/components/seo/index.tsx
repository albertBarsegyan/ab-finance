import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  getPageSEOConfig,
  type SEOConfig,
  updatePageSEO,
} from '@/shared/lib/seo';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  customConfig?: Partial<SEOConfig>;
}

export function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type,
  customConfig,
}: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    // Get base config for current page
    const baseConfig = getPageSEOConfig(location.pathname);

    // Merge with custom props and config
    const finalConfig: SEOConfig = {
      ...baseConfig,
      ...customConfig,
      ...(title && { title }),
      ...(description && { description }),
      ...(keywords && {
        keywords: [...(baseConfig.keywords || []), ...keywords],
      }),
      ...(image && { image }),
      ...(url && { url }),
      ...(type && { type }),
    };

    // Update page SEO
    updatePageSEO(finalConfig);
  }, [
    location.pathname,
    title,
    description,
    keywords,
    image,
    url,
    type,
    customConfig,
  ]);

  return null; // This component doesn't render anything
}

// Convenience components for specific pages
export function HomeSEO() {
  return <SEO />;
}

export function DashboardSEO() {
  return (
    <SEO
      title="Dashboard - abFinance"
      description="View your financial overview, track progress towards goals, and analyze your spending patterns with comprehensive charts and insights."
      keywords={[
        'financial dashboard',
        'money overview',
        'spending analysis',
        'financial insights',
      ]}
    />
  );
}

export function IncomeSEO() {
  return (
    <SEO
      title="Income Tracking - abFinance"
      description="Track and manage your income sources. Add salary, freelance work, investments, and other income streams with detailed categorization."
      keywords={[
        'income tracking',
        'salary tracking',
        'freelance income',
        'investment income',
      ]}
    />
  );
}

export function ExpensesSEO() {
  return (
    <SEO
      title="Expense Management - abFinance"
      description="Monitor your spending habits, categorize expenses, and identify areas for savings with detailed expense tracking and analytics."
      keywords={[
        'expense tracking',
        'spending analysis',
        'budget management',
        'expense categories',
      ]}
    />
  );
}

export function GoalsSEO() {
  return (
    <SEO
      title="Financial Goals - abFinance"
      description="Set, track, and achieve your financial goals. Monitor progress, calculate daily savings needed, and stay motivated with visual progress tracking."
      keywords={[
        'financial goals',
        'savings goals',
        'goal tracking',
        'financial planning',
      ]}
    />
  );
}

export function ProfileSEO() {
  return (
    <SEO
      title="Profile Settings - abFinance"
      description="Manage your account settings, preferences, and personal information in your abFinance profile."
      keywords={['profile settings', 'account management', 'user preferences']}
    />
  );
}

export function LoginSEO() {
  return (
    <SEO
      title="Sign In - abFinance"
      description="Sign in to your abFinance account to access your personal finance dashboard and start managing your money effectively."
      keywords={['sign in', 'login', 'account access']}
    />
  );
}

export function RegisterSEO() {
  return (
    <SEO
      title="Create Account - abFinance"
      description="Join abFinance and start your journey to better financial management. Create your free account today."
      keywords={['create account', 'sign up', 'register', 'free account']}
    />
  );
}

export function QuestionsSEO() {
  return (
    <SEO
      title="Financial Setup - abFinance"
      description="Complete your financial profile setup to get personalized insights and recommendations for your financial journey."
      keywords={['financial setup', 'profile setup', 'financial onboarding']}
    />
  );
}
