# BlueStock - Job Platform & Company Management

A comprehensive React application for job posting, candidate management, and company profile management, built with React 19, Vite, and Material-UI.

## Features

### Core Platform Features
- **Job Management**: Post, manage, and track job listings
- **Candidate Discovery**: Find and save qualified candidates
- **Application Tracking**: Monitor job applications and candidate responses
- **Company Profiles**: Complete company setup with branding and information
- **User Authentication**: Secure login with Firebase and OTP verification
- **Billing Management**: Track subscription and payment information

### User Experience
- **Multi-step Registration**: Complete company registration with logo/banner upload
- **Responsive Design**: Optimized for all device sizes with mobile-first approach
- **Real-time Updates**: Live notifications and status updates
- **Intuitive Dashboard**: Comprehensive overview of all platform activities
- **Advanced Search**: Find candidates and companies with powerful filtering

### Technical Features
- **Image Upload**: Drag-and-drop image upload with Cloudinary integration
- **Form Validation**: Comprehensive form validation using react-hook-form
- **State Management**: Redux Toolkit for efficient state management
- **API Integration**: RESTful API integration with error handling
- **Database Integration**: PostgreSQL for data persistence

## Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Material-UI (MUI)** - Comprehensive UI component library

### State Management & Data
- **Redux Toolkit** - Predictable state management
- **React Query (TanStack)** - Server state management and caching
- **React Hook Form** - Performant form handling
- **Axios** - HTTP client for API requests

### Authentication & Storage
- **Firebase** - Authentication and user management
- **Cloudinary** - Image and media storage
- **PostgreSQL** - Primary database

### UI/UX
- **React Router DOM** - Client-side routing
- **React Responsive** - Responsive design utilities
- **React Toastify** - Toast notifications
- **SweetAlert2** - Beautiful alert dialogs
- **Recharts** - Data visualization

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting
- **Vite** - Development server and build tool

## Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── FormStep.tsx        # Multi-step form wrapper
│   ├── ProfileCard.tsx     # User/company profile display
│   ├── ImageUploader.tsx   # Drag-and-drop image upload
│   ├── ProtectedRoute.tsx  # Route protection wrapper
│   ├── ResponsiveLayout.tsx # Responsive layout component
│   └── *Step.tsx           # Individual form steps
├── pages/                  # Page components
│   ├── Login.tsx           # User login
│   ├── Register.tsx        # User registration
│   ├── OTPVerification.tsx # Phone/email verification
│   ├── CompanySetup.tsx    # Company profile setup
│   ├── Dashboard.tsx       # Main dashboard
│   ├── Home.tsx            # Landing/home page
│   ├── Profile.tsx         # User profile management
│   ├── Settings.tsx        # Application settings
│   ├── PostJob.tsx         # Job posting interface
│   ├── MyJobs.tsx          # Job management
│   ├── FindCandidates.tsx  # Candidate discovery
│   ├── SavedCandidates.tsx # Saved candidates
│   ├── Applications.tsx    # Application tracking
│   ├── AllCompanies.tsx    # Company directory
│   ├── Billing.tsx         # Billing management
│   └── Success.tsx         # Success pages
├── services/               # Business logic services
│   ├── authService.ts      # Authentication services
│   ├── companyService.ts   # Company management
│   ├── dashboardService.ts # Dashboard data
│   ├── firestoreService.ts # Firestore operations
│   ├── supabaseAuth.ts     # Supabase authentication
│   └── supabaseService.ts  # Supabase operations
├── store/                  # Redux state management
│   ├── index.ts            # Store configuration
│   └── slices/             # Redux slices
│       ├── authSlice.ts    # Authentication state
│       └── companySlice.ts # Company state
├── contexts/               # React contexts
│   └── AuthContext.tsx     # Authentication context
├── config/                 # Configuration files
│   ├── cloudinary.ts       # Cloudinary setup
│   ├── database.ts         # Database configuration
│   ├── firebase.ts         # Firebase configuration
│   └── supabase.ts         # Supabase configuration
├── types/                  # TypeScript definitions
│   ├── auth.ts             # Authentication types
│   ├── company.ts          # Company types
│   └── index.ts            # Shared types
├── api/                    # API layer
│   ├── auth.ts             # Authentication API
│   └── company.ts          # Company API
└── database/               # Database files
    └── company_db.sql      # Database schema
