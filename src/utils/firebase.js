import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGp8H904nJKdlJJLmXG1QrITUDQ650Axw",
  authDomain: "pets-connect-11e62.firebaseapp.com",
  projectId: "pets-connect-11e62",
  storageBucket: "pets-connect-11e62.appspot.com",
  messagingSenderId: "346934887414",
  appId: "1:346934887414:web:729f8780dbfd7ec301fdd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);