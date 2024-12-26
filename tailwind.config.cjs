const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screen: {
        '3xl': '1921px',
        '2xl': '1440px',
        'xl': '1280px'
      },
      boxShadow: {
        'custom-xl': '0 4px 60px rgba(153, 95, 224, 0.5)',
      },
      fontFamily: {
        pretendard: ['Pretendard', ...defaultTheme.fontFamily.sans],
        nanumSquareRoundEB: ['"NanumSquareRoundEB"', ...defaultTheme.fontFamily.sans],
        nanumSquareRoundB: ['"NanumSquareRoundB"', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        floating: 'floating 3s ease-in-out infinite', // 애니메이션 이름과 지속시간 정의
        'slow-floating-rotating': 'floating-rotating 20s cubic-bezier(0.25, 1, 0.5, 1) infinite',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(-10px)' }, // 시작과 끝에서 위로 이동
          '50%': { transform: 'translateY(10px)' }, // 중간에 아래로 이동
        },
        'floating-rotating': {
          '0%, 100%': { transform: 'translateY(-10px) rotate(0deg)' }, // 위로 이동 + 회전 없음
          '25%': { transform: 'translateY(0px) rotate(0deg)' },       // 중간에서 위치 안정
          '50%': { transform: 'translateY(10px) rotate(180deg)' },    // 아래로 이동 + 반 바퀴 회전
          '75%': { transform: 'translateY(0px) rotate(360deg)' },     // 중간에서 위치 안정 + 1바퀴 회전
        },
      },
    },
  },
  plugins: [],
}