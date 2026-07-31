import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY || "AIzaSyD0dtUGyIsdtc0xgGtEvtgeolWxCKiLAHCA",
  authDomain: "authexamnotes-45e80.firebaseapp.com",
  projectId: "authexamnotes-45e80",
  storageBucket: "authexamnotes-45e80.firebasestorage.app",
  messagingSenderId: "905142898542",
  appId: "1:905142898542:web:95c0d48e1be2eed3b33b7f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };