
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

import {initializeAuth, getAuth,getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAU8vaE0ysbFphj0jfyP3iQRPgMTg2fduA",
  authDomain: "gym-app-6c12e.firebaseapp.com",
  projectId: "gym-app-6c12e",
  storageBucket: "gym-app-6c12e.appspot.com",
  messagingSenderId: "997460137732",
  appId: "1:997460137732:web:f90bebc7f2a0758a48a251",
  measurementId: "G-RBTZJMCM1P"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// const analytics = getAnalytics(app);
// const storage = getStorage(app, "gs://medisale-app.appspot.com");
const storage=getStorage(app);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db, app ,storage,firebase};