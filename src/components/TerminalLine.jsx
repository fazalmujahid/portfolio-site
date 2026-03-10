import { getLineColor } from "../utils/styles";

export default function TerminalLine({ line, glitch, isRecent }) {
  return (
    <div
      style={{
        color: getLineColor(line.type),
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        textShadow: line.type === "ascii"
          ? "0 0 8px #4af626"
          : line.type === "ai"
          ? "0 0 6px #4af6f0"
          : line.type === "error"
          ? "0 0 6px #ff4444"
          : "0 0 4px rgba(74,246,38,0.3)",
        animation: glitch && isRecent ? "textGlitch 0.3s ease" : "none",
      }}
    >
      {line.text}
    </div>
  );
}
