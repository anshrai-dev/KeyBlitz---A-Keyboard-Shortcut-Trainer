// ====== GAME STATE ======
const state = {
  screen: "home", // home | select | game | result
  app: null,
  level: null,
  shortcuts: [],
  currentIndex: 0,
  score: 0,
  streak: 0,
  maxStreak: 0,
  pressedKeys: new Set(),
  timeLeft: 0,
  timerInterval: null,
  results: [],
  totalTime: 0,
  startTime: null,
  hintUsed: false,
  combo: 1,
};

// ====== KEY NORMALIZATION ======
const KEY_MAP = {
  Control: "Ctrl", Meta: "Win", Alt: "Alt", Shift: "Shift",
  " ": "Space", ArrowUp: "↑", ArrowDown: "↓", ArrowLeft: "←", ArrowRight: "→",
  Backquote: "`", Backslash: "\\", Slash: "/",
};

function normalizeKey(e) {
  if (e.key in KEY_MAP) return KEY_MAP[e.key];
  if (e.key.length === 1) return e.key.toUpperCase();
  return e.key;
}

// ====== DOM HELPERS ======
const $ = (id) => document.getElementById(id);
const show = (id) => { const el = $(id); if (el) el.style.display = ""; };
const hide = (id) => { const el = $(id); if (el) el.style.display = "none"; };

function setScreen(name) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const screen = document.getElementById("screen-" + name);
  if (screen) screen.classList.add("active");
  state.screen = name;
}

// ====== HOME SCREEN ======
function initHome() {
  const grid = $("app-grid");
  grid.innerHTML = "";
  Object.entries(SHORTCUTS_DATA).forEach(([key, app]) => {
    const card = document.createElement("div");
    card.className = "app-card";
    card.style.setProperty("--app-color", app.color);
    card.innerHTML = `
      <div class="app-icon">${app.icon}</div>
      <div class="app-name">${app.name}</div>
      <div class="app-meta">${Object.values(app.levels).reduce((a, l) => a + l.length, 0)} shortcuts</div>
    `;
    card.addEventListener("click", () => selectApp(key));
    grid.appendChild(card);
  });
}

function selectApp(appKey) {
  state.app = appKey;
  const app = SHORTCUTS_DATA[appKey];

  $("select-app-icon").textContent = app.icon;
  $("select-app-name").textContent = app.name;

  // Render level cards
  const levelGrid = $("level-grid");
  levelGrid.innerHTML = "";
  Object.entries(LEVEL_CONFIG).forEach(([lvlKey, lvlCfg]) => {
    const shortcuts = app.levels[lvlKey];
    const card = document.createElement("div");
    card.className = "level-card";
    card.style.setProperty("--level-color", lvlCfg.color);
    card.innerHTML = `
      <div class="level-badge" style="background:${lvlCfg.color}22;color:${lvlCfg.color}">${lvlCfg.label}</div>
      <div class="level-info">
        <span>🎯 ${shortcuts.length} shortcuts</span>
        <span>⏱ ${lvlCfg.timeLimit}s each</span>
        <span>⭐ ${lvlCfg.points} pts/correct</span>
      </div>
      <button class="btn-start-level" onclick="startGame('${lvlKey}')">Start →</button>
    `;
    levelGrid.appendChild(card);
  });

  setScreen("select");
}

// ====== GAME ENGINE ======
function startGame(levelKey) {
  state.level = levelKey;
  const appData = SHORTCUTS_DATA[state.app];
  const allShortcuts = [...appData.levels[levelKey]];
  state.shortcuts = shuffle(allShortcuts);
  state.currentIndex = 0;
  state.score = 0;
  state.streak = 0;
  state.maxStreak = 0;
  state.pressedKeys.clear();
  state.results = [];
  state.combo = 1;
  state.startTime = Date.now();

  updateGameUI();
  setScreen("game");
  loadQuestion();
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function loadQuestion() {
  if (state.currentIndex >= state.shortcuts.length) {
    endGame();
    return;
  }

  const shortcut = state.shortcuts[state.currentIndex];
  const cfg = LEVEL_CONFIG[state.level];
  state.timeLeft = cfg.timeLimit;
  state.hintUsed = false;

  // Update question display
  $("shortcut-description").textContent = shortcut.description;
  $("shortcut-hint-text").textContent = shortcut.hint;
  $("hint-box").classList.remove("visible");

  // Render key display
  renderExpectedKeys(shortcut.keys);

  // Render keyboard area
  $("pressed-keys-display").innerHTML = '<span class="waiting-text">Press the keys...</span>';

  updateProgress();
  startTimer();
  updateComboDisplay();
}

function renderExpectedKeys(keys) {
  const container = $("expected-keys-wrap");
  container.innerHTML = `
    <div class="keys-label">// Target Shortcut</div>
    <div class="key-display-row" id="expected-keys">${keys.map((k, i) => `
      <span class="key-chip expected">${k}</span>
      ${i < keys.length - 1 ? '<span class="key-plus">+</span>' : ''}
    `).join("")}</div>
  `;
}

function startTimer() {
  clearInterval(state.timerInterval);
  updateTimerDisplay();
  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    updateTimerDisplay();
    if (state.timeLeft <= 0) {
      clearInterval(state.timerInterval);
      handleWrong(true); // timeout
    }
  }, 1000);
}

