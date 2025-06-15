# Wymagania funkcjonalne - System logowania

## 1. Ogólny opis systemu

System logowania to webowa aplikacja umożliwiająca autentyfikację i autoryzację użytkowników w celu uzyskania dostępu do płatnych funkcji. System integruje się z zewnętrzną bazą danych Airtable poprzez automatyzacje n8n, zapewniając kompleksową obsługę rejestracji, logowania, resetowania haseł i zarządzania sesjami.

### 1.1 Cele biznesowe

- Zapewnienie bezpiecznego dostępu do płatnych funkcji systemu
- Kontrola wykorzystania kredytów przez użytkowników
- Automatyzacja procesów związanych z zarządzaniem kontami użytkowników
- Minimalizacja ryzyka związanego z bezpieczeństwem danych

### 1.2 Zakres funkcjonalny

System obejmuje następujące główne obszary funkcjonalne:

- **Autentyfikacja** - logowanie i wylogowanie użytkowników
- **Rejestracja** - tworzenie nowych kont z weryfikacją email
- **Zarządzanie hasłami** - resetowanie i zmiana haseł
- **Zarządzanie sesjami** - kontrola aktywnych sesji i automatyczne wygaśnięcie
- **Monitoring użytkowania** - śledzenie kredytów i aktywności użytkowników

## 2. Reguły biznesowe

### 2.1 Reguły rejestracji

- **RB-001**: Jeden email może być przypisany tylko do jednego konta
- **RB-002**: Nowe konto wymaga weryfikacji adresu email przed aktywacją
- **RB-003**: Numer telefonu jest opcjonalny przy rejestracji
- **RB-004**: Użytkownik musi zaakceptować regulamin (jeśli wymagany)

### 2.2 Reguły logowania

- **RB-005**: Logowanie wymaga poprawnej pary email + hasło
- **RB-006**: Po 5 nieudanych próbach logowania konto zostaje czasowo zablokowane
- **RB-007**: Użytkownik może być zalogowany jednocześnie w wielu kartach/oknach przeglądarki
- **RB-008**: Sesja wygasa po 5 minutach bezczynności

### 2.3 Reguły zarządzania hasłami

- **RB-009**: Reset hasła wymaga potwierdzenia poprzez link w emailu
- **RB-010**: Link do resetowania hasła jest jednorazowy i ma ograniczony czas ważności
- **RB-011**: Nowe hasło nie może być identyczne z poprzednim (jeśli wymagane)

### 2.4 Reguły bezpieczeństwa

- **RB-012**: Rate limiting: maksymalnie 5 prób logowania na 15 minut z jednego IP
- **RB-013**: Rate limiting: maksymalnie 3 żądania resetowania hasła na godzinę
- **RB-014**: Rate limiting: maksymalnie 2 próby rejestracji na 10 minut z jednego IP
- **RB-015**: Token sesji jest przechowywany tylko w sessionStorage (bezpieczeństwo)

## 3. Przepływy użytkownika (User Flows)

### 3.1 Przepływ rejestracji nowego użytkownika

```
START → Formularz rejestracji → Walidacja danych → Wysłanie do n8n →
Sprawdzenie duplikatu email → Utworzenie konta → Wysłanie emaila weryfikacyjnego →
Kliknięcie linku w emailu → Aktywacja konta → Możliwość logowania → END
```

**Scenariusze alternatywne:**

- Email już istnieje → Komunikat błędu + link do resetowania hasła
- Błąd walidacji → Komunikaty przy polach + możliwość poprawy
- Błąd sieci → Retry mechanism + zapisanie danych w localStorage

### 3.2 Przepływ logowania

```
START → Formularz logowania → Walidacja danych → Wysłanie do n8n →
Weryfikacja w Airtable → Zwrócenie tokena + danych → Zapisanie w sessionStorage →
Wyświetlenie danych użytkownika → Ukrycie formularza logowania → END
```

**Scenariusze alternatywne:**

- Użytkownik nie istnieje → Komunikat + linki do rejestracji/resetowania
- Nieprawidłowe hasło → Komunikat + link do resetowania + focus na hasło
- Błędy techniczne → Komunikat o problemach + możliwość ponowienia

### 3.3 Przepływ resetowania hasła

