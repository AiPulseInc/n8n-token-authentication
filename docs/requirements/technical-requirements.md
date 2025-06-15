# Wymagania techniczne - System logowania

## 1. API Specifications

### 1.1 Endpointy webhooków n8n

#### Logowanie użytkownika

- **URL**: `https://n8n-aipulse.up.railway.app/webhook-test/c0c755cf-deb8-4952-8f71-c88943566d72`
- **Metoda**: POST
- **Content-Type**: application/json
- **Request format**:

```json
{
  "email": "user@example.com",
  "password": "securePassword123!"
}
```

- **Response format (success)**:

```json
{
  "status": "success",
  "data": {
    "name": "Jan Kowalski",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "credits": 150
  }
}
```

- **Response format (error)**:

```json
{
  "status": "error",
  "error": "user_not_found | invalid_password",
  "message": "Nie znaleziono użytkownika"
}
```

#### Inicjowanie resetowania hasła

- **URL**: `https://n8n-aipulse.up.railway.app/webhook-test/014d8471-1c76-46c9-b15f-1009a131ce4f`
- **Metoda**: POST
- **Content-Type**: application/json
- **Request format**:

```json
{
  "email": "user@example.com",
  "newPassword": "newSecurePassword123!"
}
```

- **Response format**:

```json
{
  "status": "success | error",
  "message": "Link weryfikacyjny został wysłany | Nie znaleziono konta"
}
```

#### Aktywacja nowego hasła

- **URL**: `https://n8n-aipulse.up.railway.app/webhook-test/5ca54e07-d8d5-45d6-bafe-642b209f234a`
- **Metoda**: POST
- **Content-Type**: application/json
- **Request format**: Parametry przekazywane przez link w emailu
- **Response format**:

```json
{
  "status": "success | error",
  "message": "Hasło zostało zmienione | Link wygasł"
}
```

#### Rejestracja nowego użytkownika

- **URL**: `https://n8n-aipulse.up.railway.app/webhook-test/cc9d3a99-22b4-4cf3-97ee-33af0405451d`
- **Metoda**: POST
- **Content-Type**: application/json
- **Request format**:

```json
{
  "email": "user@example.com",
  "password": "securePassword123!",
  "name": "Jan Kowalski",
  "phone": "+48123456789"
}
```

- **Response format**:

```json
{
  "status": "success | error",
  "error": "email_exists",
  "message": "Konto zostało utworzone | Email już istnieje"
}
```

#### Weryfikacja emaila przy rejestracji

- **URL**: `https://n8n-aipulse.up.railway.app/webhook-test/66086a0b-da58-4fa5-9132-242db2618345`
- **Metoda**: POST
- **Content-Type**: application/json
- **Request format**: Parametry przekazywane przez link w emailu
- **Response format**:

```json
{
  "status": "success | error",
  "message": "Konto zostało aktywowane | Link wygasł"
}
```

### 1.2 Timeout i retry logic

- **Request timeout**: 30 sekund
- **Retry attempts**: Maksymalnie 3 próby
- **Retry delay**: Exponential backoff (1s, 2s, 4s)
- **Error codes**:
  - 200: Success/Business error
  - 400-499: Client errors (no retry)
  - 500-599: Server errors (retry enabled)

---

## 2. Security Requirements

### 2.1 Polityka haseł

- **Minimalna długość**: 8 znaków
- **Wymagane znaki**:
  - Co najmniej jedna duża litera (A-Z)
  - Co najmniej jedna cyfra (0-9)
  - Co najmniej jeden znak specjalny: `!@#$%^&*()_+-=[]{}|;:,.<>?`
- **Regex pattern**:

```regex
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{}|;:,.<>?]{8,}$
```

### 2.2 Session Management

- **Storage method**: sessionStorage (client-side only)
- **Token expiration**: 5 minut bezczynności
- **Activity tracking**:
  - Mouse movements
  - Keyboard input
  - Click events
  - Scroll events
- **Session warning**: 1 minuta przed wygaśnięciem
- **Cleanup**: Automatyczne usunięcie przy zamknięciu przeglądarki

