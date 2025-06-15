# Development Workflow - System logowania

## Przegląd procesu deweloperskiego

Ten dokument definiuje kompletny workflow deweloperski dla systemu logowania, od rozpoczęcia pracy nad User Story do wdrożenia na produkcję.

---

## 1. Struktura projektu

### Organizacja kodu:

```
/src
├── components/
│   ├── auth/
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── PasswordResetForm.jsx
│   │   └── UserProfile.jsx
│   ├── common/
│   │   ├── LoadingSpinner.jsx
│   │   ├── ErrorMessage.jsx
│   │   └── Modal.jsx
│   └── layout/
├── services/
│   ├── authAPI.js
│   ├── tokenManager.js
│   └── validation.js
├── hooks/
│   ├── useAuth.js
│   ├── useSession.js
│   └── useRateLimit.js
├── utils/
│   ├── constants.js
│   ├── helpers.js
│   └── storage.js
├── styles/
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

---

## 2. Workflow User Story

### Krok 1: Rozpoczęcie pracy nad US

```bash
# 1. Aktualizacja local repo
git checkout develop
git pull origin develop

# 2. Utworzenie feature branch
git checkout -b feature/sprint-X/us-XXX-brief-description

# 3. Przygotowanie workspace
npm install
npm run test
```

### Krok 2: Implementacja

1. **Analiza wymagań** - Przeczytanie US i kryteriów akceptacji
2. **Podział na zadania** - Breakdown na mniejsze task-i
3. **TDD approach** - Napisanie testów przed implementacją
4. **Implementacja funkcjonalności**
5. **Code review własny**

### Krok 3: Testowanie

```bash
# Unit testy
npm run test:unit

# Integration testy
npm run test:integration

# E2E testy (dla krytycznych flow)
npm run test:e2e

# Accessibility testy
npm run test:a11y

# Performance audit
npm run lighthouse
```

### Krok 4: Pull Request

```bash
# Commit z conventional commits
git add .
git commit -m "feat(auth): implement user login functionality

- Add LoginForm component with email/password validation
- Integrate with n8n webhook API
- Handle success/error states
- Store token in sessionStorage
- Display user info after login

Closes US-001"

# Push do remote
git push origin feature/sprint-X/us-XXX-brief-description
```

---

## 3. Standardy kodowania

### JavaScript/React:

```javascript
// ✅ Dobre praktyki
const LoginForm = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authAPI.login(formData);
      tokenManager.store(response.token);
      onSuccess(response.user);
    } catch (error) {
      onError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Formularz logowania">
      {/* Form implementation */}
    </form>
  );
};
```

### Naming Conventions:

- **Components**: PascalCase (`LoginForm`, `UserProfile`)
- **Functions**: camelCase (`handleSubmit`, `validateEmail`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_ENDPOINTS`, `ERROR_MESSAGES`)
- **Files**: kebab-case (`login-form.jsx`, `user-profile.jsx`)

#### Konwencje Nazewnictwa w Programowaniu - wyjaśnienie

---

W programowaniu **spójne konwencje nazewnictwa** są kluczowe dla **czytelności kodu**, **łatwości konserwacji** i **współpracy w zespole**. Dzięki nim inny programista (lub Ty sam za kilka miesięcy!) jest w stanie szybko zrozumieć, czym jest dany element kodu, bez konieczności zagłębiania się w jego szczegóły.

---

##### Components (Komponenty): `PascalCase`

- **Charakterystyka**: Pierwsza litera każdego słowa w nazwie jest wielka, nie ma spacji ani łączników.
- **Przykłady**: `LoginForm`, `UserProfile`, `HeaderNav`, `ProductCard`.
- **Zastosowanie**: Ta konwencja jest powszechnie używana do nazywania **komponentów interfejsu użytkownika** (szczególnie w bibliotekach takich jak React, Vue czy Angular). Komponenty reprezentują niezależne, wielokrotnego użytku części UI. Użycie `PascalCase` odróżnia je od zwykłych funkcji czy zmiennych.

---

##### Functions (Funkcje): `camelCase`

- **Charakterystyka**: Pierwsza litera pierwszego słowa jest mała, a pierwsza litera każdego kolejnego słowa jest wielka.
- **Przykłady**: `handleSubmit`, `validateEmail`, `fetchUserData`, `calculateTotalPrice`.
- **Zastosowanie**: Jest to standardowa konwencja dla **nazw funkcji i zmiennych** w wielu językach programowania (w tym JavaScript). Dzięki `camelCase` łatwo rozpoznać, że dany identyfikator odnosi się do akcji (funkcji) lub wartości (zmiennej).

