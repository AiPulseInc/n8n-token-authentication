# System Logowania (Wersja 2)

Kompletny system autentyfikacji z rejestracją, logowaniem, resetowaniem haseł, zarządzaniem sesją i systemem kodów promocyjnych.

## 🚀 Quick Start

```bash
# Klonowanie i instalacja
git clone https://github.com/your-org/auth-system.git
cd auth-system
npm install

# Konfiguracja
cp .env.example .env.local
# Edytuj .env.local z właściwymi wartościami

# Uruchomienie
npm run dev
# Aplikacja dostępna na http://localhost:3000
```

## 📁 Struktura Projektu

```
src/
├── components/auth/     # Komponenty logowania, rejestracji, kodów promocyjnych
├── hooks/              # useAuth, useSession, useApiCall, usePromoCode
├── services/           # API clients, session management, promo code service
├── utils/              # Walidacja, helpers, rate limiting
└── tests/              # Unit, integration, e2e tests
```

## 🔧 Podstawowe Komendy

```bash
npm run dev          # Development server
npm run build        # Production build
npm run test         # Uruchom wszystkie testy
npm run lint         # Code linting
npm run format       # Code formatting
```

## 📚 Dokumentacja

### 📋 Wymagania i Planowanie

- **[Wymagania Funkcjonalne](./docs/requirements/functional-requirements.md)** - Kompletne User Stories i kryteria akceptacji (Wersja 2)
- **[Wymagania Techniczne](./docs/requirements/technical-requirements.md)** - Stack technologiczny, performance requirements (Wersja 2)
- **[User Stories](./docs/requirements/user-stories.md)** - Szczegółowy breakdown wszystkich funkcjonalności (Wersja 2)

### 🏗️ Implementacja

- **[Plan Projektu](./docs/implementation/project-plan.md)** - Harmonogram sprintów i milestone'ów (Wersja 2)
- **[Sprint Breakdown](./docs/implementation/sprint-breakdown.md)** - Szczegółowy podział zadań (Wersja 2)
- **[PR Strategy](./docs/implementation/pr-strategy.md)** - Workflow i guidelines dla Pull Requestów

### 🛠️ Rozwój

- **[Development Workflow](./docs/process/development-workflow.md)** - Proces developmentu
- **[Definition of Done](./docs/process/definition-of-done.md)** - Kryteria ukończenia zadań

### 🎨 Design i UX

- **[Component Library](./docs/design/component-library.md)** - Katalog komponentów UI
- **[UI Guidelines](./docs/design/ui-guidelines.md)** - Standardy designu i accessibility

### 🔧 Technical

- **[Architecture](./docs/technical/architecture.md)** - Architektura systemu
- **[API Schemas](./docs/technical/api-schemas.md)** - Dokumentacja API endpoints (Wersja 2)
- **[Environment Setup](./docs/technical/environment-setup.md)** - Konfiguracja środowisk

### 🧪 Testing

- **[Testing Strategy](./docs/testing/testing-strategy.md)** - Strategia i standardy testowania

## 🔐 Kluczowe Funkcjonalności (Wersja 2)

