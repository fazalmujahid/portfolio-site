import { useState, useEffect, useCallback } from "react";
import MatrixRain from "./components/MatrixRain";
import TerminalScreen from "./components/TerminalScreen";
import MobileBanner from "./components/MobileBanner.jsx";
import { useTerminal } from "./hooks/useTerminal";
import { useIsMobile } from "./hooks/useIsMobile";
import { TERMINAL_CSS } from "./utils/styles";

export default function ImadTerminal() {
  const isMobile = useIsMobile();
  const [showBanner, setShowBanner] = useState(isMobile);
  const {
    lines, input, setInput, cwd, booted, talkMode,
    matrixActive, setMatrixActive, glitch, aiLoading, serverStatus,
    termRef, inputRef, handleKeyDown,
  } = useTerminal(isMobile);

  // Auto-dismiss after 3 seconds
  useEffect(() => {
    if (!showBanner) return;
    const timer = setTimeout(() => setShowBanner(false), 8000);
    return () => clearTimeout(timer);
  }, [showBanner]);

  const dismissBanner = useCallback(() => setShowBanner(false), []);

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#111",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? 4 : 20,
        fontFamily: "monospace",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <style>{TERMINAL_CSS}</style>

      {showBanner && <MobileBanner onDismiss={dismissBanner} />}

      {matrixActive && <MatrixRain onExit={() => setMatrixActive(false)} />}

      {/* CRT Monitor Frame */}
      <div
        style={{
          width: "100%",
          maxWidth: 960,
          height: isMobile ? "100dvh" : "90vh",
          background: "#1a1a1a",
          borderRadius: isMobile ? 12 : 24,
          padding: isMobile ? "8px 6px 14px" : "18px 18px 30px",
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
          marginBottom: isMobile ? 6 : 12, padding: "0 8px",
        }}>
          <div style={{ display: "flex", gap: isMobile ? 6 : 8 }}>
            <div style={{ width: isMobile ? 8 : 12, height: isMobile ? 8 : 12, borderRadius: "50%", background: "#ff5f56" }} />
            <div style={{ width: isMobile ? 8 : 12, height: isMobile ? 8 : 12, borderRadius: "50%", background: "#ffbd2e" }} />
            <div style={{ width: isMobile ? 8 : 12, height: isMobile ? 8 : 12, borderRadius: "50%", background: "#27c93f" }} />
          </div>
          <div style={{
            fontSize: isMobile ? 9 : 11, color: "#666", fontFamily: "'Fira Code', monospace",
            letterSpacing: "0.1em",
          }}>
            {isMobile ? "CRT-9000" : "CRT-9000 — imad@portfolio"}
          </div>
          <div style={{ width: isMobile ? 30 : 44 }} />
        </div>

        {/* Screen */}
        <TerminalScreen
          ref={termRef}
          lines={lines}
          glitch={glitch}
          aiLoading={aiLoading}
          serverStatus={serverStatus}
          booted={booted}
          talkMode={talkMode}
          cwd={cwd}
          input={input}
          onInputChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
          isMobile={isMobile}
        />

        {/* Monitor bottom label */}
        <div style={{
          textAlign: "center", marginTop: isMobile ? 6 : 10,
          fontSize: isMobile ? 8 : 10, color: "#444", fontFamily: "'Fira Code', monospace",
          letterSpacing: "0.2em", textTransform: "uppercase",
        }}>
          {isMobile ? "ImadOS v8.0 — Claude AI" : "ImadOS v8.0 — Powered by Claude AI — CRT-9000 Series"}
        </div>
      </div>
    </div>
  );
}
