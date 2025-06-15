promoCode?: string; // ⭐️ NOWE pole opcjonalne
timestamp: string;
clientInfo: {
userAgent: string;
ipAddress: string;
sessionId: string;
};
}

// Response (Rozszerzony)
interface RegisterResponse {
success: boolean;
data?: {
user: {
id: string;
email: string;
firstName: string;
isActive: false; // Zawsze false po rejestracji
pendingPromoCode?: string; // ⭐️ NOWE - kod do aktywacji po weryfikacji email
};
verification: {
emailSent: boolean;
verificationRequired: boolean;
};
promoCodePreview?: { // ⭐️ NOWE - podgląd dla poprawnych kodów
valid: boolean;
creditsToAdd: number;
code: string;
};
};
error?: {
type: 'EMAIL_EXISTS' | 'VALIDATION_ERROR' | 'PROMO_WARNING' | 'TECHNICAL_ERROR';
message: string;
code: string;
details?: {
field?: string; // Dla błędów walidacji
promoCodeIssue?: { // ⭐️ NOWE - nie blokuje rejestracji
type: 'INVALID' | 'EXPIRED' | 'ALREADY_USED';
message: string;
proceedWithoutPromo: boolean;
};
};
};
}

// Przykład żądania
const registerExample = {
email: "newuser@example.com",
password: "SecurePassword123!",
firstName: "Anna",
phone: "+48123456789",
promoCode: "NEWUSER50", // ⭐️ NOWE
timestamp: "2025-06-15T10:30:00Z",
clientInfo: {
userAgent: "Mozilla/5.0...",
ipAddress: "192.168.1.1",
sessionId: "uuid-session-id"
}
};

// Przykład odpowiedzi sukces z poprawnym kodem promocyjnym
const registerSuccessExample = {
success: true,
data: {
user: {
id: "new-user-uuid",
email: "newuser@example.com",
firstName: "Anna",
isActive: false,
pendingPromoCode: "NEWUSER50" // ⭐️ NOWE
},
verification: {
emailSent: true,
verificationRequired: true
},
promoCodePreview: { // ⭐️ NOWE
valid: true,
creditsToAdd: 50,
code: "NEWUSER50"
}
}
};

// Przykład odpowiedzi - błędny kod promocyjny (nie blokuje rejestracji)
const registerWithInvalidPromoExample = {
success: true,
data: {
user: {
id: "new-user-uuid",
email: "newuser@example.com",
firstName: "Anna",
isActive: false
// brak pendingPromoCode
},
verification: {
emailSent: true,
verificationRequired: true
}
},
error: {
type: "PROMO_WARNING",
message: "Kod promocyjny jest nieprawidłowy, ale rejestracja została ukończona",
code: "INVALID_PROMO_CODE_NON_BLOCKING",
details: {
promoCodeIssue: {
type: "INVALID",
message: "Kod WRONGCODE nie istnieje",
proceedWithoutPromo: true
}
}
}
};

````

### 2.3 VERIFY_EMAIL - Weryfikacja email z aktywacją kodów promocyjnych ⭐️

