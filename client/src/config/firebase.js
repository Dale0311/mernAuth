// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: 'mern-auth-29e3c.firebaseapp.com',
  projectId: 'mern-auth-29e3c',
  storageBucket: 'mern-auth-29e3c.appspot.com',
  messagingSenderId: '1062074017370',
  appId: '1:1062074017370:web:8384f78ee3a69287f3da63',
};

// Initialize Firebase
export default initializeApp(firebaseConfig);
