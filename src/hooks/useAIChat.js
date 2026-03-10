import { useState, useCallback } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "";

export function useAIChat(addLines) {
  const [aiLoading, setAiLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const sendToAI = useCallback(async (userMsg) => {
    setAiLoading(true);
    const newChat = [...chatHistory, { role: "user", content: userMsg }];
    setChatHistory(newChat);
    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newChat }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      const reply = data.reply || "ERROR: AI core returned null. Try again.";
      setChatHistory((prev) => [...prev, { role: "assistant", content: reply }]);
      addLines([{ text: "", type: "blank" }, { text: reply, type: "ai" }]);
    } catch {
      addLines([{ text: "ERROR: AI core unreachable. Check connection.", type: "error" }]);
    } finally {
      setAiLoading(false);
    }
  }, [chatHistory, addLines]);

  const resetChat = useCallback(() => {
    setChatHistory([]);
  }, []);

  return { aiLoading, chatHistory, setChatHistory, sendToAI, resetChat };
}
