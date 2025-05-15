import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDdM92Anw-nwzmSN9BGEj6yxICbLCMIltQ",
  authDomain: "tiendavirtual-b815e.firebaseapp.com",
  projectId: "tiendavirtual-b815e",
  storageBucket: "tiendavirtual-b815e.firebasestorage.app",
  messagingSenderId: "47715084138",
  appId: "1:47715084138:web:6913002721890e8b4a6713",
  measurementId: "G-LF4QQJ6N4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;