```
START → Link "Resetuj hasło" → Pop-up z formularzem → Wprowadzenie email + nowe hasło →
Wysłanie do n8n → Sprawdzenie email w bazie → Wysłanie linku weryfikacyjnego →
Kliknięcie linku → Aktywacja nowego hasła → Możliwość logowania z nowym hasłem → END
```

### 3.4 Przepływ zarządzania sesją

```
Logowanie → Start licznika bezczynności → Aktywność użytkownika → Reset licznika →
4 minuty bezczynności → Ostrzeżenie o wygaśnięciu → Wybór: przedłuż/wyloguj →
5 minut bezczynności → Automatyczne wylogowanie → Przekierowanie do logowania → END
```

## 4. Definicje stanów systemu

### 4.1 Stany użytkownika

- **Niezalogowany** - domyślny stan, dostęp tylko do formularzy auth
- **Zalogowany** - aktywny token, dostęp do płatnych funkcji, wyświetlane dane użytkownika
- **Sesja wygasła** - token usunięty, powrót do stanu niezalogowanego
- **Zablokowany** - przekroczenie limitów, czasowa blokada

### 4.2 Stany konta

- **Niezarejestrowane** - email nie istnieje w systemie
- **Zarejestrowane, nieaktywowane** - konto utworzone, czeka na weryfikację email
- **Aktywne** - konto zweryfikowane, można się logować
- **Zawieszone** - konto tymczasowo zablokowane (future feature)

### 4.3 Stany interfejsu

- **Formularz logowania** - widoczny dla niezalogowanych
- **Loading states** - podczas wywołań API
- **Komunikaty błędów** - przy niepoprawnych danych lub błędach technicznych
- **Pop-upy** - resetowanie hasła, ostrzeżenia o sesji

## 5. Mapy funkcjonalności (Feature Mapping)

### 5.1 Moduł Autentyfikacji

```
Autentyfikacja
├── Logowanie (US-001, US-002, US-003)
├── Wylogowanie (US-011)
├── Zarządzanie sesją (US-010, US-012)
└── Obsługa błędów (US-004)
```

### 5.2 Moduł Rejestracji

```
Rejestracja
├── Tworzenie konta (US-007)
├── Weryfikacja email (US-008)
└── Obsługa błędów (US-009)
```

### 5.3 Moduł Zarządzania Hasłami

```
Zarządzanie Hasłami
├── Inicjowanie resetowania (US-005)
└── Aktywacja nowego hasła (US-006)
```

### 5.4 Moduły Wsparcia

```
Bezpieczeństwo
├── Rate limiting (US-014)
├── Token refresh (US-018)
└── Enhanced validation (US-019)

UX/UI
├── Loading states (US-015)
├── Network recovery (US-016)
├── Accessibility (US-017)
└── User info display (US-013)

Monitoring
└── Analytics (US-020)
```

## 6. Wymagania integracji z zewnętrznymi systemami

### 6.1 Integracja z n8n (Automatyzacja)

- **Cel**: Obsługa wszystkich operacji związanych z kontem użytkownika
- **Komunikacja**: HTTP POST z JSON payload
- **Timeouts**: Maksymalnie 30 sekund na odpowiedź
- **Retry logic**: Maksymalnie 3 próby przy błędach sieci
- **Error handling**: Rozróżnienie błędów biznesowych (200) vs technicznych (4xx/5xx)

### 6.2 Integracja z Airtable (Baza danych)

- **Cel**: Przechowywanie danych użytkowników, haseł, tokenów
- **Dostęp**: Pośredni przez n8n (nie bezpośredni z frontendu)
- **Dane**: Email, hasło (zahashowane), imię, telefon, status konta, kredyty
- **Backup**: n8n odpowiada za backup i synchronizację

### 6.3 Integracja z systemem emailowym

- **Cel**: Wysyłanie emaili weryfikacyjnych i resetowania haseł
- **Provider**: Konfigurowany w n8n
- **Templates**: Zarządzane przez n8n
- **Deliverability**: Monitoring przez analytics (US-020)

### 6.4 Wymagania dotyczące przeglądarek

- **Kompatybilność**: Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- **Storage APIs**: sessionStorage (wymagane), localStorage (optional backup)
- **JavaScript**: ES2020+ features
- **Responsive design**: Wsparcie dla urządzeń mobilnych

## 7. Ograniczenia i założenia

### 7.1 Ograniczenia techniczne

