import { useState, useEffect } from "react";

const COLD_MESSAGES = [
  { delay: 0, text: "> Establishing secure connection to AI core..." },
  { delay: 2000, text: "> Encrypting neural handshake protocol..." },
  { delay: 5000, text: "> Warming up neural pathways..." },
  { delay: 8000, text: "> Allocating memory buffers... [128 GB]" },
  { delay: 12000, text: "> Synchronizing with Claude AI mainframe..." },
  { delay: 18000, text: "> Server waking from deep sleep... standby..." },
  { delay: 25000, text: "> Cold boot in progress... this takes ~30 sec on free tier..." },
  { delay: 35000, text: "> Almost there... reticulating splines..." },
  { delay: 45000, text: "> Still working... Render free tier is waking up..." },
];

const WARM_MESSAGES = [
  { delay: 0, text: "> Querying AI core..." },
  { delay: 3000, text: "> Processing neural response..." },
];

export default function AILoadingSequence({ serverStatus }) {
  const messages = serverStatus === "warm" ? WARM_MESSAGES : COLD_MESSAGES;
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const timers = messages.slice(1).map((msg, i) =>
      setTimeout(() => setVisibleCount(i + 2), msg.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [serverStatus]);

  const visible = messages.slice(0, visibleCount);

  return (
    <div style={{ color: "#4af6f0", textShadow: "0 0 6px #4af6f0" }}>
      {visible.map((msg, i) => (
        <div
          key={i}
          style={{
            animation: "fadeSlideIn 0.3s ease",
            marginBottom: 2,
          }}
        >
          {i === visible.length - 1 ? (
            <>
              <span>{msg.text}</span>
              <span style={{ animation: "blink 1s infinite" }}> _</span>
            </>
          ) : (
            <span style={{ opacity: 0.6 }}>{msg.text}</span>
          )}
        </div>
      ))}
    </div>
  );
}
