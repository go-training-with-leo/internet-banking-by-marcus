import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Env from 'config/Env';

const firebaseConfig = {
  apiKey: Env.API_KEY,
  authDomain: Env.AUTH_DOMAIN,
  projectId: Env.PROJECT_ID,
  storageBucket: Env.STORAGE_BUCKET,
  messagingSenderId: Env.MESSAGING_SENDER_ID,
  appId: Env.APP_ID,
  measurementId: Env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
