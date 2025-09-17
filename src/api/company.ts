import axios from 'axios';
import type { CompanyProfile, ImageUploadResponse } from '../types/company.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with auth token
const createCompanyAPI = (token: string) => {
  return axios.create({
    baseURL: `${API_BASE_URL}/company`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Mock API functions for now - replace with real API calls later
export const companyService = {
  // Get company profile
  getProfile: async (token: string): Promise<CompanyProfile> => {
    try {
      const api = createCompanyAPI(token);
      const response = await api.get('/profile');
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profile');
    }
  },

  // Create/Update company profile
  updateProfile: async (token: string, profileData: Partial<CompanyProfile>): Promise<CompanyProfile> => {
    try {
      const api = createCompanyAPI(token);
      const response = await api.put('/profile', profileData);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },

  // Upload company logo
  uploadLogo: async (token: string, file: File): Promise<ImageUploadResponse> => {
    try {
      const formData = new FormData();
      formData.append('logo', file);
      
      const api = createCompanyAPI(token);
      const response = await api.post('/upload-logo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to upload logo');
    }
  },

  // Upload company banner
  uploadBanner: async (token: string, file: File): Promise<ImageUploadResponse> => {
    try {
      const formData = new FormData();
      formData.append('banner', file);
      
      const api = createCompanyAPI(token);
      const response = await api.post('/upload-banner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to upload banner');
    }
  },
};

export default companyService;
