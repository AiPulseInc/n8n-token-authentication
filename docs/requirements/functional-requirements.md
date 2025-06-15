# Wymagania funkcjonalne - System logowania (Wersja 2)

## 1. Ogólny opis systemu

System logowania to webowa aplikacja umożliwiająca autentyfikację i autoryzację użytkowników w celu uzyskania dostępu do płatnych funkcji. System integruje się z zewnętrzną bazą danych Airtable poprzez automatyzacje n8n, zapewniając kompleksową obsługę rejestracji, logowania, resetowania haseł, zarządzania sesjami oraz **system kodów promocyjnych** (Wersja 2).

### 1.1 Cele biznesowe

- Zapewnienie bezpiecznego dostępu do płatnych funkcji systemu
- Kontrola wykorzystania kredytów przez użytkowników z uwzględnieniem bonusów promocyjnych
- Automatyzacja procesów związanych z zarządzaniem kontami użytkowników i aktywacją
- **Zwiększenie konwersji poprzez system kodów promocyjnych** (Wersja 2)
- **Redukcja porzuceń poprzez aktywną obsługę nieaktywowanych kont** (Wersja 2)
- Minimalizacja ryzyka związanego z bezpieczeństwem danych

### 1.2 Zakres funkcjonalny

System obejmuje następujące główne obszary funkcjonalne:

- **Autentyfikacja** - logowanie i wylogowanie użytkowników
- **Rejestracja** - tworzenie nowych kont z weryfikacją email
- **Zarządzanie hasłami** - resetowanie i zmiana haseł
- **Zarządzanie sesjami** - kontrola aktywnych sesji i automatyczne wygaśnięcie
- **Monitoring użytkowania** - śledzenie kredytów i aktywności użytkowników
- **System kodów promocyjnych** ⭐️ NOWE - aktywacja kodów z bonusowymi kredytami (Wersja 2)
- **Obsługa nieaktywowanych kont** ⭐️ NOWE - reaktywacja i ponowne wysyłanie emaili (Wersja 2)

## 2. Reguły biznesowe (Wersja 2)

### 2.1 Reguły rejestracji

- **RB-001**: Jeden email może być przypisany tylko do jednego konta
- **RB-002**: Nowe konto wymaga weryfikacji adresu email przed aktywacją
- **RB-003**: Numer telefonu jest opcjonalny przy rejestracji
- **RB-004**: Użytkownik musi zaakceptować regulamin (jeśli wymagany)
- **RB-005** ⭐️ NOWE: Kod promocyjny przy rejestracji jest opcjonalny i aktywuje się z kontem
- **RB-006** ⭐️ NOWE: Błędny kod promocyjny nie blokuje rejestracji, ale wyświetla ostrzeżenie

### 2.2 Reguły logowania

- **RB-007**: Logowanie wymaga poprawnej pary email + hasło
- **RB-008**: Po 5 nieudanych próbach logowania konto zostaje czasowo zablokowane
- **RB-009**: Użytkownik może być zalogowany jednocześnie w wielu kartach/oknach przeglądarki
- **RB-010**: Sesja wygasa po 5 minutach bezczynności
- **RB-011** ⭐️ NOWE: Nieaktywowane konto nie może się zalogować - wyświetla komunikat o konieczności aktywacji
- **RB-012** ⭐️ NOWE: Kod promocyjny podczas logowania jest opcjonalny i aktywuje się natychmiast

### 2.3 Reguły zarządzania hasłami

- **RB-013**: Reset hasła wymaga potwierdzenia poprzez link w emailu
- **RB-014**: Link do resetowania hasła jest jednorazowy i ma ograniczony czas ważności
- **RB-015**: Nowe hasło nie może być identyczne z poprzednim (jeśli wymagane)
- **RB-016** ⭐️ NOWE: Reset hasła dla nieaktywowanego konta wymaga najpierw aktywacji

### 2.4 Reguły kodów promocyjnych ⭐️ NOWE (Wersja 2)

- **RB-017**: Jeden kod promocyjny może być użyty tylko raz przez jednego użytkownika
- **RB-018**: Kody promocyjne mają datę ważności
- **RB-019**: Kod promocyjny dodaje określoną liczbę kredytów do konta użytkownika
- **RB-020**: Błędny kod promocyjny nie blokuje podstawowych operacji (logowanie/rejestracja)
- **RB-021**: Kod promocyjny może być aktywowany podczas rejestracji lub logowania
- **RB-022**: Jeden użytkownik może aktywować maksymalnie 5 kodów promocyjnych na godzinę

### 2.5 Reguły aktywacji konta ⭐️ NOWE (Wersja 2)

- **RB-023**: Użytkownik może wysłać ponownie email aktywacyjny maksymalnie 3 razy na godzinę
- **RB-024**: Link aktywacyjny ma ograniczony czas ważności (24-48 godzin)
- **RB-025**: Aktywacja konta jednocześnie aktywuje podany kod promocyjny (jeśli był)
- **RB-026**: Nieaktywowane konto nie może resetować hasła

