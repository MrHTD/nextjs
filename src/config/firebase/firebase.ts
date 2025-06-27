// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import type { Messaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdb2c-tO-YAlOd7PlfTV9iEYJXvjby9SI",
  authDomain: "mawrid-3c27b.firebaseapp.com",
  projectId: "mawrid-3c27b",
  storageBucket: "mawrid-3c27b.firebasestorage.app",
  messagingSenderId: "526643003659",
  appId: "1:526643003659:web:5f9f24720da1d360bd220e",
  measurementId: "G-MG31N6RW0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let messaging: Messaging;

if (typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator) {
  messaging = getMessaging(app);
}

export { messaging, getToken, onMessage };