```typescript
// Request (Rozszerzony)
interface VerifyEmailRequest {
  verificationToken: string; // Z linku w emailu
  timestamp: string;
  clientInfo: {
    userAgent: string;
    ipAddress: string;
  };
}

// Response (Rozszerzony)
interface VerifyEmailResponse {
  success: boolean;
  data?: {
    user: {
      id: string;
      email: string;
      firstName: string;
      isActive: true; // Zawsze true po weryfikacji
      credits: number; // ⭐️ Uwzględnia kredyty z kodu promocyjnego
      promoCredits?: number; // ⭐️ NOWE - kredyty z aktywowanego kodu
    };
    promoCodeActivation?: { // ⭐️ NOWE
      activated: boolean;
      code: string;
      creditsAdded: number;
      activationId: string;
    };
  };
  error?: {
    type: 'INVALID_TOKEN' | 'EXPIRED_TOKEN' | 'ALREADY_VERIFIED' | 'PROMO_ACTIVATION_FAILED';
    message: string;
    code: string;
    details?: {
      tokenExpired?: boolean;
      promoError?: {
        code: string;
        reason: string;
        accountStillActivated: boolean; // Konto się aktywuje mimo błędu kodu
      };
    };
  };
}

// Przykład odpowiedzi sukces z aktywacją kodu promocyjnego
const verifyEmailSuccessExample = {
  success: true,
  data: {
    user: {
      id: "user-uuid",
      email: "newuser@example.com",
      firstName: "Anna",
      isActive: true,
      credits: 150, // 100 bazowych + 50 z kodu
      promoCredits: 50 // ⭐️ NOWE
    },
    promoCodeActivation: { // ⭐️ NOWE
      activated: true,
      code: "NEWUSER50",
      creditsAdded: 50,
      activationId: "activation-uuid"
    }
  }
};
````

### 2.4 RESET_INIT - Reset hasła z obsługą nieaktywowanych kont ⭐️

```typescript
// Request (bez zmian)
interface ResetInitRequest {
  email: string;
  newPassword: string;
  timestamp: string;
  clientInfo: {
    userAgent: string;
    ipAddress: string;
  };
}

// Response (Rozszerzony)
interface ResetInitResponse {
  success: boolean;
  data?: {
    emailSent: boolean;
    message: string;
  };
  error?: {
    type:
      | "EMAIL_NOT_FOUND"
      | "ACCOUNT_INACTIVE"
      | "RATE_LIMITED"
      | "TECHNICAL_ERROR"; // ⭐️ Rozszerzone
    message: string;
    code: string;
    details?: {
      // Dla nieaktywowanych kont ⭐️ NOWE
      accountInactive?: {
        requiresActivation: boolean;
        activationEmailResendAvailable: boolean;
        resendCooldown?: number; // seconds
      };
      // Dla rate limiting
      rateLimited?: {
        retryAfter: number; // seconds
        attemptsRemaining: number;
      };
    };
  };
}

// Przykład odpowiedzi - konto nieaktywowane
const resetInactiveAccountExample = {
  success: false,
  error: {
    type: "ACCOUNT_INACTIVE",
    message: "Aby zresetować hasło, najpierw aktywuj konto",
    code: "ACCOUNT_NOT_ACTIVATED",
    details: {
      accountInactive: {
        requiresActivation: true,
        activationEmailResendAvailable: true,
        resendCooldown: 0,
      },
    },
  },
};
```

## 3. Nowe endpointy (Wersja 2) ⭐️

### 3.1 RESEND_ACTIVATION - Ponowne wysyłanie emaila aktywacyjnego

```typescript
// Request
interface ResendActivationRequest {
  email: string;
  preservePromoCode?: string; // ⭐️ Zachowanie kodu promocyjnego
  timestamp: string;
  clientInfo: {
    userAgent: string;
    ipAddress: string;
    sessionId: string;
  };
}

// Response
interface ResendActivationResponse {
  success: boolean;
  data?: {
    emailSent: boolean;
    message: string;
    promoCodePreserved?: boolean; // ⭐️ Czy kod promocyjny został zachowany
    attemptsRemaining: number;
    nextAllowedTime?: string; // ISO 8601
  };
  error?: {
    type: "EMAIL_NOT_FOUND" | "ALREADY_ACTIVE" | "RATE_LIMITED" | "SEND_FAILED";
    message: string;
    code: string;
    details: {
      rateLimited?: {
        retryAfter: number; // seconds
        attemptsUsed: number;
        maxAttempts: number;
        windowMinutes: number;
      };
      accountStatus?: "ACTIVE" | "NOT_FOUND";
    };
  };
}

// Przykład żądania
const resendActivationExample = {
  email: "user@example.com",
  preservePromoCode: "WELCOME2024", // ⭐️ NOWE
  timestamp: "2025-06-15T10:30:00Z",
  clientInfo: {
    userAgent: "Mozilla/5.0...",
    ipAddress: "192.168.1.1",
    sessionId: "uuid-session-id",
  },
};