function updateTimerDisplay() {
  const el = $("timer-display");
  el.textContent = state.timeLeft;
  el.className = "timer-display";
  if (state.timeLeft <= 5) el.classList.add("danger");
  else if (state.timeLeft <= 8) el.classList.add("warning");

  const pct = (state.timeLeft / LEVEL_CONFIG[state.level].timeLimit) * 100;
  $("timer-bar").style.width = pct + "%";
  $("timer-bar").className = "timer-bar-fill " + (state.timeLeft <= 5 ? "danger" : state.timeLeft <= 8 ? "warning" : "");
}

function updateProgress() {
  const total = state.shortcuts.length;
  const current = state.currentIndex + 1;
  $("progress-text").textContent = `${current} / ${total}`;
  $("progress-fill").style.width = ((state.currentIndex / total) * 100) + "%";
}

function updateGameUI() {
  const app = SHORTCUTS_DATA[state.app];
  $("game-app-name").textContent = app.name + " — " + LEVEL_CONFIG[state.level].label;
  $("score-display").textContent = state.score;
}

function updateComboDisplay() {
  const el = $("combo-display");
  if (state.combo > 1) {
    el.textContent = `🔥 x${state.combo} Combo!`;
    el.className = "combo-display active";
  } else {
    el.textContent = "";
    el.className = "combo-display";
  }
}

// ====== KEY DETECTION ======
document.addEventListener("keydown", (e) => {
  if (state.screen !== "game") return;
  e.preventDefault();

  const key = normalizeKey(e);
  if (["Ctrl", "Shift", "Alt", "Win"].includes(key)) {
    state.pressedKeys.add(key);
    showPressedKeys();
    return;
  }

  state.pressedKeys.add(key);
  showPressedKeys();
  checkAnswer();
});

document.addEventListener("keyup", (e) => {
  if (state.screen !== "game") return;
  const key = normalizeKey(e);
  // Only clear modifier keys on keyup to allow combo detection
  if (["Ctrl", "Shift", "Alt", "Win"].includes(key)) {
    state.pressedKeys.delete(key);
    showPressedKeys();
  }
});

function showPressedKeys() {
  const container = $("pressed-keys-display");
  const keys = [...state.pressedKeys];
  if (keys.length === 0) {
    container.innerHTML = '<span class="waiting-text">Press the keys...</span>';
    return;
  }
  container.innerHTML = keys.map((k, i) => `
    <span class="key-chip pressed">${k}</span>
    ${i < keys.length - 1 ? '<span class="key-plus">+</span>' : ''}
  `).join("");
}

function checkAnswer() {
  const shortcut = state.shortcuts[state.currentIndex];
  const expected = shortcut.keys.map(k => k.toUpperCase());
  const pressed = [...state.pressedKeys].map(k => k.toUpperCase());

  const isMatch =
    expected.length === pressed.length &&
    expected.every(k => pressed.includes(k));

  if (isMatch) {
    handleCorrect();
  }
}

function handleCorrect() {
  clearInterval(state.timerInterval);
  const cfg = LEVEL_CONFIG[state.level];
  const timeBonus = Math.floor((state.timeLeft / cfg.timeLimit) * cfg.points);
  const hintPenalty = state.hintUsed ? Math.floor(cfg.points * 0.3) : 0;
  const points = Math.max(0, (cfg.points + timeBonus) * state.combo - hintPenalty);

  state.score += points;
  state.streak++;
  if (state.streak > state.maxStreak) state.maxStreak = state.streak;
  if (state.streak % 3 === 0) state.combo = Math.min(4, state.combo + 1);

  state.results.push({ correct: true, points, shortcut: state.shortcuts[state.currentIndex] });

  $("score-display").textContent = state.score;
  showFeedback("correct", `+${points} pts`, state.streak);

  state.pressedKeys.clear();
  state.currentIndex++;

  setTimeout(() => {
    hideFeedback();
    loadQuestion();
  }, 900);
}

