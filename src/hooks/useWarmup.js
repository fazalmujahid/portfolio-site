import { useState, useEffect, useRef } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "";

export function useWarmup() {
  const [serverStatus, setServerStatus] = useState("cold");
  const pinged = useRef(false);

  useEffect(() => {
    if (pinged.current) return;
    pinged.current = true;

    const controller = new AbortController();
    setServerStatus("warming");

    fetch(`${API_BASE}/api/health`, { signal: controller.signal })
      .then((res) => {
        if (res.ok) setServerStatus("warm");
        else setServerStatus("cold");
      })
      .catch(() => {
        setServerStatus("cold");
      });

    return () => controller.abort();
  }, []);

  return { serverStatus };
}
