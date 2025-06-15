# User Stories - System logowania (Wersja 2)

## Definition of Done

Każda user story jest uznawana za ukończoną gdy:

- [ ] Wszystkie kryteria akceptacji są spełnione
- [ ] Kod przeszedł code review
- [ ] Testy jednostkowe i integracyjne przechodzą
- [ ] Funkcjonalność została przetestowana manualnie
- [ ] Dokumentacja została zaktualizowana
- [ ] Funkcjonalność spełnia wymagania accessibility (gdy dotyczy)
- [ ] Performance requirements są spełnione
- [ ] **Analytics events są poprawnie wysyłane (Wersja 2)** ⭐️
- [ ] **Rate limiting działa zgodnie ze specyfikacją (Wersja 2)** ⭐️

---

## Epic 1: Autentyfikacja użytkowników

### US-001: Logowanie zarejestrowanego użytkownika z aktywowanym kontem (ZAKTUALIZOWANE Wersja 2)

**Jako** zarejestrowany użytkownik z aktywowanym kontem
**Chcę** móc się zalogować do systemu (opcjonalnie z kodem promocyjnym)
**Aby** uzyskać dostęp do płatnych funkcji

**Story Points**: 10 (było 8) ⭐️ +2SP
**Sprint**: 1
**Priorytet**: P0-Critical

#### Kryteria akceptacji:

- [ ] Formularz logowania zawiera pola: email i hasło
- [ ] **Formularz logowania zawiera opcjonalne pole "Masz kod promocyjny?" (nie wymagane)** ⭐️ NOWE
- [ ] **Pole promocyjne rozwija się po kliknięciu "Tak, mam kod promocyjny"** ⭐️ NOWE
- [ ] Po wypełnieniu formularza dane są wysyłane POST do webhook: `https://n8n-aipulse.up.railway.app/webhook-test/c0c755cf-deb8-4952-8f71-c88943566d72`
- [ ] Automatyzacja zwraca token po pomyślnej weryfikacji użytkownika z aktywowanym kontem
- [ ] W przypadku pomyślnej weryfikacji system otrzymuje odpowiedź zawierającą: imię, token, pozostałe kredyty
- [ ] **Jeśli podano kod promocyjny, kredyty uwzględniają bonus promocyjny** ⭐️ NOWE
- [ ] **Błędny kod promocyjny nie blokuje logowania, ale wyświetla osobny komunikat błędu** ⭐️ NOWE
- [ ] Token jest zapisywany w sessionStorage przeglądarki
- [ ] Imię użytkownika i liczba kredytów są wyświetlane w interfejsie
- [ ] **Liczba kredytów uwzględnia kredyty z kodów promocyjnych (z breakdown)** ⭐️ NOWE
- [ ] Formularz logowania jest ukrywany po pomyślnym logowaniu
- [ ] Formularz zawiera linki do "Resetuj hasło" i "Zarejestruj się"
- [ ] **Jeśli kod promocyjny został aktywowany, wyświetlany jest dodatkowy komunikat sukcesu** ⭐️ NOWE
- [ ] **Event analytics: login_success z flagą has_promo_code** ⭐️ NOWE

---

### US-002: Obsługa błędów logowania - użytkownik nieznaleziony

**Jako** niezarejestrowany użytkownik próbujący się zalogować
**Chcę** otrzymać jasny komunikat o błędzie
**Aby** wiedzieć, że muszę się zarejestrować lub sprawdzić dane

**Story Points**: 5
**Sprint**: 1
**Priorytet**: P0-Critical

#### Kryteria akceptacji:

- [ ] Gdy n8n zwróci kod 200 z informacją o nieznalezieniu użytkownika, wyświetlany jest komunikat: "Nie znaleziono użytkownika o podanym adresie email. Sprawdź dane logowania lub zarejestruj się."
- [ ] Komunikat zawiera aktywne linki do rejestracji i resetowania hasła
- [ ] Pola formularza pozostają wypełnione (email zachowany, hasło wyczyszczone)
- [ ] **Pole kodu promocyjnego zostaje wyczyszczone** ⭐️ ZAKTUALIZOWANE
- [ ] Użytkownik może od razu wprowadzić poprawne dane bez ponownego ładowania strony
- [ ] **Event analytics: login_failed z powodem user_not_found** ⭐️ NOWE

---

### US-003: Obsługa błędów logowania - nieprawidłowe hasło

**Jako** zarejestrowany użytkownik wprowadzający błędne hasło
**Chcę** otrzymać jasny komunikat o błędzie
**Aby** wiedzieć, że muszę wprowadzić prawidłowe hasło

**Story Points**: 5
**Sprint**: 1
**Priorytet**: P0-Critical

#### Kryteria akceptacji:

- [ ] Gdy n8n zwróci kod 200 z informacją o nieprawidłowym haśle, wyświetlany jest komunikat: "Nieprawidłowe hasło. Sprawdź hasło i spróbuj ponownie."
- [ ] Komunikat zawiera aktywny link do resetowania hasła
- [ ] Pole email pozostaje wypełnione, hasło zostaje wyczyszczone
- [ ] **Pole kodu promocyjnego zostaje wyczyszczone** ⭐️ ZAKTUALIZOWANE
- [ ] Po 3 nieudanych próbach wyświetlana jest dodatkowa informacja o możliwości zresetowania hasła
- [ ] Po 5 nieudanych próbach konto zostaje czasowo zablokowane (15 minut)
- [ ] **Event analytics: login_failed z powodem invalid_password** ⭐️ NOWE

---

### US-003A: Obsługa błędów logowania - konto nieaktywowane ⭐️ NOWE (Wersja 2)

