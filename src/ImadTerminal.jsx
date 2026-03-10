import MatrixRain from "./components/MatrixRain";
import TerminalScreen from "./components/TerminalScreen";
import { useTerminal } from "./hooks/useTerminal";
import { TERMINAL_CSS } from "./utils/styles";

export default function ImadTerminal() {
  const {
    lines, input, setInput, cwd, booted, talkMode,
    matrixActive, setMatrixActive, glitch, aiLoading,
    termRef, inputRef, handleKeyDown,
  } = useTerminal();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: "monospace",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <style>{TERMINAL_CSS}</style>

      {matrixActive && <MatrixRain onExit={() => setMatrixActive(false)} />}

      {/* CRT Monitor Frame */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          height: "90vh",
          background: "#1a1a1a",
          borderRadius: 24,
          padding: "18px 18px 30px",
          boxShadow: "0 0 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          border: "2px solid #2a2a2a",
        }}
      >
        {/* Monitor top bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 12, padding: "0 8px",
        }}>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f" }} />
          </div>
          <div style={{
            fontSize: 11, color: "#666", fontFamily: "'Fira Code', monospace",
            letterSpacing: "0.1em",
          }}>
            CRT-9000 — imad@portfolio
          </div>
          <div style={{ width: 44 }} />
        </div>

        {/* Screen */}
        <TerminalScreen
          ref={termRef}
          lines={lines}
          glitch={glitch}
          aiLoading={aiLoading}
          booted={booted}
          talkMode={talkMode}
          cwd={cwd}
          input={input}
          onInputChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
        />

        {/* Monitor bottom label */}
        <div style={{
          textAlign: "center", marginTop: 10,
          fontSize: 10, color: "#444", fontFamily: "'Fira Code', monospace",
          letterSpacing: "0.2em", textTransform: "uppercase",
        }}>
          ImadOS v8.0 — Powered by Claude AI — CRT-9000 Series
        </div>
      </div>
    </div>
  );
}