### 2.6 Reguły bezpieczeństwa (Zaktualizowane Wersja 2)

- **RB-027**: Rate limiting: maksymalnie 5 prób logowania na 15 minut z jednego IP
- **RB-028**: Rate limiting: maksymalnie 3 żądania resetowania hasła na godzinę
- **RB-029**: Rate limiting: maksymalnie 2 próby rejestracji na 10 minut z jednego IP
- **RB-030**: Token sesji jest przechowywany tylko w sessionStorage (bezpieczeństwo)
- **RB-031** ⭐️ NOWE: Rate limiting: maksymalnie 10 prób weryfikacji kodów promocyjnych na 15 minut z jednego IP
- **RB-032** ⭐️ NOWE: Rate limiting: maksymalnie 5 aktywacji kodów promocyjnych na godzinę z jednego IP
- **RB-033** ⭐️ NOWE: Rate limiting: maksymalnie 3 ponowne wysyłanie emaili aktywacyjnych na godzinę na email

## 3. User Stories (Wersja 2)

### Epic 1: Autentyfikacja użytkowników

#### US-001: Logowanie zarejestrowanego użytkownika z aktywowanym kontem (ZAKTUALIZOWANE)

**Jako** zarejestrowany użytkownik z aktywowanym kontem
**Chcę** móc się zalogować do systemu (opcjonalnie z kodem promocyjnym)
**Aby** uzyskać dostęp do płatnych funkcji

**Kryteria akceptacji**:

- [ ] Formularz logowania zawiera pola: email i hasło
- [ ] Formularz logowania zawiera opcjonalne pole "Masz kod promocyjny?" (nie wymagane)
- [ ] Po wypełnieniu formularza dane są wysyłane POST do webhook
- [ ] Automatyzacja zwraca token po pomyślnej weryfikacji użytkownika z aktywowanym kontem
- [ ] W przypadku pomyślnej weryfikacji system otrzymuje odpowiedź zawierającą: imię, token, pozostałe kredyty
- [ ] **Jeśli podano kod promocyjny, kredyty uwzględniają bonus promocyjny** ⭐️ NOWE
- [ ] Token jest zapisywany w sessionStorage przeglądarki
- [ ] Imię użytkownika i liczba kredytów są wyświetlane w interfejsie
- [ ] Formularz logowania jest ukrywany po pomyślnym logowaniu
- [ ] Formularz zawiera linki do "Resetuj hasło" i "Zarejestruj się"
- [ ] **Jeśli kod promocyjny został aktywowany, wyświetlany jest dodatkowy komunikat sukcesu** ⭐️ NOWE

#### US-002: Obsługa błędów logowania - użytkownik nieznaleziony

**Jako** niezarejestrowany użytkownik próbujący się zalogować
**Chcę** otrzymać jasny komunikat o błędzie
**Aby** wiedzieć, że muszę się zarejestrować lub sprawdzić dane

**Kryteria akceptacji**:

- [ ] Gdy n8n zwróci kod 200 z informacją o nieznalezieniu użytkownika, wyświetlany jest komunikat: "Nie znaleziono użytkownika o podanym adresie email. Sprawdź dane logowania lub zarejestruj się."
- [ ] Komunikat zawiera aktywne linki do rejestracji i resetowania hasła
- [ ] Pola formularza pozostają wypełnione (email zachowany, hasło wyczyszczone)
- [ ] **Pole kodu promocyjnego zostaje wyczyszczone** ⭐️ NOWE
- [ ] Użytkownik może od razu wprowadzić poprawne dane bez ponownego ładowania strony

#### US-003: Obsługa błędów logowania - nieprawidłowe hasło

**Jako** zarejestrowany użytkownik wprowadzający błędne hasło
**Chcę** otrzymać jasny komunikat o błędzie
**Aby** wiedzieć, że muszę wprowadzić prawidłowe hasło

**Kryteria akceptacji**:

- [ ] Gdy n8n zwróci kod 200 z informacją o nieprawidłowym haśle, wyświetlany jest komunikat: "Nieprawidłowe hasło. Sprawdź hasło i spróbuj ponownie."
- [ ] Komunikat zawiera aktywny link do resetowania hasła
- [ ] Pole email pozostaje wypełnione, hasło zostaje wyczyszczone
- [ ] **Pole kodu promocyjnego zostaje wyczyszczone** ⭐️ NOWE
- [ ] Po 3 nieudanych próbach wyświetlana jest dodatkowa informacja o możliwości zresetowania hasła
- [ ] Po 5 nieudanych próbach konto zostaje czasowo zablokowane (15 minut)

#### US-003A: Obsługa błędów logowania - konto nieaktywowane ⭐️ NOWE (Wersja 2)

**Jako** użytkownik z nieaktywowanym kontem próbujący się zalogować
**Chcę** otrzymać jasny komunikat i możliwość ponownej aktywacji
**Aby** móc dokończyć proces rejestracji

