import { onAuthStateChanged } from 'firebase/auth';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { getMe } from '../api';
import { userAtom } from '../atom/user';
import { createAuth } from '../utils/firebase';
import { Loading } from './Loading/Loading';

export const AuthLoader = () => {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const [isInitedAuth, dispatchIsInitedAuth] = useReducer(() => true, false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(createAuth(), async (fbUser) => {
      if (fbUser) {
        await getMe();
        setUser(fbUser);
      } else {
        setUser(null);
      }

      dispatchIsInitedAuth();
    });

    return () => unsubscribe();
  }, [setUser]);

  useEffect(() => {
    if (!isInitedAuth) return;

    const redirectToHome = async () => {
      router.pathname === '/login' && (await router.push('/'));
    };
    const redirectToLogin = async () => {
      router.pathname === '/' && (await router.push('/login'));
    };

    user ? redirectToHome() : redirectToLogin();
  }, [router, isInitedAuth, user]);

  return <Loading visible={!isInitedAuth} />;
};
