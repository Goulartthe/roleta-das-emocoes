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
  coracao:   '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'
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
    '<g class="base"><rect x="30" y="100" width="24" height="104" rx="12"/><rect x="146" y="100" width="24" height="104" rx="12"/></g>' +
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

/** Lista de opções de uma carta para a emoção atual. */
function opcoesDaCarta(carta, emocao) {
  if (carta.tipo === 'corpo') return REGIOES_CORPO;
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
    const mini = h('div', { class: 'roda roda-mini' });
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
      h('p', { class: 'vazio-desc' }, 'Toque no botão ou na própria roleta para girar.'));
    const resultado = h('div', { class: 'resultado', 'aria-live': 'polite' });
    const contador = meta('');
    function atualizarContador() {
      contador.textContent = dd(estado.jaSorteadas.length) + ' / ' + dd(EMOCOES.length) + ' sorteadas';
    }
    atualizarContador();
    const btnContinuar = botao('avancar', 'Conhecer a emoção', function () { App.irPara('emocao'); }, 'btn-primario', { hidden: true });
    const btnGirar = botao('girar', 'Girar roleta', function () {
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
        btnContinuar.focus();
      });
    }, 'btn-primario');

    // Clicar na própria roleta também gira (o botão continua para o teclado).
    roda.classList.add('roda-clicavel');
    roda.title = 'Clique para girar';
    roda.addEventListener('click', function () { if (!btnGirar.disabled) btnGirar.click(); });

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
          botao('outra', 'Experimentar outra', function () { App.irPara('estrategias'); }, 'btn-secundario'),
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
            estado.cartasConcluidas ? botao('outra', 'Experimentar outra estratégia', function () { App.irPara('estrategias'); }, 'btn-secundario') : null,
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
          h('h3', null, 'Estratégias experimentadas'),
          nomesEstrategias.length ? h('ul', { class: 'resumo-estrategias' }, nomesEstrategias)
                                  : h('p', { class: 'dica' }, 'Nenhuma estratégia foi experimentada nesta rodada.'),
          h('h3', null, 'Sobre este material'),
          h('p', null, TEXTOS.apoioAdulto)
        ]
      }));
  }
};

/* ---------- Conteúdo das telas de prática ---------- */
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
    canvas.addEventListener('pointerdown', function (ev) {
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
          paleta.querySelectorAll('.cor').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
        }
      });
      paleta.appendChild(b);
    });

    return h('div', { class: 'pratica-conteudo' },
      h('p', { class: 'dica' }, 'Quer desenhar o que está sentindo? O desenho não fica guardado.'),
      h('div', { class: 'barra-desenho' }, paleta, botao('limpar', 'Limpar', limpar, 'btn-secundario')),
      canvas);
  },

  lugar: function () {
    return h('div', { class: 'pratica-conteudo' },
      h('p', { class: 'texto-grande' }, 'Que tal pensar em um lugar seguro e confortável, se tiver um por perto?'),
      gradeOpcoes(PRATICA.lugares, new Set(), true, null, 'Lugares tranquilos'));
  }
};
