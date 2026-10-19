const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
const img = k => `img/${k}.jpg`;
const lc = s => s[0].toLowerCase() + s.slice(1);
const roman = n => ['','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII'][n] || n;
const century = d => Math.floor((d.s - 1) / 100) + 1;
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.random() * a.length | 0];
const plural = (n, f) => f[(n % 10 === 1 && n % 100 !== 11) ? 0 : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? 1 : 2];
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

// таблетка Дозы на ножках, опирается на меч; светлые части берут currentColor
const ICON = `<svg viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke-linecap="round">
  <path d="M28 51 27 59.5M36 51 37 59.5M23.5 59.5H28M36 59.5H40.5" stroke="currentColor" stroke-width="2.2"/>
  <path d="M43 30 50 21.5" stroke="currentColor" stroke-width="2.2"/>
  <path d="M50.6 24h2.8v32.5L52 60l-1.4-3.5z" fill="currentColor"/>
  <path d="M47 22.6H57" stroke="#DDB458" stroke-width="2.6"/>
  <path d="M52 15.5v6" stroke="#DDB458" stroke-width="2.4"/>
  <circle cx="52" cy="14" r="1.9" fill="#DDB458"/>
  <path d="M21 31V19a11 11 0 0 1 22 0v12z" fill="#DDB458"/>
  <path d="M21 33v11a11 11 0 0 0 22 0V33z" fill="currentColor"/>
</svg>`;
const PETER_SVG = `<svg viewBox="0 0 140 180" aria-hidden="true">
  <ellipse cx="70" cy="173" rx="32" ry="5" fill="#000" opacity=".16"/>
  <rect x="50" y="146" width="17" height="24" rx="6" fill="#1E1A17"/><rect x="73" y="146" width="17" height="24" rx="6" fill="#1E1A17"/>
  <rect x="47" y="143" width="23" height="8" rx="4" fill="#2C2622"/><rect x="70" y="143" width="23" height="8" rx="4" fill="#2C2622"/>
  <path d="M42 120Q44 108 58 106H82Q96 108 98 120L102 150Q70 158 38 150Z" fill="#2F5D3A"/>
  <path d="M62 107H78L80 150Q70 153 60 150Z" fill="#B3392C"/>
  <path d="M62 107 60 150M78 107 80 150" stroke="#234A2D" stroke-width="2"/>
  <circle cx="70" cy="121" r="2.2" fill="#E9B949"/><circle cx="70" cy="131" r="2.2" fill="#E9B949"/><circle cx="70" cy="141" r="2.2" fill="#E9B949"/>
  <path d="M63 104Q70 114 77 104L74 117Q70 120 66 117Z" fill="#F4F1EA"/>
  <path d="M44 114Q34 122 34 137" stroke="#2F5D3A" stroke-width="12" stroke-linecap="round" fill="none"/>
  <rect x="28" y="133" width="12" height="7" rx="3" fill="#B3392C"/><circle cx="34" cy="145" r="6" fill="#F3C9A8"/>
  <path d="M110 120 104 173" stroke="#6B4423" stroke-width="4.5" stroke-linecap="round"/><circle cx="110.3" cy="118" r="4.2" fill="#D9A93B"/>
  <path d="M96 114Q106 120 107 133" stroke="#2F5D3A" stroke-width="12" stroke-linecap="round" fill="none"/>
  <rect x="101" y="129" width="12" height="7" rx="3" fill="#B3392C"/><circle cx="107" cy="141" r="6" fill="#F3C9A8"/>
  <g fill="#2F1D12"><circle cx="26" cy="68" r="14"/><circle cx="22" cy="86" r="13"/><circle cx="26" cy="102" r="12"/><circle cx="35" cy="113" r="9"/><circle cx="114" cy="68" r="14"/><circle cx="118" cy="86" r="13"/><circle cx="114" cy="102" r="12"/><circle cx="105" cy="113" r="9"/></g>
  <ellipse cx="70" cy="78" rx="44" ry="40" fill="#F3C9A8"/>
  <path d="M27 72Q30 54 46 50Q38 60 37 76Z" fill="#2F1D12"/><path d="M113 72Q110 54 94 50Q102 60 103 76Z" fill="#2F1D12"/>
  <path d="M4 50C10 38 22 29 34 27C42 13 98 13 106 27C118 29 130 38 136 50C116 48 92 50 70 60C48 50 24 48 4 50Z" fill="#1A1716"/>
  <path d="M22 44C38 38 56 41 70 54C84 41 102 38 118 44C104 34 86 31 70 35C54 31 36 34 22 44Z" fill="#2E2925"/>
  <path d="M4 50C24 48 48 50 70 60C92 50 116 48 136 50" stroke="#D4A43C" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M34 27C42 13 98 13 106 27" stroke="#D4A43C" stroke-width="2" fill="none" stroke-linecap="round"/>
  <circle cx="70" cy="45" r="3.4" fill="#D4A43C"/>
  <path class="br1" d="M44 67Q51 63 58 65" stroke="#2F1D12" stroke-width="3.2" stroke-linecap="round" fill="none"/>
  <path class="br2" d="M82 65Q89 63 96 67" stroke="#2F1D12" stroke-width="3.2" stroke-linecap="round" fill="none"/>
  <g class="e-n"><ellipse cx="51" cy="81" rx="6" ry="7.5" fill="#141414"/><ellipse cx="89" cy="81" rx="6" ry="7.5" fill="#141414"/><circle cx="53" cy="78" r="2" fill="#FFFFFF"/><circle cx="91" cy="78" r="2" fill="#FFFFFF"/></g>
  <g class="e-h"><path d="M44 83Q51 74 58 83M82 83Q89 74 96 83" stroke="#141414" stroke-width="3.6" fill="none" stroke-linecap="round"/></g>
  <ellipse cx="41" cy="96" rx="7" ry="4" fill="#EE8F7F" opacity=".5"/><ellipse cx="99" cy="96" rx="7" ry="4" fill="#EE8F7F" opacity=".5"/>
  <path d="M70 96Q63 93 57 99M70 96Q77 93 83 99" stroke="#2F1D12" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  <path class="m-n" d="M64 104Q70 108 76 104" stroke="#7A3B2E" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <path class="m-h" d="M62 102Q70 113 78 102Z" fill="#7A3B2E"/>
  <path class="m-s" d="M64 107Q70 102 76 107" stroke="#7A3B2E" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <ellipse class="m-o" cx="70" cy="106" rx="3.5" ry="4.5" fill="#7A3B2E"/>
</svg>`;
const FLAME = `<svg class="flame" viewBox="0 0 40 52" aria-hidden="true">
  <path class="fo" fill="url(#gfo)" d="M20 1C23 11 34 17 34 31C34 43 27 51 20 51C13 51 6 43 6 31C6 23 11 19 13 12C15 18 17 20 19 21C19 13 17 8 20 1Z"/>
  <path class="fm" fill="url(#gfm)" d="M20 16C22 23 28 27 28 35C28 43 24 47 20 47C16 47 12 43 12 36C12 31 15 28 16 24C17 28 18 29 19.5 30C19.5 25 19 21 20 16Z"/>
  <path class="fi" fill="url(#gfi)" d="M20 30C21 34 24 36 24 40C24 44 22 46 20 46C18 46 16 44 16 40C16 37 18 35 20 30Z"/>
</svg>`;
$('#logo').insertAdjacentHTML('afterbegin', ICON);
$('#peterfig').innerHTML = PETER_SVG;

/* ── состояние: в браузере всегда, в Firebase — после входа (sync.js) ── */
const KEY = 'dozaIstoria.v1';
const freshState = () => ({xp: 0, best: 0, right: 0, ach: [], k: {}, own: {}, topicTest: {}, taps: 0, wrongRow: 0,
  daily: {day: null, cur: null, step: 'new', checks: null, ci: 0, lastOk: null, row: 0, t: 0},
  c: {century: 0, pairs: 0, portraits: 0, orderRow: 0, fastRow: 0, ege: 0, terms: []},
  set: {theme: null, font: 'a', peter: true, t: 0}, epoch: 0, t: 0});
let S;
try { S = Object.assign(freshState(), JSON.parse(localStorage.getItem(KEY))); } catch { S = freshState(); }
S.c = Object.assign(freshState().c, S.c);
let pushT;
const save = () => {
  S.t = Date.now();
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {}
  clearTimeout(pushT); pushT = setTimeout(() => window.Sync?.push(S), 1500);
};
// слияние двух копий прогресса (телефон и ноутбук): ничего не теряется, берём лучшее и самое свежее
function mergeState(a, b) {
  if ((a.epoch || 0) !== (b.epoch || 0)) return (a.epoch || 0) > (b.epoch || 0) ? a : b; // после сброса старый прогресс не возвращается
  const m = freshState(), newer = (x, y) => ((x?.t || 0) >= (y?.t || 0) ? x : y);
  m.epoch = a.epoch || 0;
  for (const k of ['xp', 'right', 'best', 'taps']) m[k] = Math.max(a[k] || 0, b[k] || 0);
  m.ach = [...new Set([...(a.ach || []), ...(b.ach || [])])];
  for (const f of ['k', 'own']) for (const id of new Set([...Object.keys(a[f] || {}), ...Object.keys(b[f] || {})])) m[f][id] = newer(a[f]?.[id], b[f]?.[id]);
  for (const id of new Set([...Object.keys(a.topicTest || {}), ...Object.keys(b.topicTest || {})])) m.topicTest[id] = Math.max(a.topicTest?.[id] || 0, b.topicTest?.[id] || 0);
  m.daily = newer(a.daily, b.daily);
  m.set = newer(a.set, b.set);
  for (const k of Object.keys(m.c)) m.c[k] = k === 'terms' ? [...new Set([...(a.c?.terms || []), ...(b.c?.terms || [])])] : Math.max(a.c?.[k] || 0, b.c?.[k] || 0);
  m.wrongRow = a.wrongRow || 0;
  m.t = Math.max(a.t || 0, b.t || 0);
  return m;
}
window.onRemoteState = remote => {
  const merged = mergeState(S, remote);
  const changed = JSON.stringify(merged) !== JSON.stringify(S);
  if (changed) { S = merged; try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} applySettings(); if (!Q) render(); }
  return merged;
};
window.onAuthChange = () => { if ($('.sheet')) openSettings(); };