| Funkcja                            | Status     | Dokumentacja                                                                                             |
| ---------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------- |
| 🔑 Logowanie użytkowników          | ✅ Planned | [US-001 do US-004](./docs/requirements/functional-requirements.md#epic-1-autentyfikacja-użytkowników)    |
| 🔄 Resetowanie hasła               | ✅ Planned | [US-005 do US-006](./docs/requirements/functional-requirements.md#epic-2-resetowanie-hasła)              |
| 📝 Rejestracja nowych użytkowników | ✅ Planned | [US-007 do US-009](./docs/requirements/functional-requirements.md#epic-3-rejestracja-nowego-użytkownika) |
| ⏱️ Zarządzanie sesją               | ✅ Planned | [US-010 do US-012](./docs/requirements/functional-requirements.md#epic-4-zarządzanie-sesją)              |
| 🎫 **Kody promocyjne** ⭐️ NOWE    | ✅ Planned | [US-021 do US-026](./docs/requirements/functional-requirements.md#epic-8-kody-promocyjne)                |
| 📧 **Aktywacja konta** ⭐️ NOWE    | ✅ Planned | [US-003A](./docs/requirements/functional-requirements.md#us-003a-obsługa-nieaktywowanego-konta)          |
| 🛡️ Bezpieczeństwo i rate limiting  | ✅ Planned | [US-014 do US-016](./docs/requirements/functional-requirements.md#epic-6-bezpieczeństwo-i-wydajność)     |
| ♿ Accessibility compliance        | ✅ Planned | [US-017](./docs/requirements/functional-requirements.md#epic-7-dostępność-i-użyteczność)                 |

## 🌍 API Endpoints (Wersja 2)

```javascript
const WEBHOOKS = {
  LOGIN: "/webhook-test/c0c755cf-deb8-4952-8f71-c88943566d72",
  REGISTER: "/webhook-test/cc9d3a99-22b4-4cf3-97ee-33af0405451d",
  RESET_INIT: "/webhook-test/014d8471-1c76-46c9-b15f-1009a131ce4f",
  RESET_ACTIVATE: "/webhook-test/5ca54e07-d8d5-45d6-bafe-642b209f234a",
  VERIFY_EMAIL: "/webhook-test/66086a0b-da58-4fa5-9132-242db2618345",
  // NOWE ENDPOINTY - Wersja 2
  RESEND_ACTIVATION: "/webhook-test/resend-activation", // Do uzupełnienia
  ACTIVATE_PROMO_CODE: "/webhook-test/activate-promo-code", // Do uzupełnienia
};
```

📖 **Szczegóły**: [API Schemas](./docs/technical/api-schemas.md)

## ⏰ Timeline (Wersja 2)

| Sprint       | Okres       | Cel                                      | Status     | Story Points |
| ------------ | ----------- | ---------------------------------------- | ---------- | ------------ |
| **Sprint 1** | Tydzień 1-2 | Core Authentication + Account Activation | 🔄 Planned | 68 SP        |
| **Sprint 2** | Tydzień 3-4 | Password Management + Basic Promo Codes  | ⏳ Pending | 85 SP        |
| **Sprint 3** | Tydzień 5-6 | Security & UX Enhancements               | ⏳ Pending | 66 SP        |
| **Sprint 4** | Tydzień 7-8 | Accessibility & Quality                  | ⏳ Pending | 70 SP        |

📅 **Szczegóły**: [Sprint Breakdown](./docs/implementation/sprint-breakdown.md)

## 🎯 Nowe Funkcjonalności w Wersji 2

### 🎫 Kody Promocyjne

- **US-021**: Kod promocyjny podczas rejestracji z bonusowymi kredytami
- **US-022**: Kod promocyjny podczas logowania
- **US-023-026**: Kompletna obsługa błędów kodów promocyjnych
- **Rate limiting**: Maksymalnie 10 prób weryfikacji/5 aktywacji na godzinę

### 📧 Aktywacja Konta

- **US-003A**: Obsługa nieaktywowanych kont przy próbie logowania
- **Ponowne wysyłanie**: Maksymalnie 3 emaile aktywacyjne na godzinę
- **Integrowany proces**: Aktywacja konta + kod promocyjny w jednym kroku

### 📊 Analytics i Monitoring

- **Eventy promocyjne**: Śledzenie wykorzystania kodów promocyjnych
- **Metryki aktywacji**: Conversion rate aktywacji kont
- **A/B Testing**: Porównanie użytkowników z kodami vs bez

## 🤝 Contributing

1. Przeczytaj [Development Workflow](./docs/process/development-workflow.md)
2. Sprawdź [PR Strategy](./docs/implementation/pr-strategy.md)
3. Upewnij się, że spełniasz [Definition of Done](./docs/process/definition-of-done.md)

### Naming Convention dla Branch'y (Wersja 2):

```bash
feature/sprint-{X}/us-{XXX}-{description}
# Przykłady Wersja 2:
feature/sprint-1/us-003a-inactive-account-handling
feature/sprint-2/us-021-promo-code-registration
feature/sprint-2/us-022-promo-code-login
```

## 🆘 Support & Kontakt

- **Issues**: [GitHub Issues](https://github.com/your-org/auth-system/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/auth-system/discussions)
- **Documentation**: Wszystkie szczegóły w folderze [docs/](./docs/)

## 🔄 Historia Wersji

### Wersja 2.0 (Aktualna)

- ✅ Dodano system kodów promocyjnych
- ✅ Dodano obsługę nieaktywowanych kont
- ✅ Rozszerzono rate limiting
- ✅ Zaktualizowano analytics
- ✅ Przeplanowano sprinty

### Wersja 1.0 (Baseline)

- ✅ Podstawowa autentyfikacja
- ✅ Rejestracja i resetowanie hasła
- ✅ Zarządzanie sesją
- ✅ Podstawowe bezpieczeństwo

---

**Wersja**: 2.0.0 | **Ostatnia aktualizacja**: Czerwiec 2025
