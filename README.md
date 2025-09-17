# Company Registration & Verification Module

A modern React application for company registration and profile management, built with React 19, Vite, and Material-UI.

## Features

- **Multi-step Registration Form**: Complete company registration with logo/banner upload
- **User Authentication**: Login and registration with form validation
- **Dashboard**: View user and company information
- **Settings**: Edit personal and company details
- **Mobile Responsive**: Optimized for all device sizes
- **Image Upload**: Drag-and-drop image upload for company assets
- **Form Validation**: Comprehensive form validation using react-hook-form

## Tech Stack

- **Frontend**: React 19, Vite, TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Responsive Design**: React Responsive

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── FormStep.tsx    # Multi-step form wrapper
│   ├── ProfileCard.tsx # User/company profile display
│   ├── ImageUploader.tsx # Drag-and-drop image upload
│   └── *Step.tsx       # Individual form steps
├── pages/              # Page components
│   ├── Login.tsx       # Login page
│   ├── Register.tsx    # Registration page
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Settings.tsx    # Profile settings
│   └── Success.tsx     # Registration success
├── store/              # Redux store
│   ├── index.ts        # Store configuration
│   └── slices/         # Redux slices
├── api/                # API service functions
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update environment variables with your API endpoints

5. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Pages

- `/login` - User login page
- `/register` - User registration page
- `/dashboard` - Main dashboard with multi-step company registration
- `/settings` - Profile and company settings
- `/success` - Registration completion page

## Components

### FormStep
Multi-step form wrapper with progress indicator and navigation.

### ProfileCard
Reusable component for displaying user and company information.

### ImageUploader
Drag-and-drop image upload component with preview and validation.

## Features in Detail

### Multi-step Registration
1. **Company Info**: Logo/banner upload, company name, description
2. **Founding Info**: Organization type, industry, team size, founding date
3. **Social Media**: Social media profile links
4. **Contact**: Address, phone, email information

### Form Validation
- Email format validation
- Password strength requirements
- Required field validation
- File upload validation
- URL format validation

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interfaces
- Optimized for all screen sizes

## API Integration

The application is designed to work with a backend API. Mock implementations are provided for development. Replace mock functions in the `api/` directory with actual API calls.

### Required API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/company/profile` - Get company profile
- `PUT /api/company/profile` - Update company profile
- `POST /api/company/upload-logo` - Upload company logo
- `POST /api/company/upload-banner` - Upload company banner

## State Management

The application uses Redux Toolkit for state management with the following slices:

- **authSlice**: User authentication state
- **companySlice**: Company profile state

## Styling

The application uses Material-UI with a custom theme. All components follow MUI design principles and are fully customizable.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary and confidential per NDA with Bluestock Fintech.

## Contact

For questions or support, contact the development team.
