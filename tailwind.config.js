/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2DD8FE',
        secondary: '#C0D3D7',
        success: '#4EF3A4',
        warning: '#00CABE',
        error: '#F34E4E',
        dark: {
          background: '#1D1C1C',
          base: '#FFFFFF',
        },
        light: {
          background: '#FFFFFF',
          base: '#1D1C1C',
        },
      },
    },
  },
  plugins: [],
};
