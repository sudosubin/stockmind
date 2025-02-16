import { style } from "@vanilla-extract/css";

export const buttonContainer = style({
  width: "100%",
  marginTop: "auto",
  paddingTop: "var(--rs-unit-x8)",
  paddingBottom: "var(--rs-unit-x4)",
  "@media": {
    "(--rs-viewport-m)": {
      marginTop: 0,
    },
  },
});