---

##### Constants (Stałe): `SCREAMING_SNAKE_CASE`

- **Charakterystyka**: Wszystkie litery są wielkie, a słowa są oddzielone podkreślnikami (`_`).
- **Przykłady**: `API_ENDPOINTS`, `ERROR_MESSAGES`, `MAX_RETRIES`, `DEFAULT_THEME`.
- **Zastosowanie**: Ta konwencja jest używana dla **wartości, które nie zmieniają się w trakcie działania programu** (stałych). Widząc nazwę zapisaną w `SCREAMING_SNAKE_CASE`, od razu wiadomo, że jest to stała wartość, która nie powinna być modyfikowana.

---

##### Files (Pliki): `kebab-case`

- **Charakterystyka**: Wszystkie litery są małe, a słowa są oddzielone łącznikami (`-`).
- **Przykłady**: `login-form.jsx`, `user-profile.jsx`, `api-utils.js`, `product-list.css`.
- **Zastosowanie**: Ta konwencja jest często stosowana do nazywania **plików i katalogów**. Jest czytelna w systemach plików (szczególnie w środowiskach uniksowych) i pozwala uniknąć problemów z wielkością liter na różnych systemach operacyjnych.

### Error Handling Pattern:

```javascript
const authAPI = {
  async login(credentials) {
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new APIError(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new NetworkError("Problemy z połączeniem sieciowym");
    }
  },
};
```

---

## 4. Proces testowania

### Test Pyramid Strategy:

```
        /\
       /  \
      / E2E \     <- 10% - Critical user flows
     /______\
    /        \
   /Integration\ <- 20% - API integration, hooks
  /____________\
 /              \
/  Unit Tests    \  <- 70% - Components, utilities, helpers
/________________\
```

### Test Templates:

**Unit Test Example:**

```javascript
// tests/unit/components/LoginForm.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "../../../src/components/auth/LoginForm";

describe("LoginForm", () => {
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form with required fields", () => {
    render(<LoginForm onSuccess={mockOnSuccess} onError={mockOnError} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hasło/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /zaloguj/i })
    ).toBeInTheDocument();
  });

  test("validates email format before submission", async () => {
    render(<LoginForm onSuccess={mockOnSuccess} onError={mockOnError} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "invalid-email" },
    });

    fireEvent.click(screen.getByRole("button", { name: /zaloguj/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/nieprawidłowy format email/i)
      ).toBeInTheDocument();
    });
  });
});
```

**Integration Test Example:**

```javascript
// tests/integration/auth-flow.test.js
import { renderHook, act } from "@testing-library/react";
import { useAuth } from "../../src/hooks/useAuth";
import * as authAPI from "../../src/services/authAPI";

jest.mock("../../src/services/authAPI");

describe("Auth Integration", () => {
  test("complete login flow updates user state", async () => {
    const mockUser = { name: "Jan", credits: 100, token: "abc123" };
    authAPI.login.mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login("test@example.com", "password123");
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

---

## 5. Code Review Checklist

### Przed PR:

- [ ] Wszystkie testy przechodzą
- [ ] Code coverage > 80%
- [ ] Brak console.log/debugger
- [ ] ESLint warnings = 0
- [ ] Accessibility audit passed
- [ ] Performance check completed

### Review Criteria:

**Funkcjonalność:**

- [ ] Spełnia wszystkie kryteria akceptacji US
- [ ] Edge cases są obsłużone
- [ ] Error handling jest kompletny
- [ ] Loading states są zaimplementowane

**Kod Quality:**

- [ ] DRY principle
- [ ] Single Responsibility
- [ ] Readable variable/function names
- [ ] Proper error messages
- [ ] Comments dla complex logic

**Security:**

- [ ] Brak hardcoded secrets
- [ ] Input validation
- [ ] XSS prevention
- [ ] CSRF protection gdzie applicable

**Performance:**

- [ ] No unnecessary re-renders
- [ ] Efficient API calls
- [ ] Proper memoization
- [ ] Bundle size impact analyzed

**Accessibility:**

- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast compliance

---

## 6. Deployment Workflow

### Environment Strategy:

```
Development → Staging → Production
     ↓           ↓         ↓
  localhost   staging.app  app.com
