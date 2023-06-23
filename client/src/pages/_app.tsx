import type { AppPropsType } from 'next/dist/shared/lib/utils';
import { type Router } from 'next/router';
import { AuthLoader } from '../components/common/AuthLoader';
import '../styles/globals.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppProps<P = any> = AppPropsType<Router, P>;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <AuthLoader />
    </>
  );
}
