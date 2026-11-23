/* =========================================================
   screens.js — uma função por tela. Cada uma devolve um
   elemento que o app.js coloca dentro de #app.
   Texto digitado pelo usuário entra só como textContent.

   Estrutura visual (estilo SaaS):
   - cabecalhoPagina(): título, descrição e ações da tela
   - painel(): bloco com cabeçalho, corpo e rodapé
   ========================================================= */

/* ---------- Ícones de linha (SVG inline, 24x24) ---------- */
const ICONES = {
  inicio:    '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  ajustes:   '<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
  play:      '<path d="M7 4.5v15l12-7.5z"/>',
  voltar:    '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  avancar:   '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chevron:   '<path d="m9 6 6 6-6 6"/>',
  terminar:  '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  girar:     '<path d="M21 12a9 9 0 1 1-2.6-6.4L21 8M21 3v5h-5"/>',
  outra:     '<path d="M4 7h13l-3-3M20 17H7l3 3"/>',
  check:     '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  pular:     '<path d="m5 5 9 7-9 7zM19 5v14"/>',
  naoSei:    '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.6 2.6 0 1 1 3.6 2.4c-.7.3-1.1.9-1.1 1.6v.3M12 17h.01"/>',
  prefiroNao:'<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>',
  conversa:  '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  resumo:    '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6"/>',
  imprimir:  '<path d="M7 9V3h10v6M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v7H7z"/>',
  info:      '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  limpar:    '<path d="M20 20H9l-5-5 9-9 7 7-7 7M7.5 11.5l5 5"/>',
  escudo:    '<path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
  // Ícones das estratégias
  respiracao:'<path d="M3 8h10a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7"/>',
  pausa:     '<circle cx="12" cy="12" r="9"/><path d="M10 9v6M14 9v6"/>',
  ajuda:     '<circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15.8 14.2A5 5 0 0 1 21 19"/>',
  desenho:   '<path d="M4 20l4-1L19 8l-3-3L5 16zM14 7l3 3"/>',
  lugar:     '<path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3zM5 18v2M19 18v2"/>',
  coracao:   '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  estrela:   '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'
};

/** Ícone da estratégia dentro de um quadrado suave. */
function iconeEstrategia(s, classe) {
  return h('span', { class: 'icone-tile ' + (classe || ''), 'aria-hidden': 'true' },
    icone(s.tipo === 'conversa' ? 'conversa' : s.tipo));
}

/** Silhueta do corpo (carta 1) com regiões clicáveis. */
function figuraCorpo() {
  const f = h('div', { class: 'figura-corpo', 'aria-hidden': 'true' });
  f.innerHTML = '<svg viewBox="0 0 200 340">' +
    '<g class="regiao regiao-bracos" data-id="bracos"><rect x="30" y="100" width="24" height="104" rx="12"/><rect x="146" y="100" width="24" height="104" rx="12"/></g>' +
    '<g class="regiao" data-id="cabeca"><circle cx="100" cy="46" r="34"/></g>' +
    '<g class="regiao" data-id="garganta"><rect x="87" y="80" width="26" height="18" rx="6"/></g>' +
    '<g class="regiao" data-id="peito"><rect x="58" y="98" width="84" height="60" rx="20"/></g>' +
    '<g class="regiao" data-id="barriga"><rect x="62" y="160" width="76" height="54" rx="18"/></g>' +
    '<g class="regiao" data-id="maos"><circle cx="42" cy="218" r="14"/><circle cx="158" cy="218" r="14"/></g>' +
    '<g class="regiao" data-id="pernas"><rect x="66" y="216" width="30" height="110" rx="15"/><rect x="104" y="216" width="30" height="110" rx="15"/></g>' +
    '</svg>';
  return f;
}

function icone(nome) {
  const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  s.setAttribute('viewBox', '0 0 24 24');
  s.setAttribute('class', 'icone');
  s.setAttribute('aria-hidden', 'true');
  s.innerHTML = ICONES[nome]; // conteúdo fixo, definido acima
  return s;
}

/** Cria um elemento. Strings filhas viram nós de texto (seguro). */
function h(tag, props) {
  const el = document.createElement(tag);
  if (props) {
    Object.keys(props).forEach(function (k) {
      const v = props[k];
      if (v === null || v === undefined || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k.indexOf('on') === 0) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : v);
    });
  }
  const filhos = Array.prototype.slice.call(arguments, 2);
  (function anexar(lista) {
    lista.forEach(function (f) {
      if (f === null || f === undefined || f === false) return;
      if (Array.isArray(f)) anexar(f);
      else el.appendChild(typeof f === 'string' ? document.createTextNode(f) : f);
    });
  })(filhos);
  return el;
}

/** Botão com ícone de linha + texto (mín. 64px de altura via CSS). */
function botao(nomeIcone, texto, aoClicar, classe, extras) {
  const props = Object.assign({ type: 'button', class: 'btn ' + (classe || ''), onclick: aoClicar }, extras || {});
  return h('button', props, icone(nomeIcone), h('span', { class: 'btn-texto' }, texto));
}

/** Emoji de conteúdo (ilustração), escondido do leitor de tela. */
function emoji(e, classe) {
  return h('span', { class: 'emoji ' + (classe || ''), 'aria-hidden': 'true' }, e);
}

/** Cabeçalho de página: título + descrição à esquerda, ações à direita. */
function cabecalhoPagina(titulo, descricao, acoes) {
  return h('header', { class: 'pagina-cab' },
    h('div', { class: 'pagina-titulo' },
      h('h1', null, titulo),
      descricao ? h('p', { class: 'pagina-desc' }, descricao) : null),
    acoes && acoes.length ? h('div', { class: 'pagina-acoes' }, acoes) : null);
}

/** Painel com cabeçalho, corpo e rodapé opcionais. */
function painel(opcoes) {
  return h(opcoes.tag || 'section', { class: 'painel ' + (opcoes.classe || '') },
    opcoes.cab ? h('header', { class: 'painel-cab' }, opcoes.cab) : null,
    h('div', { class: 'painel-corpo ' + (opcoes.classeCorpo || '') }, opcoes.corpo),
    opcoes.rodape ? h('footer', { class: 'painel-rodape' }, opcoes.rodape) : null);
}

/** Metadado em fonte monoespaçada (ex.: "01 / 06"). */
function meta(texto) {
  return h('span', { class: 'meta' }, texto);
}

/** Rodapé com Voltar e Terminar (RF11). */
function navegacao(semTerminar) {
  return h('nav', { class: 'rodape-nav', 'aria-label': 'Navegação' },
    botao('voltar', 'Voltar', App.voltar, 'btn-fantasma'),
    semTerminar ? null : botao('terminar', 'Terminar', App.terminar, 'btn-fantasma'));
}

