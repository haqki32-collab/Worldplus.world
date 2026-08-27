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

export function sanitizeForFirestore(val: any): any {
  if (val === undefined) {
    return null;
  }
  if (val === null || typeof val !== 'object') {
    return val;
  }
  if (Array.isArray(val)) {
    return val
      .filter(item => item !== undefined)
      .map(item => sanitizeForFirestore(item));
  }
  const cleanObj: Record<string, any> = {};
  for (const [k, v] of Object.entries(val)) {
    if (v !== undefined) {
      cleanObj[k] = sanitizeForFirestore(v);
    }
  }
  return cleanObj;
}

export async function persistArticleToFirestore(article: Article) {
  try {
    const db = getFirestoreSync();
    if (!db) return;
    const docRef = doc(db, 'articles', article.id);
    const sanitized = sanitizeForFirestore(article);
    await setDoc(docRef, sanitized, { merge: true });
    console.log(`📡 Persisted article "${article.title.slice(0, 30)}..." to Firestore collection: articles/${article.id}`);
  } catch (err) {
    console.error('Error persisting article to Firestore:', err);
  }
}
