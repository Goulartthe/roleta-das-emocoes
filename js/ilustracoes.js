/* =========================================================
   ilustracoes.js — as 50 ilustrações das cartas de regulação.
   Estilo "figurinha": contorno escuro, cores alegres, borda branca
   de adesivo e crianças com tons de pele variados. Cada cena segue
   o campo "ilustracao" de CARTAS_REGULACAO (data.js).
   Tudo é SVG gerado aqui (offline, igual em qualquer aparelho).
   Uso: Ilustracoes.svg('raiva', 1)  →  '<svg ...>'  (conteúdo fixo)
   ========================================================= */

const Ilustracoes = (function () {
  const L = '#2B2238';                                     // contorno
  const PELE = ['#FCD9BD', '#EDB98C', '#D29A6A', '#B07344', '#86552F', '#5E3A22'];
  const CAB = { preto: '#231812', castanho: '#5B3A1F', ruivo: '#C0592B', loiro: '#E8BC50', escuro: '#15110F', grisalho: '#B8B2AA' };
  const FUNDO = { raiva: '#FFE1D8', alegria: '#FFF0BA', tristeza: '#D9E8FF', medo: '#E9E0FF', nojo: '#DBF2DF' };

  /* ---------- primitivas ---------- */
  function n(v) { return Math.round(v * 10) / 10; }
  function tr(x, y, s, rot) { return 'translate(' + n(x) + ' ' + n(y) + ')' + (s && s !== 1 ? ' scale(' + s + ')' : '') + (rot ? ' rotate(' + rot + ')' : ''); }
  function g(t, c) { return '<g transform="' + t + '">' + c + '</g>'; }
  function p(d, f, w) { return '<path d="' + d + '" fill="' + (f || 'none') + '" stroke="' + L + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
  function lin(d, w, cor, op) { return '<path d="' + d + '" fill="none" stroke="' + (cor || L) + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + (op ? ' opacity="' + op + '"' : '') + '/>'; }
  function c(x, y, r, f, w) { return '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + r + '" fill="' + f + '" stroke="' + L + '" stroke-width="' + (w === undefined ? 2 : w) + '"/>'; }
  function e(x, y, rx, ry, f, w) { return '<ellipse cx="' + n(x) + '" cy="' + n(y) + '" rx="' + rx + '" ry="' + ry + '" fill="' + f + '" stroke="' + L + '" stroke-width="' + (w === undefined ? 2 : w) + '"/>'; }
  function r(x, y, w, h, rx, f, sw) { return '<rect x="' + n(x) + '" y="' + n(y) + '" width="' + w + '" height="' + h + '" rx="' + rx + '" fill="' + f + '" stroke="' + L + '" stroke-width="' + (sw === undefined ? 2 : sw) + '"/>'; }
  function t(x, y, txt, tam, f) { return '<text x="' + x + '" y="' + y + '" font-family="Segoe UI, system-ui, sans-serif" font-size="' + tam + '" font-weight="800" fill="' + f + '" stroke="' + L + '" stroke-width=".9" paint-order="stroke" text-anchor="middle" dominant-baseline="central">' + txt + '</text>'; }
  function sombra(x, y, rx) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + (rx * 0.18) + '" fill="#000" opacity=".1"/>'; }

  /* ---------- rosto ---------- */
  function rosto(tipo) {
    const olhos = e(-4.6, -57, 1.7, 2.1, L, 0) + e(4.6, -57, 1.7, 2.1, L, 0) +
      '<circle cx="-4" cy="-57.8" r=".6" fill="#fff"/><circle cx="5.2" cy="-57.8" r=".6" fill="#fff"/>';
    const boch = '<circle cx="-8.2" cy="-52.5" r="2.4" fill="#FF7E9A" opacity=".55"/><circle cx="8.2" cy="-52.5" r="2.4" fill="#FF7E9A" opacity=".55"/>';
    const fech = lin('M-6.6 -57 Q-4.6 -55 -2.6 -57', 1.8) + lin('M2.6 -57 Q4.6 -55 6.6 -57', 1.8);
    const lagr = function (x) { return p('M' + x + ' -54 q-1.8 2.6 -1.8 3.8 a1.8 1.8 0 0 0 3.6 0 q0 -1.2 -1.8 -3.8z', '#5CB2FF', 1.1); };
    switch (tipo) {
      case 'feliz':   return olhos + boch + lin('M-5 -51.5 Q0 -46.5 5 -51.5', 1.8);
      case 'risada':  return lin('M-6.6 -56.5 Q-4.6 -59.5 -2.6 -56.5', 1.8) + lin('M2.6 -56.5 Q4.6 -59.5 6.6 -56.5', 1.8) + boch +
                             p('M-5.6 -52.5 Q0 -44 5.6 -52.5Z', L, 1.4) + p('M-2.8 -48.2 Q0 -50.4 2.8 -48.2 Q0 -46.2 -2.8 -48.2Z', '#FF7B8A', .8);
      case 'calma':   return fech + boch + lin('M-3.8 -51.4 Q0 -48.6 3.8 -51.4', 1.8);
      case 'sorriFechado': return fech + boch + lin('M-5 -51.8 Q0 -46.4 5 -51.8', 1.8);
      case 'brava':   return lin('M-8 -62.2 L-2.6 -60', 2) + lin('M8 -62.2 L2.6 -60', 2) + olhos + lin('M-4.6 -49.2 Q0 -53 4.6 -49.2', 1.8) +
                             '<circle cx="-8.2" cy="-52.5" r="2.4" fill="#FF4D4D" opacity=".35"/><circle cx="8.2" cy="-52.5" r="2.4" fill="#FF4D4D" opacity=".35"/>';
      case 'triste':  return lin('M-7.6 -60.6 L-2.6 -62.8', 1.8) + lin('M7.6 -60.6 L2.6 -62.8', 1.8) + olhos + lin('M-4.4 -49.4 Q0 -52.6 4.4 -49.4', 1.8);
      case 'chorando': return lin('M-7.6 -60.6 L-2.6 -62.8', 1.8) + lin('M7.6 -60.6 L2.6 -62.8', 1.8) + fech + lin('M-4.4 -49.4 Q0 -52.6 4.4 -49.4', 1.8) + lagr(-5) + lagr(6.2);
      case 'medo':    return lin('M-7.6 -63 Q-4.6 -66.2 -2 -63.6', 1.8) + lin('M7.6 -63 Q4.6 -66.2 2 -63.6', 1.8) +
                             c(-4.6, -57, 2.7, '#fff', 1.4) + c(4.6, -57, 2.7, '#fff', 1.4) + c(-4.6, -56.6, 1.2, L, 0) + c(4.6, -56.6, 1.2, L, 0) + e(0, -50, 2, 2.6, L, 0);
      case 'receio':  return lin('M-7.6 -62 Q-4.6 -64.6 -2 -62.6', 1.8) + lin('M7.6 -62 Q4.6 -64.6 2 -62.6', 1.8) + olhos + lin('M-3.4 -50 Q0 -51.6 3.4 -50', 1.8);
      case 'nojo':    return lin('M-7 -58.6 L-2.6 -56.8 L-7 -55', 1.8) + lin('M7 -58.6 L2.6 -56.8 L7 -55', 1.8) + lin('M-2.2 -53.8 Q0 -55.2 2.2 -53.8', 1.4) +
                             lin('M-5 -49.6 Q-2.5 -52 0 -49.6 Q2.5 -47.2 5 -49.6', 1.8);
      case 'surpresa': return olhos + e(0, -50.2, 2.2, 2.8, L, 0);
      case 'falando': return olhos + boch + p('M-3.6 -51.6 Q0 -51.6 3.6 -51.6 Q3.2 -47.6 0 -47.6 Q-3.2 -47.6 -3.6 -51.6Z', L, 1.2);
      case 'olhaCima': return e(-4.6, -59, 1.7, 2.1, L, 0) + e(4.6, -59, 1.7, 2.1, L, 0) + boch + lin('M-4 -51.4 Q0 -48 4 -51.4', 1.8);
      default:        return olhos + lin('M-3.5 -50.5 L3.5 -50.5', 1.8);
    }
  }

  function cabelo(o) {
    const k = o.cabelo;
    const topo = p('M-13 -57.5 Q-14 -72.5 0 -72.5 Q14 -72.5 13 -57.5 Q9 -64.5 2 -64 Q-6 -66 -13 -57.5Z', k);
    switch (o.estilo) {
      case 'cacheado': return c(-11.5, -62, 5, k) + c(-6.5, -68.5, 6, k) + c(2, -70.5, 6.2, k) + c(9.5, -66.5, 6, k) + c(12.5, -59.5, 4.4, k);
      case 'rabo':     return e(15.5, -60, 4.2, 7.5, k) + topo;
      case 'coque':    return c(0, -73.5, 5.4, k) + topo;
      case 'longo':    return p('M-13 -57 Q-13 -71.5 0 -71.5 Q13 -71.5 13 -57 Q6 -64.5 0 -63.5 Q-6 -64.5 -13 -57Z', k);
      case 'tranca':   return topo + p('M-12 -55 q-4 6 -1 12 q-3 4 0 8', null, 3.2) + lin('M-12 -55 q-4 6 -1 12 q-3 4 0 8', 1.6, k);
      case 'raspado':  return p('M-12.5 -59 Q-12 -71 0 -71 Q12 -71 12.5 -59 Q6 -63 0 -63 Q-6 -63 -12.5 -59Z', k);
      default:         return topo;
    }
  }

  // Poses dos braços (mão esquerda; a direita é espelhada). Ou [x,y] absoluto.
  const POSES = {
    baixo: [-15, -24], cintura: [-14, -28], barriga: [-4.5, -29], peito: [-2, -38], cima: [-17, -64], acena: [-21, -56],
    frente: [-17, -33], abraco: [-1, -33], punho: [-13, -33], aponta: [-25, -41], lado: [-24, -35], boca: [-3, -48]
  };
  function braco(x1, y1, x2, y2, cor, punho) {
    const mx = (x1 + x2) / 2 + (x2 < x1 ? -2 : 2), my = (y1 + y2) / 2 + 3;
    const d = 'M' + n(x1) + ' ' + n(y1) + ' Q' + n(mx) + ' ' + n(my) + ' ' + n(x2) + ' ' + n(y2);
    return '<path d="' + d + '" fill="none" stroke="' + L + '" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="' + d + '" fill="none" stroke="' + cor + '" stroke-width="4.8" stroke-linecap="round"/>' +
      c(x2, y2, punho ? 4.3 : 3.3, cor, 1.8) + (punho ? lin('M' + n(x2 - 2) + ' ' + n(y2 - 1) + ' l3 0', 1.1) : '');
  }
  function bracoPose(pose, lado, pele) {
    if (!pose) return '';
    const fim = Array.isArray(pose) ? pose : [-lado * POSES[pose][0], POSES[pose][1]];
    return braco(10 * lado, -40, fim[0], fim[1], pele, pose === 'punho');
  }

  /* ---------- criança (pés em y=0 no sistema local) ---------- */
  function crianca(o) {
    o = Object.assign({ x: 60, y: 104, s: 1, pele: PELE[0], cabelo: CAB.castanho, estilo: 'curto', roupa: '#4D96FF', calca: '#3F4C6B',
      rosto: 'feliz', be: 'baixo', bd: 'baixo', sentada: false, giro: 0 }, o);
    let s = '';
    if (o.estilo === 'longo') s += p('M-14 -55 Q-16 -74 0 -74 Q16 -74 14 -55 L16 -37 L-16 -37Z', o.cabelo);
    if (o.capa) s += p('M-10 -43 Q-24 -20 -21 -6 L21 -6 Q24 -20 10 -43Z', o.capa);
    if (o.sentada) {
      s += e(0, -14, 17, 7.5, o.calca) + e(-14, -10, 4.6, 2.8, L, 0) + e(14, -10, 4.6, 2.8, L, 0);
    } else if (o.pulo) {
      s += p('M-7 -22 L-11 -6 L-6 -5 L-1 -22Z', o.calca) + p('M1 -22 L6 -5 L11 -6 L7 -22Z', o.calca) + e(-9, -4.6, 4.8, 2.5, L, 0) + e(9, -4.6, 4.8, 2.5, L, 0);
    } else if (o.passo) {
      s += p('M-7 -22 L-13 -2 L-7.5 -1.5 L-1 -22Z', o.calca) + p('M1 -22 L6 -2 L11.5 -2 L7 -22Z', o.calca) + e(-11, -1, 5, 2.6, L, 0) + e(9.5, -1, 5, 2.6, L, 0);
    } else {
      s += p('M-7 -22 L-7 -2 L-2 -2 L-1 -22Z', o.calca) + p('M1 -22 L2 -2 L7 -2 L7 -22Z', o.calca) + e(-5, -1, 5, 2.6, L, 0) + e(5, -1, 5, 2.6, L, 0);
    }
    s += p('M-11 -43 Q0 -47 11 -43 L13.5 -20 Q0 -17.5 -13.5 -20Z', o.roupa);
    if (o.barriga) s += e(0, -31, 15.5, 12, o.roupa) + lin('M-6 -36 q3 -2 6 0', 1.2, '#fff', .7);
    if (o.colo) s += o.colo;                       // algo segurado contra o corpo (antes dos braços)
    s += bracoPose(o.be, -1, o.pele) + bracoPose(o.bd, 1, o.pele);
    if (o.maos) s += o.maos;                       // algo nas mãos (depois dos braços)
    s += c(0, -57, 13, o.pele) + cabelo(o) + rosto(o.rosto);
    if (o.fones) s += lin('M-13.5 -58 Q-14 -75 0 -75 Q14 -75 13.5 -58', 2.6) + r(-17, -62, 6, 10, 3, '#FF5D8F', 1.8) + r(11, -62, 6, 10, 3, '#FF5D8F', 1.8);
    return g(tr(o.x, o.y, o.s, o.giro), s);
  }
  function adulto(o) { return crianca(Object.assign({ s: 1.32, roupa: '#6C63FF', calca: '#34405A' }, o)); }

  // Só a cabeça (para "rostos queridos" e comparações), centrada em (x,y).
  function cabeca(x, y, s, o) {
    o = Object.assign({ pele: PELE[0], cabelo: CAB.castanho, estilo: 'curto', rosto: 'feliz' }, o);
    let in_ = '';
    if (o.estilo === 'longo') in_ += p('M-14 -55 Q-16 -74 0 -74 Q16 -74 14 -55 L15 -44 L-15 -44Z', o.cabelo);
    in_ += c(0, -57, 13, o.pele) + cabelo(o) + rosto(o.rosto);
    return g(tr(x, y, s) + ' translate(0 57)', in_);
  }

  /* ---------- objetos ---------- */
  function coracao(x, y, s, cor) { return g(tr(x, y, s), p('M0 6 C-9 0 -9 -7 -4 -7 C-1.5 -7 0 -5 0 -3.5 C0 -5 1.5 -7 4 -7 C9 -7 9 0 0 6Z', cor || '#FF5C7A', 1.6)); }
  function estrela(x, y, s, cor) { return g(tr(x, y, s), p('M0 -7 L2 -2.2 L7 -2 L3.2 1.3 L4.4 6.4 L0 3.6 L-4.4 6.4 L-3.2 1.3 L-7 -2 L-2 -2.2Z', cor || '#FFD23F', 1.5)); }
  function brilho(x, y, s, cor) { return g(tr(x, y, s), p('M0 -6 Q1 -1 6 0 Q1 1 0 6 Q-1 1 -6 0 Q-1 -1 0 -6Z', cor || '#FFD23F', 1.3)); }
  function nota(x, y, s, cor) { return g(tr(x, y, s), e(-2.2, 4, 3.2, 2.4, cor || '#7B61FF', 1.4) + p('M0.9 4 L0.9 -6.5 L6.5 -4.5', null, 1.7)); }
  function sol(x, y, s, cara) {
    let raios = '';
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; raios += lin('M' + n(Math.cos(a) * 11) + ' ' + n(Math.sin(a) * 11) + ' L' + n(Math.cos(a) * 15) + ' ' + n(Math.sin(a) * 15), 2.2, '#FFB703'); }
    const rostoSol = cara ? '<circle cx="-3" cy="-1.5" r="1.1" fill="' + L + '"/><circle cx="3" cy="-1.5" r="1.1" fill="' + L + '"/>' + lin('M-3.4 2 Q0 5 3.4 2', 1.4) : '';
    return g(tr(x, y, s), raios + c(0, 0, 8.5, '#FFD23F') + rostoSol);
  }
  function nuvem(x, y, s, cor) { return g(tr(x, y, s), p('M-12 4 Q-16 -3 -8.5 -4 Q-6.5 -10.5 0 -9.5 Q6.5 -12.5 9.5 -5 Q16 -5 13 4Z', cor || '#fff', 1.6)); }
  function arvore(x, y, s) { return g(tr(x, y, s), r(-2.6, -2, 5.2, 16, 1.5, '#9A6232', 1.6) + c(-6.5, -4, 6.5, '#5BBF6A') + c(6.5, -4, 6.5, '#5BBF6A') + c(0, -10, 9, '#6CCB78')); }
  function flor(x, y, s, cor) {
    let pet = '';
    for (let i = 0; i < 5; i++) { const a = i * 72 * Math.PI / 180; pet += c(n(Math.cos(a) * 3.6), n(-9 + Math.sin(a) * 3.6), 2.7, cor || '#FF7EB6', 1.2); }
    return g(tr(x, y, s), lin('M0 0 L0 -7', 1.8, '#3E9B4F') + p('M0 -3 q3 -3 5 -1 q-3 2 -5 1z', '#5BBF6A', 1) + pet + c(0, -9, 2, '#FFD23F', 1.1));
  }
  function vela(x, y, s) { return g(tr(x, y, s), r(-3, -10, 6, 12, 1.5, '#F7F3E8', 1.5) + lin('M0 -10 L0 -12.5', 1.2) + p('M0 -19 Q3 -15 0 -12.5 Q-3 -15 0 -19Z', '#FFB703', 1.1)); }
  function ursinho(x, y, s) {
    const m = '#C98B55';
    return g(tr(x, y, s), c(-6.5, -16.5, 3.6, m, 1.6) + c(6.5, -16.5, 3.6, m, 1.6) + e(0, 0, 9, 9.5, m, 1.8) + c(0, -11, 8, m, 1.8) +
      e(0, -8.6, 3.6, 2.8, '#F1D2AE', 1.2) + c(-2.8, -12.4, 1, L, 0) + c(2.8, -12.4, 1, L, 0) + c(0, -9.4, 1, L, 0) + e(0, 1.4, 4.6, 4.6, '#F1D2AE', 1.2));
  }
  function balao(x, y, s, cor) { return g(tr(x, y, s), lin('M0 9 q-3 6 0 12 q3 6 0 10', 1.3) + e(0, 0, 8, 9.5, cor || '#FF5C7A', 1.8) + p('M-2 9.2 L2 9.2 L0 11.4Z', cor || '#FF5C7A', 1.2) + lin('M-3.5 -4.5 q1.5 -2.5 4 -3', 1.3, '#fff', .8)); }
  function giz(x, y, rot, cor) { return g(tr(x, y, 1, rot), r(-2, -9, 4, 12, 1, cor, 1.5) + p('M-2 -9 L0 -13 L2 -9Z', cor, 1.2)); }
  function papel(x, y, w, h, rot, dentro) { return g(tr(x, y, 1, rot), r(-w / 2, -h / 2, w, h, 2, '#FFFFFF', 1.8) + (dentro || '')); }
  function seta(x1, y1, x2, y2, cor) {
    const a = Math.atan2(y2 - y1, x2 - x1), k = 4.6;
    const p1 = [x2 - k * Math.cos(a - .5), y2 - k * Math.sin(a - .5)], p2 = [x2 - k * Math.cos(a + .5), y2 - k * Math.sin(a + .5)];
    return lin('M' + n(x1) + ' ' + n(y1) + ' L' + n(x2) + ' ' + n(y2), 2.6, cor || L) + lin('M' + n(p1[0]) + ' ' + n(p1[1]) + ' L' + n(x2) + ' ' + n(y2) + ' L' + n(p2[0]) + ' ' + n(p2[1]), 2.6, cor || L);
  }
  function fala(x, y, w, h, px, py, dentro, cor) {
    const bx = Math.max(x + 6, Math.min(x + w - 12, px - 4));
    return p('M' + n(bx) + ' ' + n(y + h - 1) + ' L' + n(px) + ' ' + n(py) + ' L' + n(bx + 8) + ' ' + n(y + h - 1) + 'Z', cor || '#fff', 1.8) +
      r(x, y, w, h, 7, cor || '#fff', 1.8) + lin('M' + n(bx + 1.2) + ' ' + n(y + h) + ' L' + n(bx + 6.8) + ' ' + n(y + h), 2.8, cor || '#fff') + (dentro || '');
  }
  function linhasTexto(x, y, w) { return lin('M' + x + ' ' + y + ' h' + w, 2.2, '#9AA3B5') + lin('M' + x + ' ' + (y + 5) + ' h' + n(w * .7), 2.2, '#9AA3B5'); }
  function maoAberta(x, y, s, cor, rot) {
    let dedos = '';
    [-6, -2, 2, 6].forEach(function (dx, i) { dedos += r(dx - 1.7, -15 + (i === 0 || i === 3 ? 2 : 0), 3.4, 9, 1.7, cor, 1.4); });
    return g(tr(x, y, s, rot), dedos + e(0, -3, 8, 7.5, cor, 1.6) + r(-12, -6, 6, 3.4, 1.7, cor, 1.4) + lin('M-3 -1 q3 2 6 0', 1, L, .5));
  }
  function monstrinho(x, y, s, cor, chapeu, fantasma) {
    const op = fantasma ? ' opacity=".35"' : '';
    const corpo = p('M-12 8 Q-14 -10 0 -12 Q14 -10 12 8 Q9 4 6 8 Q3 4 0 8 Q-3 4 -6 8 Q-9 4 -12 8Z', cor || '#9B6DD6', 1.8);
    const cara = c(-4.5, -3, 3, '#fff', 1.3) + c(4.5, -3, 3, '#fff', 1.3) + c(-4, -2.6, 1.3, L, 0) + c(5, -2.6, 1.3, L, 0) + lin('M-3 3.5 Q0 5.5 3 3.5', 1.4) +
      p('M-1.2 3.9 L0 5.8 L1.2 3.9', '#fff', .9);
    const hat = chapeu ? p('M-5 -11 L1 -24 L6 -10Z', '#FF5D8F', 1.5) + c(1, -24.5, 2, '#FFD23F', 1.2) + c(0, -16, 1, '#fff', 0) + c(3, -13, 1, '#fff', 0) : '';
    return '<g transform="' + tr(x, y, s) + '"' + op + '>' + corpo + cara + hat + '</g>';
  }
  function ondas(x, y, raio, cor) { return lin('M' + (x - raio) + ' ' + y + ' a' + raio + ' ' + raio + ' 0 0 1 ' + (raio * 2) + ' 0', 2, cor, .6) + lin('M' + (x - raio - 7) + ' ' + y + ' a' + (raio + 7) + ' ' + (raio + 7) + ' 0 0 1 ' + (raio * 2 + 14) + ' 0', 2, cor, .35); }
  function confete(lista) {
    return lista.map(function (q, i) {
      const cores = ['#FF5D8F', '#FFD23F', '#4D96FF', '#2EC4B6', '#9B5DE5', '#FF9F1C'];
      return '<rect x="' + q[0] + '" y="' + q[1] + '" width="3.4" height="6" rx="1" fill="' + cores[i % 6] + '" transform="rotate(' + (i * 37 % 90 - 45) + ' ' + q[0] + ' ' + q[1] + ')"/>';
    }).join('');
  }
  function movimento(x, y, lado) { return lin('M' + x + ' ' + y + ' l' + (8 * lado) + ' 0', 2, L, .55) + lin('M' + x + ' ' + (y + 6) + ' l' + (12 * lado) + ' 0', 2, L, .55) + lin('M' + x + ' ' + (y + 12) + ' l' + (7 * lado) + ' 0', 2, L, .55); }
  function badge(x, y, conteudo) { return c(x, y, 8.5, '#fff', 1.8) + conteudo; }

  /* ---------- montagem da cena ---------- */
  function cena(emocao, conteudo) {
    return '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
      '<defs><filter id="adesivo" x="-12%" y="-12%" width="124%" height="124%">' +
      '<feMorphology in="SourceAlpha" operator="dilate" radius="2.2" result="d"/>' +
      '<feFlood flood-color="#FFFFFF"/><feComposite in2="d" operator="in" result="b"/>' +
      '<feOffset in="d" dy="1.6" result="o"/><feFlood flood-color="#2B2238" flood-opacity=".18"/><feComposite in2="o" operator="in" result="sh"/>' +
      '<feMerge><feMergeNode in="sh"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>' +
      '<rect x="0" y="0" width="120" height="120" rx="16" fill="' + FUNDO[emocao] + '"/>' +
      '<circle cx="98" cy="20" r="26" fill="#fff" opacity=".35"/><circle cx="14" cy="104" r="20" fill="#fff" opacity=".3"/>' +
      '<g filter="url(#adesivo)">' + conteudo + '</g></svg>';
  }

  /* ---------- as 50 cenas (ordem = ordem das cartas em data.js) ---------- */
  const CENAS = {
    raiva: [
      // 1 Respiração do balão
      function () { return sombra(58, 105, 22) + crianca({ x: 56, y: 104, s: 1.15, pele: PELE[2], estilo: 'cacheado', cabelo: CAB.preto, roupa: '#FF7A59', rosto: 'calma', be: 'barriga', bd: 'barriga', barriga: true }) +
        balao(97, 30, 1.05, '#FF5C7A') + balao(84, 20, .7, '#FFD23F') + lin('M74 44 q5 -3 10 0', 1.8, L, .6) + lin('M76 50 q4 -2 8 0', 1.8, L, .45); },
      // 2 Apertar e soltar
      function () { return sombra(36, 105, 18) + crianca({ x: 36, y: 104, s: 1.05, pele: PELE[0], estilo: 'curto', cabelo: CAB.castanho, roupa: '#4D96FF', rosto: 'brava', be: 'punho', bd: 'punho' }) +
        seta(60, 60, 74, 60, '#FF7A59') + maoAberta(88, 74, 1.15, PELE[0], -12) + maoAberta(106, 70, 1.15, PELE[0], 14) + brilho(97, 40, .8) + brilho(110, 50, .5, '#fff'); },
      // 3 Contar até dez
      function () {
        const pos = [[18, 86], [13, 64], [18, 42], [31, 23], [50, 12], [70, 12], [89, 23], [102, 42], [107, 64], [102, 86]];
        const cores = ['#FF5D8F', '#FF9F1C', '#FFD23F', '#2EC4B6', '#4D96FF', '#9B5DE5', '#FF5D8F', '#FF9F1C', '#2EC4B6', '#4D96FF'];
        return sombra(60, 106, 18) + crianca({ x: 60, y: 105, s: 1.05, pele: PELE[4], estilo: 'raspado', cabelo: CAB.escuro, roupa: '#2EC4B6', rosto: 'calma' }) +
          pos.map(function (q, i) { return t(q[0], q[1], String(i + 1), i === 9 ? 11 : 12, cores[i]); }).join('');
      },
      // 4 Abraço na almofada
      function () { return sombra(60, 105, 22) + crianca({ x: 60, y: 104, s: 1.18, pele: PELE[3], estilo: 'rabo', cabelo: CAB.preto, roupa: '#9B5DE5', rosto: 'calma', be: 'abraco', bd: 'abraco',
        colo: r(-16, -42, 32, 23, 10, '#FFB4C8', 2) + lin('M-11 -38 l22 0', 1.2, '#fff', .8) + c(0, -30.5, 1.6, '#FF7EB6', 1) }) + coracao(96, 30, .9, '#FF7EB6') + brilho(22, 34, .7); },
      // 5 Cantinho calmo
      function () { return lin('M60 14 L60 70', 1.8, L, .5) + lin('M60 70 L6 98', 1.8, L, .5) + lin('M60 70 L114 98', 1.8, L, .5) +
        e(60, 95, 42, 10, '#FFD6A5') + e(60, 95, 30, 6, '#FFC078', 0) + e(24, 84, 13, 8.5, '#90DBF4') + e(98, 86, 12, 8, '#F4A6C8') +
        crianca({ x: 58, y: 96, s: 1, pele: PELE[1], estilo: 'longo', cabelo: CAB.ruivo, roupa: '#FFC93C', rosto: 'calma', sentada: true }) + ursinho(92, 84, .82) + estrela(28, 30, .7) + estrela(92, 26, .55); },
      // 6 Dizer com palavras
      function () { return sombra(30, 106, 15) + sombra(90, 106, 15) +
        crianca({ x: 30, y: 105, s: .95, pele: PELE[5], estilo: 'cacheado', cabelo: CAB.preto, roupa: '#FF7A59', rosto: 'falando', bd: 'frente' }) +
        crianca({ x: 90, y: 105, s: .95, pele: PELE[1], estilo: 'coque', cabelo: CAB.loiro, roupa: '#4D96FF', rosto: 'feliz' }) +
        fala(6, 6, 50, 24, 30, 44, linhasTexto(14, 14, 32)) + fala(66, 14, 46, 20, 88, 48, c(80, 24, 2, L, 0) + c(89, 24, 2, L, 0) + c(98, 24, 2, L, 0)); },
      // 7 Desenhar a raiva
      function () { return sombra(42, 106, 17) + papel(88, 72, 38, 46, 7, lin('M-12 -12 q8 -8 12 2 q4 10 10 -4 M-12 4 q6 -10 14 0 q6 8 10 -6 M-10 14 q10 -6 20 4', 2.6, '#E5383B')) +
        crianca({ x: 42, y: 105, s: 1.05, pele: PELE[2], estilo: 'curto', cabelo: CAB.preto, roupa: '#2EC4B6', rosto: 'brava', bd: 'aponta' }) + giz(68, 60, 40, '#E5383B') + giz(100, 104, -60, '#FF9F1C'); },
      // 8 Pedir ajuda (de mãos dadas, sentados)
      function () { return r(10, 84, 100, 7, 3, '#C98A57') + r(16, 91, 5, 13, 2, '#A86D3F') + r(99, 91, 5, 13, 2, '#A86D3F') +
        adulto({ x: 80, y: 90, s: 1.25, pele: PELE[3], estilo: 'curto', cabelo: CAB.escuro, roupa: '#6C63FF', rosto: 'calma', sentada: true, be: [-12, -10] }) +
        crianca({ x: 40, y: 90, s: 1, pele: PELE[0], estilo: 'longo', cabelo: CAB.castanho, roupa: '#FF9F1C', rosto: 'feliz', sentada: true, bd: [19, -13] }) + coracao(60, 40, .8); },
      // 9 Mexer o corpo
      function () { return sombra(60, 106, 16) + crianca({ x: 60, y: 92, s: 1.08, pele: PELE[4], estilo: 'coque', cabelo: CAB.escuro, roupa: '#FF5D8F', rosto: 'risada', be: 'cima', bd: 'cima', pulo: true }) +
        movimento(30, 70, -1) + movimento(90, 70, 1) + brilho(24, 30, .9, '#FF9F1C') + brilho(98, 28, .9, '#FF9F1C') + brilho(16, 54, .6) + brilho(106, 52, .6) + lin('M48 102 l-4 4 M60 103 l0 5 M72 102 l4 4', 2, L, .5); },
      // 10 Esfriar o vulcão
      function () { return p('M6 106 L30 48 L54 48 L80 106Z', '#B56A3A', 2) + p('M30 48 L54 48 L50 58 Q42 62 34 58Z', '#7EC8E3', 1.8) + lin('M36 70 l-3 10 M48 72 l3 8', 1.6, '#7EC8E3') +
        nuvem(42, 34, .8, '#DCEBF5') + nuvem(32, 20, .55, '#E9F3F9') + nuvem(52, 14, .45, '#F3F8FB') +
        sombra(98, 106, 12) + crianca({ x: 98, y: 105, s: .85, pele: PELE[1], estilo: 'curto', cabelo: CAB.ruivo, roupa: '#4D96FF', rosto: 'calma', be: 'barriga', bd: 'barriga' }) +
        lin('M84 52 q-6 -3 -12 0', 1.8, '#4D96FF', .7) + lin('M84 58 q-6 -2 -12 0', 1.8, '#4D96FF', .5); }
    ],
    alegria: [
      // 1 Guardar o momento
      function () { return sombra(60, 105, 20) + crianca({ x: 60, y: 104, s: 1.18, pele: PELE[1], estilo: 'longo', cabelo: CAB.preto, roupa: '#FFB703', rosto: 'sorriFechado', bd: 'peito' }) +
        brilho(26, 30, 1) + brilho(96, 26, .8) + brilho(102, 60, .55, '#FF7EB6') + coracao(22, 62, .7) + coracao(98, 84, .6, '#FF9F1C'); },
      // 2 Compartilhar
      function () { return sombra(34, 106, 15) + sombra(86, 106, 15) +
        crianca({ x: 34, y: 105, s: .98, pele: PELE[3], estilo: 'curto', cabelo: CAB.escuro, roupa: '#4D96FF', rosto: 'falando', bd: 'frente' }) +
        crianca({ x: 86, y: 105, s: .98, pele: PELE[0], estilo: 'rabo', cabelo: CAB.ruivo, roupa: '#F15BB5', rosto: 'feliz', be: 'frente' }) +
        coracao(60, 30, 1.1) + coracao(44, 16, .7, '#FF9F1C') + coracao(76, 16, .7, '#F15BB5') + coracao(60, 52, .55, '#FF7EB6'); },
      // 3 Dançar
      function () { return sombra(58, 106, 18) + crianca({ x: 58, y: 104, s: 1.12, pele: PELE[5], estilo: 'cacheado', cabelo: CAB.preto, roupa: '#00BBF9', rosto: 'risada', be: 'cima', bd: 'lado', giro: -6, passo: true }) +
        nota(22, 34, 1.1) + nota(96, 24, 1, '#FF5D8F') + nota(102, 60, .8, '#2EC4B6') + nota(16, 66, .8, '#FF9F1C') + brilho(84, 44, .6); },
      // 4 Baixar a velocidade
      function () { return sombra(36, 106, 16) + crianca({ x: 36, y: 105, s: 1.02, pele: PELE[2], estilo: 'tranca', cabelo: CAB.castanho, roupa: '#80ED99', rosto: 'calma', be: 'barriga', bd: 'barriga' }) +
        lin('M56 46 q5 -3 10 0', 1.8, '#4D96FF', .7) +
        g(tr(88, 58, 1), p('M-22 6 A22 22 0 0 1 22 6Z', '#fff', 2) + lin('M-18 4 A18 18 0 0 1 -6 -12', 5, '#5BBF6A') + lin('M-6 -12 A18 18 0 0 1 6 -12', 5, '#FFD23F') + lin('M6 -12 A18 18 0 0 1 18 4', 5, '#FF5C5C') +
          lin('M0 4 L-12 -6', 2.6) + c(0, 4, 2.6, L, 0) + lin('M14 -16 Q4 -24 -8 -18', 1.6, L, .6) + p('M-8 -18 l3 -3 l1 4z', L, 1)); },
      // 5 Dizer obrigado
      function () { return sombra(56, 105, 19) + sol(98, 24, 1.05, true) +
        crianca({ x: 56, y: 104, s: 1.12, pele: PELE[2], estilo: 'coque', cabelo: CAB.castanho, roupa: '#80ED99', rosto: 'feliz', be: [-6, -34], bd: [6, -34], maos: coracao(0, -36, 1.05) }) + brilho(22, 40, .7) + brilho(30, 22, .5); },
      // 6 Desenhar o momento feliz
      function () { return sombra(34, 106, 15) + crianca({ x: 34, y: 98, s: 1, pele: PELE[0], estilo: 'cacheado', cabelo: CAB.loiro, roupa: '#F15BB5', rosto: 'feliz', sentada: true, bd: [26, -18] }) +
        papel(82, 78, 46, 34, -4, sol(-12, -6, .55, true) + lin('M2 -10 L8 -4 L14 -10 L20 -4', 1.4) + c(4, -4, 1.2, '#FF5D8F', 0) + c(10, -3, 1.2, '#FFD23F', 0) + c(16, -4, 1.2, '#4D96FF', 0) +
          balao(10, 6, .45, '#FF5C7A') + balao(17, 4, .4, '#4D96FF')) + giz(60, 80, 50, '#FFB703'); },
      // 7 Olhar o outro
      function () { return c(60, 84, 30, '#fff', 0) + sombra(78, 92, 10) + sombra(102, 92, 10) +
        crianca({ x: 78, y: 92, s: .68, pele: PELE[4], estilo: 'curto', cabelo: CAB.escuro, roupa: '#FF9F1C', rosto: 'risada', be: 'cima', bd: 'lado' }) +
        crianca({ x: 102, y: 92, s: .68, pele: PELE[1], estilo: 'rabo', cabelo: CAB.ruivo, roupa: '#9B5DE5', rosto: 'risada', be: 'lado', bd: 'cima' }) + c(90, 66, 4.5, '#FF5C7A', 1.6) +
        sombra(36, 106, 16) + crianca({ x: 36, y: 105, s: 1.02, pele: PELE[2], estilo: 'longo', cabelo: CAB.preto, roupa: '#2EC4B6', rosto: 'feliz' }) +
        lin('M50 40 l6 -4 M52 46 l7 -1', 1.8, '#FF9F1C') + brilho(22, 30, .6); },
      // 8 Caixa de memórias
      function () { return sombra(60, 106, 30) + p('M30 70 L90 70 L86 104 L34 104Z', '#C98A57', 2) + p('M30 70 L20 58 L50 58 L60 70', '#D9A06B', 1.8) + p('M90 70 L100 58 L70 58 L60 70', '#D9A06B', 1.8) +
        g(tr(46, 44, 1, -12), r(-9, -8, 18, 16, 2, '#fff', 1.6) + r(-6.5, -5.5, 13, 9, 1, '#90DBF4', 0) + c(0, -2, 2.4, '#FFD23F', 0)) +
        g(tr(76, 40, 1, 10), r(-9, -8, 18, 16, 2, '#fff', 1.6) + lin('M-5 3 l3 -5 l3 3 l4 -6', 1.4, '#FF5D8F')) +
        estrela(60, 26, 1.1) + estrela(30, 30, .75, '#FF9F1C') + estrela(92, 22, .75, '#2EC4B6') + coracao(62, 52, .7); },
      // 9 Gesto gentil
      function () { return sombra(34, 106, 15) + sombra(88, 106, 15) +
        crianca({ x: 34, y: 105, s: 1, pele: PELE[5], estilo: 'coque', cabelo: CAB.escuro, roupa: '#FF9F1C', rosto: 'feliz', bd: 'aponta', maos: flor(25, -44, 1.2, '#FF5D8F') }) +
        crianca({ x: 88, y: 105, s: 1, pele: PELE[1], estilo: 'curto', cabelo: CAB.loiro, roupa: '#4D96FF', rosto: 'surpresa', be: 'frente' }) + brilho(62, 32, .7) + coracao(74, 24, .6); },
      // 10 Celebrar com calma
      function () { return sombra(60, 106, 26) + crianca({ x: 50, y: 105, s: 1.02, pele: PELE[3], estilo: 'cacheado', cabelo: CAB.preto, roupa: '#9B5DE5', rosto: 'sorriFechado', bd: [12, -36] }) +
        crianca({ x: 72, y: 105, s: 1.02, pele: PELE[0], estilo: 'longo', cabelo: CAB.castanho, roupa: '#FFB703', rosto: 'sorriFechado', be: [-12, -36] }) +
        confete([[18, 20], [30, 36], [44, 14], [62, 24], [80, 12], [96, 30], [106, 16], [14, 50], [104, 52], [88, 44], [36, 54]]); }
    ],
    tristeza: [
      // 1 Pode chorar
      function () { return sombra(42, 102, 18) + crianca({ x: 42, y: 100, s: 1, pele: PELE[1], estilo: 'curto', cabelo: CAB.castanho, roupa: '#4D96FF', rosto: 'chorando', sentada: true }) +
        sombra(90, 106, 16) + adulto({ x: 90, y: 105, s: 1.22, pele: PELE[4], estilo: 'longo', cabelo: CAB.escuro, roupa: '#9B5DE5', rosto: 'calma', be: [-29, -32] }) + coracao(66, 28, .7, '#FF7EB6'); },
      // 2 Pedir um abraço
      function () { return sombra(60, 106, 24) + adulto({ x: 66, y: 105, s: 1.25, pele: PELE[2], estilo: 'coque', cabelo: CAB.preto, roupa: '#2EC4B6', rosto: 'calma', be: null, bd: null }) +
        crianca({ x: 52, y: 105, s: .98, pele: PELE[0], estilo: 'rabo', cabelo: CAB.loiro, roupa: '#FF9F1C', rosto: 'calma', be: [-2, -32], bd: [6, -32] }) +
        braco(53, 54, 40, 70, PELE[2]) + braco(79, 54, 64, 72, PELE[2]) + coracao(98, 30, .8, '#FF7EB6') + coracao(22, 36, .55); },
      // 3 Falar sobre o que dói
      function () { return sombra(36, 106, 16) + crianca({ x: 36, y: 105, s: 1.02, pele: PELE[3], estilo: 'cacheado', cabelo: CAB.escuro, roupa: '#6C9BD2', rosto: 'triste', bd: 'frente' }) +
        g(tr(80, 78, 1.25), p('M0 6 C-9 0 -9 -7 -4 -7 C-1.5 -7 0 -5 0 -3.5 C0 -5 1.5 -7 4 -7 C9 -7 9 0 0 6Z', '#8E8AC4', 1.8) + lin('M0 6 L0 13', 1.6) + r(-4, 13, 8, 6, 1.5, '#5C5A78', 1.4)) +
        fala(62, 10, 50, 26, 80, 64, linhasTexto(70, 18, 34)); },
      // 4 Desenhar a tristeza
      function () { return lin('M76 104 L86 50 M100 104 L90 50', 2.2, '#9A6232') + r(70, 30, 40, 40, 3, '#fff', 2) +
        lin('M76 42 q8 -6 14 2 q6 6 14 -2 M76 52 q10 -6 16 2 q6 6 12 -2 M78 62 q8 -4 14 0', 3, '#4D96FF') + lin('M82 46 q6 -2 10 2', 3, '#1E5FB8') +
        sombra(38, 106, 16) + crianca({ x: 38, y: 105, s: 1.04, pele: PELE[5], estilo: 'longo', cabelo: CAB.preto, roupa: '#90DBF4', rosto: 'calma', bd: [27, -46] }) +
        g(tr(66, 57, 1, 40), r(-1.5, -10, 3, 14, 1, '#C98A57', 1.2) + p('M-2 -10 L0 -15 L2 -10Z', '#4D96FF', 1)) + e(18, 40, 8, 5, '#fff', 1.6) + c(14, 39, 1.8, '#4D96FF', 0) + c(19, 38, 1.8, '#1E5FB8', 0) + c(23, 41, 1.8, '#90DBF4', 0); },
      // 5 Mão no coração
      function () { return '<circle cx="60" cy="58" r="44" fill="#FFF6C9" opacity=".7"/><circle cx="60" cy="58" r="32" fill="#FFF6C9"/>' + sombra(60, 105, 20) +
        crianca({ x: 60, y: 104, s: 1.18, pele: PELE[2], estilo: 'curto', cabelo: CAB.castanho, roupa: '#6C9BD2', rosto: 'calma', bd: 'peito' }) + brilho(24, 34, .7, '#FFE066') + brilho(96, 30, .7, '#FFE066') + coracao(60, 52, .5, '#FF7EB6'); },
      // 6 Lembrar do que é bom
      function () { return sombra(30, 106, 15) + crianca({ x: 30, y: 105, s: .98, pele: PELE[1], estilo: 'rabo', cabelo: CAB.ruivo, roupa: '#6C9BD2', rosto: 'calma' }) +
        c(44, 44, 2.6, '#fff', 1.6) + c(50, 36, 3.6, '#fff', 1.6) +
        p('M54 30 Q50 14 66 12 Q72 2 86 8 Q102 4 106 18 Q118 24 110 36 Q112 50 96 50 L64 50 Q50 48 54 30Z', '#fff', 2) +
        sol(96, 22, .45, true) + arvore(70, 42, .45) + g(tr(86, 46, .35), crianca({ x: 0, y: 0, s: 1, pele: PELE[4], estilo: 'cacheado', cabelo: CAB.preto, roupa: '#FF9F1C', rosto: 'risada', be: 'cima', bd: 'lado' })); },
      // 7 Música calma
      function () { return sombra(58, 102, 20) + crianca({ x: 58, y: 100, s: 1.08, pele: PELE[4], estilo: 'curto', cabelo: CAB.escuro, roupa: '#B8C0FF', rosto: 'calma', sentada: true, fones: true }) +
        '<g opacity=".75">' + nota(24, 40, .95, '#90DBF4') + nota(96, 34, .95, '#B8C0FF') + nota(102, 66, .75, '#90DBF4') + nota(18, 70, .7, '#B8C0FF') + '</g>'; },
      // 8 Ar livre
      function () { return '<rect x="0" y="88" width="120" height="32" fill="#BDE7B8"/>' + nuvem(32, 22, .9) + nuvem(88, 16, 1.05) + sol(104, 40, .55) +
        arvore(14, 88, 1.15) + arvore(104, 92, 1.25) + sombra(60, 106, 16) + crianca({ x: 60, y: 105, s: 1.02, pele: PELE[0], estilo: 'coque', cabelo: CAB.castanho, roupa: '#4D96FF', rosto: 'olhaCima', bd: 'acena' }) + flor(40, 104, .8) + flor(80, 106, .7, '#FFD23F'); },
      // 9 Tristeza é nuvem
      function () { return sol(90, 34, 1.4, true) + sombra(66, 106, 17) + crianca({ x: 66, y: 105, s: 1.04, pele: PELE[3], estilo: 'longo', cabelo: CAB.preto, roupa: '#80ED99', rosto: 'calma' }) +
        nuvem(26, 30, 1.1, '#9AA7C7') + lin('M18 42 l-2 6 M26 44 l-2 6 M34 42 l-2 6', 1.8, '#5CB2FF') + seta(40, 58, 18, 58, '#6C7AA1'); },
      // 10 Quem pode ajudar
      function () { return sombra(60, 106, 16) + crianca({ x: 60, y: 105, s: .98, pele: PELE[2], estilo: 'cacheado', cabelo: CAB.castanho, roupa: '#6C9BD2', rosto: 'feliz' }) +
        cabeca(20, 40, .62, { pele: PELE[5], estilo: 'coque', cabelo: CAB.escuro }) + cabeca(42, 18, .62, { pele: PELE[0], estilo: 'longo', cabelo: CAB.loiro }) +
        cabeca(78, 18, .62, { pele: PELE[3], estilo: 'raspado', cabelo: CAB.preto }) + cabeca(100, 40, .62, { pele: PELE[1], estilo: 'curto', cabelo: CAB.grisalho }) +
        coracao(20, 68, .55) + coracao(100, 68, .55, '#FF9F1C'); }
    ],
    medo: [
      // 1 Respirar flor e vela
      function () { return sombra(60, 105, 20) + crianca({ x: 60, y: 104, s: 1.12, pele: PELE[1], estilo: 'tranca', cabelo: CAB.preto, roupa: '#9B5DE5', rosto: 'calma', be: [-19, -46], bd: [19, -46],
        maos: flor(-19, -46, 1.3, '#FF7EB6') + vela(19, -44, 1.15) }) + lin('M40 34 q-4 -3 -2 -7', 1.6, '#9B5DE5', .6) + lin('M84 34 q5 -2 6 -6', 1.6, '#9B5DE5', .6); },
      // 2 Dar nome ao medo
      function () { return sombra(40, 106, 17) + crianca({ x: 40, y: 105, s: 1.06, pele: PELE[4], estilo: 'cacheado', cabelo: CAB.escuro, roupa: '#FFB703', rosto: 'falando', bd: 'frente' }) +
        fala(58, 14, 48, 24, 66, 50, t(82, 26, '!', 16, '#9B5DE5')) + sombra(92, 106, 9) + monstrinho(92, 96, .62, '#9B6DD6'); },
      // 3 Objeto de conforto
      function () { return p('M60 10 L98 22 Q100 70 60 104 Q20 70 22 22Z', '#D6F0FF', 2.2) + lin('M60 18 L90 28 Q91 66 60 94', 2, '#fff', .8) +
        sombra(60, 104, 18) + crianca({ x: 60, y: 103, s: 1.08, pele: PELE[0], estilo: 'longo', cabelo: CAB.ruivo, roupa: '#FF7EB6', rosto: 'calma', be: 'abraco', bd: 'abraco', colo: ursinho(0, -29, .95) }) +
        brilho(22, 18, .8) + brilho(98, 16, .8) + brilho(104, 56, .55, '#fff'); },
      // 4 Ficar perto de alguém
      function () { return '<rect x="0" y="0" width="120" height="120" rx="16" fill="#3A3570" opacity=".85"/>' + c(98, 22, 9, '#FFF3B0') + c(102, 19, 7.5, '#3A3570', 0) +
        estrela(20, 20, .45, '#FFF3B0') + estrela(44, 12, .35, '#FFF3B0') + estrela(70, 26, .4, '#FFF3B0') +
        sombra(42, 106, 15) + crianca({ x: 42, y: 105, s: 1, pele: PELE[2], estilo: 'curto', cabelo: CAB.preto, roupa: '#FFB703', rosto: 'receio', bd: [17, -26] }) +
        sombra(80, 106, 18) + adulto({ x: 80, y: 105, s: 1.3, pele: PELE[5], estilo: 'coque', cabelo: CAB.escuro, roupa: '#2EC4B6', rosto: 'feliz', be: [-14.5, -20] }); },
      // 5 Passos pequenos
      function () { return p('M44 106 L44 92 L62 92 L62 78 L80 78 L80 64 L98 64 L98 50 L114 50 L114 106Z', '#FFD6A5', 2) + lin('M44 92 h18 M62 78 h18 M80 64 h18', 1.4, '#fff', .9) +
        estrela(106, 36, .9) + sombra(30, 106, 13) +
        crianca({ x: 46, y: 92, s: .9, pele: PELE[3], estilo: 'rabo', cabelo: CAB.castanho, roupa: '#9B5DE5', rosto: 'receio', be: 'cintura', bd: 'frente', passo: true }) + lin('M22 100 q4 -4 8 0', 1.6, L, .5); },
      // 6 Cinco sentidos
      function () {
        const olho = e(0, 0, 5, 3.2, '#fff', 1.4) + c(0, 0, 1.8, '#4D96FF', 1) + c(0, 0, .8, L, 0);
        const ouvido = p('M2 -4 Q-4 -5 -4 1 Q-4 5 0 5 Q2 5 2 2', '#FCD9BD', 1.4);
        const mao = maoAberta(0, 4, .45, '#FCD9BD', 0);
        const nariz = p('M0 -5 Q-3 2 -3 3 Q0 5 3 3', '#FCD9BD', 1.4);
        const boca = p('M-4.5 -1 Q0 -3 4.5 -1 Q0 4.5 -4.5 -1Z', '#FF7B8A', 1.4);
        return sombra(60, 106, 16) + crianca({ x: 60, y: 105, s: 1, pele: PELE[5], estilo: 'curto', cabelo: CAB.escuro, roupa: '#2EC4B6', rosto: 'surpresa' }) +
          badge(18, 34, g(tr(18, 34), olho)) + badge(40, 14, g(tr(40, 14), ouvido)) + badge(80, 14, g(tr(80, 14), mao)) + badge(102, 34, g(tr(102, 34), nariz)) + badge(104, 64, g(tr(104, 64), boca));
      },
      // 7 Frase de coragem
      function () { return sombra(46, 106, 17) + crianca({ x: 46, y: 105, s: 1.08, pele: PELE[1], estilo: 'cacheado', cabelo: CAB.ruivo, roupa: '#4D96FF', rosto: 'feliz', capa: '#E5383B', be: 'cintura', bd: 'cima' }) +
        fala(66, 12, 44, 28, 64, 48, estrela(88, 26, 1.15)) + brilho(22, 28, .6); },
      // 8 Medo bem pequeno
      function () { return sombra(34, 100, 18) + monstrinho(34, 72, 1.7, '#9B6DD6', false, true) + seta(58, 70, 74, 80, '#9B5DE5') +
        sombra(94, 104, 9) + monstrinho(94, 94, .72, '#9B6DD6', true) + confete([[80, 66], [108, 70], [86, 56], [104, 56]]); },
      // 9 Lugar seguro
      function () { return '<circle cx="60" cy="62" r="50" fill="#E3F5FF" stroke="#2B2238" stroke-width="2"/>' + lin('M24 40 q6 -16 22 -22', 2.2, '#fff', .9) +
        sol(84, 30, .65, true) + r(70, 52, 5, 40, 2, '#9A6232', 1.6) + c(72, 46, 14, '#6CCB78') + r(62, 44, 18, 14, 2, '#FFB4A2', 1.8) + p('M60 45 L71 35 L82 45Z', '#E5383B', 1.6) + r(68, 49, 5, 9, 1, '#9A6232', 1.2) +
        crianca({ x: 44, y: 102, s: .88, pele: PELE[4], estilo: 'longo', cabelo: CAB.preto, roupa: '#FFC93C', rosto: 'sorriFechado' }); },
      // 10 O que ajudaria
      function () { return sombra(38, 106, 15) + crianca({ x: 38, y: 105, s: 1, pele: PELE[0], estilo: 'coque', cabelo: CAB.loiro, roupa: '#9B5DE5', rosto: 'falando', bd: 'frente' }) +
        sombra(84, 106, 18) + adulto({ x: 84, y: 105, s: 1.28, pele: PELE[3], estilo: 'curto', cabelo: CAB.grisalho, roupa: '#2EC4B6', rosto: 'feliz', be: 'frente' }) +
        fala(10, 8, 34, 20, 30, 42, c(20, 18, 1.8, L, 0) + c(27, 18, 1.8, L, 0) + c(34, 18, 1.8, L, 0)) + coracao(62, 24, .6); }
    ],
    nojo: [
      // 1 Sinal do corpo
      function () { return sombra(52, 105, 19) + crianca({ x: 52, y: 104, s: 1.15, pele: PELE[2], estilo: 'cacheado', cabelo: CAB.preto, roupa: '#80ED99', rosto: 'nojo', be: 'barriga' }) +
        seta(98, 30, 74, 66, '#2EC4B6') + t(102, 22, '!', 15, '#2EC4B6') + lin('M60 34 q4 -2 6 1 M62 30 q4 -1 6 2', 1.4, L, .55); },
      // 2 Afastar-se
      function () { return sombra(32, 106, 15) + crianca({ x: 32, y: 105, s: 1.02, pele: PELE[0], estilo: 'rabo', cabelo: CAB.castanho, roupa: '#FF9F1C', rosto: 'nojo', be: 'frente', bd: 'frente', giro: -7, passo: true }) +
        movimento(14, 54, -1) + sombra(90, 106, 14) + p('M76 104 Q72 84 84 80 Q88 70 98 76 Q110 78 106 92 Q110 104 100 104Z', '#9BBF4F', 2) +
        c(86, 88, 2.2, '#6E8F2E', 0) + c(98, 94, 2.6, '#6E8F2E', 0) + c(94, 84, 1.6, '#6E8F2E', 0) + t(90, 62, '?', 15, '#2EC4B6'); },
      // 3 Dizer "não gosto"
      function () { return sombra(42, 106, 17) + crianca({ x: 42, y: 105, s: 1.06, pele: PELE[4], estilo: 'curto', cabelo: CAB.escuro, roupa: '#2EC4B6', rosto: 'falando', bd: [20, -56] }) +
        maoAberta(63, 52, 1.05, PELE[4], 8) + fala(66, 10, 46, 24, 70, 44, linhasTexto(74, 18, 30)); },
      // 4 Respirar e pausar
      function () { return ondas(60, 46, 26, '#2EC4B6') + ondas(60, 46, 40, '#80ED99') + sombra(60, 105, 19) +
        crianca({ x: 60, y: 104, s: 1.12, pele: PELE[1], estilo: 'longo', cabelo: CAB.loiro, roupa: '#80ED99', rosto: 'calma', be: 'barriga', bd: 'barriga' }); },
      // 5 Limpar-se
      function () { return crianca({ x: 60, y: 104, s: 1.08, pele: PELE[3], estilo: 'coque', cabelo: CAB.preto, roupa: '#4D96FF', rosto: 'feliz', be: [-6, -30], bd: [6, -30] }) +
        r(18, 76, 84, 28, 6, '#E8F4FA', 2) + p('M30 78 L90 78 Q86 92 60 92 Q34 92 30 78Z', '#BFE3F2', 1.6) + r(74, 56, 6, 20, 2, '#B8C2CC', 1.6) + p('M74 58 L62 58 L62 63 L74 63', '#B8C2CC', 1.6) +
        lin('M64 66 l0 8 M67 68 l0 6', 1.6, '#5CB2FF') + c(40, 60, 4.5, '#fff', 1.4) + c(48, 50, 3.4, '#fff', 1.4) + c(84, 46, 4, '#fff', 1.4) + c(30, 48, 3, '#fff', 1.4) + c(92, 62, 2.6, '#fff', 1.4); },
      // 6 Conhecer aos poucos
      function () { return sombra(28, 106, 14) + crianca({ x: 28, y: 105, s: .95, pele: PELE[5], estilo: 'cacheado', cabelo: CAB.escuro, roupa: '#FFC93C', rosto: 'surpresa', bd: 'frente' }) +
        e(82, 96, 26, 7, '#fff', 2) + e(82, 93, 15, 5, '#9BBF4F', 1.6) + c(76, 91, 2.4, '#E5383B', 1) + c(86, 90, 2.4, '#FFB703', 1) +
        badge(56, 30, g(tr(56, 30), e(0, 0, 5, 3.2, '#fff', 1.3) + c(0, 0, 1.6, L, 0))) + seta(66, 30, 76, 30) +
        badge(86, 30, g(tr(86, 30), p('M0 -5 Q-3 2 -3 3 Q0 5 3 3', '#FCD9BD', 1.3))) + seta(96, 30, 106, 30, '#9AA3B5'); },
      // 7 Cada um sente diferente
      function () { return sombra(24, 106, 13) + sombra(96, 106, 13) +
        crianca({ x: 24, y: 105, s: .92, pele: PELE[0], estilo: 'longo', cabelo: CAB.ruivo, roupa: '#80ED99', rosto: 'nojo', be: 'frente' }) +
        crianca({ x: 96, y: 105, s: .92, pele: PELE[4], estilo: 'curto', cabelo: CAB.preto, roupa: '#FF9F1C', rosto: 'risada', bd: 'frente' }) +
        r(48, 78, 24, 26, 3, '#fff', 2) + p('M51 80 L69 80 L67 102 L53 102Z', '#9BBF4F', 1.4) + lin('M54 86 q3 -2 6 0 q3 2 6 0', 1.4, '#6E8F2E') +
        t(36, 30, '?', 13, '#2EC4B6') + coracao(86, 30, .75); },
      // 8 Pedir ajuda
      function () { return sombra(30, 106, 14) + crianca({ x: 30, y: 105, s: .96, pele: PELE[2], estilo: 'tranca', cabelo: CAB.castanho, roupa: '#F15BB5', rosto: 'nojo', bd: 'aponta' }) +
        p('M50 104 Q48 94 56 92 Q60 86 66 90 Q74 92 70 104Z', '#9BBF4F', 1.8) + c(58, 97, 1.6, '#6E8F2E', 0) +
        sombra(94, 106, 16) + adulto({ x: 94, y: 105, s: 1.26, pele: PELE[0], estilo: 'curto', cabelo: CAB.castanho, roupa: '#4D96FF', rosto: 'feliz', be: 'frente', passo: true }) + movimento(108, 44, 1); },
      // 9 Trocar de lugar
      function () { return r(4, 14, 46, 80, 6, '#E8D8C3', 2) + r(70, 14, 46, 80, 6, '#F4FFF6', 2) +
        c(16, 80, 3, '#9BBF4F', 1.2) + c(32, 70, 2.4, '#A86D3F', 1.2) + p('M12 40 l8 6 l-6 4', null, 1.6) + r(26, 34, 10, 7, 1, '#FF7A59', 1.4) + c(40, 84, 3.6, '#A86D3F', 1.2) +
        brilho(84, 30, .7) + brilho(104, 44, .55) + flor(96, 88, .8, '#FF7EB6') + seta(48, 104, 74, 104, '#2EC4B6') +
        crianca({ x: 62, y: 100, s: .82, pele: PELE[3], estilo: 'cacheado', cabelo: CAB.preto, roupa: '#80ED99', rosto: 'feliz', passo: true, be: 'frente' }); },
      // 10 Nojo ou medo?
      function () { return c(32, 62, 26, '#C9EFC4', 2) + c(88, 62, 26, '#E2D9FF', 2) +
        cabeca(32, 64, 1.55, { pele: PELE[1], estilo: 'curto', cabelo: CAB.castanho, rosto: 'nojo' }) + cabeca(88, 64, 1.55, { pele: PELE[4], estilo: 'cacheado', cabelo: CAB.escuro, rosto: 'medo' }) +
        t(60, 100, '≠', 16, '#fff'); }
    ]
  };

  return {
    /** SVG da carta (emoção, número 1–10). */
    svg: function (emocao, numero) {
      const lista = CENAS[emocao] || [];
      const fn = lista[numero - 1];
      return fn ? cena(emocao, fn()) : cena(emocao, '');
    },
    total: function () { return Object.keys(CENAS).reduce(function (s, k) { return s + CENAS[k].length; }, 0); }
  };
})();
