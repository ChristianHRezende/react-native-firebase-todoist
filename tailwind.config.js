/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2DD8FE',
        secondary: '#C0D3D7',
        dark: {
          background: '#1D1C1C',
          text: '#FFFFFF',
        },
        light: {
          background: '#FFFFFF',
          text: '#1D1C1C',
        },
      },
    },
  },
  plugins: [],
};
