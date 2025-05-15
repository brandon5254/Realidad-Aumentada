import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { UserProfile, UserRole } from '../types/user';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUserProfile = async (user: User) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        const profile = data as UserProfile;
        
        if (profile && profile.role && profile.role.type) {
          setUserProfile(profile);
          setIsAdmin(profile.role.type === 'admin');
        } else {
          const updatedProfile: UserProfile = {
            ...profile,
            role: {
              type: 'client',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          };
          setUserProfile(updatedProfile);
          setIsAdmin(false);
          await setDoc(doc(db, 'users', user.uid), updatedProfile);
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user);
      } else {
        setUserProfile(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const createUserProfile = async (user: User, displayName: string) => {
    const userRole: UserRole = {
      type: 'client',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const profile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName,
      role: userRole,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      wishlist: [],
      ...(user.photoURL ? { photoURL: user.photoURL } : {})
    };

    await setDoc(doc(db, 'users', user.uid), profile);
    return profile;
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const profile = await createUserProfile(userCredential.user, name);
      setUserProfile(profile);
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        const profile = await createUserProfile(user, user.displayName || 'Usuario');
        setUserProfile(profile);
      } else {
        setUserProfile(userDoc.data() as UserProfile);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
      setIsAdmin(false);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    login,
    loginWithGoogle,
    register,
    logout,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
