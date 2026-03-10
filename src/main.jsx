import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ImadTerminal from "./ImadTerminal";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ImadTerminal />
  </StrictMode>
);
