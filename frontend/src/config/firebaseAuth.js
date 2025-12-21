
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"




const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain:import.meta.env.VITE_DOMAIN ,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE ,
  messagingSenderId:import.meta.env.VITE_SENDERID ,
  appId: import.meta.env.VITE_APPID
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider()