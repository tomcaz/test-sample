// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);