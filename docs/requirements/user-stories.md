# User Stories - System logowania

## Definition of Done

Każda user story jest uznawana za ukończoną gdy:

- [ ] Wszystkie kryteria akceptacji są spełnione
- [ ] Kod przeszedł code review
- [ ] Testy jednostkowe i integracyjne przechodzą
- [ ] Funkcjonalność została przetestowana manualnie
- [ ] Dokumentacja została zaktualizowana
- [ ] Funkcjonalność spełnia wymagania accessibility (gdy dotyczy)
- [ ] Performance requirements są spełnione

---

## Epic 1: Autentyfikacja użytkowników

### US-001: Logowanie zarejestrowanego użytkownika

**Jako** zarejestrowany użytkownik
**Chcę** móc się zalogować do systemu
**Aby** uzyskać dostęp do płatnych funkcji

#### Kryteria akceptacji:

- [ ] Formularz logowania zawiera pola: email i hasło
- [ ] Po wypełnieniu formularza dane są wysyłane POST do webhook: `https://n8n-aipulse.up.railway.app/webhook-test/c0c755cf-deb8-4952-8f71-c88943566d72`
- [ ] Automatyzacja zwraca token po pomyślnej weryfikacji użytkownika
- [ ] W przypadku pomyślnej weryfikacji system otrzymuje odpowiedź zawierającą: imię, token, pozostałe kredyty
- [ ] Token jest zapisywany w sessionStorage przeglądarki
- [ ] Imię użytkownika i liczba kredytów są wyświetlane w interfejsie
- [ ] Formularz logowania jest ukrywany po pomyślnym logowaniu
- [ ] Formularz zawiera linki do "Resetuj hasło" i "Zarejestruj się"

---

### US-002: Obsługa błędów logowania - użytkownik nieznaleziony

**Jako** niezarejestrowany użytkownik próbujący się zalogować
**Chcę** otrzymać jasny komunikat o błędzie
**Aby** wiedzieć, że muszę się zarejestrować lub sprawdzić dane

#### Kryteria akceptacji:

- [ ] Gdy n8n zwróci kod 200 z informacją o nieznalezieniu użytkownika, wyświetlany jest komunikat: "Nie znaleziono użytkownika o podanym adresie email. Sprawdź dane logowania lub zarejestruj się."
- [ ] Komunikat zawiera aktywne linki do rejestracji i resetowania hasła
- [ ] Pola formularza pozostają wypełnione (email zachowany, hasło wyczyszczone)
- [ ] Użytkownik może od razu wprowadzić poprawne dane bez ponownego ładowania strony

---

### US-003: Obsługa błędów logowania - nieprawidłowe hasło

**Jako** zarejestrowany użytkownik wprowadzający błędne hasło
**Chcę** otrzymać jasny komunikat o błędzie
**Aby** wiedzieć, że muszę wprowadzić prawidłowe hasło

#### Kryteria akceptacji:

- [ ] Gdy n8n zwróci kod 200 z informacją o nieprawidłowym haśle, wyświetlany jest komunikat: "Nieprawidłowe hasło. Sprawdź hasło i spróbuj ponownie."
- [ ] Komunikat zawiera aktywny link do resetowania hasła
- [ ] Email pozostaje wypełniony, pole hasła jest wyczyszczone
- [ ] Focus jest automatycznie ustawiony na pole hasła

---

### US-004: Obsługa błędów technicznych

**Jako** użytkownik
**Chcę** otrzymać informację o problemach technicznych
**Aby** wiedzieć, że problem nie leży po mojej stronie

#### Kryteria akceptacji:

- [ ] Gdy webhook zwróci kod błędu 400 lub inny, wyświetlany jest komunikat: "Wystąpił problem z połączeniem. Spróbuj ponownie za chwilę."
- [ ] Gdy brak odpowiedzi z serwera, wyświetlany jest komunikat o problemach z połączeniem
- [ ] Przycisk logowania jest dezaktywowany podczas przetwarzania żądania
- [ ] Wyświetlany jest wskaźnik ładowania podczas oczekiwania na odpowiedź

