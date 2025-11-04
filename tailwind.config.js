/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00ff88',
        secondary: '#ff00ff',
        dark: '#0a0a0a',
      },
    },
  },
  plugins: [],
};
