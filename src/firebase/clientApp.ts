// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDm3OBHo1XAgUoIr1Dqm-DZhDgmESLIXHw",
  authDomain: "vamos-pu.firebaseapp.com",
  projectId: "vamos-pu",
  storageBucket: "vamos-pu.appspot.com",
  messagingSenderId: "255921353515",
  appId: "1:255921353515:web:53911841a6263e81750b6e",
  measurementId: "G-VKPZ8TPZ6M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const login = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log({ credential, token, user });
      // TODO: remove this line when login page is done
      window.location.href = "/homepage";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log({ errorCode, errorMessage, email, credential });
    });
};

export { auth, db, login, storage };