const lvl = id => S.k[id]?.l ?? 0;
const isWeak = id => (S.k[id]?.w ?? 0) > 0 && lvl(id) < 3;
const openTopics = () => TOPICS.filter(t => t.open).map(t => t.id);
const pool = () => DATES.filter(d => openTopics().includes(d.tp));
const rankOf = xp => { let r = RANKS[0], nx = null; for (let i = 0; i < RANKS.length; i++) if (xp >= RANKS[i][1]) { r = RANKS[i]; nx = RANKS[i + 1] || null; } return {r, nx}; };
function mark(d, ok) {
  const k = S.k[d.id] = {...(S.k[d.id] || {l: 0, w: 0})};
  if (ok) { k.l = Math.min(5, k.l + 1); if (k.l >= 3) k.w = 0; } else { k.l = Math.max(0, k.l - 2); k.w = (k.w || 0) + 1; }
  k.t = Date.now();
}
function weighted(list) { // слабые и плохо выученные даты выпадают чаще
  const ws = list.map(d => (6 - lvl(d.id)) * (isWeak(d.id) ? 2 : 1));
  let r = Math.random() * ws.reduce((a, b) => a + b, 0);
  for (let i = 0; i < list.length; i++) if ((r -= ws[i]) <= 0) return list[i];
  return list[list.length - 1];
}
function award(id) {
  if (S.ach.includes(id)) return;
  S.ach.push(id); save();
  const a = ACHIEVEMENTS.find(x => x.id === id);
  say(draw(PETER.achievement) + ` «${a.n}».`, 'h', 5000);
}
const knowRuler = r => { const ev = (r.ev || []).filter(d => openTopics().includes(d.tp)); return ev.length ? Math.round(ev.reduce((a, d) => a + lvl(d.id), 0) / ev.length / 5 * 100) : 0; };
function checkAchievements() {
  const p = pool(), learned = p.filter(d => lvl(d.id) >= 3).length;
  if (learned >= 25) award('dates25'); if (learned >= 50) award('dates50'); if (learned >= 100) award('dates100');
  if (learned >= 10 && !p.some(d => isWeak(d.id))) award('noweak');
  if (openTopics().every(t => (S.topicTest[t] || 0) >= 80)) award('alltopics');
  const rs = Object.values(RULERS).filter(r => rulerOpen(r.id) && r.ev?.length);
  if (rs.some(r => knowRuler(r) === 100)) award('ruler100');
  const toMono = ['rurik', 'oleg', 'igor', 'olga', 'svyatoslav', 'vladimir', 'yaroslav', 'izyaslav', 'vsevolod_ya', 'svyatopolk2', 'monomakh'];
  if (toMono.every(k => knowRuler(RULERS[k]) >= 60)) award('rurik');
  if (openTopics().includes(5) && DATES.filter(d => d.tp === 5).every(d => lvl(d.id) >= 3)) award('horde');
  if (S.c.century >= 30) award('century'); if (S.c.pairs >= 100) award('pairs'); if (S.c.portraits >= 20) award('portraits');
  if (S.c.ege >= 20) award('ege20');
  if (TERMS.filter(t => openTopics().includes(t.tp)).every(t => S.c.terms.includes(t.w))) award('terms');
}

/* ── настройки ── */
const FONTS = [['a', 'Lora', 'Manrope'], ['b', 'Playfair Display', 'Nunito'], ['c', 'Cormorant Garamond', 'Raleway']];
const FONT_URL = {b: 'family=Playfair+Display:ital,wght@0,400..800;1,400..600&family=Nunito:wght@400;500;600;700;800', c: 'family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Raleway:wght@400;500;600;700;800'};
function loadFont(k) {
  if (!FONT_URL[k] || document.getElementById('font-' + k)) return;
  document.head.insertAdjacentHTML('beforeend', `<link id="font-${k}" rel="stylesheet" href="https://fonts.googleapis.com/css2?${FONT_URL[k]}&display=swap">`);
}
function applySettings() {
  const r = document.documentElement;
  S.set.theme ? (r.dataset.theme = S.set.theme) : delete r.dataset.theme;
  loadFont(S.set.font);
  S.set.font === 'a' ? delete r.dataset.font : (r.dataset.font = S.set.font);
  $('#peter').hidden = !S.set.peter;
}
applySettings();
function openSettings() {
  FONTS.forEach(([k]) => loadFont(k));
  const sync = window.Sync, user = sync?.user;
  const acc = !sync?.ready ? `<p class="note">Синхронизация между устройствами появится после настройки Firebase. Пока прогресс хранится в этом браузере.</p>`
    : user ? `<p>${esc(user.email || user.name || 'Аккаунт Google')}</p><p class="note">Прогресс общий для всех устройств, где ты вошёл</p><button class="btn ghost" id="signout" style="margin-top:12px">Выйти</button>`
    : `<p class="note">Войди, чтобы прогресс был одинаковым на телефоне, планшете и ноутбуке</p><button class="btn ink" id="signin" style="margin-top:12px">Войти через Google</button>`;
  $('#layer').innerHTML = `<div class="scrim" id="scrim"></div><aside class="sheet" role="dialog" aria-label="Настройки"><button class="x" id="sx" aria-label="Закрыть">✕</button>
    <h2>Настройки</h2>
    <section><span class="label">Аккаунт</span>${acc}</section>
    <section><span class="label">Тема</span><div class="seg">${[[null, 'Как в системе'], ['light', 'Светлая'], ['dark', 'Тёмная']].map(([k, n]) => `<button data-th="${k}" class="${S.set.theme === k ? 'on' : ''}">${n}</button>`).join('')}</div></section>
    <section><span class="label">Шрифт</span><div class="fonts">${FONTS.map(([k, s, b]) => `<button class="fontopt ${S.set.font === k ? 'on' : ''}" data-font="${k}"><span class="s1" style="font-family:'${s}',serif;font-weight:600">Ярослав Мудрый, 1019</span><span class="s2" style="font-family:'${b}',sans-serif">Первый письменный закон, Русская правда</span></button>`).join('')}</div></section>
    <section><label class="switch" for="petersw">Пётр с комментариями<input type="checkbox" id="petersw" ${S.set.peter ? 'checked' : ''}></label></section>
    <section><button class="btn ghost" id="reset">Сбросить весь прогресс</button></section>
    <section class="note">Задания: «Решу ЕГЭ» (hist-ege.sdamgia.ru). Картины и фото: Wikimedia Commons, авторы указаны в подписях.</section>
  </aside>`;
  const close = () => $('#layer').innerHTML = '';
  $('#scrim').onclick = $('#sx').onclick = close;
  $('#signin')?.addEventListener('click', () => sync.signIn());
  $('#signout')?.addEventListener('click', () => sync.signOut());
  $('#layer').querySelectorAll('[data-th]').forEach(b => b.onclick = () => { S.set.theme = b.dataset.th === 'null' ? null : b.dataset.th; S.set.t = Date.now(); save(); applySettings(); openSettings(); });
  $('#layer').querySelectorAll('[data-font]').forEach(b => b.onclick = () => { S.set.font = b.dataset.font; S.set.t = Date.now(); save(); applySettings(); openSettings(); });
  $('#petersw').onchange = e => { S.set.peter = e.target.checked; S.set.t = Date.now(); save(); applySettings(); if (S.set.peter) say('Я вернулся. Скучал?', 'h'); };
  $('#reset').onclick = e => {
    if (!e.target.dataset.sure) { e.target.dataset.sure = 1; e.target.textContent = 'Точно сбросить? Нажми ещё раз'; return; }
    const set = S.set; S = freshState(); S.set = set; S.epoch = Date.now(); rollDay(); save(); window.Sync?.push(S); close(); render();
  };
}
$('#setbtn').onclick = openSettings;

