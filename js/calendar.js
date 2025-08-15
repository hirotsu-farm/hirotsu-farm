// ====== 空き状況（時間帯対応）: inSeason撤廃／未登録は '-'／過去不可 ★ ======
const AVAIL_URL = 'availability.json';
const TIME_SLOTS = ["10:00","13:00"];
const PRIORITY = {"◎":4,"○":3,"△":2,"×":1,"-":0};
const CLASSMAP = {
    '◎':'bg-green-600 text-white',
    '○':'bg-green-200 text-green-900',
    '△':'bg-amber-200 text-amber-900',
    '×':'bg-red-300 text-red-900 line-through',
    '-':'bg-gray-200 text-gray-500'
};

(function(){
    const cal = document.getElementById('calendar');
    const prev = document.getElementById('calPrev');
    const next = document.getElementById('calNext');
    const dateInput = document.querySelector('input[name="date"]');
    const timeSelect = document.getElementById('timeSelect');

    let y, m, avail = {};

    function dayMark(dateKey){
    const todayKey = new Date().toISOString().split('T')[0];
    if (dateKey < todayKey) return '-'; // 過去日は休園
    const v = avail[dateKey];
    if (v === '-' || !v) return '-';   // 未登録 or 明示的休園
    let best = 0;
    for (const t of Object.keys(v)) best = Math.max(best, PRIORITY[v[t]] ?? 0);
    const mark = Object.entries(PRIORITY).find(([k,val])=>val===best)?.[0] || '-';
    return mark;
    }

    function renderMonth(){
    const first = new Date(y, m, 1);
    const last  = new Date(y, m+1, 0);
    const startDow = (first.getDay()+6)%7; // 月曜起点
    const days = last.getDate();
    const title = `${y}年 ${m+1}月`;

    let html = `
        <div class="px-3 py-2 border-b bg-gray-50 text-sm">${title}</div>
        <div class="grid grid-cols-7 text-xs">
        ${['月','火','水','木','金','土','日'].map(d=>`<div class="p-2 text-center bg-gray-50">${d}</div>`).join('')}
        ${'<div class="p-2"></div>'.repeat(startDow)}
    `;
    for(let d=1; d<=days; d++){
        const key = `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const mark = dayMark(key);
        const disabled = (mark==='×' || mark==='-');
        const classes = `p-2 h-16 border flex flex-col items-center justify-center cursor-pointer ${CLASSMAP[mark]||'bg-white text-gray-900'} ${disabled?'opacity-50 pointer-events-none':''}`;
        html += `<button type="button" data-date="${key}" class="${classes}">
                <div class="text-sm font-medium">${d}</div>
                <div class="text-[10px] tracking-wider">${mark}</div>
                </button>`;
    }
    html += `</div>`;
    cal.innerHTML = html;

    // クリックで日付セット＆時間帯を更新
    cal.querySelectorAll('button[data-date]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        const key = btn.dataset.date;
        selectDate(key);

        // 既存の選択状態を全て解除（属性＋枠クラス）
        cal.querySelectorAll('button[aria-selected="true"], button.ring').forEach(b=>{
        b.removeAttribute('aria-selected');
        b.classList.remove('ring','ring-offset-2');   // ← これがポイント
        });

        // 今回クリック分のみ選択状態に
        btn.setAttribute('aria-selected','true');
        btn.classList.add('ring','ring-offset-2');
    });
    });
    }

    function selectDate(key){
    dateInput.value = key;
    timeSelect.innerHTML = '';

    const today = new Date();
    const todayKey = today.toISOString().split('T')[0];
    const isPastDate = key < todayKey;
    const v = avail[key];

    if (isPastDate || v === '-' || !v) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = '休園日';
        opt.disabled = true;
        timeSelect.appendChild(opt);
        timeSelect.disabled = true;
        return;
    } else {
        timeSelect.disabled = false;
    }

    const slotInfo = (typeof v === 'object') ? v : null;

    const firstOpt = document.createElement('option');
    firstOpt.value = '';
    firstOpt.textContent = '時間を選択してください';
    firstOpt.disabled = true;
    firstOpt.selected = true;
    timeSelect.appendChild(firstOpt);

    TIME_SLOTS.forEach(t => {
        let status = slotInfo ? (slotInfo[t] || '-') : '-';
        if (key === todayKey) {
        const [hh, mm] = t.split(':').map(Number);
        const nowMinutes = today.getHours() * 60 + today.getMinutes();
        const slotMinutes = hh * 60 + mm;
        if (slotMinutes <= nowMinutes) status = '-'; // 当日・過去時刻は不可
        }
        const opt = document.createElement('option');
        opt.value = (status === '×' || status === '-') ? '' : t;
        opt.textContent = `${t}　${status}`;
        opt.disabled = (status === '×' || status === '-');
        timeSelect.appendChild(opt);
    });
    }

    async function boot(){
    const now = new Date();
    y = now.getFullYear(); m = now.getMonth();
    try{
        const res = await fetch(AVAIL_URL, {cache:'no-store'});
        avail = res.ok ? await res.json() : {};
    }catch(e){ avail = {}; }
    renderMonth();
    prev.onclick = ()=>{ m--; if(m<0){m=11;y--} renderMonth(); };
    next.onclick = ()=>{ m++; if(m>11){m=0;y++} renderMonth(); };
    }
    boot();
})();

//ステッパー
(function(){
  const NAMES = { adult:'adults', elem:'elementary', pre:'preschool' };
  const cap = 20;

  function getInputByName(name) {
    return document.querySelector(`input[name="${name}"]`);
  }

  function totalPeople() {
    const a = +getInputByName('adults')?.value || 0;
    const e = +getInputByName('elementary')?.value || 0;
    const p = +getInputByName('preschool')?.value || 0;
    return a + e + p;
  }

  function refreshTotal() {
    const el = document.getElementById('totalPeople');
    if (el) el.textContent = totalPeople();
  }

  function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

  function handleStep(btn){
    const k = btn.dataset.step; if (!k) return;
    const [key, delta] = k.split(':');
    const inputName = NAMES[key];
    const input = getInputByName(inputName);
    if (!input) return;

    const val = +input.value || 0;
    const next = clamp(val + (delta === '+1' ? 1 : -1), +input.min || 0, +input.max || 20);

    // 他フィールドの合計
    const others = totalPeople() - val;
    if (next + others > cap) return;

    input.value = next;
    refreshTotal();
  }

  // 1) DOM読み込み後に初期化
  function init(){
    refreshTotal();
    // 2) イベント委任（ボタンが後で描画されても効く）
    document.addEventListener('click', (e)=>{
      const t = e.target;
      if (t && t.matches('[data-step]')) {
        handleStep(t);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


// プレビュー & .ics
const f = document.getElementById('reserveForm');
const dlg = document.getElementById('confirmDlg');
const err = document.getElementById('formError');

document.getElementById('previewBtn').addEventListener('click', () => {
    err.classList.add('hidden');
    if (!f.reportValidity()) { err.classList.remove('hidden'); return; }
    const fd = new FormData(f);
    const val = n => (fd.get(n) || '').toString().trim();
    if (val('website')) return; // honey pot

    const adults = parseInt(val('adults') || '0', 10);
    const kids   = parseInt(val('elementary') || '0', 10) + parseInt(val('preschool') || '0', 10);
    const people = `${adults}名${kids ? ` + 子ども${kids}名` : ''}`;

    document.getElementById('c_name').textContent  = val('name');
    document.getElementById('c_kana').textContent  = val('kana');
    document.getElementById('c_tel').textContent   = val('tel');
    document.getElementById('c_email').textContent = val('email');
    document.getElementById('c_date').textContent  = val('date');
    document.getElementById('c_time').textContent  = val('time');
    document.getElementById('c_people').textContent= people;
    document.getElementById('c_note').textContent  = val('note');

    const start = new Date(`${val('date')}T${val('time') || '10:00'}:00+09:00`);
    const end   = new Date(start.getTime() + 60*60*1000);
    const dt = d => d.toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z';
    const ics =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Hirotsu Farm//JP
BEGIN:VEVENT
UID:${Date.now()}@hirotsufarm
DTSTAMP:${dt(new Date())}
DTSTART:${dt(start)}
DTEND:${dt(end)}
SUMMARY:広津農園 予約
DESCRIPTION:名前:${val('name')} / 人数:${people} / 電話:${val('tel')}
LOCATION:広津農園（長崎県西海市）
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([ics], {type: 'text/calendar'});
    const url  = URL.createObjectURL(blob);
    const a = document.getElementById('icsLink');
    a.href = url; a.classList.remove('hidden');

    dlg.showModal();
});

document.getElementById('closeBtn').addEventListener('click', () => dlg.close());

document.getElementById('sendBtn').addEventListener('click', async () => {
    dlg.close();
    alert('送信しました（デモ）。確認メールはダミーです。カレンダー追加リンクをご利用ください。');
    f.reset();
    document.getElementById('icsLink').classList.add('hidden');
});

