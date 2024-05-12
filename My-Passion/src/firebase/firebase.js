// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmewqq1THAq61AbRkY7wcBUvLKOIJWFXs",
  authDomain: "my-passion-b22f7.firebaseapp.com",
  projectId: "my-passion-b22f7",
  storageBucket: "my-passion-b22f7.appspot.com",
  messagingSenderId: "906520657562",
  appId: "1:906520657562:web:02fcde98d264eabbcc2923"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;