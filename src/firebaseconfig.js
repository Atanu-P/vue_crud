// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCalUoDlV2X509zhFdzLGiX_qO2riE-C-I",

  authDomain: "vue-my-app-1da88.firebaseapp.com",

  databaseURL: "https://vue-my-app-1da88-default-rtdb.firebaseio.com",

  projectId: "vue-my-app-1da88",

  storageBucket: "vue-my-app-1da88.appspot.com",

  messagingSenderId: "20979877302",

  appId: "1:20979877302:web:f99977403cb168fab82d17"

};


// Initialize Firebase

//const app = initializeApp(firebaseConfig);
const db = getFirestore(initializeApp(firebaseConfig));
export default db;

