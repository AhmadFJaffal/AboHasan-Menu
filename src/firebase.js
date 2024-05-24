// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZbg7bb7dl3ukNOvFbUL1-M4rAR7Eb1Ic",
  authDomain: "abohasanresto.firebaseapp.com",
  projectId: "abohasanresto",
  storageBucket: "abohasanresto.appspot.com",
  messagingSenderId: "474205535905",
  appId: "1:474205535905:web:c57b3d541252b47edefae0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);

export { app, db };
