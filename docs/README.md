# System Logowania

Kompletny system autentyfikacji z rejestracją, logowaniem, resetowaniem haseł i zarządzaniem sesją.

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
├── components/auth/     # Komponenty logowania, rejestracji
├── hooks/              # useAuth, useSession, useApiCall
├── services/           # API clients, session management
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

- **[Wymagania Funkcjonalne](./docs/requirements/functional-requirements.md)** - Kompletne User Stories i kryteria akceptacji
- **[Wymagania Techniczne](./docs/requirements/technical-requirements.md)** - Stack technologiczny, performance requirements
- **[User Stories](./docs/requirements/user-stories.md)** - Szczegółowy breakdown wszystkich funkcjonalności

### 🏗️ Implementacja

- **[Plan Projektu](./docs/implementation/project-plan.md)** - Harmonogram sprintów i milestone'ów
- **[Sprint Breakdown](./docs/implementation/sprint-breakdown.md)** - Szczegółowy podział zadań
- **[PR Strategy](./docs/implementation/pr-strategy.md)** - Workflow i guidelines dla Pull Requestów

### 🛠️ Rozwój

- **[Development Workflow](./docs/process/development-workflow.md)** - Proces developmentu
- **[Definition of Done](./docs/process/definition-of-done.md)** - Kryteria ukończenia zadań

### 🎨 Design i UX

- **[Component Library](./docs/design/component-library.md)** - Katalog komponentów UI
- **[UI Guidelines](./docs/design/ui-guidelines.md)** - Standardy designu i accessibility

### 🔧 Technical

- **[Architecture](./docs/technical/architecture.md)** - Architektura systemu
- **[API Schemas](./docs/technical/api-schemas.md)** - Dokumentacja API endpoints
- **[Environment Setup](./docs/technical/environment-setup.md)** - Konfiguracja środowisk

### 🧪 Testing

- **[Testing Strategy](./docs/testing/testing-strategy.md)** - Strategia i standardy testowania

## 🔐 Kluczowe Funkcjonalności

| Funkcja                            | Status     | Dokumentacja                                                                                             |
| ---------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------- |
| 🔑 Logowanie użytkowników          | ✅ Planned | [US-001 do US-004](./docs/requirements/functional-requirements.md#epic-1-autentyfikacja-użytkowników)    |
| 🔄 Resetowanie hasła               | ✅ Planned | [US-005 do US-006](./docs/requirements/functional-requirements.md#epic-2-resetowanie-hasła)              |
| 📝 Rejestracja nowych użytkowników | ✅ Planned | [US-007 do US-009](./docs/requirements/functional-requirements.md#epic-3-rejestracja-nowego-użytkownika) |
| ⏱️ Zarządzanie sesją               | ✅ Planned | [US-010 do US-012](./docs/requirements/functional-requirements.md#epic-4-zarządzanie-sesją)              |
| 🛡️ Bezpieczeństwo i rate limiting  | ✅ Planned | [US-014 do US-016](./docs/requirements/functional-requirements.md#epic-6-bezpieczeństwo-i-wydajność)     |
| ♿ Accessibility compliance        | ✅ Planned | [US-017](./docs/requirements/functional-requirements.md#epic-7-dostępność-i-użyteczność)                 |

## 🌍 API Endpoints

```javascript
const WEBHOOKS = {
  LOGIN: "/webhook-test/c0c755cf-deb8-4952-8f71-c88943566d72",
  REGISTER: "/webhook-test/cc9d3a99-22b4-4cf3-97ee-33af0405451d",
  RESET_INIT: "/webhook-test/014d8471-1c76-46c9-b15f-1009a131ce4f",
  RESET_ACTIVATE: "/webhook-test/5ca54e07-d8d5-45d6-bafe-642b209f234a",
  VERIFY_EMAIL: "/webhook-test/66086a0b-da58-4fa5-9132-242db2618345",
};
```

📖 **Szczegóły**: [API Schemas](./docs/technical/api-schemas.md)

## ⏰ Timeline

| Sprint       | Okres       | Cel                           | Status     |
| ------------ | ----------- | ----------------------------- | ---------- |
| **Sprint 1** | Tydzień 1-2 | Core Authentication           | 🔄 Planned |
| **Sprint 2** | Tydzień 3-4 | Password Management & Session | ⏳ Pending |
| **Sprint 3** | Tydzień 5-6 | Security & UX Enhancements    | ⏳ Pending |
| **Sprint 4** | Tydzień 7-8 | Accessibility & Quality       | ⏳ Pending |

📅 **Szczegóły**: [Sprint Breakdown](./docs/implementation/sprint-breakdown.md)

## 🤝 Contributing

1. Przeczytaj [Development Workflow](./docs/process/development-workflow.md)
2. Sprawdź [PR Strategy](./docs/implementation/pr-strategy.md)
3. Upewnij się, że spełniasz [Definition of Done](./docs/process/definition-of-done.md)

### Naming Convention dla Branch'y:

```bash
feature/sprint-{X}/us-{XXX}-{description}
# Przykład: feature/sprint-1/us-001-user-login
```

## 🆘 Support & Kontakt

- **Issues**: [GitHub Issues](https://github.com/your-org/auth-system/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/auth-system/discussions)
- **Documentation**: Wszystkie szczegóły w folderze [docs/](./docs/)

---

**Wersja**: 1.0.0 | **Ostatnia aktualizacja**: Czerwiec 2025
