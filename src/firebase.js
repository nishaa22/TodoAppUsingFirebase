import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoTCk-CnHvPLB40hmDTF0M8at6I2UKE3A",
  authDomain: "todo-app-83daf.firebaseapp.com",
  projectId: "todo-app-83daf",
  storageBucket: "todo-app-83daf.appspot.com",
  messagingSenderId: "806764041332",
  appId: "1:806764041332:web:493d921245d1db1dc9ed21",
  measurementId: "G-PNP17J96FJ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
