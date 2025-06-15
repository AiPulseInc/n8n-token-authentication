# Testing Strategy & QA Plan

## Testing Pyramid Overview

```
    /\     E2E Tests (10%)
   /  \    - Critical user journeys
  /____\   - Browser compatibility
 /      \
/   UI   \ Integration Tests (20%)
\________/ - API integration
           - Component integration

     Unit Tests (70%)
     - Business logic
     - Utility functions
     - Component logic
```

## Unit Testing Strategy

### Testing Framework Setup

- **Framework**: Vitest + React Testing Library
- **Coverage Target**: 80% minimum
- **Mock Strategy**: Mock external dependencies, test internal logic

### Components to Unit Test

#### Authentication Service (src/services/auth.ts)

```typescript
// Tests for authentication business logic
describe("AuthService", () => {
  describe("login", () => {
    it("should return user data on successful login");
    it("should throw error for invalid credentials");
    it("should handle network errors gracefully");
    it("should respect rate limiting");
    it("should store token in sessionStorage");
  });

  describe("logout", () => {
    it("should clear user session");
    it("should remove token from storage");
    it("should reset user state");
  });

  describe("validatePassword", () => {
    it("should accept valid passwords");
    it("should reject passwords missing uppercase");
    it("should reject passwords missing numbers");
    it("should reject passwords under 8 characters");
    it("should reject passwords missing special characters");
  });
});
```

#### Form Validation Utilities (src/utils/validation.ts)

```typescript
describe("Validation Utils", () => {
  describe("validateEmail", () => {
    it("should accept valid email formats");
    it("should reject invalid email formats");
    it("should handle edge cases (empty, null, undefined)");
    it("should suggest corrections for common typos");
  });

  describe("validatePhone", () => {
    it("should accept valid Polish phone numbers");
    it("should reject invalid phone formats");
    it("should handle international formats");
  });
});
```

#### Custom Hooks Testing

```typescript
describe("useAuth hook", () => {
  it("should initialize with null user");
  it("should update user state on login");
  it("should clear user state on logout");
  it("should handle token expiration");
  it("should refresh token automatically");
});

describe("useSessionTimeout hook", () => {
  it("should start timer on user activity");
  it("should show warning before timeout");
  it("should logout user after timeout");
  it("should reset timer on user activity");
});
```

### Unit Test Examples

#### Login Component Test

```typescript
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { LoginForm } from "../LoginForm";
import * as authService from "../../services/auth";

// Mock the auth service
vi.mock("../../services/auth");

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render login form with email and password fields", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hasło/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /zaloguj/i })
    ).toBeInTheDocument();
  });

  it("should show validation errors for invalid email", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(
        screen.getByText(/nieprawidłowy format emaila/i)
      ).toBeInTheDocument();
    });
  });

  it("should call login service with correct credentials", async () => {
    const mockLogin = vi.mocked(authService.login);
    mockLogin.mockResolvedValue({
      success: true,
      user: mockUser,
      token: "token",
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/hasło/i), {
      target: { value: "Password123!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /zaloguj/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "Password123!",
      });
    });
  });

  it("should display error message for failed login", async () => {
    const mockLogin = vi.mocked(authService.login);
    mockLogin.mockRejectedValue(new Error("Invalid credentials"));

    render(<LoginForm />);

    // Fill form and submit
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/hasło/i), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /zaloguj/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/nieprawidłowe dane logowania/i)
      ).toBeInTheDocument();
    });
  });

  it("should show loading state during submission", async () => {
    const mockLogin = vi.mocked(authService.login);
    mockLogin.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );

    render(<LoginForm />);

    // Fill and submit form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/hasło/i), {
      target: { value: "Password123!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /zaloguj/i }));

    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByText(/sprawdzamy dane/i)).toBeInTheDocument();
  });
});
```

## Integration Testing Strategy

### API Integration Tests

```typescript
describe("API Integration", () => {
  describe("Login Endpoint", () => {
    it("should successfully authenticate valid user", async () => {
      // Test with actual API call
      const response = await authService.login({
        email: "test@example.com",
        password: "validpassword",
      });

      expect(response.success).toBe(true);
      expect(response.user).toBeDefined();
      expect(response.token).toBeDefined();
    });

    it("should handle rate limiting gracefully", async () => {
      // Make multiple rapid requests to trigger rate limiting
      const requests = Array(6)
        .fill()
        .map(() =>
          authService.login({ email: "test@example.com", password: "wrong" })
        );

      await expect(Promise.all(requests)).rejects.toThrow(/rate limit/i);
    });

    it("should retry on network errors", async () => {
      // Mock network error and verify retry logic
      const mockFetch = vi
        .fn()
        .mockRejectedValueOnce(new Error("Network error"))
        .mockRejectedValueOnce(new Error("Network error"))
        .mockResolvedValueOnce(new Response(JSON.stringify({ success: true })));

      global.fetch = mockFetch;

      const result = await authService.login({
        email: "test@example.com",
        password: "password",
      });

      expect(mockFetch).toHaveBeenCalledTimes(3);
      expect(result.success).toBe(true);
    });
  });
});
```

