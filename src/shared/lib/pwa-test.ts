// PWA Test utilities
export function testPWASetup() {
  console.log('🔧 Testing PWA Setup...');
  
  // Check if service worker is supported
  if ('serviceWorker' in navigator) {
    console.log('✅ Service Worker supported');
  } else {
    console.log('❌ Service Worker not supported');
  }
  
  // Check if app is running in standalone mode
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('✅ App is running in standalone mode (installed)');
  } else {
    console.log('ℹ️ App is running in browser mode');
  }
  
  // Check if app is online/offline
  if (navigator.onLine) {
    console.log('✅ App is online');
  } else {
    console.log('⚠️ App is offline');
  }
  
  // Check for PWA manifest
  const manifestLink = document.querySelector('link[rel="manifest"]');
  if (manifestLink) {
    console.log('✅ PWA manifest found');
  } else {
    console.log('❌ PWA manifest not found');
  }
  
  // Check for theme color
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    console.log('✅ Theme color meta tag found');
  } else {
    console.log('❌ Theme color meta tag not found');
  }
  
  console.log('🔧 PWA setup test completed!');
}

// Make it available globally for testing
if (typeof window !== 'undefined') {
  (window as any).testPWASetup = testPWASetup;
}
