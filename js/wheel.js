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

  /** Índices que podem sair agora, respeitando a configuração de repetição. */
  function indicesPermitidos() {
    const todos = EMOCOES.map(function (_, i) { return i; });
    if (estado.config.repetirEmocoes) return todos;
    const permitidos = todos.filter(function (i) { return estado.jaSorteadas.indexOf(EMOCOES[i].id) === -1; });
    if (permitidos.length === 0) {          // esgotou as cinco: reinicia o ciclo
      estado.jaSorteadas = [];
      return todos;
    }
    return permitidos;
  }

  /** Escolhe o índice respeitando a configuração de repetição. */
  function sortearIndice() {
    const permitidos = indicesPermitidos();
    return permitidos[Math.floor(Math.random() * permitidos.length)];
  }

  /* ---------- Giro por inércia (arraste) ----------
     A roda sai com a MESMA velocidade do gesto e desacelera com atrito
     constante. Distância natural = v² / (2·ATRITO). O resultado é a fatia
     onde ela pararia; só se ajusta poucos graus para não parar na divisória
     (ou para pular uma emoção já sorteada, se a repetição estiver desligada). */
  const ATRITO = 0.0005;          // desaceleração em graus/ms²
  const VEL_MAX = 2.0;            // limite de velocidade do gesto (graus/ms) ≈ 11 voltas no máximo
  const MARGEM_FATIA = 25;        // parar a no máx. 25° do centro da fatia

  function planejarInercia(velocidade) {
    const sentido = velocidade < 0 ? -1 : 1;
    const v0 = Math.min(Math.abs(velocidade), VEL_MAX);
    const natural = (v0 * v0) / (2 * ATRITO);        // graus que percorreria sozinha
    const permitidos = indicesPermitidos();
    // Procura o menor ajuste (de -60° a +360°) que pare dentro de uma fatia permitida.
    let melhor = null;
    for (let ajuste = -60; ajuste < 360; ajuste++) {
      const distancia = natural + ajuste;
      if (distancia < 20) continue;                  // sempre anda um pouquinho
      const local = mod(-(rotacaoAtual + sentido * distancia), 360);
      const indice = Math.floor(mod(local + FATIA / 2, 360) / FATIA) % EMOCOES.length;
      let doCentro = mod(local - indice * FATIA + 180, 360) - 180;
      if (Math.abs(doCentro) > MARGEM_FATIA || permitidos.indexOf(indice) === -1) continue;
      if (!melhor || Math.abs(ajuste) < Math.abs(melhor.ajuste)) melhor = { ajuste: ajuste, distancia: distancia, indice: indice };
    }
    // Tempo para começar exatamente na velocidade do gesto (desaceleração uniforme).
    const duracao = v0 > 0.05 ? (2 * melhor.distancia) / v0 : 500;
    return {
      indice: melhor.indice,
      nova: rotacaoAtual + sentido * melhor.distancia,
      duracao: Math.round(Math.max(400, Math.min(7000, duracao)))
    };
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
   * opcoes (opcional, vem do arraste): { velocidade: graus/ms com sinal
   * (+ horário, − anti-horário) }. Sem opcoes: giro padrão do botão/clique.
   */
  function girar(roda, aoTerminar, opcoes) {
    if (estado.girando) return;
    estado.girando = true;
    const meuGiro = ++giroAtivo;
    opcoes = opcoes || {};

    const reduzido = movimentoReduzido();
    let indice, nova, duracao, curva;

    if (typeof opcoes.velocidade === 'number') {
      // Arraste: inércia sincronizada com o gesto. O resultado é onde a roda para.
      const plano = planejarInercia(opcoes.velocidade);
      indice = plano.indice;
      nova = plano.nova;
      duracao = reduzido ? Math.min(plano.duracao, 800) : plano.duracao;
      curva = 'cubic-bezier(0.333, 0.667, 0.667, 1)'; // desaceleração uniforme (ease-out quadrático)
    } else {
      // Botão/clique: comportamento original, sem mudanças.
      indice = sortearIndice();   // sorteia ANTES: a seta sempre coincide (RF04)
      duracao = reduzido ? 800 : 6000;
      const voltas = reduzido ? 1 : 4 + Math.floor(Math.random() * 3); // 4 a 6
      const desvio = (Math.random() * 50) - 25;                         // ±25° dentro da fatia
      const alvo = mod(-(indice * FATIA + desvio), 360);
      nova = rotacaoAtual + mod(alvo - rotacaoAtual, 360) + voltas * 360;
      curva = 'cubic-bezier(0.15, 0.6, 0.2, 1)';
    }

    roda.style.transition = 'transform ' + duracao + 'ms ' + curva;
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
    // Só o fim da animação de "transform" da PRÓPRIA roda encerra o giro.
    // (A opacidade das fatias também anima e o evento dela "sobe" até a roda.)
    function aoTransicao(e) {
      if (e.target !== roda || e.propertyName !== 'transform') return;
      fim();
    }
    function fim() {
      if (terminou) return;
      terminou = true;
      roda.removeEventListener('transitionend', aoTransicao);
      clearTimeout(tiqueId);
      if (meuGiro !== giroAtivo) return; // giro cancelado (saiu da tela)
      estado.girando = false;
      aoTerminar(indiceNaSeta(rotacaoAtual), indice);
    }
    roda.addEventListener('transitionend', aoTransicao);
    setTimeout(fim, duracao + 400); // segurança, caso o evento não dispare
  }

  /**
   * Permite girar a roda arrastando (mouse ou dedo).
   * Durante o arraste a roda acompanha o ponteiro; ao soltar chama
   * aoLancar(velocidade em graus/ms, com sinal). Retorna true em consultouClique() se houve
   * arraste, para o clique que vem depois não disparar outro giro.
   */
  function habilitarArraste(roda, aoLancar) {
    let ativo = false, ultimoAngulo = 0, acumulado = 0, percorrido = 0, amostras = [];
    let houveArraste = false;
    roda.style.touchAction = 'none'; // no celular, o dedo gira a roda em vez de rolar a página
    roda.addEventListener('dragstart', function (ev) { ev.preventDefault(); });

    function anguloDo(ev) {
      const r = roda.getBoundingClientRect();
      return Math.atan2(ev.clientY - (r.top + r.height / 2), ev.clientX - (r.left + r.width / 2)) * 180 / Math.PI;
    }

    roda.addEventListener('pointerdown', function (ev) {
      if (estado.girando || ev.button > 0) return;
      ev.preventDefault(); // mouse real: evita seleção de texto/arraste nativo que cancelam o gesto
      ativo = true;
      houveArraste = false;
      roda.setPointerCapture(ev.pointerId);
      ultimoAngulo = anguloDo(ev);
      acumulado = 0;
      percorrido = 0;
      amostras = [{ t: performance.now(), a: 0 }];
      roda.style.transition = 'none';
      roda.classList.add('arrastando');
    });

    roda.addEventListener('pointermove', function (ev) {
      if (!ativo) return;
      let d = anguloDo(ev) - ultimoAngulo;
      if (d > 180) d -= 360;
      if (d < -180) d += 360;
      ultimoAngulo += d;
      acumulado += d;
      percorrido += Math.abs(d);
      rotacaoAtual += d;
      roda.style.transform = 'rotate(' + rotacaoAtual + 'deg)';
      const agora = performance.now();
      amostras.push({ t: agora, a: acumulado });
      while (amostras.length > 2 && agora - amostras[0].t > 120) amostras.shift(); // últimos 120ms
    });

    function soltar() {
      if (!ativo) return;
      ativo = false;
      roda.classList.remove('arrastando');
      if (percorrido < 6) return;             // foi só um toque: o clique cuida disso
      houveArraste = true;
      // Velocidade no momento de soltar (graus/ms, com sinal). Se o ponteiro
      // ficou parado antes de soltar (>80ms), a roda sai sem impulso.
      const agora = performance.now();
      const p = amostras[0], u = amostras[amostras.length - 1];
      let velocidade = agora - u.t > 80 ? 0 : (u.a - p.a) / Math.max(16, u.t - p.t);
      if (velocidade === 0) velocidade = 0.0001 * (Math.sign(acumulado) || 1); // mantém o sentido
      aoLancar(velocidade);
    }
    roda.addEventListener('pointerup', soltar);
    roda.addEventListener('pointercancel', soltar);

    return {
      consultouClique: function () { const h = houveArraste; houveArraste = false; return h; }
    };
  }

  return {
    criarSVG: criarSVG,
    girar: girar,
    habilitarArraste: habilitarArraste,
    posicionar: posicionar,
    indiceNaSeta: indiceNaSeta,
    rotacao: function () { return rotacaoAtual; }
  };
})();
