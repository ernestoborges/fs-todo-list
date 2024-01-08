/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "marine": "#111827",
        "card": "#1f2937",
        "primary-text": "#FFFFFF",
        "secondary-text": "#9ca3af"
      }
    },
  },
  plugins: [],
}