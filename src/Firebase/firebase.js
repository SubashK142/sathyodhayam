// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDkR6PjwqYIGoyqrxkf1PGStrXztjZfokQ",
    authDomain: "sathyodhayam-50d9a.firebaseapp.com",
    projectId: "sathyodhayam-50d9a",
    storageBucket: "sathyodhayam-50d9a",
    messagingSenderId: "696545506494",
    appId: "1:696545506494:web:9fa5337c4ae125acf51aef",
    measurementId: "G-V216WKYGQF"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
