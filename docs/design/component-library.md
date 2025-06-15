# Component Library - System Logowania

## Spis treści

1. [Zasady projektowania](#zasady-projektowania)
2. [Komponenty podstawowe](#komponenty-podstawowe)
3. [Komponenty formularzy](#komponenty-formularzy)
4. [Komponenty interakcji](#komponenty-interakcji)
5. [Komponenty stanu](#komponenty-stanu)
6. [Komponenty layoutu](#komponenty-layoutu)
7. [Hooks i utilities](#hooks-i-utilities)

---

## Zasady projektowania

### Design System

- **Kolorystyka**: Paleta kolorów zgodna z brandingiem
- **Typografia**: Hierarchia czcionek (heading, body, caption)
- **Spacing**: System 8px grid (8, 16, 24, 32, 40px)
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsywność**: Mobile-first approach

### Architektura komponentów

```
/components
├── atoms/          # Najmniejsze komponenty
├── molecules/      # Kombinacje atomów
├── organisms/      # Złożone sekcje
├── templates/      # Layouty stron
└── pages/          # Kompletne strony
```

---

## Komponenty podstawowe

### Button

**Lokalizacja**: `components/atoms/Button.tsx`

```typescript
interface ButtonProps {
  variant: "primary" | "secondary" | "danger" | "ghost";
  size: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}
```

**Warianty**:

- `primary` - Główny CTA (niebieski, white text)
- `secondary` - Drugorzędny (szary outline)
- `danger` - Destrukcyjne akcje (czerwony)
- `ghost` - Minimalistyczny (transparent)

**Stany**:

- Default, Hover, Focus, Active, Disabled, Loading

**Accessibility**:

- Proper ARIA labels
- Keyboard navigation (Enter, Space)
- Focus indicators
- Screen reader support

---

### Input

**Lokalizacja**: `components/atoms/Input.tsx`

```typescript
interface InputProps {
  type: "text" | "email" | "password" | "tel";
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
}
```

**Funkcjonalności**:

- Real-time validation
- Password visibility toggle
- Loading states
- Error states z animacjami
- Character counter (dla hasła)

**Accessibility**:

- Label association
- Error announcements
- Required indicators
- Keyboard navigation

---

### LoadingSpinner

**Lokalizacja**: `components/atoms/LoadingSpinner.tsx`

```typescript
interface LoadingSpinnerProps {
  size: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "white";
  text?: string;
}
```

**Warianty**:

- Inline spinner (w buttonach)
- Overlay spinner (pełny ekran)
- Section spinner (w kontenerach)

---

### Alert

**Lokalizacja**: `components/atoms/Alert.tsx`

```typescript
interface AlertProps {
  variant: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  actions?: React.ReactNode;
}
```

**Funkcjonalności**:

- Auto-dismiss timer
- Animacje wejścia/wyjścia
- Custom actions (linki, przyciski)
- Icon per variant

---

## Komponenty formularzy

### LoginForm

**Lokalizacja**: `components/organisms/LoginForm.tsx`

```typescript
interface LoginFormProps {
  onLogin: (credentials: LoginCredentials) => Promise<void>;
  onForgotPassword: () => void;
  onRegister: () => void;
  loading?: boolean;
  error?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}
```

**Funkcjonalności**:

- Form validation (Formik + Yup)
- Remember me checkbox
- Social login buttons (opcjonalne)
- Rate limiting indicator
- Accessibility compliance

**Struktura**:

```jsx
<FormContainer>
  <FormHeader title="Zaloguj się" />
  <InputField type="email" label="Email" />
  <InputField type="password" label="Hasło" />
  <RememberMeCheckbox />
  <SubmitButton loading={loading}>Zaloguj</SubmitButton>
  <FormFooter>
    <Link onClick={onForgotPassword}>Zapomniałeś hasła?</Link>
    <Link onClick={onRegister}>Zarejestruj się</Link>
  </FormFooter>
</FormContainer>
```

---

### RegisterForm

**Lokalizacja**: `components/organisms/RegisterForm.tsx`

```typescript
interface RegisterFormProps {
  onRegister: (userData: RegisterData) => Promise<void>;
  onLogin: () => void;
  loading?: boolean;
  error?: string;
}

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  phone?: string;
}
```

**Funkcjonalności**:

- Advanced password validation
- Password strength indicator
- Email format validation
- Phone number validation (opcjonalne)
- Terms & conditions checkbox

---

### ForgotPasswordForm

**Lokalizacja**: `components/organisms/ForgotPasswordForm.tsx`

```typescript
interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordData) => Promise<void>;
  onBack: () => void;
  loading?: boolean;
  success?: boolean;
}

interface ForgotPasswordData {
  email: string;
  newPassword: string;
}
```

---

## Komponenty interakcji

### Modal

**Lokalizacja**: `components/molecules/Modal.tsx`

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closable?: boolean;
  overlay?: boolean;
}
```

**Funkcjonalności**:

- Escape key to close
- Click outside to close
- Focus management
- Scroll lock
- Animation entrance/exit
- Portal rendering

---

### Tooltip

**Lokalizacja**: `components/atoms/Tooltip.tsx`

```typescript
interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  trigger?: "hover" | "click" | "focus";
  delay?: number;
}
```

---

### Dropdown

**Lokalizacja**: `components/molecules/Dropdown.tsx`

```typescript
interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  offset?: number;
}
```

---

## Komponenty stanu

### ErrorBoundary

**Lokalizacja**: `components/templates/ErrorBoundary.tsx`

```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error }>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}
```

**Funkcjonalności**:

- Graceful error handling
- Error reporting
- Retry mechanisms
- Development vs production modes

---

### ProtectedRoute

**Lokalizacja**: `components/templates/ProtectedRoute.tsx`

```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireNoAuth?: boolean;
  fallback?: React.ReactNode;
}
```

---

### SessionManager

**Lokalizacja**: `components/templates/SessionManager.tsx`

```typescript
interface SessionManagerProps {
  children: React.ReactNode;
  onSessionExpire?: () => void;
  warningTime?: number; // minutes before expiry
}
```

**Funkcjonalności**:

- Activity tracking
- Session warning modal
- Auto-logout
- Multi-tab synchronization

---

## Komponenty layoutu

### PageContainer

**Lokalizacja**: `components/templates/PageContainer.tsx`

```typescript
interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: boolean;
  center?: boolean;
}
```

---

### AuthLayout

**Lokalizacja**: `components/templates/AuthLayout.tsx`

```typescript
interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  showLogo?: boolean;
}
```

**Struktura**:

```jsx
<AuthLayout>
  <AuthCard>
    <Logo />
    <AuthForm />
    <AuthFooter />
  </AuthCard>
  <BackgroundPattern />
