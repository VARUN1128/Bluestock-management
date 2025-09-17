import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAdTad653jxSQDOrliSPApI4V48x2z_Wp0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "bluestock-management.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "bluestock-management",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "bluestock-management.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "417525570487",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:417525570487:web:cd00a23cc05d316a7e2632",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-6VK5QNGZ3D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Firebase is ready to use online!

export default app;
