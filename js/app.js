/* =========================================================
   app.js — inicialização, navegação entre telas e eventos.
   ========================================================= */

const App = (function () {
  const app = document.getElementById('app');
  let limpezas = [];

  /** Funções chamadas ao sair da tela (ex.: parar a respiração). */
  function registrarLimpeza(fn) { limpezas.push(fn); }

  /** Desenha a tela atual, aplicando as regras de fluxo. */
  function render() {
    limpezas.forEach(function (fn) { fn(); });
    limpezas = [];

    // Regras de fluxo: sem emoção não há cartas; estratégias só depois das cartas.
    const precisaEmocao = ['emocao', 'carta', 'estrategias', 'pratica', 'resumo'];
    if (precisaEmocao.indexOf(estado.tela) !== -1 && !estado.emocaoAtual) estado.tela = 'roleta';
    if ((estado.tela === 'estrategias' || estado.tela === 'pratica') && !estado.cartasConcluidas) estado.tela = 'carta';
    if (estado.tela === 'pratica' && !estado.estrategiaAtual) estado.tela = 'estrategias';

    const e = emocaoAtual();
    document.body.style.setProperty('--cor', e ? e.cor : '#FFB347');
    document.body.style.setProperty('--cor-texto', e ? e.corTexto : '#4a2c00');
    document.body.dataset.tela = estado.tela;
    atualizarEtapas();

    app.replaceChildren(Telas[estado.tela]());
    window.scrollTo(0, 0);
    const titulo = app.querySelector('h1');
    if (titulo) {
      titulo.setAttribute('tabindex', '-1');
      titulo.focus({ preventScroll: true });
    }
  }

  /** Mostra no topo em que etapa da jornada a criança está. */
  const ETAPA_DA_TELA = { roleta: 0, emocao: 1, carta: 2, estrategias: 3, pratica: 3, final: 4, resumo: 4 };
  function atualizarEtapas() {
    const lista = document.getElementById('etapas');
    const atual = ETAPA_DA_TELA[estado.tela];
    lista.hidden = atual === undefined;
    lista.replaceChildren.apply(lista, TEXTOS.etapas.map(function (et, k) {
      const conteudo = [
        h('span', { class: 'etapa-marca', 'aria-hidden': 'true' }, k < atual ? icone('check') : String(k + 1)),
        h('span', { class: 'etapa-texto' }, et.texto)
      ];
      // Só as etapas já feitas são clicáveis: dá para voltar, nunca avançar.
      const li = h('li', { class: 'etapa' + (k < atual ? ' feita' : k === atual ? ' atual' : '') },
        k < atual
          ? h('button', { type: 'button', class: 'etapa-botao', title: 'Voltar para ' + et.texto,
              'aria-label': 'Voltar para a etapa ' + et.texto,
              onclick: function () { voltarParaEtapa(et.id); } }, conteudo)
          : conteudo);
      if (k === atual) li.setAttribute('aria-current', 'step');
      return li;
    }));
  }

  /** Volta para o início de uma etapa anterior (as respostas são mantidas). */
  function voltarParaEtapa(tela) {
    if (estado.girando) return;
    // Funciona como apertar "Voltar" várias vezes: corta o histórico até a
    // entrada da etapa, assim o "Voltar" seguinte segue o caminho normal.
    const ehAlvo = function (p) { return p.tela === tela && (tela !== 'carta' || p.indiceCarta === 0); };
    let k = estado.historico.length - 1;
    while (k >= 0 && !ehAlvo(estado.historico[k])) k--;
    if (k >= 0) {
      estado.historico = estado.historico.slice(0, k);
      estado.tela = tela;
      if (tela === 'carta') estado.indiceCarta = 0;
      render();
    } else {
      irPara(tela, tela === 'carta' ? { indiceCarta: 0 } : {});
    }
  }

  /** Vai para uma tela guardando a anterior para o "Voltar". */
  function irPara(tela, opcoes) {
    opcoes = opcoes || {};
    estado.historico.push({ tela: estado.tela, indiceCarta: estado.indiceCarta });
    estado.tela = tela;
    if (opcoes.indiceCarta !== undefined) estado.indiceCarta = opcoes.indiceCarta;
    render();
  }

  function voltar() {
    const anterior = estado.historico.pop();
    if (!anterior) { inicio(); return; }
    estado.tela = anterior.tela;
    estado.indiceCarta = anterior.indiceCarta;
    render();
  }

  /** Avança para a próxima carta; depois da última, libera as estratégias. */
  function proximaCarta() {
    if (estado.indiceCarta < CARTAS.length - 1) {
      irPara('carta', { indiceCarta: estado.indiceCarta + 1 });
    } else {
      estado.cartasConcluidas = true;
      irPara('estrategias');
    }
  }

  /** Volta ao início e apaga a rodada atual. */
  function inicio() {
    novaRodada();
    estado.historico = [];
    estado.tela = 'inicio';
    render();
  }

  function brincar() {
    estado.historico = [{ tela: 'inicio', indiceCarta: 0 }];
    estado.tela = 'roleta';
    render();
  }

  /** Nova rodada: apaga respostas e abre a roleta. */
  function girarDeNovo() {
    novaRodada();
    brincar();
  }

  function terminar() { irPara('final'); }

  function abrirEstrategia(id) {
    registrarEstrategia(id);
    irPara('pratica');
  }

  /* ---------- Configurações (modal) ---------- */
  const dialogo = document.getElementById('config');
  const cSom = document.getElementById('cfg-som');
  const cVolume = document.getElementById('cfg-volume');
  const cRepetir = document.getElementById('cfg-repetir');

  function abrirConfig() {
    cSom.checked = estado.config.som;
    cVolume.value = estado.config.volume;
    cVolume.disabled = !estado.config.som;
    cRepetir.checked = estado.config.repetirEmocoes;
    cEscuro.checked = estado.config.escuro;
    dialogo.showModal();
  }

  /** Aplica o tema (claro/escuro). Fica só na memória, como o resto. */
  function aplicarTema() {
    if (estado.config.escuro) document.documentElement.setAttribute('data-tema', 'escuro');
    else document.documentElement.removeAttribute('data-tema');
  }
  const cEscuro = document.getElementById('cfg-escuro');
  cEscuro.addEventListener('change', function () {
    estado.config.escuro = cEscuro.checked;
    aplicarTema();
  });
  aplicarTema(); // aplica o tema padrão (escuro) ao abrir

  cSom.addEventListener('change', function () {
    estado.config.som = cSom.checked;
    cVolume.disabled = !cSom.checked;
    Som.aplicarVolume();
  });
  cVolume.addEventListener('input', function () {
    estado.config.volume = Number(cVolume.value);
    Som.aplicarVolume();
    Som.clique();
  });
  cRepetir.addEventListener('change', function () {
    estado.config.repetirEmocoes = cRepetir.checked;
  });
  document.getElementById('cfg-fechar').addEventListener('click', function () { dialogo.close(); });

  /* ---------- Eventos globais ---------- */
  document.getElementById('topo-inicio').addEventListener('click', inicio);
  document.getElementById('topo-config').addEventListener('click', abrirConfig);
  document.getElementById('topo-sobre').addEventListener('click', function () {
    if (estado.tela !== 'sobre') irPara('sobre');
  });

  // O som só pode começar depois de uma ação do usuário.
  document.addEventListener('pointerdown', Som.iniciar);
  document.addEventListener('keydown', Som.iniciar);
  document.addEventListener('click', function (ev) {
    if (ev.target.closest('button')) Som.clique();
  });

  return {
    render: render, irPara: irPara, voltar: voltar, proximaCarta: proximaCarta,
    inicio: inicio, brincar: brincar, girarDeNovo: girarDeNovo, terminar: terminar,
    abrirEstrategia: abrirEstrategia, abrirConfig: abrirConfig, registrarLimpeza: registrarLimpeza
  };
})();

App.render();