/* ── Пётр ── */
let sayT, lastLine = '';
const bags = new Map(); // реплики идут по кругу без повторов, пока не кончится вся пачка
function draw(list) {
  let b = bags.get(list);
  if (!b || !b.length) { b = shuffle(list); if (b.length > 1 && b[b.length - 1] === lastLine) [b[0], b[b.length - 1]] = [b[b.length - 1], b[0]]; bags.set(list, b); }
  return b.pop();
}
function say(text, mood = 'n', ms) {
  if (!S.set.peter || !text) return;
  if (Array.isArray(text)) text = draw(text);
  lastLine = text;
  const p = $('#peter'), b = $('#bubble'), f = $('#peterfig');
  p.dataset.m = mood;
  b.textContent = text; b.classList.add('on');
  f.classList.remove('jump'); void f.offsetWidth; f.classList.add('jump');
  clearTimeout(sayT);
  sayT = setTimeout(() => { b.classList.remove('on'); p.dataset.m = 'n'; }, ms || Math.max(3200, text.length * 60));
}
const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? '');
$('#peterfig').onclick = () => { S.taps = (S.taps || 0) + 1; save(); if (S.taps >= 20) award('peter'); say(PETER.tap, pick(['n', 'h', 'o'])); };
$('#bubble').onclick = () => $('#bubble').classList.remove('on');
function greet() {
  const h = new Date().getHours();
  if (h >= 0 && h < 5) award('night');
  say(h < 5 || h >= 23 ? PETER.night : h < 11 ? PETER.morning : h < 18 ? PETER.day : PETER.evening, 'h');
}

/* ── роутер ── */
let route = 'home', topicTab = 'notes';
function go() {
  const h = location.hash.slice(1) || 'home';
  route = h; selRuler = null; Q = null; $('#layer').innerHTML = ''; document.body.classList.remove('quizon');
  const base = h.startsWith('topic') ? 'home' : h;
  document.querySelectorAll('[data-r]').forEach(a => a.classList.toggle('on', a.dataset.r === base));
  render();
  window.scrollTo(0, 0);
  if (Math.random() < .6) {
    if (h === 'dates') say(PETER.dates);
    if (h === 'rulers') say(PETER.tree);
    if (h === 'tests') say(PETER.tests);
  }
  if (h.startsWith('topic-')) say(PETER.topic[+h.split('-')[1]], 'n');
}
window.addEventListener('hashchange', () => { topicTab = 'notes'; go(); });
function render() {
  const {r} = rankOf(S.xp);
  $('#rankpill').innerHTML = `<span>${r[0]}</span><span class="num">${S.xp} XP</span>`;
  const app = $('#app');
  if (route === 'dates') app.innerHTML = viewDates();
  else if (route === 'rulers') app.innerHTML = viewRulers();
  else if (route === 'tests') app.innerHTML = viewTests();
  else if (route.startsWith('topic-')) app.innerHTML = viewTopic(+route.split('-')[1]);
  else app.innerHTML = viewHome();
  bind();
}

/* ── главная ── */
function viewHome() {
  const learned = pool().filter(d => lvl(d.id) >= 3).length;
  return `<div class="wrap">
    <div class="homehead">
      <div><p class="kicker">С Рюрика до Грозного</p><h1>Темы</h1></div>
      <div class="stat"><div><b class="num">${openTopics().length} из ${TOPICS.length}</b>тем открыто</div><div><b class="num">${learned}</b>${plural(learned, ['дата выучена', 'даты выучены', 'дат выучено'])}</div><div><b class="num">${Object.keys(RULERS).filter(k => rulerOpen(k)).length}</b>правителей</div></div>
    </div>
    <div class="daily" id="daily">${viewDaily()}</div>
    <div class="tgrid">${TOPICS.filter(t => t.open).map(topicCard).join('')}</div>
    <div class="sechead" style="margin-top:40px"><h2>Скоро</h2></div>
    <div class="tgrid soon">${TOPICS.filter(t => !t.open).map(topicCard).join('')}</div>
  </div>`;
}
function topicCard(t) {
  const pic = t.img ? `<img src="${img(t.img)}" alt="" loading="lazy">` : '';
  if (!t.open) return `<button class="tcard locked" data-locked="1">${pic}<span class="pill">Тема ${t.id}</span><div><span class="era">${t.era}</span><h3>${t.title}</h3><div class="lock"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>Скоро</div></div></button>`;
  const test = S.topicTest[t.id];
  const meta = t.current ? '<span class="done">● Сейчас</span>' : test ? `<span class="${test >= 80 ? 'done' : ''}">${test >= 80 ? '✓ ' : ''}Тест ${test}%</span>` : '';
  const n = DATES.filter(d => d.tp === t.id).length;
  return `<a class="tcard ${t.current ? 'big now' : ''}" href="#topic-${t.id}">${pic}
    <span class="pill">Тема ${t.id}</span>
    <div><span class="era">${t.era}</span><h3>${t.title}</h3><div class="meta">${meta}<span>${n} ${plural(n, ['дата', 'даты', 'дат'])}</span></div></div>
  </a>`;
}

/* ── дата дня: новая дата раз в день по хронологии, назавтра проверка ── */
const daySeq = () => DAY_SEQ.filter(id => openTopics().includes(DATE[id].tp));
function rollDay() { // новый день: если вчера дали дату, сначала проверяем её
  const D = S.daily;
  if (D.day === today()) return;
  D.step = D.cur ? 'check' : 'new'; D.checks = null; D.ci = 0; D.lastOk = null; D.day = today(); D.t = Date.now();
}
rollDay();
function nextDaily() { const seq = daySeq(), i = S.daily.cur ? seq.indexOf(S.daily.cur) : -1; return DATE[seq[i + 1]]; }
function viewDaily() {
  const D = S.daily, cur = DATE[D.cur], next = nextDaily();
  const dots = st => `<div class="steps">${['check', 'old', 'new'].map((s, i) => `<i class="${['check', 'old', 'new', 'done'].indexOf(st) >= i ? 'on' : ''}"></i>`).join('')}</div>`;
  if (D.step === 'check' && cur) return `${dots('check')}<span class="label">Дата дня · вчерашняя</span>
    <h3>${esc(cur.t)}</h3>
    ${/^\d/.test(cur.y) ? `<form class="row" id="dform"><input id="dyear" inputmode="numeric" autocomplete="off" placeholder="Год" aria-label="Год"><button class="btn dark">Проверить</button></form>`
      : `<div class="opts">${(D.copts ??= yearOptions(cur)).map(o => `<button data-c="${esc(o)}">${esc(o)}</button>`).join('')}</div>`}`;
  if (D.step === 'checked' && cur) return `${dots('check')}<span class="label">Дата дня · вчерашняя</span>
      <div class="big num">${cur.y}</div><div class="ev">${esc(cur.t)}</div>
      <p class="verdict">${D.lastOk ? 'Верно' : 'Неверно'}</p>
      ${!D.lastOk && cur.m ? `<div class="mn">${esc(cur.m)}</div>` : ''}
      <div class="row"><button class="btn dark" id="dgo">Дальше</button></div>`;
  if (D.step === 'old' && D.checks?.length) {
    const c = D.checks[D.ci], d = DATE[c.id];
    return `${dots('old')}<span class="label">Повторение · ${D.ci + 1} из ${D.checks.length}</span>
      <h3>${esc(d.t)}</h3>
      <div class="opts">${c.opts.map(o => `<button data-o="${o}" class="${c.ans ? (o === d.y ? 'ok' : 'no') : ''}" ${c.ans ? 'disabled' : ''}>${o}</button>`).join('')}</div>
      ${c.ans ? `<div class="row"><button class="btn dark" id="dold">Дальше</button></div>` : ''}`;
  }
  if (D.step === 'new' || D.step === 'old' || D.step === 'check') {
    if (!next) return `${dots('new')}<span class="label">Дата дня</span><h3>Новые даты появятся со следующей темой</h3><div class="row"><a class="btn dark" href="#dates">Повторить даты</a></div>`;
    return `${dots('new')}<span class="label">Новая дата</span>
      <div class="big num">${next.y}</div><div class="ev">${esc(next.t)}</div>
      ${next.m ? `<div class="mn">${esc(next.m)}</div>` : ''}
      <div class="row"><button class="btn dark" id="dlearn">Запомнил</button><a class="btn ghost" href="#topic-${next.tp}">Тема ${next.tp}</a></div>`;
  }
  return `${dots('done')}<span class="label">Дата дня</span><h3>На сегодня всё</h3>${cur ? `<p class="ev" style="opacity:.7">${cur.y} · ${esc(cur.t)}</p>` : ''}
    <div class="row"><a class="btn dark" href="#dates">Повторить ещё</a></div>`;
}
function bindDaily() {
  const el = $('#daily'); if (!el) return;
  const D = S.daily, cur = DATE[D.cur];
  const rer = () => { D.t = Date.now(); el.innerHTML = viewDaily(); bindDaily(); save(); };
  const checked = ok => {
    D.lastOk = ok; mark(cur, ok); D.step = 'checked'; D.copts = null;
    D.row = ok ? (D.row || 0) + 1 : 0; if (D.row >= 7) award('day7');
    rer();
    say(ok ? PETER.dailyOk : PETER.dailyNo, ok ? 'h' : 's');
    if (ok && new Date().getHours() < 8) award('early');
  };
  $('#dform', el)?.addEventListener('submit', e => {
    e.preventDefault();
    const v = $('#dyear').value.trim(); if (!v) return;
    checked((cur.y.match(/\d{3,4}/g) || []).includes(String(parseInt(v, 10))));
  });
  el.querySelectorAll('[data-c]').forEach(b => b.onclick = () => checked(b.dataset.c === cur.y));
  $('#dgo', el)?.addEventListener('click', () => {
    const seq = daySeq(), given = seq.slice(0, Math.max(0, seq.indexOf(D.cur)));
    D.checks = shuffle(given).slice(0, 2).map(id => ({id, opts: yearOptions(DATE[id]), ans: null})); D.ci = 0;
    D.step = D.checks.length ? 'old' : 'new'; rer();
    if (D.step === 'new') sayNew();
  });
  el.querySelectorAll('.opts button[data-o]').forEach(b => b.onclick = () => {
    const c = D.checks[D.ci]; c.ans = b.dataset.o; const ok = c.ans === DATE[c.id].y; mark(DATE[c.id], ok); rer();
    say(ok ? PETER.ok : PETER.no, ok ? 'h' : 's');
  });
  $('#dold', el)?.addEventListener('click', () => { if (D.ci + 1 < D.checks.length) D.ci++; else { D.step = 'new'; sayNew(); } rer(); });
  $('#dlearn', el)?.addEventListener('click', () => { const n = nextDaily(); if (n) { D.cur = n.id; mark(n, true); } D.step = 'done'; rer(); say(PETER.dailyDone, 'h'); });
}
function sayNew() { const n = nextDaily(); if (n && /^\d/.test(n.y)) say(fill(draw(PETER.dailyNew), {old: parseInt(n.y, 10) + 5508}), 'o', 7000); }
function yearOptions(d) { // ловушки: соседние даты и ±1–2 года
  if (!/^\d+$/.test(d.y)) return shuffle([d.y, ...shuffle(DATES.filter(x => x.y !== d.y && Math.abs(x.s - d.s) < 300).map(x => x.y)).slice(0, 3)]);
  const n = parseInt(d.y, 10);
  const near = DATES.filter(x => x.y !== d.y && /^\d+$/.test(x.y) && Math.abs(x.s - d.s) < 60).map(x => x.y);
  const set = new Set([d.y]);
  for (const o of shuffle([...shuffle(near).slice(0, 2), ...[n - 1, n + 1, n + 2, n - 2].map(String)])) { if (set.size >= 4) break; set.add(o); }
  return [...set].sort((a, b) => parseInt(a) - parseInt(b));
}

