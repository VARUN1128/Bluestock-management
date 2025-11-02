import axios from 'axios';
import type { LoginCredentials, RegisterData, AuthResponse } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock API functions for now - replace with real API calls later
export const authService = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      // Mock response - replace with actual API call
      const response = await authAPI.post('/login', credentials);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Register user
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      // Mock response - replace with actual API call
      const response = await authAPI.post('/register', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // Verify email
  verifyEmail: async (token: string): Promise<AuthResponse> => {
    try {
      const response = await authAPI.get(`/verify-email?token=${token}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Email verification failed');
    }
  },

  // Verify mobile OTP
  verifyMobile: async (otp: string, mobileNo: string): Promise<AuthResponse> => {
    try {
      const response = await authAPI.post('/verify-mobile', { otp, mobile_no: mobileNo });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Mobile verification failed');
    }
  },

  // Resend OTP
  resendOTP: async (mobileNo: string): Promise<AuthResponse> => {
    try {
      const response = await authAPI.post('/resend-otp', { mobile_no: mobileNo });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to resend OTP');
    }
  },
};

export default authService;
