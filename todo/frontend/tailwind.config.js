/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        charm: ['"Charm"', "sans-serif"], // Add Charm font
        nunito: ['"Nunito"', "sans-serif"], // Add Nunito font
        playwrite: ['"Playwrite MX Guides"', "serif"], // Add Playwrite MX Guides font
        tangerine: ['"Tangerine"', "cursive"], // Add Tangerine font
      },
    },
  },
  plugins: [],
};
