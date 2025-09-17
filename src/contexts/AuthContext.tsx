import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { supabaseAuth } from '../services/supabaseAuth';
import { loginSuccess, logout } from '../store/slices/authSlice';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const session = await supabaseAuth.getCurrentSession();
        if (session?.user) {
          setUser(session.user);
          const appUser = supabaseAuth.convertToAppUser(session.user);
          dispatch(loginSuccess({ user: appUser, token: session.access_token }));
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabaseAuth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          const appUser = supabaseAuth.convertToAppUser(session.user);
          dispatch(loginSuccess({ user: appUser, token: session.access_token }));
        } else {
          setUser(null);
          dispatch(logout());
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  const value = {
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
