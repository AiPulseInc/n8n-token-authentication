# Plan implementacji - System logowania (Wersja 2)

## 1. Harmonogram sprintów (Zaktualizowany Wersja 2)

### Sprint 1 (2 tygodnie) - Core Authentication + Account Activation

**Cele**: Podstawowa funkcjonalność logowania, rejestracji i obsługa nieaktywowanych kont
**Daty**: Tydzień 1-2
**Team size**: 2 developerów
**Story Points**: 68 (było 60) ⭐️ +8 SP

#### Week 1: Foundation & Login

**Zadania**:

- **US-001**: Logowanie zarejestrowanego użytkownika z opcjonalnym kodem promocyjnym (10h) ⭐️ +2h
- **US-002**: Obsługa błędów - użytkownik nieznaleziony (4h)
- **US-003**: Obsługa błędów - nieprawidłowe hasło (4h)
- **US-003A**: ⭐️ NOWE - Obsługa błędów - konto nieaktywowane (5h)
- **Setup**: Struktura projektu, routing, API integration (16h)

**Deliverables**:

- Działający formularz logowania z opcjonalnym kodem promocyjnym
- Integracja z n8n webhook
- Obsługa błędów включая nieaktywowane konta
- Responsive layout

#### Week 2: Registration + Account Activation

**Zadania**:

- **US-007**: Inicjowanie rejestracji z opcjonalnym kodem promocyjnym (15h) ⭐️ +3h
- **US-008**: Weryfikacja adresu email z aktywacją kodów promocyjnych (10h) ⭐️ +2h
- **US-009**: Obsługa błędów rejestracji (6h)
- **Endpoint**: ⭐️ NOWE - Webhook do ponownego wysyłania emaila aktywacyjnego (3h)
- **Testing**: E2E testy dla happy path scenarios włączając kody promocyjne (14h)

**Deliverables**:

- Kompletny proces rejestracji z kodami promocyjnymi
- Weryfikacja email z aktywacją bonusów
- Ponowne wysyłanie emaili aktywacyjnych
- Automated testing suite
- **Milestone**: MVP authentication system z podstawową obsługą kodów promocyjnych

---

### Sprint 2 (2 tygodnie) - Password Management + Basic Promo Codes

**Cele**: Resetowanie haseł, zarządzanie sesją i pełny system kodów promocyjnych
**Daty**: Tydzień 3-4
**Team size**: 2 developerów
**Story Points**: 85 (było 54) ⭐️ +31 SP

#### Week 3: Password Reset + Promo Codes Core

**Zadania**:

- **US-005**: Inicjowanie resetowania hasła z obsługą nieaktywowanych kont (10h)
- **US-006**: Aktywacja nowego hasła (8h)
- **US-021**: ⭐️ NOWE - Kod promocyjny podczas rejestracji (8h)
- **US-022**: ⭐️ NOWE - Kod promocyjny podczas logowania (5h)
- **API Integration**: ⭐️ NOWE - Endpointy dla kodów promocyjnych (8h)

**Deliverables**:

- Pop-up resetowania hasła z obsługą nieaktywowanych kont
- Email verification flow
- Kompletny system kodów promocyjnych podczas rejestracji i logowania
- API integration dla weryfikacji i aktywacji kodów

#### Week 4: Session Management + Promo Code Error Handling

**Zadania**:

- **US-011**: Wylogowanie użytkownika (4h)
- **US-013**: Wyświetlanie danych zalogowanego użytkownika z kredytami promocyjnymi (6h) ⭐️ +1h
- **US-010**: Automatyczne wylogowanie (12h)
- **US-012**: Zarządzanie tokenem w wielu oknach (8h)
- **US-004**: Obsługa błędów technicznych (6h)
- **US-023-026**: ⭐️ NOWE - Kompletna obsługa błędów kodów promocyjnych (10h)
- **Refactoring**: Code review, optymalizacja, dokumentacja (14h)

**Deliverables**:

- Kompletny auth system z session management
- Pełna obsługa błędów kodów promocyjnych
- User info display z kredytami promocyjnymi
- **Milestone**: Complete auth system z funkcjonalnym systemem kodów promocyjnych

