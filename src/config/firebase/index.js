// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqOOZ-rIIMIR7A1GROBQFjfDO1psuIC2Q",
  authDomain: "simple-notes-firebase-beaa2.firebaseapp.com",
  projectId: "simple-notes-firebase-beaa2",
  storageBucket: "simple-notes-firebase-beaa2.appspot.com",
  messagingSenderId: "291104688257",
  appId: "1:291104688257:web:8d358a5d6b1b839db76580",
  measurementId: "G-DV10EDJZZY"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const database = getDatabase();

export default firebase;