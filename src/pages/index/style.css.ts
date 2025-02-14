import { style } from "@vanilla-extract/css";

export const hero = style({
  display: "flex",
  alignItems: "center",
  paddingTop: "calc(var(--rs-unit-x1) * 20)",
  paddingBottom: "calc(var(--rs-unit-x1) * 20)",
});

export const heroDescription = style({
  wordBreak: "keep-all",
});
