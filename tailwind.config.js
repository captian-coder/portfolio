/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          teal: '#14b8a6',
          coral: '#f97316',
          violet: '#8b5cf6',
          rose: '#fb7185',
          ink: '#09090b',
        },
      },
      boxShadow: {
        premium: '0 18px 55px rgba(9, 9, 11, 0.14)',
        glow: '0 18px 45px rgba(20, 184, 166, 0.22)',
      },
      backgroundImage: {
        'mesh-light':
          'radial-gradient(circle at 12% 18%, rgba(20,184,166,.17), transparent 28%), radial-gradient(circle at 88% 8%, rgba(139,92,246,.17), transparent 26%), radial-gradient(circle at 70% 82%, rgba(20,184,166,.10), transparent 30%)',
        'mesh-dark':
          'radial-gradient(circle at 10% 16%, rgba(20,184,166,.19), transparent 28%), radial-gradient(circle at 82% 14%, rgba(139,92,246,.20), transparent 27%), radial-gradient(circle at 62% 78%, rgba(20,184,166,.12), transparent 30%)',
      },
    },
  },
  plugins: [],
};
