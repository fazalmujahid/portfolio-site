# Portfolio Site - Project Context

## Overview
Retro hacker terminal portfolio website for Imad (Staff Engineer at Nagarro). Users interact via a CRT-style terminal UI with commands like `help`, `ls`, `cat`, and `talk` (AI chat mode).

## Tech Stack
- **Frontend:** React 19 + Vite 6, inline styles (CSS-in-JS), Fira Code monospace font
- **Backend:** FastAPI + Uvicorn (Python), hosted on Render free tier
- **AI:** Anthropic Claude API via Azure Foundry (`AnthropicFoundry` client)
- **Database:** PostgreSQL (optional, for chat logging)
- **Deployment:** Frontend on Vercel/static, Backend on Render (free tier - has cold start ~50s)

## Architecture
```
src/
  main.jsx                  # Entry point, mounts ImadTerminal
  ImadTerminal.jsx          # Root component with CRT monitor frame
  components/
    TerminalScreen.jsx      # Terminal display area with scanlines/effects
    TerminalLine.jsx        # Individual line renderer
    TerminalInput.jsx       # Command input with prompt
    MatrixRain.jsx          # Easter egg fullscreen animation
    AILoadingSequence.jsx   # Progressive loading messages for cold start
  hooks/
    useTerminal.js          # Main state: lines, input, history, boot sequence
    useAIChat.js            # AI chat: fetch /api/chat, loading state
    useWarmup.js            # Server warmup: pings /api/health on load
  commands/
    commands.js             # Terminal command execution (help, ls, cd, cat, talk, etc.)
  data/
    resumeData.js           # Boot sequence, ASCII logo, fortunes, resume data
    fileSystem.js           # Virtual file system structure
  utils/
    styles.js               # CSS keyframes, color helpers
    fileSystemHelpers.js    # Path resolution utilities
server.py                   # FastAPI backend (POST /api/chat, GET /api/health)
```

## Key Patterns
- Terminal lines stored as `{text, type}` objects; type determines color via `getLineColor()`
- Colors: prompt=#4af626, system=#ff9e3b, error=#ff4444, ai=#4af6f0, default=#b8c4b8
- All animations defined in `TERMINAL_CSS` string in styles.js
- `addLines()` callback passed down for appending terminal output
- AI chat only active in "talk mode" (toggled by `talk` command)

## Commands
```
npm run dev      # Start both frontend (port 3000) and backend (port 3001)
npm run client   # Frontend only
npm run server   # Backend only (python server.py)
npm run build    # Production build
```

## Environment Variables
- `VITE_API_URL` - Backend URL for frontend (empty = same origin, uses Vite proxy)
- `AI_KEY` - Anthropic API key
- `AI_ENDPOINT` - Azure Foundry endpoint
- `AI_MODEL` - Model name (default: claude-haiku-4-5)
- `DATABASE_URL` - PostgreSQL connection string (optional)
