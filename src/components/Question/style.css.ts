import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  alignItems: "center",
  paddingTop: "calc(var(--rs-unit-x1) * 20)",
});

export const description = style({
  wordBreak: "keep-all",
});
