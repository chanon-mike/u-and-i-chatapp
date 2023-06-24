import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { createAuth } from './firebase';

export const loginWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();

  await signInWithPopup(createAuth(), googleProvider)
    .then((result) => {
      const user = result.user;
      if (user) {
        user.getIdToken(true).then(async (tkn) => {
          // set access token in session storage
          sessionStorage.setItem('accessToken', tkn);
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const logout = async () => {
  await createAuth()
    .signOut()
    .then(() => {
      sessionStorage.clear();
      alert('Logout successfully');
    })
    .catch((error) => {
      alert(error);
    });
};
