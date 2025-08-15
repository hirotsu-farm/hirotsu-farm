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

// === 季節自動切替（1–8月:ブルーベリー／9–12月:みかん） ★ ===
(function(){
    const m = new Date().getMonth()+1;
    const isMikan = (m >= 9 && m <= 12);

    // ヒーロー文言
    const heroTitle = document.getElementById('heroTitle');
    const heroLead  = document.getElementById('heroLead');
    const heroImg   = document.getElementById('heroImage');
    const reserveTitle = document.getElementById('reserveTitle');
    const reserveLead  = document.getElementById('reserveLead');

    if (isMikan) {
    heroTitle.innerHTML = '香りも甘さも樹上完熟。<br>みかん狩り';
    heroLead.innerHTML  = '9–12月はみかんが主役。<br>西海の温暖な気候で育った完熟みかんをどうぞ。';
    heroImg.alt = 'みかん狩り';
    // reserve見出しも季節に合わせて
    reserveTitle.textContent = 'みかん狩り ご予約フォーム';
    reserveLead.textContent  = 'みかん狩りのご予約はこちらから。';
    // 体験カードの並び替え（みかんを先頭へ）
    const grid = document.getElementById('expGrid');
    const mikan = document.getElementById('cardMikan');
    grid.prepend(mikan);
    } else {
    heroTitle.innerHTML = '完熟を“摘みたて”で。<br>ブルーベリー狩り';
    heroLead.innerHTML  = '1–8月はブルーベリーをメインに。<br>甘くて粒の大きな実をその場で摘み取り。';
    heroImg.alt = 'ブルーベリー狩り';
    reserveTitle.textContent = 'ブルーベリー狩り ご予約フォーム';
    reserveLead.textContent  = 'ブルーベリー狩りのご予約はこちらから。';
    // ブルーベリーを先頭へ
    const grid = document.getElementById('expGrid');
    const berry = document.getElementById('cardBlueberry');
    grid.prepend(berry);
    }
})();