// Simple test to verify translations are working
import i18n from './index';

export function testTranslations() {
  console.log('Testing translations...');

  // Test English
  i18n.changeLanguage('en');
  console.log('English - Sign In:', i18n.t('auth.signIn'));
  console.log('English - Dashboard:', i18n.t('navigation.dashboard'));
  console.log('English - My Goals:', i18n.t('goals.myGoals'));

  // Test Armenian
  i18n.changeLanguage('hy');
  console.log('Armenian - Sign In:', i18n.t('auth.signIn'));
  console.log('Armenian - Dashboard:', i18n.t('navigation.dashboard'));
  console.log('Armenian - My Goals:', i18n.t('goals.myGoals'));

  console.log('Translation test completed!');
}

// Export for use in development
if (typeof window !== 'undefined') {
  (window as any).testTranslations = testTranslations;
}
