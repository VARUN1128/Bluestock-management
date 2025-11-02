# BlueStock Technical Documentation

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Authentication System](#authentication-system)
3. [Company Profile Management](#company-profile-management)
4. [Job Management System](#job-management-system)
5. [Image Upload & Cloudinary Integration](#image-upload--cloudinary-integration)
6. [Multi-Step Form System](#multi-step-form-system)
7. [State Management Architecture](#state-management-architecture)
8. [API Integration Patterns](#api-integration-patterns)
9. [Database Schema](#database-schema)
10. [Component Architecture](#component-architecture)
11. [Routing & Navigation](#routing--navigation)
12. [Error Handling & Validation](#error-handling--validation)
13. [Performance Optimizations](#performance-optimizations)
14. [Security Implementation](#security-implementation)
15. [Development Workflow](#development-workflow)

---

## System Architecture

### Overview
BlueStock is a modern React-based job platform built with a microservices-oriented frontend architecture. The application follows a component-based design pattern with clear separation of concerns.

### Technology Stack
- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7.1.2
- **UI Library**: Material-UI (MUI) 7.3.2
- **State Management**: Redux Toolkit + React Query
- **Authentication**: Firebase Auth + Supabase Auth
- **Database**: PostgreSQL + Firestore
- **Image Storage**: Cloudinary
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Routing**: React Router DOM

### Architecture Patterns
- **Component-Based Architecture**: Modular, reusable UI components
- **Container/Presentational Pattern**: Separation of logic and presentation
- **Service Layer Pattern**: Centralized business logic
- **Repository Pattern**: Data access abstraction
- **Observer Pattern**: State management with Redux

---

## Authentication System

### Authentication Flow

#### 1. User Registration
```typescript
// Registration Process
interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  gender: 'm' | 'f' | 'o';
  mobile_no: string;
  signup_type: 'email' | 'phone';
}
```

**Flow:**
1. User submits registration form
2. Data validation using React Hook Form
3. Supabase Auth signup with metadata
4. Email verification sent automatically
5. User redirected to OTP verification page
6. Upon verification, user profile created in PostgreSQL

#### 2. User Login
```typescript
// Login Process
interface LoginCredentials {
  email: string;
  password: string;
}
```

**Flow:**
1. User submits login credentials
2. Supabase Auth password authentication
3. JWT token received and stored in localStorage
4. User data fetched and stored in Redux store
5. Protected routes become accessible

#### 3. Authentication State Management

**Redux Auth Slice:**
```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

**Key Actions:**
- `loginStart` - Initiates login process
- `loginSuccess` - Handles successful authentication
- `loginFailure` - Handles authentication errors
- `logout` - Clears user session
- `updateUser` - Updates user profile data

#### 4. Protected Routes
```typescript
// Route Protection Implementation
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
  
  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  return <>{children}</>;
};
```

### Authentication Services

#### Supabase Auth Service
- **Sign Up**: `supabaseAuth.signUp(userData)`
- **Sign In**: `supabaseAuth.signIn(credentials)`
- **Sign Out**: `supabaseAuth.signOut()`
- **Session Management**: `supabaseAuth.getCurrentSession()`
- **User Conversion**: `supabaseAuth.convertToAppUser(user)`

#### Firebase Auth Service (Alternative)
- Email/password authentication
- Phone number authentication
- Social login integration ready

---

## Company Profile Management

### Company Profile Data Structure

```typescript
interface CompanyProfile {
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
```

### Company Profile Management Flow

#### 1. Profile Creation (Multi-Step Process)
1. **Company Information Step**
   - Company name, description
   - Logo and banner upload
   - Industry selection

2. **Founding Information Step**
   - Organization type
   - Team size
   - Founding date
   - Company stage

3. **Social Media Step**
   - LinkedIn profile
   - Twitter handle
   - Facebook page
   - Instagram account

4. **Contact Information Step**
   - Physical address
   - Phone number
   - Website URL
   - Contact email

#### 2. Profile Update Process
```typescript
// Profile Update Service
const updateProfile = async (token: string, profileData: Partial<CompanyProfile>) => {
  const api = createCompanyAPI(token);
  const response = await api.put('/profile', profileData);
  return response.data.data;
};
```

#### 3. Image Upload Management
- **Logo Upload**: Square aspect ratio, optimized for small displays
- **Banner Upload**: Wide aspect ratio, optimized for headers
- **Cloudinary Integration**: Automatic optimization and CDN delivery

### Company State Management

**Redux Company Slice:**
```typescript
interface CompanyState {
  profile: CompanyProfile | null;
  isLoading: boolean;
  error: string | null;
  isUpdating: boolean;
}
```

**Key Actions:**
- `fetchProfileStart/Success/Failure` - Profile fetching
- `updateProfileStart/Success/Failure` - Profile updates
- `uploadImageStart/Success/Failure` - Image uploads

---

## Job Management System

### Job Data Structure

```typescript
interface JobPosting {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary: string;
  posted: string;
  applications: number;
  status: 'active' | 'paused' | 'closed';
  description: string;
  requirements: string[];
  benefits: string[];
  application_deadline?: string;
}
```

### Job Management Features

#### 1. Job Creation
- **Form Validation**: Comprehensive validation using React Hook Form
- **Rich Text Editor**: Job description and requirements
- **Location Services**: Address autocomplete
- **Salary Range**: Min/max salary configuration
- **Job Categories**: Industry-specific categorization

#### 2. Job Listing Management
- **Status Management**: Active, paused, closed states
- **Bulk Operations**: Multiple job management
- **Search & Filter**: Advanced filtering capabilities
- **Analytics**: Application tracking and metrics

#### 3. Application Tracking
```typescript
interface Application {
  id: number;
  candidate: string;
  job_title: string;
  applied_date: string;
  status: 'pending' | 'reviewed' | 'interviewed' | 'hired' | 'rejected';
  resume_url: string;
  cover_letter?: string;
}
```

### Job Management Services

#### Dashboard Service
```typescript
interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  hiredCandidates: number;
}
```

**Key Functions:**
- `getDashboardStats()` - Overall platform statistics
- `getRecentJobs()` - Recent job postings
- `getApplications()` - Application tracking
- `getJobAnalytics()` - Performance metrics

---

## Image Upload & Cloudinary Integration

### Cloudinary Configuration

```typescript
const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
  apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
};
```

### Image Upload Process

#### 1. Upload Function
```typescript
const uploadImageToCloudinary = async (file: File, folder: string = 'bluestock'): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryConfig.uploadPreset);
  formData.append('folder', folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
    { method: 'POST', body: formData }
  );

  const data = await response.json();
  return data.secure_url;
};
```

#### 2. Image Uploader Component

**Features:**
- **Drag & Drop**: Intuitive file selection
- **Preview**: Real-time image preview
- **Validation**: File type and size validation
- **Progress**: Upload progress indication
- **Error Handling**: Comprehensive error management

**Props Interface:**
```typescript
interface ImageUploaderProps {
  onFileSelect?: (file: File) => void;
  onImageUpload?: (imageUrl: string) => void;
  onFileRemove?: () => void;
  currentImageUrl?: string;
  title: string;
  description: string;
  dimensions: string;
  maxSize: string;
  supportedFormats: string;
  aspectRatio?: string;
  isLoading?: boolean;
  autoUpload?: boolean;
  folder?: string;
}
```

#### 3. Image Optimization
- **Automatic Resizing**: Based on use case
- **Format Conversion**: WebP for better performance
- **Quality Optimization**: Balanced quality/size
- **CDN Delivery**: Global content delivery

---

## Multi-Step Form System

### FormStep Component Architecture

```typescript
interface FormStepProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onFinish?: () => void;
  children: React.ReactNode;
  stepTitle: string;
  stepDescription?: string;
  isLastStep?: boolean;
  isFirstStep?: boolean;
  canProceed?: boolean;
  isLoading?: boolean;
}
```

### Step Management System

#### 1. Step Navigation
- **Progress Indicator**: Visual progress bar
- **Step Labels**: Clear step identification
- **Navigation Controls**: Previous/Next/Finish buttons
- **Validation**: Step-by-step validation

#### 2. Step Components

**Company Info Step:**
- Company name and description
- Logo and banner upload
- Industry selection

**Founding Info Step:**
- Organization type
- Team size
- Founding date
- Company stage

**Social Media Step:**
- Social media profile links
- URL validation
- Platform-specific formatting

**Contact Step:**
- Physical address
- Contact information
- Website validation

#### 3. Form State Management
- **Local State**: Current step and form data
- **Validation**: Real-time form validation
- **Persistence**: Form data preservation
- **Error Handling**: Step-specific error management

### Form Validation System

#### React Hook Form Integration
```typescript
const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

// Validation rules
const validationRules = {
  company_name: { required: 'Company name is required' },
  email: { 
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address'
    }
  }
};
```

---

## State Management Architecture

### Redux Store Structure

```typescript
interface RootState {
  auth: AuthState;
  company: CompanyState;
}
```

### Redux Toolkit Implementation

#### 1. Auth Slice
```typescript
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    // ... other reducers
  }
});
```

#### 2. Company Slice
```typescript
const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    fetchProfileStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.profile = action.payload;
      state.isUpdating = false;
    },
    // ... other reducers
  }
});
```

### React Query Integration

#### Server State Management
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

#### Query Hooks
```typescript
// Dashboard data fetching
const { data: dashboardStats, isLoading } = useQuery({
  queryKey: ['dashboardStats'],
  queryFn: dashboardService.getDashboardStats,
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

---

## API Integration Patterns

### API Service Architecture

#### 1. Base API Configuration
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

#### 2. Authenticated API Calls
```typescript
const createCompanyAPI = (token: string) => {
  return axios.create({
    baseURL: `${API_BASE_URL}/company`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
};
```

### Service Layer Pattern

#### Authentication Service
```typescript
export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await authAPI.post('/login', credentials);
    return response.data;
  },
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await authAPI.post('/register', userData);
    return response.data;
  },
  // ... other methods
};
```

#### Company Service
```typescript
export const companyService = {
  getProfile: async (token: string): Promise<CompanyProfile> => {
    const api = createCompanyAPI(token);
    const response = await api.get('/profile');
    return response.data.data;
  },
  updateProfile: async (token: string, profileData: Partial<CompanyProfile>) => {
    const api = createCompanyAPI(token);
    const response = await api.put('/profile', profileData);
    return response.data.data;
  },
  // ... other methods
};
```

### Error Handling

#### API Error Interceptor
```typescript
authAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      dispatch(logout());
      navigate('/login');
    }
    return Promise.reject(error);
  }
);
```

---

## Database Schema

### PostgreSQL Schema

#### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    signup_type VARCHAR(50) DEFAULT 'email',
    gender VARCHAR(10),
    mobile_no VARCHAR(20),
    is_mobile_verified BOOLEAN DEFAULT FALSE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Company Profile Table
```sql
CREATE TABLE company_profile (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    website VARCHAR(255),
    logo_url TEXT,
    banner_url TEXT,
    industry VARCHAR(100),
    founded_date DATE,
    description TEXT,
    social_links JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Database Indexes
```sql
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_mobile ON users(mobile_no);
CREATE INDEX idx_company_owner ON company_profile(owner_id);
CREATE INDEX idx_company_name ON company_profile(company_name);
```

### Firestore Integration
- **Real-time Updates**: Live data synchronization
- **Offline Support**: Local data persistence
- **Scalability**: Automatic scaling

---

## Component Architecture

### Component Hierarchy

```
App
├── AuthProvider
├── Router
│   ├── Public Routes
│   │   ├── Login
│   │   ├── Register
│   │   └── OTPVerification
│   └── Protected Routes
│       ├── Home
│       ├── Dashboard
│       ├── CompanySetup
│       ├── Profile
│       ├── PostJob
│       ├── MyJobs
│       ├── FindCandidates
│       ├── Applications
│       └── Settings
└── ToastContainer
```

### Reusable Components

#### 1. FormStep Component
- **Purpose**: Multi-step form wrapper
- **Features**: Progress indicator, navigation controls
- **Props**: Step management, validation, loading states

#### 2. ImageUploader Component
- **Purpose**: File upload with Cloudinary integration
- **Features**: Drag & drop, preview, validation
- **Props**: Upload configuration, callbacks

#### 3. ProfileCard Component
- **Purpose**: User/company profile display
- **Features**: Responsive design, action buttons
- **Props**: Profile data, edit capabilities

#### 4. ResponsiveLayout Component
- **Purpose**: Consistent page layout
- **Features**: Mobile-first design, navigation
- **Props**: Title, subtitle, children

### Component Patterns

#### 1. Container/Presentational Pattern
```typescript
// Container Component
const DashboardContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);
  
  return <DashboardPresentation user={user} />;
};

// Presentational Component
const DashboardPresentation = ({ user }: { user: User }) => {
  return <div>{/* UI rendering */}</div>;
};
```

#### 2. Custom Hooks Pattern
```typescript
const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const login = useCallback((credentials: LoginCredentials) => {
    dispatch(loginStart());
    // Login logic
  }, [dispatch]);
  
  return { user, isAuthenticated, login };
};
```

---

## Routing & Navigation

### Route Configuration

```typescript
const routes = [
  // Public Routes
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/otp-verification', component: OTPVerification },
  
  // Protected Routes
  { path: '/home', component: Home, protected: true },
  { path: '/dashboard', component: Dashboard, protected: true },
  { path: '/company-setup', component: CompanySetup, protected: true },
  { path: '/profile', component: Profile, protected: true },
  { path: '/post-job', component: PostJob, protected: true },
  { path: '/my-jobs', component: MyJobs, protected: true },
  { path: '/find-candidates', component: FindCandidates, protected: true },
  { path: '/applications', component: Applications, protected: true },
  { path: '/settings', component: Settings, protected: true },
];
```

### Navigation Guards

#### Authentication Guard
```typescript
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
  
  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  return <>{children}</>;
};
```

#### Route-based Redirects
```typescript
// Default route redirect
<Route path="/" element={<Navigate to="/home" replace />} />

