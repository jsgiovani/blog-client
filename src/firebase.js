// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-9f3ca.firebaseapp.com",
  projectId: "mern-blog-9f3ca",
  storageBucket: "mern-blog-9f3ca.appspot.com",
  messagingSenderId: "761111131815",
  appId: "1:761111131815:web:7d8cefe95678112c4a0d82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;