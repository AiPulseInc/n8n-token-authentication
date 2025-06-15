# API Response Schemas & Error Handling

## Base Response Structure

### Success Response Format

```typescript
interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  timestamp: string;
}
```

### Error Response Format

```typescript
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  timestamp: string;
}
```

## Endpoint Schemas

### 1. Login Endpoint

**URL**: `https://n8n-aipulse.up.railway.app/webhook-test/c0c755cf-deb8-4952-8f71-c88943566d72`

#### Request Schema

```typescript
interface LoginRequest {
  email: string; // Valid email format
  password: string; // Minimum 8 characters
}
```

#### Success Response

```typescript
interface LoginSuccessData {
  user: {
    id: string;
    name: string;        // First name for display
    email: string;       // User's email
    credits: number;     // Remaining credits
  };
  token: string;         // JWT or session token
  expiresAt: string;     // ISO timestamp
}

// Example Response
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "Jan",
      "email": "jan.kowalski@example.com",
      "credits": 50
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresAt": "2025-06-15T14:30:00Z"
  },
  "timestamp": "2025-06-15T13:30:00Z"
}
```

#### Error Responses

```typescript
// User not found
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "Nie znaleziono użytkownika o podanym adresie email"
  },
  "timestamp": "2025-06-15T13:30:00Z"
}

// Invalid password
{
  "success": false,
  "error": {
    "code": "INVALID_PASSWORD",
    "message": "Nieprawidłowe hasło"
  },
  "timestamp": "2025-06-15T13:30:00Z"
}

// Rate limit exceeded
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut.",
    "details": {
      "retryAfter": 900 // seconds
    }
  },
  "timestamp": "2025-06-15T13:30:00Z"
}
```

### 2. Registration Endpoint

**URL**: `https://n8n-aipulse.up.railway.app/webhook-test/cc9d3a99-22b4-4cf3-97ee-33af0405451d`

#### Request Schema

```typescript
interface RegistrationRequest {
  email: string; // Valid email format
  password: string; // Password meeting security requirements
  confirmPassword: string; // Must match password
  name: string; // First name, 2-50 characters
  phone?: string; // Optional, valid phone format
}
```

#### Success Response

```typescript
interface RegistrationSuccessData {
  user: {
    id: string;
    email: string;
    name: string;
    status: "pending_verification" | "active";
  };
  verificationSent: boolean;
}

// Example Response
{
  "success": true,
  "data": {
    "user": {
      "id": "user_124",
      "email": "nowy@example.com",
      "name": "Anna",
      "status": "pending_verification"
    },
    "verificationSent": true
  },
  "message": "Konto zostało utworzone. Sprawdź email w celu weryfikacji.",
  "timestamp": "2025-06-15T13:30:00Z"
}
```

#### Error Responses

```typescript
// Email already exists
{
  "success": false,
  "error": {
    "code": "EMAIL_ALREADY_EXISTS",
    "message": "Konto z tym adresem email już istnieje"
  },
  "timestamp": "2025-06-15T13:30:00Z"
}

// Validation errors
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dane formularza zawierają błędy",
    "details": {
      "email": "Nieprawidłowy format emaila",
      "password": "Hasło musi zawierać minimum 8 znaków, dużą literę i cyfrę",
      "phone": "Nieprawidłowy format numeru telefonu"
    }
  },
  "timestamp": "2025-06-15T13:30:00Z"
}
```

### 3. Password Reset Initiation

**URL**: `https://n8n-aipulse.up.railway.app/webhook-test/014d8471-1c76-46c9-b15f-1009a131ce4f`

#### Request Schema

```typescript
interface ResetPasswordRequest {
  email: string; // User's email
  newPassword: string; // New password meeting requirements
}
```

#### Success Response

```typescript
interface ResetPasswordSuccessData {
  verificationSent: boolean;
  expiresAt: string; // Link expiration time
}

// Example Response
{
  "success": true,
  "data": {
    "verificationSent": true,
    "expiresAt": "2025-06-15T15:30:00Z"
  },
  "message": "Link weryfikacyjny został wysłany na podany adres email",
  "timestamp": "2025-06-15T13:30:00Z"
}
```

### 4. Password Reset Activation

**URL**: `https://n8n-aipulse.up.railway.app/webhook-test/5ca54e07-d8d5-45d6-bafe-642b209f234a`

#### Request Schema

```typescript
interface ActivatePasswordRequest {
  token: string; // Verification token from email
  email: string; // User's email
}
```

#### Success Response

```typescript
interface ActivatePasswordSuccessData {
  activated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Example Response
{
  "success": true,
  "data": {
    "activated": true,
    "user": {
      "id": "user_123",
      "email": "jan.kowalski@example.com",
      "name": "Jan"
    }
  },
  "message": "Hasło zostało zmienione pomyślnie",
  "timestamp": "2025-06-15T13:30:00Z"
}
```

### 5. Email Verification

**URL**: `https://n8n-aipulse.up.railway.app/webhook-test/66086a0b-da58-4fa5-9132-242db2618345`

#### Request Schema

```typescript
interface VerifyEmailRequest {
  token: string; // Verification token from email
  email: string; // User's email
}
```

#### Success Response

```typescript
interface VerifyEmailSuccessData {
  verified: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    status: "active";
    credits: number;
  };
}

// Example Response
{
  "success": true,
  "data": {
    "verified": true,
    "user": {
      "id": "user_124",
      "email": "nowy@example.com",
      "name": "Anna",
      "status": "active",
      "credits": 10
    }
  },
  "message": "Adres email został zweryfikowany",
  "timestamp": "2025-06-15T13:30:00Z"
}
```