// Przykład odpowiedzi sukces
const resendSuccessExample = {
  success: true,
  data: {
    emailSent: true,
    message: "Email aktywacyjny został wysłany ponownie",
    promoCodePreserved: true, // ⭐️ NOWE
    attemptsRemaining: 2,
    nextAllowedTime: "2025-06-15T11:30:00Z",
  },
};

// Przykład odpowiedzi - rate limited
const resendRateLimitedExample = {
  success: false,
  error: {
    type: "RATE_LIMITED",
    message: "Zbyt wiele prób. Spróbuj ponownie za 45 minut",
    code: "RESEND_RATE_LIMITED",
    details: {
      rateLimited: {
        retryAfter: 2700, // 45 minutes
        attemptsUsed: 3,
        maxAttempts: 3,
        windowMinutes: 60,
      },
    },
  },
};
```

### 3.2 VERIFY_PROMO_CODE - Weryfikacja kodu promocyjnego

```typescript
// Request
interface VerifyPromoCodeRequest {
  promoCode: string;
  userId?: string; // Opcjonalne - dla zalogowanych użytkowników
  context: "registration" | "login" | "standalone";
  timestamp: string;
  signature: string; // HMAC dla bezpieczeństwa
  clientInfo: {
    userAgent: string;
    ipAddress: string;
    sessionId: string;
  };
}

// Response
interface VerifyPromoCodeResponse {
  success: boolean;
  data?: {
    valid: boolean;
    code: string;
    credits: number;
    description?: string;
    expiryDate: string; // ISO 8601
    termsAndConditions?: string;
    alreadyUsedByUser?: boolean; // Dla zalogowanych użytkowników
    usageHistory?: {
      usedAt: string;
      activationId: string;
    };
  };
  error?: {
    type:
      | "INVALID_CODE"
      | "EXPIRED_CODE"
      | "ALREADY_USED"
      | "RATE_LIMITED"
      | "VALIDATION_ERROR";
    message: string;
    code: string;
    details?: {
      expiredAt?: string; // Dla wygasłych kodów
      usedAt?: string; // Dla już używanych kodów
      maxUsageReached?: boolean;
      rateLimited?: {
        retryAfter: number;
        attemptsRemaining: number;
      };
    };
  };
}

// Przykład żądania
const verifyPromoExample = {
  promoCode: "SUMMER2024",
  userId: "user-uuid", // Opcjonalne
  context: "login",
  timestamp: "2025-06-15T10:30:00Z",
  signature: "hmac-sha256-signature",
  clientInfo: {
    userAgent: "Mozilla/5.0...",
    ipAddress: "192.168.1.1",
    sessionId: "uuid-session-id",
  },
};

// Przykład odpowiedzi - kod poprawny
const verifySuccessExample = {
  success: true,
  data: {
    valid: true,
    code: "SUMMER2024",
    credits: 75,
    description: "Letnia promocja - 75 kredytów gratis",
    expiryDate: "2024-08-31T23:59:59Z",
    termsAndConditions: "Kod może być użyty tylko raz na użytkownika",
    alreadyUsedByUser: false,
  },
};

// Przykład odpowiedzi - kod wygasły
const verifyExpiredExample = {
  success: false,
  error: {
    type: "EXPIRED_CODE",
    message: "Kod promocyjny wygasł 31 sierpnia 2024",
    code: "PROMO_CODE_EXPIRED",
    details: {
      expiredAt: "2024-08-31T23:59:59Z",
    },
  },
};

