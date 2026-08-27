import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { Article } from '../src/types.js';

let firestoreInstance: any = null;

export function getFirestoreSync() {
  if (firestoreInstance) return firestoreInstance;
  try {
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    if (fs.existsSync(configPath)) {
      const raw = fs.readFileSync(configPath, 'utf-8');
      const config = JSON.parse(raw);
      const app = getApps().length === 0 ? initializeApp(config) : getApp();
      firestoreInstance = getFirestore(app, config.firestoreDatabaseId || undefined);
      console.log('✅ Firebase Firestore synchronized successfully for worldplus.world');
      return firestoreInstance;
    }
  } catch (err) {
    console.warn('Firebase sync initialization notice:', err);
  }
  return null;
}

export async function persistArticleToFirestore(article: Article) {
  try {
    const db = getFirestoreSync();
    if (!db) return;
    const docRef = doc(db, 'articles', article.id);
    await setDoc(docRef, article, { merge: true });
    console.log(`📡 Persisted article "${article.title.slice(0, 30)}..." to Firestore collection: articles/${article.id}`);
  } catch (err) {
    console.error('Error persisting article to Firestore:', err);
  }
}
