import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCe8mRmOR0cw53xXCuPh4PC6Fxmpq8pFU0",
  authDomain: "chatbot-2d014.firebaseapp.com",
  projectId: "chatbot-2d014",
  storageBucket: "chatbot-2d014.firebasestorage.app",
  messagingSenderId: "842293380341",
  appId: "1:842293380341:web:f15694b92d6696838eb1bc"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
