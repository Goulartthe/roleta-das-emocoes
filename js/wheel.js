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
   * opcoes (opcional, vem do arraste): { sentido: 1 horário | -1 anti-horário,
   * forca: 0..1 conforme a velocidade do gesto }.
   */
  function girar(roda, aoTerminar, opcoes) {
    if (estado.girando) return;
    estado.girando = true;
    const meuGiro = ++giroAtivo;
    opcoes = opcoes || {};

    const indice = sortearIndice();   // sorteia ANTES: a seta sempre coincide (RF04)
    const reduzido = movimentoReduzido();
    const arraste = typeof opcoes.forca === 'number';
    const sentido = opcoes.sentido < 0 ? -1 : 1;
    const duracao = reduzido ? 800 : (arraste ? Math.round(4000 + 2500 * opcoes.forca) : 6000);
    const voltas = reduzido ? 1 : (arraste ? 2 + Math.round(opcoes.forca * 4)             // 2 a 6
                                           : 4 + Math.floor(Math.random() * 3));          // 4 a 6
    const desvio = (Math.random() * 50) - 25;                         // ±25° dentro da fatia
    const alvo = mod(-(indice * FATIA + desvio), 360);
    // Parte da posição atual (que pode ter vindo do arraste) e gira no sentido pedido.
    const nova = sentido > 0
      ? rotacaoAtual + mod(alvo - rotacaoAtual, 360) + voltas * 360
      : rotacaoAtual - mod(rotacaoAtual - alvo, 360) - voltas * 360;

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
   * aoLancar(sentido, forca). Retorna true em consultouClique() se houve
   * arraste, para o clique que vem depois não disparar outro giro.
   */
  function habilitarArraste(roda, aoLancar) {
    let ativo = false, ultimoAngulo = 0, acumulado = 0, percorrido = 0, amostras = [];
    let houveArraste = false;
    roda.style.touchAction = 'none'; // no celular, o dedo gira a roda em vez de rolar a página

    function anguloDo(ev) {
      const r = roda.getBoundingClientRect();
      return Math.atan2(ev.clientY - (r.top + r.height / 2), ev.clientX - (r.left + r.width / 2)) * 180 / Math.PI;
    }

    roda.addEventListener('pointerdown', function (ev) {
      if (estado.girando || ev.button > 0) return;
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
      const p = amostras[0], u = amostras[amostras.length - 1];
      const velocidade = (u.a - p.a) / Math.max(16, u.t - p.t); // graus por ms
      const sentido = Math.abs(velocidade) > 0.02 ? Math.sign(velocidade) : (Math.sign(acumulado) || 1);
      const forca = Math.max(0.15, Math.min(1, Math.abs(velocidade) / 1.5));
      aoLancar(sentido, forca);
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
