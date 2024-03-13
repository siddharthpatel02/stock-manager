/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#c10000",
        secondary: "#003C3B",
        accent: "#003C3B",
      },
    },
  },
  plugins: [],
};
