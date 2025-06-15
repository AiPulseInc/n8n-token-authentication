# Wymagania techniczne - System logowania (Wersja 2)

## 1. Stack technologiczny (Rozszerzony Wersja 2)

### 1.1 Frontend Framework

```javascript
// Podstawowy stack (bez zmian)
const techStack = {
  framework: "React 18+",
  language: "TypeScript 5.0+",
  bundler: "Vite 4.0+",
  styling: "CSS Modules + Tailwind CSS",
  testing: "Vitest + React Testing Library",
  e2e: "Playwright",
};

// Nowe wymagania Wersja 2
const enhancedStack = {
  analytics: "Google Analytics 4 + Custom Events", // ⭐️ NOWE
  monitoring: "Sentry + Performance Monitoring", // ⭐️ NOWE
  validation: "Zod + Real-time validation", // ⭐️ NOWE
  caching: "React Query + Service Worker", // ⭐️ NOWE
  accessibility: "axe-core + ARIA Live Regions", // ⭐️ Rozszerzone
};
```

### 1.2 API Integration (Rozszerzone Wersja 2)

```javascript
// Istniejące endpointy
const existingEndpoints = {
  LOGIN: "/webhook-test/c0c755cf-deb8-4952-8f71-c88943566d72",
  REGISTER: "/webhook-test/cc9d3a99-22b4-4cf3-97ee-33af0405451d",
  RESET_INIT: "/webhook-test/014d8471-1c76-46c9-b15f-1009a131ce4f",
  RESET_ACTIVATE: "/webhook-test/5ca54e07-d8d5-45d6-bafe-642b209f234a",
  VERIFY_EMAIL: "/webhook-test/66086a0b-da58-4fa5-9132-242db2618345",
};

// Nowe endpointy Wersja 2 ⭐️
const newEndpoints = {
  RESEND_ACTIVATION: "/webhook-test/resend-activation-email",
  VERIFY_PROMO_CODE: "/webhook-test/verify-promo-code",
  ACTIVATE_PROMO_CODE: "/webhook-test/activate-promo-code",
  GET_PROMO_STATUS: "/webhook-test/get-promo-status",
  ANALYTICS_TRACK: "/webhook-test/track-analytics-event",
};
```

### 1.3 State Management (Rozszerzone Wersja 2)

```typescript
// Rozszerzony state o nowe funkcjonalności
interface AppState {
  // Existing state
  user: UserState;
  auth: AuthState;
  session: SessionState;

  // New state structures ⭐️ Wersja 2
  promoCode: PromoCodeState;
  accountActivation: AccountActivationState;
  analytics: AnalyticsState;
}

interface PromoCodeState {
  currentCode: string | null;
  validationStatus: "idle" | "validating" | "valid" | "invalid";
  activationHistory: PromoActivation[];
  rateLimitStatus: RateLimitInfo;
  errors: PromoCodeError[];
}

interface AccountActivationState {
  isActive: boolean;
  resendCount: number;
  lastResendTime: Date | null;
  rateLimitedUntil: Date | null;
}
```

## 2. Wymagania dotyczące wydajności (Zaktualizowane Wersja 2)

### 2.1 Loading Times (Rozszerzone)

```javascript
const performanceRequirements = {
  // Existing requirements
  initialPageLoad: "< 2 sekund",
  formSubmission: "< 3 sekundy",
  apiResponse: "< 500ms (95th percentile)",

  // New requirements ⭐️ Wersja 2
  promoCodeValidation: "< 300ms (realtime)",
  promoCodeActivation: "< 1 sekunda",
  activationEmailResend: "< 2 sekundy",
  analyticsEventTracking: "< 100ms (non-blocking)",
  rateLimit checking: "< 50ms (cached)"
};
```

### 2.2 Responsiveness (Rozszerzone)

