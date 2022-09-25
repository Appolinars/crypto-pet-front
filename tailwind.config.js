/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

const accentColor = '#ea1313';
const secondaryColor = '#0fbb0f';
const primaryDarkColor = '#191b1f';
const primaryLightColor = '#e7dfe4';

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accentColor,
        secondaryColor,
        primaryDarkColor,
        primaryLightColor,
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out',
      },
      transitionDuration: {
        DEFAULT: '400ms',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.btn': {
          backgroundColor: accentColor,
          color: primaryLightColor,
          borderRadius: theme('borderRadius.xl'),
          padding: '10px',
          minWidth: '180px',
          textAlign: 'center',
          transition: 'background-color .4s',
          '&:hover': {
            backgroundColor: '#b01313',
          },
        },
        '.card-block': {
          borderRadius: theme('borderRadius.xl'),
          backgroundColor: theme('colors.gray.800'),
          color: primaryLightColor,
          boxShadow: `0 2px 6px 0px ${theme('colors.slate.500')}`,
        },
      });
    }),
  ],
};
