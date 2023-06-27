/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#223553',
        secondary: '#717D96',
        'searchbar-bg': '#dae3e5',
        'light-shade': '#edf1f3',
        'light-accent': '#8495ab',
        main: '#507dbc',
        'dark-accent': '#717d96',
        'dark-shade': '223553',
      },
      gridTemplateColumns: {
        main: '0.8fr 2fr',
      },
    },
  },
  plugins: [],
};