### Component Integration Tests

```typescript
describe("Authentication Flow Integration", () => {
  it("should complete full login flow", async () => {
    render(<App />);

    // Navigate to login
    fireEvent.click(screen.getByText(/zaloguj się/i));

    // Fill login form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/hasło/i), {
      target: { value: "Password123!" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /zaloguj/i }));

    // Verify user is logged in
    await waitFor(() => {
      expect(screen.getByText(/witaj, jan/i)).toBeInTheDocument();
      expect(screen.getByText(/kredyty: 50/i)).toBeInTheDocument();
    });
  });

  it("should handle session timeout correctly", async () => {
    // Mock session timeout
    jest.useFakeTimers();

    render(<App />);

    // Login user
    // ... login steps ...

    // Fast forward past session timeout
    jest.advanceTimersByTime(300000); // 5 minutes

    // Verify timeout warning appears
    await waitFor(() => {
      expect(screen.getByText(/sesja wygaśnie za/i)).toBeInTheDocument();
    });

    // Fast forward past final timeout
    jest.advanceTimersByTime(60000); // 1 minute

    // Verify user is logged out
    await waitFor(() => {
      expect(screen.getByText(/sesja wygasła/i)).toBeInTheDocument();
      expect(screen.getByText(/zaloguj się/i)).toBeInTheDocument();
    });

    jest.useRealTimers();
  });
});
```

## End-to-End Testing Strategy

### E2E Testing Framework: Playwright

#### Critical User Journeys

```typescript
// tests/e2e/auth-flow.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test("should complete successful registration and login journey", async ({
    page,
  }) => {
    // Navigate to registration
    await page.goto("/");
    await page.click("text=Zarejestruj się");

    // Fill registration form
    await page.fill('[data-testid="email-input"]', "newuser@example.com");
    await page.fill('[data-testid="password-input"]', "NewPassword123!");
    await page.fill(
      '[data-testid="confirm-password-input"]',
      "NewPassword123!"
    );
    await page.fill('[data-testid="name-input"]', "Jan Kowalski");

    // Submit registration
    await page.click('[data-testid="register-button"]');

    // Verify success message
    await expect(
      page.locator("text=Sprawdź email w celu weryfikacji")
    ).toBeVisible();

    // Simulate email verification (in real test, would check email)
    // For demo, we'll navigate directly to login
    await page.click("text=Zaloguj się");

    // Login with registered credentials
    await page.fill('[data-testid="email-input"]', "newuser@example.com");
    await page.fill('[data-testid="password-input"]', "NewPassword123!");
    await page.click('[data-testid="login-button"]');

    // Verify successful login
    await expect(page.locator("text=Witaj, Jan")).toBeVisible();
    await expect(page.locator('[data-testid="user-credits"]')).toContainText(
      "10"
    );
  });

  test("should handle login errors appropriately", async ({ page }) => {
    await page.goto("/login");

    // Test with non-existent user
    await page.fill('[data-testid="email-input"]', "nonexistent@example.com");
    await page.fill('[data-testid="password-input"]', "Password123!");
    await page.click('[data-testid="login-button"]');

    await expect(page.locator("text=Nie znaleziono użytkownika")).toBeVisible();
    await expect(page.locator('a:has-text("Zarejestruj się")')).toBeVisible();

    // Test with wrong password
    await page.fill('[data-testid="email-input"]', "existing@example.com");
    await page.fill('[data-testid="password-input"]', "WrongPassword");
    await page.click('[data-testid="login-button"]');

    await expect(page.locator("text=Nieprawidłowe hasło")).toBeVisible();
    await expect(page.locator('a:has-text("Resetuj hasło")')).toBeVisible();
  });

  test("should complete password reset flow", async ({ page }) => {
    await page.goto("/login");
    await page.click("text=Resetuj hasło");

    // Fill reset form
    await page.fill('[data-testid="email-input"]', "user@example.com");
    await page.fill('[data-testid="new-password-input"]', "NewPassword456!");
    await page.click('[data-testid="reset-password-button"]');

    // Verify reset email sent message
    await expect(
      page.locator("text=Link weryfikacyjny został wysłany")
    ).toBeVisible();

    // Simulate clicking verification link (in real test, would check email)
    // This would typically be done via email testing service
  });

  test("should handle session timeout", async ({ page }) => {
    // Login first
    await page.goto("/login");
    await page.fill('[data-testid="email-input"]', "user@example.com");
    await page.fill('[data-testid="password-input"]', "Password123!");
    await page.click('[data-testid="login-button"]');

    await expect(page.locator("text=Witaj")).toBeVisible();

    // Mock session timeout by manipulating sessionStorage
    await page.evaluate(() => {
      // Simulate expired token
      sessionStorage.setItem("auth_token_expires", "0");
    });

    // Trigger activity that checks token
    await page.reload();

    // Verify user is redirected to login
    await expect(page.locator("text=Sesja wygasła")).toBeVisible();
    await expect(page.locator('[data-testid="login-form"]')).toBeVisible();
  });
});
```