// Przykład odpowiedzi - kod już użyty
const verifyUsedExample = {
  success: false,
  error: {
    type: "ALREADY_USED",
    message: "Ten kod promocyjny został już wykorzystany na Twoim koncie",
    code: "PROMO_CODE_ALREADY_USED",
    details: {
      usedAt: "2024-06-01T14:30:00Z",
    },
  },
};
```

### 3.3 ACTIVATE_PROMO_CODE - Aktywacja kodu promocyjnego

```typescript
// Request
interface ActivatePromoCodeRequest {
  promoCode: string;
  userId: string; // Wymagane
  userEmail: string; // Wymagane dla audytu
  context: "registration" | "login" | "manual";
  verificationToken?: string; // Z poprzedniej weryfikacji
  timestamp: string;
  signature: string;
  clientInfo: {
    userAgent: string;
    ipAddress: string;
    sessionId: string;
  };
}

// Response
interface ActivatePromoCodeResponse {
  success: boolean;
  data?: {
    activated: boolean;
    activationId: string; // Unique ID for this activation
    code: string;
    creditsAdded: number;
    previousCredits: number;
    newCredits: number;
    activatedAt: string; // ISO 8601
    receipt: {
      activationId: string;
      userId: string;
      code: string;
      creditsAdded: number;
      timestamp: string;
    };
  };
  error?: {
    type:
      | "INVALID_CODE"
      | "ALREADY_USED"
      | "EXPIRED_CODE"
      | "RATE_LIMITED"
      | "USER_NOT_FOUND"
      | "ACTIVATION_FAILED";
    message: string;
    code: string;
    details?: {
      verificationRequired?: boolean;
      rateLimited?: {
        retryAfter: number;
        attemptsRemaining: number;
        maxAttemptsPerHour: number;
      };
      activationError?: {
        reason: string;
        recoverable: boolean;
        suggestedAction: string;
      };
    };
  };
}

// Przykład żądania
const activatePromoExample = {
  promoCode: "WELCOME2024",
  userId: "user-uuid",
  userEmail: "user@example.com",
  context: "login",
  verificationToken: "verification-token-from-verify-endpoint",
  timestamp: "2025-06-15T10:30:00Z",
  signature: "hmac-sha256-signature",
  clientInfo: {
    userAgent: "Mozilla/5.0...",
    ipAddress: "192.168.1.1",
    sessionId: "uuid-session-id",
  },
};

// Przykład odpowiedzi sukces
const activateSuccessExample = {
  success: true,
  data: {
    activated: true,
    activationId: "activation-uuid-12345",
    code: "WELCOME2024",
    creditsAdded: 50,
    previousCredits: 100,
    newCredits: 150,
    activatedAt: "2025-06-15T10:30:15Z",
    receipt: {
      activationId: "activation-uuid-12345",
      userId: "user-uuid",
      code: "WELCOME2024",
      creditsAdded: 50,
      timestamp: "2025-06-15T10:30:15Z",
    },
  },
};

// Przykład odpowiedzi - rate limited
const activateRateLimitedExample = {
  success: false,
  error: {
    type: "RATE_LIMITED",
    message: "Przekroczyłeś limit aktywacji kodów (5 na godzinę)",
    code: "ACTIVATION_RATE_LIMITED",
    details: {
      rateLimited: {
        retryAfter: 1800, // 30 minutes
        attemptsRemaining: 0,
        maxAttemptsPerHour: 5,
      },
    },
  },
};
```

### 3.4 GET_PROMO_STATUS - Status kodów promocyjnych użytkownika

```typescript
// Request
interface GetPromoStatusRequest {
  userId: string;
  includeHistory?: boolean; // Default: false
  limit?: number; // Default: 10, Max: 50
  timestamp: string;
  signature: string;
  clientInfo: {
    userAgent: string;
    ipAddress: string;
    sessionId: string;
  };
}

// Response
interface GetPromoStatusResponse {
  success: boolean;
  data?: {
    userId: string;
    totalPromoCredits: number;
    totalActivations: number;
    lastActivation?: {
      code: string;
      creditsAdded: number;
      activatedAt: string;
      activationId: string;
    };
    rateLimitStatus: {
      verificationsRemaining: number;
      activationsRemaining: number;
      resetTime: string; // ISO 8601
    };
    history?: PromoActivation[]; // Jeśli includeHistory = true
  };
  error?: {
    type: "USER_NOT_FOUND" | "ACCESS_DENIED" | "TECHNICAL_ERROR";
    message: string;
    code: string;
  };
}