---

## Epic 2: Resetowanie hasła

### US-005: Inicjowanie resetowania hasła

**Jako** użytkownik, który zapomniał hasła
**Chcę** móc zresetować hasło
**Aby** odzyskać dostęp do konta

#### Kryteria akceptacji:

- [ ] Link "Resetuj hasło" otwiera pop-up z formularzem zawierającym pola: login (email) i nowe hasło
- [ ] Nowe hasło musi spełniać wymagania bezpieczeństwa (minimum 8 znaków, duża litera, cyfra, znak specjalny)
- [ ] Po wypełnieniu formularza dane są wysyłane POST do webhook: `https://n8n-aipulse.up.railway.app/webhook-test/014d8471-1c76-46c9-b15f-1009a131ce4f`
- [ ] Automatyzacja sprawdza, czy użytkownik istnieje w bazie i wysyła link weryfikacyjny na email
- [ ] Gdy email istnieje w bazie, wyświetlany jest komunikat: "Link weryfikacyjny został wysłany na podany adres email"
- [ ] Gdy email nie istnieje, wyświetlany jest komunikat: "Nie znaleziono konta z podanym adresem email"
- [ ] Formularz zawiera walidację formatu email
- [ ] Przycisk wysyłania jest dezaktywowany podczas przetwarzania

---

### US-006: Aktywacja nowego hasła

**Jako** użytkownik, który otrzymał link weryfikacyjny
**Chcę** aktywować nowe hasło
**Aby** odzyskać dostęp do konta

#### Kryteria akceptacji:

- [ ] Kliknięcie w link weryfikacyjny z emaila wywołuje webhook: `https://n8n-aipulse.up.railway.app/webhook-test/5ca54e07-d8d5-45d6-bafe-642b209f234a`
- [ ] Automatyzacja zapisuje nowe hasło w systemie
- [ ] Po pomyślnej aktywacji użytkownik otrzymuje potwierdzenie (strona potwierdzenia lub komunikat)
- [ ] Użytkownik może się zalogować używając nowego hasła
- [ ] Link weryfikacyjny jest jednorazowy i wygasa po określonym czasie
- [ ] W przypadku błędu aktywacji wyświetlany jest odpowiedni komunikat błędu

---

## Epic 3: Rejestracja nowego użytkownika

### US-007: Inicjowanie rejestracji nowego konta

**Jako** nowy użytkownik
**Chcę** móc utworzyć konto w systemie
**Aby** uzyskać dostęp do płatnych funkcji

#### Kryteria akceptacji:

- [ ] Formularz rejestracji zawiera pola: email, hasło, potwierdź hasło, imię, telefon (opcjonalne)
- [ ] Email jest walidowany pod kątem poprawnego formatu
- [ ] Hasło musi spełniać wymagania bezpieczeństwa (minimum 8 znaków, duża litera, cyfra, znak specjalny)
- [ ] System sprawdza, czy oba hasła są identyczne
- [ ] Numer telefonu jest opcjonalny i walidowany pod kątem formatu (jeśli podany)
- [ ] Dane są wysyłane POST do webhook: `https://n8n-aipulse.up.railway.app/webhook-test/cc9d3a99-22b4-4cf3-97ee-33af0405451d`
- [ ] Automatyzacja sprawdza, czy email już istnieje w bazie
- [ ] Po pomyślnym utworzeniu konta wyświetlany jest komunikat: "Konto zostało utworzone. Sprawdź email w celu weryfikacji adresu."
- [ ] Na podany email wysyłany jest link weryfikacyjny

---

### US-008: Weryfikacja adresu email przy rejestracji

**Jako** nowy użytkownik
**Chcę** zweryfikować swój adres email
**Aby** aktywować konto

