/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3490DC",
        secondary: "#F1C40F",
        tertiary: "#E74C3C",
        quaternary: "#9B59B6",
        lightgray: "#ECF0F1",
        darkgray: "#34495E",
        white: "#FFFFFF",
        black: "#000000",
        success: "#2ECC71",
        info: "#3498DB",
        warning: "#F39C12",
        danger: "#E74C3C",
      },
    },
  },
  plugins: [],
};
