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

// User types
export interface User {
  id: string | number;
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
