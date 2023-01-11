/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Noto Sans Thai', 'sans-serif'],
      },
      boxShadow: {
        'btn_act_shadow': '0 8px 16px 0 rgb(53 81 128 / 20%)',
      },
      backgroundSize: {
        '100%': '100%',
      },
    },
  },
  plugins: [],
}
