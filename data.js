const SHORTCUTS_DATA = {
  vscode: {
    name: "VS Code",
    icon: "⚡",
    color: "#007ACC",
    levels: {
      beginner: [
        { keys: ["Ctrl", "S"], description: "Save file", hint: "Quick save your work" },
        { keys: ["Ctrl", "Z"], description: "Undo", hint: "Undo the last action" },
        { keys: ["Ctrl", "C"], description: "Copy", hint: "Copy selected text" },
        { keys: ["Ctrl", "V"], description: "Paste", hint: "Paste from clipboard" },
        { keys: ["Ctrl", "X"], description: "Cut", hint: "Cut selected text" },
        { keys: ["Ctrl", "A"], description: "Select All", hint: "Select everything in file" },
        { keys: ["Ctrl", "F"], description: "Find", hint: "Open search in file" },
        { keys: ["Ctrl", "N"], description: "New File", hint: "Open a new untitled file" },
      ],
      intermediate: [
        { keys: ["Ctrl", "Shift", "P"], description: "Command Palette", hint: "Access all VS Code commands" },
        { keys: ["Ctrl", "P"], description: "Quick Open File", hint: "Jump to any file by name" },
        { keys: ["Ctrl", "`"], description: "Toggle Terminal", hint: "Show/hide the integrated terminal" },
        { keys: ["Ctrl", "B"], description: "Toggle Sidebar", hint: "Show/hide the side panel" },
        { keys: ["Ctrl", "D"], description: "Select Next Match", hint: "Multi-cursor on next occurrence" },
        { keys: ["Alt", "↑"], description: "Move Line Up", hint: "Move current line up" },
        { keys: ["Alt", "↓"], description: "Move Line Down", hint: "Move current line down" },
        { keys: ["Ctrl", "/"], description: "Toggle Comment", hint: "Comment/uncomment lines" },
      ],
      advanced: [
        { keys: ["Ctrl", "Shift", "K"], description: "Delete Line", hint: "Remove the entire current line" },
        { keys: ["Ctrl", "Shift", "L"], description: "Select All Occurrences", hint: "Multi-select all matches" },
        { keys: ["F2"], description: "Rename Symbol", hint: "Rename variable/function everywhere" },
        { keys: ["F12"], description: "Go to Definition", hint: "Jump to where it's defined" },
        { keys: ["Ctrl", "K", "Ctrl", "C"], description: "Add Line Comment", hint: "Comment out selected lines" },
        { keys: ["Ctrl", "Shift", "\\"], description: "Jump to Bracket", hint: "Jump between matching brackets" },
        { keys: ["Ctrl", "G"], description: "Go to Line", hint: "Jump to a specific line number" },
        { keys: ["Ctrl", "Shift", "F"], description: "Find in Files", hint: "Search across entire project" },
      ]
    }
  },
  chrome: {
    name: "Chrome",
    icon: "🌐",
    color: "#4285F4",
    levels: {
      beginner: [
        { keys: ["Ctrl", "T"], description: "New Tab", hint: "Open a fresh tab" },
        { keys: ["Ctrl", "W"], description: "Close Tab", hint: "Close the current tab" },
        { keys: ["Ctrl", "R"], description: "Reload Page", hint: "Refresh the current page" },
        { keys: ["Ctrl", "L"], description: "Focus Address Bar", hint: "Jump to the URL bar" },
        { keys: ["Ctrl", "Tab"], description: "Next Tab", hint: "Switch to the next tab" },
        { keys: ["Ctrl", "H"], description: "History", hint: "Open browser history" },
        { keys: ["Ctrl", "D"], description: "Bookmark Page", hint: "Save this page" },
        { keys: ["F11"], description: "Fullscreen", hint: "Toggle fullscreen mode" },
      ],
      intermediate: [
        { keys: ["Ctrl", "Shift", "T"], description: "Reopen Closed Tab", hint: "Bring back that tab you closed" },
        { keys: ["Ctrl", "Shift", "J"], description: "Developer Tools", hint: "Open DevTools console" },
        { keys: ["Ctrl", "U"], description: "View Page Source", hint: "See the raw HTML of the page" },
        { keys: ["Ctrl", "Shift", "N"], description: "Incognito Window", hint: "Open a private browsing window" },
        { keys: ["Alt", "←"], description: "Go Back", hint: "Navigate to the previous page" },
        { keys: ["Alt", "→"], description: "Go Forward", hint: "Navigate to the next page" },
        { keys: ["Ctrl", "+"], description: "Zoom In", hint: "Make the page bigger" },
        { keys: ["Ctrl", "-"], description: "Zoom Out", hint: "Make the page smaller" },
      ],
      advanced: [
        { keys: ["Ctrl", "Shift", "I"], description: "Inspect Element", hint: "Open DevTools on element" },
        { keys: ["Ctrl", "Shift", "Delete"], description: "Clear Browsing Data", hint: "Open clear history dialog" },
        { keys: ["Ctrl", "F5"], description: "Hard Reload", hint: "Reload ignoring cache" },
        { keys: ["Ctrl", "Shift", "M"], description: "Device Mode", hint: "Toggle mobile device simulator" },
        { keys: ["F12"], description: "Open DevTools", hint: "Open developer tools panel" },
        { keys: ["Ctrl", "Shift", "C"], description: "Pick Element", hint: "Inspect a specific element" },
        { keys: ["Ctrl", "1"], description: "First Tab", hint: "Jump to the first open tab" },
        { keys: ["Ctrl", "9"], description: "Last Tab", hint: "Jump to the last open tab" },
      ]
    }
  },
  windows: {
    name: "Windows",
    icon: "🪟",
    color: "#0078D4",
    levels: {
      beginner: [
        { keys: ["Win", "D"], description: "Show Desktop", hint: "Minimize all windows" },
        { keys: ["Win", "L"], description: "Lock Screen", hint: "Lock your computer" },
        { keys: ["Alt", "F4"], description: "Close Window", hint: "Close the current application" },
        { keys: ["Win", "E"], description: "File Explorer", hint: "Open Windows Explorer" },
        { keys: ["Ctrl", "Alt", "Del"], description: "Task Manager", hint: "Access task manager" },
        { keys: ["Win", "R"], description: "Run Dialog", hint: "Open the Run command" },
        { keys: ["Alt", "Tab"], description: "Switch Windows", hint: "Switch between open apps" },
        { keys: ["Win", "I"], description: "Settings", hint: "Open Windows Settings" },
      ],
      intermediate: [
        { keys: ["Win", "←"], description: "Snap Left", hint: "Snap window to left half" },
        { keys: ["Win", "→"], description: "Snap Right", hint: "Snap window to right half" },
        { keys: ["Win", "↑"], description: "Maximize", hint: "Maximize the current window" },
        { keys: ["Win", "Tab"], description: "Task View", hint: "See all open windows & desktops" },
        { keys: ["Win", "Shift", "S"], description: "Screenshot", hint: "Take a snip/screenshot" },
        { keys: ["Win", "V"], description: "Clipboard History", hint: "See recent clipboard items" },
        { keys: ["Win", "+"], description: "Magnifier", hint: "Open the screen magnifier" },
        { keys: ["Ctrl", "Shift", "Esc"], description: "Task Manager Direct", hint: "Open Task Manager directly" },
      ],
      advanced: [
        { keys: ["Win", "Ctrl", "D"], description: "New Virtual Desktop", hint: "Create a new desktop workspace" },
        { keys: ["Win", "Ctrl", "→"], description: "Next Desktop", hint: "Switch to next virtual desktop" },
        { keys: ["Win", "X"], description: "Power Menu", hint: "Access power user menu" },
        { keys: ["Win", "P"], description: "Project Display", hint: "Choose display/projection mode" },
        { keys: ["Win", "G"], description: "Game Bar", hint: "Open Xbox Game Bar" },
        { keys: ["Win", "H"], description: "Voice Typing", hint: "Start dictation/voice input" },
        { keys: ["Win", "K"], description: "Connect Display", hint: "Connect to wireless display" },
        { keys: ["Win", "Pause"], description: "System Info", hint: "Open system properties" },
      ]
    }
  }
};

const LEVEL_CONFIG = {
  beginner: { label: "Beginner", color: "#4ade80", points: 10, timeLimit: 15 },
  intermediate: { label: "Intermediate", color: "#facc15", points: 20, timeLimit: 12 },
  advanced: { label: "Advanced", color: "#f87171", points: 30, timeLimit: 10 }
};