/* ── тема ── */
const egeFor = tp => typeof EGE === 'undefined' ? [] : EGE.filter(t => t.tp === tp);
function viewTopic(id) {
  const t = TOPICS.find(x => x.id === id);
  if (!t || !t.open) return `<div class="wrap phead"><h1>Тема закрыта</h1></div>`;
  const c = TOPIC_CONTENT[id];
  const dates = DATES.filter(d => d.tp === id);
  const rul = Object.values(RULERS).filter(r => r.tp === id);
  const pagesLabel = c.pagesLabel || 'Мой скрипт';
  const head = `<div class="thero"><img src="${img(t.img)}" alt=""><div class="wrap">
    <p class="kicker">Тема ${t.id} · ${t.era}</p><h1>${t.title}</h1>
    <div class="metal"><span>${c.sections.filter(s => s.h !== 'Карта').length} разделов</span><span>${dates.length} ${plural(dates.length, ['дата', 'даты', 'дат'])}</span><span>${rul.length} ${plural(rul.length, ['правитель', 'правителя', 'правителей'])}</span></div>
    <div class="acts"><button class="btn gold" data-tab="test">Тест по теме</button><button class="btn ghost" data-tab="script">${pagesLabel}</button></div>
  </div><span class="credit">${t.art}</span></div>`;
  const tabs = `<div class="ttabs"><div class="wrap">${[['notes', 'Конспект'], ['script', pagesLabel], ['more', 'Ещё по теме'], ['test', 'Тест']].map(([k, n]) => `<button data-tab="${k}" class="${topicTab === k ? 'on' : ''}">${n}</button>`).join('')}</div></div>`;
  let body;
  if (topicTab === 'script') body = `<div class="pages">${c.pages.map((p, i) => `<img src="${img(p)}" alt="Страница ${i + 1}" data-zoom loading="lazy">`).join('')}</div>`;
  else if (topicTab === 'more') body = viewMore(c, id);
  else if (topicTab === 'test') {
    const eg = egeFor(id).length;
    body = `<div class="article" style="padding-top:40px"><div class="startbig"><div><span class="label">Тест по теме ${id}</span><h3 style="margin-top:8px">12 вопросов</h3></div><button class="btn ink" id="starttopic">Начать</button></div>
      ${eg ? `<div class="startbig"><div><span class="label">Задания ЕГЭ по теме</span><h3 style="margin-top:8px">${eg} ${plural(eg, ['задание', 'задания', 'заданий'])}</h3></div><button class="btn ghost" id="starttopicege">Решать</button></div>` : ''}</div>`;
  }
  else body = `<div class="tbody"><nav class="toc">${c.sections.map((s, i) => `<a href="javascript:void 0" data-sec="s${i}">${s.h === 'Карта' ? 'Карта' : (i + 1) + '. ' + s.h}</a>`).join('')}</nav>
    <article class="article">${c.sections.map((s, i) => `<section class="sec" id="s${i}"><h2>${s.h === 'Карта' ? '' : `<span class="n">${i + 1}</span>`}${s.h}</h2>${s.yrs ? `<p class="yrs">${s.yrs} годы</p>` : ''}<div class="blocks">${pairUp(s.blocks).map(block).join('')}</div></section>`).join('')}</article></div>`;
  return head + tabs + `<div class="wrap">${body}</div>`;
}
// абзац + узкая картинка после него встают рядом
const pairUp = bs => bs.reduce((a, b) => { const prev = a[a.length - 1]; if (b.k === 'fig' && b.side && prev?.k === 'p') a[a.length - 1] = {k: 'pfig', p: prev, fig: b}; else a.push(b); return a; }, []);
const termText = w => { const t = TERMS.find(x => x.w === w); return `<span><b>${t.w}</b> — ${lc(t.d)}</span>`; };
function block(b) {
  const red = b.red ? 'red' : '';
  switch (b.k) {
    case 'pfig': return `<div class="pfig">${block(b.p)}${block(b.fig)}</div>`;
    case 'sub': return `<h3 class="sub">${b.t}${b.red ? '<span class="tag">главное</span>' : ''}</h3>`;
    case 'p': return `<p class="prose ${red}">${md(b.t)}</p>`;
    case 'date': return `<div class="drow ${red}"><span class="y num">${b.y}</span><span class="t">${b.t}</span></div>`;
    case 'grid': return `<div class="dgrid ${red}">${b.items.map(([y, t]) => `<div class="dbox"><div class="y num">${y}</div><div class="t">${t}</div></div>`).join('')}</div>`;
    case 'icons': return `<div class="irows ${red}">${b.items.map(([i, t]) => `<div class="irow"><span class="ic" aria-hidden="true">${i}</span><p>${md(t)}</p></div>`).join('')}</div>`;
    case 'term': return `<div class="term ${red}">${termText(b.w)}</div>`;
    case 'terms': return `<div class="term ${red}">${b.items.map(termText).join('')}</div>`;
    case 'facts': return `<dl class="facts ${red}">${b.items.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
    case 'chain': return `<div class="chain ${red}">${b.items.map(x => `<span>${x}</span>`).join('<i aria-hidden="true">→</i>')}</div>`;
    case 'ruler': { const r = RULERS[b.id]; return `<div class="rmini ${red}">${r.img ? `<img src="${img(r.img)}" alt="${r.n}">` : `<div class="mono">${r.n[0]}</div>`}<div><h4>${r.n}</h4><div class="yy num">${r.y || ''}</div><p>${r.about}</p><p class="ex">${md(b.extra)}</p><button class="linkbtn" data-ruler="${r.id}">Карточка правителя</button></div></div>`; }
    case 'flow': return `<div class="flow">${b.items.map(s => `<div class="st ${s.red ? 'red' : ''}"><span class="y num">${s.y}</span><div><div class="t">${s.t}</div>${s.note ? `<div class="nt ${s.warn ? 'warn' : ''}">${s.note}</div>` : ''}</div></div>`).join('')}</div>`;
    case 'pm': return `<div class="pm ${red}"><div class="p"><h4>Положительные</h4><ul>${b.plus.map(x => `<li><span class="s">+</span>${x}</li>`).join('')}</ul></div><div class="m"><h4>Отрицательные</h4><ul>${b.minus.map(x => `<li><span class="s">−</span>${x}</li>`).join('')}</ul></div></div>`;
    case 'fig': return `<figure class="fig ${b.side ? 'side' : ''}"><img src="${img(b.img)}" alt="" data-zoom loading="lazy"><figcaption>${b.cap}</figcaption></figure>`;
    case 'figs': return `<figure class="figs"><div>${b.items.map(([k, c]) => `<div><img src="${img(k)}" alt="${c}" data-zoom loading="lazy"><span>${c}</span></div>`).join('')}</div><figcaption>${b.cap}</figcaption></figure>`;
    case 'map': return `<figure class="mapfig"><img src="${img(b.img)}" alt="Карта" data-zoom loading="lazy"><figcaption><span>${b.cap}</span><span>Нажми, чтобы увеличить</span></figcaption></figure>`;
  }
  return '';
}
function videoLink(v) {
  return v.id ? `<a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener" class="vid"><img src="https://i.ytimg.com/vi/${v.id}/mqdefault.jpg" alt="" loading="lazy"><span><b>${esc(v.t)}</b><small>${esc(v.ch || 'YouTube')}${v.len ? ' · ' + v.len : ''}</small></span></a>`
    : `<a href="https://www.youtube.com/results?search_query=${encodeURIComponent(v.q)}" target="_blank" rel="noopener"><span class="play">▶</span><b>${esc(v.t)}</b><small>YouTube ↗</small></a>`;
}
function viewMore(c, id) {
  return `<div class="more">
    <section><div class="sechead"><h2>Интересное</h2></div><div class="cards2">${c.more.map(f => `<div class="fact">${f.img ? `<img src="${img(f.img)}" alt="" data-zoom loading="lazy">` : ''}<h4>${f.h}</h4><p>${f.t}</p></div>`).join('')}</div></section>
    <section><div class="sechead"><h2>Видео</h2></div><div class="vlist">${c.videos.map(videoLink).join('')}</div></section>
    <section><div class="sechead"><h2>Термины</h2></div><div class="glossary">${TERMS.filter(t => t.tp === id).map(t => `<div><b>${t.w}</b><span>${t.d}</span></div>`).join('')}</div></section>
  </div>`;
}

/* ── даты ── */
let dFilter = 'all', openDate = null;
function viewDates() {
  const p = pool();
  const weakN = p.filter(d => isWeak(d.id)).length;
  const learned = p.filter(d => lvl(d.id) >= 3).length;
  const list = p.filter(d => dFilter === 'all' || (dFilter === 'weak' ? isWeak(d.id) : dFilter === 'red' ? (d.red || d.ege) : d.tp === +dFilter)).sort((a, b) => a.s - b.s);
  const groups = {};
  list.forEach(d => (groups[century(d)] ??= []).push(d));
  const modes = [['flip', 'Карточки', '⇄'], ['input', 'Введи год', '1223'], ['choice', 'Выбери из 4', '4'], ['pairs', 'Найди пары', '⇌'], ['century', 'Век', 'XIII'], ['ruler', 'Дата и правитель', '♛']];
  return `<div class="wrap">
    <div class="phead"><p class="kicker">Общее повторение</p><h1>Даты</h1><p class="sub2 num">${learned} из ${p.length} выучено · ${weakN} ${plural(weakN, ['слабая', 'слабые', 'слабых'])}</p></div>
    <div class="modes">${modes.map(([k, n, g]) => `<button class="mode" data-mode="${k}"><span class="glyph">${g}</span><b>${n}</b></button>`).join('')}</div>
    <div class="chips">${[['all', 'Все'], ['weak', `Слабые · ${weakN}`], ['red', 'Главные'], ...openTopics().map(i => [String(i), 'Тема ' + i])].map(([k, n]) => `<button class="chip ${dFilter === k ? 'on' : ''}" data-f="${k}">${n}</button>`).join('')}</div>
    ${Object.entries(groups).map(([c, ds]) => `<div class="century"><h3>${roman(+c)} век</h3><div class="dl">${ds.map(dateItem).join('')}</div></div>`).join('') || '<p style="margin-top:30px">Слабых дат нет</p>'}
  </div>`;
}
function dateItem(d) {
  const l = lvl(d.id), w = isWeak(d.id), o = openDate === d.id;
  return `<div class="dli ${d.red ? 'red' : ''}"><button data-date="${d.id}" aria-expanded="${o}"><span class="y num">${d.y}</span>
    <span><span class="t">${esc(d.t)}${d.red ? '<span class="flag r">главное</span>' : d.ege ? '<span class="flag e">ЕГЭ</span>' : ''}</span><span class="tp">Тема ${d.tp}${d.r ? ' · ' + RULERS[d.r].n : ''}${d.note ? ' · ' + d.note : ''}</span></span>
    <span class="meter ${w ? 'weak' : ''}">${[0, 1, 2, 3, 4].map(i => `<i class="${i < Math.max(l, w ? 1 : 0) ? 'on' : ''}"></i>`).join('')}</span></button>
    ${o ? `<div class="open">${d.m ? `<div class="mnem"><small>Как запомнить</small>${esc(d.m)}</div>` : ''}
      <textarea id="own${d.id}" data-own="${d.id}" aria-label="Своя ассоциация" placeholder="Своя ассоциация">${esc(S.own[d.id]?.v || '')}</textarea></div>` : ''}</div>`;
}

/* ── правители ── */
let rView = 'tree', selRuler = null;
const rulerOpen = k => openTopics().includes(RULERS[k].tp);
const kids = k => Object.values(RULERS).filter(r => (r.p === k || r.rel === k) && rulerOpen(r.id));
function nodeHtml(r) {
  return `<button class="node ${r.ruler ? 'ruler' : ''}" data-ruler="${r.id}" data-node="${r.id}">
    <span class="av">${r.img ? `<img src="${img(r.img)}" alt="" loading="lazy">` : `<span class="mo">${r.n[0]}</span>`}</span>
    <span class="nm">${r.n}</span>${r.y ? `<span class="yr num">${r.y}</span>` : ''}${r.relText ? `<span class="rt">${r.relText}</span>` : ''}</button>`;
}
function treeLi(r) {
  const sp = r.spouse ? RULERS[r.spouse] : null, ch = kids(r.id);
  const me = sp ? `<div class="couple">${nodeHtml(r)}<span class="amp">и</span>${nodeHtml(sp)}</div>` : nodeHtml(r);
  return `<li class="${r.rel ? 'rel' : ''}">${me}${ch.length ? `<ul>${ch.map(treeLi).join('')}</ul>` : ''}</li>`;
}
function viewRulers() {
  const list = Object.values(RULERS).filter(r => r.ruler && rulerOpen(r.id)).sort((a, b) => parseInt(a.y) - parseInt(b.y));
  return `<div class="wrap">
    <div class="phead"><p class="kicker">Рюриковичи и Орда</p><h1>Правители</h1>
      <div class="seg" style="margin-top:18px"><button data-rv="tree" class="${rView === 'tree' ? 'on' : ''}">Древо</button><button data-rv="list" class="${rView === 'list' ? 'on' : ''}">Список</button></div></div>
    ${rView === 'tree' ? `<div class="legend"><span><i style="box-shadow:0 0 0 2px var(--ink)"></i>правил</span><span><i style="box-shadow:0 0 0 1.5px var(--line)"></i>родственник</span><span>пунктир: не сын</span></div>
      ${rulerOpen('rurik') ? `<div class="treebox"><div class="tree" id="tree"><ul>${treeLi(RULERS.rurik)}</ul></div></div>` : ''}
      ${rulerOpen('chingis') ? `<div class="sechead"><h2>Орда</h2></div><div class="treebox"><div class="tree" id="tree2"><ul>${treeLi(RULERS.chingis)}</ul></div></div>` : ''}`
    : `<div class="rlist">${list.map(r => `<button class="rli" data-ruler="${r.id}"><span class="av">${r.img ? `<img src="${img(r.img)}" alt="" loading="lazy">` : `<span class="serif" style="font-size:22px">${r.n[0]}</span>`}</span><span><b>${r.n}</b><small>Тема ${r.tp}</small></span><span class="yr num">${r.y}</span></button>`).join('')}</div>`}
  </div>`;
}
function lineage(k) {
  const s = new Set([k]);
  let r = RULERS[k];
  while (r && (r.p || r.rel)) { s.add(r.p || r.rel); r = RULERS[r.p || r.rel]; }
  if (RULERS[k].spouse) s.add(RULERS[k].spouse);
  const down = x => kids(x).forEach(c => { s.add(c.id); down(c.id); });
  down(k);
  return s;
}
function relWords(r) {
  const ln = id => `<button data-ruler="${id}">${RULERS[id].n}</button>`;
  const parts = [];
  if (r.p) parts.push(`Сын ${ln(r.p)}`);
  if (r.rel) parts.push(`${r.relText[0].toUpperCase() + r.relText.slice(1)}: ${ln(r.rel)}`);
  if (r.spouse) parts.push(`${r.id === 'olga' ? 'Жена' : 'Муж'} ${ln(r.spouse)}`);
  const ch = kids(r.id).filter(c => c.p === r.id);
  if (ch.length) parts.push(`${ch.length > 1 ? 'Сыновья' : 'Сын'}: ${ch.map(c => ln(c.id)).join(', ')}`);
  const sib = r.p ? kids(r.p).filter(c => c.id !== r.id && c.p === r.p) : [];
  if (sib.length) parts.push(`${sib.length > 1 ? 'Братья' : 'Брат'}: ${sib.map(c => ln(c.id)).join(', ')}`);
  return parts.map(p => `<span>${p}</span>`).join('');
}
function rulerCard(k) {
  const r = RULERS[k];
  const ev = (r.ev || []).filter(d => openTopics().includes(d.tp));
  const know = knowRuler(r);
  const tps = [...new Set([r.tp, ...ev.map(d => d.tp)])];
  const egeD = ev.find(d => d.red) || ev[0];
  return `<div class="scrim" id="scrim"></div><aside class="rcard" role="dialog" aria-label="${r.n}">
    <button class="x" id="rclose" aria-label="Закрыть">✕</button>
    <div class="top">${r.img ? `<img src="${img(r.img)}" alt="">` : `<div class="mono">${r.n[0]}</div>`}<div><h2>${r.n}</h2><div class="yy num">${r.y || ''}</div></div></div>
    <section><p>${r.about}</p></section>
    <section><span class="label">Родство</span><div class="kin">${relWords(r) || '<span>Основатель династии</span>'}</div></section>
    ${r.m ? `<section><div class="mnem"><small>Как запомнить</small>${esc(r.m)}</div></section>` : ''}
    ${ev.length ? `<section><span class="label">События</span><div class="evl">${ev.map(d => `<div class="${d.red ? 'r' : ''}"><b class="num">${d.y}</b><span>${esc(d.t)}</span></div>`).join('')}</div></section>` : ''}
    <section><span class="label">Темы</span><div class="tps">${tps.map(t => `<a class="chip" href="#topic-${t}">${t}. ${TOPICS[t - 1].title}</a>`).join('')}</div></section>
    ${egeD && !r.horde ? `<section><span class="label">На ЕГЭ</span><p>В правление какого князя: ${esc(lc(egeD.t))}?</p><details><summary>Ответ</summary>${r.n}</details></section>` : ''}
    ${ev.length ? `<section><span class="label num">Знаешь на ${know}%</span><div class="know"><i style="width:${know}%"></i></div><div style="margin-top:16px"><button class="btn ink" id="rquiz">Проверь меня</button></div></section>` : ''}
  </aside>`;
}
function openRuler(k) {
  selRuler = k;
  $('#layer').innerHTML = rulerCard(k);
  $('#scrim').onclick = $('#rclose').onclick = closeRuler;
  $('#layer').querySelectorAll('[data-ruler]').forEach(b => b.onclick = () => openRuler(b.dataset.ruler));
  $('#rquiz')?.addEventListener('click', () => { closeRuler(); startQuiz('ruler', {ruler: k}); });
  highlight();
  say(PETER.ruler[k] || 'Запомни годы.');
}
function closeRuler() { selRuler = null; $('#layer').innerHTML = ''; highlight(); }
function highlight() {
  ['#tree', '#tree2'].forEach(sel => {
    const t = $(sel); if (!t) return;
    const ln = selRuler ? lineage(selRuler) : null;
    t.classList.toggle('dim', !!ln);
    t.querySelectorAll('.node').forEach(n => { n.classList.toggle('hl', !!ln && ln.has(n.dataset.node)); n.classList.toggle('sel', n.dataset.node === selRuler); });
  });
}

/* ── тесты ── */
function viewTests() {
  const {r, nx} = rankOf(S.xp);
  const pct = nx ? Math.round((S.xp - r[1]) / (nx[1] - r[1]) * 100) : 100;
  const groups = [...new Set(ACHIEVEMENTS.map(a => a.g))];
  const eg = EGE_OPEN().length;
  return `<div class="wrap">
    <div class="phead"><p class="kicker">Все пройденные темы</p><h1>Тесты</h1></div>
    <div class="rankcard"><div><span class="label">Звание</span><h2>${r[0]}</h2><div class="xpbar"><i style="width:${pct}%"></i></div>
      <p class="nx num">${S.xp} XP${nx ? ` · до «${nx[0]}» ${nx[1] - S.xp}` : ''}</p></div>
      <div class="ladder">${RANKS.slice().reverse().map(x => `<div class="${x[0] === r[0] ? 'me' : ''}"><span>${x[0]}</span><span class="num">${x[1]}</span></div>`).join('')}</div></div>
    <div class="startbig"><h3>Бесконечный тест</h3><button class="btn gold" id="endless">Начать</button></div>
    ${eg ? `<div class="startbig"><div><h3>Задания ЕГЭ</h3><p class="note" style="margin-top:4px">${eg} ${plural(eg, ['задание', 'задания', 'заданий'])} по пройденным темам, с разборами</p></div><button class="btn ghost" id="egeall">Решать</button></div>` : ''}
    <div class="statrow"><div><b class="num">${S.best}</b><span>лучшая серия</span></div><div><b class="num">${S.right}</b><span>правильных</span></div><div><b class="num">${S.ach.length} из ${ACHIEVEMENTS.length}</b><span>достижений</span></div></div>
    <div class="sechead" style="margin-top:40px"><h2>Достижения</h2></div>
    ${groups.map(g => `<div class="achg"><h3>${g}</h3><div class="ach">${ACHIEVEMENTS.filter(a => a.g === g).map(a => `<div class="${S.ach.includes(a.id) ? 'got' : ''}"><span class="ic">${a.ic}</span><b>${a.n}</b><span>${a.d}</span></div>`).join('')}</div></div>`).join('')}
  </div>`;
}

/* ── генераторы вопросов ── */
const EGE_OPEN = () => typeof EGE === 'undefined' ? [] : EGE.filter(t => openTopics().includes(t.tp));
const single = d => /^\d{3,4}$/.test(d.y);
function qEventYear(d) { return {kind: 'В каком году?', q: d.t, type: 'choice', years: 1, opts: yearOptions(d), ans: d.y, d}; }
function qYearEvent(d) {
  const others = shuffle(pool().filter(x => x.y !== d.y && Math.abs(x.s - d.s) < 150)).slice(0, 3);
  return {kind: 'Что произошло?', q: d.y, type: 'choice', opts: shuffle([d, ...others]).map(x => x.t), ans: d.t, d};
}
function qInput(d) { return single(d) ? {kind: 'Введи год', q: d.t, type: 'input', ans: d.y, d} : qEventYear(d); }
function qCentury(d) {
  const c = century(d);
  return {kind: 'В каком веке?', q: d.t, type: 'choice', years: 1, opts: [c - 1, c, c + 1, c + 2].filter(x => x > 0).map(roman), ans: roman(c), d, cent: 1};
}
function qRuler(d) {
  const rs = Object.values(RULERS).filter(r => r.ruler && r.id !== d.r && rulerOpen(r.id));
  return {kind: 'Кто правил?', q: `${d.t}, ${d.y}`, type: 'choice', opts: shuffle([RULERS[d.r], ...shuffle(rs).slice(0, 3)]).map(r => r.n), ans: RULERS[d.r].n, d};
}
function qOrder(P) {
  const ds = []; for (const d of shuffle(P)) { if (ds.every(x => Math.abs(x.s - d.s) >= 3)) ds.push(d); if (ds.length === 4) break; }
  return ds.length < 3 ? null : {kind: 'Хронология · ЕГЭ', q: 'От раннего к позднему', type: 'order', items: shuffle(ds), ds};
}
function qPairs(P) {
  const ds = []; for (const d of shuffle(P)) { if (ds.every(x => x.y !== d.y)) ds.push(d); if (ds.length === 4) break; }
  return ds.length < 3 ? null : {kind: 'Соответствие · ЕГЭ', q: 'Соедини даты и события', type: 'pairs', ds};
}
function qPortrait() {
  const rs = Object.values(RULERS).filter(r => r.img && rulerOpen(r.id)), r = pick(rs);
  return {kind: 'Кто на портрете?', q: '', type: 'choice', img: r.img, opts: shuffle([r, ...shuffle(rs.filter(x => x !== r)).slice(0, 3)]).map(x => x.n), ans: r.n, r, portrait: 1};
}
function qTerm(tp) {
  const open = TERMS.filter(t => openTopics().includes(t.tp)), ts = open.filter(t => !tp || t.tp === tp), t = pick(ts.length ? ts : open);
  return {kind: 'Что значит термин?', q: t.w, type: 'choice', opts: shuffle([t, ...shuffle(open.filter(x => x !== t)).slice(0, 3)]).map(x => x.d), ans: t.d, term: t.w};
}
function qEge(list) { const t = pick(list); return t && {kind: `Задание ЕГЭ · ${t.type.replace('Тип ', 'тип ')}`, q: '', type: 'ege', t}; }
function makeQ(mode, opt) {
  let P = pool();
  if (opt.topic) P = P.filter(d => d.tp === opt.topic);
  if (opt.ruler) P = (RULERS[opt.ruler].ev || []).filter(d => openTopics().includes(d.tp));
  if (!P.length) P = pool();
  const sP = P.filter(single), d = weighted(sP.length ? sP : P);
  const rulerQ = () => { const R = P.filter(x => x.r && RULERS[x.r].ruler); return R.length ? qRuler(weighted(R)) : qEventYear(d); };
  const centQ = () => { const C = P.filter(x => /^\d/.test(x.y)); return qCentury(weighted(C.length ? C : P)); };
  switch (mode) {
    case 'input': return qInput(d);
    case 'choice': return Math.random() < .5 ? qEventYear(d) : qYearEvent(d);
    case 'century': return centQ();
    case 'ruler': return opt.ruler ? pick([qEventYear(d), qInput(d), qYearEvent(d)]) : rulerQ();
    case 'pairs': return qPairs(P) || qEventYear(d);
    case 'flip': return {kind: 'Карточка', type: 'flip', d: weighted(P), front: Math.random() < .5 ? 'y' : 't'};
    case 'ege': return qEge(opt.topic ? egeFor(opt.topic) : EGE_OPEN());
    default: {
      const r = Math.random(), eg = EGE_OPEN();
      if (r < .12 && eg.length) return qEge(eg);
      if (r < .24) return qOrder(P) || qEventYear(d);
      if (r < .34) return qPairs(P) || qEventYear(d);
      if (r < .42) return qPortrait();
      if (r < .51) return qTerm(opt.topic);
      if (r < .60) return centQ();
      if (r < .70) return rulerQ();
      if (r < .84) return qInput(d);
      return Math.random() < .5 ? qEventYear(d) : qYearEvent(d);
    }
  }
}

/* ── квиз ── */
let Q = null;
const flameLv = n => n >= 20 ? 5 : n >= 10 ? 4 : n >= 6 ? 3 : n >= 3 ? 2 : n >= 1 ? 1 : 0;
function startQuiz(mode, opt = {}) {
  const egeList = mode === 'ege' ? shuffle(opt.topic ? egeFor(opt.topic) : EGE_OPEN()) : null;
  Q = {mode, opt, n: 0, total: opt.topic && mode !== 'ege' ? 12 : opt.ruler ? 5 : mode === 'mix' || mode === 'ege' ? (egeList ? egeList.length : 0) : 10, right: 0, combo: 0, best: 0, xp: 0};
  if (mode === 'ege') { Q.list = egeList.map(t => ({kind: `Задание ЕГЭ · ${t.type.replace('Тип ', 'тип ')}`, q: '', type: 'ege', t})); if (!opt.topic) Q.total = 0; }
  else if (opt.topic) Q.list = topicTestList(opt.topic);
  document.body.classList.add('quizon');
  if (!S.ach.includes('first')) award('first');
  say(PETER.start, 'h', 2200);
  nextQ();
}
function topicTestList(tp) {
  const P = pool().filter(d => d.tp === tp);
  const qs = [qOrder(P), qPairs(P), qTerm(tp), qTerm(tp), ...shuffle(egeFor(tp)).slice(0, 3).map(t => ({kind: `Задание ЕГЭ · ${t.type.replace('Тип ', 'тип ')}`, q: '', type: 'ege', t}))].filter(Boolean);
  for (const d of shuffle(P.filter(single)).slice(0, 8)) qs.push(pick([qEventYear(d), qInput(d), qCentury(d)]));
  while (qs.length < 12 && P.length) qs.push(pick([qYearEvent(pick(P)), qTerm(tp)]));
  return shuffle(qs).slice(0, 12);
}
function nextQ() {
  if (Q.total && Q.n >= Q.total) return finishQuiz();
  if (Q.list && !Q.list[Q.n]) { if (Q.mode === 'ege') Q.list.push(...shuffle(Q.list.slice(0, Q.n)).map(q => ({...q}))); }
  Q.cur = Q.list ? {...Q.list[Q.n]} : makeQ(Q.mode, Q.opt);
  if (!Q.cur) return finishQuiz();
  Q.cur.state = {sel: [], answered: false};
  Q.shown = Date.now();
  drawQ();
}
const norm = s => String(s).toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]/g, '');
function checkEge(t, v) {
  const a = t.ans.split('|'), val = norm(v);
  if (t.kind === 'multi') return a.some(x => [...norm(x)].sort().join('') === [...val].sort().join(''));
  return a.some(x => norm(x) === val);
}
function drawQ() {
  const q = Q.cur, st = q.state, lv = flameLv(Q.combo);
  let inner = '';
  if (q.type === 'choice') inner = `${q.src ? `<blockquote class="src">${q.src}</blockquote>` : ''}${q.img ? `<img class="qimg" src="${img(q.img)}" alt="">` : ''}
    <div class="qopts ${q.years ? 'years' : ''}">${q.opts.map(o => `<button class="qo ${st.answered ? (o === q.ans ? 'ok' : o === st.pick ? 'no' : '') : ''}" data-o="${esc(o)}" ${st.answered ? 'disabled' : ''}>${esc(o)}</button>`).join('')}</div>`;
  else if (q.type === 'input') inner = `<form class="qin" id="qin"><input id="qval" inputmode="numeric" autocomplete="off" placeholder="Год" aria-label="Год" ${st.answered ? 'disabled' : ''} value="${esc(st.val || '')}"><button class="btn ink" ${st.answered ? 'disabled' : ''}>Ответить</button></form>`;
  else if (q.type === 'order') { const right = q.ds.slice().sort((a, b) => a.s - b.s); inner = `<div class="qopts qorder">${q.items.map(d => { const i = st.sel.indexOf(d.id); return `<button class="qo ${i >= 0 ? 'sel' : ''} ${st.answered ? (right[i]?.id === d.id ? 'ok' : 'no') : ''}" data-id="${d.id}" ${st.answered ? 'disabled' : ''}>${i >= 0 ? `<span class="k">${i + 1}</span>` : ''}${esc(d.t)}${st.answered ? ` <span class="note">${d.y}</span>` : ''}</button>`; }).join('')}</div>`; }
  else if (q.type === 'pairs') { st.right ??= shuffle(q.ds); inner = `<div class="pairs"><div class="col left">${q.ds.map(d => `<button class="qo ${st.sel.includes(d.id) ? 'gone' : ''} ${st.l === d.id ? 'sel' : ''}" data-l="${d.id}">${d.y}</button>`).join('')}</div><div class="col">${st.right.map(d => `<button class="qo ${st.sel.includes(d.id) ? 'gone' : ''} ${st.bad === d.id ? 'no' : ''}" data-rr="${d.id}">${esc(d.t)}</button>`).join('')}</div></div>`; }
  else if (q.type === 'flip') { const d = q.d; inner = `<div class="flip ${st.flipped ? 'on' : ''}" id="flip"><div class="in"><div class="f">${q.front === 'y' ? `<span class="yy num">${d.y}</span>` : `<span class="tt">${esc(d.t)}</span>`}<small>Нажми, чтобы перевернуть</small></div><div class="b"><span class="yy num">${d.y}</span><span class="tt">${esc(d.t)}</span>${d.m ? `<span class="mnem" style="background:none">${esc(d.m)}</span>` : ''}</div></div></div>
    ${st.flipped ? `<div class="fliprow"><button class="btn ghost" data-self="0">Не знал</button><button class="btn ink" data-self="1">Знал</button></div>` : ''}`; }
  else if (q.type === 'ege') {
    const t = q.t, open = t.kind === 'open';
    inner = `<div class="egebody">${t.body}</div>
      ${open ? (st.answered || st.reveal ? '' : `<textarea id="egeopen" placeholder="Ответь письменно или в уме, потом сверь с разбором"></textarea><button class="btn ink" id="reveal" style="align-self:flex-start">Показать разбор</button>`)
        : `<form class="qin" id="qin"><input id="qval" autocomplete="off" placeholder="Ответ" ${/^\d+$/.test(t.ans) ? 'inputmode="numeric"' : ''} aria-label="Ответ" ${st.answered ? 'disabled' : ''} value="${esc(st.val || '')}"><button class="btn ink" ${st.answered ? 'disabled' : ''}>Ответить</button></form>`}
      ${open && st.reveal && !st.answered ? `<div class="egesol">${t.sol}</div><div class="fliprow"><button class="btn ghost" data-self="0">Не справился</button><button class="btn ink" data-self="1">Справился</button></div>` : ''}`;
  }
  let feed = '';
  if (st.answered && q.type === 'ege') feed = `<div class="qfeed ${st.ok ? 'ok' : 'no'}"><b>${st.ok ? 'Верно' : 'Неверно'}${q.t.ans ? `: ${esc(q.t.ans.split('|')[0])}` : ''}</b></div><details class="egesol-d" ${st.ok ? '' : 'open'}><summary>Разбор</summary><div class="egesol">${q.t.sol}</div></details>`;
  else if (st.answered && q.type !== 'flip') feed = `<div class="qfeed ${st.ok ? 'ok' : 'no'}"><b>${st.ok ? 'Верно' : 'Неверно'}${!st.ok && q.ans ? `: ${esc(q.ans)}` : ''}</b>${!st.ok && q.d?.m ? `<span class="mn">${esc(q.d.m)}</span>` : ''}${!st.ok && q.cent ? `<span>${q.d.y}: ${esc(q.d.t)}</span>` : ''}</div>`;
  const next = st.answered ? `<button class="btn ink qnext" id="qnext">${Q.total && Q.n + 1 >= Q.total ? 'Результат' : 'Дальше'}</button>` : '';
  const sparks = lv >= 3 ? Array.from({length: lv * 2}, (_, i) => `<i class="spark" style="left:${18 + (i * 37) % 28}px;--dx:${(i % 2 ? 1 : -1) * (6 + i * 3 % 14)}px;animation-delay:${(i * .23).toFixed(2)}s"></i>`).join('') : '';
  $('#layer').innerHTML = `<div class="quizwrap" data-lv="${lv}" role="dialog" aria-label="Тест">
    <div class="qhead"><button class="x" id="qx" aria-label="Закончить">✕</button>
      <span class="qcount">${Q.total ? `Вопрос <b class="num">${Q.n + 1}</b> из ${Q.total}` : `Вопрос <b class="num">${Q.n + 1}</b>`}</span>
      <div class="streak lv${lv}" aria-label="Серия ${Q.combo}"><span class="flamebox ${Q.pulse ? 'pulse' : ''}">${FLAME}${sparks}${Q.smoke ? '<i class="smoke"></i>' : ''}</span><span><small>серия</small><span class="num">${Q.combo}</span></span></div></div>
    <div class="qbody"><span class="qkind">${q.kind}</span>${q.q ? `<h2 class="qq">${esc(q.q)}</h2>` : ''}${inner}${feed}${next}</div></div>`;
  Q.pulse = Q.smoke = false;
  bindQ();
}
function answer(ok) {
  const q = Q.cur; q.state.answered = true; q.state.ok = ok;
  if (q.d && q.type !== 'pairs' && q.type !== 'order') mark(q.d, ok);
  const before = rankOf(S.xp).r[0];
  if (q.type === 'ege') S.c.ege++;
  if (ok) {
    if (q.cent) S.c.century++;
    if (q.portrait) S.c.portraits++;
    if (q.term && !S.c.terms.includes(q.term)) S.c.terms.push(q.term);
    if (q.type === 'order') { S.c.orderRow++; if (S.c.orderRow >= 10) award('order'); }
    S.c.fastRow = Date.now() - Q.shown < 5000 ? S.c.fastRow + 1 : 0; if (S.c.fastRow >= 10) award('fast');
    Q.combo++; Q.right++; S.right++; Q.best = Math.max(Q.best, Q.combo); S.wrongRow = 0;
    const g = (q.type === 'ege' ? 20 : 10) * Math.min(5, 1 + Math.floor(Q.combo / 3)); Q.xp += g; S.xp += g; Q.pulse = true;
    S.best = Math.max(S.best, Q.combo);
    const f = document.createElement('div'); f.className = 'xpfly num'; f.textContent = `+${g}`; document.body.appendChild(f); setTimeout(() => f.remove(), 900);
    if (PETER.combo[Q.combo]) say(PETER.combo[Q.combo], 'h', 3500); else if (Math.random() < .45) say(PETER.ok, 'h', 2200);
    [[10, 'combo10'], [25, 'combo25'], [50, 'combo50']].forEach(([n, id]) => Q.combo >= n && award(id));
    if (S.right >= 100) award('hundred'); if (S.right >= 1000) award('thousand');
  } else {
    if (q.type === 'order') S.c.orderRow = 0;
    S.c.fastRow = 0;
    if (Q.combo >= 5) say(PETER.comboLost, 's'); else say(PETER.no, 's', 2600);
    if (Q.combo > 0) Q.smoke = true;
    Q.combo = 0; S.wrongRow = (S.wrongRow || 0) + 1; if (S.wrongRow >= 3) award('oops');
  }
  const after = rankOf(S.xp).r[0];
  if (after !== before) { say(fill(draw(PETER.rankUp), {rank: after}), 'o', 5000); if (after === 'Князь') award('prince'); if (after === 'Царь') award('tsar'); }
  checkAchievements();
  save(); drawQ();
}
function bindQ() {
  const L = $('#layer'), q = Q.cur, st = q.state;
  $('#qx').onclick = finishQuiz;
  $('#qnext')?.addEventListener('click', () => { Q.n++; nextQ(); });
  if (q.type === 'choice') L.querySelectorAll('.qo').forEach(b => b.onclick = () => { st.pick = b.dataset.o; answer(b.dataset.o === q.ans); });
  if (q.type === 'input' || (q.type === 'ege' && q.t.kind !== 'open')) {
    const i = $('#qval'); if (!st.answered && q.type === 'input') i.focus();
    $('#qin').onsubmit = e => { e.preventDefault(); const v = i.value.trim(); if (!v) return; st.val = v; answer(q.type === 'ege' ? checkEge(q.t, v) : v === q.ans); };
  }
  if (q.type === 'ege' && q.t.kind === 'open') {
    $('#reveal')?.addEventListener('click', () => { st.reveal = true; drawQ(); });
    L.querySelectorAll('[data-self]').forEach(b => b.onclick = () => answer(b.dataset.self === '1'));
  }
  if (q.type === 'order') L.querySelectorAll('.qo').forEach(b => b.onclick = () => {
    const id = b.dataset.id, i = st.sel.indexOf(id);
    if (i >= 0) st.sel.splice(i, 1); else st.sel.push(id);
    if (st.sel.length === q.items.length) return answer(q.ds.slice().sort((a, b) => a.s - b.s).every((x, k) => x.id === st.sel[k]));
    drawQ();
  });
  if (q.type === 'pairs') {
    L.querySelectorAll('[data-l]').forEach(b => b.onclick = () => { st.l = b.dataset.l; st.bad = null; drawQ(); });
    L.querySelectorAll('[data-rr]').forEach(b => b.onclick = () => {
      if (st.l == null) return;
      const id = b.dataset.rr;
      if (id === st.l) { st.sel.push(id); st.l = null; mark(DATE[id], true); S.c.pairs++; if (st.sel.length === q.ds.length) return answer(!st.miss); }
      else { st.bad = id; st.miss = true; mark(DATE[st.l], false); }
      drawQ();
    });
  }
  if (q.type === 'flip') {
    $('#flip').onclick = () => { if (!st.flipped) { st.flipped = true; drawQ(); } };
    L.querySelectorAll('[data-self]').forEach(b => b.onclick = () => { const ok = b.dataset.self === '1'; mark(q.d, ok); if (ok) { Q.combo++; Q.right++; Q.pulse = true; } else { if (Q.combo) Q.smoke = true; Q.combo = 0; } Q.n++; save(); nextQ(); });
  }
}
function finishQuiz() {
  const n = Q.n + (Q.cur?.state?.answered ? 1 : 0), pct = n ? Math.round(Q.right / n * 100) : 0;
  const topicTest = Q.opt.topic && Q.mode !== 'ege';
  if (topicTest) { S.topicTest[Q.opt.topic] = Math.max(S.topicTest[Q.opt.topic] || 0, pct); if (pct >= 80) award('topic80'); if (pct === 100) award('topic100'); }
  checkAchievements(); save();
  const good = topicTest ? pct >= 80 : pct >= 70;
  $('#layer').innerHTML = `<div class="quizwrap"><div class="qbody result"><span class="label">${topicTest ? 'Тест по теме ' + Q.opt.topic : 'Итог'}</span><div class="big num">${pct}%</div>
    <div class="row3"><div><b class="num">${Q.right} из ${n}</b><span>верно</span></div><div><b class="num">${Q.best}</b><span>лучшая серия</span></div><div><b class="num">+${Q.xp}</b><span>XP</span></div></div>
    ${topicTest ? `<p>${pct >= 80 ? 'Тема пройдена' : 'Нужно 80%'}</p>` : ''}
    <button class="btn ink" id="qclose">Готово</button></div></div>`;
  if (n) say(good ? PETER.finishGood : PETER.finishBad, good ? 'h' : 's', 5000);
  $('#qclose').onclick = () => { $('#layer').innerHTML = ''; Q = null; document.body.classList.remove('quizon'); render(); };
}