#### Cross-Browser Testing

```typescript
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    // Mobile testing
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
```

## Accessibility Testing

### Automated Accessibility Testing

```typescript
// tests/accessibility/auth-accessibility.spec.ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Authentication Accessibility", () => {
  test("login form should be accessible", async ({ page }) => {
    await page.goto("/login");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("registration form should be accessible", async ({ page }) => {
    await page.goto("/register");

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should support keyboard navigation", async ({ page }) => {
    await page.goto("/login");

    // Tab through form elements
    await page.keyboard.press("Tab");
    await expect(page.locator('[data-testid="email-input"]')).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.locator('[data-testid="password-input"]')).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.locator('[data-testid="login-button"]')).toBeFocused();

    // Submit with Enter
    await page.keyboard.press("Enter");
  });

  test("should announce errors to screen readers", async ({ page }) => {
    await page.goto("/login");

    // Submit empty form to trigger validation
    await page.click('[data-testid="login-button"]');

    // Check ARIA live region for error announcement
    const errorMessage = page.locator('[aria-live="polite"]');
    await expect(errorMessage).toContainText("Email jest wymagany");
  });
});
```

### Manual Accessibility Testing Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are clearly visible
- [ ] Color contrast meets WCAG AA standards (4.5:1)
- [ ] Form labels are properly associated
- [ ] Error messages are announced to screen readers
- [ ] Skip links work correctly
- [ ] Page titles are descriptive
- [ ] Heading hierarchy is logical
- [ ] Images have appropriate alt text

## Performance Testing

### Web Vitals Testing

```typescript
// tests/performance/web-vitals.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Performance Tests", () => {
  test("should meet Core Web Vitals thresholds", async ({ page }) => {
    await page.goto("/login");

    // Measure Largest Contentful Paint (LCP)
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ["largest-contentful-paint"] });
      });
    });

    expect(lcp).toBeLessThan(2500); // LCP should be under 2.5s

    // Measure First Input Delay (FID) simulation
    await page.click('[data-testid="email-input"]');
    const fidStart = performance.now();
    await page.type('[data-testid="email-input"]', "test@example.com");
    const fidEnd = performance.now();

    expect(fidEnd - fidStart).toBeLessThan(100); // FID should be under 100ms
  });

  test("should load login page within 2 seconds", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("/login");
    await page.waitForLoadState("networkidle");
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(2000);
  });

  test("should handle multiple rapid API calls without degradation", async ({
    page,
  }) => {
    await page.goto("/login");

    // Simulate rapid form submissions
    const promises = [];
    for (let i = 0; i < 5; i++) {
      promises.push(
        page.evaluate(() => {
          const startTime = performance.now();
          return fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: "test@example.com",
              password: "wrong",
            }),
          }).then(() => performance.now() - startTime);
        })
      );
    }

    const responseTimes = await Promise.all(promises);
    const avgResponseTime =
      responseTimes.reduce((a, b) => a + b) / responseTimes.length;

    expect(avgResponseTime).toBeLessThan(500); // Average response time under 500ms
  });
});
```

## Security Testing

### Security Test Cases