#### Kryteria akceptacji:

- [ ] Kliknięcie w link weryfikacyjny z emaila wywołuje webhook: `https://n8n-aipulse.up.railway.app/webhook-test/66086a0b-da58-4fa5-9132-242db2618345`
- [ ] Automatyzacja aktywuje konto użytkownika w systemie
- [ ] Po pomyślnej weryfikacji wyświetlana jest strona potwierdzenia z komunikatem: "Adres email został zweryfikowany. Możesz się teraz zalogować."
- [ ] Użytkownik może się zalogować używając zarejestrowanych danych
- [ ] Link weryfikacyjny jest jednorazowy i wygasa po określonym czasie
- [ ] W przypadku błędu weryfikacji wyświetlany jest odpowiedni komunikat błędu

---

### US-009: Obsługa błędów rejestracji

**Jako** użytkownik próbujący się zarejestrować
**Chcę** otrzymać jasne komunikaty o błędach
**Aby** móc poprawić dane i pomyślnie utworzyć konto

#### Kryteria akceptacji:

- [ ] Gdy email już istnieje w bazie, wyświetlany jest komunikat: "Konto z tym adresem email już istnieje. Spróbuj się zalogować lub zresetuj hasło."
- [ ] Komunikat zawiera aktywny link do resetowania hasła
- [ ] Błędy walidacji są wyświetlane przy odpowiednich polach w czasie rzeczywistym
- [ ] Przycisk rejestracji jest aktywny tylko gdy wszystkie wymagane pola są poprawnie wypełnione
- [ ] Komunikaty błędów znikają po poprawieniu danych

---

## Epic 4: Zarządzanie sesją

### US-010: Automatyczne wylogowanie

**Jako** użytkownik
**Chcę** być automatycznie wylogowany po okresie bezczynności
**Aby** zapewnić bezpieczeństwo mojego konta

#### Kryteria akceptacji:

- [ ] Sesja użytkownika wygasa po 5 minutach bezczynności
- [ ] Każda aktywność użytkownika (kliknięcia, ruchy myszy, wprowadzanie tekstu) resetuje licznik bezczynności
- [ ] 1 minutę przed wygaśnięciem wyświetlane jest ostrzeżenie z opcją przedłużenia sesji
- [ ] Po wygaśnięciu sesji token jest usuwany z sessionStorage
- [ ] Użytkownik jest automatycznie przekierowany do strony logowania
- [ ] Wyświetlany jest komunikat: "Sesja wygasła. Zaloguj się ponownie."

---

### US-011: Wylogowanie użytkownika

**Jako** zalogowany użytkownik
**Chcę** móc się wylogować z systemu
**Aby** zakończyć sesję w bezpieczny sposób

#### Kryteria akceptacji:

- [ ] Przycisk/link "Wyloguj" jest widoczny dla zalogowanego użytkownika
- [ ] Po kliknięciu token jest usuwany z sessionStorage
- [ ] Interfejs wraca do stanu niezalogowanego użytkownika
- [ ] Wyświetlany jest komunikat potwierdzający wylogowanie
- [ ] Użytkownik nie może uzyskać dostępu do chronionych funkcji bez ponownego logowania

---

### US-012: Zarządzanie tokenem w wielu oknach

**Jako** użytkownik
**Chcę** móc korzystać z systemu w wielu oknach przeglądarki
**Aby** zwiększyć wygodę pracy

#### Kryteria akceptacji:

- [ ] Token w sessionStorage jest dostępny we wszystkich oknach/kartach tej samej sesji przeglądarki
- [ ] Otwarcie nowego okna/karty automatycznie uwzględnia stan zalogowania
- [ ] Wylogowanie w jednym oknie wpływa na wszystkie okna tej sesji
- [ ] Zamknięcie przeglądarki usuwa token (sessionStorage)
- [ ] Po ponownym otwarciu przeglądarki użytkownik musi się zalogować ponownie

---