/* ── привязки ── */
function bind() {
  bindDaily();
  document.querySelectorAll('#app [data-tab]').forEach(b => b.onclick = () => { topicTab = b.dataset.tab; render(); if (topicTab !== 'notes') $('.ttabs')?.scrollIntoView(); });
  document.querySelectorAll('#app [data-sec]').forEach(a => a.onclick = () => document.getElementById(a.dataset.sec).scrollIntoView({behavior: 'smooth'}));
  document.querySelectorAll('#app [data-zoom]').forEach(i => i.onclick = () => {
    $('#layer').innerHTML = `<div class="zoom" id="zoom"><span class="hint">Нажми ещё раз, чтобы приблизить</span><button class="x" id="zx" aria-label="Закрыть">✕</button><img src="${i.src}" alt=""></div>`;
    $('#zoom img').onclick = e => { e.stopPropagation(); $('#zoom').classList.toggle('z2'); };
    $('#zx').onclick = () => $('#layer').innerHTML = '';
  });
  document.querySelectorAll('#app [data-ruler]').forEach(b => b.onclick = () => openRuler(b.dataset.ruler));
  document.querySelectorAll('#app [data-locked]').forEach(b => b.onclick = () => say(PETER.topicLocked, 'o'));
  document.querySelectorAll('#app [data-rv]').forEach(b => b.onclick = () => { rView = b.dataset.rv; render(); });
  document.querySelectorAll('#app [data-mode]').forEach(b => b.onclick = () => startQuiz(b.dataset.mode, {}));
  document.querySelectorAll('#app [data-f]').forEach(b => b.onclick = () => { dFilter = b.dataset.f; render(); });
  document.querySelectorAll('#app [data-date]').forEach(b => b.onclick = () => { const id = b.dataset.date; openDate = openDate === id ? null : id; const y = window.scrollY; render(); window.scrollTo(0, y); });
  document.querySelectorAll('#app [data-own]').forEach(t => {
    t.oninput = () => { S.own[t.dataset.own] = {v: t.value, t: Date.now()}; save(); };
    t.onchange = () => { if (t.value.trim()) say(PETER.ownMnemonic, 'h'); if (Object.values(S.own).filter(o => o?.v?.trim()).length >= 10) award('own10'); };
  });
  $('#endless')?.addEventListener('click', () => startQuiz('mix', {}));
  $('#egeall')?.addEventListener('click', () => startQuiz('ege', {}));
  $('#starttopic')?.addEventListener('click', () => startQuiz('topic', {topic: +route.split('-')[1]}));
  $('#starttopicege')?.addEventListener('click', () => startQuiz('ege', {topic: +route.split('-')[1]}));
  if (route === 'rulers') { highlight(); const sel = $('#tree [data-node="yaroslav"]'); if (sel) { const box = sel.closest('.treebox'); box.scrollLeft = sel.offsetLeft - box.clientWidth / 2 + 52; } }
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') { if ($('#zoom') || $('.sheet')) $('#layer').innerHTML = ''; else if (selRuler) closeRuler(); } });
document.addEventListener('visibilitychange', () => { if (!document.hidden && S.daily.day !== today()) { rollDay(); save(); if (route === 'home' && !Q) render(); } });
go();
setTimeout(greet, 700);
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.register('sw.js');
  // вышла новая версия сайта: перезагружаемся один раз, чтобы сразу показать свежие темы
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadController && !Q) location.reload(); });
}
