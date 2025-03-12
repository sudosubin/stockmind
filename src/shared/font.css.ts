import { globalStyle } from "@vanilla-extract/css";

globalStyle("[data-rs-theme=reshaped]", {
  vars: {
    "--rs-font-family-title":
      "Pretendard, Inter, BlinkMacSystemFont, -apple-system, Roboto, Helvetica, Arial, sans-serif",
    "--rs-font-family-body":
      "Pretendard, Inter, BlinkMacSystemFont, -apple-system, Roboto, Helvetica, Arial, sans-serif",
  },
});

globalStyle("html", {
  fontFamily: `Pretendard, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'`,
});
