# Simple Arab Code Admin

A modern React-based admin dashboard application built with TypeScript, featuring a clean and responsive interface for managing content and operations.

## 🚀 Tech Stack

- **Frontend Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.7
- **Routing**: React Router DOM 7.6.1
- **State Management**: Zustand 5.0.5
- **HTTP Client**: Axios 1.9.0
- **Data Fetching**: TanStack React Query 5.80.7
- **Forms**: React Hook Form 7.57.0 with Zod validation
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Phone Input**: React Phone Number Input
- **Utilities**: Class Variance Authority, CLSX, Tailwind Merge

## 📁 Project Structure

```
simple-arab-code-admin/
├── public/                          # Static assets
│   ├── assets/
│   │   ├── icons/                   # SVG icons
│   │   │   ├── ai/                  # AI-related icons
│   │   │   ├── employee-training/   # Training-related icons
│   │   │   ├── social-media/        # Social media icons
│   │   │   └── why-us/             # Feature icons
│   │   └── images/                  # Images and graphics
│   │       ├── ai/                  # AI section images
│   │       ├── auth/                # Authentication images
│   │       ├── employee-training/   # Training images
│   │       ├── home/                # Homepage images
│   │       └── launch-academy/      # Academy images
│   └── vite.svg, react.svg
├── src/
│   ├── components/                  # Reusable components
│   │   ├── shared/                  # Shared components
│   │   │   ├── admin-layout.tsx     # Main admin layout
│   │   │   ├── loader.tsx           # Loading component
│   │   │   ├── formFields/          # Form field components
│   │   │   │   ├── checkbox.tsx
│   │   │   │   ├── form-fields.tsx
│   │   │   │   ├── image-field.tsx
│   │   │   │   ├── password-field.tsx
│   │   │   │   ├── phone-field.tsx
│   │   │   │   ├── select-field.tsx
│   │   │   │   └── text-field.tsx
│   │   │   └── Icon/                # Icon components
│   │   │       ├── index.tsx
│   │   │       ├── types.ts
│   │   │       └── svgs/
│   │   └── ui/                      # UI primitives (Radix UI based)
│   │       ├── accordion.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── checkbox.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       └── sheet.tsx
│   ├── constants/                   # Application constants
│   │   └── enums.ts
│   ├── features/                    # Feature-based modules
│   │   └── auth/                    # Authentication
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── services/
│   │       │   └── authService.ts
│   │       ├── utils/
│   │       └── store.ts             # Auth state management
│   ├── hooks/                       # Custom React hooks
│   │   ├── useDebounce.ts
│   │   ├── useFormFields.ts
│   │   └── useFormValidations.ts
│   ├── lib/                         # Library configurations
│   │   ├── axios.ts                 # Axios configuration
│   │   ├── cookies.ts               # Cookie utilities
│   │   ├── query-keys.ts            # React Query keys
│   │   ├── react-query.tsx          # React Query setup
│   │   └── utils.ts                 # Utility functions
│   ├── pages/                       # Page components
│   │   ├── index.tsx                # Main admin dashboard
│   │   └── not-found.tsx            # 404 page
│   ├── routes/                      # Routing configuration
│   │   └── AppRoutes.tsx            # Main routing setup
│   ├── styles/                      # Global styles
│   │   └── index.css
│   ├── types/                       # TypeScript type definitions
│   │   ├── app.ts
│   │   └── user.ts
│   ├── validations/                 # Zod validation schemas
│   │   └── auth.ts
│   ├── App.tsx                      # Main App component
│   ├── main.tsx                     # Application entry point
│   └── vite-env.d.ts               # Vite environment types
├── components.json                 # shadcn/ui configuration
├── eslint.config.js               # ESLint configuration
├── index.html                     # HTML template
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.app.json             # App-specific TypeScript config
├── tsconfig.node.json            # Node-specific TypeScript config
└── vite.config.ts                # Vite configuration
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (version 18 or higher)
- pnpm package manager (recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd simple-arab-code-admin
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory and add necessary environment variables:

   ```env
   VITE_API_URL=https://localhost:5000/api
   NODE_ENV=development
   # Add other environment variables as needed
   ```

4. **Start the development server**

   ```bash
   pnpm run dev
   ```

   The application will be available at `http://localhost:3000`

### Available Scripts

- `pnpm run dev` - Start development server on port 3000
- `pnpm run openapi:generate` - Generate API types from OpenAPI schema
- `pnpm run build` - Build for production (Type generation + TypeScript compilation + Vite build)
- `pnpm run lint` - Run ESLint for code quality checks
- `pnpm run preview` - Preview production build locally

## 🏗️ Architecture Overview

### Feature-Based Structure

The application follows a feature-based architecture where each major feature has its own directory containing:

- **Components**: Feature-specific React components
- **Hooks**: Custom hooks for the feature
- **Services**: API calls and business logic
- **Utils**: Feature-specific utility functions
- **Store**: State management (Zustand stores)

### Key Features