## Epic 5: Wyświetlanie informacji o użytkowniku

### US-013: Wyświetlanie danych zalogowanego użytkownika

**Jako** zalogowany użytkownik
**Chcę** widzieć swoje dane i stan konta
**Aby** kontrolować wykorzystanie zasobów

#### Kryteria akceptacji:

- [ ] Po zalogowaniu wyświetlane jest imię użytkownika
- [ ] Wyświetlana jest liczba pozostałych kredytów
- [ ] Informacje są aktualizowane po każdym wykorzystaniu kredytów
- [ ] Stan konta jest widoczny przez cały czas trwania sesji
- [ ] Gdy kredyty się kończą, wyświetlane jest odpowiednie ostrzeżenie

---

## Epic 6: Bezpieczeństwo i wydajność

### US-014: Rate limiting dla bezpieczeństwa

**Jako** administrator systemu
**Chcę** ograniczyć częstotliwość żądań od użytkowników
**Aby** zapobiec atakom brute-force i przeciążeniu systemu

#### Kryteria akceptacji:

- [ ] Maksymalnie 5 prób logowania z tego samego IP na 15 minut
- [ ] Maksymalnie 3 żądania resetowania hasła z tego samego emaila na godzinę
- [ ] Maksymalnie 2 próby rejestracji z tego samego IP na 10 minut
- [ ] Po przekroczeniu limitów wyświetlany jest komunikat: "Zbyt wiele prób. Spróbuj ponownie za X minut."
- [ ] Limity są resetowane po upływie określonego czasu
- [ ] Czasowa blokada IP na 1 godzinę po wielokrotnym przekroczeniu limitów
- [ ] Możliwość bypass dla whitelist IP (dla administratorów)
- [ ] Logowanie wszystkich zablokowanych prób w systemie monitoring

---

### US-015: Obsługa stanów ładowania

**Jako** użytkownik
**Chcę** widzieć jasne informacje o stanie przetwarzania
**Aby** wiedzieć, że system pracuje i ile to może potrwać

#### Kryteria akceptacji:

- [ ] Wszystkie przyciski są dezaktywowane podczas przetwarzania żądań
- [ ] Wyświetlane są spinnery/loading indicators przy każdym wywołaniu API
- [ ] Timeout 30 sekund dla żądań logowania/rejestracji z odpowiednim komunikatem
- [ ] Loading states dla: logowania, rejestracji, resetowania hasła, weryfikacji email
- [ ] Komunikaty typu "Sprawdzamy dane...", "Wysyłamy email...", "Zapisujemy zmiany..."
- [ ] Progress indicator dla procesów wieloetapowych (rejestracja → weryfikacja)
- [ ] Możliwość anulowania długotrwałych operacji
- [ ] Graceful fallback przy długich czasach odpowiedzi

---

### US-016: Recovery po błędach sieci

**Jako** użytkownik
**Chcę** móc kontynuować pracę mimo problemów z połączeniem
**Aby** nie tracić wprowadzonych danych i czasu

#### Kryteria akceptacji:

- [ ] Automatyczne ponowienie żądania (retry) po błędzie sieci (maksymalnie 3 próby)
- [ ] Exponential backoff dla kolejnych prób (1s, 2s, 4s)
- [ ] Zapisywanie wprowadzonych danych w localStorage podczas błędów
- [ ] Przywracanie danych po odnowieniu połączenia
- [ ] Detekcja stanu offline/online przeglądarki
- [ ] Komunikat "Brak połączenia internetowego" podczas offline
- [ ] Queue żądań podczas braku połączenia z automatycznym wysłaniem po odnowieniu
- [ ] Fallback do cached danych gdy to możliwe
- [ ] Informowanie użytkownika o statusie połączenia w real-time

---

## Epic 7: Dostępność i użyteczność

### US-017: Accessibility compliance