**Kryteria akceptacji**:

- [ ] Gdy użytkownik istnieje ale konto nie jest aktywowane, wyświetlany jest komunikat: "Twoje konto nie zostało jeszcze aktywowane. Sprawdź email i kliknij link aktywacyjny."
- [ ] Komunikat zawiera przycisk "Wyślij ponownie email aktywacyjny"
- [ ] Po kliknięciu przycisku wysyłane jest żądanie do nowego endpointu n8n
- [ ] System respektuje limit 3 ponownych wysyłek na godzinę na email
- [ ] Po przekroczeniu limitu przycisk staje się nieaktywny z informacją o limicie
- [ ] Pole kodu promocyjnego zostaje zachowane (będzie aktywowane po aktywacji konta)
- [ ] Po pomyślnym wysłaniu: "Email aktywacyjny został wysłany ponownie. Sprawdź skrzynkę odbiorczą."

#### US-004: Obsługa błędów technicznych (ZAKTUALIZOWANE)

**Jako** użytkownik
**Chcę** otrzymać informację o problemach technicznych
**Aby** wiedzieć, że problem nie leży po mojej stronie

**Kryteria akceptacji**:

- [ ] Gdy webhook zwróci kod błędu 400 lub inny, wyświetlany jest komunikat: "Wystąpił problem z połączeniem. Spróbuj ponownie za chwilę."
- [ ] Gdy brak odpowiedzi z serwera, wyświetlany jest komunikat o problemach z połączeniem
- [ ] Przycisk logowania jest dezaktywowany podczas przetwarzania żądania
- [ ] Wyświetlany jest wskaźnik ładowania podczas oczekiwania na odpowiedź
- [ ] **Błędy związane z kodami promocyjnymi nie blokują logowania (jeśli credentials są prawidłowe)** ⭐️ NOWE

### Epic 2: Resetowanie hasła

#### US-005: Inicjowanie resetowania hasła (ZAKTUALIZOWANE)

**Jako** użytkownik, który zapomniał hasła
**Chcę** móc zresetować hasło
**Aby** odzyskać dostęp do konta

**Kryteria akceptacji**:

- [ ] Link "Resetuj hasło" otwiera pop-up z formularzem zawierającym pola: login (email) i nowe hasło
- [ ] Nowe hasło musi spełniać wymagania bezpieczeństwa (minimum 8 znaków, duża litera, cyfra, znak specjalny)
- [ ] Po wypełnieniu formularza dane są wysyłane POST do webhook resetowania hasła
- [ ] Automatyzacja sprawdza, czy użytkownik istnieje w bazie i czy konto jest aktywowane
- [ ] Gdy email istnieje w bazie i konto jest aktywowane, wyświetlany jest komunikat: "Link weryfikacyjny został wysłany na podany adres email"
- [ ] Gdy email nie istnieje, wyświetlany jest komunikat: "Nie znaleziono konta z podanym adresem email"
- [ ] **Gdy email istnieje ale konto nie jest aktywowane, wyświetlany jest komunikat: "Twoje konto nie zostało jeszcze aktywowane. Aby zresetować hasło, najpierw aktywuj konto klikając link w emailu rejestracyjnym."** ⭐️ NOWE
- [ ] **Dodatkowy przycisk "Wyślij ponownie email aktywacyjny" przy nieaktywowanym koncie** ⭐️ NOWE

#### US-006: Aktywacja nowego hasła

**Jako** użytkownik, który zainicjował reset hasła
**Chcę** móc aktywować nowe hasło poprzez link w emailu
**Aby** odzyskać dostęp do konta

**Kryteria akceptacji**:

- [ ] Użytkownik otrzymuje email z linkiem do aktywacji nowego hasła
- [ ] Link prowadzi do strony potwierdzenia z informacją o pomyślnej zmianie hasła
- [ ] Po kliknięciu w link hasło zostaje zmienione na nowe podane w formularzu
- [ ] Stare hasło przestaje być ważne
- [ ] Użytkownik może się zalogować z nowym hasłem
- [ ] Link jest jednorazowy - po użyciu staje się nieaktywny
- [ ] Wyświetlany jest komunikat: "Hasło zostało pomyślnie zmienione. Możesz się teraz zalogować z nowym hasłem."

### Epic 3: Rejestracja nowego użytkownika

#### US-007: Inicjowanie rejestracji nowego konta (ZAKTUALIZOWANE)

**Jako** nowy użytkownik
**Chcę** móc zarejestrować się w systemie (opcjonalnie z kodem promocyjnym)
**Aby** uzyskać dostęp do płatnych funkcji

**Kryteria akceptacji**:

