// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtZUNFe4Oy_KtPBBjnKGULkqHSuBS7fck",
  authDomain: "ethels-5ee21.firebaseapp.com",
  projectId: "ethels-5ee21",
  storageBucket: "ethels-5ee21.appspot.com",
  messagingSenderId: "317304161299",
  appId: "1:317304161299:web:df7b6ebe8da4fbe105ebe6",
  measurementId: "G-M6GVR2QCJZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


export { auth };