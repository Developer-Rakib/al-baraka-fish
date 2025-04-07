// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyCHY-5WIFVOxsV5CDBXsbCbLc_Nldgcdbs",
    authDomain: "al-baraka-fish.firebaseapp.com",
    projectId: "al-baraka-fish",
    storageBucket: "al-baraka-fish.firebasestorage.app",
    messagingSenderId: "462047232304",
    appId: "1:462047232304:web:52d95efb20018966c388f5"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;