---

### Sprint 3 (2 tygodnie) - Security & UX Enhancements

**Cele**: Bezpieczeństwo, rate limiting i podstawowe UX improvements
**Daty**: Tydzień 5-6
**Team size**: 2 developerów + 1 security reviewer
**Story Points**: 66 (bez zmian, ale rozszerzone o nowe funkcjonalności)

#### Week 5: Security Features + Extended Rate Limiting

**Zadania**:

- **US-014**: Rate limiting dla bezpieczeństwa z kodami promocyjnymi (18h) ⭐️ +2h
- **US-015**: Obsługa stanów ładowania z kodami promocyjnymi (10h) ⭐️ +2h
- **US-016**: Recovery po błędach sieci z obsługą kodów promocyjnych (14h) ⭐️ +2h
- **Security audit**: Penetration testing, code review including promo codes (4h)

**Deliverables**:

- Rate limiting implementation z obsługą kodów promocyjnych
- Loading states dla wszystkich form włączając kody promocyjne
- Network error recovery z zachowaniem kodów promocyjnych
- Security assessment report z oceną systemu kodów promocyjnych

#### Week 6: Advanced Features + Analytics

**Zadania**:

- **US-018**: Token refresh mechanism (14h)
- **US-020**: ⭐️ ROZSZERZONE - Analytics i monitoring z eventami promocyjnymi (8h) ⭐️ +3h
- **Performance optimization**: Bundle size, loading times (8h)
- **Cross-browser testing**: Safari, Firefox, Chrome, Edge (8h)
- **Mobile testing**: iOS Safari, Android Chrome (8h)

**Deliverables**:

- Token refresh mechanism
- Analytics z pełnym śledzeniem kodów promocyjnych
- Performance optimization
- **Milestone**: Bezpieczny i wydajny system z dobrym UX i analytics

---

### Sprint 4 (2 tygodnie) - Accessibility & Quality

**Cele**: Dostępność, zaawansowane funkcje i przygotowanie do produkcji
**Daty**: Tydzień 7-8
**Team size**: 2 developerów + 1 security reviewer + 1 accessibility expert
**Story Points**: 70 (było 70, ale inne priorytety)

#### Week 7: Accessibility + Enhanced Email Validation

**Zadania**:

- **US-017**: Accessibility compliance z kodami promocyjnymi (25h) ⭐️ +4h
- **US-019**: Enhanced email validation (13h)
- **UI/UX polish**: Animations, micro-interactions z kodami promocyjnymi (8h) ⭐️ +2h
- **Accessibility audit**: Screen reader testing, keyboard navigation (4h)

**Deliverables**:

- WCAG 2.1 AA compliance z pełną obsługą kodów promocyjnych
- Advanced email validation z sugestiami
- Polished UI z smooth animations
- Accessibility audit report

#### Week 8: Final Testing + Production Preparation

**Zadania**:

- **Final testing**: Load testing, stress testing z kodami promocyjnymi (10h) ⭐️ +2h
- **Documentation**: User guides, admin documentation (8h)
- **Deployment preparation**: Production configuration (6h)
- **Analytics verification**: ⭐️ NOWE - Weryfikacja śledzenia kodów promocyjnych (4h)
- **Go-live checklist**: Production readiness review (2h)

**Deliverables**:

- Production-ready aplikacja z pełną funkcjonalnością
- Kompletna dokumentacja
- Analytics dashboard z metrykami kodów promocyjnych
- **Milestone**: Go-live ready system

---

## 2. Nowe zadania techniczne (Wersja 2)

### 2.1 Promo Code System Architecture

```
Promo Code Flow (31 SP dodatkowe):
├── Promo code input components (8 SP)
├── Real-time validation service (5 SP)
├── API integration for verification (8 SP)
├── Error handling system (10 SP)
└── Analytics integration (0 SP - included in existing)
```

### 2.2 Account Activation Enhancement

```
Account Activation Flow (8 SP dodatkowe):
├── Inactive account detection (3 SP)
├── Resend activation email (3 SP)
├── Rate limiting for resends (2 SP)
└── UI/UX improvements (0 SP - included in existing)
```