**Jako** użytkownik z nieaktywowanym kontem próbujący się zalogować
**Chcę** otrzymać jasny komunikat i możliwość ponownej aktywacji
**Aby** móc dokończyć proces rejestracji

**Story Points**: 5 ⭐️ NOWE
**Sprint**: 1
**Priorytet**: P0-Critical

#### Kryteria akceptacji:

- [ ] Gdy użytkownik istnieje ale konto nie jest aktywowane, wyświetlany jest komunikat: "Twoje konto nie zostało jeszcze aktywowane. Sprawdź email i kliknij link aktywacyjny."
- [ ] Komunikat zawiera przycisk "Wyślij ponownie email aktywacyjny"
- [ ] Po kliknięciu przycisku wysyłane jest żądanie do nowego endpointu n8n: `resend-activation-email`
- [ ] System respektuje limit 3 ponownych wysyłek na godzinę na email
- [ ] Po przekroczeniu limitu przycisk staje się nieaktywny z informacją o limicie i countdown timer
- [ ] Pole kodu promocyjnego zostaje zachowane (będzie aktywowane po aktywacji konta)
- [ ] Po pomyślnym wysłaniu: "Email aktywacyjny został wysłany ponownie. Sprawdź skrzynkę odbiorczą."
- [ ] **Event analytics: account_activation_needed, activation_email_resent** ⭐️ NOWE
- [ ] **Rate limiting: maksymalnie 3 ponowne wysyłki na godzinę na email** ⭐️ NOWE

---

### US-004: Obsługa błędów technicznych (ZAKTUALIZOWANE Wersja 2)

**Jako** użytkownik
**Chcę** otrzymać informację o problemach technicznych
**Aby** wiedzieć, że problem nie leży po mojej stronie

**Story Points**: 5
**Sprint**: 2
**Priorytet**: P1-High

#### Kryteria akceptacji:

- [ ] Gdy webhook zwróci kod błędu 400 lub inny, wyświetlany jest komunikat: "Wystąpił problem z połączeniem. Spróbuj ponownie za chwilę."
- [ ] Gdy brak odpowiedzi z serwera, wyświetlany jest komunikat o problemach z połączeniem
- [ ] Przycisk logowania jest dezaktywowany podczas przetwarzania żądania
- [ ] Wyświetlany jest wskaźnik ładowania podczas oczekiwania na odpowiedź
- [ ] **Błędy związane z kodami promocyjnymi nie blokują logowania (jeśli credentials są prawidłowe)** ⭐️ NOWE
- [ ] **Wyświetlane są osobne komunikaty dla błędów logowania vs błędów kodów promocyjnych** ⭐️ NOWE
- [ ] **Event analytics: technical_error z typem błędu** ⭐️ NOWE

---

## Epic 2: Resetowanie hasła

### US-005: Inicjowanie resetowania hasła (ZAKTUALIZOWANE Wersja 2)

**Jako** użytkownik, który zapomniał hasła
**Chcę** móc zresetować hasło
**Aby** odzyskać dostęp do konta

**Story Points**: 8
**Sprint**: 2
**Priorytet**: P0-Critical

#### Kryteria akceptacji:

- [ ] Link "Resetuj hasło" otwiera pop-up z formularzem zawierającym pola: login (email) i nowe hasło
- [ ] Nowe hasło musi spełniać wymagania bezpieczeństwa (minimum 8 znaków, duża litera, cyfra, znak specjalny)
- [ ] Po wypełnieniu formularza dane są wysyłane POST do webhook: `https://n8n-aipulse.up.railway.app/webhook-test/014d8471-1c76-46c9-b15f-1009a131ce4f`
- [ ] Automatyzacja sprawdza, czy użytkownik istnieje w bazie i czy konto jest aktywowane
- [ ] Gdy email istnieje w bazie i konto jest aktywowane, wyświetlany jest komunikat: "Link weryfikacyjny został wysłany na podany adres email"
- [ ] Gdy email nie istnieje, wyświetlany jest komunikat: "Nie znaleziono konta z podanym adresem email"
- [ ] **Gdy email istnieje ale konto nie jest aktywowane, wyświetlany jest komunikat: "Twoje konto nie zostało jeszcze aktywowane. Aby zresetować hasło, najpierw aktywuj konto klikając link w emailu rejestracyjnym."** ⭐️ NOWE
- [ ] **Dodatkowy przycisk "Wyślij ponownie email aktywacyjny" przy nieaktywowanym koncie** ⭐️ NOWE
- [ ] **Rate limiting: maksymalnie 3 żądania resetowania hasła z tego samego emaila na godzinę** ⭐️ NOWE
- [ ] **Event analytics: password_reset_initiated** ⭐️ NOWE

---

### US-006: Aktywacja nowego hasła

**Jako** użytkownik, który zainicjował reset hasła
**Chcę** móc aktywować nowe hasło poprzez link w emailu
**Aby** odzyskać dostęp do konta

**Story Points**: 5
**Sprint**: 2
**Priorytet**: P0-Critical

#### Kryteria akceptacji:

- [ ] Użytkownik otrzymuje email z linkiem do aktywacji nowego hasła
- [ ] Link prowadzi do strony potwierdzenia z informacją o pomyślnej zmianie hasła
- [ ] Po kliknięciu w link hasło zostaje zmienione na nowe podane w formularzu
- [ ] Stare hasło przestaje być ważne
- [ ] Użytkownik może się zalogować z nowym hasłem
- [ ] Link jest jednorazowy - po użyciu staje się nieaktywny
- [ ] Wyświetlany jest komunikat: "Hasło zostało pomyślnie zmienione. Możesz się teraz zalogować z nowym hasłem."
- [ ] **Event analytics: password_reset_completed** ⭐️ NOWE