interface PromoActivation {
  activationId: string;
  code: string; // Masked: "WELC***2024"
  creditsAdded: number;
  activatedAt: string;
  context: "registration" | "login" | "manual";
}

// Przykład żądania
const getPromoStatusExample = {
  userId: "user-uuid",
  includeHistory: true,
  limit: 20,
  timestamp: "2025-06-15T10:30:00Z",
  signature: "hmac-sha256-signature",
  clientInfo: {
    userAgent: "Mozilla/5.0...",
    ipAddress: "192.168.1.1",
    sessionId: "uuid-session-id",
  },
};

// Przykład odpowiedzi
const getPromoStatusSuccessExample = {
  success: true,
  data: {
    userId: "user-uuid",
    totalPromoCredits: 125,
    totalActivations: 3,
    lastActivation: {
      code: "SUMMER2024",
      creditsAdded: 75,
      activatedAt: "2025-06-10T15:20:00Z",
      activationId: "activation-uuid-789",
    },
    rateLimitStatus: {
      verificationsRemaining: 7,
      activationsRemaining: 3,
      resetTime: "2025-06-15T11:30:00Z",
    },
    history: [
      {
        activationId: "activation-uuid-789",
        code: "SUMM***2024",
        creditsAdded: 75,
        activatedAt: "2025-06-10T15:20:00Z",
        context: "login",
      },
      {
        activationId: "activation-uuid-456",
        code: "WELC***2024",
        creditsAdded: 50,
        activatedAt: "2025-06-01T10:30:00Z",
        context: "registration",
      },
    ],
  },
};
```

### 3.5 TRACK_ANALYTICS - Śledzenie eventów analytics

```typescript
// Request
interface TrackAnalyticsRequest {
  events: AnalyticsEvent[];
  userId?: string; // Opcjonalne
  sessionId: string;
  timestamp: string;
  signature: string;
  clientInfo: {
    userAgent: string;
    ipAddress: string; // Będzie zamaskowany
    timezone: string;
  };
}

interface AnalyticsEvent {
  eventName: string;
  eventType: "user_action" | "system_event" | "business_metric";
  properties: Record<string, any>;
  timestamp: string;
  context?: {
    page: string;
    section: string;
    component: string;
  };
}

// Response
interface TrackAnalyticsResponse {
  success: boolean;
  data?: {
    eventsProcessed: number;
    eventIds: string[]; // IDs przypisane eventom
    processingTime: number; // ms
  };
  error?: {
    type: "VALIDATION_ERROR" | "RATE_LIMITED" | "PROCESSING_ERROR";
    message: string;
    code: string;
    details?: {
      invalidEvents?: number;
      rateLimited?: {
        retryAfter: number;
        eventsPerMinute: number;
      };
    };
  };
}

// Przykład żądania
const trackAnalyticsExample = {
  events: [
    {
      eventName: "promo_code_entered",
      eventType: "user_action",
      properties: {
        code_length: 8,
        context: "login",
        has_previous_activations: true,
      },
      timestamp: "2025-06-15T10:30:00Z",
      context: {
        page: "login",
        section: "auth_form",
        component: "promo_code_field",
      },
    },
    {
      eventName: "promo_code_validated",
      eventType: "system_event",
      properties: {
        valid: true,
        credits_preview: 50,
        response_time: 245,
        context: "login",
      },
      timestamp: "2025-06-15T10:30:02Z",
      context: {
        page: "login",
        section: "auth_form",
        component: "promo_code_validation",
      },
    },
  ],
  userId: "user-uuid",
  sessionId: "session-uuid",
  timestamp: "2025-06-15T10:30:00Z",
  signature: "hmac-sha256-signature",
  clientInfo: {
    userAgent: "Mozilla/5.0...",
    ipAddress: "192.168.1.1",
    timezone: "Europe/Warsaw",
  },
};