// Conditional redirects based on user state
{!user?.is_email_verified && <Navigate to="/otp-verification" replace />}
```

---

## Error Handling & Validation

### Form Validation

#### React Hook Form Integration
```typescript
const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: yupResolver(validationSchema),
  mode: 'onChange'
});

// Validation schema
const validationSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});
```

#### Custom Validation Rules
```typescript
const validateFileSize = (file: File, maxSize: number) => {
  if (file.size > maxSize) {
    return 'File size exceeds maximum allowed size';
  }
  return true;
};

const validateImageFormat = (file: File, allowedFormats: string[]) => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  if (!fileExtension || !allowedFormats.includes(fileExtension)) {
    return 'Invalid file format';
  }
  return true;
};
```

### Error Boundary Implementation

```typescript
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
```

### Global Error Handling

#### Toast Notifications
```typescript
// Success notifications
toast.success('Operation completed successfully!');

// Error notifications
toast.error('An error occurred. Please try again.');

// Info notifications
toast.info('Please check your email for verification.');
```

#### API Error Handling
```typescript
const handleApiError = (error: any) => {
  if (error.response?.status === 401) {
    dispatch(logout());
    navigate('/login');
  } else if (error.response?.status === 403) {
    toast.error('You do not have permission to perform this action');
  } else {
    toast.error(error.response?.data?.message || 'An unexpected error occurred');
  }
};
```

---

## Performance Optimizations

### Code Splitting

#### Lazy Loading
```typescript
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const PostJob = lazy(() => import('./pages/PostJob'));

