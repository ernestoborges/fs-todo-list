/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'back': "url('../src/assets/Sprinkle.svg')",
        
      },
      colors: {
        "marine": "#111827",
        "card": "#1f2937",
        "secondary-text": "#9ca3af",
        "purple-darker": "#6F61C0",
        "lilac": "#A084E8",
        "turquoise": "#8BE8E5"
      }
    },
  },
  plugins: [],
}