import { createClient } from '@supabase/supabase-js';
import type { RegisterData, User } from '../types/auth';

// Supabase configuration
const supabaseUrl = 'https://dyoptxxcabypmvnovawc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5b3B0eHhjYWJ5cG12bm92YXdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMDYzNjAsImV4cCI6MjA3MzU4MjM2MH0.pjnxDHyIhSg4EoHKciSTHY-PVS_BxJ6gHftsFHidp0c';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export interface SupabaseUser {
  id: number;
  email: string;
  password: string;
  full_name: string;
  signup_type: string;
  gender: string;
  mobile_no: string;
  is_mobile_verified: boolean;
  is_email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export const supabaseService = {
  // Create a new user in the users table
  createUser: async (userData: RegisterData): Promise<SupabaseUser> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            email: userData.email,
            password: userData.password, // Note: In production, this should be hashed
            full_name: userData.full_name,
            signup_type: userData.signup_type,
            gender: userData.gender,
            mobile_no: userData.mobile_no,
            is_mobile_verified: false,
            is_email_verified: false,
          }
        ])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error: any) {
      console.error('Error creating user:', error);
      throw new Error(error.message || 'Failed to create user');
    }
  },

  // Get user by email
  getUserByEmail: async (email: string): Promise<SupabaseUser | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // User not found
        }
        throw new Error(error.message);
      }

      return data;
    } catch (error: any) {
      console.error('Error getting user:', error);
      throw new Error(error.message || 'Failed to get user');
    }
  },

  // Update user verification status
  updateUserVerification: async (userId: number, updates: {
    is_mobile_verified?: boolean;
    is_email_verified?: boolean;
  }): Promise<SupabaseUser> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error: any) {
      console.error('Error updating user verification:', error);
      throw new Error(error.message || 'Failed to update user verification');
    }
  },

  // Get user by ID
  getUserById: async (userId: number): Promise<SupabaseUser | null> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // User not found
        }
        throw new Error(error.message);
      }

      return data;
    } catch (error: any) {
      console.error('Error getting user by ID:', error);
      throw new Error(error.message || 'Failed to get user');
    }
  },

  // Convert Supabase user to app user format
  convertToAppUser: (supabaseUser: SupabaseUser): User => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email,
      full_name: supabaseUser.full_name,
      signup_type: supabaseUser.signup_type as 'e',
      gender: supabaseUser.gender as 'm' | 'f' | 'o',
      mobile_no: supabaseUser.mobile_no,
      is_mobile_verified: supabaseUser.is_mobile_verified,
      is_email_verified: supabaseUser.is_email_verified,
      created_at: supabaseUser.created_at,
      updated_at: supabaseUser.updated_at,
    };
  }
};

export default supabaseService;
