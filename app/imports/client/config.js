import { keyframes } from "styled-components";

// animations

const fadeIn = keyframes`
  from { opacity: 0; margin-top: 10px; }
  to { opacity: 1; margin-top: 0px; }
`;

export default {
  colors: {
    primary: "#00848c",
    primaryLighter: "rgba(0, 0, 0, .1)",
    primaryContrast: "#fff",
    accent: "#F06292",
    secondary: "#FFA000",
    secondaryContrast: "#37474F",
    border: "#eee",
    text: "white",
    textSecondary: "#444",
    textLighter: "#333",
    icon: "#666",
  },
  padding: {
    horizontal: "16%",
    horizontalMin: "20px",
    vertical: "20px",
  },
  animations: {
    fadeIn: `${fadeIn} .2s`,
  },
  shadow: {
    normal: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
  },
};