function handleWrong(isTimeout = false) {
  clearInterval(state.timerInterval);
  state.streak = 0;
  state.combo = 1;

  state.results.push({ correct: false, points: 0, shortcut: state.shortcuts[state.currentIndex] });

  showFeedback("wrong", isTimeout ? "⏰ Time's up!" : "❌ Wrong!");
  updateComboDisplay();

  state.pressedKeys.clear();
  state.currentIndex++;

  setTimeout(() => {
    hideFeedback();
    loadQuestion();
  }, 1100);
}

function showFeedback(type, text, streak) {
  const el = $("feedback-overlay");
  el.className = "feedback-overlay " + type;
  $("feedback-text").textContent = text;

  if (type === "correct" && streak && streak > 0 && streak % 3 === 0) {
    $("feedback-sub").textContent = `🔥 ${streak} streak! Combo x${state.combo}`;
  } else if (type === "correct") {
    $("feedback-sub").textContent = streak > 1 ? `🔥 ${streak} in a row!` : "Nice!";
  } else {
    const shortcut = state.shortcuts[state.currentIndex - 1];
    $("feedback-sub").textContent = `Correct: ${shortcut.keys.join(" + ")}`;
  }

  el.style.display = "flex";
  setTimeout(() => el.classList.add("show"), 10);
}

function hideFeedback() {
  const el = $("feedback-overlay");
  el.classList.remove("show");
  setTimeout(() => { el.style.display = "none"; }, 200);
}

// ====== HINT ======
function useHint() {
  if (state.hintUsed) return;
  state.hintUsed = true;
  $("hint-box").classList.add("visible");
}

// ====== SKIP ======
function skipQuestion() {
  clearInterval(state.timerInterval);
  handleWrong(false);
}

// ====== END GAME ======
function endGame() {
  state.totalTime = Math.floor((Date.now() - state.startTime) / 1000);
  const total = state.results.length;
  const correct = state.results.filter(r => r.correct).length;
  const accuracy = Math.round((correct / total) * 100);

  // Grade
  let grade, gradeColor, gradeMsg;
  if (accuracy >= 90) { grade = "S"; gradeColor = "#fbbf24"; gradeMsg = "Legendary!"; }
  else if (accuracy >= 75) { grade = "A"; gradeColor = "#4ade80"; gradeMsg = "Excellent!"; }
  else if (accuracy >= 60) { grade = "B"; gradeColor = "#60a5fa"; gradeMsg = "Good Job!"; }
  else if (accuracy >= 40) { grade = "C"; gradeColor = "#f97316"; gradeMsg = "Keep Practicing!"; }
  else { grade = "D"; gradeColor = "#f87171"; gradeMsg = "Don't Give Up!"; }

  $("result-grade").textContent = grade;
  $("result-grade").style.color = gradeColor;
  $("result-grade-msg").textContent = gradeMsg;
  $("result-score").textContent = state.score;
  $("result-accuracy").textContent = accuracy + "%";
  $("result-streak").textContent = state.maxStreak;
  $("result-time").textContent = state.totalTime + "s";

  // Results breakdown
  const list = $("results-list");
  list.innerHTML = state.results.map(r => `
    <div class="result-item ${r.correct ? 'correct' : 'wrong'}">
      <span class="result-icon">${r.correct ? '✅' : '❌'}</span>
      <span class="result-desc">${r.shortcut.description}</span>
      <span class="result-keys">${r.shortcut.keys.join(" + ")}</span>
      <span class="result-pts">${r.correct ? '+' + r.points : '0'} pts</span>
    </div>
  `).join("");

  setScreen("result");
}

// ====== NAVIGATION ======
function goHome() {
  clearInterval(state.timerInterval);
  setScreen("home");
}

function goSelect() {
  clearInterval(state.timerInterval);
  setScreen("select");
}

function retryGame() {
  startGame(state.level);
}

// ====== INIT ======
window.addEventListener("DOMContentLoaded", () => {
  initHome();
  setScreen("home");
});