/** Seta da roleta (SVG fixo). */
function seta() {
  const s = h('div', { class: 'seta', 'aria-hidden': 'true' });
  s.innerHTML = '<svg viewBox="0 0 40 44"><path d="M20 42 L4 12 A16 16 0 0 1 36 12 Z"/></svg>';
  return s;
}

/**
 * Grade de opções selecionáveis (aria-pressed).
 * unica = seleção única; opções com "exclusiva" desmarcam as demais.
 */
function gradeOpcoes(opcoes, selecao, unica, conteudo, rotulo, classe) {
  const grade = h('div', {
    class: 'grade-opcoes' + (unica ? ' opcoes-unica' : '') + ' ' + (classe || ''),
    role: 'group', 'aria-label': rotulo || 'Opções'
  });
  const botoes = [];
  function atualizar() {
    botoes.forEach(function (b, k) {
      b.setAttribute('aria-pressed', selecao.has(opcoes[k].id) ? 'true' : 'false');
    });
    if (grade.aoMudar) grade.aoMudar(selecao);
  }
  function alternar(op) {
    const tinha = selecao.has(op.id);
    if (unica || op.exclusiva) {
      selecao.clear();
      if (!tinha) selecao.add(op.id);
    } else {
      opcoes.forEach(function (o) { if (o.exclusiva) selecao.delete(o.id); });
      if (tinha) selecao.delete(op.id); else selecao.add(op.id);
    }
    atualizar();
  }
  opcoes.forEach(function (op) {
    const b = h('button', {
      type: 'button', class: 'opcao' + (op.exclusiva ? ' opcao-larga' : ''),
      onclick: function () { alternar(op); }
    }, h('span', { class: 'opcao-check' }, icone('check')),
       conteudo ? conteudo(op) : h('span', { class: 'opcao-texto' }, op.texto));
    botoes.push(b);
    grade.appendChild(b);
  });
  // Usado pela figura do corpo para marcar uma região pelo id.
  grade.alternarPorId = function (id) {
    const op = opcoes.find(function (o) { return o.id === id; });
    if (op) alternar(op);
  };
  grade.atualizar = atualizar;
  atualizar();
  return grade;
}

/* ---------- Cartas de regulação (carta "Como posso cuidar dessa emoção?") ----------
   Cartinhas de baralho: fundo creme, moldura na cor da emoção, número e
   emoji (imagem da roleta) nos cantos. 4 por vez na "mesa", levemente
   tortas, com animação de dar as cartas. Ao tocar, a carta cresce e vira. */
const CARTAS_POR_VEZ = 4;

function cantoCarta(e, num, classe) {
  return h('span', { class: 'carta-canto ' + classe, 'aria-hidden': 'true' },
    h('b', null, String(num)), h('img', { src: 'img/emocoes/' + e.id + '.png', alt: '' }));
}
function ilustracaoCarta(e, num, classe) {
  const s = h('span', { class: classe, 'aria-hidden': 'true' });
  s.innerHTML = Ilustracoes.svg(e.id, num); // SVG fixo, gerado em ilustracoes.js
  return s;
}
function frenteCarta(e, carta, num) {
  return h('span', { class: 'carta-face carta-frente' },
    cantoCarta(e, num, 'canto-sup'), cantoCarta(e, num, 'canto-inf'),
    ilustracaoCarta(e, num, 'carta-ilus'),
    h('span', { class: 'carta-nome' }, carta.nome));
}

/** Mesa com as 10 cartas da emoção, 4 por vez. selecao = Set de números ('1'..'10'). */
function mesaCartas(e, selecao, notas) {
  const cartas = CARTAS_REGULACAO[e.id] || [];
  const paginas = Math.ceil(cartas.length / CARTAS_POR_VEZ);
  const inclinacoes = [-4, 2.5, -1.5, 3.5];
  let pagina = 0;
  const mesa = h('div', { class: 'mesa', role: 'list', 'aria-label': 'Cartas de cuidado' });
  const contador = meta('');
  function desenhar(animar) {
    mesa.replaceChildren();
    mesa.classList.toggle('sem-animacao', !animar);
    const ini = pagina * CARTAS_POR_VEZ;
    cartas.slice(ini, ini + CARTAS_POR_VEZ).forEach(function (carta, k) {
      const num = ini + k + 1, id = String(num), escolhida = selecao.has(id);
      mesa.appendChild(h('button', {
        type: 'button', role: 'listitem', class: 'carta-reg' + (escolhida ? ' escolhida' : ''),
        style: '--giro:' + inclinacoes[k] + 'deg;--i:' + k,
        'aria-label': carta.nome + (escolhida ? ' (escolhida)' : '') + '. Toque para ver como fazer.',
        onclick: function (ev) { abrirCarta(e, carta, num, selecao, notas, function () { desenhar(false); }, ev.currentTarget); }
      }, frenteCarta(e, carta, num), escolhida ? h('span', { class: 'carta-estrela', 'aria-hidden': 'true' }, icone('estrela')) : null));
    });
    contador.textContent = 'Cartas ' + dd(ini + 1) + '–' + dd(Math.min(ini + CARTAS_POR_VEZ, cartas.length)) + ' de ' + dd(cartas.length);
  }
  const btnOutras = botao('outra', 'Ver outras cartas', function () {
    pagina = (pagina + 1) % paginas;
    desenhar(true);
  }, 'btn-secundario');
  desenhar(true);
  return h('div', { class: 'mesa-area' }, mesa, h('div', { class: 'mesa-acoes' }, contador, btnOutras));
}

