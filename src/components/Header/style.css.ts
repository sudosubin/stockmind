import { style } from "@vanilla-extract/css";

export const view = style({
  paddingTop: "var(--rs-unit-x3)",
  paddingBottom: "var(--rs-unit-x3)",
  borderBottom: "1px solid var(--rs-color-border-neutral-faded)",
});

export const container = style({
  width: "1024px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