```javascript
const responsiveRequirements = {
  // Enhanced for new features
  userInteraction: "< 100ms feedback",
  formValidation: "< 200ms realtime",
  promoCodeFeedback: "< 150ms visual response", // ⭐️ NOWE
  errorRecovery: "< 1 sekunda",
  networkRetry: "exponential backoff starting 1s",
};
```

### 2.3 Scalability (Nowe wymagania Wersja 2)

```javascript
const scalabilityRequirements = {
  concurrentUsers: 1000, // bez zmian
  promoCodeValidations: "500/minute peak", // ⭐️ NOWE
  analyticsEvents: "10,000/minute", // ⭐️ NOWE
  activationEmailResends: "100/minute", // ⭐️ NOWE
  cacheHitRatio: "> 80% for promo validations", // ⭐️ NOWE
};
```

## 3. Bezpieczeństwo (Rozszerzone Wersja 2)

### 3.1 Rate Limiting (Znacznie rozszerzone)

```javascript
const rateLimitingRules = {
  // Existing rules
  login: {
    maxAttempts: 5,
    windowMinutes: 15,
    blockDurationMinutes: 15,
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

  // New rules ⭐️ Wersja 2
  promoCodeVerification: {
    maxAttempts: 10,
    windowMinutes: 15,
    blockDurationMinutes: 120,
    perUserLimit: 20, // per day
  },
  promoCodeActivation: {
    maxAttempts: 5,
    windowMinutes: 60,
    blockDurationMinutes: 120,
    perUserLimit: 5, // per hour
  },
  resendActivation: {
    maxAttempts: 3,
    windowMinutes: 60,
    blockDurationMinutes: 60,
  },
  analyticsEvents: {
    maxEvents: 100,
    windowMinutes: 1,
    burstAllowance: 10,
  },
};
```

### 3.2 Input Validation (Rozszerzone Wersja 2)

```typescript
// Enhanced validation schemas
const validationSchemas = {
  // Existing schemas...

  // New schemas ⭐️ Wersja 2
  promoCode: {
    format: /^[A-Z0-9]{6,12}$/,
    sanitization: "uppercase + alphanumeric only",
    maxLength: 12,
    minLength: 6,
    blacklist: ["ADMIN", "TEST", "DEBUG"],
  },

  analyticsEvent: {
    eventName: "string, max 50 chars",
    properties: "object, max 10 properties",
    timestamp: "ISO 8601 format",
    userId: "UUID format if present",
  },
};
```

### 3.3 Data Protection (Rozszerzone Wersja 2)

```javascript
const dataProtection = {
  // Existing protection...

  // New protection measures ⭐️ Wersja 2
  promoCodeStorage: {
    localStorage: false, // Never store promo codes locally
    sessionStorage: false, // Never store promo codes in session
    memory: 'clear on page unload',
    transmission: 'HTTPS only with request signing'
  },

  analyticsData: {
    piiScrubbing: 'automatic',
    retention: '90 days maximum',
    anonymization: 'IP address masked',
    consent: 'explicit opt-in required'
  },

  auditLogging: {
    promoActivations: 'full audit trail',
    failedAttempts: 'logged with IP and timestamp',
    rateLimit violations: 'security alert triggered'
  }
};
```

## 4. API Integration (Rozszerzone Wersja 2)

### 4.1 Request/Response Format (Rozszerzony)

```typescript
// New API request formats ⭐️ Wersja 2

interface PromoCodeVerifyRequest {
  promoCode: string;
  userId?: string; // Optional for verification
  context: "registration" | "login";
  timestamp: string;
  signature: string; // HMAC for security
}

interface PromoCodeVerifyResponse {
  valid: boolean;
  code: string;
  credits: number;
  expiryDate: string;
  alreadyUsed: boolean;
  error?: PromoCodeError;
}

interface PromoCodeActivateRequest {
  promoCode: string;
  userId: string;
  userEmail: string;
  context: "registration" | "login";
  timestamp: string;
  signature: string;
}

interface PromoCodeActivateResponse {
  success: boolean;
  creditsAdded: number;
  totalCredits: number;
  activationId: string;
  error?: PromoCodeError;
}

interface ResendActivationRequest {
  email: string;
  promoCode?: string; // Preserve promo code for activation
  timestamp: string;
  signature: string;
}

// Enhanced existing request formats
interface LoginRequest {
  email: string;
  password: string;
  promoCode?: string; // ⭐️ NOWE pole
  timestamp: string;
  signature: string;
}

interface RegistrationRequest {
  email: string;
  password: string;
  firstName: string;
  phone?: string;
  promoCode?: string; // ⭐️ NOWE pole
  timestamp: string;
  signature: string;
}
```