### 2.3 Rate Limiting

```javascript
// Rate limiting rules
const rateLimits = {
  login: {
    maxAttempts: 5,
    windowMinutes: 15,
    blockDurationMinutes: 60,
  },
  passwordReset: {
    maxAttempts: 3,
    windowMinutes: 60,
    blockDurationMinutes: 60,
  },
  registration: {
    maxAttempts: 2,
    windowMinutes: 10,
    blockDurationMinutes: 30,
  },
};
```

### 2.4 Data Validation

- **Email validation**: RFC 5322 compliant
- **Input sanitization**: HTML encoding for display
- **XSS prevention**: Content Security Policy headers
- **CSRF protection**: SameSite cookies (if applicable)

---

## 3. Performance Requirements

### 3.1 Response Times

- **API calls**: Maksymalnie 3 sekundy
- **Form validation**: Real-time (< 300ms)
- **Page load**: < 2 sekundy (initial load)
- **JavaScript execution**: < 100ms dla user interactions

### 3.2 Client-side Performance

```javascript
// Performance budgets
const performanceBudgets = {
  bundleSize: "500KB", // Compressed
  firstContentfulPaint: "1.5s",
  largestContentfulPaint: "2.5s",
  firstInputDelay: "100ms",
  cumulativeLayoutShift: "0.1",
};
```

### 3.3 Optimization Strategies

- **Code splitting**: Lazy loading dla niekrityanych komponentów
- **Debounced validation**: 300ms delay dla real-time feedback
- **Request caching**: sessionStorage dla form data backup
- **Minification**: CSS i JavaScript compression
- **Image optimization**: WebP format, lazy loading

---

## 4. Browser Compatibility

### 4.1 Supported Browsers

- **Chrome**: 90+ (95% support)
- **Firefox**: 90+ (85% support)
- **Safari**: 14+ (80% support)
- **Edge**: 90+ (85% support)
- **Mobile Safari**: iOS 14+ (75% support)
- **Chrome Mobile**: Android 90+ (85% support)

### 4.2 Required APIs

```javascript
// Feature detection
const requiredFeatures = {
  sessionStorage: typeof Storage !== "undefined",
  fetch: typeof fetch !== "undefined",
  es6Modules: typeof Symbol !== "undefined",
  customElements: typeof customElements !== "undefined",
};
```

### 4.3 Polyfills

- **fetch**: Dla starszych przeglądarek
- **Promise**: IE11 support (jeśli wymagany)
- **Object.assign**: Legacy browser support
- **Array.includes**: ES2016 compatibility

---

## 5. Data Storage Specifications

### 5.1 Client-side Storage

```javascript
// sessionStorage structure
const sessionData = {
  authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  userInfo: {
    name: "Jan Kowalski",
    credits: 150,
    loginTime: "2025-06-15T10:30:00Z",
  },
  sessionActivity: {
    lastActivity: "2025-06-15T10:35:00Z",
    warningShown: false,
  },
};

// localStorage (backup only)
const backupData = {
  formData: {
    email: "user@example.com",
    timestamp: "2025-06-15T10:30:00Z",
  },
  rateLimitCounters: {
    login: { count: 2, resetTime: "2025-06-15T10:45:00Z" },
    passwordReset: { count: 1, resetTime: "2025-06-15T11:30:00Z" },
    registration: { count: 0, resetTime: null },
  },
};
```

### 5.2 Data Encryption

- **Token storage**: Plain text w sessionStorage (HTTPS transport)
- **Sensitive data**: Nie przechowywane client-side
- **Form data backup**: Tylko email (nie hasła)
- **Rate limiting**: Encrypted counters w localStorage

### 5.3 Data Retention

- **Session data**: Usuwane przy zamknięciu przeglądarki
- **Backup data**: TTL 24 godziny
- **Rate limit data**: TTL zgodny z window period
- **Analytics data**: Anonimizowane po 30 dniach

---

## 6. Infrastructure Requirements

### 6.1 Hosting Environment

