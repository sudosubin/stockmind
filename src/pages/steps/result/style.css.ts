import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  alignItems: "center",
  paddingTop: "calc(var(--rs-unit-x1) * 20)",
});

export const correct = style({
  boxShadow: "0 0 0 2px var(--rs-color-background-positive)",
});

export const incorrect = style({
  boxShadow: "0 0 0 2px var(--rs-color-background-critical)",
});