### 4.2 Error Handling (Znacznie rozszerzone Wersja 2)

```typescript
// Enhanced error types
interface PromoCodeError {
  type:
    | "INVALID_CODE"
    | "EXPIRED"
    | "ALREADY_USED"
    | "RATE_LIMITED"
    | "ACTIVATION_FAILED";
  code: string;
  message: string;
  details?: {
    expiryDate?: string;
    usageDate?: string;
    retryAfter?: number; // seconds
    maxAttemptsReached?: boolean;
  };
}

interface AccountActivationError {
  type: "EMAIL_NOT_FOUND" | "ALREADY_ACTIVE" | "RATE_LIMITED" | "SEND_FAILED";
  message: string;
  retryAfter?: number;
  attemptsRemaining?: number;
}

interface AnalyticsError {
  type: "TRACKING_FAILED" | "INVALID_EVENT" | "RATE_LIMITED";
  event: string;
  message: string;
  recoverable: boolean;
}
```

### 4.3 Timeout and Retry Logic (Rozszerzone Wersja 2)

```javascript
const apiConfiguration = {
  // Existing timeouts...

  // New timeout configurations ⭐️ Wersja 2
  promoCodeValidation: {
    timeout: 5000, // 5 seconds
    retries: 2,
    retryDelay: 1000, // 1 second
    circuitBreaker: true,
  },

  promoCodeActivation: {
    timeout: 10000, // 10 seconds
    retries: 3,
    retryDelay: 2000, // 2 seconds
    exponentialBackoff: true,
  },

  activationEmailResend: {
    timeout: 15000, // 15 seconds
    retries: 2,
    retryDelay: 3000, // 3 seconds
    rateLimit: true,
  },

  analyticsTracking: {
    timeout: 3000, // 3 seconds
    retries: 1,
    retryDelay: 500,
    nonBlocking: true, // Don't block UI
    queueOnFailure: true,
  },
};
```

## 5. Client-side Storage (Rozszerzone Wersja 2)

### 5.1 Session Storage (Rozszerzone)

```typescript
interface SessionData {
  // Existing data
  authToken: string;
  userInfo: UserInfo;
  sessionExpiry: number;

  // New data ⭐️ Wersja 2
  accountActivationStatus: {
    isActive: boolean;
    pendingPromoCode?: string; // Stored until activation
    resendAttempts: number;
    lastResendTime?: number;
  };

  analyticsSession: {
    sessionId: string;
    startTime: number;
    eventQueue: AnalyticsEvent[]; // Offline queue
  };
}

// Security rules for new data
const storageSecurityRules = {
  promoCode: "NEVER_STORE", // ⭐️ CRITICAL
  activationStatus: "SESSION_ONLY",
  analyticsEvents: "TEMPORARY_QUEUE_ONLY",
  rateLimitInfo: "MEMORY_ONLY",
};
```

### 5.2 Memory Management (Nowe Wersja 2)

```javascript
const memoryManagement = {
  promoCodeCache: {
    maxSize: 100, // Recent validations
    ttl: 300000, // 5 minutes
    encryption: true,
  },

  rateLimitCache: {
    maxSize: 1000, // Rate limit states
    ttl: 900000, // 15 minutes
    cleanupInterval: 60000, // 1 minute
  },

  analyticsQueue: {
    maxEvents: 50, // Offline queue size
    batchSize: 10, // Events per batch
    flushInterval: 30000, // 30 seconds
    priorityLevels: ["critical", "normal", "low"],
  },
};
```

