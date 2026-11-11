/* =========================================================
   state.js — estado da sessão, somente em memória.
   Nada é salvo: recarregar a página apaga tudo.
   ========================================================= */

const estado = {
  tela: 'inicio',
  emocaoAtual: null,        // id da emoção sorteada
  jaSorteadas: [],          // ids, para a regra de repetição
  indiceCarta: 0,
  respostas: {},            // { idCarta: { status, valores: [], texto, falado } }
  cartasConcluidas: false,  // libera as estratégias (cartas sempre antes)
  estrategias: [],          // ids das estratégias experimentadas na rodada
  estrategiaAtual: null,    // id da estratégia em prática
  historico: [],            // pilha para o botão "Voltar"
  girando: false,
  config: { som: true, volume: 0.5, repetirEmocoes: true, escuro: true } // escuro é o padrão
};
// status: 'respondida' | 'pulada' | 'nao-sei' | 'prefiro-nao'

/** Limpa tudo o que pertence a uma rodada (emoção, respostas, estratégias). */
function novaRodada() {
  estado.emocaoAtual = null;
  estado.indiceCarta = 0;
  estado.respostas = {};
  estado.cartasConcluidas = false;
  estado.estrategias = [];
  estado.estrategiaAtual = null;
}

/** Devolve o objeto da emoção sorteada (ou null). */
function emocaoAtual() {
  return EMOCOES.find(function (e) { return e.id === estado.emocaoAtual; }) || null;
}

/** Guarda a resposta de uma carta. */
function salvarResposta(idCarta, status, valores, texto, falado) {
  estado.respostas[idCarta] = {
    status: status,
    valores: valores || [],
    texto: texto || '',
    falado: !!falado
  };
}

/** Registra a estratégia experimentada (sem repetir na lista). */
function registrarEstrategia(id) {
  estado.estrategiaAtual = id;
  if (estado.estrategias.indexOf(id) === -1) estado.estrategias.push(id);
}
