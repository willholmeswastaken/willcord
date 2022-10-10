/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1e2225",
        secondary: "#2d3137",
        tertiary: "#37393f",
      },
    },
  },
  plugins: [],
};
