import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCLr1uraOTz_ZBaSqz6VzkmpUdwSYgUpEU',
  authDomain: 'crown-db-4399d.firebaseapp.com',
  databaseURL: 'https://crown-db-4399d.firebaseio.com',
  projectId: 'crown-db-4399d',
  storageBucket: 'crown-db-4399d.appspot.com',
  messagingSenderId: '27523760316',
  appId: '1:27523760316:web:4eb49bda4aeed4df9dd0b9'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;


}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
