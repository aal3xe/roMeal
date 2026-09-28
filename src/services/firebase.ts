import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  serverTimestamp,
  Firestore
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserProfile, WeeklyMealPlan, AggregatedShoppingItem } from '../types';

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Firestore with specific database ID if provided
export const cloudDb: Firestore = firebaseConfig.firestoreDatabaseId && 
  firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Authentication helper methods
export const cloudAuth = {
  async signInWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  },

  async signInWithEmail(email: string, pass: string) {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    return cred.user;
  },

  async signUpWithEmail(email: string, pass: string, fullName: string) {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    if (fullName) {
      await updateProfile(cred.user, { displayName: fullName });
    }
    return cred.user;
  },

  async logout() {
    await signOut(auth);
  },

  onStateChanged(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
  }
};

// Firestore cloud sync service for roMeal
export const cloudSync = {
  // Save or update User Profile in Cloud Firestore
  async saveUserProfile(userId: string, profile: Partial<UserProfile>): Promise<void> {
    try {
      const userRef = doc(cloudDb, 'users', userId);
      await setDoc(userRef, {
        ...profile,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.warn('Eroare sincronizare profil în Firestore:', err);
    }
  },

  // Load User Profile from Cloud Firestore
  async loadUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const userRef = doc(cloudDb, 'users', userId);
      const snapshot = await getDoc(userRef);
      if (snapshot.exists()) {
        return snapshot.data() as UserProfile;
      }
    } catch (err) {
      console.warn('Eroare încărcare profil din Firestore:', err);
    }
    return null;
  },

  // Save Weekly Meal Plan to Cloud Firestore
  async saveWeeklyPlan(userId: string, plan: WeeklyMealPlan): Promise<void> {
    try {
      const planRef = doc(cloudDb, 'users', userId, 'meal_plans', 'current_week');
      await setDoc(planRef, {
        ...plan,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.warn('Eroare sincronizare plan săptămânal în Firestore:', err);
    }
  },

  // Load Weekly Meal Plan from Cloud Firestore
  async loadWeeklyPlan(userId: string): Promise<WeeklyMealPlan | null> {
    try {
      const planRef = doc(cloudDb, 'users', userId, 'meal_plans', 'current_week');
      const snapshot = await getDoc(planRef);
      if (snapshot.exists()) {
        return snapshot.data() as WeeklyMealPlan;
      }
    } catch (err) {
      console.warn('Eroare încărcare plan din Firestore:', err);
    }
    return null;
  },

  // Save Shopping List state to Cloud Firestore
  async saveShoppingList(userId: string, items: AggregatedShoppingItem[], checkedIds: string[]): Promise<void> {
    try {
      const listRef = doc(cloudDb, 'users', userId, 'shopping_lists', 'current');
      await setDoc(listRef, {
        items,
        checkedIds,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.warn('Eroare sincronizare listă cumpărături:', err);
    }
  },

  // Load Shopping List state from Cloud Firestore
  async loadShoppingList(userId: string): Promise<{ items: AggregatedShoppingItem[]; checkedIds: string[] } | null> {
    try {
      const listRef = doc(cloudDb, 'users', userId, 'shopping_lists', 'current');
      const snapshot = await getDoc(listRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        return {
          items: data.items || [],
          checkedIds: data.checkedIds || []
        };
      }
    } catch (err) {
      console.warn('Eroare încărcare listă cumpărături:', err);
    }
    return null;
  }
};