/** Carta em destaque: cresce no meio da tela e vira para mostrar o verso. */
function abrirCarta(e, carta, num, selecao, notas, aoMudar, origem) {
  // Espaço de anotação (opcional): aparece quando a carta é escolhida.
  const campoId = 'nota-carta-' + num;
  const campoNota = h('textarea', { id: campoId, class: 'campo verso-nota-campo', rows: '2', maxlength: '300',
    placeholder: 'Ex.: o que a criança contou ou como foi experimentar' });
  campoNota.value = (notas && notas[String(num)]) || '';
  campoNota.addEventListener('input', function () { notas[String(num)] = campoNota.value; });
  const blocoNota = h('div', { class: 'verso-nota', hidden: true },
    h('label', { for: campoId, class: 'verso-rotulo' }, 'Anotação (opcional)'), campoNota);
  const id = String(num);
  const reduzido = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dlg = h('dialog', { class: 'carta-modal', 'aria-label': carta.nome });
  const btnEscolher = botao('estrela', '', function () {
    if (selecao.has(id)) selecao.delete(id); else selecao.add(id);
    atualizar();
  }, 'btn-primario btn-escolher');
  function atualizar() {
    const sim = selecao.has(id);
    btnEscolher.querySelector('.btn-texto').textContent = sim ? 'Escolhida! Tocar desfaz' : 'Quero experimentar';
    btnEscolher.setAttribute('aria-pressed', sim ? 'true' : 'false');
    btnEscolher.classList.toggle('ativo', sim);
    blocoNota.hidden = !sim;
    verso.classList.toggle('com-nota', sim); // verso compacto para caber a anotação
  }
  const verso = h('div', { class: 'carta-face carta-verso' },
    cantoCarta(e, num, 'canto-sup'), cantoCarta(e, num, 'canto-inf'),
    ilustracaoCarta(e, num, 'verso-ilus'),
    h('h2', { class: 'verso-nome' }, carta.nome),
    h('p', { class: 'verso-rotulo' }, 'Como fazer'),
    h('p', { class: 'verso-texto verso-como' }, carta.comoRegular),
    h('p', { class: 'verso-rotulo' }, 'Vamos conversar'),
    h('p', { class: 'verso-texto' }, carta.pergunta),
    blocoNota,
    h('div', { class: 'verso-acoes' }, btnEscolher, botao('voltar', 'Voltar às cartas', function () { dlg.close(); }, 'btn-secundario')));
  const flip = h('div', { class: 'carta-flip' }, frenteCarta(e, carta, num), verso);
  dlg.appendChild(h('div', { class: 'carta-palco' }, flip));
  atualizar();
  document.body.appendChild(dlg);
  dlg.showModal();
  requestAnimationFrame(function () {
    dlg.classList.add('aberta');
    setTimeout(function () { flip.classList.add('virada'); btnEscolher.focus({ preventScroll: true }); }, reduzido ? 0 : 450);
  });
  dlg.addEventListener('click', function (ev) { if (ev.target === dlg) dlg.close(); }); // toque fora fecha
  dlg.addEventListener('close', function () {
    dlg.remove();
    aoMudar();
    if (origem && document.body.contains(origem)) origem.focus();
  });
}

/** Lista de opções de uma carta para a emoção atual. */
function opcoesDaCarta(carta, emocao) {
  if (carta.tipo === 'corpo') return REGIOES_CORPO;
  if (carta.tipo === 'regulacao') {
    return (CARTAS_REGULACAO[emocao.id] || []).map(function (x, k) { return { id: String(k + 1), texto: x.nome }; });
  }
  if (carta.tipo === 'intensidade') return INTENSIDADES;
  if (carta.tipo === 'texto') {
    return emocao.pensamentos.map(function (p, k) { return { id: 'p' + k, emoji: '💭', texto: p }; });
  }
  return emocao[carta.fonte];
}

/** Texto do resumo para a resposta de uma carta. */
function descreverResposta(carta, emocao) {
  const r = estado.respostas[carta.id];
  if (!r) return TEXTOS.status['sem-resposta'];
  if (r.status !== 'respondida') return TEXTOS.status[r.status];
  const ops = opcoesDaCarta(carta, emocao);
  const partes = r.valores
    .map(function (id) { return ops.find(function (o) { return o.id === id; }); })
    .filter(Boolean)
    .map(function (o) { return o.texto; });
  if (r.texto) partes.push((carta.outro ? 'Outra situação: ' : 'Anotação: ') + '"' + r.texto + '"');
  if (r.falado) partes.push('Conversaram sobre isso');
  return partes.length ? partes.join(' · ') : 'Respondida';
}

/** Selo com a cor da emoção (um ponto de cor + nome). */
function chipEmocao(e, classe) {
  return h('span', { class: 'chip-emocao ' + (classe || '') },
    h('span', { class: 'chip-ponto', 'aria-hidden': 'true' }), e.nome);
}

/** Seção do "Sobre" pelo título (reaproveita o conteúdo de data.js). */
function secaoSobre(titulo) {
  return SOBRE.secoes.find(function (s) { return s.titulo === titulo; }) || {};
}

/** Dois dígitos para metadados ("01 / 06"). */
function dd(n) { return (n < 10 ? '0' : '') + n; }

