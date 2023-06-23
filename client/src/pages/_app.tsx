import type { AppPropsType } from 'next/dist/shared/lib/utils';
import { useRouter, type Router } from 'next/router';
import { useEffect } from 'react';
import { AuthLoader } from '../components/common/AuthLoader';
import '../styles/globals.css';
import { createAuth } from '../utils/firebase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppProps<P = any> = AppPropsType<Router, P>;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = createAuth().onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <>
      <Component {...pageProps} />
      <AuthLoader />
    </>
  );
}
