// Lobby waiting music: an original 8-bar loop played with recorded instrument samples.
// Samples (loaded at runtime, CC BY 3.0): Salamander Grand Piano by Alexander Holm;
// electric bass from tonejs-instruments by Nicholaus Brosowsky; acoustic drum kit from the Tone.js audio library.
const Music = (() => {
  let built = false, loading = null, playing = false;
  const PIANO = 'https://tonejs.github.io/audio/salamander/';
  const BASS = 'https://nbrosowsky.github.io/tonejs-instruments/samples/bass-electric/';
  const DRUMS = 'https://tonejs.github.io/audio/drum-samples/acoustic-kit/';
  const isMuted = () => { try { return localStorage.getItem('quick_muted') === '1'; } catch (e) { return false; } };

  // Chords: Fmaj7 - Em7 - Dm7 - Cmaj7 (twice per 8 bars)
  const CHORDS = [['F3', 'A3', 'C4', 'E4'], ['E3', 'G3', 'B3', 'D4'], ['D3', 'F3', 'A3', 'C4'], ['G3', 'B3', 'C4', 'E4']];
  const ROOTS = [['F2', 'C3'], ['E2', 'B2'], ['D2', 'A2'], ['C2', 'G2']];
  const MELODY = [
    // bars 0-3
    ['0:0', 'E5', '8n'], ['0:0:2', 'C5', '8n'], ['0:1', 'A4', '8n'], ['0:2', 'C5', '4n'], ['0:3', 'E5', '8n'],
    ['1:0:2', 'D5', '8n'], ['1:1', 'B4', '4n'], ['1:2:2', 'G4', '8n'], ['1:3', 'B4', '8n'],
    ['2:0', 'A4', '8n'], ['2:0:2', 'C5', '8n'], ['2:1', 'D5', '8n'], ['2:1:2', 'F5', '4n'], ['2:2:2', 'E5', '8n'], ['2:3', 'D5', '8n'],
    ['3:0', 'E5', '2n'], ['3:2:2', 'G4', '8n'], ['3:3', 'C5', '8n'],
    // bars 4-7: same idea, answered higher
    ['4:0', 'G5', '8n'], ['4:0:2', 'E5', '8n'], ['4:1', 'C5', '8n'], ['4:2', 'E5', '4n'], ['4:3', 'G5', '8n'],
    ['5:0:2', 'F5', '8n'], ['5:1', 'D5', '4n'], ['5:2:2', 'B4', '8n'], ['5:3', 'D5', '8n'],
    ['6:0', 'A5', '8n'], ['6:0:2', 'G5', '8n'], ['6:1', 'F5', '8n'], ['6:1:2', 'E5', '8n'], ['6:2', 'D5', '4n'], ['6:3', 'B4', '8n'],
    ['7:0', 'C5', '2n.'], ['7:3', 'G4', '8n']
  ];

  async function build() {
    const T = window.Tone;
    const out = new T.Volume(-3).toDestination();
    const room = new T.Reverb({ decay: 2.2, wet: 0.18 }).connect(out);
    const piano = new T.Sampler({ baseUrl: PIANO, release: 1.2,
      urls: { C2: 'C2.mp3', 'D#2': 'Ds2.mp3', 'F#2': 'Fs2.mp3', A2: 'A2.mp3', C3: 'C3.mp3', 'D#3': 'Ds3.mp3', 'F#3': 'Fs3.mp3', A3: 'A3.mp3',
        C4: 'C4.mp3', 'D#4': 'Ds4.mp3', 'F#4': 'Fs4.mp3', A4: 'A4.mp3', C5: 'C5.mp3', 'D#5': 'Ds5.mp3', 'F#5': 'Fs5.mp3', A5: 'A5.mp3' } }).connect(room);
    const keys = new T.Volume(-7).connect(room); // chords sit under the melody
    const comp = new T.Sampler({ baseUrl: PIANO, release: 0.8,
      urls: { C3: 'C3.mp3', 'D#3': 'Ds3.mp3', 'F#3': 'Fs3.mp3', A3: 'A3.mp3', C4: 'C4.mp3', 'D#4': 'Ds4.mp3' } }).connect(keys);
    const bass = new T.Sampler({ baseUrl: BASS, release: 0.4,
      urls: { E1: 'E1.mp3', G1: 'G1.mp3', 'A#1': 'As1.mp3', 'C#2': 'Cs2.mp3', E2: 'E2.mp3', G2: 'G2.mp3', 'A#2': 'As2.mp3', 'C#3': 'Cs3.mp3' } });
    bass.chain(new T.Volume(-2), out);
    const kit = new T.Players({ kick: DRUMS + 'kick.mp3', snare: DRUMS + 'snare.mp3', hat: DRUMS + 'hihat.mp3' });
    kit.chain(new T.Volume(-8), out);
    kit.player('hat').volume.value = -9;
    await T.loaded();

    T.Transport.bpm.value = 100;
    T.Transport.swing = 0.22;
    T.Transport.swingSubdivision = '8n';

    // drums: one bar, looped
    const beat = [];
    ['0:0', '0:1:2', '0:2'].forEach(t => beat.push([t, 'kick', 0.9]));
    ['0:1', '0:3'].forEach(t => beat.push([t, 'snare', 0.75]));
    for (let i = 0; i < 8; i++) beat.push([`0:${Math.floor(i / 2)}:${(i % 2) * 2}`, 'hat', i % 2 ? 0.35 : 0.6]);
    const drums = new T.Part((time, [name, vel]) => { const p = kit.player(name); p.volume.value = name === 'hat' ? -9 : 0; p.start(time, 0, undefined); }, beat.map(([t, n, v]) => [t, [n, v]]));
    drums.loop = true; drums.loopEnd = '1m';

    // chords + bass: 4 bars, looped
    const harm = [];
    for (let b = 0; b < 4; b++) {
      harm.push([`${b}:0`, { c: CHORDS[b], d: '4n', v: 0.55 }], [`${b}:1:2`, { c: CHORDS[b], d: '8n', v: 0.45 }], [`${b}:2:2`, { c: CHORDS[b], d: '8n', v: 0.5 }]);
      harm.push([`${b}:0`, { n: ROOTS[b][0], d: '8n' }], [`${b}:1:2`, { n: ROOTS[b][0], d: '16n' }], [`${b}:2`, { n: ROOTS[b][1], d: '8n' }], [`${b}:3:2`, { n: ROOTS[b][0], d: '8n' }]);
    }
    const harmony = new T.Part((time, e) => {
      if (e.c) comp.triggerAttackRelease(e.c, e.d, time, e.v);
      else bass.triggerAttackRelease(e.n, e.d, time, 0.85);
    }, harm);
    harmony.loop = true; harmony.loopEnd = '4m';

    const tune = new T.Part((time, [n, d]) => piano.triggerAttackRelease(n, d, time, 0.7), MELODY.map(([t, n, d]) => [t, [n, d]]));
    tune.loop = true; tune.loopEnd = '8m';

    drums.start(0); harmony.start(0); tune.start('1m'); // melody comes in after one bar
    built = true;
  }

  return {
    get muted() { return isMuted(); },
    async start() {
      if (!window.Tone || isMuted()) return;
      try {
        await Tone.start();
        if (!built) { loading = loading || build(); await loading; }
        Tone.Destination.volume.value = -60;
        Tone.Destination.volume.rampTo(0, 1.5);
        if (!playing) { Tone.Transport.start('+0.1'); playing = true; }
      } catch (e) { console.warn('music unavailable', e); }
    },
    stop() {
      if (!window.Tone || !playing) return;
      Tone.Destination.volume.rampTo(-60, 1.2);
      setTimeout(() => { Tone.Transport.stop(); playing = false; }, 1300);
    },
    toggle() {
      const m = !isMuted();
      try { localStorage.setItem('quick_muted', m ? '1' : '0'); } catch (e) {}
      if (m) this.stop(); else this.start();
      return !m; // true = music on
    }
  };
})();
