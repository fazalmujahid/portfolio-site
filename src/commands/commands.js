import { NEOFETCH, NEOFETCH_MOBILE, FORTUNES } from "../data/resumeData";
import { FILE_SYSTEM } from "../data/fileSystem";
import { resolvePath, lookupDir, lookupFile } from "../utils/fileSystemHelpers";

// Strip box-drawing borders from file content for mobile readability
function stripBoxDrawing(text) {
  return text
    .split("\n")
    .map((line) => {
      // Remove lines that are purely box borders (═, ─, ╔, ╗, ╚, ╝, ╠, ╣, ┌, ┐, └, ┘, ├, ┤)
      if (/^[╔╗╚╝╠╣═║┌┐└┘├┤─┬┴\s]+$/.test(line)) return null;
      // Strip leading/trailing box chars (║, │) and trim
      return line.replace(/^[║│]\s*/, "").replace(/\s*[║│]$/, "");
    })
    .filter((line) => line !== null)
    .join("\n");
}

export function executeCommand(command, args, cwd, { setCwd, setTalkMode, setChatHistory, triggerGlitch, setMatrixActive, isMobile }) {
  switch (command) {
    case "help":
      if (isMobile) {
        return [
          { text: "", type: "blank" },
          { text: "AVAILABLE COMMANDS", type: "system" },
          { text: "──────────────────", type: "system" },
          { text: "ls [dir]     List directory", type: "system" },
          { text: "cd <dir>     Change directory", type: "system" },
          { text: "cat <file>   Read file", type: "system" },
          { text: "talk         AI chat mode", type: "system" },
          { text: "neofetch     System info", type: "system" },
          { text: "whoami       Who is Imad?", type: "system" },
          { text: "clear        Clear terminal", type: "system" },
          { text: "history      Command history", type: "system" },
          { text: "fortune      Fortune cookie", type: "system" },
          { text: "tree         Directory tree", type: "system" },
          { text: "ping <host>  Ping a host", type: "system" },
          { text: "matrix       ???", type: "system" },
          { text: "coffee       Essential", type: "system" },
          { text: "hack <tgt>   Educational", type: "system" },
        ];
      }
      return [
        { text: "", type: "blank" },
        { text: "╔═══════════════════════════════════════════════╗", type: "system" },
        { text: "║            AVAILABLE COMMANDS                 ║", type: "system" },
        { text: "╠═══════════════════════════════════════════════╣", type: "system" },
        { text: "║  ls [dir]        List directory contents      ║", type: "system" },
        { text: "║  cd <dir>        Change directory             ║", type: "system" },
        { text: "║  cat <file>      Read file contents           ║", type: "system" },
        { text: "║  talk            Enter AI chat mode           ║", type: "system" },
        { text: "║  neofetch        System information           ║", type: "system" },
        { text: "║  whoami          Who is Imad?                 ║", type: "system" },
        { text: "║  clear           Clear terminal               ║", type: "system" },
        { text: "║  history         Command history              ║", type: "system" },
        { text: "║  fortune         Dev fortune cookie           ║", type: "system" },
        { text: "║  tree            Show directory tree          ║", type: "system" },
        { text: "║  ping <host>     Ping a host                  ║", type: "system" },
        { text: "║  matrix          ???                          ║", type: "system" },
        { text: "║  coffee          Essential                    ║", type: "system" },
        { text: "║  hack <target>   For educational purposes     ║", type: "system" },
        { text: "╚═══════════════════════════════════════════════╝", type: "system" },
      ];

    case "ls": {
      const target = args ? resolvePath(cwd, args.replace(/\/$/, "")) : cwd;
      const dir = lookupDir(target);
      if (dir) {
        return dir.children.map((c) => ({
          text: c.endsWith("/") ? `  📁 ${c}` : `  📄 ${c}`,
          type: "output",
        }));
      }
      return [{ text: `ls: cannot access '${args}': No such directory`, type: "error" }];
    }

    case "cd": {
      if (!args || args === "~") {
        setCwd("~");
        return [];
      }
      const target = resolvePath(cwd, args.replace(/\/$/, ""));
      const dir = lookupDir(target);
      if (dir) {
        setCwd(target);
        return [];
      }
      const file = lookupFile(target);
      if (file && file.type === "file") {
        return [{ text: `cd: not a directory: ${args}`, type: "error" }];
      }
      return [{ text: `cd: no such directory: ${args}`, type: "error" }];
    }

    case "cat": {
      if (!args) {
        return [{ text: "cat: missing operand", type: "error" }];
      }
      const target = resolvePath(cwd, args);
      const entry = lookupFile(target);
      if (entry && entry.type === "file") {
        const content = isMobile ? stripBoxDrawing(entry.content) : entry.content;
        return [{ text: "", type: "blank" }, { text: content, type: "output" }];
      }
      if (entry && entry.type === "dir") {
        return [{ text: `cat: ${args}: Is a directory`, type: "error" }];
      }
      return [{ text: `cat: ${args}: No such file`, type: "error" }];
    }

    case "talk":
      setTalkMode(true);
      setChatHistory([]);
      if (isMobile) {
        return [
          { text: "", type: "blank" },
          { text: "AI CHAT MODE ACTIVATED", type: "ai" },
          { text: "──────────────────────", type: "ai" },
          { text: "Ask me anything about Imad.", type: "ai" },
          { text: 'Type "exit" to return.', type: "ai" },
        ];
      }
      return [
        { text: "", type: "blank" },
        { text: "╔═══════════════════════════════════════════════╗", type: "ai" },
        { text: "║       AI CHAT MODE ACTIVATED                 ║", type: "ai" },
        { text: "║  Ask me anything about Imad.                 ║", type: "ai" },
        { text: '║  Type "exit" to return to terminal.          ║', type: "ai" },
        { text: "╚═══════════════════════════════════════════════╝", type: "ai" },
      ];

    case "neofetch":
      return [{ text: isMobile ? NEOFETCH_MOBILE : NEOFETCH, type: "ascii" }];

    case "whoami":
      return [
        { text: "", type: "blank" },
        { text: "You're visiting the portfolio of Imaduddin Mujahid.", type: "output" },
        { text: "Staff Engineer at Nagarro. AI/Chatbot specialist.", type: "output" },
        { text: "8+ years of building things that talk back.", type: "output" },
        { text: "", type: "blank" },
        { text: 'Try "cat about.txt" for the full story.', type: "system" },
      ];

    case "clear":
      return "CLEAR";

    case "tree": {
      const treeLines = [
        "~",
        "├── about.txt",
        "├── contact.txt",
        "├── education.txt",
        "├── skills/",
        "│   ├── languages.txt",
        "│   ├── ai_ml.txt",
        "│   ├── cloud.txt",
        "│   ├── backend.txt",
        "│   ├── frontend.txt",
        "│   └── databases.txt",
        "├── projects/",
        "│   ├── 01_multichannel_bot.txt",
        "│   ├── 02_wealth_assistant.txt",
        "│   ├── 03_edu_assistant.txt",
        "│   ├── 04_personal_assistant.txt",
        "│   ├── 05_resource_mgmt.txt",
        "│   ├── 06_retail_pos.txt",
        "│   ├── 07_event_mgmt.txt",
        "│   └── 08_pos_layer.txt",
        "└── secret/",
        "    ├── easter_eggs.txt",
        "    └── .classified",
      ];
      return treeLines.map((t) => ({ text: t, type: "output" }));
    }

    case "fortune":
      return [
        { text: "", type: "blank" },
        { text: "🥠 " + FORTUNES[Math.floor(Math.random() * FORTUNES.length)], type: "output" },
      ];

    case "ping":
      if (args.toLowerCase().includes("imad")) {
        return [
          { text: `PING imad@live.in (127.0.0.1): 56 bytes`, type: "output" },
          { text: `64 bytes: icmp_seq=1 ttl=64 time=0.042ms`, type: "output" },
          { text: `64 bytes: icmp_seq=2 ttl=64 time=0.038ms`, type: "output" },
          { text: `64 bytes: icmp_seq=3 ttl=64 time=0.041ms`, type: "output" },
          { text: "", type: "blank" },
          { text: "--- imad reachable! Response time: instant ---", type: "system" },
          { text: "Best way to reach him: imad@live.in", type: "system" },
        ];
      }
      return [
        { text: `PING ${args || "localhost"} — packets transmitted`, type: "output" },
        { text: `But why ping ${args || "that"} when you could ping Imad?`, type: "system" },
      ];

    case "matrix":
      setMatrixActive(true);
      triggerGlitch();
      return [{ text: "Entering the Matrix... (click anywhere to exit)", type: "system" }];

    case "coffee":
      return [
        { text: "", type: "blank" },
        { text: "  ( (", type: "output" },
        { text: "   ) )", type: "output" },
        { text: " ........", type: "output" },
        { text: " |      |]", type: "output" },
        { text: " \\      /", type: "output" },
        { text: "  `----'", type: "output" },
        { text: "", type: "blank" },
        { text: "Coffee brewing... This is what powers the code.", type: "system" },
      ];

    case "hack":
      triggerGlitch();
      return [
        { text: "", type: "blank" },
        { text: `[*] Initializing hack on ${args || "mainframe"}...`, type: "system" },
        { text: "[*] Bypassing firewall.......... DONE", type: "system" },
        { text: "[*] Cracking encryption........ DONE", type: "system" },
        { text: "[*] Accessing root............. DONE", type: "system" },
        { text: "", type: "blank" },
        { text: "Just kidding. Imad builds bots, not exploits. 😄", type: "output" },
        { text: "But he IS pretty good at system design.", type: "output" },
      ];

    case "sudo":
      triggerGlitch();
      if (args.includes("rm -rf")) {
        return [
          { text: "", type: "blank" },
          { text: "Nice try. 😏", type: "error" },
          { text: "Imad's resume is protected by enterprise-grade security.", type: "error" },
          { text: "(and common sense)", type: "system" },
        ];
      }
      return [{ text: "Permission denied. You're a visitor, not root!", type: "error" }];

    case "rm":
      return [{ text: "rm: operation not permitted. This is a read-only portfolio!", type: "error" }];

    case "exit":
    case "quit":
      return [
        { text: "", type: "blank" },
        { text: "Thanks for visiting! But you can't exit... you're trapped. 👻", type: "system" },
        { text: "Just kidding. Close the tab whenever you like.", type: "output" },
        { text: "Or better yet, email imad@live.in first!", type: "system" },
      ];

    default:
      return [
        {
          text: `command not found: ${command}. Type "help" for available commands.`,
          type: "error",
        },
      ];
  }
}
