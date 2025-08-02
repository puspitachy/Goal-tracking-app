// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

 

// Our Milesto web app's Firebase configuration

// use your domain auth when using the code.Replace the name and key everything 
// strictly prohibited to use domain user anyone else name
const firebaseConfig = {
  apiKey: "AIzaSyBA6lGnpV2zOxDbPXq7AfZJwmo1nHJPGsw",
  authDomain: "hackathon-app-feda2.firebaseapp.com",
  projectId: "hackathon-app-feda2",
  storageBucket: "hackathon-app-feda2.firebasestorage.app",
  messagingSenderId: "819900743275",
  appId: "1:819900743275:web:5ed69b5f3bf619d6287b2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;
// Please Note- The set up of this app is pretty straightforward, feel free to adjust things later if you need more custom behavior.