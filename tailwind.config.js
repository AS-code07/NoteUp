module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#ffd1dc',
          blue: '#c7ceea',
          green: '#b5ead7',
          yellow: '#fff1b6',
        },
        minimal: {
          bg: '#f9fafb',
          text: '#22223b',
        },
        vibrant: {
          magenta: '#ff2e63',
          cyan: '#08d9d6',
          yellow: '#f9f871',
        },
        notion: {
          bg: '#f7f6f3',
          block: '#ececec',
        },
      },
    },
  },
  plugins: [],
}; 