# UI/UX Component Library - Authentication System

## Design System Fundamentals

### Color Palette

```css
/* Primary Colors */
--primary-500: #3b82f6; /* Main CTA buttons */
--primary-600: #2563eb; /* Hover states */
--primary-700: #1d4ed8; /* Active states */

/* Success/Error States */
--success-500: #10b981; /* Success messages */
--error-500: #ef4444; /* Error messages */
--warning-500: #f59e0b; /* Warning states */

/* Neutral Colors */
--gray-50: #f9fafb; /* Background */
--gray-100: #f3f4f6; /* Input backgrounds */
--gray-500: #6b7280; /* Placeholder text */
--gray-900: #111827; /* Main text */
```

### Typography Scale

```css
--text-xs: 0.75rem; /* 12px - Helper text */
--text-sm: 0.875rem; /* 14px - Labels */
--text-base: 1rem; /* 16px - Body text */
--text-lg: 1.125rem; /* 18px - Form titles */
--text-xl: 1.25rem; /* 20px - Page titles */
```

### Spacing System

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
```

## Core Components

### 1. AuthForm Container

```scss
.auth-form {
  max-width: 400px;
  margin: 0 auto;
  padding: var(--space-8);
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  &__title {
    font-size: var(--text-xl);
    font-weight: 600;
    text-align: center;
    margin-bottom: var(--space-6);
    color: var(--gray-900);
  }
}
```

### 2. Input Field Component

```scss
.form-field {
  margin-bottom: var(--space-4);

  &__label {
    display: block;
    font-size: var(--text-sm);
    font-weight: 500;
    margin-bottom: var(--space-2);
    color: var(--gray-900);
  }

  &__input {
    width: 100%;
    padding: var(--space-3) var(--space-4);
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: var(--text-base);
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--primary-500);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    &--error {
      border-color: var(--error-500);

      &:focus {
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
    }
  }

  &__error {
    font-size: var(--text-xs);
    color: var(--error-500);
    margin-top: var(--space-1);
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }

  &__helper {
    font-size: var(--text-xs);
    color: var(--gray-500);
    margin-top: var(--space-1);
  }
}
```

### 3. Button Components

```scss
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: 8px;
  font-size: var(--text-sm);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px; /* Touch-friendly */

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--primary {
    background: var(--primary-500);
    color: white;

    &:hover:not(:disabled) {
      background: var(--primary-600);
    }

    &:active {
      background: var(--primary-700);
    }
  }

  &--secondary {
    background: white;
    color: var(--gray-900);
    border: 1px solid #d1d5db;

    &:hover:not(:disabled) {
      background: var(--gray-50);
    }
  }

  &--link {
    background: transparent;
    color: var(--primary-500);
    padding: var(--space-1) var(--space-2);

    &:hover {
      color: var(--primary-600);
      text-decoration: underline;
    }
  }

  &--full-width {
    width: 100%;
  }
}
```

### 4. Loading States

```scss
.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.btn--loading {
  pointer-events: none;

  .btn__text {
    opacity: 0.7;
  }
}
```

### 5. Alert/Message Components

```scss
.alert {
  padding: var(--space-4);
  border-radius: 8px;
  font-size: var(--text-sm);
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  margin-bottom: var(--space-4);

  &--success {
    background: #ecfdf5;
    color: #065f46;
    border: 1px solid #a7f3d0;
  }

  &--error {
    background: #fef2f2;
    color: #991b1b;
    border: 1px solid #fecaca;
  }

  &--warning {
    background: #fffbeb;
    color: #92400e;
    border: 1px solid #fde68a;
  }

  &--info {
    background: #eff6ff;
    color: #1e40af;
    border: 1px solid #bfdbfe;
  }

  &__icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  &__content {
    flex: 1;
  }

  &__title {
    font-weight: 500;
    margin-bottom: var(--space-1);
  }

  &__message {
    line-height: 1.5;
  }

  &__actions {
    margin-top: var(--space-2);
    display: flex;
    gap: var(--space-3);
  }
}
```

### 6. Modal/Popup Components

```scss
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.2s ease forwards;
}

.modal {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  transform: scale(0.95);
  animation: scaleIn 0.2s ease forwards;

  &__header {
    padding: var(--space-6) var(--space-6) var(--space-4);
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--gray-900);
  }

  &__close {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: var(--space-2);
    border-radius: 4px;

    &:hover {
      background: var(--gray-100);
    }
  }

  &__body {
    padding: var(--space-6);
  }

  &__footer {
    padding: var(--space-4) var(--space-6);
    border-top: 1px solid #e5e7eb;
    display: flex;
    gap: var(--space-3);
    justify-content: flex-end;
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  to {
    transform: scale(1);
  }
}
```

## Layout Patterns

### 7. User Info Display

```scss
.user-info {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--gray-50);
  border-radius: 8px;

  &__avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--primary-500);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 500;
    font-size: var(--text-sm);
  }

  &__details {
    flex: 1;
  }

  &__name {
    font-weight: 500;
    color: var(--gray-900);
    margin-bottom: 2px;
  }

  &__credits {
    font-size: var(--text-xs);
    color: var(--gray-500);

    &--low {
      color: var(--warning-500);
      font-weight: 500;
    }
  }

  &__actions {
    display: flex;
    gap: var(--space-2);
  }
}
```

### 8. Form Link Groups

```scss
.form-links {
  text-align: center;
  margin-top: var(--space-6);
  padding-top: var(--space-4);
  border-top: 1px solid #e5e7eb;

  &__primary {
    margin-bottom: var(--space-3);
  }

  &__secondary {
    display: flex;
    gap: var(--space-4);
    justify-content: center;
    font-size: var(--text-sm);
  }
}
```

## Responsive Design

### Mobile-First Breakpoints

```scss
// Mobile: 320px - 768px (default)
// Tablet: 768px - 1024px
// Desktop: 1024px+

@media (max-width: 768px) {
  .auth-form {
    padding: var(--space-6) var(--space-4);
    margin: var(--space-4);
  }

  .modal {
    width: 95vw;
    margin: var(--space-4);
  }

  .form-links__secondary {
    flex-direction: column;
    gap: var(--space-2);
  }
}

@media (max-width: 480px) {
  .btn {
    padding: var(--space-4) var(--space-4);
    font-size: var(--text-base);
  }

  .auth-form__title {
    font-size: var(--text-lg);
  }
}
```

## Accessibility Features

### Focus Management

```scss
.focus-trap-active {
  overflow: hidden;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

// High contrast mode support
@media (prefers-contrast: high) {
  .btn--primary {
    border: 2px solid var(--primary-700);
  }

  .form-field__input:focus {
    border-width: 2px;
  }
}

// Reduced motion support
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Component States Reference

### Input Field States

- Default: Normal appearance
- Focus: Blue border + shadow
- Error: Red border + error message
- Disabled: Reduced opacity
- Loading: Spinner + disabled state

### Button States

- Default: Primary color
- Hover: Darker shade
- Active: Even darker shade
- Disabled: Reduced opacity
- Loading: Spinner + disabled

### Form States

- Initial: Clean form
- Validating: Loading indicators
- Success: Green confirmation
- Error: Red error messages
- Submitting: Disabled form + loading

## Animation Guidelines

### Timing Functions

```scss
--ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-in: cubic-bezier(0.55, 0.055, 0.675, 0.19);
--ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);
```

### Duration Standards

- Micro-interactions: 150ms
- Component transitions: 200ms
- Page transitions: 300ms
- Complex animations: 500ms max