const Telas = {

  /* 1. Início — painel de boas-vindas */
  inicio: function () {
    // A roleta da tela inicial também gira: clicar ou arrastar abre a tela
    // da roleta já girando, na velocidade do gesto.
    const mini = h('div', { class: 'roda roda-mini roda-clicavel', title: 'Clique ou arraste para girar' });
    const arrasteMini = Roleta.habilitarArraste(mini, function (velocidade) {
      App.girarAoAbrir({ velocidade: velocidade });
    });
    mini.addEventListener('click', function () {
      if (arrasteMini.consultouClique()) return; // o arraste já girou
      App.girarAoAbrir({});
    });
    mini.innerHTML = Roleta.criarSVG();
    const comoUsar = secaoSobre('Como usar').lista || [];
    const naoE = secaoSobre('O que não é').texto;
    const privacidade = secaoSobre('Privacidade').texto;

    // Painel de destaque: título + ação à esquerda, roleta inteira à direita
    // (a roleta é dimensionada pela altura da janela para caber sem rolar).
    return h('section', { class: 'tela tela-inicio' },
      h('div', { class: 'inicio-grid' },
        painel({
          classe: 'painel-destaque',
          corpo: h('div', { class: 'inicio-roda' },
            h('div', { class: 'inicio-texto' },
              h('h1', null, TEXTOS.titulo),
              h('p', { class: 'pagina-desc' }, TEXTOS.boasVindas),
              h('div', { class: 'acoes' },
                botao('play', 'Começar atividade', App.brincar, 'btn-primario')),
              h('div', { class: 'inicio-legenda' },
                meta(dd(EMOCOES.length) + ' emoções na roleta'),
                h('ul', { class: 'legenda' },
                  EMOCOES.map(function (e) {
                    return h('li', null,
                      h('span', { class: 'legenda-ponto', style: 'background:' + e.cor, 'aria-hidden': 'true' }),
                      h('span', { class: 'legenda-nome' }, e.nome));
                  })))),
            h('div', { class: 'roleta-area', 'aria-hidden': 'true' }, seta(), mini))
        }),
        h('div', { class: 'coluna' },
          painel({
            cab: [h('h2', null, 'Como funciona'), meta(dd(comoUsar.length) + ' passos')],
            corpo: h('ol', { class: 'passos' },
              comoUsar.map(function (p, k) {
                return h('li', null, h('span', { class: 'passo-num', 'aria-hidden': 'true' }, String(k + 1)), h('span', null, p));
              }))
          }),
          painel({
            cab: [h('h2', null, 'Para o adulto'), h('span', { class: 'icone-pequeno' }, icone('escudo'))],
            corpo: [h('p', null, naoE), h('p', { class: 'nota' }, privacidade)]
          }))));
  },

  /* 2. Roleta */
  roleta: function () {
    const roda = h('div', { class: 'roda' });
    roda.innerHTML = Roleta.criarSVG(); // conteúdo fixo de data.js
    Roleta.posicionar(roda);

    const vazio = h('div', { class: 'vazio' },
      h('span', { class: 'icone-tile' }, icone('girar')),
      h('p', { class: 'vazio-titulo' }, 'Nenhuma emoção sorteada ainda'),
      h('p', { class: 'vazio-desc' }, 'Toque no botão, ou segure e arraste a roleta para girar.'));
    const resultado = h('div', { class: 'resultado', 'aria-live': 'polite' });
    const contador = meta('');
    function atualizarContador() {
      contador.textContent = dd(estado.jaSorteadas.length) + ' / ' + dd(EMOCOES.length) + ' sorteadas';
    }
    atualizarContador();
    const btnContinuar = botao('avancar', 'Conhecer a emoção', function () { App.irPara('emocao'); }, 'btn-primario', { hidden: true });
    // Um único caminho de giro para botão, clique e arraste.
    // opcoesGiro vem do arraste ({ velocidade }); sem ela, giro padrão.
    function girarRoleta(opcoesGiro) {
      if (estado.girando) return;
      btnGirar.disabled = true;
      btnContinuar.hidden = true;
      resultado.replaceChildren();
      resultado.classList.remove('visivel');
      roda.querySelectorAll('.fatia').forEach(function (f) { f.classList.remove('vencedora', 'apagada'); });
      novaRodada();
      Roleta.girar(roda, function (indice) {
        if (estado.tela !== 'roleta') return;  // saiu da tela durante o giro
        const e = EMOCOES[indice];
        estado.emocaoAtual = e.id;
        if (estado.jaSorteadas.indexOf(e.id) === -1) estado.jaSorteadas.push(e.id);
        atualizarContador();
        roda.querySelectorAll('.fatia').forEach(function (f) {
          f.classList.add(Number(f.dataset.indice) === indice ? 'vencedora' : 'apagada');
        });
        Som.sino();
        vazio.hidden = true;
        resultado.style.setProperty('--cor', e.cor);
        resultado.replaceChildren(
          h('span', { class: 'resultado-ilustracao' }, emoji(e.emoji, 'resultado-emoji')),
          h('span', { class: 'resultado-rotulo' }, 'A roleta parou em'),
          h('strong', { class: 'resultado-nome' }, e.nome),
          h('p', { class: 'resultado-frase' }, e.frase));
        resultado.classList.add('visivel');
        btnGirar.disabled = false;
        btnGirar.classList.replace('btn-primario', 'btn-secundario');
        btnGirar.querySelector('.btn-texto').textContent = 'Girar de novo';
        btnContinuar.hidden = false;
        btnContinuar.focus({ preventScroll: opcoesGiro !== undefined && window.innerWidth > 680 });
      }, opcoesGiro);
    }
    const btnGirar = botao('girar', 'Girar roleta', function () { girarRoleta(); }, 'btn-primario');

    // Na própria roleta: clicar gira; segurar e arrastar (mouse ou dedo) também.
    // O botão continua disponível para quem usa o teclado.
    roda.classList.add('roda-clicavel');
    roda.title = 'Clique ou arraste para girar';
    const arraste = Roleta.habilitarArraste(roda, function (velocidade) {
      girarRoleta({ velocidade: velocidade });
    });
    roda.addEventListener('click', function () {
      if (arraste.consultouClique()) return; // o arraste já girou
      if (!btnGirar.disabled) girarRoleta();
    });

    // Veio da roleta da tela inicial? Gira assim que a tela aparecer.
    const pendente = App.pegarGiroPendente();
    if (pendente) {
      setTimeout(function () {
        girarRoleta(typeof pendente.velocidade === 'number' ? pendente : undefined);
      }, 60);
    }

    return h('section', { class: 'tela tela-roleta' },
      cabecalhoPagina('Sortear uma emoção', TEXTOS.roletaInstrucao),
      h('div', { class: 'roleta-layout' },
        painel({ classe: 'painel-roda', classeCorpo: 'corpo-roda', corpo: h('div', { class: 'roleta-area' }, seta(), roda) }),
        painel({
          classe: 'painel-resultado',
          cab: [h('h2', null, 'Resultado'), contador],
          corpo: [vazio, resultado],
          rodape: h('div', { class: 'acoes-coluna' }, btnContinuar, btnGirar)
        })),
      navegacao());
  },

  /* 3. Apresentação da emoção */
  emocao: function () {
    const e = emocaoAtual();
    return h('section', { class: 'tela tela-emocao' },
      cabecalhoPagina('Emoção sorteada', 'Leia junto com a criança antes de começar as perguntas.'),
      painel({
        classe: 'painel-emocao',
        corpo: h('div', { class: 'emocao-layout' },
          h('div', { class: 'emocao-ilustracao' }, emoji(e.emoji)),
          h('div', { class: 'emocao-texto' },
            chipEmocao(e),
            h('h2', { class: 'emocao-nome' }, e.nome),
            h('p', { class: 'emocao-frase' }, e.frase),
            h('p', { class: 'emocao-descricao' }, e.descricao))),
        rodape: [
          meta('Próximo: ' + CARTAS.length + ' perguntas'),
          botao('avancar', 'Vamos explorar', function () { App.irPara('carta', { indiceCarta: 0 }); }, 'btn-primario')
        ]
      }),
      navegacao());
  },

  /* 4. Cartas investigativas */
  carta: function () {
    const e = emocaoAtual();
    const i = estado.indiceCarta;
    const c = CARTAS[i];
    const anterior = estado.respostas[c.id];
    const respondida = anterior && anterior.status === 'respondida';
    const selecao = new Set(respondida ? anterior.valores : []);
    const notas = Object.assign({}, respondida && anterior.notas ? anterior.notas : {}); // anotações das cartas de cuidado
    let campo = null;

    const corpo = h('div', { class: 'carta-corpo' });

    if (c.tipo === 'corpo') {
      // Silhueta clicável + lista; as duas ficam sincronizadas.
      const grade = gradeOpcoes(REGIOES_CORPO, selecao, false, null, c.pergunta, 'grade-lista');
      const figura = figuraCorpo();
      figura.querySelectorAll('.regiao').forEach(function (r) {
        r.addEventListener('click', function () { grade.alternarPorId(r.dataset.id); });
      });
      grade.aoMudar = function (sel) {
        const todo = sel.has('todo');
        figura.classList.toggle('todo-marcado', todo); // pinta também os braços
        figura.querySelectorAll('.regiao').forEach(function (r) {
          r.classList.toggle('marcada', todo || sel.has(r.dataset.id));
        });
      };
      grade.atualizar();
      corpo.appendChild(h('div', { class: 'layout-corpo' }, figura, grade));
    } else if (c.tipo === 'multi') {
      corpo.appendChild(gradeOpcoes(opcoesDaCarta(c, e), selecao, false, null, c.pergunta));
      if (c.outro) {
        campo = h('input', { type: 'text', id: 'campo-outro', class: 'campo', maxlength: '200', autocomplete: 'off',
          placeholder: 'Escreva aqui, se quiser' });
        if (respondida) campo.value = anterior.texto;
        corpo.appendChild(h('div', { class: 'campo-grupo' },
          h('label', { for: 'campo-outro' }, 'Outra situação'), campo));
      }
    } else if (c.tipo === 'intensidade') {
      corpo.appendChild(gradeOpcoes(INTENSIDADES, selecao, true, function (op) {
        return [
          h('span', { class: 'circulo-area', 'aria-hidden': 'true' },
            h('span', { class: 'circulo', style: 'width:' + op.tamanho + 'px;height:' + op.tamanho + 'px' })),
          h('span', { class: 'opcao-texto' }, op.texto)
        ];
      }, c.pergunta, 'grade-intensidade'));
    } else if (c.tipo === 'regulacao') {
      corpo.appendChild(mesaCartas(e, selecao, notas));
    } else if (c.tipo === 'texto') {
      corpo.appendChild(h('p', { class: 'rotulo-secao' }, 'Será que você pensa algo assim?'));
      corpo.appendChild(gradeOpcoes(opcoesDaCarta(c, e), selecao, false, null, 'Exemplos de pensamentos', 'grade-pensamentos'));
      campo = h('textarea', { id: 'campo-pensamento', class: 'campo', rows: '3', maxlength: '500',
        placeholder: 'O adulto pode escrever o que a criança contou' });
      if (respondida) campo.value = anterior.texto;
      corpo.appendChild(h('div', { class: 'campo-grupo' },
        h('label', { for: 'campo-pensamento' }, 'Anotação (opcional)'), campo));
    }

    if (c.aviso) corpo.appendChild(h('p', { class: 'aviso-carta' }, icone('info'), h('span', null, c.aviso)));

    function concluir(status, falado) {
      if (status === 'respondida') {
        const valores = Array.from(selecao);
        const texto = campo ? campo.value.trim() : '';
        if (!valores.length && !texto && !falado) status = 'pulada';
        salvarResposta(c.id, status, valores, texto, falado);
        if (c.tipo === 'regulacao' && status === 'respondida') {
          const anot = {};
          valores.forEach(function (id) { if (notas[id] && notas[id].trim()) anot[id] = notas[id].trim(); });
          estado.respostas[c.id].notas = anot;
        }
      } else {
        salvarResposta(c.id, status);
      }
      App.proximaCarta();
    }

    // "Não sei": mostra uma explicação curta da pergunta para esta emoção.
    // A criança pode tentar responder ou seguir (registrando "não sei").
    const ajuda = h('aside', { class: 'ajuda-carta', 'aria-live': 'polite', hidden: true },
      h('span', { class: 'ajuda-icone' }, icone('naoSei')),
      h('div', { class: 'ajuda-conteudo' },
        h('p', { class: 'ajuda-titulo' }, 'Uma ajudinha'),
        h('p', null, (AJUDA_CARTAS[e.id] || {})[c.id] || ''),
        h('div', { class: 'ajuda-acoes' },
          botao('check', 'Quero tentar', function () {
            ajuda.hidden = true;
            const primeiro = corpo.querySelector('button, input, textarea');
            if (primeiro) primeiro.focus();
          }, 'btn-secundario'),
          botao('avancar', 'Seguir para a próxima', function () { concluir('nao-sei'); }, 'btn-fantasma'))));
    function mostrarAjuda() {
      ajuda.hidden = false;
      ajuda.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      ajuda.querySelector('button').focus({ preventScroll: true });
    }

    const principais = [];
    if (c.tipo === 'texto') {
      principais.push(botao('conversa', 'Já conversamos', function () { concluir('respondida', true); }, 'btn-secundario'));
    }
    principais.push(botao('avancar', 'Continuar', function () { concluir('respondida'); }, 'btn-primario'));

    // Barra de progresso em segmentos (um por pergunta).
    const segmentos = h('div', { class: 'segmentos', role: 'progressbar', 'aria-label': 'Perguntas',
      'aria-valuemin': '1', 'aria-valuemax': String(CARTAS.length), 'aria-valuenow': String(i + 1) },
      CARTAS.map(function (_, k) { return h('span', { class: k < i ? 'feito' : k === i ? 'atual' : '' }); }));

    return h('section', { class: 'tela tela-carta' },
      painel({
        tag: 'article',
        classe: 'carta',
        cab: [chipEmocao(e), h('span', { class: 'carta-contador meta' }, 'Pergunta ' + dd(i + 1) + ' / ' + dd(CARTAS.length))],
        corpo: [
          segmentos,
          h('h1', null, c.pergunta),
          h('p', { class: 'dica' }, c.dica),
          corpo,
          ajuda
        ],
        rodape: [
          h('div', { class: 'grupo-pular' },
            botao('pular', 'Pular', function () { concluir('pulada'); }, 'btn-fantasma'),
            botao('naoSei', 'Não sei', mostrarAjuda, 'btn-fantasma'),
            botao('prefiroNao', 'Prefiro não responder', function () { concluir('prefiro-nao'); }, 'btn-fantasma')),
          h('div', { class: 'grupo-principal' }, principais)
        ]
      }),
      navegacao());
  },

  /* 5. Estratégias */
  estrategias: function () {
    return h('section', { class: 'tela tela-estrategias' },
      cabecalhoPagina(TEXTOS.estrategiasTitulo, TEXTOS.estrategiasDica),
      h('div', { class: 'grade-estrategias' },
        ESTRATEGIAS.map(function (s) {
          const jaFez = estado.estrategias.indexOf(s.id) !== -1;
          return h('button', { type: 'button', class: 'item-estrategia' + (jaFez ? ' ja-feita' : ''),
              onclick: function () { App.abrirEstrategia(s.id); } },
            iconeEstrategia(s),
            h('span', { class: 'estrategia-texto' },
              h('span', { class: 'estrategia-nome' }, s.nome),
              h('span', { class: 'estrategia-convite' }, jaFez ? 'Já experimentamos' : 'Quer experimentar?')),
            icone('chevron'));
        })),
      navegacao());
  },

  /* 6. Prática da estratégia */
  pratica: function () {
    const s = ESTRATEGIAS.find(function (x) { return x.id === estado.estrategiaAtual; });
    const conteudo = Pratica[s.tipo]();
    return h('section', { class: 'tela tela-pratica pratica-' + s.tipo },
      painel({
        classe: 'cartao-pratica',
        cab: h('div', { class: 'pratica-cabecalho' },
          iconeEstrategia(s),
          h('div', null, meta('Estratégia'), h('h1', null, s.nome))),
        corpo: conteudo,
        rodape: [
          ESTRATEGIAS.length > 1 ? botao('outra', 'Experimentar outra', function () { App.irPara('estrategias'); }, 'btn-secundario') : null,
          botao('terminar', 'Terminar', App.terminar, 'btn-primario')
        ]
      }),
      navegacao(true));
  },

  /* 7. Final */
  final: function () {
    const temEmocao = !!estado.emocaoAtual;
    return h('section', { class: 'tela tela-final' },
      painel({
        classe: 'cartao-final',
        corpo: [
          h('span', { class: 'icone-tile icone-tile-grande final-icone', 'aria-hidden': 'true' }, icone('coracao')),
          h('h1', null, TEXTOS.finalTitulo),
          h('p', { class: 'final-mensagem' }, TEXTOS.finalMensagem),
          h('div', { class: 'acoes-coluna' },
            botao('girar', 'Girar de novo', App.girarDeNovo, 'btn-primario'),
            estado.cartasConcluidas && ESTRATEGIAS.length > 1 ? botao('outra', 'Experimentar outra estratégia', function () { App.irPara('estrategias'); }, 'btn-secundario') : null,
            temEmocao ? botao('resumo', 'Ver resumo para o adulto', function () { App.irPara('resumo'); }, 'btn-secundario') : null,
            botao('inicio', 'Voltar ao início', App.inicio, 'btn-fantasma'))
        ]
      }));
  },

  /* Aba "Sobre": o que é, o que não é, para que serve. */
  sobre: function () {
    return h('section', { class: 'tela tela-sobre' },
      cabecalhoPagina(SOBRE.titulo, SOBRE.intro, [
        botao('play', 'Começar atividade', App.brincar, 'btn-primario'),
        botao('voltar', 'Voltar', App.voltar, 'btn-secundario')
      ]),
      h('div', { class: 'sobre-grid' },
        SOBRE.secoes.map(function (s) {
          return painel({
            classe: 'sobre-secao' + (s.destaque ? ' sobre-destaque' : ''),
            cab: [h('h2', null, s.titulo), s.destaque ? h('span', { class: 'icone-pequeno' }, icone('escudo')) : null],
            corpo: [
              s.texto ? h('p', null, s.texto) : null,
              s.lista ? h('ul', null, s.lista.map(function (item) { return h('li', null, item); })) : null
            ]
          });
        }),
        h('blockquote', { class: 'sobre-lembrete' }, SOBRE.lembrete)));
  },

  /* 8. Resumo para o adulto */
  resumo: function () {
    const e = emocaoAtual();
    const nomesEstrategias = estado.estrategias.map(function (id) {
      const s = ESTRATEGIAS.find(function (x) { return x.id === id; });
      return h('li', null, s.nome);
    });
    return h('section', { class: 'tela tela-resumo' },
      cabecalhoPagina('Resumo da conversa', 'Para o adulto mediador.', [
        botao('imprimir', 'Imprimir', function () { window.print(); }, 'btn-primario'),
        botao('voltar', 'Voltar', App.voltar, 'btn-secundario')
      ]),
      painel({
        classe: 'folha',
        cab: [h('h2', null, 'Emoção sorteada'), chipEmocao(e, 'chip-grande')],
        corpo: [
          h('p', { class: 'aviso-adulto' }, TEXTOS.avisoAdulto),
          h('h3', null, 'Cartas investigativas'),
          h('dl', { class: 'resumo-cartas' },
            CARTAS.map(function (c, k) {
              const r = estado.respostas[c.id];
              const respondeu = r && r.status === 'respondida';
              return h('div', { class: 'resumo-item' + (respondeu ? '' : ' resumo-item-vazio') },
                h('dt', null, h('span', { class: 'resumo-num' }, dd(k + 1)), c.pergunta),
                h('dd', null, descreverResposta(c, e)));
            })),
          cartasEscolhidasResumo(e),
          h('h3', null, 'Estratégias experimentadas'),
          nomesEstrategias.length ? h('ul', { class: 'resumo-estrategias' }, nomesEstrategias)
                                  : h('p', { class: 'dica' }, 'Nenhuma estratégia foi experimentada nesta rodada.'),
          h('h3', null, 'Sobre este material'),
          h('p', null, TEXTOS.apoioAdulto)
        ]
      }));
  }
};

