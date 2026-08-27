import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, collection, getDocs, setDoc, getDoc, updateDoc, deleteDoc, query, orderBy, limit } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Cloud Firestore database with the custom firestoreDatabaseId if specified
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);

export { doc, collection, getDocs, setDoc, getDoc, updateDoc, deleteDoc, query, orderBy, limit };
