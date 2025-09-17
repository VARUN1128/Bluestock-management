import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CompanyProfile } from '../../types/company.js';

interface CompanyState {
  profile: CompanyProfile | null;
  isLoading: boolean;
  error: string | null;
  isUpdating: boolean;
}

const initialState: CompanyState = {
  profile: null,
  isLoading: false,
  error: null,
  isUpdating: false,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    fetchProfileStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action: PayloadAction<CompanyProfile>) => {
      state.isLoading = false;
      state.profile = action.payload;
      state.error = null;
    },
    fetchProfileFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateProfileStart: (state) => {
      state.isUpdating = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action: PayloadAction<CompanyProfile>) => {
      state.isUpdating = false;
      state.profile = action.payload;
      state.error = null;
    },
    updateProfileFailure: (state, action: PayloadAction<string>) => {
      state.isUpdating = false;
      state.error = action.payload;
    },
    uploadImageStart: (state) => {
      state.isUpdating = true;
      state.error = null;
    },
    uploadImageSuccess: (state, action: PayloadAction<{ type: 'logo' | 'banner'; url: string }>) => {
      state.isUpdating = false;
      if (state.profile) {
        if (action.payload.type === 'logo') {
          state.profile.logo_url = action.payload.url;
        } else {
          state.profile.banner_url = action.payload.url;
        }
      }
      state.error = null;
    },
    uploadImageFailure: (state, action: PayloadAction<string>) => {
      state.isUpdating = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  uploadImageStart,
  uploadImageSuccess,
  uploadImageFailure,
  clearError,
} = companySlice.actions;

export default companySlice.reducer;
