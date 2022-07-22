/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "1/4": "25%",
        "1/3": "33.3%",
      },
    },
  },
  plugins: [],
};