## 6. User Experience Requirements (Rozszerzone Wersja 2)

### 6.1 Loading States (Znacznie rozszerzone)

```typescript
interface LoadingStates {
  // Existing states
  login: "Logowanie...";
  registration: "Tworzenie konta...";
  passwordReset: "Wysyłanie emaila...";

  // New states ⭐️ Wersja 2
  promoCodeValidation: "Sprawdzanie kodu promocyjnego...";
  promoCodeActivation: "Aktywowanie kodu promocyjnego...";
  activationEmailResend: "Wysyłanie emaila aktywacyjnego...";
  analyticsTracking: "Zapisywanie danych...";
  rateLimit: "Sprawdzanie limitów...";
}

interface ProgressIndicators {
  // Enhanced progress indicators
  promoCodeFlow: {
    steps: ["Wprowadzenie", "Walidacja", "Aktywacja", "Potwierdzenie"];
    currentStep: number;
    estimatedTime: number; // seconds
  };

  accountActivation: {
    steps: ["Rejestracja", "Email wysłany", "Link kliknięty", "Konto aktywne"];
    currentStep: number;
    timeRemaining?: number; // for rate limits
  };
}
```

### 6.2 Real-time Feedback (Nowe Wersja 2)

```javascript
const realTimeFeedback = {
  promoCodeValidation: {
    debounceMs: 300, // Wait for user to stop typing
    showSpinner: true,
    showCheckmark: true,
    showErrorIcon: true,
    previewCredits: true, // Show bonus amount for valid codes
  },

  rateLimitStatus: {
    showCountdown: true,
    showAttemptsRemaining: true,
    showNextAllowedTime: true,
    colorCoding: {
      green: "available",
      yellow: "warning",
      red: "blocked",
    },
  },

  networkStatus: {
    showOfflineIndicator: true,
    queueOfflineActions: true,
    autoRetryOnReconnect: true,
    preserveFormData: true,
  },
};
```

### 6.3 Error Recovery (Rozszerzone Wersja 2)

```typescript
interface ErrorRecoveryStrategies {
  // Enhanced error recovery
  promoCodeErrors: {
    invalidCode: {
      action: "clear_field_and_focus";
      suggestion: "Sprawdź kod i spróbuj ponownie";
      allowRetry: true;
    };
    expiredCode: {
      action: "clear_field";
      suggestion: "Wprowadź aktualny kod promocyjny";
      showAlternatives: true;
    };
    alreadyUsed: {
      action: "clear_field";
      suggestion: "Ten kod został już wykorzystany";
      showHistory: true;
    };
    rateLimited: {
      action: "disable_field_with_timer";
      suggestion: "Zbyt wiele prób. Spróbuj za {countdown}";
      showCountdown: true;
    };
  };

  networkErrors: {
    promoCodeValidation: {
      strategy: "queue_for_retry";
      maxRetries: 3;
      showOfflineMode: true;
    };
    analyticsTracking: {
      strategy: "queue_and_continue";
      silent: true; // Don't interrupt user flow
      batchRetry: true;
    };
  };
}
```

## 7. Analytics and Monitoring (Nowe sekcje Wersja 2)

### 7.1 Event Tracking Schema

