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
