import { initializeApp } from "firebase/app";
import { getAuth,signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqvbd4ooSPjWtRRfbScBor2d_4F3hBfUE",
  authDomain: "authentication-47201.firebaseapp.com",
  projectId: "authentication-47201",
  storageBucket: "authentication-47201.firebasestorage.app",
  messagingSenderId: "989482347944",
  appId: "1:989482347944:web:558803d214eb710321819d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export  { auth }; // Export the auth object