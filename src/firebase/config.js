
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCoDPNCmQTDh4WkLoeukqCcKmCJ7cdYSSA",
  authDomain: "e-commerce-web-app-68561.firebaseapp.com",
  projectId: "e-commerce-web-app-68561",
  storageBucket: "e-commerce-web-app-68561.appspot.com",
  messagingSenderId: "364594827035",
  appId: "1:364594827035:web:77f6f69b072cc6aeea0dbe",
  measurementId: "G-84CVKYLVR5"
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);

// Initializing Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