```typescript
interface AnalyticsEvents {
  // Enhanced existing events
  login_attempt: {
    email: string; // hashed
    has_promo_code: boolean; // ⭐️ NOWE
    timestamp: number;
  };

  registration_attempt: {
    email: string; // hashed
    has_promo_code: boolean; // ⭐️ NOWE
    timestamp: number;
  };

  // New promo code events ⭐️
  promo_code_entered: {
    code_length: number; // Don't store actual code
    context: "registration" | "login";
    timestamp: number;
  };

  promo_code_validated: {
    valid: boolean;
    error_type?: string;
    context: "registration" | "login";
    response_time: number;
    timestamp: number;
  };

  promo_code_activated: {
    credits_added: number;
    context: "registration" | "login";
    user_type: "new" | "existing";
    timestamp: number;
  };

  promo_code_error: {
    error_type: "invalid" | "expired" | "used" | "rate_limited";
    context: "registration" | "login";
    recovery_action?: string;
    timestamp: number;
  };

  // New account activation events ⭐️
  account_activation_needed: {
    email: string; // hashed
    has_pending_promo: boolean;
    timestamp: number;
  };

  activation_email_resent: {
    email: string; // hashed
    attempt_number: number;
    success: boolean;
    timestamp: number;
  };

  account_activated: {
    email: string; // hashed
    time_to_activation: number; // minutes from registration
    promo_code_activated: boolean;
    timestamp: number;
  };
}
```

### 7.2 Performance Monitoring

```javascript
const performanceMetrics = {
  // Enhanced performance tracking
  apiCalls: {
    promoCodeValidation: {
      responseTime: 'track 95th percentile',
      errorRate: 'track by error type',
      cacheHitRate: 'track effectiveness'
    };
    promoCodeActivation: {
      responseTime: 'track 99th percentile',
      successRate: 'track by user type',
      retryRate: 'track retry patterns'
    };
  };

  userExperience: {
    promoCodeFlow: {
      completionRate: 'track funnel conversion',
      abandonmentPoints: 'identify drop-off stages',
      errorRecoveryRate: 'track user resilience'
    };

    formInteraction: {
      timeToFirstInteraction: 'measure engagement',
      validationResponseTime: 'measure real-time feedback',
      errorResolutionTime: 'measure user efficiency'
    };
  };

  businessMetrics: {
    promoCodeROI: {
      acquisitionCost: 'track cost per activated user',
      lifetimeValue: 'track promo user value',
      retentionRate: 'compare promo vs non-promo users'
    };
  };
};
```

### 7.3 Real-time Dashboard Metrics

```javascript
const dashboardMetrics = {
  realTimeView: {
    activeUsers: 'current online users',
    promoActivationsPerMinute: 'live activation rate', // ⭐️ NOWE
    errorRatePercentage: 'live error tracking',
    averageResponseTime: 'live performance'
  };

  hourlyMetrics: {
    registrationConversion: 'with vs without promo codes', // ⭐️ NOWE
    loginSuccessRate: 'including promo code logins', // ⭐️ NOWE
    accountActivationRate: 'email to active conversion', // ⭐️ NOWE
    topPromoCodesByUsage: 'most popular codes' // ⭐️ NOWE
  };

  dailyTrends: {
    userGrowth: 'new registrations vs activations',
    promoCodeEffectiveness: 'conversion rates by code', // ⭐️ NOWE
    errorPatterns: 'identify recurring issues',
    performanceTrends: 'system health over time'
  };
};
```

## 8. Security Enhanced (Wersja 2)

### 8.1 Promo Code Security ⭐️ NOWE

```typescript
interface PromoCodeSecurity {
  validation: {
    inputSanitization: "strict alphanumeric only";
    lengthLimits: "min 6, max 12 characters";
    blacklistCheck: "against common words/patterns";
    rateLimit: "per IP and per user";
  };

  transmission: {
    encryption: "TLS 1.3 required";
    requestSigning: "HMAC-SHA256 signature";
    timestamp: "prevent replay attacks";
    nonceCheck: "prevent duplicate requests";
  };

  storage: {
    clientSide: "NEVER store promo codes";
    serverSide: "encrypted at rest";
    logging: "hash codes in logs";
    audit: "full activation trail";
  };

  bruteForceProtection: {
    ipBasedLimiting: "10 verifications per 15 min";
    userBasedLimiting: "5 activations per hour";
    captchaIntegration: "after 5 failed attempts";
    temporaryBlocking: "escalating time blocks";
  };
}
```