---

## Epic 3: Rejestracja nowego użytkownika

### US-007: Inicjowanie rejestracji nowego konta (ZAKTUALIZOWANE Wersja 2)

**Jako** nowy użytkownik
**Chcę** móc zarejestrować się w systemie (opcjonalnie z kodem promocyjnym)
**Aby** uzyskać dostęp do płatnych funkcji

**Story Points**: 15 (było 12) ⭐️ +3SP
**Sprint**: 1
**Priorytet**: P0-Critical

#### Kryteria akceptacji:

- [ ] Formularz rejestracji zawiera pola: email, hasło, imię, telefon (opcjonalne)
- [ ] **Formularz rejestracji zawiera opcjonalne pole "Kod promocyjny" (nie wymagane)** ⭐️ NOWE
- [ ] **Pole ma placeholder "Wprowadź kod promocyjny (opcjonalnie)"** ⭐️ NOWE
- [ ] **Kod promocyjny jest walidowany w czasie rzeczywistym (po 3 sekundach od ostatniego znaku)** ⭐️ NOWE
- [ ] **Poprawny kod wyświetla komunikat: "Kod promocyjny poprawny! Otrzymasz [X] dodatkowych kredytów po aktywacji konta."** ⭐️ NOWE
- [ ] Hasło musi spełniać wymagania bezpieczeństwa (minimum 8 znaków, duża litera, cyfra, znak specjalny)
- [ ] Email jest walidowany pod kątem poprawnego formatu
- [ ] Po wypełnieniu formularza dane są wysyłane POST do webhook: `https://n8n-aipulse.up.railway.app/webhook-test/cc9d3a99-22b4-4cf3-97ee-33af0405451d`
- [ ] **Jeśli podano kod promocyjny, jest on walidowany ale błędny kod nie blokuje rejestracji** ⭐️ NOWE
- [ ] System sprawdza, czy email nie istnieje już w bazie danych
- [ ] Po pomyślnej rejestracji wyświetlany jest komunikat: "Konto zostało utworzone. Sprawdź email i kliknij link aktywacyjny."
- [ ] **Jeśli kod promocyjny był poprawny: "Konto zostało utworzone z kodem promocyjnym. Sprawdź email i kliknij link aktywacyjny aby otrzymać bonus."** ⭐️ NOWE
- [ ] **Jeśli kod promocyjny był błędny: "Konto zostało utworzone, ale kod promocyjny był nieprawidłowy. Możesz aktywować prawidłowy kod po zalogowaniu."** ⭐️ NOWE
- [ ] Wysyłany jest email weryfikacyjny na podany adres
- [ ] **Rate limiting: maksymalnie 2 próby rejestracji z tego samego IP na 10 minut** ⭐️ NOWE
- [ ] **Event analytics: registration_started, promo_code_entered (jeśli applicable)** ⭐️ NOWE

---

### US-008: Weryfikacja adresu email przy rejestracji (ZAKTUALIZOWANE Wersja 2)

**Jako** nowy użytkownik
**Chcę** zweryfikować mój adres email
**Aby** aktywować konto i uzyskać pełny dostęp

**Story Points**: 10 (było 8) ⭐️ +2SP
**Sprint**: 1
**Priorytet**: P0-Critical

#### Kryteria akceptacji:

- [ ] Po rejestracji użytkownik otrzymuje email z linkiem aktywacyjnym
- [ ] Link prowadzi do strony potwierdzenia aktywacji konta
- [ ] Po kliknięciu w link konto zostaje aktywowane w systemie
- [ ] **Jeśli podczas rejestracji podano kod promocyjny, jest on automatycznie aktywowany** ⭐️ NOWE
- [ ] **Po aktywacji wyświetlany komunikat uwzględnia status kodu promocyjnego** ⭐️ NOWE
- [ ] Użytkownik może się zalogować po aktywacji konta
- [ ] Link aktywacyjny jest jednorazowy - po użyciu staje się nieaktywny
- [ ] **Standardowy komunikat: "Konto zostało pomyślnie aktywowane. Możesz się teraz zalogować."**
- [ ] **Z kodem promocyjnym: "Konto zostało aktywowane i dodano [X] kredytów z kodu promocyjnego. Możesz się teraz zalogować."** ⭐️ NOWE
- [ ] **Link aktywacyjny ma ograniczony czas ważności (24-48 godzin)** ⭐️ NOWE
- [ ] **Event analytics: account_activated, promo_code_activated (jeśli applicable)** ⭐️ NOWE

---

### US-009: Obsługa błędów rejestracji (ZAKTUALIZOWANE Wersja 2)

**Jako** użytkownik wypełniający formularz rejestracji
**Chcę** otrzymać jasne komunikaty o błędach
**Aby** móc poprawić dane i ukończyć rejestrację

**Story Points**: 8 (było 6) ⭐️ +2SP
**Sprint**: 1
**Priorytet**: P1-High

#### Kryteria akceptacji:

