/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",          // ルートのHTML
    "./src/**/*.{html,js}"   // もしJS/HTMLをsrc配下に置くなら
  ],
  theme: { extend: {} },
  plugins: [],
};
