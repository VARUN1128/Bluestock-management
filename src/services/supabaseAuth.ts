import { createClient } from '@supabase/supabase-js';
import type { User } from '@supabase/supabase-js';
import type { RegisterData, LoginCredentials } from '../types/auth';

// Supabase configuration
const supabaseUrl = 'https://dyoptxxcabypmvnovawc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5b3B0eHhjYWJ5cG12bm92YXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMDYzNjAsImV4cCI6MjA3MzU4MjM2MH0.pjnxDHyIhSg4EoHKciSTHY-PVS_BxJ6gHftsFHidp0c';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  signup_type: 'e';
  gender: 'm' | 'f' | 'o';
  mobile_no: string;
  is_mobile_verified: boolean;
  is_email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export const supabaseAuth = {
  // Sign up with email and password
  signUp: async (userData: RegisterData) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.full_name,
            gender: userData.gender,
            mobile_no: userData.mobile_no,
            signup_type: userData.signup_type,
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw new Error(error.message || 'Failed to create account');
    }
  },

  // Sign in with email and password
  signIn: async (credentials: LoginCredentials) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(error.message || 'Failed to sign in');
    }
  },

  // Sign out
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error(error.message || 'Failed to sign out');
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error: any) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  // Get current session
  getCurrentSession: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    } catch (error: any) {
      console.error('Get current session error:', error);
      return null;
    }
  },

  // Listen to auth state changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback);
  },

  // Update user profile
  updateProfile: async (updates: {
    full_name?: string;
    gender?: string;
    mobile_no?: string;
  }) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  },

  // Convert Supabase user to app user format
  convertToAppUser: (supabaseUser: User): AuthUser => {
    const userData = supabaseUser.user_metadata || {};
    
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      full_name: userData.full_name || '',
      signup_type: userData.signup_type || 'e',
      gender: userData.gender || 'm',
      mobile_no: userData.mobile_no || '',
      is_mobile_verified: userData.is_mobile_verified || false,
      is_email_verified: userData.is_email_verified || false,
      created_at: supabaseUser.created_at || new Date().toISOString(),
      updated_at: supabaseUser.updated_at || new Date().toISOString(),
    };
  },

  // Send OTP for mobile verification
  sendOTP: async (phone: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: phone,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error: any) {
      console.error('Send OTP error:', error);
      throw new Error(error.message || 'Failed to send OTP');
    }
  },

  // Verify OTP
  verifyOTP: async (phone: string, token: string) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: phone,
        token: token,
        type: 'sms'
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error: any) {
      console.error('Verify OTP error:', error);
      throw new Error(error.message || 'Failed to verify OTP');
    }
  }
};

export default supabaseAuth;
