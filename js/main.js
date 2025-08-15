// モバイルメニュー
document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('mobileNav').classList.toggle('hidden');
});

// ニュース
/*
fetch('news.json').then(r => r.ok ? r.json() : []).then(items => {
    const wrap = document.getElementById('newsList');
    const fb = document.getElementById('newsFallback');
    if (!items || !items.length) { fb.classList.remove('hidden'); return; }
    items.slice(0,4).forEach(n => {
    const el = document.createElement('article');
    el.className = "bg-white rounded-xl shadow p-5";
    el.innerHTML = `
        <div class="text-sm text-gray-500">${n.date||''}</div>
        <h3 class="mt-1 font-semibold">${n.title||'お知らせ'}</h3>
        <p class="mt-1 text-gray-700">${n.body||''}</p>`;
    wrap.appendChild(el);
    });
}).catch(()=>{});
*/

(function(){
  // ヘッダー高さのCSS変数反映
  const hdr = document.querySelector('header.sticky');
  const setHeaderH = () => {
    if (hdr) document.documentElement.style.setProperty('--header-h', hdr.offsetHeight + 'px');
  };
  window.addEventListener('load', setHeaderH);
  window.addEventListener('resize', setHeaderH);
})();
