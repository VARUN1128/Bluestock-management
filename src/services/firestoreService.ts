import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface UserData {
  id?: string;
  email: string;
  full_name: string;
  signup_type: string;
  gender?: string;
  mobile_no?: string;
  is_mobile_verified: boolean;
  is_email_verified: boolean;
  created_at?: any;
  updated_at?: any;
}

export interface CompanyProfile {
  id?: string;
  owner_id: string;
  company_name: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  website?: string;
  logo_url?: string;
  banner_url?: string;
  industry?: string;
  founded_date?: string;
  description?: string;
  social_links?: Record<string, string>;
  created_at?: any;
  updated_at?: any;
}

// Users Collection
export const createUser = async (userData: Omit<UserData, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      ...userData,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
};

export const getUserById = async (userId: string) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, user: { id: docSnap.id, ...docSnap.data() } as UserData };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error getting user:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { success: true, user: { id: doc.id, ...doc.data() } as UserData };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error getting user by email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
};

export const updateUser = async (userId: string, updates: Partial<UserData>) => {
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      ...updates,
      updated_at: new Date(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
};

// Company Profiles Collection
export const createCompanyProfile = async (companyData: Omit<CompanyProfile, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const docRef = await addDoc(collection(db, 'company_profiles'), {
      ...companyData,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating company profile:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
};

export const getCompanyProfileByOwner = async (ownerId: string) => {
  try {
    const q = query(collection(db, 'company_profiles'), where('owner_id', '==', ownerId));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { success: true, company: { id: doc.id, ...doc.data() } as CompanyProfile };
    } else {
      return { success: false, error: 'Company profile not found' };
    }
  } catch (error) {
    console.error('Error getting company profile:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
};

export const getAllCompanies = async () => {
  try {
    const q = query(collection(db, 'company_profiles'), orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const companies = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as CompanyProfile[];
    
    return { success: true, companies };
  } catch (error) {
    console.error('Error getting all companies:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
};

export const updateCompanyProfile = async (companyId: string, updates: Partial<CompanyProfile>) => {
  try {
    const docRef = doc(db, 'company_profiles', companyId);
    await updateDoc(docRef, {
      ...updates,
      updated_at: new Date(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating company profile:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
};

export const deleteCompanyProfile = async (companyId: string) => {
  try {
    const docRef = doc(db, 'company_profiles', companyId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting company profile:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
};