**Jako** użytkownik z niepełnosprawnościami
**Chcę** móc w pełni korzystać z systemu
**Aby** mieć równy dostęp do funkcjonalności

#### Kryteria akceptacji:

- [ ] Wszystkie formularze mają odpowiednie labels i ARIA attributes
- [ ] Pełna nawigacja klawiaturą (Tab, Enter, Escape)
- [ ] Focus indicators są wyraźnie widoczne
- [ ] Screen reader support z opisowymi komunikatami
- [ ] High contrast mode compatibility
- [ ] Minimum ratio kontrastu 4.5:1 dla tekstu
- [ ] Alt text dla wszystkich obrazów i ikon
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] Error messages są ogłaszane przez screen readery
- [ ] Skip links dla głównej nawigacji
- [ ] Rozmiar tekstu skalowalny do 200% bez utraty funkcjonalności
- [ ] Brak migotających elementów (seizure prevention)

---

### US-018: Token refresh mechanism

**Jako** zalogowany użytkownik
**Chcę** aby moja sesja była automatycznie przedłużana
**Aby** nie być zmuszonym do częstego logowania

#### Kryteria akceptacji:

- [ ] Automatyczne odświeżanie tokena 2 minuty przed wygaśnięciem
- [ ] Silent refresh w tle bez przerywania pracy użytkownika
- [ ] Fallback do pełnego re-logowania przy niepowodzeniu refresh
- [ ] Graceful logout przy wielokrotnych błędach refresh
- [ ] Informowanie użytkownika o problemach z sesją
- [ ] Możliwość manualnego przedłużenia sesji przez użytkownika
- [ ] Synchronizacja refresh między wieloma kartami/oknami
- [ ] Secure storage dla refresh token (jeśli dotyczy)
- [ ] Logging refresh events dla debugging
- [ ] Maximum session time (np. 8 godzin) niezależnie od aktywności

---

### US-019: Enhanced email validation

**Jako** system
**Chcę** walidować emaile na zaawansowanym poziomie
**Aby** zapewnić wysoką jakość danych i zmniejszyć spam

#### Kryteria akceptacji:

- [ ] Walidacja formatu email zgodnie z RFC 5322
- [ ] Sprawdzanie istnienia domeny (MX record lookup)
- [ ] Wykrywanie disposable/temporary email providers
- [ ] Typo detection i sugestie poprawek (gmail.co → gmail.com)
- [ ] Blacklista znanych spamowych domen
- [ ] Whitelist dla zaufanych domen korporacyjnych
- [ ] Real-time validation podczas wprowadzania
- [ ] Debounced validation (300ms delay) dla UX
- [ ] Komunikaty pomocnicze: "Czy chodziło Ci o gmail.com?"
- [ ] Możliwość bypass dla administratorów
- [ ] Logging odrzuconych emaili dla analiz
- [ ] Integration z zewnętrznymi serwisami walidacji email

---

## Epic 8: Monitoring i analityka

### US-020: Analytics i monitoring

**Jako** administrator/product manager
**Chcę** monitorować kluczowe metryki systemu
**Aby** optymalizować konwersję i identyfikować problemy

#### Kryteria akceptacji:

- [ ] Tracking funnel rejestracji: start → wypełnienie → weryfikacja email → ukończenie
- [ ] Metryki logowania: success rate, average time, failure reasons
- [ ] Monitoring błędów: częstotliwość, typy, korelacje z user actions
- [ ] Performance metrics: czas odpowiedzi API, client-side rendering time
- [ ] User journey mapping: path through auth flows
- [ ] A/B testing capability dla różnych wersji formularzy
- [ ] Real-time alerts dla krytycznych błędów (>5% error rate)
- [ ] Daily/weekly dashboards z kluczowymi KPI
- [ ] Cohort analysis dla retention użytkowników
- [ ] Privacy-compliant tracking (GDPR compliance)
- [ ] Integration z Google Analytics/Mixpanel
- [ ] Custom events dla business-specific metrics