## Error Code Reference

### Authentication Errors

| Code                 | Message                        | Action                   |
| -------------------- | ------------------------------ | ------------------------ |
| `USER_NOT_FOUND`     | Nie znaleziono użytkownika     | Show registration link   |
| `INVALID_PASSWORD`   | Nieprawidłowe hasło            | Show password reset link |
| `ACCOUNT_LOCKED`     | Konto zostało zablokowane      | Contact support          |
| `EMAIL_NOT_VERIFIED` | Email nie został zweryfikowany | Resend verification      |

### Validation Errors

| Code                   | Message                     | Action                     |
| ---------------------- | --------------------------- | -------------------------- |
| `VALIDATION_ERROR`     | Błędy walidacji             | Show field-specific errors |
| `EMAIL_INVALID`        | Nieprawidłowy format emaila | Validate email format      |
| `PASSWORD_WEAK`        | Hasło nie spełnia wymagań   | Show password requirements |
| `EMAIL_ALREADY_EXISTS` | Email już istnieje          | Show login link            |

### Rate Limiting Errors

| Code                  | Message                | Action           |
| --------------------- | ---------------------- | ---------------- |
| `RATE_LIMIT_EXCEEDED` | Zbyt wiele prób        | Show retry timer |
| `IP_BLOCKED`          | IP zostało zablokowane | Contact support  |

### System Errors

| Code                  | Message                  | Action                         |
| --------------------- | ------------------------ | ------------------------------ |
| `INTERNAL_ERROR`      | Błąd wewnętrzny serwera  | Retry with exponential backoff |
| `SERVICE_UNAVAILABLE` | Serwis niedostępny       | Show maintenance message       |
| `TIMEOUT`             | Przekroczono limit czasu | Retry request                  |

## Client-Side Error Handling Strategy

### Error Classification

```typescript
enum ErrorType {
  VALIDATION = "validation",
  AUTHENTICATION = "authentication",
  RATE_LIMIT = "rate_limit",
  NETWORK = "network",
  SERVER = "server",
  UNKNOWN = "unknown",
}

interface ProcessedError {
  type: ErrorType;
  message: string;
  actions: string[];
  recoverable: boolean;
  retryable: boolean;
}
```

### Error Processing Function

```typescript
function processApiError(error: any): ProcessedError {
  // Network errors
  if (!error.response) {
    return {
      type: ErrorType.NETWORK,
      message:
        "Wystąpił problem z połączeniem. Sprawdź internet i spróbuj ponownie.",
      actions: ["retry", "check_connection"],
      recoverable: true,
      retryable: true,
    };
  }

  // Server errors (5xx)
  if (error.response.status >= 500) {
    return {
      type: ErrorType.SERVER,
      message: "Wystąpił problem z serwerem. Spróbuj ponownie za chwilę.",
      actions: ["retry", "contact_support"],
      recoverable: true,
      retryable: true,
    };
  }

  // Client errors (4xx)
  const errorData = error.response.data;

  switch (errorData.error?.code) {
    case "RATE_LIMIT_EXCEEDED":
      return {
        type: ErrorType.RATE_LIMIT,
        message: errorData.error.message,
        actions: ["wait", "retry_later"],
        recoverable: true,
        retryable: false,
      };

    case "USER_NOT_FOUND":
    case "INVALID_PASSWORD":
      return {
        type: ErrorType.AUTHENTICATION,
        message: errorData.error.message,
        actions: ["check_credentials", "reset_password"],
        recoverable: true,
        retryable: false,
      };

    case "VALIDATION_ERROR":
      return {
        type: ErrorType.VALIDATION,
        message: errorData.error.message,
        actions: ["fix_validation"],
        recoverable: true,
        retryable: false,
      };

    default:
      return {
        type: ErrorType.UNKNOWN,
        message: errorData.error?.message || "Wystąpił nieoczekiwany błąd",
        actions: ["retry", "contact_support"],
        recoverable: false,
        retryable: true,
      };
  }
}
```

## HTTP Status Codes Mapping

### Expected Status Codes

- `200` - Success (check response.success field)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication failed)
- `403` - Forbidden (access denied)
- `404` - Not Found (endpoint not found)
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error
- `502` - Bad Gateway
- `503` - Service Unavailable
- `504` - Gateway Timeout

### Client-Side Handling

```typescript
const handleHttpStatus = (status: number, data: any) => {
  switch (status) {
    case 200:
      return data.success ? handleSuccess(data) : handleLogicError(data);
    case 400:
      return handleValidationError(data);
    case 401:
      return handleAuthError(data);
    case 429:
      return handleRateLimit(data);
    case 500:
    case 502:
    case 503:
    case 504:
      return handleServerError(status, data);
    default:
      return handleUnknownError(status, data);
  }
};
```

## Testing Scenarios

### Success Scenarios

1. Valid login with correct credentials
2. Successful registration with valid data
3. Password reset with existing email
4. Email verification with valid token

### Error Scenarios

1. Login with non-existent email
2. Login with wrong password
3. Registration with existing email
4. Password reset with non-existent email
5. Invalid token verification
6. Expired token usage
7. Rate limit exceeded
8. Network connection errors
9. Server errors (5xx)
10. Malformed request data

### Edge Cases

1. Simultaneous login attempts
2. Token expiration during active session
3. Multiple password reset requests
4. Registration with special characters
5. Very long input fields
6. Malicious input attempts
7. Concurrent email verification
8. System maintenance scenarios
