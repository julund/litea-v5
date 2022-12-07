/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      "title": ["League Spartan", "sans-serif"],
      "sans": ["Sora", "sans-serif"],
      "mono": ["Inconsolata", "monospace"],
    },
    fontWeight: {
      "light": "300",
      "regular": "400",
      "medium": "500",
      "semibold": "600",
      "black": "800",
    },
    extend: {
      colors: {
        primary: colors.sky,
        base: colors.gray,
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"),],
};