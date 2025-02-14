import { style } from "@vanilla-extract/css";

export const view = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "var(--rs-unit-x3)",
  paddingBottom: "var(--rs-unit-x3)",
  borderTop: "1px solid var(--rs-color-border-neutral-faded)",
});