- **Frontend**: Static hosting (Vercel, Netlify, CloudFlare Pages)
- **CDN**: Global content delivery network
- **SSL/TLS**: Minimum TLS 1.2
- **Domain**: HTTPS required dla production

### 6.2 External Dependencies

```json
{
  "dependencies": {
    "core": "vanilla JavaScript ES2020+",
    "validation": "built-in HTML5 + custom regex",
    "http": "native fetch API",
    "storage": "native Web Storage API"
  },
  "optional": {
    "analytics": "Google Analytics | Mixpanel",
    "monitoring": "Sentry | LogRocket",
    "validation": "external email validation API"
  }
}
```

### 6.3 Network Requirements

- **Bandwidth**: Minimum 1 Mbps dla użytkownika
- **Latency**: < 200ms do n8n endpoints
- **Availability**: 99.5% uptime requirement
- **Load balancing**: n8n webhook load distribution

---

## 7. Error Handling Standards

### 7.1 Error Categories

```javascript
const errorTypes = {
  NETWORK_ERROR: "network_error",
  VALIDATION_ERROR: "validation_error",
  BUSINESS_ERROR: "business_error",
  AUTHENTICATION_ERROR: "auth_error",
  RATE_LIMIT_ERROR: "rate_limit_error",
  TIMEOUT_ERROR: "timeout_error",
};
```

### 7.2 Error Response Format

```javascript
// Standardized error response
const errorResponse = {
  success: false,
  error: {
    type: "VALIDATION_ERROR",
    code: "INVALID_EMAIL",
    message: "Podany adres email jest nieprawidłowy",
    field: "email", // for form errors
    retryable: false,
    timestamp: "2025-06-15T10:30:00Z",
  },
};
```

### 7.3 Error Recovery Strategies

```javascript
const recoveryStrategies = {
  NETWORK_ERROR: "retry_with_backoff",
  TIMEOUT_ERROR: "retry_once",
  RATE_LIMIT_ERROR: "show_countdown_timer",
  VALIDATION_ERROR: "highlight_field_and_focus",
  BUSINESS_ERROR: "show_message_with_actions",
};
```

---

## 8. Responsive Design Requirements

### 8.1 Breakpoints

```css
/* Standard breakpoints */
@media (max-width: 480px) {
  /* Mobile */
}
@media (min-width: 481px) and (max-width: 768px) {
  /* Tablet */
}
@media (min-width: 769px) and (max-width: 1024px) {
  /* Desktop */
}
@media (min-width: 1025px) {
  /* Large Desktop */
}
```

### 8.2 Touch Interface Requirements

- **Minimum touch target**: 44px x 44px
- **Touch gestures**: Tap, swipe (dla modal dismiss)
- **Keyboard support**: Virtual keyboard compatibility
- **Zoom support**: Pinch-to-zoom allowed

### 8.3 Layout Specifications

```css
/* Form layout requirements */
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-field {
  margin-bottom: 16px;
  min-height: 44px; /* Touch friendly */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}
```

---

## 9. Accessibility (A11y) Technical Requirements

### 9.1 WCAG 2.1 Compliance

- **Level**: AA compliance required
- **Color contrast**: Minimum 4.5:1 ratio
- **Focus indicators**: 2px solid outline
- **Text scaling**: Support up to 200% zoom

### 9.2 ARIA Implementation

```html
<!-- Form accessibility example -->
<form role="form" aria-labelledby="login-heading">
  <h2 id="login-heading">Logowanie do systemu</h2>

  <div class="form-field">
    <label for="email" id="email-label">Email</label>
    <input
      id="email"
      type="email"
      aria-labelledby="email-label"
      aria-describedby="email-error"
      aria-invalid="false"
      required
    />
    <div id="email-error" role="alert" aria-live="polite"></div>
  </div>
</form>
```

### 9.3 Keyboard Navigation

```javascript
// Keyboard navigation requirements
const keyboardSupport = {
  TAB: "navigate_forward",
  SHIFT_TAB: "navigate_backward",
  ENTER: "submit_form",
  ESCAPE: "close_modal",
  SPACE: "activate_button",
  ARROW_KEYS: "navigate_options",
};
```

---

## 10. Monitoring and Logging

