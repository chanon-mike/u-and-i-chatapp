import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { createAuth } from './firebase';

export const loginWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider();

  await signInWithPopup(createAuth(), googleProvider)
    .then((result) => {
      // This gives you a Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      // After user is signed in, set the state to true
      const user = result.user;
      if (user) {
        user.getIdToken().then((tkn) => {
          // set access token in session storage
          sessionStorage.setItem('accessToken', tkn);
          // setAuthorizedUser(true);
        });
      }
      console.log(user);
    })
    .catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
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
