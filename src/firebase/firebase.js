import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyBV-26nUIPlRK4oTFCL9pXW9DqQLRJ1Vpc",
  authDomain: "blog-verse-bb262.firebaseapp.com",
  projectId: "blog-verse-bb262",
  storageBucket: "blog-verse-bb262.firebasestorage.app",
  messagingSenderId: "953271182223",
  appId: "1:953271182223:web:c0daded638b25a3f02a1fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