- Brak bezpośredniego dostępu do bazy danych z frontendu
- Zależność od dostępności n8n dla wszystkich operacji
- sessionStorage jest jedynym źródłem prawdy dla stanu logowania
- Brak wsparcia dla SSO (Single Sign-On) w pierwszej wersji

### 7.2 Założenia biznesowe

- Użytkownicy mają dostęp do emaila w celu weryfikacji
- System kredytów jest zarządzany zewnętrznie (nie przez auth system)
- Jeden użytkownik = jedno konto (brak shared accounts)
- Polski interfejs użytkownika

### 7.3 Założenia dotyczące wydajności

- Maksymalnie 1000 jednoczesnych użytkowników
- 95% żądań musi być obsłużonych w czasie < 3 sekund
- Dostępność systemu na poziomie 99.5%
- Rate limiting zapobiega przeciążeniu systemu

## 8. Wymagania dotyczące dostępności

### 8.1 Standardy dostępności

- **WCAG 2.1**: Zgodność na poziomie AA
- **Kontrast kolorów**: Minimum 4.5:1 dla normalnego tekstu
- **Nawigacja klawiaturowa**: Pełne wsparcie Tab/Shift+Tab/Enter/Escape
- **Screen readery**: Wsparcie dla NVDA, JAWS, VoiceOver

### 8.2 Wymagania techniczne dostępności

- **ARIA labels**: Wszystkie interaktywne elementy
- **Focus indicators**: Wyraźnie widoczne obramowania
- **Semantic HTML**: Właściwa struktura nagłówków (h1-h6)
- **Error announcements**: Komunikaty błędów ogłaszane przez screen readery

## 9. Wymagania dotyczące internacjonalizacji

### 9.1 Język interfejsu

- **Domyślny język**: Polski
- **Enkodowanie**: UTF-8
- **Formaty danych**: Polskie konwencje (DD.MM.YYYY, przecinek jako separator dziesiętny)

### 9.2 Przygotowanie na rozszerzenie językowe

- **Zewnętrzne teksty**: Przygotowanie do systemu tłumaczeń
- **Kulturowe różnice**: Uwzględnienie różnych formatów telefonu/adresu
- **Kierunek tekstu**: LTR (left-to-right) dla języków zachodnich

## 10. Wymagania dotyczące wydajności UX

### 10.1 Responsywność interfejsu

- **Czas reakcji**: Maksymalnie 100ms dla interakcji użytkownika
- **Loading states**: Natychmiastowe feedback przy rozpoczęciu operacji
- **Progresywne ładowanie**: Stopniowe ujawnianie treści

### 10.2 Tolerancja błędów

- **Graceful degradation**: System działa mimo częściowych awarii
- **Informacyjne komunikaty**: Jasne instrukcje naprawy błędów
- **Zapobieganie utracie danych**: Backup w localStorage przy błędach sieci

## 11. Wymagania dotyczące monitorowania

### 11.1 Metryki biznesowe

- **Conversion rate**: Procent ukończonych rejestracji
- **Login success rate**: Procent udanych logowań
- **Password reset completion**: Procent ukończonych resetów hasła
- **User retention**: Powroty użytkowników

### 11.2 Metryki techniczne

- **Page load time**: Czas ładowania strony
- **API response time**: Czas odpowiedzi webhooków n8n
- **Error rate**: Częstotliwość błędów
- **Browser compatibility**: Wsparcie różnych przeglądarek

### 11.3 Alerty i powiadomienia

- **Critical errors**: Natychmiastowe powiadomienia przy > 5% error rate
- **Performance degradation**: Alerty przy pogorszeniu wydajności > 20%
- **Security incidents**: Powiadomienia o podejrzanej aktywności

## 12. Zgodność z regulacjami

### 12.1 RODO/GDPR

- **Minimalizacja danych**: Zbieranie tylko niezbędnych informacji
- **Prawo do usunięcia**: Możliwość usunięcia konta użytkownika
- **Transparency**: Jasne informacje o przetwarzaniu danych
- **Consent management**: Zgody na przetwarzanie danych

### 12.2 Bezpieczeństwo danych

- **Encryption in transit**: HTTPS dla wszystkich połączeń
- **Data retention**: Automatyczne usuwanie starych sesji
- **Access logging**: Rejestrowanie dostępu do danych użytkowników
- **Incident response**: Procedury reagowania na naruszenia bezpieczeństwa
