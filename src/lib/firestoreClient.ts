import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  increment,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase';
import { Article, Category, Country, TrendItem, AutomationLog } from '../types';
import { INITIAL_ARTICLES, INITIAL_CATEGORIES, INITIAL_COUNTRIES, INITIAL_TRENDS } from '../data/initialData';

const ARTICLES_COLLECTION = 'articles';
const CATEGORIES_COLLECTION = 'categories';
const COUNTRIES_COLLECTION = 'countries';
const TRENDS_COLLECTION = 'trends';
const LOGS_COLLECTION = 'logs';

/**
 * Real-time subscription to articles collection in Firestore.
 */
export function subscribeToFirestoreArticles(
  onUpdate: (articles: Article[]) => void,
  onError?: (error: Error) => void
): () => void {
  try {
    const articlesRef = collection(db, ARTICLES_COLLECTION);
    const q = query(articlesRef, orderBy('publishedAt', 'desc'), limit(50));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const articles: Article[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data() as Article;
            articles.push({ ...data, id: docSnap.id });
          });
          onUpdate(articles);
        } else {
          // If Firestore is empty, auto-seed with initial data
          console.log('[Firestore] Articles collection is empty. Seeding initial articles...');
          seedFirestoreIfEmpty().then((seeded) => {
            if (seeded) {
              onUpdate(INITIAL_ARTICLES);
            }
          }).catch((err) => {
            console.warn('[Firestore] Error auto-seeding:', err);
          });
        }
      },
      (error) => {
        console.warn('[Firestore] Real-time articles listener error:', error);
        if (onError) onError(error);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn('[Firestore] Failed to initialize real-time listener:', err);
    return () => {};
  }
}

/**
 * Fetch all articles directly from Firestore
 */
export async function fetchArticlesFromFirestore(): Promise<Article[]> {
  try {
    const articlesRef = collection(db, ARTICLES_COLLECTION);
    const q = query(articlesRef, orderBy('publishedAt', 'desc'), limit(50));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Seed if empty
      await seedFirestoreIfEmpty();
      return INITIAL_ARTICLES;
    }

    const articles: Article[] = [];
    snapshot.forEach((docSnap) => {
      articles.push({ ...(docSnap.data() as Article), id: docSnap.id });
    });
    return articles;
  } catch (error) {
    console.warn('[Firestore] Failed to fetch articles from Firestore:', error);
    return INITIAL_ARTICLES;
  }
}

/**
 * Save / Publish a single article to Firestore
 */
export async function saveArticleToFirestore(article: Article): Promise<boolean> {
  try {
    const articleRef = doc(db, ARTICLES_COLLECTION, article.id);
    await setDoc(articleRef, article, { merge: true });
    console.log(`[Firestore] Article ${article.id} saved successfully`);
    return true;
  } catch (error) {
    console.error('[Firestore] Failed to save article to Firestore:', error);
    return false;
  }
}

/**
 * Like an article in Firestore
 */
export async function likeArticleInFirestore(articleId: string): Promise<number | null> {
  try {
    const articleRef = doc(db, ARTICLES_COLLECTION, articleId);
    await updateDoc(articleRef, {
      likesCount: increment(1)
    });
    return 1;
  } catch (error) {
    console.warn('[Firestore] Failed to increment like in Firestore:', error);
    return null;
  }
}

/**
 * Delete an article from Firestore
 */
export async function deleteArticleFromFirestore(articleId: string): Promise<boolean> {
  try {
    const articleRef = doc(db, ARTICLES_COLLECTION, articleId);
    await deleteDoc(articleRef);
    return true;
  } catch (error) {
    console.error('[Firestore] Failed to delete article:', error);
    return false;
  }
}

/**
 * Seed Firestore with initial articles, categories, countries, and trends if empty
 */
export async function seedFirestoreIfEmpty(force = false): Promise<boolean> {
  try {
    const articlesRef = collection(db, ARTICLES_COLLECTION);
    const snapshot = await getDocs(query(articlesRef, limit(1)));

    if (!snapshot.empty && !force) {
      return false; // Already has data
    }

    console.log('[Firestore] Writing initial articles & taxonomy to Firebase...');
    
    // Batch write articles
    const batch = writeBatch(db);

    for (const article of INITIAL_ARTICLES) {
      const artDoc = doc(db, ARTICLES_COLLECTION, article.id);
      batch.set(artDoc, article, { merge: true });
    }

    for (const category of INITIAL_CATEGORIES) {
      const catDoc = doc(db, CATEGORIES_COLLECTION, category.id);
      batch.set(catDoc, category, { merge: true });
    }

    for (const country of INITIAL_COUNTRIES.slice(0, 10)) {
      const countDoc = doc(db, COUNTRIES_COLLECTION, country.code);
      batch.set(countDoc, country, { merge: true });
    }

    for (const trend of INITIAL_TRENDS) {
      const trendDoc = doc(db, TRENDS_COLLECTION, trend.id);
      batch.set(trendDoc, trend, { merge: true });
    }

    await batch.commit();
    console.log('[Firestore] Seed complete! Articles are now live in Firestore.');
    return true;
  } catch (error) {
    console.error('[Firestore] Failed to seed database:', error);
    return false;
  }
}

/**
 * Log an automation action to Firestore
 */
export async function addLogToFirestore(log: AutomationLog): Promise<void> {
  try {
    const logDoc = doc(db, LOGS_COLLECTION, log.id);
    await setDoc(logDoc, log);
  } catch (err) {
    console.warn('[Firestore] Failed to write log:', err);
  }
}
