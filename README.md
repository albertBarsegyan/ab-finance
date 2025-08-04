# Finance Management App

A modern finance management application built with React, TypeScript, and Tailwind CSS.

## Features

- User authentication (login/register)
- Dashboard with financial overview
- Transaction management
- Budget tracking
- Financial goals
- Profile management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd finance-management
```

2. Install dependencies:
```bash
pnpm install
```

3. Install additional dependencies for form validation:
```bash
pnpm add react-hook-form @hookform/resolvers zod
```

4. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`.

## Form Validation

The application uses React Hook Form with Zod schema validation for all forms:

- **Login Form**: Email and password validation
- **Register Form**: Complete user registration with comprehensive validation

### Validation Features

- Real-time validation feedback
- Password strength requirements
- Email format validation
- Phone number format validation
- Terms and conditions acceptance
- Password confirmation matching

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod
- **Routing**: React Router DOM
- **Authentication**: Firebase
- **Build Tool**: Vite

## Project Structure

```
src/
├── app/                 # App configuration and providers
├── entities/           # Business entities
├── features/           # Feature modules
├── pages/             # Page components
│   └── auth/          # Authentication pages
├── shared/            # Shared components and utilities
│   ├── components/    # UI components
│   ├── lib/          # Utilities and schemas
│   └── utils/        # Helper functions
└── widgets/           # Widget components
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors
- `pnpm format` - Format code with Prettier