// Przykład odpowiedzi sukces
const trackAnalyticsSuccessExample = {
  success: true,
  data: {
    eventsProcessed: 2,
    eventIds: ["event-uuid-1", "event-uuid-2"],
    processingTime: 45,
  },
};
```

## 4. Wspólne struktury danych (Wersja 2)

### 4.1 Error Types (Rozszerzone)

```typescript
// Rozszerzone typy błędów
type ErrorType =
  // Existing error types
  | "USER_NOT_FOUND"
  | "INVALID_PASSWORD"
  | "EMAIL_EXISTS"
  | "VALIDATION_ERROR"
  | "TECHNICAL_ERROR"
  | "RATE_LIMITED"
  | "NETWORK_ERROR"
  // New error types ⭐️ Wersja 2
  | "ACCOUNT_INACTIVE"
  | "PROMO_CODE_INVALID"
  | "PROMO_CODE_EXPIRED"
  | "PROMO_CODE_ALREADY_USED"
  | "PROMO_CODE_RATE_LIMITED"
  | "ACTIVATION_EMAIL_FAILED"
  | "ANALYTICS_TRACKING_FAILED";

interface BaseError {
  type: ErrorType;
  message: string;
  code: string;
  timestamp: string; // ISO 8601
  requestId?: string; // For debugging
}

// Specific error interfaces ⭐️ NOWE
interface PromoCodeError extends BaseError {
  details: {
    code: string; // Hashed/masked promo code
    expiryDate?: string;
    usageDate?: string;
    retryAfter?: number;
    suggestedAction: string;
  };
}

interface RateLimitError extends BaseError {
  details: {
    limitType: "verification" | "activation" | "resend" | "analytics";
    retryAfter: number; // seconds
    attemptsRemaining: number;
    maxAttempts: number;
    windowMinutes: number;
  };
}
```

### 4.2 Security Headers (Nowe Wersja 2)

```typescript
// Required security headers for all requests
interface SecurityHeaders {
  "Content-Type": "application/json";
  "X-Timestamp": string; // ISO 8601
  "X-Signature": string; // HMAC-SHA256
  "X-Request-ID": string; // UUID for tracing
  "X-Client-Version": string; // App version
  "User-Agent": string;
}

// HMAC signature calculation
function calculateSignature(
  method: string,
  path: string,
  body: string,
  timestamp: string,
  secretKey: string
): string {
  const payload = `${method}|${path}|${body}|${timestamp}`;
  return crypto.createHmac("sha256", secretKey).update(payload).digest("hex");
}

// Example usage
const headers: SecurityHeaders = {
  "Content-Type": "application/json",
  "X-Timestamp": "2025-06-15T10:30:00Z",
  "X-Signature": calculateSignature(
    "POST",
    "/webhook-test/verify-promo-code",
    requestBody,
    timestamp,
    secretKey
  ),
  "X-Request-ID": "uuid-v4-here",
  "X-Client-Version": "2.0.0",
  "User-Agent": "AuthSystem/2.0.0 (Windows NT 10.0; Win64; x64)",
};
```

### 4.3 Rate Limiting Responses (Standardized Wersja 2)

```typescript
// Standardized rate limit response format
interface RateLimitInfo {
  isLimited: boolean;
  limitType:
    | "verification"
    | "activation"
    | "resend"
    | "analytics"
    | "login"
    | "registration";
  maxAttempts: number;
  attemptsUsed: number;
  attemptsRemaining: number;
  windowMinutes: number;
  retryAfter: number; // seconds until next allowed attempt
  resetTime: string; // ISO 8601 when window resets
  escalationLevel: 1 | 2 | 3 | 4; // 1=warning, 4=severe
}

// Headers included in rate-limited responses
interface RateLimitHeaders {
  "X-RateLimit-Limit": string; // max attempts
  "X-RateLimit-Remaining": string; // attempts remaining
  "X-RateLimit-Reset": string; // unix timestamp
  "X-RateLimit-Window": string; // window size in seconds
  "X-RateLimit-Type": string; // type of rate limit
  "Retry-After": string; // seconds to wait
}

