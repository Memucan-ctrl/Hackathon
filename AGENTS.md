# SomaSync — Dev Guide

## Project Structure
```
somasync/
├── index.html                 # Entry point (Tailwind CDN)
├── AGENTS.md
├── src/
│   ├── css/style.css          # @layer components, custom classes
│   ├── js/
│   │   ├── app.js             # Orchestrator: fetches mock data, mounts components
│   │   ├── components/
│   │   │   ├── sidebar.js     # Navigation sidebar (self-contained)
│   │   │   ├── courseBlocks.js # Course cards with progress & next lecture
│   │   │   ├── githubWidget.js # GitHub streak, contribution grid, commits
│   │   │   └── calendarPreview.js # Timeline of upcoming events
│   │   └── utils/
│   │       └── renderer.js    # DOM helpers: createElement, formatDate, timeAgo
│   └── data/
│       ├── courses.json       # Mock Moodle course data
│       ├── github.json        # Mock GitHub contribution data
│       └── calendar.json      # Mock calendar events
```

## Data Contracts (for backend team)

| File | Endpoint | Key Fields |
|------|----------|------------|
| `courses.json` | `GET /api/courses` | id, code, name, instructor, progress, materials[], assignments[], nextLecture |
| `github.json` | `GET /api/github/insights` | username, currentStreak, totalCommits, contributionCalendar.weeks[].days[], recentCommits[] |
| `calendar.json` | `GET /api/calendar/upcoming` | id, title, type, courseCode, start, end, color, reminder, whatsappSent |

## Component Ownership (avoid merge conflicts)
- **Person A**: `sidebar.js` + `app.js` orchestration
- **Person B**: `courseBlocks.js` + `githubWidget.js`
- **Person C**: `calendarPreview.js` + data JSON contracts

## Commands
- No build step needed. Open `index.html` in a browser (or use Live Server).
- Tailwind is loaded via Play CDN. Swap to `npm install tailwindcss` for production.

## Design Tokens
- `glass-panel`: `.bg-gray-900/70 backdrop-blur-xl border-gray-800/50 rounded-2xl`
- `glass-panel-hover`: adds hover lift + border highlight
- `nav-link-active/inactive`: sidebar nav item states
- `progress-bar/fill`: thin bar with gradient
- `contribution-cell`: 12x12px rounded square for GitHub grid
