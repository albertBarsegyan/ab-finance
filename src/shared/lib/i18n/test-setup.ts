// Test script to verify i18n setup
import i18n from './index';

export function testI18nSetup() {
  console.log('🌐 Testing i18n setup...');
  
  // Test if i18n is properly initialized
  console.log('Current language:', i18n.language);
  console.log('Available languages:', i18n.languages);
  
  // Test English translations
  i18n.changeLanguage('en');
  console.log('🇺🇸 English translations:');
  console.log('  - Sign In:', i18n.t('auth.signIn'));
  console.log('  - Dashboard:', i18n.t('navigation.dashboard'));
  console.log('  - My Goals:', i18n.t('goals.myGoals'));
  console.log('  - Add New Goal:', i18n.t('goals.addNewGoal'));
  
  // Test Armenian translations
  i18n.changeLanguage('hy');
  console.log('🇦🇲 Armenian translations:');
  console.log('  - Sign In:', i18n.t('auth.signIn'));
  console.log('  - Dashboard:', i18n.t('navigation.dashboard'));
  console.log('  - My Goals:', i18n.t('goals.myGoals'));
  console.log('  - Add New Goal:', i18n.t('goals.addNewGoal'));
  
  // Test language switching
  console.log('🔄 Testing language switching...');
  i18n.changeLanguage('en');
  console.log('Switched to English:', i18n.t('auth.signIn'));
  i18n.changeLanguage('hy');
  console.log('Switched to Armenian:', i18n.t('auth.signIn'));
  
  console.log('✅ i18n setup test completed!');
}

// Make it available globally for testing
if (typeof window !== 'undefined') {
  (window as any).testI18nSetup = testI18nSetup;
}