// Example rate limit response
const rateLimitExample = {
  success: false,
  error: {
    type: "RATE_LIMITED",
    message: "Zbyt wiele prób weryfikacji kodu promocyjnego",
    code: "PROMO_VERIFICATION_RATE_LIMITED",
    details: {
      rateLimited: {
        limitType: "verification",
        retryAfter: 900, // 15 minutes
        attemptsRemaining: 0,
        maxAttempts: 10,
        windowMinutes: 15,
      },
    },
  },
  rateLimitInfo: {
    isLimited: true,
    limitType: "verification",
    maxAttempts: 10,
    attemptsUsed: 10,
    attemptsRemaining: 0,
    windowMinutes: 15,
    retryAfter: 900,
    resetTime: "2025-06-15T10:45:00Z",
    escalationLevel: 3,
  },
};
```

## 5. Testing and Monitoring (Wersja 2)

### 5.1 API Testing Endpoints ⭐️ NOWE

````typescript
// Development/Testing only endpoints
const TESTING_ENDPOINTS = {
  // Mock promo codes for testing
  CREATE_TEST_PROMO: "/webhook-test/create-test-promo-code",
  DELETE_TEST_PROMO: "/webhook-test/delete-test-promo-code",

  // Rate limit testing
  RESET_RATE_LIMITS: "/webhook-test/reset-rate-limits",
  GET_RATE_LIMIT_STATUS: "/webhook-test/get-rate-limit-status",

  // Analytics testing
  FLUSH_ANALYTICS_QUEUE: "/webhook-test/flush-analytics-queue",
  GET_ANALYTICS_STATUS: "/webhook-test/get-analytics-status"
};

// Health check endpoint
interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  services: {
    database: 'up' | 'down' | 'slow';
    promoCodeService: 'up' | 'down' | 'slow'; // ⭐️ NOWE
    emailService: 'up' | 'down' | 'slow';
    analyticsService: 'up' | 'down' | 'slow'; // ⭐️ NOWE
    rateLimitingService: 'up' | 'down' | 'slow'; // ⭐️ NOWE
  };
  metrics: {
    responseTime: number; // ms
    activeUsers: number;
    promo# API Schemas - System logowania (Wersja 2)

## 1. Przegląd API (Rozszerzony Wersja 2)

### 1.1 Istniejące endpointy (Zaktualizowane)

```javascript
const EXISTING_ENDPOINTS = {
  BASE_URL: "https://n8n-aipulse.up.railway.app",

  // Istniejące webhoki z rozszerzoną funkcjonalnością
  LOGIN: "/webhook-test/c0c755cf-deb8-4952-8f71-c88943566d72", // ⭐️ Rozszerzony o kody promocyjne
  REGISTER: "/webhook-test/cc9d3a99-22b4-4cf3-97ee-33af0405451d", // ⭐️ Rozszerzony o kody promocyjne
  RESET_INIT: "/webhook-test/014d8471-1c76-46c9-b15f-1009a131ce4f", // ⭐️ Rozszerzony o obsługę nieaktywowanych kont
  RESET_ACTIVATE: "/webhook-test/5ca54e07-d8d5-45d6-bafe-642b209f234a",
  VERIFY_EMAIL: "/webhook-test/66086a0b-da58-4fa5-9132-242db2618345" // ⭐️ Rozszerzony o aktywację kodów promocyjnych
};
````

### 1.2 Nowe endpointy (Wersja 2) ⭐️

```javascript
const NEW_ENDPOINTS = {
  // Obsługa nieaktywowanych kont
  RESEND_ACTIVATION: "/webhook-test/resend-activation-email",

  // System kodów promocyjnych
  VERIFY_PROMO_CODE: "/webhook-test/verify-promo-code",
  ACTIVATE_PROMO_CODE: "/webhook-test/activate-promo-code",
  GET_PROMO_STATUS: "/webhook-test/get-promo-status",

  // Analytics i monitoring
  TRACK_ANALYTICS: "/webhook-test/track-analytics-event",
  GET_USER_ANALYTICS: "/webhook-test/get-user-analytics",
};
```

