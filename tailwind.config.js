/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#365486',
          light: '#1f2125',
          'extra-light': '#35373b',
        },
        secondary: {
          DEFAULT: '#7FC7D9',
          dark: '#d79447',
        },
        text: {
          light: '#d1d5db',
        },
        white: '#ffffff',
      },
      maxWidth: {
        'custom': '1200px',
      },
      screens: {
        'md': {'max': '767px'},
      },
    },
  },
  plugins: [],
};
