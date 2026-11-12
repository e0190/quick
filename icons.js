// 32 player icons, drawn as small SVGs. g = main shape color, d = detail color.
const ICON_BG = ['#ff4d6d', '#3fb8ff', '#ffd23f', '#3ddc97', '#a66bff', '#ff8a3d', '#ff5fc8', '#2ec4b6'];
const ICON_DRAW = [
  ['Star', (g) => `<polygon fill="${g}" points="32,9 38.5,24 54,25 42,35.5 46,51 32,42.5 18,51 22,35.5 10,25 25.5,24"/>`],
  ['Bolt', (g) => `<polygon fill="${g}" points="37,8 17,36 30,36 25,56 47,26 34,26"/>`],
  ['Heart', (g) => `<path fill="${g}" d="M32 52C11 38 12 18 23.5 18c5 0 8.5 3.5 8.5 7.5 0-4 3.5-7.5 8.5-7.5C52 18 53 38 32 52z"/>`],
  ['Flame', (g, d) => `<path fill="${g}" d="M32 8c5 10 16 15 16 30a16 16 0 0 1-32 0c0-8 5-12 8-18 2 6 6 8 6 8 0-8 1-14 2-20z"/><path fill="${d}" opacity=".35" d="M32 32c3 5 8 7 8 13a8 8 0 0 1-16 0c0-5 5-7 8-13z"/>`],
  ['Crown', (g, d) => `<polygon fill="${g}" points="12,44 12,20 22,31 32,15 42,31 52,20 52,44"/><rect fill="${g}" x="12" y="46" width="40" height="6" rx="2"/><circle fill="${d}" cx="32" cy="35" r="3.5"/>`],
  ['Moon', (g) => `<path fill="${g}" d="M40 11a21 21 0 1 0 13 31 17 17 0 1 1-13-31z"/>`],
  ['Sun', (g) => `<circle fill="${g}" cx="32" cy="32" r="10"/><g stroke="${g}" stroke-width="4.5" stroke-linecap="round"><path d="M32 9v7M32 48v7M9 32h7M48 32h7M15.7 15.7l5 5M43.3 43.3l5 5M15.7 48.3l5-5M43.3 20.7l5-5"/></g>`],
  ['Cloud', (g) => `<g fill="${g}"><circle cx="24" cy="36" r="10"/><circle cx="35" cy="29" r="13"/><circle cx="45" cy="38" r="8"/><rect x="18" y="36" width="31" height="10" rx="5"/></g>`],
  ['Drop', (g, d) => `<path fill="${g}" d="M32 9C22 25 18 31 18 40a14 14 0 0 0 28 0c0-9-4-15-14-31z"/><path fill="none" stroke="${d}" stroke-width="3" stroke-linecap="round" opacity=".35" d="M25 40a7 7 0 0 0 5 7"/>`],
  ['Leaf', (g, d) => `<path fill="${g}" d="M13 51C13 25 29 14 52 12c-2 24-13 39-39 39z"/><path fill="none" stroke="${d}" stroke-width="2.5" stroke-linecap="round" opacity=".4" d="M15 49L42 22"/>`],
  ['Flower', (g, d) => `<g fill="${g}"><circle cx="32" cy="19" r="9"/><circle cx="44.4" cy="28" r="9"/><circle cx="39.6" cy="42.5" r="9"/><circle cx="24.4" cy="42.5" r="9"/><circle cx="19.6" cy="28" r="9"/></g><circle fill="${d}" cx="32" cy="32" r="7"/>`],
  ['Gem', (g, d) => `<polygon fill="${g}" points="20,14 44,14 54,26 32,54 10,26"/><path fill="none" stroke="${d}" stroke-width="2" opacity=".35" d="M10 26h44M24 14l-4 12 12 28 12-28-4-12"/>`],
  ['Rocket', (g, d) => `<path fill="${g}" d="M32 7c10 8 12 20 10 33H22c-2-13 0-25 10-33z"/><polygon fill="${g}" points="22,30 13,42 13,47 22,41"/><polygon fill="${g}" points="42,30 51,42 51,47 42,41"/><circle fill="${d}" cx="32" cy="24" r="5"/><path fill="${g}" opacity=".7" d="M26 43h12l-6 13z"/>`],
  ['Ghost', (g, d) => `<path fill="${g}" d="M17 53V30a15 15 0 0 1 30 0v23l-5-5-5 5-5-5-5 5-5-5z"/><circle fill="${d}" cx="26" cy="31" r="3.5"/><circle fill="${d}" cx="38" cy="31" r="3.5"/>`],
  ['Cat', (g, d) => `<polygon fill="${g}" points="14,14 27,22 16,30"/><polygon fill="${g}" points="50,14 37,22 48,30"/><circle fill="${g}" cx="32" cy="36" r="17"/><circle fill="${d}" cx="25" cy="34" r="3"/><circle fill="${d}" cx="39" cy="34" r="3"/><polygon fill="${d}" points="29,41 35,41 32,44"/>`],
  ['Owl', (g, d) => `<ellipse fill="${g}" cx="32" cy="36" rx="17" ry="18"/><polygon fill="${g}" points="15,22 22,14 25,22"/><polygon fill="${g}" points="49,22 42,14 39,22"/><circle fill="${d}" cx="25" cy="31" r="7"/><circle fill="${d}" cx="39" cy="31" r="7"/><circle fill="${g}" cx="25" cy="31" r="3"/><circle fill="${g}" cx="39" cy="31" r="3"/><polygon fill="${d}" points="29,39 35,39 32,44"/>`],
  ['Fish', (g, d) => `<ellipse fill="${g}" cx="29" cy="32" rx="18" ry="12"/><polygon fill="${g}" points="44,32 56,21 56,43"/><circle fill="${d}" cx="21" cy="29" r="3"/>`],
  ['Bird', (g, d) => `<circle fill="${g}" cx="30" cy="34" r="16"/><polygon fill="${d}" points="45,30 55,34 45,38"/><circle fill="${d}" cx="36" cy="29" r="2.8"/><path fill="${d}" opacity=".3" d="M17 36c6 0 12 3 14 9-8 1-13-3-14-9z"/>`],
  ['Mushroom', (g, d) => `<path fill="${g}" d="M10 34a22 20 0 0 1 44 0z"/><rect fill="${g}" opacity=".8" x="25" y="34" width="14" height="18" rx="5"/><circle fill="${d}" opacity=".35" cx="24" cy="25" r="4"/><circle fill="${d}" opacity=".35" cx="39" cy="22" r="3"/>`],
  ['Cactus', (g) => `<g fill="${g}"><rect x="26" y="10" width="12" height="44" rx="6"/><rect x="14" y="22" width="9" height="18" rx="4.5"/><rect x="14" y="34" width="16" height="7" rx="3.5"/><rect x="41" y="18" width="9" height="16" rx="4.5"/><rect x="34" y="28" width="16" height="7" rx="3.5"/></g>`],
  ['Planet', (g) => `<circle fill="${g}" cx="32" cy="32" r="13"/><ellipse fill="none" stroke="${g}" stroke-width="4" cx="32" cy="33" rx="24" ry="8" transform="rotate(-18 32 33)"/>`],
  ['Note', (g) => `<g fill="${g}"><ellipse cx="22" cy="45" rx="8" ry="6.5"/><rect x="26" y="13" width="5" height="33"/><path d="M31 13c8 2 14 7 13 16-3-5-7-7-13-7z"/></g>`],
  ['Gamepad', (g, d) => `<rect fill="${g}" x="8" y="20" width="48" height="26" rx="13"/><path fill="${d}" d="M19 30h4v-4h4v4h4v4h-4v4h-4v-4h-4z"/><circle fill="${d}" cx="42" cy="30" r="3"/><circle fill="${d}" cx="48" cy="36" r="3"/>`],
  ['Smiley', (g, d) => `<circle fill="${g}" cx="32" cy="32" r="21"/><circle fill="${d}" cx="25" cy="27" r="3"/><circle fill="${d}" cx="39" cy="27" r="3"/><path fill="none" stroke="${d}" stroke-width="3.5" stroke-linecap="round" d="M23 37c5 7 13 7 18 0"/>`],
  ['Bear', (g, d) => `<circle fill="${g}" cx="18" cy="19" r="7"/><circle fill="${g}" cx="46" cy="19" r="7"/><circle fill="${g}" cx="32" cy="35" r="18"/><ellipse fill="${d}" opacity=".25" cx="32" cy="41" rx="8" ry="6"/><circle fill="${d}" cx="25" cy="31" r="2.8"/><circle fill="${d}" cx="39" cy="31" r="2.8"/><ellipse fill="${d}" cx="32" cy="39" rx="3" ry="2.2"/>`],
  ['Frog', (g, d) => `<circle fill="${g}" cx="22" cy="22" r="8"/><circle fill="${g}" cx="42" cy="22" r="8"/><ellipse fill="${g}" cx="32" cy="38" rx="22" ry="15"/><circle fill="${d}" cx="22" cy="22" r="3.5"/><circle fill="${d}" cx="42" cy="22" r="3.5"/><path fill="none" stroke="${d}" stroke-width="3" stroke-linecap="round" d="M22 41c6 4 14 4 20 0"/>`],
  ['Robot', (g, d) => `<rect fill="${g}" x="14" y="20" width="36" height="30" rx="7"/><rect fill="${g}" x="30" y="10" width="4" height="10"/><circle fill="${g}" cx="32" cy="10" r="4"/><rect fill="${d}" x="21" y="29" width="8" height="8" rx="2"/><rect fill="${d}" x="35" y="29" width="8" height="8" rx="2"/><rect fill="${d}" x="24" y="41" width="16" height="3" rx="1.5"/>`],
  ['Alien', (g, d) => `<path fill="${g}" d="M32 9c13 0 20 9 20 20 0 13-11 26-20 26S12 42 12 29C12 18 19 9 32 9z"/><ellipse fill="${d}" cx="23" cy="30" rx="7" ry="4.5" transform="rotate(25 23 30)"/><ellipse fill="${d}" cx="41" cy="30" rx="7" ry="4.5" transform="rotate(-25 41 30)"/>`],
  ['Ice cream', (g, d) => `<polygon fill="${g}" opacity=".75" points="20,32 44,32 32,57"/><circle fill="${g}" cx="25" cy="27" r="9"/><circle fill="${g}" cx="39" cy="27" r="9"/><circle fill="${g}" cx="32" cy="18" r="9"/><circle fill="${d}" opacity=".4" cx="33" cy="17" r="2"/>`],
  ['Pizza', (g, d) => `<path fill="${g}" d="M12 16c13-6 27-6 40 0L32 56z"/><circle fill="${d}" opacity=".45" cx="25" cy="24" r="4"/><circle fill="${d}" opacity=".45" cx="38" cy="26" r="4"/><circle fill="${d}" opacity=".45" cx="32" cy="38" r="3.5"/>`],
  ['Dice', (g, d) => `<rect fill="${g}" x="13" y="13" width="38" height="38" rx="9"/><g fill="${d}"><circle cx="23" cy="23" r="3.5"/><circle cx="41" cy="23" r="3.5"/><circle cx="32" cy="32" r="3.5"/><circle cx="23" cy="41" r="3.5"/><circle cx="41" cy="41" r="3.5"/></g>`],
  ['Trophy', (g) => `<g fill="${g}"><path d="M20 11h24v14a12 12 0 0 1-24 0z"/><path fill="none" stroke="${g}" stroke-width="4" d="M20 16h-6v4a7 7 0 0 0 8 7M44 16h6v4a7 7 0 0 1-8 7"/><rect x="29" y="36" width="6" height="9"/><rect x="21" y="45" width="22" height="7" rx="2"/></g>`]
];
const ICON_COUNT = ICON_DRAW.length; // 32
function iconSVG(i, size = 40) {
  i = ((+i || 0) % ICON_COUNT + ICON_COUNT) % ICON_COUNT;
  const bg = ICON_BG[i % ICON_BG.length];
  const light = bg === '#ffd23f' || bg === '#3ddc97' || bg === '#2ec4b6';
  const g = light ? '#1a1238' : '#ffffff', d = light ? '#ffffff' : '#1a1238';
  return `<svg class="picon" width="${size}" height="${size}" viewBox="0 0 64 64" role="img" aria-label="${ICON_DRAW[i][0]}"><rect width="64" height="64" rx="16" fill="${bg}"/>${ICON_DRAW[i][1](g, d)}</svg>`;
}
function myIcon() {
  try { const v = localStorage.getItem('quick_icon'); if (v !== null) return +v; } catch (e) {}
  const r = Math.floor(Math.random() * ICON_COUNT);
  try { localStorage.setItem('quick_icon', r); } catch (e) {}
  return r;
}
// Fill an element with the 32 icons; clicking one saves it as yours.
function iconPicker(el, onPick) {
  let cur = myIcon();
  el.classList.add('ipick');
  el.innerHTML = Array.from({ length: ICON_COUNT }, (_, i) =>
    `<button type="button" data-i="${i}" class="${i === cur ? 'on' : ''}" title="${ICON_DRAW[i][0]}">${iconSVG(i, 40)}</button>`).join('');
  el.onclick = e => {
    const b = e.target.closest('button[data-i]'); if (!b) return;
    cur = +b.dataset.i;
    try { localStorage.setItem('quick_icon', cur); } catch (e2) {}
    [...el.children].forEach(c => c.classList.toggle('on', c === b));
    if (onPick) onPick(cur);
  };
}

// Waiting lobby for players: pick an icon while you wait; a big card shows your choice.
function waitingLobby(el, name, status, onPick) {
  const e = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  el.innerHTML = `<div class="wl">
    <div class="wl-bar"><span class="wl-me">${e(name)}</span><b>Waiting in Lobby</b><span></span></div>
    <div class="wl-body">
      <div class="wl-grid"></div>
      <div class="wl-side">
        <div class="wl-card"><div class="wl-big"></div><div class="wl-name"></div></div>
        <div class="wl-status"><span class="dot"></span><span class="wl-text">${e(status)}</span></div>
      </div>
    </div></div>`;
  const big = el.querySelector('.wl-big'), nm = el.querySelector('.wl-name');
  const paint = (i) => { big.innerHTML = iconSVG(i, 200); nm.textContent = ICON_DRAW[i][0]; big.classList.remove('pop'); void big.offsetWidth; big.classList.add('pop'); };
  iconPicker(el.querySelector('.wl-grid'), (i) => { paint(i); if (onPick) onPick(i); });
  paint(myIcon());
  return { status: (t) => { el.querySelector('.wl-text').textContent = t; } };
}