```

## Getting Started

### Prerequisites

- **Node.js 18+** - JavaScript runtime
- **npm or yarn** - Package manager
- **PostgreSQL 12+** - Database server
- **Firebase Account** - Authentication and user management
- **Cloudinary Account** - Image storage and management

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/VARUN1128/Bluestock-management.git
   cd bluestock
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp env.example .env
   ```
   
   Update `.env` with your credentials:
   - Firebase configuration
   - Cloudinary credentials
   - PostgreSQL database settings

4. **Database Setup**
   ```bash
   npm run setup-db
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

### Detailed Setup

For comprehensive setup instructions, see [SETUP.md](./SETUP.md)

## Available Scripts

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality
- `npm run setup-db` - Initialize database schema

## Application Routes

### Public Routes
- `/login` - User authentication
- `/register` - User registration
- `/otp-verification` - Phone/email verification

### Protected Routes
- `/` - Redirects to home
- `/home` - Main landing page
- `/dashboard` - User dashboard with analytics
- `/company-setup` - Company profile setup wizard
- `/profile` - User profile management
- `/settings` - Application settings

### Job Management
- `/post-job` - Create new job listings
- `/my-jobs` - Manage posted jobs
- `/find-candidates` - Discover qualified candidates
- `/saved-candidates` - Saved candidate profiles
- `/applications` - Track job applications

### Company Features
- `/companies` - Browse all companies
- `/billing` - Subscription and billing management
- `/success` - Success confirmation pages

## Key Components

### Core Components
- **FormStep** - Multi-step form wrapper with progress indicator
- **ProfileCard** - Reusable user/company profile display
- **ImageUploader** - Drag-and-drop image upload with Cloudinary
- **ProtectedRoute** - Route protection and authentication guard
- **ResponsiveLayout** - Mobile-first responsive layout wrapper

### Form Components
- **CompanyInfoStep** - Company basic information
- **FoundingInfoStep** - Company founding details
- **SocialMediaStep** - Social media profile links
- **ContactStep** - Contact information and address

## Platform Features

### Job Management System
- **Job Posting**: Create detailed job listings with requirements
- **Job Tracking**: Monitor application status and candidate responses
- **Job Analytics**: Track performance metrics and engagement
- **Job Templates**: Save and reuse job posting templates

### Candidate Discovery
- **Advanced Search**: Filter candidates by skills, experience, location
- **Candidate Profiles**: Detailed candidate information and portfolios
- **Save Candidates**: Bookmark interesting candidates for future reference
- **Application Tracking**: Monitor candidate application progress

### Company Management
- **Company Profiles**: Complete company setup with branding
- **Team Management**: Manage company team members and roles
- **Company Directory**: Browse and discover other companies
- **Branding Tools**: Logo and banner management with Cloudinary

### User Experience
- **Multi-step Registration**: Guided company setup process
- **OTP Verification**: Secure phone and email verification
- **Real-time Notifications**: Toast notifications for user actions
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Dark/Light Theme**: Customizable UI themes

### Data Management
- **Form Validation**: Comprehensive validation using react-hook-form
- **State Management**: Redux Toolkit for predictable state updates
- **Data Persistence**: PostgreSQL for reliable data storage
- **Image Storage**: Cloudinary for optimized image management

## API Integration

The application integrates with multiple services for a complete platform experience:

### Authentication APIs
- **Firebase Auth** - User authentication and management
- **Supabase Auth** - Alternative authentication provider
- **OTP Verification** - Phone and email verification

### Data APIs
- **PostgreSQL** - Primary database for user and company data
- **Firestore** - Real-time database for live updates
- **Supabase** - Backend-as-a-Service for API operations

### Media APIs
- **Cloudinary** - Image upload, optimization, and delivery
- **File Upload** - Drag-and-drop file handling

### Required API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/refresh-token` - Token refresh

#### Company Management
- `GET /api/company/profile` - Get company profile
- `PUT /api/company/profile` - Update company profile
- `POST /api/company/upload-logo` - Upload company logo
- `POST /api/company/upload-banner` - Upload company banner

