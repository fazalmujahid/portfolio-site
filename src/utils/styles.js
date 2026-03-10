export function getLineColor(type) {
  switch (type) {
    case "prompt": return "#4af626";
    case "system": return "#ff9e3b";
    case "error": return "#ff4444";
    case "ai": return "#4af6f0";
    case "ascii": return "#4af626";
    default: return "#b8c4b8";
  }
}

export const TERMINAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap');
  @keyframes blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
  @keyframes scanmove { 0% { top: -5%; } 100% { top: 105%; } }
  @keyframes flicker { 0% { opacity: 0.98; } 5% { opacity: 0.95; } 10% { opacity: 0.98; } 15% { opacity: 0.92; } 20% { opacity: 0.98; } 100% { opacity: 0.98; } }
  @keyframes glitchShift { 0% { transform: translate(0); } 20% { transform: translate(-3px, 2px); } 40% { transform: translate(3px, -2px); } 60% { transform: translate(-2px, -1px); } 80% { transform: translate(2px, 1px); } 100% { transform: translate(0); } }
  @keyframes textGlitch { 0% { clip-path: inset(40% 0 61% 0); transform: translate(-3px); } 20% { clip-path: inset(92% 0 1% 0); transform: translate(3px); } 40% { clip-path: inset(43% 0 1% 0); transform: translate(-2px); } 60% { clip-path: inset(25% 0 58% 0); transform: translate(2px); } 80% { clip-path: inset(54% 0 7% 0); transform: translate(-1px); } 100% { clip-path: inset(58% 0 43% 0); transform: translate(1px); } }
  @keyframes bootPulse { 0%,100% { text-shadow: 0 0 5px #4af626; } 50% { text-shadow: 0 0 20px #4af626, 0 0 40px #4af626; } }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
  ::-webkit-scrollbar-thumb { background: #4af62644; border-radius: 3px; }
`;
