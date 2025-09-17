// User types
export interface User {
  id: number;
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

// Company Profile types
export interface CompanyProfile {
  id: number;
  owner_id: number;
  company_name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  website?: string;
  logo_url?: string;
  banner_url?: string;
  industry: string;
  founded_date?: string;
  description?: string;
  social_links?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  gender: 'm' | 'f' | 'o';
  mobile_no: string;
  signup_type: 'e';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user_id?: number;
    token?: string;
    user?: User;
  };
}

// Form step types for multi-step registration
export interface FormStepData {
  step: number;
  title: string;
  description?: string;
  fields: FormField[];
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'file' | 'phone' | 'date';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Image upload types
export interface ImageUploadResponse {
  success: boolean;
  url: string;
  public_id: string;
}

// Social media links type
export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  website?: string;
}
