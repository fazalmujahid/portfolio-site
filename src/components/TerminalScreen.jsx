import { forwardRef } from "react";
import TerminalLine from "./TerminalLine";
import TerminalInput from "./TerminalInput";
import AILoadingSequence from "./AILoadingSequence";

const TerminalScreen = forwardRef(function TerminalScreen(
  { lines, glitch, aiLoading, serverStatus, booted, talkMode, cwd, input, onInputChange, onKeyDown, inputRef },
  termRef
) {
  return (
    <div
      style={{
        flex: 1,
        background: "#0a0a0a",
        borderRadius: 12,
        position: "relative",
        overflow: "hidden",
        border: "1px solid #222",
        animation: glitch ? "glitchShift 0.3s ease" : "flicker 8s infinite",
      }}
    >
      {/* Scanline moving bar */}
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "8%", background: "linear-gradient(transparent, rgba(74,246,38,0.03), transparent)",
          animation: "scanmove 8s linear infinite", pointerEvents: "none", zIndex: 5,
        }}
      />

      {/* Static scanlines */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 4,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        }}
      />

      {/* Screen curvature vignette */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 6,
          background: "radial-gradient(ellipse at center, transparent 65%, rgba(0,0,0,0.5) 100%)",
          borderRadius: 12,
        }}
      />

      {/* Phosphor glow overlay */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3,
          boxShadow: "inset 0 0 80px rgba(74, 246, 38, 0.04)",
          borderRadius: 12,
        }}
      />

      {/* Terminal content */}
      <div
        ref={termRef}
        style={{
          position: "absolute",
          inset: 0,
          overflowY: "auto",
          padding: "16px 20px",
          fontFamily: "'Fira Code', monospace",
          fontSize: 13.5,
          lineHeight: 1.7,
          zIndex: 2,
        }}
      >
        {lines.map((line, i) => (
          <TerminalLine
            key={i}
            line={line}
            glitch={glitch}
            isRecent={i > lines.length - 4}
          />
        ))}

        {aiLoading && <AILoadingSequence serverStatus={serverStatus} />}

        {booted && (
          <TerminalInput
            ref={inputRef}
            input={input}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            disabled={aiLoading}
            talkMode={talkMode}
            cwd={cwd}
          />
        )}
      </div>
    </div>
  );
});

export default TerminalScreen;