// Usage with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Dashboard />
</Suspense>
```

#### Route-based Code Splitting
```typescript
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={
        <Suspense fallback={<LoadingSpinner />}>
          <Dashboard />
        </Suspense>
      } />
    </Routes>
  );
};
```

### Image Optimization

#### Cloudinary Integration
- **Automatic Format Selection**: WebP for supported browsers
- **Responsive Images**: Multiple sizes for different devices
- **Lazy Loading**: Images load as they enter viewport
- **Quality Optimization**: Balanced quality and file size

#### Image Component
```typescript
const OptimizedImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <Box position="relative">
      {!isLoaded && <Skeleton variant="rectangular" {...props} />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        style={{ display: isLoaded ? 'block' : 'none' }}
        {...props}
      />
    </Box>
  );
};
```

### State Management Optimization

#### Memoization
```typescript
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: complexProcessing(item)
    }));
  }, [data]);

  return <div>{/* Render processed data */}</div>;
});
```

#### Selector Optimization
```typescript
const selectUser = (state: RootState) => state.auth.user;
const selectCompanyProfile = (state: RootState) => state.company.profile;

// Memoized selectors
const user = useSelector(selectUser);
const companyProfile = useSelector(selectCompanyProfile);
```

### Bundle Optimization

#### Vite Configuration
```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@mui/icons-material'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
        }
      }
    }
  }
});
```

---

## Security Implementation

### Authentication Security

#### JWT Token Management
```typescript
// Token storage
const storeToken = (token: string) => {
  localStorage.setItem('token', token);
};