/** Resumo: cartas de cuidado escolhidas, com a pergunta para conversar. */
function cartasEscolhidasResumo(e) {
  const r = estado.respostas.cuidar;
  const ids = r && r.status === 'respondida' ? r.valores : [];
  const lista = CARTAS_REGULACAO[e.id] || [];
  const notas = (r && r.notas) || {};
  const itens = ids.map(function (id) { const c = lista[Number(id) - 1]; return c ? { carta: c, nota: notas[id] } : null; }).filter(Boolean);
  if (!itens.length) return null;
  return [
    h('h3', null, 'Cartas de cuidado escolhidas'),
    h('ul', { class: 'resumo-cuidado' }, itens.map(function (item) {
      const c = item.carta;
      return h('li', null, h('span', { class: 'resumo-cuidado-estrela', 'aria-hidden': 'true' }, icone('estrela')),
        h('span', null, h('strong', null, c.nome), h('span', { class: 'resumo-cuidado-pergunta' }, 'Vamos conversar: ' + c.pergunta),
          item.nota ? h('span', { class: 'resumo-cuidado-nota' }, h('b', null, 'Anotação: '), item.nota) : null));
    }))
  ];
}

/* ---------- Conteúdo das telas de prática ---------- */
/* ---------- Carimbos do desenho (figurinhas prontas, SVG offline) ---------- */
const CARIMBOS = (function () {
  const L = '#2B2238', W = 'stroke="' + L + '" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"';
  function estrelaPath(cx, cy, R, r) {
    let d = '';
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + i * Math.PI / 5, raio = i % 2 ? r : R;
      d += (i ? 'L' : 'M') + (cx + Math.cos(a) * raio).toFixed(1) + ' ' + (cy + Math.sin(a) * raio).toFixed(1);
    }
    return d + 'Z';
  }
  let raios = '';
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4;
    raios += '<path d="M' + (32 + Math.cos(a) * 18).toFixed(1) + ' ' + (32 + Math.sin(a) * 18).toFixed(1) + ' L' + (32 + Math.cos(a) * 27).toFixed(1) + ' ' + (32 + Math.sin(a) * 27).toFixed(1) + '" stroke="#FFB703" stroke-width="4" stroke-linecap="round"/>';
  }
  let petalas = '';
  for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3;
    petalas += '<circle cx="' + (32 + Math.cos(a) * 13).toFixed(1) + '" cy="' + (30 + Math.sin(a) * 13).toFixed(1) + '" r="9" fill="#FF7EB6" ' + W + '/>';
  }
  const olhos = function (y, dx) { return '<circle cx="' + (32 - dx) + '" cy="' + y + '" r="2.6" fill="' + L + '"/><circle cx="' + (32 + dx) + '" cy="' + y + '" r="2.6" fill="' + L + '"/>'; };
  return [
    { id: 'estrela', nome: 'Estrelinha', svg: '<path d="' + estrelaPath(32, 34, 27, 12) + '" fill="#FFD23F" ' + W + '/>' + olhos(33, 6) + '<path d="M28 39 Q32 43 36 39" fill="none" ' + W + '/>' },
    { id: 'coracao', nome: 'Coração', svg: '<path d="M32 56 C10 42 5 25 17 16 C25 10 31 15 32 21 C33 15 39 10 47 16 C59 25 54 42 32 56Z" fill="#FF5C7A" ' + W + '/><path d="M18 24 Q20 19 25 18" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>' },
    { id: 'cachorro', nome: 'Cachorrinho', svg: '<ellipse cx="14" cy="30" rx="7" ry="14" fill="#8A5A34" ' + W + ' transform="rotate(18 14 30)"/><ellipse cx="50" cy="30" rx="7" ry="14" fill="#8A5A34" ' + W + ' transform="rotate(-18 50 30)"/>' +
        '<circle cx="32" cy="34" r="19" fill="#D9A066" ' + W + '/><ellipse cx="40" cy="27" rx="7" ry="6" fill="#F3DDC0" opacity=".9"/>' + olhos(30, 7) +
        '<ellipse cx="32" cy="43" rx="10" ry="7.5" fill="#F3DDC0" ' + W + '/><ellipse cx="32" cy="39" rx="4" ry="3" fill="' + L + '"/><path d="M29 47 Q32 50 35 47" fill="none" ' + W + '/><path d="M30 48 Q32 55 34 48Z" fill="#FF7B8A" ' + W + '/>' },
    { id: 'gato', nome: 'Gatinho', svg: '<path d="M14 26 L16 8 L28 18Z" fill="#F2A65A" ' + W + '/><path d="M50 26 L48 8 L36 18Z" fill="#F2A65A" ' + W + '/>' +
        '<circle cx="32" cy="35" r="19" fill="#F2A65A" ' + W + '/><path d="M24 20 Q32 17 40 20" fill="none" stroke="#C9783A" stroke-width="2.4" stroke-linecap="round"/>' + olhos(32, 7) +
        '<path d="M30 39 L34 39 L32 41.5Z" fill="#FF7B8A" ' + W + '/><path d="M27 44 Q29.5 47 32 44 Q34.5 47 37 44" fill="none" ' + W + '/>' +
        '<path d="M10 38 L22 40 M10 44 L22 43 M54 38 L42 40 M54 44 L42 43" stroke="' + L + '" stroke-width="1.8" stroke-linecap="round"/>' },
    { id: 'sol', nome: 'Sol', svg: raios + '<circle cx="32" cy="32" r="15" fill="#FFD23F" ' + W + '/>' + olhos(30, 5) + '<path d="M26 35 Q32 41 38 35" fill="none" ' + W + '/>' },
    { id: 'flor', nome: 'Flor', svg: '<path d="M32 44 L32 60" stroke="#3E9B4F" stroke-width="4" stroke-linecap="round"/><path d="M32 54 Q42 46 46 52 Q40 58 32 54Z" fill="#5BBF6A" ' + W + '/>' + petalas + '<circle cx="32" cy="30" r="8" fill="#FFD23F" ' + W + '/>' },
    { id: 'nuvem', nome: 'Nuvem', svg: '<path d="M14 46 Q4 46 6 36 Q8 28 17 29 Q18 16 31 16 Q42 15 45 26 Q57 24 59 35 Q60 46 49 46Z" fill="#FFFFFF" ' + W + '/>' + olhos(33, 7) + '<path d="M28 38 Q32 41 36 38" fill="none" ' + W + '/><circle cx="21" cy="37" r="2.6" fill="#FF7E9A" opacity=".6"/><circle cx="43" cy="37" r="2.6" fill="#FF7E9A" opacity=".6"/>' },
    { id: 'arco', nome: 'Arco-íris', svg: '<path d="M8 46 A24 24 0 0 1 56 46" fill="none" stroke="#FF5C5C" stroke-width="5"/><path d="M13 46 A19 19 0 0 1 51 46" fill="none" stroke="#FFB703" stroke-width="5"/>' +
        '<path d="M18 46 A14 14 0 0 1 46 46" fill="none" stroke="#5BBF6A" stroke-width="5"/><path d="M23 46 A9 9 0 0 1 41 46" fill="none" stroke="#4D96FF" stroke-width="5"/>' +
        '<path d="M2 50 Q2 43 9 44 Q12 39 17 43 Q22 43 21 50Z" fill="#fff" ' + W + '/><path d="M43 50 Q42 43 48 44 Q51 39 56 43 Q62 43 61 50Z" fill="#fff" ' + W + '/>' }
  ].map(function (c) {
    c.svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="128" height="128">' + c.svg + '</svg>';
    c.url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(c.svg);
    return c;
  });
})();

