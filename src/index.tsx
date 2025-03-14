import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "reshaped/themes/reshaped/theme.css";
import "#/shared/modern-normalize.css";
import "#/shared/override-font.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "#/App";

const root = document.getElementById("root");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