// Token validation
const validateToken = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token);
    return decoded && decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};
```

#### Password Security
- **Minimum Requirements**: 8+ characters, mixed case, numbers
- **Client-side Validation**: Real-time password strength indicator
- **Server-side Hashing**: bcrypt or similar hashing algorithm

### Input Validation & Sanitization

#### XSS Prevention
```typescript
const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};
```

#### CSRF Protection
```typescript
// CSRF token in API requests
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-CSRF-Token': getCsrfToken(),
  }
});
```

### Environment Security

#### Environment Variables
```typescript
// Secure environment variable access
const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  cloudinaryCloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  // Never expose secrets in client-side code
};
```

#### API Security
- **HTTPS Only**: All API communications over HTTPS
- **CORS Configuration**: Proper cross-origin resource sharing
- **Rate Limiting**: API rate limiting implementation
- **Input Validation**: Server-side input validation

---

## Development Workflow

### Code Organization

#### File Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # Business logic services
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
├── config/             # Configuration files
├── contexts/           # React contexts
├── api/                # API service functions
└── utils/              # Utility functions
```

#### Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Hooks**: camelCase starting with 'use' (e.g., `useAuth.ts`)
- **Services**: camelCase (e.g., `authService.ts`)
- **Types**: PascalCase (e.g., `User.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### Development Tools

#### ESLint Configuration
```javascript
export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  }
];
```

#### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  }
}
```