- [ ] Formularz rejestracji zawiera pola: email, hasło, imię, telefon (opcjonalne)
- [ ] **Formularz rejestracji zawiera opcjonalne pole "Kod promocyjny" (nie wymagane)** ⭐️ NOWE
- [ ] Hasło musi spełniać wymagania bezpieczeństwa (minimum 8 znaków, duża litera, cyfra, znak specjalny)
- [ ] Email jest walidowany pod kątem poprawnego formatu
- [ ] Po wypełnieniu formularza dane są wysyłane POST do webhook rejestracji
- [ ] **Jeśli podano kod promocyjny, jest on walidowany ale błędny kod nie blokuje rejestracji** ⭐️ NOWE
- [ ] System sprawdza, czy email nie istnieje już w bazie danych
- [ ] Po pomyślnej rejestracji wyświetlany jest komunikat: "Konto zostało utworzone. Sprawdź email i kliknij link aktywacyjny."
- [ ] **Jeśli kod promocyjny był poprawny: "Konto zostało utworzone z kodem promocyjnym. Sprawdź email i kliknij link aktywacyjny aby otrzymać bonus."** ⭐️ NOWE
- [ ] **Jeśli kod promocyjny był błędny: "Konto zostało utworzone, ale kod promocyjny był nieprawidłowy. Możesz aktywować prawidłowy kod po zalogowaniu."** ⭐️ NOWE
- [ ] Wysyłany jest email weryfikacyjny na podany adres

#### US-008: Weryfikacja adresu email przy rejestracji (ZAKTUALIZOWANE)

**Jako** nowy użytkownik
**Chcę** zweryfikować mój adres email
**Aby** aktywować konto i uzyskać pełny dostęp

**Kryteria akceptacji**:

- [ ] Po rejestracji użytkownik otrzymuje email z linkiem aktywacyjnym
- [ ] Link prowadzi do strony potwierdzenia aktywacji konta
- [ ] Po kliknięciu w link konto zostaje aktywowane w systemie
- [ ] **Jeśli podczas rejestracji podano kod promocyjny, jest on automatycznie aktywowany** ⭐️ NOWE
- [ ] **Po aktywacji wyświetlany komunikat uwzględnia status kodu promocyjnego** ⭐️ NOWE
- [ ] Użytkownik może się zalogować po aktywacji konta
- [ ] Link aktywacyjny jest jednorazowy - po użyciu staje się nieaktywny
- [ ] **Standardowy komunikat: "Konto zostało pomyślnie aktywowane. Możesz się teraz zalogować."**
- [ ] **Z kodem promocyjnym: "Konto zostało aktywowane i dodano [X] kredytów z kodu promocyjnego. Możesz się teraz zalogować."** ⭐️ NOWE

#### US-009: Obsługa błędów rejestracji (ZAKTUALIZOWANE)

**Jako** użytkownik wypełniający formularz rejestracji
**Chcę** otrzymać jasne komunikaty o błędach
**Aby** móc poprawić dane i ukończyć rejestrację

**Kryteria akceptacji**:

- [ ] Gdy email już istnieje w systemie, wyświetlany jest komunikat: "Konto z tym adresem email już istnieje. Spróbuj się zalogować lub zresetuj hasło."
- [ ] Komunikat zawiera aktywne linki do logowania i resetowania hasła
- [ ] Walidacja hasła wyświetla komunikat: "Hasło musi zawierać minimum 8 znaków, w tym dużą literę, cyfrę i znak specjalny"
- [ ] Walidacja emaila wyświetla komunikat: "Podaj prawidłowy adres email"
- [ ] **Gdy kod promocyjny jest błędny, wyświetlany jest komunikat: "Kod promocyjny jest nieprawidłowy, ale rejestracja zostanie ukończona. Możesz aktywować prawidłowy kod po zalogowaniu."** ⭐️ NOWE
- [ ] **Pole kodu promocyjnego nie blokuje przesłania formularza** ⭐️ NOWE
- [ ] Po błędzie pola formularza zachowują wprowadzone wartości (oprócz hasła)
- [ ] Błędy są wyświetlane w czasie rzeczywistym podczas wprowadzania danych

### Epic 4: Zarządzanie sesją

#### US-010: Automatyczne wylogowanie

**Jako** zalogowany użytkownik
**Chcę** aby moja sesja automatycznie wygasała po okresie nieaktywności
**Aby** zapewnić bezpieczeństwo mojego konta

**Kryteria akceptacji**:

- [ ] Sesja użytkownika wygasa po 5 minutach bezczynności
- [ ] 30 sekund przed wygaśnięciem wyświetlane jest ostrzeżenie: "Twoja sesja wygaśnie za 30 sekund. Kliknij tutaj aby przedłużyć."
- [ ] Użytkownik może przedłużyć sesję klikając w ostrzeżenie
- [ ] Po wygaśnięciu sesji token jest usuwany z sessionStorage
- [ ] Wyświetlany jest komunikat: "Sesja wygasła z powodu nieaktywności. Zaloguj się ponownie."
- [ ] Użytkownik zostaje przekierowany do formularza logowania

