import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_API_KEY,
  authDomain: "smart-parking-4db41.firebaseapp.com",
  projectId: "smart-parking-4db41",
  storageBucket: "smart-parking-4db41.appspot.com",
  messagingSenderId: "527339015288",
  appId: process.env.NEXT_FIREBASE_APP_ID,
  measurementId: "G-17SNK6WWZX",
};

const app = initializeApp(firebaseConfig);

export const dbFireStore = getFirestore(app);
export const storage = getStorage(app);

export const parkingCollectionRef = collection(dbFireStore, "parking-slot");
export const entriesCollectionRef = collection(dbFireStore, "entries");

export const auth = getAuth(app);
