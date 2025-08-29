import { type FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { type Analytics, getAnalytics } from 'firebase/analytics';
import { type Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

if (
  !firebaseConfig.apiKey ||
  !firebaseConfig.projectId ||
  !firebaseConfig.appId
) {
  console.error('Firebase config validation failed:', {
    apiKey: !!firebaseConfig.apiKey,
    projectId: !!firebaseConfig.projectId,
    appId: !!firebaseConfig.appId,
    authDomain: !!firebaseConfig.authDomain,
    storageBucket: !!firebaseConfig.storageBucket,
    messagingSenderId: !!firebaseConfig.messagingSenderId,
  });
  throw new Error(
    'Missing required Firebase configuration. Please check your environment variables.'
  );
}

export const firestoreCollection = {
  USERS: 'users',
  GOALS: 'goals',
  INCOMES: 'incomes',
  OUTCOMES: 'outcomes',
};

// Initialize Firebase app only if it hasn't been initialized already
let firebaseApp: FirebaseApp;
try {
  if (getApps().length === 0) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApps()[0];
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  // If there's an error, try to get the existing app
  const apps = getApps();
  if (apps.length > 0) {
    firebaseApp = apps[0];
  } else {
    throw error;
  }
}

// Initialize Firebase services with error handling
let auth: Auth, db: Firestore;
try {
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
} catch (error) {
  console.error('Firebase services initialization error:', error);
  throw error;
}

export { auth, db };

// Initialize analytics only in production and when measurementId is available
let analytics: Analytics;
try {
  if (import.meta.env.PROD && firebaseConfig.measurementId) {
    analytics = getAnalytics(firebaseApp);
  }
} catch (error) {
  console.warn('Analytics initialization failed:', error);
}

export { analytics };
export { firebaseApp };