- [ ] Gdy email już istnieje w systemie, wyświetlany jest komunikat: "Konto z tym adresem email już istnieje. Spróbuj się zalogować lub zresetuj hasło."
- [ ] Komunikat zawiera aktywne linki do logowania i resetowania hasła
- [ ] Walidacja hasła wyświetla komunikat: "Hasło musi zawierać minimum 8 znaków, w tym dużą literę, cyfrę i znak specjalny"
- [ ] Walidacja emaila wyświetla komunikat: "Podaj prawidłowy adres email"
- [ ] **Gdy kod promocyjny jest błędny, wyświetlany jest komunikat: "Kod promocyjny jest nieprawidłowy, ale rejestracja zostanie ukończona. Możesz aktywować prawidłowy kod po zalogowaniu."** ⭐️ NOWE
- [ ] **Pole kodu promocyjnego nie blokuje przesłania formularza** ⭐️ NOWE
- [ ] **Błędny kod promocyjny jest oznaczony wizualnie (czerwone obramowanie) ale nie blokuje procesu** ⭐️ NOWE
- [ ] Po błędzie pola formularza zachowują wprowadzone wartości (oprócz hasła)
- [ ] Błędy są wyświetlane w czasie rzeczywistym podczas wprowadzania danych
- [ ] **Event analytics: registration_error z typem błędu** ⭐️ NOWE

---

## Epic 4: Zarządzanie sesją

### US-010: Automatyczne wylogowanie

**Jako** zalogowany użytkownik
**Chcę** aby moja sesja automatycznie wygasała po okresie nieaktywności
**Aby** zapewnić bezpieczeństwo mojego konta

**Story Points**: 13
**Sprint**: 2
**Priorytet**: P1-High

#### Kryteria akceptacji:

- [ ] Sesja użytkownika wygasa po 5 minutach bezczynności
- [ ] 30 sekund przed wygaśnięciem wyświetlane jest ostrzeżenie: "Twoja sesja wygaśnie za 30 sekund. Kliknij tutaj aby przedłużyć."
- [ ] Użytkownik może przedłużyć sesję klikając w ostrzeżenie
- [ ] Po wygaśnięciu sesji token jest usuwany z sessionStorage
- [ ] Wyświetlany jest komunikat: "Sesja wygasła z powodu nieaktywności. Zaloguj się ponownie."
- [ ] Użytkownik zostaje przekierowany do formularza logowania
- [ ] **Event analytics: session_timeout** ⭐️ NOWE

---

### US-011: Wylogowanie użytkownika

**Jako** zalogowany użytkownik
**Chcę** móc się wylogować z systemu
**Aby** zakończyć sesję w bezpieczny sposób

**Story Points**: 3
**Sprint**: 2
**Priorytet**: P0-Critical

#### Kryteria akceptacji:

- [ ] Przycisk/link "Wyloguj" jest widoczny dla zalogowanego użytkownika
- [ ] Po kliknięciu token jest usuwany z sessionStorage
- [ ] Interfejs wraca do stanu niezalogowanego użytkownika
- [ ] Wyświetlany jest komunikat potwierdzający wylogowanie
- [ ] Użytkownik nie może uzyskać dostępu do chronionych funkcji bez ponownego logowania
- [ ] **Wyczyszczenie wszystkich danych sesji (w tym queue analytics)** ⭐️ NOWE
- [ ] **Event analytics: logout** ⭐️ NOWE

---

### US-012: Zarządzanie tokenem w wielu oknach

**Jako** użytkownik
**Chcę** móc korzystać z systemu w wielu oknach przeglądarki
**Aby** zwiększyć wygodę pracy

**Story Points**: 8
**Sprint**: 2
**Priorytet**: P1-High

#### Kryteria akceptacji:

- [ ] Token w sessionStorage jest dostępny we wszystkich oknach/kartach tej samej sesji przeglądarki
- [ ] Otwarcie nowego okna/karty automatycznie uwzględnia stan zalogowania
- [ ] Wylogowanie w jednym oknie wpływa na wszystkie okna tej sesji
- [ ] Zamknięcie przeglądarki usuwa token (sessionStorage)
- [ ] Po ponownym otwarciu przeglądarki użytkownik musi się zalogować ponownie
- [ ] **Synchronizacja stanu kodów promocyjnych między kartami** ⭐️ NOWE
- [ ] **Event analytics: multi_tab_session** ⭐️ NOWE

---

## Epic 5: Wyświetlanie informacji o użytkowniku

### US-013: Wyświetlanie danych zalogowanego użytkownika (ZAKTUALIZOWANE Wersja 2)

**Jako** zalogowany użytkownik
**Chcę** widzieć swoje dane i stan konta
**Aby** kontrolować wykorzystanie zasobów

**Story Points**: 6 (było 5) ⭐️ +1SP
**Sprint**: 2
**Priorytet**: P0-Critical

#### Kryteria akceptacji:

- [ ] Po zalogowaniu wyświetlane jest imię użytkownika
- [ ] **Wyświetlana jest liczba pozostałych kredytów (włączając kredyty z kodów promocyjnych)** ⭐️ ZAKTUALIZOWANE
- [ ] **Breakdown kredytów: bazowe vs promocyjne (jeśli są kredyty promocyjne)** ⭐️ NOWE
- [ ] **Wyświetlana jest historia aktywacji kodów promocyjnych (ostatnie 3)** ⭐️ NOWE
- [ ] **Informacja o źródle kredytów promocyjnych (np. "50 kredytów z kodu WELCOME2024")** ⭐️ NOWE
- [ ] Informacje są aktualizowane po każdym wykorzystaniu kredytów
- [ ] Stan konta jest widoczny przez cały czas trwania sesji
- [ ] Gdy kredyty się kończą, wyświetlane jest odpowiednie ostrzeżenie
- [ ] **Link do sekcji "Aktywuj kod promocyjny" (jeśli funkcja jest dostępna)** ⭐️ NOWE

---

## Epic 6: Bezpieczeństwo i wydajność

### US-014: Rate limiting dla bezpieczeństwa (ZAKTUALIZOWANE Wersja 2)