### Testing Strategy

#### Unit Testing
```typescript
// Component testing with React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import Login from '../pages/Login';

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

test('renders login form', () => {
  renderWithProvider(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});
```

#### Integration Testing
```typescript
// API integration testing
test('login flow integration', async () => {
  const mockUser = { id: 1, email: 'test@example.com' };
  const mockResponse = { data: { user: mockUser, token: 'mock-token' } };
  
  jest.spyOn(authService, 'login').mockResolvedValue(mockResponse);
  
  renderWithProvider(<Login />);
  
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@example.com' }
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password123' }
  });
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  await waitFor(() => {
    expect(authService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });
});
```

### Deployment Pipeline

#### Build Process
```bash
# Development build
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

#### Environment Configuration
```bash
# Development
NODE_ENV=development
VITE_API_URL=http://localhost:5000/api

# Production
NODE_ENV=production
VITE_API_URL=https://api.bluestock.com/api
```

---

## Conclusion

This technical documentation provides a comprehensive overview of the BlueStock application's architecture, functionality, and implementation details. The system is designed with scalability, maintainability, and user experience in mind, following modern React development best practices.

### Key Strengths
- **Modular Architecture**: Clear separation of concerns
- **Type Safety**: Comprehensive TypeScript implementation
- **Performance**: Optimized for speed and efficiency
- **Security**: Robust authentication and data protection
- **Scalability**: Designed for growth and expansion
- **Maintainability**: Clean, well-documented code

### Future Enhancements
- **Real-time Features**: WebSocket integration for live updates
- **Advanced Analytics**: Detailed performance metrics
- **Mobile App**: React Native implementation
- **AI Integration**: Smart candidate matching
- **Internationalization**: Multi-language support

For questions or clarifications regarding this documentation, please contact the development team.
