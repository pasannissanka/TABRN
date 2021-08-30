const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    // Specify the paths to all of the template files in your project
    content: ['src/**/*.vue'],

    // Whitelist selectors by using regular expression
    whitelistPatterns: [
      /-(leave|enter|appear)(|-(to|from|active))$/, // transitions
      /data-v-.*/, // scoped css
    ],
  },
  theme: {
    colors: {
      primary: colors.blue,
      secondary: colors.yellow,
      warn: colors.red,
      blue: colors.blue,
      gray: colors.gray,
      green: colors.green,
      white: colors.white,
      black: colors.black,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
