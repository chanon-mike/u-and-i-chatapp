import { onAuthStateChanged } from 'firebase/auth';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { userApiClient } from '../../api';
import { fbUserAtom, userAtom } from '../../atom/user';
import { createAuth } from '../../utils/firebase';
import { Loading } from './Loading/Loading';

export const AuthLoader = () => {
  const router = useRouter();
  const [fbUser, setFbUser] = useAtom(fbUserAtom);
  const [user, setUser] = useAtom(userAtom);
  const [isInitedAuth, dispatchIsInitedAuth] = useReducer(() => true, false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(createAuth(), async (firebaseUser) => {
      if (firebaseUser) {
        firebaseUser.getIdToken(true).then(async (tkn) => {
          const userData = await userApiClient.getUserData(tkn, firebaseUser.uid);
          setUser(userData);
          setFbUser(firebaseUser);
        });
      } else {
        setFbUser(null);
        setUser(null);
      }

      dispatchIsInitedAuth();
    });

    return () => unsubscribe();
  }, [setUser, setFbUser]);

  useEffect(() => {
    if (!isInitedAuth) return;

    const redirectToHome = async () => {
      router.pathname === ('/login' || '/onboarding') && (await router.push('/'));
    };
    const redirectToLogin = async () => {
      router.pathname === '/' && (await router.push('/login'));
    };
    const redirectToOnboarding = async () => {
      await router.push('/onboarding');
    };

    // If user login but not create profile yet, go to onboarding, if created, go to main apge, else login
    if (fbUser && !user) redirectToOnboarding();
    else if (user) redirectToHome();
    else redirectToLogin();
  }, [router, isInitedAuth, fbUser, user]);

  return <Loading visible={!isInitedAuth} />;
};