### 2.3 Extended Rate Limiting

```
Enhanced Rate Limiting (6 SP dodatkowe):
├── Promo code verification limits (2 SP)
├── Promo code activation limits (2 SP)
├── Activation email resend limits (2 SP)
└── Improved error messages (0 SP - included in existing)
```

---

## 3. Pull Request Strategy (Zaktualizowana Wersja 2)

### PR Guidelines:

```
Naming Convention:
[SPRINT-X] US-XXX: Brief description

Nowe przykłady Wersja 2:
[SPRINT-1] US-003A: Handle inactive account login attempts
[SPRINT-2] US-021: Implement promo code during registration
[SPRINT-2] US-022: Add promo code support to login flow
[SPRINT-2] US-023-026: Complete promo code error handling
```

### PR Size Strategy (Zaktualizowana):

- **Small PRs** (< 300 lines): Daily merges - preferowane dla nowych funkcji
- **Medium PRs** (300-800 lines): 2-3 day cycles - dla kompleksowych funkcji jak kody promocyjne
- **Large PRs** (> 800 lines): Weekly, broken into smaller chunks - unikane w Wersji 2

### Review Process (Rozszerzony):

1. **Self-review** - Author checks own code
2. **Peer review** - 1-2 developers review
3. **Security review** - For auth-related changes + promo code security
4. **QA testing** - Manual testing before merge including promo codes
5. **Analytics verification** ⭐️ NOWE - Sprawdzenie eventów promocyjnych
6. **Automated testing** - CI/CD pipeline validation

### Recommended PR Breakdown by Sprint (Wersja 2):

**Sprint 1 (Zaktualizowany):**

- PR1: Project setup + US-001 (login form + API + optional promo field)
- PR2: US-002 + US-003 (error handling)
- PR3: ⭐️ NOWE US-003A (inactive account handling + resend email)
- PR4: US-007 (registration form + optional promo field)
- PR5: US-008 + US-009 (email verification + promo activation + errors)

**Sprint 2 (Rozszerzony):**

- PR6: US-005 + US-006 (password reset flow + inactive account handling)
- PR7: ⭐️ NOWE US-021 (promo code registration integration)
- PR8: ⭐️ NOWE US-022 (promo code login integration)
- PR9: US-011 + US-013 (logout + user display with promo credits)
- PR10: US-010 + US-012 (session management)
- PR11: US-004 (technical error handling)
- PR12: ⭐️ NOWE US-023-026 (complete promo code error handling)

**Sprint 3 (Rozszerzony):**

- PR13: US-014 (rate limiting + promo code limits)
- PR14: US-015 (loading states + promo code loading)
- PR15: US-016 (network recovery + promo code preservation)
- PR16: US-018 (token refresh)
- PR17: ⭐️ ROZSZERZONE US-020 (analytics + promo events)

**Sprint 4 (Zaktualizowany):**

- PR18: US-017 (accessibility + promo code accessibility)
- PR19: US-019 (email validation)
- PR20: Final polish + promo code UX improvements
- PR21: Production fixes + analytics verification

---

## 4. Risk Mitigation (Zaktualizowana Wersja 2)

### Nowe ryzyka w Wersji 2:

**Sprint 1 Risks:**

- ⭐️ NOWE Complexity of promo code integration → Start with simple validation
- ⭐️ NOWE Inactive account flow complexity → Prototype early

**Sprint 2 Risks:**

- ⭐️ NOWE Promo code API integration challenges → Mock API first
- ⭐️ NOWE Rate limiting complexity with multiple systems → Incremental implementation

**Sprint 3 Risks:**

- ⭐️ NOWE Analytics integration complexity → Use existing tools
- ⭐️ NOWE Performance impact of additional API calls → Optimize early

**Sprint 4 Risks:**

- ⭐️ NOWE Accessibility compliance with new features → Expert consultation
- ⭐️ NOWE Production analytics configuration → Test thoroughly

---

## 5. Success Metrics (Rozszerzone Wersja 2)

