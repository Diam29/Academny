import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDM_XvOJa76D5dUSnzQlyS_zsjsgVMoJTM",
    authDomain: "academiaonline-1e762.firebaseapp.com",
    projectId: "academiaonline-1e762",
    storageBucket: "academiaonline-1e762.appspot.com",
    messagingSenderId: "717736888537",
    appId: "1:717736888537:web:d40c09ef201293cedb16c8",
    persistence: "none"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase)
