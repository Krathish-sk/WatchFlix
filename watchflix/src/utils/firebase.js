import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASro6sXdoSC0f49-gYAt_EdolfREt_c-o",
  authDomain: "watchflix-8e394.firebaseapp.com",
  projectId: "watchflix-8e394",
  storageBucket: "watchflix-8e394.appspot.com",
  messagingSenderId: "780062919732",
  appId: "1:780062919732:web:586169be796bc9dadd0e61",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const provider = new GoogleAuthProvider();