### Sprint 1 (Zaktualizowane):

- Basic functionality works: 100%
- Test coverage: >80%
- Mobile compatibility: 100%
- ⭐️ NOWE Inactive account handling: 100%
- ⭐️ NOWE Basic promo code UI: 100%

### Sprint 2 (Rozszerzone):

- Password reset success: >90%
- Session accuracy: ±10 seconds
- Multi-tab sync: <500ms latency
- ⭐️ NOWE Promo code verification: >95% accuracy
- ⭐️ NOWE Promo code activation: >90% success rate

### Sprint 3 (Rozszerzone):

- Rate limiting effectiveness: 100%
- Network error recovery: >95%
- Performance benchmarks: Met
- ⭐️ NOWE Promo code rate limiting: 100%
- ⭐️ NOWE Analytics events firing: 100%

### Sprint 4 (Zaktualizowane):

- WCAG compliance: Level AA
- Production readiness: 100%
- User acceptance: >4.0/5.0
- ⭐️ NOWE Promo code accessibility: Level AA
- ⭐️ NOWE Analytics dashboard: Functional

---

## 6. Monitoring i Analytics (Nowe Wersja 2)

### Kluczowe metryki do śledzenia:

**Podstawowe metryki (istniejące):**

- Login success rate
- Registration completion rate
- Password reset success rate
- Session management effectiveness

**Nowe metryki kodów promocyjnych ⭐️:**

- Conversion rate rejestracji z kodami vs bez kodów
- Najpopularniejsze kody promocyjne
- Współczynnik błędów weryfikacji kodów
- Średnia wartość kredytów z kodów promocyjnych
- Retention użytkowników z kodami vs bez
- A/B testing effectiveness

**Nowe metryki aktywacji konta ⭐️:**

- Czas od rejestracji do aktywacji konta
- Skuteczność ponownego wysyłania emaili aktywacyjnych
- Współczynnik porzuceń w procesie aktywacji

### Dashboard Configuration:

```javascript
const dashboardMetrics = {
  realTime: [
    "active_users",
    "login_attempts",
    "promo_code_attempts", // ⭐️ NOWE
    "activation_emails_sent", // ⭐️ NOWE
  ],
  daily: [
    "registration_conversion",
    "promo_code_conversion", // ⭐️ NOWE
    "account_activation_rate", // ⭐️ NOWE
    "error_rates",
  ],
  weekly: [
    "user_retention",
    "promo_code_effectiveness", // ⭐️ NOWE
    "feature_adoption",
    "performance_trends",
  ],
};
```

---

## 7. Deployment Strategy (Zaktualizowana Wersja 2)

### Feature Flags dla Nowych Funkcjonalności:

```javascript
const featureFlags = {
  PROMO_CODES_ENABLED: true, // ⭐️ NOWE
  INACTIVE_ACCOUNT_HANDLING: true, // ⭐️ NOWE
  ENHANCED_ANALYTICS: true, // ⭐️ NOWE
  EXTENDED_RATE_LIMITING: true, // ⭐️ NOWE
  ACCESSIBILITY_ENHANCEMENTS: true,
};
```

### Rollout Plan:

1. **Soft Launch** (Week 7): Internal testing z wszystkimi nowymi funkcjami
2. **Beta Launch** (Week 8): Limited user group z pełnym systemem kodów promocyjnych
3. **Full Launch** (Week 9): Production deployment z pełnym monitoringiem

### Rollback Scenarios:

```javascript
const rollbackTriggers = {
  PROMO_CODE_ERROR_RATE: 5%, // ⭐️ NOWE
  ACTIVATION_EMAIL_FAILURES: 10%, // ⭐️ NOWE
  ANALYTICS_DATA_LOSS: 'immediate', // ⭐️ NOWE
  GENERAL_ERROR_RATE: 2%
};
```

---

**Wersja dokumentu**: 2.0
**Data aktualizacji**: Czerwiec 2025
**Główne zmiany**: +47 Story Points, system kodów promocyjnych, obsługa nieaktywowanych kont, rozszerzone analytics, zaktualizowane timeline