### 8.2 Enhanced Audit Logging ⭐️ NOWE

```javascript
const auditLogging = {
  promoCodeActivities: {
    verification: {
      timestamp: 'ISO 8601',
      hashedCode: 'SHA-256 hash',
      userId: 'if available',
      ipAddress: 'client IP',
      userAgent: 'browser info',
      result: 'valid|invalid|error',
      responseTime: 'milliseconds'
    };

    activation: {
      timestamp: 'ISO 8601',
      hashedCode: 'SHA-256 hash',
      userId: 'required',
      creditsAdded: 'number',
      previousCredits: 'number',
      activationId: 'unique ID',
      context: 'registration|login'
    };

    errors: {
      timestamp: 'ISO 8601',
      errorType: 'invalid|expired|used|rate_limited',
      hashedCode: 'SHA-256 hash',
      userId: 'if available',
      ipAddress: 'client IP',
      attemptCount: 'current attempt number'
    };
  };

  securityEvents: {
    rateLimitViolations: {
      timestamp: 'ISO 8601',
      ipAddress: 'client IP',
      limitType: 'verification|activation|resend',
      attemptCount: 'attempts made',
      blockDuration: 'seconds blocked'
    };

    suspiciousActivity: {
      multipleInvalidCodes: 'rapid invalid attempts',
      unusualActivationPatterns: 'automation detection',
      ipAddressAnomalies: 'suspicious IP behavior'
    };
  };
};
```

## 9. Accessibility Enhanced (Wersja 2)

### 9.1 WCAG 2.1 AA Compliance with Promo Codes ⭐️

```typescript
interface AccessibilityRequirements {
  promoCodeComponents: {
    ariaLabels: {
      promoField: "Kod promocyjny (opcjonalnie)";
      validationStatus: "Status walidacji kodu promocyjnego";
      creditsPreview: "Podgląd dodatkowych kredytów";
      errorMessage: "Błąd kodu promocyjnego";
    };

    liveRegions: {
      validationFeedback: 'aria-live="polite"';
      activationSuccess: 'aria-live="assertive"';
      errorAnnouncements: 'aria-live="assertive"';
      rateLimitWarnings: 'aria-live="polite"';
    };

    keyboardNavigation: {
      tabOrder: "logical flow through promo fields";
      shortcuts: "Alt+P to focus promo code field";
      escapeKey: "clear promo field and errors";
      enterKey: "trigger validation";
    };
  };

  visualDesign: {
    colorContrast: {
      normalText: "4.5:1 minimum ratio";
      largeText: "3:1 minimum ratio";
      errorStates: "4.5:1 for error indicators";
      successStates: "4.5:1 for success indicators";
    };

    focusIndicators: {
      outlineWidth: "2px minimum";
      outlineColor: "high contrast";
      outlineStyle: "solid or double";
      clearVisibility: "against all backgrounds";
    };
  };
}
```

### 9.2 Screen Reader Support ⭐️

```html
<!-- Enhanced accessibility markup -->
<div class="promo-code-section" role="region" aria-labelledby="promo-heading">
  <h3 id="promo-heading">Kod promocyjny</h3>

  <label for="promo-code" id="promo-label">
    Kod promocyjny (opcjonalnie)
  </label>

  <input
    id="promo-code"
    type="text"
    aria-labelledby="promo-label"
    aria-describedby="promo-help promo-status promo-error"
    aria-invalid="false"
    aria-autocomplete="none"
    maxlength="12"
    pattern="[A-Z0-9]{6,12}"
  />

  <div id="promo-help" class="help-text">
    Wprowadź kod promocyjny aby otrzymać dodatkowe kredyty
  </div>

  <div id="promo-status" aria-live="polite" class="status-message">
    <!-- Dynamic validation status -->
  </div>

  <div
    id="promo-error"
    role="alert"
    aria-live="assertive"
    class="error-message"
  >
    <!-- Dynamic error messages -->
  </div>

  <div id="promo-credits" aria-live="polite" class="credits-preview">
    <!-- Credits preview for valid codes -->
  </div>
</div>
```

