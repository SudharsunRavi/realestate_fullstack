import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDOaQJ70wegDmTgLujuiDglLh7QIPuucPw",
  authDomain: "realestate-d67e1.firebaseapp.com",
  projectId: "realestate-d67e1",
  storageBucket: "realestate-d67e1.appspot.com",
  messagingSenderId: "368171502756",
  appId: "1:368171502756:web:74329b91c859f8add36a31"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);