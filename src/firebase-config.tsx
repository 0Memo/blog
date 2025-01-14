// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const apiKey = import.meta.env.VITE_API_apiKey;
const authDomain = import.meta.env.VITE_API_authDomain;
const projectId = import.meta.env.VITE_API_projectId;
const storageBucket = import.meta.env.VITE_API_storageBucket;
const messagingSenderId = import.meta.env.VITE_API_messagingSenderId;
const appId = import.meta.env.VITE_API_appId;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();