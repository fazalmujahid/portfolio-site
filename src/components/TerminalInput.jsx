import { forwardRef } from "react";

const TerminalInput = forwardRef(function TerminalInput(
  { input, onChange, onKeyDown, disabled, talkMode, cwd },
  ref
) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: 2 }}>
      <span
        style={{
          color: talkMode ? "#4af6f0" : "#4af626",
          textShadow: talkMode ? "0 0 6px #4af6f0" : "0 0 4px #4af626",
          marginRight: 8,
          flexShrink: 0,
        }}
      >
        {talkMode ? "ai>" : `imad@portfolio:${cwd}$`}
      </span>
      <input
        ref={ref}
        value={input}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
        autoFocus
        spellCheck={false}
        style={{
          background: "transparent",
          border: "none",
          outline: "none",
          color: "#b8c4b8",
          fontFamily: "'Fira Code', monospace",
          fontSize: 13.5,
          flex: 1,
          caretColor: "#4af626",
          textShadow: "0 0 4px rgba(74,246,38,0.3)",
        }}
      />
      <span
        style={{
          width: 8,
          height: 18,
          background: "#4af626",
          animation: "blink 1s step-end infinite",
          marginLeft: -8,
          opacity: 0.8,
        }}
      />
    </div>
  );
});

export default TerminalInput;
