const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', ...defaultTheme.fontFamily.sans],
        nanumSquare: ['"NanumSquare"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}