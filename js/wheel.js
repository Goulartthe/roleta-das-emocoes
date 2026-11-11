/* =========================================================
   wheel.js — desenho da roleta em SVG, sorteio e animação.
   O sorteio acontece ANTES do giro: o ângulo final é calculado
   a partir da emoção sorteada, então a seta sempre coincide.
   ========================================================= */

const Roleta = (function () {
  const RAIO = 110;
  const FATIA = 360 / EMOCOES.length; // 72°
  let rotacaoAtual = 0;               // rotação acumulada da roda (graus)
  let giroAtivo = 0;                  // identifica o giro atual

  function mod(n, m) { return ((n % m) + m) % m; }

  // Ponto na borda, ângulo medido a partir do topo, sentido horário.
  function ponto(angulo, r) {
    const rad = angulo * Math.PI / 180;
    return [(r * Math.sin(rad)).toFixed(3), (-r * Math.cos(rad)).toFixed(3)];
  }

  // Nas fatias da metade de baixo, gira o texto 180° para não ficar de ponta-cabeça.
  function virar(centro, y) {
    return (centro > 90 && centro < 270) ? ' transform="rotate(180 0 ' + y + ')"' : '';
  }

  /** Monta o SVG da roda (dados confiáveis vindos de data.js). */
  function criarSVG() {
    let fatias = '';
    EMOCOES.forEach(function (e, i) {
      const centro = i * FATIA;
      const a = ponto(centro - FATIA / 2, RAIO);
      const b = ponto(centro + FATIA / 2, RAIO);
      fatias +=
        '<g class="fatia" data-indice="' + i + '">' +
          '<path d="M0 0 L' + a[0] + ' ' + a[1] + ' A' + RAIO + ' ' + RAIO + ' 0 0 1 ' + b[0] + ' ' + b[1] + ' Z" ' +
          'fill="' + e.cor + '" style="stroke:var(--superficie)" stroke-width="3"/>' +
          '<g transform="rotate(' + centro + ')">' +
            '<text class="fatia-emoji" x="0" y="-50" text-anchor="middle" dominant-baseline="middle"' + virar(centro, -50) + '>' + e.emoji + '</text>' +
            '<text class="fatia-nome" x="0" y="-86" text-anchor="middle" dominant-baseline="middle" fill="' + e.corTexto + '"' + virar(centro, -86) + '>' + e.nome + '</text>' +
          '</g>' +
        '</g>';
    });
    return '<svg viewBox="-115 -115 230 230" role="img" aria-label="Roleta com cinco emoções: ' +
      EMOCOES.map(function (e) { return e.nome; }).join(', ') + '">' +
      fatias +
      '<circle r="17" style="fill:var(--superficie);stroke:var(--borda)" stroke-width="2"/>' +
      '<circle r="6" style="fill:var(--primario)"/>' +
      '</svg>';
  }

  /** Escolhe o índice respeitando a configuração de repetição. */
  function sortearIndice() {
    const todos = EMOCOES.map(function (_, i) { return i; });
    let permitidos = todos;
    if (!estado.config.repetirEmocoes) {
      permitidos = todos.filter(function (i) { return estado.jaSorteadas.indexOf(EMOCOES[i].id) === -1; });
      if (permitidos.length === 0) {        // esgotou as cinco: reinicia o ciclo
        estado.jaSorteadas = [];
        permitidos = todos;
      }
    }
    return permitidos[Math.floor(Math.random() * permitidos.length)];
  }

  /** Índice da fatia que está sob a seta (topo) para uma rotação. */
  function indiceNaSeta(rotacao) {
    const anguloLocal = mod(-rotacao, 360);
    return Math.floor(mod(anguloLocal + FATIA / 2, 360) / FATIA) % EMOCOES.length;
  }

  function movimentoReduzido() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /** Coloca a roda na posição atual, sem animação (ao renderizar a tela). */
  function posicionar(roda) {
    // Nova tela da roleta: cancela um giro antigo que ficou pela metade.
    giroAtivo++;
    estado.girando = false;
    rotacaoAtual = mod(rotacaoAtual, 360);
    roda.style.transition = 'none';
    roda.style.transform = 'rotate(' + rotacaoAtual + 'deg)';
  }

  /**
   * Gira a roda e chama aoTerminar(indice) quando parar.
   * Ignora cliques enquanto já estiver girando.
   */
  function girar(roda, aoTerminar) {
    if (estado.girando) return;
    estado.girando = true;
    const meuGiro = ++giroAtivo;

    const indice = sortearIndice();
    const reduzido = movimentoReduzido();
    const duracao = reduzido ? 800 : 6000;
    const voltas = reduzido ? 1 : 4 + Math.floor(Math.random() * 3); // 4 a 6
    const desvio = (Math.random() * 50) - 25;                         // ±25° dentro da fatia
    const alvo = mod(-(indice * FATIA + desvio), 360);
    const base = rotacaoAtual - mod(rotacaoAtual, 360);
    const nova = base + voltas * 360 + alvo;

    roda.style.transition = 'transform ' + duracao + 'ms cubic-bezier(0.15, 0.6, 0.2, 1)';
    roda.getBoundingClientRect(); // força o navegador a aplicar a transição
    roda.style.transform = 'rotate(' + nova + 'deg)';
    rotacaoAtual = nova;

    // Tiques que ficam mais lentos até parar.
    const inicio = performance.now();
    let tiqueId = null;
    function tiquear() {
      if (meuGiro !== giroAtivo) return;
      const p = (performance.now() - inicio) / duracao;
      if (p >= 0.95) return;
      Som.tique();
      tiqueId = setTimeout(tiquear, 60 + 400 * p * p);
    }
    if (!reduzido) tiquear();

    let terminou = false;
    function fim() {
      if (terminou) return;
      terminou = true;
      clearTimeout(tiqueId);
      if (meuGiro !== giroAtivo) return; // giro cancelado (saiu da tela)
      estado.girando = false;
      aoTerminar(indiceNaSeta(rotacaoAtual), indice);
    }
    roda.addEventListener('transitionend', fim, { once: true });
    setTimeout(fim, duracao + 400); // segurança, caso o evento não dispare
  }

  return {
    criarSVG: criarSVG,
    girar: girar,
    posicionar: posicionar,
    indiceNaSeta: indiceNaSeta,
    rotacao: function () { return rotacaoAtual; }
  };
})();