**Jako** administrator systemu
**Chcę** ograniczyć częstotliwość żądań od użytkowników
**Aby** zapobiec atakom brute-force i przeciążeniu systemu

**Story Points**: 18 (było 16) ⭐️ +2SP
**Sprint**: 3
**Priorytet**: P0-Critical

#### Kryteria akceptacji:

- [ ] Maksymalnie 5 prób logowania z tego samego IP na 15 minut
- [ ] Maksymalnie 3 żądania resetowania hasła z tego samego emaila na godzinę
- [ ] Maksymalnie 2 próby rejestracji z tego samego IP na 10 minut
- [ ] **Maksymalnie 10 prób weryfikacji kodów promocyjnych z tego samego IP na 15 minut** ⭐️ NOWE
- [ ] **Maksymalnie 5 aktywacji kodów promocyjnych z tego samego IP na godzinę** ⭐️ NOWE
- [ ] **Maksymalnie 3 ponowne wysyłania emaili aktywacyjnych z tego samego emaila na godzinę** ⭐️ NOWE
- [ ] **Maksymalnie 5 aktywacji kodów promocyjnych na użytkownika na godzinę** ⭐️ NOWE
- [ ] Po przekroczeniu limitów wyświetlany jest komunikat: "Zbyt wiele prób. Spróbuj ponownie za X minut."
- [ ] **Komunikaty rate limiting są dostosowane do typu operacji** ⭐️ NOWE
- [ ] **Countdown timer pokazuje dokładny czas do następnej możliwej próby** ⭐️ NOWE
- [ ] **Event analytics: rate_limit_hit z typem limitu** ⭐️ NOWE

---

### US-015: Obsługa stanów ładowania (ZAKTUALIZOWANE Wersja 2)

**Jako** użytkownik
**Chcę** widzieć wskaźniki ładowania podczas operacji
**Aby** wiedzieć, że system przetwarza moje żądanie

**Story Points**: 10 (było 8) ⭐️ +2SP
**Sprint**: 3
**Priorytet**: P1-High

#### Kryteria akceptacji:

- [ ] Podczas logowania przycisk pokazuje spinner i tekst "Logowanie..."
- [ ] Podczas rejestracji przycisk pokazuje spinner i tekst "Tworzenie konta..."
- [ ] Podczas resetowania hasła przycisk pokazuje spinner i tekst "Wysyłanie emaila..."
- [ ] **Podczas weryfikacji kodu promocyjnego wyświetla się "Sprawdzanie kodu..." z małym spinnerem** ⭐️ NOWE
- [ ] **Podczas aktywacji kodu promocyjnego: "Aktywowanie kodu promocyjnego..."** ⭐️ NOWE
- [ ] **Podczas ponownego wysyłania emaila aktywacyjnego: "Wysyłanie emaila aktywacyjnego..."** ⭐️ NOWE
- [ ] **Skeleton loading dla listy historii kodów promocyjnych** ⭐️ NOWE
- [ ] Przyciski są dezaktywowane podczas ładowania
- [ ] Wszystkie pola formularza są dezaktywowane podczas przetwarzania
- [ ] Maksymalny czas ładowania to 30 sekund, po czym wyświetlany jest błąd timeout
- [ ] **Progress bar dla multi-step operations (rejestracja z kodem promocyjnym)** ⭐️ NOWE

---

### US-016: Recovery po błędach sieci (ZAKTUALIZOWANE Wersja 2)

**Jako** użytkownik
**Chcę** aby system obsługiwał problemy z połączeniem sieciowym
**Aby** móc kontynuować pracę mimo przejściowych problemów

**Story Points**: 14 (było 12) ⭐️ +2SP
**Sprint**: 3
**Priorytet**: P1-High

#### Kryteria akceptacji:

- [ ] Gdy sieć jest niedostępna, wyświetlany jest komunikat: "Brak połączenia z internetem. Sprawdź połączenie i spróbuj ponownie."
- [ ] System automatycznie ponawia żądanie po przywróceniu połączenia
- [ ] Przycisk "Spróbuj ponownie" pozwala na manualne ponowienie żądania
- [ ] Stan formularza jest zachowany podczas problemów z siecią
- [ ] **Kody promocyjne są zachowywane lokalnie podczas błędów sieci** ⭐️ NOWE
- [ ] **Queue dla eventów analytics podczas offline** ⭐️ NOWE
- [ ] **Automatyczne wysłanie zakolejkowanych eventów po przywróceniu połączenia** ⭐️ NOWE
- [ ] **Zachowanie stanu walidacji kodu promocyjnego po network recovery** ⭐️ NOWE
- [ ] Po przywróceniu połączenia użytkownik może kontynuować od miejsca przerwania
- [ ] **Network status indicator w interfejsie użytkownika** ⭐️ NOWE

---

## Epic 7: Dostępność i użyteczność

### US-017: Accessibility compliance (ZAKTUALIZOWANE Wersja 2)

**Jako** użytkownik korzystający z technologii asystujących
**Chcę** móc w pełni korzystać z systemu logowania
**Aby** mieć równy dostęp do funkcji

**Story Points**: 25 (było 21) ⭐️ +4SP
**Sprint**: 4
**Priorytet**: P0-Critical

#### Kryteria akceptacji:

- [ ] Pełna nawigacja klawiaturowa (Tab/Shift+Tab/Enter/Escape)
- [ ] Screen reader support z właściwymi ARIA labels
- [ ] Semantic HTML z odpowiednią strukturą nagłówków
- [ ] Focus indicators wyraźnie widoczne (2px solid outline)
- [ ] Labels powiązane z polami formularza
- [ ] Error messages ogłaszane przez screen readery (aria-live)
- [ ] **Kody promocyjne obsługiwane przez screen readery z odpowiednimi opisami** ⭐️ NOWE
- [ ] **ARIA live regions dla statusu walidacji kodów promocyjnych** ⭐️ NOWE
- [ ] **Komunikaty o aktywacji konta są dostępne dla technologii asystujących** ⭐️ NOWE
- [ ] **Keyboard shortcuts: Alt+P dla focus na pole kodu promocyjnego** ⭐️ NOWE
- [ ] **Screen reader announcements dla rate limiting countdowns** ⭐️ NOWE
- [ ] **Alternative text dla all success/error icons w procesie kodów promocyjnych** ⭐️ NOWE
- [ ] High contrast mode compatibility
- [ ] Minimum ratio kontrastu 4.5:1 dla tekstu
- [ ] Alt text dla wszystkich obrazów i ikon
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] Skip links dla głównej nawigacji
- [ ] Rozmiar tekstu skalowalny do 200% bez utraty funkcjonalności
- [ ] Brak migotających elementów (seizure prevention)

---

## Epic 8: Kody promocyjne ⭐️ NOWE (Wersja 2)

### US-021: Kod promocyjny podczas rejestracji ⭐️ NOWE

**Jako** nowy użytkownik
**Chcę** móc wprowadzić kod promocyjny podczas rejestracji
**Aby** otrzymać dodatkowe kredyty po aktywacji konta

**Story Points**: 8 ⭐️ NOWE
**Sprint**: 2
**Priorytet**: P0-Critical

#### Kryteria akceptacji:

- [ ] Formularz rejestracji zawiera opcjonalne pole "Kod promocyjny"
- [ ] Pole ma placeholder "Wprowadź kod promocyjny (opcjonalnie)"
- [ ] Kod promocyjny jest walidowany w czasie rzeczywistym (po 3 sekundach od ostatniego znaku)
- [ ] Walidacja używa endpointu: `/webhook-test/verify-promo-code`
- [ ] Błędny kod nie blokuje rejestracji, ale wyświetla ostrzeżenie
- [ ] Poprawny kod wyświetla komunikat: "Kod promocyjny poprawny! Otrzymasz [X] dodatkowych kredytów po aktywacji konta."
- [ ] Visual feedback: ✓ zielona checkmark dla valid, ✗ czerwony X dla invalid, ⏳ spinner podczas walidacji
- [ ] Kod promocyjny jest przesyłany razem z danymi rejestracji
- [ ] Po rejestracji z poprawnym kodem: "Konto zostało utworzone z kodem promocyjnym. Sprawdź email i kliknij link aktywacyjny aby otrzymać bonus."
- [ ] Kod zostaje aktywowany automatycznie przy aktywacji konta przez email
- [ ] **Rate limiting: maksymalnie 10 weryfikacji na IP na 15 minut** ⭐️ NOWE
- [ ] **Event analytics: promo_code_entered, promo_code_validated** ⭐️ NOWE

---

### US-022: Kod promocyjny podczas logowania ⭐️ NOWE

**Jako** zalogowany użytkownik
**Chcę** móc aktywować kod promocyjny podczas logowania
**Aby** otrzymać dodatkowe kredyty na moje konto

**Story Points**: 5 ⭐️ NOWE
**Sprint**: 2
**Priorytet**: P0-Critical

#### Kryteria akceptacji:

- [ ] Formularz logowania zawiera opcjonalne pole "Masz kod promocyjny?"
- [ ] Pole rozwija się po kliknięciu "Tak, mam kod promocyjny"
- [ ] Kod jest walidowany podczas procesu logowania używając endpointu `/webhook-test/verify-promo-code`
- [ ] Błędny kod nie blokuje logowania, ale wyświetla osobny komunikat błędu
- [ ] Poprawny kod aktywuje się natychmiast po zalogowaniu używając endpointu `/webhook-test/activate-promo-code`
- [ ] Po zalogowaniu z kodem wyświetlany jest komunikat: "Zostałeś zalogowany i aktywowano kod promocyjny! Dodano [X] kredytów do Twojego konta."
- [ ] Zaktualizowana liczba kredytów jest widoczna w interfejsie użytkownika z breakdown (bazowe + promocyjne)
- [ ] System sprawdza, czy kod nie został już użyty przez tego użytkownika
- [ ] **Rate limiting: maksymalnie 5 aktywacji na użytkownika na godzinę** ⭐️ NOWE
- [ ] **Event analytics: promo_code_activated podczas logowania** ⭐️ NOWE

---

### US-023: Błąd kodu promocyjnego - kod nieprawidłowy ⭐️ NOWE

**Jako** użytkownik wprowadzający błędny kod promocyjny
**Chcę** otrzymać jasny komunikat o błędzie
**Aby** wiedzieć, że kod jest nieprawidłowy i móc wprowadzić poprawny

**Story Points**: 3 ⭐️ NOWE
**Sprint**: 2
**Priorytet**: P1-High

#### Kryteria akceptacji:

- [ ] Przy błędnym kodzie wyświetlany jest komunikat: "Kod promocyjny jest nieprawidłowy. Sprawdź kod i spróbuj ponownie."
- [ ] Komunikat nie blokuje logowania/rejestracji
- [ ] Pole kodu zostaje podświetlone na czerwono z czerwonym X iconem
- [ ] Użytkownik może natychmiast wprowadzić poprawny kod
- [ ] **Podczas rejestracji**: proces rejestracji kontynuuje się bez kodu
- [ ] **Podczas logowania**: logowanie przebiega normalnie, kod pozostaje do ponownej próby
- [ ] Suggested action: "Sprawdź pisownię kodu lub skontaktuj się z obsługą"
- [ ] **Event analytics: promo_code_error z typem 'invalid'** ⭐️ NOWE