#### Job Management
- `GET /api/jobs` - List jobs
- `POST /api/jobs` - Create job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

#### Candidate Management
- `GET /api/candidates` - Search candidates
- `POST /api/candidates/save` - Save candidate
- `GET /api/candidates/saved` - Get saved candidates

## State Management

The application uses Redux Toolkit for predictable state management:

### Redux Slices
- **authSlice** - User authentication state and user data
- **companySlice** - Company profile and settings

### React Query
- **Server State** - API data caching and synchronization
- **Background Updates** - Automatic data refetching
- **Optimistic Updates** - Immediate UI updates

## Styling & Theming

### Material-UI Integration
- **Custom Theme** - Branded color scheme and typography
- **Responsive Design** - Mobile-first approach with breakpoints
- **Component Overrides** - Customized MUI components
- **Dark Mode Support** - Theme switching capability

### Design System
- **Consistent Spacing** - 8px grid system
- **Typography Scale** - Responsive font sizes
- **Color Palette** - Primary, secondary, and neutral colors
- **Component Library** - Reusable UI components

## Browser Support

- **Chrome** 90+ (latest)
- **Firefox** 88+ (latest)
- **Safari** 14+ (latest)
- **Edge** 90+ (latest)
- **Mobile Browsers** - iOS Safari, Chrome Mobile

## Development

### Code Quality
- **ESLint** - Automated code linting and formatting
- **TypeScript** - Type safety and better development experience
- **Prettier** - Code formatting (if configured)
- **Git Hooks** - Pre-commit validation

### Testing
- **Unit Tests** - Component and function testing
- **Integration Tests** - API and service testing
- **E2E Tests** - End-to-end user flow testing

### Performance
- **Code Splitting** - Lazy loading for better performance
- **Image Optimization** - Cloudinary integration for optimized images
- **Bundle Analysis** - Vite bundle analyzer for optimization
- **Caching** - React Query for efficient data caching

## Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Ensure all production environment variables are configured:
- Firebase production configuration
- Cloudinary production settings
- PostgreSQL production database
- API endpoints for production

### Hosting Platforms
- **Vercel** - Recommended for React applications
- **Netlify** - Alternative hosting platform
- **AWS S3 + CloudFront** - Enterprise hosting solution

## Recent Updates

### Bug Fixes & Improvements (Latest)
- ✅ Fixed all TypeScript compilation errors (45+ errors resolved)
- ✅ Removed unused imports and variables across all components
- ✅ Fixed MUI Grid2 compatibility issue (updated to Grid for MUI v7.3.2)
- ✅ Enhanced Supabase authentication service with verification status support
- ✅ Improved code quality and maintainability
- ✅ Fixed JSX syntax errors in registration form
- ✅ Resolved type mismatches and ref type issues
- ✅ Production-ready build with zero compilation errors

### Code Quality
- All TypeScript strict mode checks passing
- Clean codebase with no unused dependencies
- Optimized imports and reduced bundle size
- Enhanced type safety across all components

## Troubleshooting

### Common Issues
1. **Database Connection** - Verify PostgreSQL is running and credentials are correct
2. **Firebase Auth** - Check Firebase configuration and authentication methods
3. **Cloudinary Upload** - Verify upload preset and API credentials
4. **Build Errors** - Check TypeScript errors and dependency conflicts

### Getting Help
- Check the [SETUP.md](./SETUP.md) for detailed configuration
- Review the troubleshooting section in SETUP.md
- Check [TECHNICAL_DOCUMENTATION.md](./TECHNICAL_DOCUMENTATION.md) for technical details
- Contact the development team for support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Material-UI components consistently
- Write meaningful commit messages
- Add JSDoc comments for complex functions
- Test your changes thoroughly

## License

This project is proprietary and confidential per NDA with Bluestock Fintech.

## Contact

For questions, support, or feature requests:
- **Development Team** - Contact via project channels
- **Documentation** - Refer to SETUP.md for detailed instructions
- **Issues** - Use the project issue tracker for bug reports

---

**BlueStock** - Empowering companies to find the right talent and candidates to find their dream jobs.