#### US-011: Wylogowanie użytkownika

**Jako** zalogowany użytkownik
**Chcę** móc się wylogować z systemu
**Aby** zakończyć sesję w bezpieczny sposób

**Kryteria akceptacji**:

- [ ] Przycisk/link "Wyloguj" jest widoczny dla zalogowanego użytkownika
- [ ] Po kliknięciu token jest usuwany z sessionStorage
- [ ] Interfejs wraca do stanu niezalogowanego użytkownika
- [ ] Wyświetlany jest komunikat potwierdzający wylogowanie
- [ ] Użytkownik nie może uzyskać dostępu do chronionych funkcji bez ponownego logowania

#### US-012: Zarządzanie tokenem w wielu oknach

**Jako** użytkownik
**Chcę** móc korzystać z systemu w wielu oknach przeglądarki
**Aby** zwiększyć wygodę pracy

**Kryteria akceptacji**:

- [ ] Token w sessionStorage jest dostępny we wszystkich oknach/kartach tej samej sesji przeglądarki
- [ ] Otwarcie nowego okna/karty automatycznie uwzględnia stan zalogowania
- [ ] Wylogowanie w jednym oknie wpływa na wszystkie okna tej sesji
- [ ] Zamknięcie przeglądarki usuwa token (sessionStorage)
- [ ] Po ponownym otwarciu przeglądarki użytkownik musi się zalogować ponownie

### Epic 5: Wyświetlanie informacji o użytkowniku

#### US-013: Wyświetlanie danych zalogowanego użytkownika (ZAKTUALIZOWANE)

**Jako** zalogowany użytkownik
**Chcę** widzieć swoje dane i stan konta
**Aby** kontrolować wykorzystanie zasobów

**Kryteria akceptacji**:

- [ ] Po zalogowaniu wyświetlane jest imię użytkownika
- [ ] **Wyświetlana jest liczba pozostałych kredytów (włączając kredyty z kodów promocyjnych)** ⭐️ ZAKTUALIZOWANE
- [ ] Informacje są aktualizowane po każdym wykorzystaniu kredytów
- [ ] Stan konta jest widoczny przez cały czas trwania sesji
- [ ] Gdy kredyty się kończą, wyświetlane jest odpowiednie ostrzeżenie
- [ ] **Jeśli użytkownik aktywował kody promocyjne, widoczna jest informacja o źródle kredytów** ⭐️ NOWE

### Epic 6: Bezpieczeństwo i wydajność

#### US-014: Rate limiting dla bezpieczeństwa (ZAKTUALIZOWANE Wersja 2)

**Jako** administrator systemu
**Chcę** ograniczyć częstotliwość żądań od użytkowników
**Aby** zapobiec atakom brute-force i przeciążeniu systemu

**Kryteria akceptacji**:

- [ ] Maksymalnie 5 prób logowania z tego samego IP na 15 minut
- [ ] Maksymalnie 3 żądania resetowania hasła z tego samego emaila na godzinę
- [ ] Maksymalnie 2 próby rejestracji z tego samego IP na 10 minut
- [ ] **Maksymalnie 10 prób weryfikacji kodów promocyjnych z tego samego IP na 15 minut** ⭐️ NOWE
- [ ] **Maksymalnie 5 aktywacji kodów promocyjnych z tego samego IP na godzinę** ⭐️ NOWE
- [ ] **Maksymalnie 3 ponowne wysyłania emaili aktywacyjnych z tego samego emaila na godzinę** ⭐️ NOWE
- [ ] Po przekroczeniu limitów wyświetlany jest komunikat: "Zbyt wiele prób. Spróbuj ponownie za X minut."
- [ ] **Komunikaty rate limiting są dostosowane do typu operacji** ⭐️ NOWE

#### US-015: Obsługa stanów ładowania

**Jako** użytkownik
**Chcę** widzieć wskaźniki ładowania podczas operacji
**Aby** wiedzieć, że system przetwarza moje żądanie

**Kryteria akceptacji**:

- [ ] Podczas logowania przycisk pokazuje spinner i tekst "Logowanie..."
- [ ] Podczas rejestracji przycisk pokazuje spinner i tekst "Tworzenie konta..."
- [ ] Podczas resetowania hasła przycisk pokazuje spinner i tekst "Wysyłanie emaila..."
- [ ] **Podczas weryfikacji kodu promocyjnego wyświetla się "Sprawdzanie kodu..."** ⭐️ NOWE
- [ ] **Podczas ponownego wysyłania emaila aktywacyjnego: "Wysyłanie emaila..."** ⭐️ NOWE
- [ ] Przyciski są dezaktywowane podczas ładowania
- [ ] Wszystkie pola formularza są dezaktywowane podczas przetwarzania
- [ ] Maksymalny czas ładowania to 30 sekund, po czym wyświetlany jest błąd timeout

#### US-016: Recovery po błędach sieci