</AuthLayout>
```

---

### UserWidget

**Lokalizacja**: `components/molecules/UserWidget.tsx`

```typescript
interface UserWidgetProps {
  user: User;
  onLogout: () => void;
  showCredits?: boolean;
  showMenu?: boolean;
}

interface User {
  firstName: string;
  email: string;
  credits: number;
  avatar?: string;
}
```

**Funkcjonalności**:

- User dropdown menu
- Credits display
- Logout confirmation
- Profile picture support

---

## Hooks i utilities

### useAuth

**Lokalizacja**: `hooks/useAuth.ts`

```typescript
interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  resetPassword: (data: ForgotPasswordData) => Promise<void>;
  isAuthenticated: boolean;
}
```

---

### useFormValidation

**Lokalizacja**: `hooks/useFormValidation.ts`

```typescript
interface UseFormValidationReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string) => void;
  validateField: (field: keyof T) => Promise<boolean>;
  validateForm: () => Promise<boolean>;
  resetForm: () => void;
}
```

---

### useSession

**Lokalizacja**: `hooks/useSession.ts`

```typescript
interface UseSessionReturn {
  timeLeft: number;
  isWarning: boolean;
  extendSession: () => void;
  endSession: () => void;
}
```

---

### useApiCall

**Lokalizacja**: `hooks/useApiCall.ts`

```typescript
interface UseApiCallReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (params?: any) => Promise<void>;
  reset: () => void;
}
```

**Funkcjonalności**:

- Automatic retry logic
- Loading states
- Error handling
- Request cancellation
- Cache management

---

### useRateLimit

**Lokalizacja**: `hooks/useRateLimit.ts`

```typescript
interface UseRateLimitReturn {
  canExecute: boolean;
  remainingAttempts: number;
  resetTime: Date | null;
  execute: () => boolean;
}
```

---

## Utilities

### API Client

**Lokalizacja**: `utils/apiClient.ts`

```typescript
class ApiClient {
  private baseURL: string;
  private timeout: number;

  async post<T>(endpoint: string, data: any): Promise<T>;
  async get<T>(endpoint: string): Promise<T>;

  private handleResponse<T>(response: Response): Promise<T>;
  private handleError(error: any): never;
}
```

**Funkcjonalności**:

- Request/response interceptors
- Automatic token refresh
- Error standardization
- Request timeout handling
- Retry logic

---

### Storage Manager

**Lokalizacja**: `utils/storage.ts`

```typescript
class StorageManager {
  static setSession(key: string, value: any): void;
  static getSession(key: string): any;
  static removeSession(key: string): void;
  static clearSession(): void;

