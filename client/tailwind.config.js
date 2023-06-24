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
        'rich-black': '#04080F',
        'glaucous-blue': '#507DBC',
        'powder-blue': '#A1C6EA',
        'columbia-blue': '#BBD1EA',
        'platinum-gray': '#DAE3E5',
        'bright-yellow': '#ffb31a',
      },
    },
  },
  plugins: [],
};