```typescript
// tests/security/auth-security.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Security Tests", () => {
  test("should prevent XSS attacks in input fields", async ({ page }) => {
    await page.goto("/login");

    const xssPayload = '<script>alert("XSS")</script>';

    await page.fill('[data-testid="email-input"]', xssPayload);
    await page.fill('[data-testid="password-input"]', "password");
    await page.click('[data-testid="login-button"]');

    // Verify script is not executed
    const alertDialogs = [];
    page.on("dialog", (dialog) => {
      alertDialogs.push(dialog);
      dialog.dismiss();
    });

    await page.waitForTimeout(1000);
    expect(alertDialogs).toHaveLength(0);
  });

  test("should enforce rate limiting", async ({ page }) => {
    await page.goto("/login");

    // Make rapid login attempts
    for (let i = 0; i < 6; i++) {
      await page.fill('[data-testid="email-input"]', "test@example.com");
      await page.fill('[data-testid="password-input"]', "wrongpassword");
      await page.click('[data-testid="login-button"]');

      if (i < 4) {
        await expect(page.locator("text=Nieprawidłowe hasło")).toBeVisible();
      }
    }

    // 6th attempt should trigger rate limiting
    await expect(page.locator("text=Zbyt wiele prób")).toBeVisible();
  });

  test("should clear sensitive data on logout", async ({ page }) => {
    // Login first
    await page.goto("/login");
    await page.fill('[data-testid="email-input"]', "user@example.com");
    await page.fill('[data-testid="password-input"]', "Password123!");
    await page.click('[data-testid="login-button"]');

    await expect(page.locator("text=Witaj")).toBeVisible();

    // Logout
    await page.click('[data-testid="logout-button"]');

    // Verify sessionStorage is cleared
    const tokenExists = await page.evaluate(() => {
      return sessionStorage.getItem("auth_token") !== null;
    });

    expect(tokenExists).toBe(false);
  });

  test("should validate token expiration", async ({ page }) => {
    await page.goto("/login");

    // Set expired token in sessionStorage
    await page.evaluate(() => {
      sessionStorage.setItem("auth_token", "expired.token.here");
      sessionStorage.setItem("auth_token_expires", "0");
    });

    await page.reload();

    // Should redirect to login due to expired token
    await expect(page.locator('[data-testid="login-form"]')).toBeVisible();
  });
});
```

## Test Data Management

### Test User Data

```typescript
// tests/fixtures/test-data.ts
export const TEST_USERS = {
  validUser: {
    email: "test.user@example.com",
    password: "ValidPassword123!",
    name: "Test User",
    credits: 50,
  },
  adminUser: {
    email: "admin@example.com",
    password: "AdminPassword123!",
    name: "Admin User",
    credits: 1000,
  },
  newUser: {
    email: "new.user@example.com",
    password: "NewPassword123!",
    name: "New User",
    phone: "+48123456789",
  },
};

export const INVALID_PASSWORDS = [
  "short", // Too short
  "nouppercase123!", // No uppercase
  "NOLOWERCASE123!", // No lowercase
  "NoNumbers!", // No numbers
  "NoSpecialChars123", // No special characters
];

export const INVALID_EMAILS = [
  "invalid-email",
  "@example.com",
  "user@",
  "user@.com",
  "user space@example.com",
];
```

### Test Environment Setup

```typescript
// tests/setup/test-environment.ts
import { beforeEach, afterEach } from "vitest";

beforeEach(async () => {
  // Clear sessionStorage before each test
  sessionStorage.clear();

  // Reset any global state
  // Reset fetch mocks
  fetchMock.resetMocks();

  // Set up test-specific environment variables
  process.env.VITE_API_BASE_URL = "http://localhost:3001/api";
});

afterEach(async () => {
  // Clean up after each test
  sessionStorage.clear();

  // Reset timers if using fake timers
  if (vi.isFakeTimers()) {
    vi.useRealTimers();
  }
});
```

## Test Automation CI/CD

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:coverage

      - name: Upload coverage reports
        uses: codecov/codecov-action@v3

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  accessibility-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run accessibility tests
        run: npm run test:a11y
```

## Quality Gates

### Pre-merge Requirements

- [ ] All unit tests pass (minimum 80% coverage)
- [ ] All integration tests pass
- [ ] Critical E2E scenarios pass
- [ ] Accessibility tests pass
- [ ] Security tests pass
- [ ] Performance benchmarks met
- [ ] Code review approved

### Production Deployment Gates

- [ ] Full test suite passes in staging
- [ ] Load testing completed successfully
- [ ] Security scan shows no critical vulnerabilities
- [ ] Accessibility audit completed
- [ ] Performance monitoring shows acceptable metrics

## Test Metrics and Reporting

### Key Test Metrics

- **Test Coverage**: Target 80% minimum
- **Test Execution Time**: Unit tests < 30s, E2E < 10 minutes
- **Test Reliability**: < 5% flaky test rate
- **Bug Escape Rate**: < 5% of bugs reach production

### Test Reporting Dashboard

- Coverage trends over time
- Test execution times
- Flaky test identification
- Performance regression tracking
- Accessibility compliance scores