1. **Admin Dashboard** (`/pages/index.tsx`)

   - Main administrative interface
   - Dashboard overview and analytics

2. **Authentication System** (`/features/auth/`)

   - User authentication and authorization
   - Session management with cookies
   - Protected routes and user state

3. **Admin Layout** (`/components/shared/admin-layout.tsx`)

   - Consistent layout structure
   - Navigation and sidebar components

4. **Form Management**
   - Comprehensive form field components
   - Phone number input with international formatting
   - Image upload and file handling
   - Validation with Zod schemas

### State Management

- **Zustand**: Used for global state management
- **React Query**: Handles server state, caching, and data fetching
- **React Hook Form**: Manages form state and validation

### Styling & UI

- **Tailwind CSS**: Utility-first CSS framework with v4.1.7
- **Radix UI**: Accessible component primitives
- **Custom UI Components**: Located in `/components/ui/`
- **RTL Support**: Right-to-Left language support (Arabic)

## 🔧 Development Guidelines

### Code Organization

1. **Components**: Use functional components with TypeScript
2. **Hooks**: Create custom hooks for reusable logic in `/hooks/`
3. **Types**: Define TypeScript interfaces in `/types/`
4. **Validation**: Use Zod schemas in `/validations/`
5. **API**: Configure axios interceptors in `/lib/axios.ts`

### Path Aliases

The project uses path aliases configured in `vite.config.ts`:

- `@/` - Points to the `src/` directory

### Routing

- Main routes defined in `AppRoutes.tsx`
- Admin layout structure with nested routes
- 404 handling with custom not-found page

### Form Handling

- **React Hook Form**: For form state management
- **Zod**: For schema validation
- **Custom Form Fields**: Reusable form components in `/components/shared/formFields/`
- **Phone Input**: International phone number formatting

### Development Tools

- **ESLint**: Code quality and consistency
- **TypeScript**: Type safety and better development experience
- **React Query DevTools**: Available in development mode for debugging
- **Vite**: Fast development server and build tool

## 📱 Key Dependencies

### Core Dependencies

- **React 19.1.0**: Latest React with concurrent features
- **TypeScript**: Full type safety
- **Vite 6.3.5**: Ultra-fast build tool
- **Tailwind CSS 4.1.7**: Latest utility-first CSS framework

### UI & Styling

- **Radix UI**: Accessible primitives for accordion, checkbox, dialog, label, select, slot
- **Lucide React**: Modern icon library
- **Class Variance Authority**: Component variant management
- **Tailwind Merge**: Utility for merging Tailwind classes

### State & Data Management

- **Zustand 5.0.5**: Lightweight state management
- **TanStack React Query 5.80.7**: Server state management
- **Axios 1.9.0**: HTTP client

### Forms & Validation

- **React Hook Form 7.57.0**: Performant forms
- **@hookform/resolvers**: Form validation resolvers
- **Zod 3.25.49**: Schema validation
- **React Phone Number Input**: International phone formatting

### Utilities

- **js-cookie**: Cookie management
- **libphonenumber-js**: Phone number utilities
- **sonner**: Toast notifications
- **swiper**: Touch slider component

## 📚 Project Configuration

### TypeScript Configuration

The project uses multiple TypeScript configurations:

- `tsconfig.json` - Base configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node.js environment settings

### Vite Configuration

Key configurations in `vite.config.ts`:

- **React SWC**: Fast refresh and compilation
- **Tailwind CSS**: Integrated via Vite plugin
- **Path Aliases**: `@/` mapped to `src/`
- **Development Server**: Runs on port 3000

### ESLint Configuration

Modern ESLint setup with:

- React hooks rules
- React refresh rules
- TypeScript ESLint integration
- Global configurations

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Write TypeScript interfaces for new data structures
3. Use the established patterns for API calls and state management
4. Ensure components are accessible and responsive
5. Add appropriate error handling and loading states
6. Use proper form validation with Zod schemas
7. Maintain RTL language support where applicable

## 📦 Build and Deployment

### Production Build

```bash
npm run build
```

This command:

1. Runs TypeScript compilation (`tsc -b`)
2. Creates optimized production build (`vite build`)
3. Outputs to `dist/` directory

### Preview Production Build

```bash
npm run preview
```

### Environment Variables

Required environment variables:

- `VITE_API_URL`: Backend API endpoint
- `NODE_ENV`: Environment mode (development/production)

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**: The app runs on port 3000 by default
2. **TypeScript Errors**: Check all TypeScript configuration files
3. **Build Issues**: Ensure all dependencies are properly installed
4. **Environment Variables**: Verify `.env` file configuration

### Development Tips

- Use React Query DevTools for debugging API calls
- Check ESLint output for code quality issues
- Utilize TypeScript strict mode for better type safety
- Test form validation with various input scenarios

---

**Project Type**: Admin Dashboard Application  
**Primary Language**: TypeScript  
**Framework**: React 19 with Vite  
**UI Framework**: Tailwind CSS + Radix UI
