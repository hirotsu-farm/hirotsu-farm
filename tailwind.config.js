/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./**/*.html",
    "./js/**/*.js",        // ← ここが超大事：JS内で組み立てたclassも拾う
  ],
  theme: { extend: {} },
  safelist: [
    // JSで classList.add している動的クラス（カレンダー選択枠など）
    'ring', 'ring-offset-2', 'line-through',
    'opacity-50', 'pointer-events-none', 'cursor-pointer',

    // CLASSMAPで動的に当てる色クラス（そのまま列挙が安全）
    'bg-green-600','text-white',
    'bg-green-200','text-green-900',
    'bg-amber-200','text-amber-900',
    'bg-red-300','text-red-900',
    'bg-gray-200','text-gray-500',
    'bg-white','text-gray-900',
  ],
};
