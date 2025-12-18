/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        fb: {
          blue: "#1877F2",
          bg1: "#F0F2F5",
          bg2: "#E4E6EB",
          card: "#FFFFFF",
          text: "#050505",
          gray: "#65676B",
          border: "#CED0D4",
        },
      },
    },
  },
  plugins: [],
};
