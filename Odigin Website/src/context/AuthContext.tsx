import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { CartItem } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: () => Promise<void>;
  logOut: () => Promise<void>;
  cart: CartItem[];
  setCart: (items: CartItem[]) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Upsert user profile
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          updatedAt: new Date().toISOString(),
        }, { merge: true });

        // Subscribe to remote cart
        const cartRef = doc(db, 'carts', user.uid);
        const unsubscribeCart = onSnapshot(cartRef, (doc) => {
          if (doc.exists()) {
            setCartItems(doc.data().items || []);
          }
        });
        return () => unsubscribeCart();
      } else {
        setCartItems([]);
      }
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const setCart = async (items: CartItem[]) => {
    setCartItems(items);
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      await setDoc(cartRef, {
        userId: user.uid,
        items,
        updatedAt: new Date().toISOString()
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, logOut, cart, setCart }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
