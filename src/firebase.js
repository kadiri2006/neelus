import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgoQO22gQkmXKjZB60JIbVbzU-IHFJ9CI",
  authDomain: "neelus-a92c1.firebaseapp.com",
  projectId: "neelus-a92c1",
  storageBucket: "neelus-a92c1.appspot.com",
  messagingSenderId: "275189889298",
  appId: "1:275189889298:web:8f831276df2786afaadbcb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();
const db = getFirestore();

export { storage, db };
