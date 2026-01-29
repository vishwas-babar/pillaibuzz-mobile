/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#06B6D4',
        background: '#F8FAFC',
        surface: '#FFFFFF',
        text: '#020617',
        muted: '#64748B',
        border: '#E2E8F0',
      },
    },
  },
  plugins: [],
};
