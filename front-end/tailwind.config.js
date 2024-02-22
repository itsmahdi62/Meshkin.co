/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto Mono , monospace",
    },
    extend: {
      height: {
        screen: "100dvh",
      },
      boxShadow: {
        "3xl": "0  10px 15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