**Jako** użytkownik
**Chcę** aby system obsługiwał problemy z połączeniem sieciowym
**Aby** móc kontynuować pracę mimo przejściowych problemów

**Kryteria akceptacji**:

- [ ] Gdy sieć jest niedostępna, wyświetlany jest komunikat: "Brak połączenia z internetem. Sprawdź połączenie i spróbuj ponownie."
- [ ] System automatycznie ponawia żądanie po przywróceniu połączenia
- [ ] Przycisk "Spróbuj ponownie" pozwala na manualne ponowienie żądania
- [ ] Stan formularza jest zachowany podczas problemów z siecią
- [ ] **Kody promocyjne są zachowywane lokalnie podczas błędów sieci** ⭐️ NOWE
- [ ] Po przywróceniu połączenia użytkownik może kontynuować od miejsca przerwania

### Epic 7: Dostępność i użyteczność

#### US-017: Accessibility compliance

**Jako** użytkownik korzystający z technologii asystujących
**Chcę** móc w pełni korzystać z systemu logowania
**Aby** mieć równy dostęp do funkcji

**Kryteria akceptacji**:

- [ ] Pełna nawigacja klawiaturowa (Tab/Shift+Tab/Enter/Escape)
- [ ] Screen reader support z właściwymi ARIA labels
- [ ] Semantic HTML z odpowiednią strukturą nagłówków
- [ ] Focus indicators wyraźnie widoczne (2px solid outline)
- [ ] Labels powiązane z polami formularza
- [ ] Error messages ogłaszane przez screen readery (aria-live)
- [ ] **Kody promocyjne obsługiwane przez screen readery z odpowiednimi opisami** ⭐️ NOWE
- [ ] **Komunikaty o aktywacji konta są dostępne dla technologii asystujących** ⭐️ NOWE
- [ ] High contrast mode compatibility
- [ ] Minimum ratio kontrastu 4.5:1 dla tekstu
- [ ] Alt text dla wszystkich obrazów i ikon
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] Skip links dla głównej nawigacji
- [ ] Rozmiar tekstu skalowalny do 200% bez utraty funkcjonalności
- [ ] Brak migotających elementów (seizure prevention)

### Epic 8: Kody promocyjne ⭐️ NOWE (Wersja 2)

#### US-021: Kod promocyjny podczas rejestracji ⭐️ NOWE

**Jako** nowy użytkownik
**Chcę** móc wprowadzić kod promocyjny podczas rejestracji
**Aby** otrzymać dodatkowe kredyty po aktywacji konta

**Kryteria akceptacji**:

- [ ] Formularz rejestracji zawiera opcjonalne pole "Kod promocyjny"
- [ ] Pole ma placeholder "Wprowadź kod promocyjny (opcjonalne)"
- [ ] Kod promocyjny jest walidowany w czasie rzeczywistym (po 3 sekundach od ostatniego znaku)
- [ ] Błędny kod nie blokuje rejestracji, ale wyświetla ostrzeżenie
- [ ] Poprawny kod wyświetla komunikat: "Kod promocyjny poprawny! Otrzymasz [X] dodatkowych kredytów po aktywacji konta."
- [ ] Kod promocyjny jest przesyłany razem z danymi rejestracji
- [ ] Po rejestracji z poprawnym kodem: "Konto zostało utworzone z kodem promocyjnym. Sprawdź email i kliknij link aktywacyjny aby otrzymać bonus."
- [ ] Kod zostaje aktywowany automatycznie przy aktywacji konta przez email

#### US-022: Kod promocyjny podczas logowania ⭐️ NOWE

**Jako** zalogowany użytkownik
**Chcę** móc aktywować kod promocyjny podczas logowania
**Aby** otrzymać dodatkowe kredyty na moje konto

**Kryteria akceptacji**:

- [ ] Formularz logowania zawiera opcjonalne pole "Masz kod promocyjny?"
- [ ] Pole rozwija się po kliknięciu "Tak, mam kod promocyjny"
- [ ] Kod jest walidowany podczas procesu logowania
- [ ] Błędny kod nie blokuje logowania, ale wyświetla osobny komunikat błędu
- [ ] Poprawny kod aktywuje się natychmiast po zalogowaniu
- [ ] Po zalogowaniu z kodem wyświetlany jest komunikat: "Zostałeś zalogowany i aktywowano kod promocyjny! Dodano [X] kredytów do Twojego konta."
- [ ] Zaktualizowana liczba kredytów jest widoczna w interfejsie użytkownika
- [ ] System sprawdza, czy kod nie został już użyty przez tego użytkownika

#### US-023: Błąd kodu promocyjnego - kod nieprawidłowy ⭐️ NOWE

**Jako** użytkownik wprowadzający błędny kod promocyjny
**Chcę** otrzymać jasny komunikat o błędzie
**Aby** wiedzieć, że kod jest nieprawidłowy i móc wprowadzić poprawny

**Kryteria akceptacji**:

- [ ] Przy błędnym kodzie wyświetlany jest komunikat: "Kod promocyjny jest nieprawidłowy. Sprawdź kod i spróbuj ponownie."
- [ ] Komunikat nie blokuje logowania/rejestracji
- [ ] Pole kodu zostaje podświetlone na czerwono
- [ ] Użytkownik może natychmiast wprowadzić poprawny kod
- [ ] **Podczas rejestracji**: proces rejestracji kontynuuje się bez kodu
- [ ] **Podczas logowania**: logowanie przebiega normalnie, kod pozostaje do ponownej próby

#### US-024: Błąd kodu promocyjnego - kod już użyty ⭐️ NOWE

**Jako** użytkownik próbujący użyć już wykorzystanego kodu
**Chcę** otrzymać informację o tym, że kod został już wykorzystany
**Aby** wiedzieć, że nie mogę go użyć ponownie

**Kryteria akceptacji**:

- [ ] Wyświetlany jest komunikat: "Ten kod promocyjny został już wykorzystany na Twoim koncie."
- [ ] Komunikat zawiera datę poprzedniej aktywacji (jeśli dostępna)
- [ ] Pole kodu zostaje wyczyszczone
- [ ] Użytkownik może wprowadzić inny kod promocyjny
- [ ] **Podczas logowania**: proces logowania kontynuuje się normalnie
- [ ] **Podczas rejestracji**: proces rejestracji kontynuuje się bez kodu

#### US-025: Błąd kodu promocyjnego - kod wygasły ⭐️ NOWE

**Jako** użytkownik próbujący użyć wygasłego kodu
**Chcę** otrzymać informację o wygaśnięciu kodu
**Aby** wiedzieć, że kod nie jest już ważny

**Kryteria akceptacji**:

- [ ] Wyświetlany jest komunikat: "Ten kod promocyjny wygasł [data wygaśnięcia]. Nie można go już aktywować."
- [ ] Komunikat zawiera informacje o dacie wygaśnięcia
- [ ] Pole kodu zostaje wyczyszczone
- [ ] Użytkownik może wprowadzić inny, aktualny kod promocyjny
- [ ] **Podczas logowania**: proces logowania kontynuuje się normalnie
- [ ] **Podczas rejestracji**: proces rejestracji kontynuuje się bez kodu

#### US-026: Błąd kodu promocyjnego - przekroczono limit aktywacji ⭐️ NOWE

**Jako** użytkownik próbujący aktywować zbyt wiele kodów w krótkim czasie
**Chcę** otrzymać informację o limicie aktywacji
**Aby** wiedzieć, kiedy mogę spróbować ponownie

**Kryteria akceptacji**:

- [ ] Po przekroczeniu limitu 5 aktywacji na godzinę wyświetlany jest komunikat: "Przekroczyłeś limit aktywacji kodów promocyjnych (5 na godzinę). Spróbuj ponownie za [X] minut."
- [ ] Komunikat zawiera dokładny czas do następnej możliwej próby
- [ ] Pole kodu promocyjnego staje się nieaktywne
- [ ] **Podczas logowania**: proces logowania kontynuuje się normalnie
- [ ] **Podczas rejestracji**: proces rejestracji kontynuuje się bez kodu
- [ ] Po upływie czasu ograniczenia pole staje się ponownie aktywne

### Epic 9: Zaawansowane funkcje

#### US-018: Token refresh mechanism

**Jako** zalogowany użytkownik
**Chcę** aby moja sesja była automatycznie przedłużana
**Aby** nie być zmuszonym do częstego logowania

**Kryteria akceptacji**:

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

#### US-019: Enhanced email validation

**Jako** system
**Chcę** walidować emaile na zaawansowanym poziomie
**Aby** zapewnić wysoką jakość danych i zmniejszyć spam

**Kryteria akceptacji**:

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

#### US-020: Analytics i monitoring (ZAKTUALIZOWANE Wersja 2)

**Jako** administrator systemu
**Chcę** śledzić metryki użytkowania i wydajności
**Aby** optymalizować system i podejmować decyzje biznesowe

**Kryteria akceptacji**:

- [ ] Śledzenie eventów: login, logout, registration, password_reset
- [ ] **Śledzenie eventów kodów promocyjnych: promo_code_entered, promo_code_activated, promo_code_error** ⭐️ NOWE
- [ ] **Śledzenie eventów aktywacji: account_activation_needed, activation_email_resent, account_activated** ⭐️ NOWE
- [ ] Metryki wydajności: czas ładowania, czas odpowiedzi API
- [ ] Metryki błędów: rate, typy błędów, recovery rate
- [ ] **Conversion rate z kodami promocyjnymi vs bez kodów** ⭐️ NOWE
- [ ] **Współczynnik aktywacji kont w czasie** ⭐️ NOWE
- [ ] User journey tracking
- [ ] A/B testing capability **dla różnych wariantów kodów promocyjnych** ⭐️ NOWE
- [ ] Real-time dashboard
- [ ] Automated alerting przy anomaliach