const Pratica = {

  respiracao: function () {
    const bolha = h('div', { class: 'bolha', 'aria-hidden': 'true' });
    const texto = h('p', { class: 'respira-texto', 'aria-live': 'polite' }, 'Puxa o ar');
    let inspirando = true;
    // Começa vazia e enche logo em seguida, junto com "Puxa o ar".
    const inicio = setTimeout(function () { bolha.classList.add('cheia'); }, 60);
    App.registrarLimpeza(function () { clearTimeout(inicio); });
    const id = setInterval(function () {
      inspirando = !inspirando;
      bolha.classList.toggle('cheia', inspirando);
      texto.textContent = inspirando ? 'Puxa o ar' : 'Solta devagar';
    }, 4000);
    App.registrarLimpeza(function () { clearInterval(id); });
    return h('div', { class: 'pratica-conteudo pratica-centro' },
      h('p', { class: 'dica' }, 'Acompanhe o círculo com o adulto, do seu jeitinho.'),
      h('div', { class: 'bolha-area' }, h('div', { class: 'bolha-anel' }), bolha),
      texto);
  },

  pausa: function () {
    const msg = h('p', { class: 'texto-grande', 'aria-live': 'polite' },
      'Vamos parar um pouquinho? Procure um espaço tranquilo e seguro e fique do jeito que for bom para você.');
    const btn = botao('check', 'Já fiz minha pausa', function () {
      msg.textContent = 'Que bom que você parou um pouquinho. Como está agora?';
      btn.hidden = true;
    }, 'btn-secundario');
    return h('div', { class: 'pratica-conteudo' }, msg, h('div', { class: 'acoes acoes-esq' }, btn));
  },

  ajuda: function () {
    return h('div', { class: 'pratica-conteudo' },
      h('p', { class: 'texto-grande' }, 'Quem pode te ajudar? Que tal procurar um adulto de confiança?'),
      gradeOpcoes(PRATICA.ajudaPessoas, new Set(), true, null, 'Adultos de confiança'),
      h('p', { class: 'dica dica-depois' }, 'Você pode dizer: "Pode me ajudar?"'));
  },

  conversa: function () {
    const e = emocaoAtual();
    return h('div', { class: 'pratica-conteudo pratica-colunas' },
      h('div', null,
        h('p', { class: 'texto-grande' }, 'Quer contar como foi sentir ' + e.nome.toLowerCase() + '?'),
        h('ul', { class: 'falas' }, PRATICA.conversaCrianca.map(function (f) { return h('li', null, f); }))),
      h('aside', { class: 'caixa-adulto' },
        h('h2', null, 'Dicas para o adulto'),
        h('ul', null, PRATICA.conversaAdulto.map(function (d) { return h('li', null, d); }))));
  },

  desenho: function () {
    // No celular a área de desenho fica mais alta (retrato); no computador, paisagem.
    const celular = window.matchMedia('(max-width: 680px)').matches;
    const canvas = h('canvas', { class: 'tela-desenho', width: '1000', height: celular ? '1100' : '480', 'aria-label': 'Área de desenho' });
    const ctx = canvas.getContext('2d');
    let cor = PRATICA.coresDesenho[0];
    let desenhando = false;

    function limpar() {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    function pos(ev) {
      const r = canvas.getBoundingClientRect();
      return { x: (ev.clientX - r.left) * canvas.width / r.width, y: (ev.clientY - r.top) * canvas.height / r.height };
    }
    // Ferramenta atual: 'pincel' (traço livre) ou o id de um carimbo.
    let modo = 'pincel';
    const imagens = {};
    CARIMBOS.forEach(function (c) { const img = new Image(); img.src = c.url; imagens[c.id] = img; });
    canvas.addEventListener('pointerdown', function (ev) {
      if (modo !== 'pincel') {                      // carimbar a figurinha onde tocou
        const p = pos(ev), tam = 150, img = imagens[modo];
        if (img && img.complete) ctx.drawImage(img, p.x - tam / 2, p.y - tam / 2, tam, tam);
        return;
      }
      desenhando = true;
      canvas.setPointerCapture(ev.pointerId);
      const p = pos(ev);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + 0.1, p.y + 0.1);
      ctx.strokeStyle = cor; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.stroke();
    });
    canvas.addEventListener('pointermove', function (ev) {
      if (!desenhando) return;
      const p = pos(ev);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (t) {
      canvas.addEventListener(t, function () { desenhando = false; });
    });
    limpar();

    const paleta = h('div', { class: 'paleta', role: 'group', 'aria-label': 'Cores' });
    PRATICA.coresDesenho.forEach(function (c, k) {
      const b = h('button', {
        type: 'button', class: 'cor', style: 'background:' + c, 'aria-label': 'Cor ' + (k + 1),
        'aria-pressed': k === 0 ? 'true' : 'false',
        onclick: function () {
          cor = c;
          escolherFerramenta('pincel');
          paleta.querySelectorAll('.cor').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
        }
      });
      paleta.appendChild(b);
    });

    const ferramentas = h('div', { class: 'carimbos', role: 'group', 'aria-label': 'Pincel e carimbos' });
    const btnPincel = botao('desenho', 'Pincel', function () { escolherFerramenta('pincel'); }, 'btn-secundario ferramenta-pincel');
    ferramentas.appendChild(btnPincel);
    const botoesCarimbo = CARIMBOS.map(function (c) {
      const b = h('button', { type: 'button', class: 'carimbo', title: c.nome, 'aria-label': 'Carimbo: ' + c.nome,
        onclick: function () { escolherFerramenta(c.id); } });
      b.innerHTML = c.svg; // SVG fixo definido em CARIMBOS
      ferramentas.appendChild(b);
      return { id: c.id, el: b };
    });
    function escolherFerramenta(qual) {
      modo = qual;
      btnPincel.setAttribute('aria-pressed', qual === 'pincel' ? 'true' : 'false');
      botoesCarimbo.forEach(function (x) { x.el.setAttribute('aria-pressed', x.id === qual ? 'true' : 'false'); });
      canvas.classList.toggle('modo-carimbo', qual !== 'pincel');
    }
    escolherFerramenta('pincel');

    return h('div', { class: 'pratica-conteudo' },
      h('p', { class: 'dica' }, 'Quer desenhar o que está sentindo? Use o pincel ou toque num carimbo e depois no quadro. O desenho não fica guardado.'),
      h('div', { class: 'barra-desenho' }, paleta, botao('limpar', 'Limpar', limpar, 'btn-secundario')),
      ferramentas,
      canvas);
  },

  lugar: function () {
    return h('div', { class: 'pratica-conteudo' },
      h('p', { class: 'texto-grande' }, 'Que tal pensar em um lugar seguro e confortável, se tiver um por perto?'),
      gradeOpcoes(PRATICA.lugares, new Set(), true, null, 'Lugares tranquilos'));
  }
};
