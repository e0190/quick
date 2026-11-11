// Lobby waiting music: an original 32-bar song (A, B, A, breakdown) played with recorded instrument samples.
// Samples (loaded at runtime, CC BY 3.0): Salamander Grand Piano by Alexander Holm;
// electric bass from tonejs-instruments by Nicholaus Brosowsky; acoustic drum kit from the Tone.js audio library.
const Music = (() => {
  let built = false, loading = null, playing = false;
  const PIANO = 'https://tonejs.github.io/audio/salamander/';
  const BASS = 'https://nbrosowsky.github.io/tonejs-instruments/samples/bass-electric/';
  const DRUMS = 'https://tonejs.github.io/audio/drum-samples/acoustic-kit/';
  const isMuted = () => { try { return localStorage.getItem('quick_muted') === '1'; } catch (e) { return false; } };
  const hum = (v) => Math.max(0.05, Math.min(1, v * (0.88 + Math.random() * 0.2))); // played by hand, not a machine

  // Chord voicings and bass notes [root, fifth]
  const CH = {
    F: [['F3', 'A3', 'C4', 'E4'], ['F2', 'C3']],
    Em: [['E3', 'G3', 'B3', 'D4'], ['E2', 'B2']],
    Dm: [['D3', 'F3', 'A3', 'C4'], ['D2', 'A2']],
    C: [['G3', 'B3', 'C4', 'E4'], ['C2', 'G2']],
    Am: [['G3', 'A3', 'C4', 'E4'], ['A1', 'E2']],
    G7: [['G3', 'B3', 'D4', 'F4'], ['G1', 'D2']],
    Fm6: [['F3', 'G#3', 'C4', 'D4'], ['F2', 'C3']],
    A7: [['G3', 'A3', 'C#4', 'E4'], ['A1', 'E2']]
  };
  // 32 bars: A, B, A, breakdown
  const FORM = [
    'F', 'Em', 'Dm', 'C', 'F', 'Em', 'Dm', 'C',
    'Am', 'Dm', 'G7', 'C', 'F', 'Fm6', 'Em', 'A7',
    'F', 'Em', 'Dm', 'C', 'F', 'Em', 'Dm', 'C',
    'Dm', 'G7', 'Em', 'Am', 'Dm', 'G7', 'C', 'C'
  ];
  const section = (bar) => ['A', 'B', 'A2', 'C'][Math.floor(bar / 8)];

  // Melodies, written per 8 bars as [bar:beat:sixteenth, note, length]
  const MEL_A = [
    ['0:0', 'E5', '8n'], ['0:0:2', 'C5', '8n'], ['0:1', 'A4', '8n'], ['0:2', 'C5', '4n'], ['0:3', 'E5', '8n'],
    ['1:0:2', 'D5', '8n'], ['1:1', 'B4', '4n'], ['1:2:2', 'G4', '8n'], ['1:3', 'B4', '8n'],
    ['2:0', 'A4', '8n'], ['2:0:2', 'C5', '8n'], ['2:1', 'D5', '8n'], ['2:1:2', 'F5', '4n'], ['2:2:2', 'E5', '8n'], ['2:3', 'D5', '8n'],
    ['3:0', 'E5', '2n'], ['3:2:2', 'G4', '8n'], ['3:3', 'C5', '8n'],
    ['4:0', 'G5', '8n'], ['4:0:2', 'E5', '8n'], ['4:1', 'C5', '8n'], ['4:2', 'E5', '4n'], ['4:3', 'G5', '8n'],
    ['5:0:2', 'F5', '8n'], ['5:1', 'D5', '4n'], ['5:2:2', 'B4', '8n'], ['5:3', 'D5', '8n'],
    ['6:0', 'A5', '8n'], ['6:0:2', 'G5', '8n'], ['6:1', 'F5', '8n'], ['6:1:2', 'E5', '8n'], ['6:2', 'D5', '4n'], ['6:3', 'B4', '8n'],
    ['7:0', 'C5', '2n.'], ['7:3', 'G4', '8n']
  ];
  const MEL_B = [
    ['0:0:2', 'E5', '8n'], ['0:1', 'G5', '8n'], ['0:1:2', 'A5', '4n.'], ['0:3', 'G5', '8n'],
    ['1:0', 'F5', '4n'], ['1:1', 'E5', '8n'], ['1:1:2', 'D5', '8n'], ['1:2', 'C5', '2n'],
    ['2:0:2', 'B4', '8n'], ['2:1', 'D5', '8n'], ['2:1:2', 'F5', '8n'], ['2:2', 'G5', '4n'], ['2:3', 'F5', '8n'],
    ['3:0', 'E5', '2n.'],
    ['4:0:2', 'A5', '8n'], ['4:1', 'G5', '8n'], ['4:1:2', 'F5', '8n'], ['4:2', 'E5', '4n'], ['4:3', 'C5', '8n'],
    ['5:0', 'D5', '4n'], ['5:1', 'C5', '8n'], ['5:1:2', 'G#4', '4n'], ['5:3', 'C5', '8n'],
    ['6:0', 'B4', '4n'], ['6:1:2', 'G4', '8n'], ['6:2', 'B4', '8n'], ['6:2:2', 'D5', '4n'],
    ['7:0', 'C#5', '2n'], ['7:2:2', 'E5', '8n'], ['7:3', 'G5', '8n']
  ];
  // the A tune again, answer first
  const MEL_A2 = MEL_A.map(([t, n, d]) => { const [b, ...r] = t.split(':'); return [`${(+b + 4) % 8}:${r.join(':')}`, n, d]; });
  const MEL_C = [
    ['0:0', 'A4', '2n'], ['0:2:2', 'C5', '8n'], ['0:3', 'D5', '8n'],
    ['1:0', 'F5', '2n'], ['1:2:2', 'D5', '4n'],
    ['2:0', 'G5', '2n'], ['2:2:2', 'E5', '4n'],
    ['3:0', 'C5', '1m'],
    ['4:0:2', 'F5', '8n'], ['4:1', 'E5', '8n'], ['4:1:2', 'D5', '8n'], ['4:2', 'C5', '4n'], ['4:3', 'A4', '8n'],
    ['5:0', 'B4', '4n'], ['5:1', 'D5', '8n'], ['5:1:2', 'G5', '4n.'],
    ['6:0', 'E5', '4n'], ['6:1', 'G5', '4n'], ['6:2', 'G5', '8n'], ['6:3', 'E5', '8n'],
    ['7:0', 'C5', '2n.']
  ];
  const shift = (list, bars) => list.map(([t, n, d]) => { const [b, ...r] = t.split(':'); return [`${+b + bars}:${r.join(':')}`, n, d]; });
  const MELODY = [...shift(MEL_A, 0), ...shift(MEL_B, 8), ...shift(MEL_A2, 16), ...shift(MEL_C, 24)];

const pos = (t) => { const p = String(t).split(':'); return p.length === 3 ? p.slice(1).join(':') : t; }; // "0:beat:16th" or "beat:16th" -> "beat:16th"
  function drumBar(bar) {
    const s = section(bar), last = bar % 8 === 7, ev = [];
    const at = (t, name, v) => ev.push([`${bar}:${pos(t)}`, name, v]);
    const hats = (vOn, vOff) => { for (let i = 0; i < 8; i++) at(`${Math.floor(i / 2)}:${(i % 2) * 2}`, 'hat', i % 2 ? vOff : vOn); };
    if (s === 'C' && bar < 28) { // breakdown: just hats, then a soft kick from bar 26
      for (let q = 0; q < 4; q++) at(`${q}:0`, 'hat', 0.45);
      if (bar >= 26) at('0:0', 'kick', 0.6);
      return ev;
    }
    if (s === 'C') { // build back up: four-on-the-floor kick, more each bar
      for (let q = 0; q < 4; q++) at(`${q}:0`, 'kick', 0.75);
      hats(0.55, 0.35);
      if (bar < 31) { at('1:0', 'snare', 0.6); at('3:0', 'snare', 0.6); }
      else for (let i = 0; i < 8; i++) at(`${Math.floor(i / 2)}:${(i % 2) * 2}`, 'snare', 0.3 + i * 0.09); // roll into the top
      return ev;
    }
    if (s === 'B') { at('0:0', 'kick', 0.9); at('2:0', 'kick', 0.8); at('2:2', 'kick', 0.6); }
    else { at('0:0', 'kick', 0.9); at('1:2', 'kick', 0.7); at('2:0', 'kick', 0.85); }
    at('1:0', 'snare', 0.75);
    if (!last) at('3:0', 'snare', 0.75);
    hats(0.6, s === 'B' ? 0.45 : 0.35);
    if (s === 'B' && bar % 2 && !last) at('3:3', 'snare', 0.3); // ghost note
    if (last) { // fill into the next section
      ['3:0', '3:1', '3:2', '3:3'].forEach((t, i) => at(t, i % 2 ? 'tom' : 'snare', 0.55 + i * 0.1));
      at('2:2', 'tom', 0.6);
    }
    return ev;
  }

  function harmonyBar(bar) {
    const s = section(bar), [chord, [root, fifth]] = CH[FORM[bar]], ev = [];
    const c = (t, d, v) => ev.push([`${bar}:${pos(t)}`, { c: chord, d, v }]);
    const b = (t, n, d) => ev.push([`${bar}:${pos(t)}`, { n, d }]);
    const up = (n) => Tone.Frequency(n).transpose(12).toNote();
    if (s === 'A') { c('0:0', '4n', 0.55); c('1:2', '8n', 0.45); c('2:2', '8n', 0.5); }
    if (s === 'A2') { c('0:0', '4n', 0.6); c('1:2', '8n', 0.45); c('2:2', '8n', 0.5); c('3:2', '16n', 0.4); }
    if (s === 'B') { c('0:0', '2n', 0.42); c('2:2', '4n', 0.38); }
    if (s === 'C') { // rippling chord notes
      const notes = [...chord, chord[2], chord[1]];
      for (let i = 0; i < 8; i++) ev.push([`${bar}:${Math.floor(i / 2)}:${(i % 2) * 2}`, { c: [notes[i % notes.length]], d: '8n', v: 0.35 }]);
    }
    if (s === 'A' || s === 'A2') { b('0:0', root, '8n'); b('1:2', root, '16n'); b('2:0', fifth, '8n'); b('3:2', root, '8n'); }
    if (s === 'B') { b('0:0', root, '4n'); b('1:0', fifth, '4n'); b('2:0', up(root), '4n'); b('3:0', fifth, '8n'); b('3:2', root, '8n'); }
    if (s === 'C') { if (bar < 28) b('0:0', root, '1m'); else { b('0:0', root, '8n'); b('1:0', root, '8n'); b('2:0', fifth, '8n'); b('3:0', root, '8n'); } }
    return ev;
  }

  async function build() {
    const T = window.Tone;
    const tr = T.getContext().transport;
    const out = new T.Volume(-3).toDestination();
    const room = new T.Reverb({ decay: 2.2, wet: 0.18 }).connect(out);
    const piano = new T.Sampler({ baseUrl: PIANO, release: 1.2,
      urls: { C2: 'C2.mp3', 'D#2': 'Ds2.mp3', 'F#2': 'Fs2.mp3', A2: 'A2.mp3', C3: 'C3.mp3', 'D#3': 'Ds3.mp3', 'F#3': 'Fs3.mp3', A3: 'A3.mp3',
        C4: 'C4.mp3', 'D#4': 'Ds4.mp3', 'F#4': 'Fs4.mp3', A4: 'A4.mp3', C5: 'C5.mp3', 'D#5': 'Ds5.mp3', 'F#5': 'Fs5.mp3', A5: 'A5.mp3' } }).connect(room);
    const keys = new T.Volume(-7).connect(room); // chords sit under the melody
    const comp = new T.Sampler({ baseUrl: PIANO, release: 0.8,
      urls: { C3: 'C3.mp3', 'D#3': 'Ds3.mp3', 'F#3': 'Fs3.mp3', A3: 'A3.mp3', C4: 'C4.mp3', 'D#4': 'Ds4.mp3', 'F#4': 'Fs4.mp3', A4: 'A4.mp3' } }).connect(keys);
    const bass = new T.Sampler({ baseUrl: BASS, release: 0.4,
      urls: { E1: 'E1.mp3', G1: 'G1.mp3', 'A#1': 'As1.mp3', 'C#2': 'Cs2.mp3', E2: 'E2.mp3', G2: 'G2.mp3', 'A#2': 'As2.mp3', 'C#3': 'Cs3.mp3' } });
    bass.chain(new T.Volume(-2), out);
    const kit = new T.Players({ kick: DRUMS + 'kick.mp3', snare: DRUMS + 'snare.mp3', hat: DRUMS + 'hihat.mp3', tom: DRUMS + 'tom1.mp3' });
    const kitVol = new T.Volume(-8); kit.chain(kitVol, out);
    await T.loaded();

    tr.bpm.value = 100;
    tr.swing = 0.22;
    tr.swingSubdivision = '8n';

    const LOOP = '32m';
    const drumEv = []; for (let b = 0; b < 32; b++) drumEv.push(...drumBar(b));
    const drums = new T.Part((time, [name, vel]) => {
      const p = kit.player(name);
      p.volume.value = (name === 'hat' ? -9 : name === 'tom' ? -4 : 0) + 20 * Math.log10(hum(vel));
      p.start(time);
    }, drumEv.map(([t, n, v]) => [t, [n, v]]));
    const harmEv = []; for (let b = 0; b < 32; b++) harmEv.push(...harmonyBar(b));
    const harmony = new T.Part((time, e) => {
      if (e.c) comp.triggerAttackRelease(e.c, e.d, time, hum(e.v));
      else bass.triggerAttackRelease(e.n, e.d, time, hum(0.85));
    }, harmEv);
    const tune = new T.Part((time, [n, d]) => piano.triggerAttackRelease(n, d, time, hum(0.7)), MELODY.map(([t, n, d]) => [t, [n, d]]));
    for (const p of [drums, harmony, tune]) { p.loop = true; p.loopEnd = LOOP; p.start(0); }
    built = true;
  }

  // state: 'idle' | 'off' | 'loading' | 'blocked' (browser won't allow sound yet) | 'playing' | 'failed'
  let state = 'idle', wanted = false;
  const api = {
    build,
    onchange: null,
    get state() { return state; },
    get muted() { return isMuted(); },
    async start() {
      const set = (s) => { state = s; if (api.onchange) api.onchange(s); };
      if (!window.Tone) return set('failed');
      if (isMuted()) return set('off');
      wanted = true;
      if (state === 'loading' || state === 'playing') return;
      // Must be the first thing in a click: browsers only allow sound right after one.
      let resumed;
      try { resumed = Tone.start(); } catch (e) { resumed = Promise.resolve(); }
      set('loading');
      await Promise.race([resumed.catch(() => {}), new Promise((r) => setTimeout(r, 1500))]);
      if (Tone.context.state !== 'running') return set('blocked'); // try again on the next click
      try {
        if (!built) { loading = loading || build(); await loading; }
      } catch (e) { console.warn('music unavailable', e); loading = null; return set('failed'); }
      if (!wanted || isMuted()) return set('off');
      Tone.Destination.volume.value = -60;
      Tone.Destination.volume.rampTo(0, 1.5);
      if (!playing) { Tone.getContext().transport.start('+0.1'); playing = true; }
      set('playing');
    },
    stop() {
      wanted = false;
      if (state !== 'playing') { state = isMuted() ? 'off' : 'idle'; if (api.onchange) api.onchange(state); }
      if (!window.Tone || !playing) return;
      Tone.Destination.volume.rampTo(-60, 1.2);
      setTimeout(() => { Tone.getContext().transport.stop(); playing = false; }, 1300);
      state = isMuted() ? 'off' : 'idle'; if (api.onchange) api.onchange(state);
    },
    toggle() {
      if (state === 'blocked' || state === 'failed') { this.start(); return true; } // a tap to unlock, not a mute
      const m = !isMuted();
      try { localStorage.setItem('quick_muted', m ? '1' : '0'); } catch (e) {}
      if (m) this.stop(); else this.start();
      return !m; // true = music on
    }
  };
  // If the browser blocked sound, any later click or key press tries again.
  ['pointerdown', 'keydown'].forEach((ev) => document.addEventListener(ev, () => { if (wanted && state === 'blocked') api.start(); }, true));
  return api;
})();