## 4. Nowe wymagania techniczne (Wersja 2)

### 4.1 Rate Limiting (Zaktualizowane)

```javascript
const rateLimits = {
  login: { maxAttempts: 5, windowMinutes: 15, blockDurationMinutes: 15 },
  passwordReset: {
    maxAttempts: 3,
    windowMinutes: 60,
    blockDurationMinutes: 60,
  },
  registration: { maxAttempts: 2, windowMinutes: 10, blockDurationMinutes: 30 },
  // NOWE - Wersja 2
  promoCodeVerification: {
    maxAttempts: 10,
    windowMinutes: 15,
    blockDurationMinutes: 120,
  },
  promoCodeActivation: {
    maxAttempts: 5,
    windowMinutes: 60,
    blockDurationMinutes: 120,
  },
  resendActivation: {
    maxAttempts: 3,
    windowMinutes: 60,
    blockDurationMinutes: 60,
  },
};
```

### 4.2 Nowe API Endpointy (Wersja 2)

```javascript
const NEW_ENDPOINTS = {
  RESEND_ACTIVATION: "/webhook-test/resend-activation-email",
  VERIFY_PROMO_CODE: "/webhook-test/verify-promo-code",
  ACTIVATE_PROMO_CODE: "/webhook-test/activate-promo-code",
};
```

### 4.3 Analytics Events (Rozszerzone Wersja 2)

```javascript
const analyticsEvents = {
  // Existing events...

  // Promo code events ⭐️ NOWE
  PROMO_CODE_ENTERED: "promo_code_entered",
  PROMO_CODE_SUCCESS: "promo_code_activated",
  PROMO_CODE_ERROR: "promo_code_error",
  PROMO_CODE_EXPIRED: "promo_code_expired_attempt",
  PROMO_CODE_ALREADY_USED: "promo_code_reuse_attempt",

  // Account activation events ⭐️ NOWE
  ACCOUNT_ACTIVATION_NEEDED: "account_activation_required",
  ACTIVATION_EMAIL_RESENT: "activation_email_resent",
  ACCOUNT_ACTIVATED: "account_activated",
};
```

### 4.4 Kluczowe metryki biznesowe (Nowe Wersja 2)

- **Conversion rate rejestracji z kodami promocyjnymi vs bez**
- **Najpopularniejsze kody promocyjne**
- **Współczynnik błędów weryfikacji kodów**
- **Średnia wartość kredytów z kodów promocyjnych**
- **Retention użytkowników z kodami vs bez**
- **Czas od rejestracji do aktywacji konta**
- **Skuteczność ponownego wysyłania emaili aktywacyjnych**

## 5. Zaktualizowany zakres funkcjonalny (Wersja 2)

### 5.1 Moduł Autentyfikacji (Zaktualizowany)

```
Autentyfikacja
├── Logowanie (US-001, US-002, US-003)
├── Logowanie - nieaktywowane konto (US-003A) ⭐️ NOWE
├── Logowanie z kodem promocyjnym (US-022) ⭐️ NOWE
├── Wylogowanie (US-011)
├── Zarządzanie sesją (US-010, US-012)
└── Obsługa błędów (US-004)
```

### 5.2 Moduł Rejestracji (Zaktualizowany)

```
Rejestracja
├── Tworzenie konta (US-007)
├── Rejestracja z kodem promocyjnym (US-021) ⭐️ NOWE
├── Weryfikacja email (US-008)
├── Ponowne wysyłanie aktywacji (US-003A) ⭐️ NOWE
└── Obsługa błędów (US-009)
```

### 5.3 Moduł Kodów Promocyjnych ⭐️ NOWY (Wersja 2)

```
Kody Promocyjne
├── Aktywacja podczas rejestracji (US-021)
├── Aktywacja podczas logowania (US-022)
├── Błąd - kod nieprawidłowy (US-023)
├── Błąd - kod już użyty (US-024)
├── Błąd - kod wygasły (US-025)
└── Błąd - limit aktywacji (US-026)
```

### 5.4 Moduły Wsparcia (Zaktualizowane)

```
Bezpieczeństwo
├── Rate limiting (US-014) - rozszerzone o kody promocyjne
├── Token refresh (US-018)
└── Enhanced validation (US-019)

UX/UI
├── Loading states (US-015) - rozszerzone o kody promocyjne
├── Network recovery (US-016) - z obsługą kodów promocyjnych
├── Accessibility (US-017) - z obsługą kodów promocyjnych
└── User info display (US-013) - z kredytami promocyjnymi

Monitoring
└── Analytics (US-020) - rozszerzone o eventy promocyjne
```

---

**Wersja dokumentu**: 2.0
**Data aktualizacji**: Czerwiec 2025
**Główne zmiany**: System kodów promocyjnych, obsługa nieaktywowanych kont, rozszerzone rate limiting, nowe analytics
