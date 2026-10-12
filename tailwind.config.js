/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        teal: {
          deep: '#0F8C85',
          dark: '#0B6B66',
          light: '#E6F4F3',
        },
        yellow: {
          sunny: '#F7C948',
          hover: '#E5B738',
        },
        lime: {
          neon: '#D6F66B',
          soft: '#E8FAA3',
        },
        course: {
          sky: '#C9EEF8',
          pink: '#F9D3F0',
          peach: '#F8DFC4',
          lavender: '#DCD3F8',
        },
        sage: {
          bg: '#E4EDE5',
          card: '#F4F8F5',
          darkBg: '#121816',
          darkCard: '#1A2320',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(15, 140, 133, 0.08)',
        'float': '0 20px 40px -15px rgba(0, 0, 0, 0.07)',
        'yellow-glow': '0 8px 20px -4px rgba(247, 201, 72, 0.4)',
      },
    },
  },
  plugins: [],
}
