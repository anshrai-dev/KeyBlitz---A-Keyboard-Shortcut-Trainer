# ⌨️ KeyBlitz — Keyboard Shortcut Trainer

A gamified, responsive keyboard shortcut trainer built with **pure HTML, CSS & JavaScript** — no frameworks, no dependencies.

---

## 🎮 Features

- **3 Applications** — VS Code, Chrome, Windows
- **3 Difficulty Levels** — Beginner, Intermediate, Advanced
- **72+ Shortcuts** to master
- **Real-time key detection** — listens to your actual keyboard
- **Combo system** — chain correct answers for score multipliers
- **Timer-based scoring** — faster answers = more points
- **Hint system** — get a hint at a 30% point penalty
- **Grade system** — S / A / B / C / D ratings per session
- **Full results breakdown** — see every question's outcome
- **Responsive** — works on mobile, tablet, and desktop

---

## 📁 Project Structure

keyboard-shortcut-trainer/
├── index.html     # All screens and markup
├── style.css      # Complete responsive styling
├── game.js        # Game engine, state management, key detection
├── data.js        # All shortcuts data organized by app & level


---

## 🧠 How It Works

### Key Detection
The app listens to native `keydown` and `keyup` events, normalizes key names (e.g., `Control → Ctrl`, `ArrowUp → ↑`), and compares the pressed combination against the expected shortcut.

### Scoring System
- Base points per correct answer depend on difficulty (10 / 20 / 30)
- **Time bonus**: Faster answers earn more points
- **Combo multiplier**: Every 3 correct answers in a row raises your combo (up to x4)
- **Hint penalty**: Using a hint deducts 30% of possible points

### Game Flow
Home → Select App → Select Level → Game Loop → Results

---

## 💡 Concepts Used

- DOM manipulation (createElement, classList, innerHTML)
- Event listeners (keydown, keyup, click)
- Game state management with a plain JS object
- Timer logic with setInterval / clearInterval
- Responsive CSS Grid & Flexbox
- CSS custom properties (variables)
- CSS animations and transitions
- LocalStorage-free — purely session-based

---

## 🎨 Design Highlights

- Dark UI with grid texture background
- Custom key-chip styling mimicking real keyboard keys
- Smooth transitions between game states
- Color-coded feedback (green = correct, red = wrong)
- Combo animations

---

## 📈 Possible Improvements

- Add more apps (Figma, Photoshop, Terminal)
- Leaderboard with localStorage
- Daily challenge mode
- Typing mode (type the key names instead of pressing them)
- Sound effects

Thank You

## 📄 License

MIT — free to use, modify, and share.