### 10.1 Client-side Logging

```javascript
// Logging configuration
const logConfig = {
  level: "INFO", // DEBUG, INFO, WARN, ERROR
  targets: ["console", "remote"],
  remoteEndpoint: "https://logs.example.com/api/log",
  includeUserAgent: true,
  includeTimestamp: true,
  includePage: true,
};

// Log structure
const logEntry = {
  timestamp: "2025-06-15T10:30:00Z",
  level: "INFO",
  category: "AUTH",
  event: "LOGIN_ATTEMPT",
  userId: "hashed_user_id",
  sessionId: "session_123",
  data: {
    success: true,
    responseTime: 1250,
    endpoint: "/webhook-test/c0c755cf...",
  },
};
```

### 10.2 Performance Monitoring

```javascript
// Core Web Vitals tracking
const performanceMetrics = {
  FCP: "First Contentful Paint",
  LCP: "Largest Contentful Paint",
  FID: "First Input Delay",
  CLS: "Cumulative Layout Shift",
  TTFB: "Time to First Byte",
};

// Custom metrics
const customMetrics = {
  authFlowDuration: "Time from form display to successful login",
  formValidationTime: "Time for client-side validation",
  apiResponseTime: "n8n webhook response time",
  errorRecoveryTime: "Time to recover from network errors",
};
```

### 10.3 Error Tracking

```javascript
// Error tracking configuration
const errorTracking = {
  captureUnhandledRejections: true,
  captureUnhandledExceptions: true,
  captureConsoleErrors: true,
  captureNetworkErrors: true,
  maxBreadcrumbs: 50,
  beforeSend: (event) => {
    // Remove sensitive data
    if (event.request?.data?.password) {
      event.request.data.password = "[REDACTED]";
    }
    return event;
  },
};
```

---

## 11. Security Headers and CSP

### 11.1 Content Security Policy

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://n8n-aipulse.up.railway.app;
  style-src 'self' 'unsafe-inline';
  font-src 'self' data:;
  img-src 'self' data: https:;
  connect-src 'self' https://n8n-aipulse.up.railway.app https://api.analytics.com;
  frame-ancestors 'none';
```

### 11.2 Security Headers

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### 11.3 CORS Configuration

```javascript
// Expected CORS headers from n8n
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://yourdomain.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "3600",
};
```

---

## 12. Development and Build Requirements

### 12.1 Build Configuration

```json
{
  "build": {
    "target": "es2020",
    "moduleResolution": "bundler",
    "minify": true,
    "sourcemaps": true,
    "treeShaking": true,
    "codesplitting": true
  },
  "optimization": {
    "bundleAnalyzer": true,
    "compressionPlugin": "gzip",
    "imageOptimization": true,
    "cssMinification": true
  }
}
```

### 12.2 Environment Variables

```bash
# Environment configuration
NODE_ENV=production
API_BASE_URL=https://n8n-aipulse.up.railway.app
WEBHOOK_LOGIN=c0c755cf-deb8-4952-8f71-c88943566d72
WEBHOOK_PASSWORD_RESET=014d8471-1c76-46c9-b15f-1009a131ce4f
WEBHOOK_PASSWORD_ACTIVATE=5ca54e07-d8d5-45d6-bafe-642b209f234a
WEBHOOK_REGISTER=cc9d3a99-22b4-4cf3-97ee-33af0405451d
WEBHOOK_EMAIL_VERIFY=66086a0b-da58-4fa5-9132-242db2618345
ANALYTICS_ID=GA_MEASUREMENT_ID
SENTRY_DSN=https://sentry.io/dsn
```

### 12.3 Testing Requirements

```javascript
// Test coverage requirements
const testCoverage = {
  statements: "90%",
  branches: "85%",
  functions: "90%",
  lines: "90%",
};

// Test types required
const testTypes = {
  unit: "Jest/Vitest - component logic",
  integration: "API integration tests",
  e2e: "Playwright/Cypress - user flows",
  accessibility: "axe-core automated testing",
  performance: "Lighthouse CI",
  security: "OWASP ZAP scanning",
};
```
