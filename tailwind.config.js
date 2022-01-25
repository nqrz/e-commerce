const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Cabin', 'Arial', 'sans-serif']
    },
    container: {
      center: true
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      cyan: colors.cyan,
      stone: colors.stone,
      red: colors.red
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
  ],
}