  static setLocal(key: string, value: any): void;
  static getLocal(key: string): any;
  static removeLocal(key: string): void;
}
```

---

### Validation Schemas

**Lokalizacja**: `utils/validationSchemas.ts`

```typescript
export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const registerSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Hasła muszą być identyczne")
    .required(),
  firstName: yup.string().min(2).required(),
  phone: yup
    .string()
    .matches(/^[+]?[\d\s-()]+$/)
    .optional(),
});
```

---

## Styling Guidelines

### CSS Architecture

```scss
// _variables.scss
$primary-color: #007bff;
$secondary-color: #6c757d;
$success-color: #28a745;
$error-color: #dc3545;
$warning-color: #ffc107;

$font-family-base: "Inter", sans-serif;
$font-size-base: 16px;
$line-height-base: 1.5;

$spacing-base: 8px;
$border-radius-base: 4px;
$transition-base: 0.15s ease-in-out;

// _mixins.scss
@mixin button-variant($bg, $color, $border) {
  background-color: $bg;
  color: $color;
  border-color: $border;

  &:hover {
    background-color: darken($bg, 10%);
    border-color: darken($border, 10%);
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba($bg, 0.25);
  }
}

@mixin form-control {
  padding: 12px 16px;
  border: 1px solid #ced4da;
  border-radius: $border-radius-base;
  font-size: $font-size-base;
  transition: $transition-base;

  &:focus {
    border-color: $primary-color;
    box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
    outline: none;
  }
}
```

### Component Styling Pattern

```scss
// Component.module.scss
.component {
  // Base styles

  &__element {
    // Element styles
  }

  &--modifier {
    // Modifier styles
  }

  &[data-state="loading"] {
    // State styles
  }
}
```

---

## Testing Guidelines

### Unit Tests

```typescript
// Button.test.tsx
describe("Button Component", () => {
  it("renders with correct variant class", () => {
    render(<Button variant="primary">Test</Button>);
    expect(screen.getByRole("button")).toHaveClass("button--primary");
  });

  it("shows loading spinner when loading", () => {
    render(<Button loading>Test</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Test</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Tests

```typescript
// LoginForm.integration.test.tsx
describe("LoginForm Integration", () => {
  it("submits form with valid credentials", async () => {
    const mockLogin = jest.fn();
    render(<LoginForm onLogin={mockLogin} />);

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/hasło/i), "Password123!");
    await user.click(screen.getByRole("button", { name: /zaloguj/i }));

    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "Password123!",
    });
  });
});
```

---

## Performance Optimizations

### Code Splitting

```typescript
// Lazy loading for auth components
const LoginForm = lazy(() => import("./organisms/LoginForm"));
const RegisterForm = lazy(() => import("./organisms/RegisterForm"));
const ForgotPasswordForm = lazy(() => import("./organisms/ForgotPasswordForm"));
```

### Memoization

```typescript
// Expensive computations
const MemoizedPasswordStrength = memo(PasswordStrengthIndicator);
const MemoizedUserWidget = memo(UserWidget, (prevProps, nextProps) => {
  return prevProps.user.credits === nextProps.user.credits;
});
```

### Bundle Optimization

- Tree-shaking dla utility functions
- Dynamic imports dla rzadko używanych komponentów
- Compression i minification
- CSS purging

---

## Deployment Guidelines

### Build Process

```json
{
  "scripts": {
    "build": "vite build",
    "build:analyze": "vite build --mode analyze",
    "build:production": "NODE_ENV=production vite build",
    "test:components": "jest --testPathPattern=components",
    "storybook:build": "build-storybook"
  }
}
```

### Environment Configuration

```typescript
// config/environments.ts
export const config = {
  development: {
    apiBaseUrl: "http://localhost:3000",
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
    enableAnalytics: false,
  },
  production: {
    apiBaseUrl: "https://n8n-aipulse.up.railway.app",
    sessionTimeout: 5 * 60 * 1000, // 5 minutes
    enableAnalytics: true,
  },
};
```

---

## Maintenance Guidelines

### Component Versioning

- Semantic versioning dla breaking changes
- Deprecation warnings dla starych API
- Migration guides dla major updates
- Changelog dla każdej wersji

### Documentation Updates

- Storybook stories dla każdego komponentu
- Props documentation
- Usage examples
- Accessibility notes
- Performance considerations

### Monitoring

- Component usage analytics
- Error tracking
- Performance metrics
- User feedback integration