## 10. Testing Requirements (Rozszerzone Wersja 2)

### 10.1 Unit Testing Enhanced

```typescript
// Enhanced test coverage requirements
const testCoverage = {
  overall: '85%', // Increased from 80%
  promoCodeLogic: '95%', // Critical business logic
  errorHandling: '90%', // Enhanced error scenarios
  accessibilityFeatures: '85%', // New accessibility tests
  securityFunctions: '95%' // Security-critical code
};

// New test categories ⭐️
const newTestSuites = {
  promoCodeValidation: {
    validCodeFormats: 'test all valid patterns',
    invalidCodeFormats: 'test rejection of invalid patterns',
    rateLimitBehavior: 'test rate limiting enforcement',
    cacheEffectiveness: 'test validation caching',
    errorRecovery: 'test error handling flows'
  };

  accountActivation: {
    activationFlows: 'test complete activation process',
    resendLimiting: 'test email resend rate limiting',
    promoPreservation: 'test promo code preservation',
    errorScenarios: 'test activation failure handling'
  };

  analyticsTracking: {
    eventCapture: 'test all event types fired',
    offlineQueueing: 'test offline event storage',
    batchProcessing: 'test event batching',
    privacyCompliance: 'test data anonymization'
  };
};
```

### 10.2 Integration Testing Enhanced

```javascript
const integrationTests = {
  // Enhanced existing tests
  authFlow: 'login/registration with promo codes',
  apiIntegration: 'all new endpoints tested',
  errorHandling: 'network failures with promo data',

  // New integration tests ⭐️
  promoCodeFlow: {
    registrationWithPromo: 'complete flow test',
    loginWithPromo: 'activation during login',
    errorRecovery: 'handling of promo failures',
    rateLimitIntegration: 'limits across all endpoints'
  };

  accountActivationFlow: {
    normalActivation: 'without promo code',
    promoActivation: 'with pending promo code',
    resendFlow: 'resend email functionality',
    rateLimitFlow: 'resend rate limiting'
  };

  analyticsIntegration: {
    eventFlow: 'event capture and transmission',
    offlineSupport: 'offline event queueing',
    dataAccuracy: 'correct data in analytics'
  };
};
```

### 10.3 E2E Testing Enhanced

```javascript
const e2eTestScenarios = {
  // Enhanced existing scenarios
  happyPath: 'complete user journey with promo codes',
  errorRecovery: 'user recovery from all error states',

  // New E2E scenarios ⭐️
  promoCodeJourneys: {
    newUserWithPromo: 'registration → activation → credits received',
    existingUserWithPromo: 'login → promo activation → credits added',
    invalidPromoRecovery: 'invalid code → correction → success',
    rateLimitedUser: 'too many attempts → wait → retry success'
  };

  accountActivationJourneys: {
    inactiveUserLogin: 'login attempt → activation prompt → email resend',
    activationWithPromo: 'email click → account active → promo activated',
    rateLimitedResend: 'multiple resends → rate limit → wait → success'
  };

  accessibilityJourneys: {
    screenReaderFlow: 'complete flow with screen reader',
    keyboardOnlyFlow: 'no mouse interaction required',
    highContrastFlow: 'usable in high contrast mode'
  };
};
```

## 11. Development and Build Requirements (Rozszerzone Wersja 2)

### 11.1 Build Configuration Enhanced

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
    "compressionPlugin": "gzip + brotli",
    "imageOptimization": true,
    "cssMinification": true,
    "promoCodeChunking": true,
    "analyticsAsyncLoading": true
  },
  "monitoring": {
    "performanceTracking": true,
    "errorTracking": "sentry",
    "analyticsTracking": "google-analytics-4",
    "customMetrics": "promo-code-effectiveness"
  }
}
```

### 11.2 Environment Variables Enhanced

```bash
# Existing environment variables...

