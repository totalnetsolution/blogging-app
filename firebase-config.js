import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyCMR1CsQJG1OMd7vBcVFbcYqEmxmtCRBIY",
  authDomain: "blogging-app-1bfe4.firebaseapp.com",
  projectId: "blogging-app-1bfe4",
  storageBucket: "blogging-app-1bfe4.appspot.com",
  messagingSenderId: "759308878873",
  appId: "1:759308878873:web:95feaad1616be14e5e1688",
  measurementId: "G-FV0J1X9NRD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);