// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDp5cDaLrebzVzecG48gqGaAXjJW0BY54A",
  authDomain: "expense--tracker-3037.firebaseapp.com",
  projectId: "expense--tracker-3037",
  storageBucket: "expense--tracker-3037.appspot.com",
  messagingSenderId: "778040091923",
  appId: "1:778040091923:web:a91cf45cf3000b005726e6",
  measurementId: "G-9H1KBRB761"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');
export const db = getFirestore(app);

// fire base login
// firebase init
// firebase deploy
// firebase deploy