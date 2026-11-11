/* =========================================================
   audio.js — sons simples gerados com a Web Audio API.
   Sem arquivos de áudio. O contexto só nasce após um clique.
   ========================================================= */

const Som = (function () {
  let ctx = null;
  let ganhoGeral = null;

  /** Cria o AudioContext na primeira ação do usuário. */
  function iniciar() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    ganhoGeral = ctx.createGain();
    ganhoGeral.connect(ctx.destination);
    aplicarVolume();
  }

  /** Atualiza o GainNode conforme a configuração. */
  function aplicarVolume() {
    if (!ganhoGeral) return;
    ganhoGeral.gain.value = estado.config.som ? estado.config.volume : 0;
  }

  /** Toca uma nota curta com envelope suave. */
  function nota(freq, duracao, tipo, intensidade, atraso) {
    if (!ctx || !estado.config.som || estado.config.volume <= 0) return;
    if (ctx.state === 'suspended') ctx.resume();
    const t0 = ctx.currentTime + (atraso || 0);
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = tipo || 'sine';
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(intensidade || 0.3, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + duracao);
    osc.connect(g);
    g.connect(ganhoGeral);
    osc.start(t0);
    osc.stop(t0 + duracao + 0.05);
  }

  return {
    iniciar: iniciar,
    aplicarVolume: aplicarVolume,
    // Tique durante o giro da roleta.
    tique: function () { nota(1200, 0.04, 'triangle', 0.15); },
    // Sino suave ao revelar a emoção.
    sino: function () {
      nota(880, 1.2, 'sine', 0.3);
      nota(1320, 1.0, 'sine', 0.15, 0.08);
    },
    // Toque leve nos botões.
    clique: function () { nota(600, 0.06, 'sine', 0.12); }
  };
})();