```

### Pre-deployment Checklist:

- [ ] All tests pass in CI/CD
- [ ] Security scan completed
- [ ] Performance benchmarks met
- [ ] Database migrations ready (if any)
- [ ] Rollback plan prepared
- [ ] Monitoring alerts configured

### Deployment Commands:

```bash
# Staging deployment
npm run build:staging
npm run deploy:staging

# Production deployment (requires approval)
npm run build:production
npm run deploy:production

# Rollback (if needed)
npm run rollback:production
```

---

## 7. Monitoring i Debugging

### Error Tracking:

```javascript
// utils/errorReporting.js
export const reportError = (error, context = {}) => {
  console.error("Error occurred:", error);

  // Send to monitoring service
  if (process.env.NODE_ENV === "production") {
    analytics.track("Error", {
      message: error.message,
      stack: error.stack,
      context,
      userId: getCurrentUserId(),
      timestamp: new Date().toISOString(),
    });
  }
};
```

### Performance Monitoring:

```javascript
// utils/performance.js
export const trackPerformance = (eventName, startTime) => {
  const duration = performance.now() - startTime;

  analytics.track("Performance", {
    event: eventName,
    duration,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
  });
};
```

### Debug Setup:

```javascript
// Development tylko
if (process.env.NODE_ENV === "development") {
  window.debugAuth = {
    getToken: () => sessionStorage.getItem("auth_token"),
    clearSession: () => sessionStorage.clear(),
    simulateError: (type) => {
      /* debug helpers */
    },
  };
}
```

---

## 8. Communication & Documentation

### Daily Standup Format:

- **Wczoraj**: Co zostało ukończone (US/task level)
- **Dzisiaj**: Co planuję zrobić
- **Blockers**: Co mnie blokuje + potrzebna pomoc

### Sprint Review:

- Demo działających funkcjonalności
- Metrics: velocity, bug count, test coverage
- Retrospective: what went well/poorly
- Planning następnego sprintu

### Documentation Updates:

- README.md - setup instructions
- API.md - endpoint documentation
- CHANGELOG.md - release notes
- Wiki - architecture decisions

---

## 9. Quality Gates

### Definition of Done:

- [ ] Funkcjonalność spełnia kryteria akceptacji
- [ ] Code review approved
- [ ] Unit tests napisane i przechodzą
- [ ] Integration tests (jeśli applicable)
- [ ] Accessibility requirements spełnione
- [ ] Performance requirements spełnione
- [ ] Security review passed
- [ ] Documentation updated
- [ ] Deployed na staging i przetestowane
- [ ] Product Owner acceptance

### Metrics do śledzenia:

- **Velocity**: Story points per sprint
- **Quality**: Bug rate, test coverage
- **Performance**: Load times, API response times
- **Security**: Vulnerabilities count
- **User Experience**: Error rates, success rates

---

## 10. Troubleshooting Guide

### Częste problemy:

**Problem**: Tests failing w CI/CD ale przechodzą lokalnie
**Rozwiązanie**:

```bash
# Sprawdź environment variables
npm run test:ci
# Sprawdź Node.js version
# Sprawdź timing issues w async tests
```

**Problem**: Webpack build errors
**Rozwiązanie**:

```bash
# Clear cache
rm -rf node_modules/.cache
rm -rf dist/
npm run build:clean
```

**Problem**: API integration issues
**Rozwiązanie**:

```bash
# Test endpoints manually
curl -X POST "https://n8n-aipulse.up.railway.app/webhook-test/c0c755cf-deb8-4952-8f71-c88943566d72" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

---

## 11. Emergency Procedures

### Production Hotfix:

```bash
# 1. Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-fix

# 2. Implement minimal fix
# 3. Test thoroughly
# 4. Deploy immediately
# 5. Merge back to main and develop
```

### Rollback Procedure:

```bash
# Quick rollback
npm run rollback:production

# Manual rollback
git checkout [previous-stable-commit]
npm run deploy:production
```

### Incident Response:

1. **Assess impact** - How many users affected?
2. **Quick fix** or **rollback decision**
3. **Communication** - Status page update
4. **Post-mortem** - Root cause analysis
5. **Prevention** - Update procedures

---

Ten workflow zapewnia kompletny, profesjonalny proces deweloperski dla Twojego systemu logowania, od kodu do produkcji.
