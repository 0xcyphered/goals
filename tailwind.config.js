/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-bubble1-start': 'rgba(119, 222, 255, 0.12)',
        'bg-bubble1-stop': 'rgba(239, 58, 255, 0.12)',
        'bg-bubble2-start': 'rgba(36, 0, 255, 0.12)',
        'bg-bubble2-stop': 'rgba(0, 255, 209, 0.12)',
        'bg-transparent': 'rgba(3, 7, 18, 0.52)',
      }
    },
  },
  plugins: [],
}