# New environment variables ⭐️ Wersja 2
WEBHOOK_RESEND_ACTIVATION=resend-activation-email-id
WEBHOOK_VERIFY_PROMO=verify-promo-code-id
WEBHOOK_ACTIVATE_PROMO=activate-promo-code-id

# Analytics configuration
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_API_SECRET=api-secret-key
ANALYTICS_DEBUG_MODE=false

# Security configuration
PROMO_CODE_SALT=secure-random-salt
API_SIGNATURE_KEY=hmac-signing-key
RATE_LIMIT_REDIS_URL=redis://localhost:6379

# Feature flags
FEATURE_PROMO_CODES=true
FEATURE_ACCOUNT_ACTIVATION=true
FEATURE_ENHANCED_ANALYTICS=true
FEATURE_ACCESSIBILITY_ENHANCEMENTS=true

# Monitoring
SENTRY_DSN=https://sentry.io/dsn
PERFORMANCE_MONITORING=true
ERROR_TRACKING_LEVEL=info
```

### 11.3 Development Workflow Enhanced

```javascript
const developmentWorkflow = {
  // Enhanced existing workflow

  // New development practices ⭐️ Wersja 2
  promoCodeDevelopment: {
    mockingStrategy: 'comprehensive promo code API mocks',
    testingApproach: 'test-driven development required',
    securityReview: 'mandatory for all promo code features',
    performanceMonitoring: 'continuous performance testing'
  };

  analyticsIntegration: {
    testingStrategy: 'analytics sandbox environment',
    dataValidation: 'automated event verification',
    privacyCompliance: 'automated PII detection',
    performanceImpact: 'bundle size monitoring'
  };

  accessibilityDevelopment: {
    continuousA11yTesting: 'automated accessibility scanning',
    screenReaderTesting: 'manual testing required',
    keyboardTesting: 'automated keyboard navigation tests',
    contrastValidation: 'automated color contrast checking'
  };
};
```

---

## 12. Deployment and Operations (Nowe Wersja 2)

### 12.1 Production Configuration

```javascript
const productionConfig = {
  promoCodeService: {
    rateLimitingRedis: 'managed Redis instance',
    cachingStrategy: 'multi-level caching',
    monitoringAlerts: 'real-time error tracking',
    backupStrategy: 'automated promo code backups'
  };

  analyticsService: {
    dataRetention: '90 days maximum',
    privacyCompliance: 'GDPR compliant',
    performanceImpact: 'non-blocking tracking',
    errorHandling: 'graceful degradation'
  };

  securityConfiguration: {
    rateLimitingEngine: 'distributed rate limiting',
    auditLogging: 'comprehensive security logs',
    intrusionDetection: 'automated threat detection',
    complianceReporting: 'automated compliance checks'
  };
};
```

### 12.2 Monitoring and Alerting

```javascript
const monitoringSetup = {
  businessMetrics: {
    promoCodeConversion: 'alert if < 80% normal rate',
    accountActivationRate: 'alert if < 70% normal rate',
    userRegistrationFlow: 'alert if > 5% error rate',
    revenueImpact: 'alert for significant promo impact'
  };

  technicalMetrics: {
    apiResponseTimes: 'alert if > 1 second average',
    errorRates: 'alert if > 2% error rate',
    rateLimitViolations: 'alert for unusual patterns',
    securityEvents: 'immediate alert for threats'
  };

  userExperienceMetrics: {
    promoCodeUXIssues: 'alert for high error rates',
    accessibilityErrors: 'alert for a11y violations',
    performanceDegradation: 'alert for slow loading',
    conversionDrops: 'alert for funnel issues'
  };
};
```

---

**Wersja dokumentu**: 2.0
**Data aktualizacji**: Czerwiec 2025
**Główne zmiany**: System kodów promocyjnych, rozszerzone bezpieczeństwo, analytics, accessibility, nowe API endpointy, monitoring