## 2. Rozszerzone istniejące endpointy (Wersja 2)

### 2.1 LOGIN - Logowanie z opcjonalnym kodem promocyjnym ⭐️

```typescript
// Request (Rozszerzony)
interface LoginRequest {
  email: string;
  password: string;
  promoCode?: string; // ⭐️ NOWE pole opcjonalne
  timestamp: string; // ISO 8601
  clientInfo: {
    userAgent: string;
    ipAddress: string;
    sessionId: string;
  };
}

// Response (Rozszerzony)
interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    user: {
      id: string;
      email: string;
      firstName: string;
      isActive: boolean;
      credits: number; // ⭐️ Uwzględnia kredyty z kodu promocyjnego
      promoCredits?: number; // ⭐️ NOWE - kredyty z kodów promocyjnych
    };
    session: {
      expiresAt: string;
      refreshToken?: string;
    };
    promoCodeResult?: {
      // ⭐️ NOWE
      activated: boolean;
      creditsAdded: number;
      code: string;
      error?: PromoCodeError;
    };
  };
  error?: {
    type:
      | "USER_NOT_FOUND"
      | "INVALID_PASSWORD"
      | "ACCOUNT_INACTIVE"
      | "PROMO_ERROR"
      | "TECHNICAL_ERROR"; // ⭐️ Rozszerzone
    message: string;
    code: string;
    details?: {
      // Dla nieaktywowanych kont ⭐️ NOWE
      accountStatus?: "INACTIVE";
      activationEmailSent?: boolean;
      resendAvailable?: boolean;
      resendCooldown?: number; // seconds

      // Dla błędów kodów promocyjnych ⭐️ NOWE
      promoError?: {
        type: "INVALID" | "EXPIRED" | "ALREADY_USED" | "RATE_LIMITED";
        retryAfter?: number;
        details?: string;
      };
    };
  };
}

// Przykład żądania
const loginExample = {
  email: "user@example.com",
  password: "SecurePassword123!",
  promoCode: "WELCOME2024", // ⭐️ NOWE
  timestamp: "2025-06-15T10:30:00Z",
  clientInfo: {
    userAgent: "Mozilla/5.0...",
    ipAddress: "192.168.1.1",
    sessionId: "uuid-session-id",
  },
};

// Przykład odpowiedzi sukces z kodem promocyjnym
const loginSuccessExample = {
  success: true,
  data: {
    token: "jwt-token-here",
    user: {
      id: "user-uuid",
      email: "user@example.com",
      firstName: "Jan",
      isActive: true,
      credits: 150, // 100 bazowych + 50 z kodu promocyjnego
      promoCredits: 50, // ⭐️ NOWE
    },
    session: {
      expiresAt: "2025-06-15T15:30:00Z",
      refreshToken: "refresh-token-here",
    },
    promoCodeResult: {
      // ⭐️ NOWE
      activated: true,
      creditsAdded: 50,
      code: "WELCOME2024",
    },
  },
};

// Przykład odpowiedzi - konto nieaktywowane
const inactiveAccountExample = {
  success: false,
  error: {
    type: "ACCOUNT_INACTIVE",
    message: "Twoje konto nie zostało jeszcze aktywowane",
    code: "ACCOUNT_NOT_ACTIVATED",
    details: {
      accountStatus: "INACTIVE",
      activationEmailSent: false,
      resendAvailable: true,
      resendCooldown: 0,
    },
  },
};
```

### 2.2 REGISTER - Rejestracja z opcjonalnym kodem promocyjnym ⭐️

```typescript
// Request (Rozszerzony)
interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  phone?: string;
  promoCode?: string; // ⭐️
```
