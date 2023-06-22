import type { FirebaseOptions } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

let cachedAuth: Auth;

export const createAuth = () => {
  if (cachedAuth) return cachedAuth;

  // Initialize Firebase
  const firebaseConfig: FirebaseOptions = JSON.parse(
    process.env.NEXT_PUBLIC_FIREBASE_CONFIG ?? '{}'
  );
  const firebaseAuth = getAuth(initializeApp(firebaseConfig));
  cachedAuth = firebaseAuth;

  return firebaseAuth;
};
