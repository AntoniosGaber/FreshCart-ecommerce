import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react\\class-list.json"
  ],
  theme: {
    extend: {
      colors: {
        main: "#0aad0a",
        light: "#f0f3f2",
      },
    },
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [flowbiteReact],
};