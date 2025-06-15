# Development Environment Setup Guide

## Prerequisites

### Required Software

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (comes with Node.js)
- **Git**: Latest version
- **VS Code**: Recommended IDE with extensions

### VS Code Extensions (Required)

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "usernamehw.errorlens"
  ]
}
```

## Project Structure

```
auth-system/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Basic UI components (Button, Input, etc.)
│   │   ├── auth/            # Authentication specific components
│   │   └── layout/          # Layout components
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API services and business logic
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript type definitions
│   ├── constants/           # Application constants
│   ├── styles/              # Global styles and themes
│   └── __tests__/           # Test files
├── public/                  # Static assets
├── docs/                    # Project documentation
├── .github/workflows/       # CI/CD configuration
└── config/                  # Build and development configuration
```

## Technology Stack

### Core Technologies

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand (lightweight alternative to Redux)
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form with Zod validation
- **Testing**: Vitest + React Testing Library
- **E2E Testing**: Playwright

### Development Tools

- **Linting**: ESLint with TypeScript rules
- **Formatting**: Prettier
- **Pre-commit**: Husky + lint-staged
- **Package Manager**: npm

## Installation Steps

### 1. Clone Repository

```bash
git clone <repository-url>
cd auth-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create `.env.local` file in root directory:

```env
# API Configuration
VITE_API_BASE_URL=https://n8n-aipulse.up.railway.app/webhook-test
VITE_APP_ENVIRONMENT=development

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true

# Rate Limiting (Development)
VITE_LOGIN_RATE_LIMIT=10
VITE_REGISTRATION_RATE_LIMIT=5

# Session Configuration
VITE_SESSION_TIMEOUT=300000 # 5 minutes in milliseconds
VITE_TOKEN_REFRESH_THRESHOLD=120000 # 2 minutes in milliseconds
```

### 4. Start Development Server

```bash
npm run dev
```

Application will be available at `http://localhost:5173`

## Development Scripts

### Available Commands

```bash
# Development
npm run dev              # Start development server
npm run dev:host         # Start with network access
npm run dev:debug        # Start with debug mode

# Building
npm run build            # Production build
npm run build:staging    # Staging build
npm run preview          # Preview production build

# Testing
npm run test             # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run test:e2e         # Run end-to-end tests
npm run test:e2e:ui      # Run E2E tests with UI

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format with Prettier
npm run type-check       # TypeScript type checking

# Utilities
npm run clean            # Clean build artifacts
npm run analyze          # Bundle size analysis
```

## Code Quality Configuration

### ESLint Configuration (.eslintrc.js)

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.js"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "react", "jsx-a11y"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "jsx-a11y/no-autofocus": "warn",
    "no-console": "warn",
    "prefer-const": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
```

### Prettier Configuration (.prettierrc)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### Tailwind Configuration (tailwind.config.js)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        success: {
          500: "#10b981",
        },
        error: {
          500: "#ef4444",
        },
        warning: {
          500: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-in-out",
        "scale-in": "scaleIn 0.2s ease-in-out",
        spin: "spin 1s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
```

## Git Workflow

### Branch Naming Convention

```
feature/sprint-{number}/{user-story-id}-{brief-description}
bugfix/{issue-number}-{brief-description}
hotfix/{critical-issue-description}
release/{version-number}

Examples:
feature/sprint-1/us-001-user-login
bugfix/auth-001-token-expiration
hotfix/security-rate-limiting
release/v1.0.0
```

### Commit Message Convention

```
type(scope): subject

body (optional)

footer (optional)

Types: feat, fix, docs, style, refactor, test, chore
Scope: auth, ui, api, config, etc.

Examples:
feat(auth): implement user login functionality
fix(ui): resolve form validation error messages
docs(readme): update installation instructions
test(auth): add unit tests for password validation
```

### Pre-commit Hooks (husky + lint-staged)

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "src/**/*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "src/**/*.{css,scss,md}": ["prettier --write"]
  }
}
```

## Testing Configuration

### Vitest Configuration (vitest.config.ts)

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/__tests__/",
        "**/*.config.{js,ts}",
        "**/*.d.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### Test Setup (src/**tests**/setup.ts)

```typescript
import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
});

// Mock fetch
global.fetch = vi.fn();

// Mock intersection observer
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
}));
```

## Environment-Specific Configuration

### Development Environment

- Hot module replacement enabled
- Source maps enabled
- Debug mode active
- Mock API responses (optional)
- Detailed error messages

### Staging Environment

```env
VITE_API_BASE_URL=https://staging-api.example.com
VITE_APP_ENVIRONMENT=staging
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false
```

### Production Environment

```env
VITE_API_BASE_URL=https://api.example.com
VITE_APP_ENVIRONMENT=production
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG=false
```

## Debugging Setup

### VS Code Launch Configuration (.vscode/launch.json)

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug React App",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/vite",
      "args": ["dev"],
      "env": {
        "NODE_ENV": "development"
      },
      "console": "integratedTerminal",
      "sourceMaps": true
    }
  ]
}
```

### Browser DevTools Setup

- React Developer Tools extension
- Redux DevTools (if using Redux)
- Network tab monitoring for API calls
- Application tab for storage inspection

## Performance Monitoring

### Development Metrics

```typescript
// Performance monitoring in development
if (import.meta.env.DEV) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log("Performance metric:", entry);
    }
  });

  observer.observe({ entryTypes: ["measure", "navigation"] });
}
```

### Bundle Analysis

```bash
npm run build
npm run analyze  # Generates bundle size report
```

## Common Issues and Solutions

### Port Already in Use

```bash
# Kill process using port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

### Node Modules Issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Check types
npm run type-check

# Clear TypeScript cache
rm -rf node_modules/.cache
```

### Build Issues

```bash
# Clean build
npm run clean
npm run build
```

## Development Best Practices

### File Organization

- Keep components small and focused
- Use index.ts files for clean imports
- Group related files in folders
- Follow naming conventions consistently

### Code Style

- Use TypeScript for type safety
- Implement proper error boundaries
- Use custom hooks for reusable logic
- Keep components pure when possible

### Testing Strategy

- Write tests first (TDD) when possible
- Focus on user behavior, not implementation
- Mock external dependencies
- Maintain high test coverage

### Performance

- Use React.memo for expensive components
- Implement code splitting for large bundles
- Optimize images and assets
- Monitor bundle size regularly
