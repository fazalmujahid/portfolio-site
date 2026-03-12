export default function MobileBanner({ onDismiss }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Fira Code', monospace",
        padding: 20,
      }}
      onClick={onDismiss}
    >
      <div
        style={{
          border: "1px solid #4af626",
          borderRadius: 8,
          padding: "24px 20px",
          maxWidth: 320,
          textAlign: "center",
          background: "#0a0a0a",
          boxShadow: "0 0 30px rgba(74, 246, 38, 0.15)",
        }}
      >
        <div style={{ color: "#4af626", fontSize: 13, marginBottom: 12, textShadow: "0 0 8px #4af626", whiteSpace: "nowrap" }}>
          {">"} SYSTEM NOTICE
        </div>
        <div style={{ color: "#ff9e3b", fontSize: 11, lineHeight: 1.6, marginBottom: 16 }}>
          Terminal optimized for desktop.
          <br />
          Mobile mode active — some
          <br />
          features may render differently.
        </div>
        <div
          style={{
            display: "inline-block",
            border: "1px solid #4af626",
            padding: "6px 20px",
            color: "#4af626",
            fontSize: 11,
            cursor: "pointer",
            textShadow: "0 0 4px #4af626",
            letterSpacing: "0.1em",
          }}
        >
          [ OK ]
        </div>
        <div style={{ color: "#444", fontSize: 9, marginTop: 10 }}>
          auto-dismiss in 8s
        </div>
      </div>
    </div>
  );
}
