# Cosmic Carrot Collector – QA Checklist: Responsiveness & Mobile Testing

## 1. Desktop (PC/laptop)
- [ ] Gra uruchamia się automatycznie, canvas zajmuje całą przeglądarkę.
- [ ] Sterowanie klawiaturą (strzałki + spacja) działa płynnie.
- [ ] UI (licznik marchewek, instrukcja) jest widoczne i czytelne.
- [ ] Po zebraniu 5 marchewek pojawia się popup z gratulacjami i opcją restartu.
- [ ] Animacje są płynne, nie występują szarpnięcia.

## 2. Tablet (np. iPad, Android Tablet)
- [ ] Canvas i UI skalują się do rozmiaru ekranu.
- [ ] Przyciski dotykowe pojawiają się automatycznie.
- [ ] Sterowanie dotykowe (lewo/prawo/skok) działa bez opóźnień.
- [ ] UI nie zasłania przycisków i jest czytelne.

## 3. Smartfon (iOS/Android, pionowo i poziomo)
- [ ] Canvas dopasowuje się do szerokości ekranu.
- [ ] Przyciski dotykowe są wygodne do użycia kciukiem.
- [ ] UI nie nachodzi na przyciski, popup jest czytelny.
- [ ] Gra nie wymaga przewijania strony w żadnym trybie.
- [ ] Animacje i sterowanie są płynne.

## 4. Różne rozdzielczości i DPI
- [ ] Gra działa poprawnie na ekranach HD, FullHD, 4K, Retina.
- [ ] Elementy UI nie są zbyt małe/duże na żadnym urządzeniu.
- [ ] Przy zmianie rozmiaru okna (desktop) gra dynamicznie się dostosowuje.

---

## Instrukcja testowania

1. Otwórz grę na różnych urządzeniach (PC, tablet, smartfon).
2. Przetestuj sterowanie klawiaturą i dotykiem.
3. Zbierz 5 marchewek – sprawdź popup, animacje, możliwość restartu.
4. Zmień orientację ekranu (pion/poziom) – sprawdź, czy gra się poprawnie przeskalowuje.
5. Zwróć uwagę na płynność animacji i czytelność UI.
6. Zanotuj wszelkie problemy z responsywnością, sterowaniem lub grafiką.

---

**Wyniki testów należy udokumentować w DECISION_LOG.md lub osobnym raporcie QA.**