---

### US-024: Błąd kodu promocyjnego - kod już użyty ⭐️ NOWE

**Jako** użytkownik próbujący użyć już wykorzystanego kodu
**Chcę** otrzymać informację o tym, że kod został już wykorzystany
**Aby** wiedzieć, że nie mogę go użyć ponownie

**Story Points**: 3 ⭐️ NOWE
**Sprint**: 2
**Priorytet**: P1-High

#### Kryteria akceptacji:

- [ ] Wyświetlany jest komunikat: "Ten kod promocyjny został już wykorzystany na Twoim koncie."
- [ ] Komunikat zawiera datę poprzedniej aktywacji (jeśli dostępna): "Użyty: 15 czerwca 2025"
- [ ] Pole kodu zostaje wyczyszczone automatycznie
- [ ] Użytkownik może wprowadzić inny kod promocyjny
- [ ] **Podczas logowania**: proces logowania kontynuuje się normalnie
- [ ] **Podczas rejestracji**: proces rejestracji kontynuuje się bez kodu
- [ ] Link do historii kodów promocyjnych: "Zobacz swoje aktywowane kody"
- [ ] **Event analytics: promo_code_error z typem 'already_used'** ⭐️ NOWE

---

### US-025: Błąd kodu promocyjnego - kod wygasły ⭐️ NOWE

**Jako** użytkownik próbujący użyć wygasłego kodu
**Chcę** otrzymać informację o wygaśnięciu kodu
**Aby** wiedzieć, że kod nie jest już ważny

**Story Points**: 2 ⭐️ NOWE
**Sprint**: 2
**Priorytet**: P1-High

#### Kryteria akceptacji:

- [ ] Wyświetlany jest komunikat: "Ten kod promocyjny wygasł [data wygaśnięcia]. Nie można go już aktywować."
- [ ] Komunikat zawiera informacje o dacie wygaśnięcia: "Wygasł: 31 sierpnia 2024"
- [ ] Pole kodu zostaje wyczyszczone automatycznie
- [ ] Użytkownik może wprowadzić inny, aktualny kod promocyjny
- [ ] **Podczas logowania**: proces logowania kontynuuje się normalnie
- [ ] **Podczas rejestracji**: proces rejestracji kontynuuje się bez kodu
- [ ] Suggested action: "Sprawdź czy masz inne aktualne kody promocyjne"
- [ ] **Event analytics: promo_code_error z typem 'expired'** ⭐️ NOWE

---

### US-026: Błąd kodu promocyjnego - przekroczono limit aktywacji ⭐️ NOWE

**Jako** użytkownik próbujący aktywować zbyt wiele kodów w krótkim czasie
**Chcę** otrzymać informację o limicie aktywacji
**Aby** wiedzieć, kiedy mogę spróbować ponownie

**Story Points**: 2 ⭐️ NOWE
**Sprint**: 2
**Priorytet**: P1-High

#### Kryteria akceptacji:

- [ ] Po przekroczeniu limitu 5 aktywacji na godzinę wyświetlany jest komunikat: "Przekroczyłeś limit aktywacji kodów promocyjnych (5 na godzinę). Spróbuj ponownie za [X] minut."
- [ ] Komunikat zawiera dokładny countdown timer do następnej możliwej próby
- [ ] Pole kodu promocyjnego staje się nieaktywne z disabled state
- [ ] **Podczas logowania**: proces logowania kontynuuje się normalnie
- [ ] **Podczas rejestracji**: proces rejestracji kontynuuje się bez kodu
- [ ] Po upływie czasu ograniczenia pole staje się ponownie aktywne
- [ ] Informacja o aktualnym limicie: "Aktywowałeś 5/5 kodów w tej godzinie"
- [ ] **Event analytics: promo_code_error z typem 'rate_limited'** ⭐️ NOWE

---

## Epic 9: Zaawansowane funkcje

### US-018: Token refresh mechanism

**Jako** zalogowany użytkownik
**Chcę** aby moja sesja była automatycznie przedłużana
**Aby** nie być zmuszonym do częstego logowania

**Story Points**: 14
**Sprint**: 3
**Priorytet**: P1-High

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

**Story Points**: 13
**Sprint**: 4
**Priorytet**: P1-High

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
- [ ] Integration z zewnętrznym serwisem walidacji (opcjonalne)

---

### US-020: Analytics i monitoring (ZAKTUALIZOWANE Wersja 2)

**Jako** administrator systemu
**Chcę** śledzić metryki użytkowania i wydajności
**Aby** optymalizować system i podejmować decyzje biznesowe

**Story Points**: 15 (było 10) ⭐️ +5SP
**Sprint**: 3 i 4
**Priorytet**: P1-High

#### Kryteria akceptacji:

