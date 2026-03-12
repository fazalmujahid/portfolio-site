import { useState, useRef, useEffect, useCallback } from "react";
import { BOOT_SEQUENCE, ASCII_LOGO } from "../data/resumeData";
import { executeCommand as runCommand } from "../commands/commands";
import { lookupDir } from "../utils/fileSystemHelpers";
import { useAIChat } from "./useAIChat";
import { useWarmup } from "./useWarmup";

export function useTerminal() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [booted, setBooted] = useState(false);
  const [talkMode, setTalkMode] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const termRef = useRef(null);
  const inputRef = useRef(null);

  const addLines = useCallback((newLines) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const { aiLoading, setChatHistory, sendToAI } = useAIChat(addLines);
  const { serverStatus } = useWarmup();

  const triggerGlitch = useCallback(() => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 300);
  }, []);

  // Boot sequence
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < BOOT_SEQUENCE.length) {
        setLines((prev) => [...prev, { text: BOOT_SEQUENCE[i], type: "system" }]);
        i++;
      } else {
        clearInterval(timer);
        setLines((prev) => [
          ...prev,
          { text: ASCII_LOGO, type: "ascii" },
          { text: "", type: "blank" },
        ]);
        setBooted(true);
      }
    }, 150);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [lines, aiLoading]);

  // Focus
  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted, lines]);

  const executeCommand = useCallback((cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory((prev) => [trimmed, ...prev]);
    setHistIdx(-1);

    // Talk mode
    if (talkMode) {
      if (trimmed.toLowerCase() === "exit" || trimmed.toLowerCase() === "quit") {
        setTalkMode(false);
        addLines([
          { text: `imad@portfolio:${cwd}$ ${trimmed}`, type: "prompt" },
          { text: "Exiting AI chat mode. Back to terminal.", type: "system" },
        ]);
        return;
      }
      addLines([{ text: `ai> ${trimmed}`, type: "prompt" }]);
      sendToAI(trimmed);
      return;
    }

    addLines([{ text: `imad@portfolio:${cwd}$ ${trimmed}`, type: "prompt" }]);

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");

    // History needs access to local state, handle it here
    if (command === "history") {
      if (history.length === 0) {
        addLines([{ text: "No commands in history yet.", type: "output" }]);
      } else {
        addLines(
          history
            .slice(0, 20)
            .reverse()
            .map((h, i) => ({ text: `  ${i + 1}  ${h}`, type: "output" }))
        );
      }
      return;
    }

    const result = runCommand(command, args, cwd, {
      setCwd,
      setTalkMode,
      setChatHistory,
      triggerGlitch,
      setMatrixActive,
    });

    if (result === "CLEAR") {
      setLines([]);
    } else if (Array.isArray(result)) {
      addLines(result);
    }
  }, [talkMode, cwd, history, addLines, sendToAI, setChatHistory, triggerGlitch]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = Math.min(histIdx + 1, history.length - 1);
        setHistIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx > 0) {
        const newIdx = histIdx - 1;
        setHistIdx(newIdx);
        setInput(history[newIdx]);
      } else {
        setHistIdx(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(/\s+/);
      const last = parts[parts.length - 1];
      if (last) {
        const dir = lookupDir(cwd);
        if (dir) {
          const match = dir.children.find((c) =>
            c.toLowerCase().startsWith(last.toLowerCase())
          );
          if (match) {
            parts[parts.length - 1] = match;
            setInput(parts.join(" "));
          }
        }
      }
    }
  }, [input, history, histIdx, cwd, executeCommand]);

  return {
    lines, input, setInput, cwd, booted, talkMode,
    matrixActive, setMatrixActive, glitch, aiLoading, serverStatus,
    termRef, inputRef, handleKeyDown,
  };
}
