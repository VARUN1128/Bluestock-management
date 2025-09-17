# BlueStock Setup Guide

This guide will help you set up the BlueStock application with Firebase authentication, Cloudinary image storage, and PostgreSQL database.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Firebase project
- Cloudinary account

## 1. Environment Setup

1. Copy the environment template:
   ```bash
   cp env.example .env
   ```

2. Fill in your environment variables in `.env`:

### Firebase Configuration
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project or select existing one
- Go to Project Settings > General > Your apps
- Add a web app and copy the configuration values
- Enable Authentication > Sign-in method > Email/Password

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### Cloudinary Configuration
- Go to [Cloudinary Console](https://console.cloudinary.com/)
- Copy your cloud name, API key, and API secret
- Create an upload preset (unsigned) for direct uploads

```env
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_API_KEY=your_api_key
REACT_APP_CLOUDINARY_API_SECRET=your_api_secret
REACT_APP_CLOUDINARY_UPLOAD_PRESET=bluestock_preset
```

### PostgreSQL Configuration
```env
REACT_APP_DB_HOST=localhost
REACT_APP_DB_PORT=5432
REACT_APP_DB_NAME=company_db
REACT_APP_DB_USER=postgres
REACT_APP_DB_PASSWORD=your_password
```

## 2. Database Setup

1. Install PostgreSQL and create a database:
   ```sql
   CREATE DATABASE company_db;
   ```

2. Run the database setup script:
   ```bash
   node scripts/setup-database.js
   ```

   Or manually run the SQL schema:
   ```bash
   psql -U postgres -d company_db -f database/company_db.sql
   ```

## 3. Install Dependencies

```bash
npm install
```

## 4. Start the Application

```bash
npm run dev
```

## 5. Firebase Authentication Setup

1. In Firebase Console, go to Authentication > Sign-in method
2. Enable "Email/Password" provider
3. Optionally enable "Phone" provider for SMS OTP

## 6. Cloudinary Upload Preset Setup

1. Go to Cloudinary Console > Settings > Upload
2. Create a new upload preset:
   - Preset name: `bluestock_preset`
   - Signing Mode: Unsigned
   - Folder: `bluestock`
   - Allowed formats: `jpg, jpeg, png, gif, webp`
   - Max file size: `10MB`

## 7. Database Schema

The application uses two main tables:

### Users Table
- `id` - Primary key
- `email` - User email (unique)
- `password` - Hashed password
- `full_name` - User's full name
- `signup_type` - Registration method (email/phone)
- `gender` - User gender
- `mobile_no` - Mobile number
- `is_mobile_verified` - Mobile verification status
- `is_email_verified` - Email verification status
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Company Profile Table
- `id` - Primary key
- `owner_id` - Foreign key to users table
- `company_name` - Company name
- `address` - Company address
- `city` - City
- `state` - State/Province
- `country` - Country
- `postal_code` - Postal/ZIP code
- `website` - Company website
- `logo_url` - Company logo URL (Cloudinary)
- `banner_url` - Company banner URL (Cloudinary)
- `industry` - Industry type
- `founded_date` - Company founding date
- `description` - Company description
- `social_links` - JSON object with social media links
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## 8. API Services

The application includes the following services:

- `authService.ts` - Firebase authentication and user management
- `companyService.ts` - Company profile management
- `cloudinary.ts` - Image upload and management

## 9. Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists and user has proper permissions

### Firebase Authentication Issues
- Verify Firebase configuration in `.env`
- Check Firebase project settings
- Ensure authentication methods are enabled

### Cloudinary Upload Issues
- Verify Cloudinary credentials in `.env`
- Check upload preset configuration
- Ensure preset allows unsigned uploads

### Image Upload Issues
- Check Cloudinary upload preset settings
- Verify folder permissions
- Check file size and format restrictions

## 10. Development Notes

- The application uses Redux Toolkit for state management
- Firebase handles authentication
- Cloudinary handles image storage
- PostgreSQL stores user and company data
- All API calls are made from the frontend (no separate backend server)

## 11. Production Deployment

For production deployment:

1. Set up a production PostgreSQL database
2. Configure Firebase for production
3. Set up Cloudinary for production
4. Update environment variables for production
5. Build the application: `npm run build`
6. Deploy to your preferred hosting platform

## Support

If you encounter any issues during setup, please check:
1. All environment variables are correctly set
2. Database connection is working
3. Firebase project is properly configured
4. Cloudinary account is set up correctly