- [ ] Śledzenie eventów: login, logout, registration, password_reset
- [ ] **Śledzenie eventów kodów promocyjnych: promo_code_entered, promo_code_activated, promo_code_error** ⭐️ NOWE
- [ ] **Śledzenie eventów aktywacji: account_activation_needed, activation_email_resent, account_activated** ⭐️ NOWE
- [ ] **Śledzenie rate limiting events: rate_limit_hit z typem limitu** ⭐️ NOWE
- [ ] Metryki wydajności: czas ładowania, czas odpowiedzi API
- [ ] Metryki błędów: rate, typy błędów, recovery rate
- [ ] **Conversion rate z kodami promocyjnymi vs bez kodów** ⭐️ NOWE
- [ ] **Współczynnik aktywacji kont w czasie** ⭐️ NOWE
- [ ] **Effectiveness tracking dla różnych kodów promocyjnych** ⭐️ NOWE
- [ ] User journey tracking
- [ ] A/B testing capability **dla różnych wariantów kodów promocyjnych** ⭐️ NOWE
- [ ] Real-time dashboard z metrykami promocyjnymi
- [ ] Automated alerting przy anomaliach (włączając anomalie w używaniu kodów promocyjnych)
- [ ] **Offline analytics queue z automatic retry** ⭐️ NOWE
- [ ] **Privacy-compliant data collection (GDPR)** ⭐️ NOWE

---

## Podsumowanie

### Kompletny dokument User Stories zawiera:

- **26 User Stories** (20 istniejących + 6 nowych dla kodów promocyjnych)
- **9 Epic-ów** logicznie grupujących funkcjonalności
- **Kompletną obsługę** rejestracji, logowania, resetowania haseł
- **System kodów promocyjnych** z pełną obsługą błędów ⭐️ NOWE
- **Obsługę nieaktywowanych kont** z możliwością ponownego wysłania emaila ⭐️ NOWE
- **Wymagania techniczne** dla wszystkich nowych funkcjonalności
- **Aktualizację sprint planning** z nowymi story points
- **Kompletne scenariusze testowe** dla kluczowych flows

### Story Points Summary:

| Epic                           | Story Points | Zmiana vs V1    |
| ------------------------------ | ------------ | --------------- |
| Epic 1: Autentyfikacja         | 38 SP        | +7 SP ⭐️       |
| Epic 2: Resetowanie hasła      | 13 SP        | bez zmian       |
| Epic 3: Rejestracja            | 33 SP        | +5 SP ⭐️       |
| Epic 4: Zarządzanie sesją      | 24 SP        | bez zmian       |
| Epic 5: Informacje użytkownika | 6 SP         | +1 SP ⭐️       |
| Epic 6: Bezpieczeństwo         | 42 SP        | +4 SP ⭐️       |
| Epic 7: Accessibility          | 25 SP        | +4 SP ⭐️       |
| Epic 8: Kody promocyjne        | 20 SP        | +20 SP ⭐️ NOWE |
| Epic 9: Zaawansowane           | 42 SP        | +5 SP ⭐️       |

**TOTAL: 243 Story Points** (było 196) **+47 SP** ⭐️

### Test Scenarios - kluczowe flows:

#### Happy Path 1: Pełna rejestracja z kodem promocyjnym

1. Użytkownik wypełnia formularz rejestracji z kodem promocyjnym
2. Kod jest walidowany w czasie rzeczywistym - pokazuje preview kredytów
3. Otrzymuje email weryfikacyjny
4. Klika link aktywacyjny
5. Konto zostaje aktywowane + kod promocyjny aktywowany automatycznie
6. Loguje się i widzi kredyty z bonusem

#### Happy Path 2: Logowanie z kodem promocyjnym

1. Użytkownik loguje się podając kod promocyjny
2. Logowanie + aktywacja kodu w jednym kroku
3. Widzi aktualizowane kredyty z breakdown

#### Edge Case 1: Nieaktywowane konto + próba logowania

1. Użytkownik rejestruje się ale nie aktywuje konta
2. Próbuje się zalogować
3. Otrzymuje komunikat o potrzebie aktywacji
4. Klika "Wyślij ponownie email"
5. Otrzymuje nowy email i aktywuje konto

#### Edge Case 2: Błędny kod promocyjny podczas rejestracji

1. Użytkownik podaje błędny kod podczas rejestracji
2. Rejestracja się udaje, ale kod nie zostaje aktywowany
3. Otrzymuje komunikat o błędzie kodu
4. Może aktywować prawidłowy kod po zalogowaniu

### Rate Limiting Configuration (Wersja 2):

```javascript
const rateLimits = {
  login: { maxAttempts: 5, windowMinutes: 15 },
  passwordReset: { maxAttempts: 3, windowMinutes: 60 },
  registration: { maxAttempts: 2, windowMinutes: 10 },
  // NOWE - Wersja 2 ⭐️
  promoCodeVerification: { maxAttempts: 10, windowMinutes: 15 },
  promoCodeActivation: { maxAttempts: 5, windowMinutes: 60 },
  resendActivation: { maxAttempts: 3, windowMinutes: 60 },
};
```

### Analytics Events (Nowe Wersja 2):

```javascript
const newAnalyticsEvents = {
  // Promo code events ⭐️
  PROMO_CODE_ENTERED: "promo_code_entered",
  PROMO_CODE_VALIDATED: "promo_code_validated",
  PROMO_CODE_ACTIVATED: "promo_code_activated",
  PROMO_CODE_ERROR: "promo_code_error",

  // Account activation events ⭐️
  ACCOUNT_ACTIVATION_NEEDED: "account_activation_needed",
  ACTIVATION_EMAIL_RESENT: "activation_email_resent",
  ACCOUNT_ACTIVATED: "account_activated",

  // Rate limiting events ⭐️
  RATE_LIMIT_HIT: "rate_limit_hit",
};
```

---

**System jest gotowy do implementacji z pełną funkcjonalnością biznesową!** 🚀

**Wersja dokumentu**: 2.0
**Data aktualizacji**: Czerwiec 2025
**Główne zmiany**: System kodów promocyjnych, obsługa nieaktywowanych kont, rozszerzone analytics, zaktualizowane rate limiting
