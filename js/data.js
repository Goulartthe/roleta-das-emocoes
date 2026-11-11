/* =========================================================
   data.js — SOMENTE DADOS (textos e opções).
   Para mudar o conteúdo do site, edite este arquivo.
   Emojis escolhidos para aparecer bem também no Windows 10.
   ========================================================= */

// Regiões do corpo (carta 1). Iguais para todas as emoções.
const REGIOES_CORPO = [
  { id: 'cabeca',   emoji: '🧠', texto: 'Cabeça' },
  { id: 'garganta', emoji: '🗣️', texto: 'Garganta' },
  { id: 'peito',    emoji: '❤️', texto: 'Peito' },
  { id: 'barriga',  emoji: '👕', texto: 'Barriga' },
  { id: 'maos',     emoji: '✋', texto: 'Mãos' },
  { id: 'pernas',   emoji: '🦵', texto: 'Pernas' },
  { id: 'todo',     emoji: '🧍', texto: 'Corpo todo' },
  // Opção exclusiva: ao marcar, desmarca as outras.
  { id: 'nao-percebo', emoji: '🤷', texto: 'Não percebo em uma parte específica', exclusiva: true }
];

// Níveis de intensidade (carta 5). Sem números, sem pontuação.
const INTENSIDADES = [
  { id: 'fraquinha',   texto: 'Fraquinha',   tamanho: 60 },
  { id: 'media',       texto: 'Média',       tamanho: 100 },
  { id: 'muito-forte', texto: 'Muito forte', tamanho: 140 }
];

// Ordem da lista = ordem das fatias no sentido horário a partir do topo.
const EMOCOES = [
  {
    id: 'alegria', nome: 'Alegria', emoji: '😄', cor: '#F7C548', corTexto: '#5c4500',
    frase: 'A alegria é aquele sentimento gostoso, que faz a gente sorrir.',
    descricao: 'É uma emoção que nos aproxima das pessoas e das coisas de que gostamos. Ela pode ser grande ou pequenininha, e dá para dividir com quem está perto.',
    corpo: [
      { id: 'leve',    emoji: '🍃', texto: 'Corpo mais leve' },
      { id: 'pular',   emoji: '🤸', texto: 'Vontade de pular' },
      { id: 'sorriso', emoji: '😁', texto: 'Sorriso grande' },
      { id: 'calor',   emoji: '☀️', texto: 'Calor gostoso' }
    ],
    situacoes: [
      { id: 'brincar',  emoji: '🧸', texto: 'Brincar' },
      { id: 'carinho',  emoji: '🤗', texto: 'Receber carinho' },
      { id: 'presente', emoji: '🎁', texto: 'Ganhar um presente' },
      { id: 'amigos',   emoji: '👫', texto: 'Estar com amigos' }
    ],
    vontades: [
      { id: 'pular',   emoji: '🤸', texto: 'Pular' },
      { id: 'abracar', emoji: '🤗', texto: 'Abraçar alguém' },
      { id: 'contar',  emoji: '🗣️', texto: 'Contar para alguém' },
      { id: 'cantar',  emoji: '🎵', texto: 'Cantar' }
    ],
    pensamentos: ['Que legal!', 'Quero de novo!', 'Estou feliz!']
  },
  {
    id: 'raiva', nome: 'Raiva', emoji: '😠', cor: '#EE6C6A', corTexto: '#5e0f0b',
    frase: 'A raiva aparece quando algo nos incomoda muito.',
    descricao: 'É uma emoção que avisa que precisamos de algo diferente. Todo mundo sente raiva às vezes, e podemos aprender jeitos de lidar com ela.',
    corpo: [
      { id: 'coracao', emoji: '💓', texto: 'Coração acelerado' },
      { id: 'tensos',  emoji: '💪', texto: 'Músculos tensos' },
      { id: 'calor',   emoji: '🔥', texto: 'Calor' },
      { id: 'maos',    emoji: '✊', texto: 'Mãos fechadas' }
    ],
    situacoes: [
      { id: 'dividir', emoji: '🧩', texto: 'Dividir brinquedos' },
      { id: 'errar',   emoji: '✏️', texto: 'Errar' },
      { id: 'nao',     emoji: '🚫', texto: 'Ouvir "não"' },
      { id: 'pegar',   emoji: '✋', texto: 'Alguém pegar algo meu' }
    ],
    vontades: [
      { id: 'gritar', emoji: '📢', texto: 'Gritar' },
      { id: 'sair',   emoji: '🚶', texto: 'Sair de perto' },
      { id: 'pe',     emoji: '🦶', texto: 'Bater o pé' },
      { id: 'ajuda',  emoji: '🙋', texto: 'Pedir ajuda' }
    ],
    pensamentos: ['Isso não é justo!', 'É meu!', 'Eu não quero!']
  },
  {
    id: 'medo', nome: 'Medo', emoji: '😨', cor: '#9A85DA', corTexto: '#2e1652',
    frase: 'O medo aparece quando sentimos que algo pode nos machucar ou assustar.',
    descricao: 'É uma emoção que nos protege e nos ajuda a ter cuidado. Todo mundo sente medo às vezes, até os adultos.',
    corpo: [
      { id: 'frio',     emoji: '🥶', texto: 'Frio na barriga' },
      { id: 'coracao',  emoji: '💓', texto: 'Coração acelerado' },
      { id: 'esconder', emoji: '🙈', texto: 'Vontade de se esconder' },
      { id: 'pernas',   emoji: '🦵', texto: 'Pernas moles' }
    ],
    situacoes: [
      { id: 'barulho', emoji: '🔊', texto: 'Ouvir um barulho' },
      { id: 'escuro',  emoji: '🌑', texto: 'Ficar no escuro' },
      { id: 'novo',    emoji: '✨', texto: 'Experimentar algo novo' },
      { id: 'longe',   emoji: '👋', texto: 'Ficar longe de alguém' }
    ],
    vontades: [
      { id: 'sair',     emoji: '🚶', texto: 'Sair de perto' },
      { id: 'esconder', emoji: '🙈', texto: 'Me esconder' },
      { id: 'ajuda',    emoji: '🙋', texto: 'Pedir ajuda' },
      { id: 'abracar',  emoji: '🤗', texto: 'Abraçar alguém' }
    ],
    pensamentos: ['O que é isso?', 'E se acontecer alguma coisa?', 'Quero ficar perto de alguém.']
  },
  {
    id: 'nojo', nome: 'Nojo', emoji: '🤢', cor: '#63BE86', corTexto: '#0f3d17',
    frase: 'O nojo aparece quando algo nos faz querer ficar longe.',
    descricao: 'É uma emoção que protege o nosso corpo. Cada pessoa sente nojo de coisas diferentes, e tudo bem.',
    corpo: [
      { id: 'careta',  emoji: '😖', texto: 'Careta' },
      { id: 'barriga', emoji: '🤢', texto: 'Barriga ruim' },
      { id: 'cuspir',  emoji: '😝', texto: 'Vontade de cuspir' },
      { id: 'virar',   emoji: '🙄', texto: 'Vontade de virar o rosto' }
    ],
    situacoes: [
      { id: 'comida', emoji: '🥦', texto: 'Experimentar uma comida nova' },
      { id: 'cheiro', emoji: '👃', texto: 'Sentir um cheiro ruim' },
      { id: 'sujo',   emoji: '🗑️', texto: 'Ver algo sujo' }
    ],
    vontades: [
      { id: 'sair',  emoji: '🚶', texto: 'Sair de perto' },
      { id: 'virar', emoji: '🙄', texto: 'Virar o rosto' },
      { id: 'falar', emoji: '🙅', texto: 'Falar que não quero' },
      { id: 'ajuda', emoji: '🙋', texto: 'Pedir ajuda' }
    ],
    pensamentos: ['Eca!', 'Não quero chegar perto!', 'Que cheiro estranho!']
  },
  {
    id: 'tristeza', nome: 'Tristeza', emoji: '😢', cor: '#5C9CE6', corTexto: '#0b2a57',
    frase: 'A tristeza aparece quando algo nos deixa com o coração apertadinho.',
    descricao: 'É uma emoção que mostra que algo é importante para nós. Todo mundo sente tristeza às vezes, e ela pode ser acolhida com carinho.',
    corpo: [
      { id: 'chorar',   emoji: '😭', texto: 'Vontade de chorar' },
      { id: 'peito',    emoji: '💔', texto: 'Peito apertado' },
      { id: 'pesado',   emoji: '🐘', texto: 'Corpo pesado' },
      { id: 'esconder', emoji: '🙈', texto: 'Vontade de se esconder' }
    ],
    situacoes: [
      { id: 'longe',    emoji: '👋', texto: 'Ficar longe de alguém' },
      { id: 'perder',   emoji: '🧸', texto: 'Perder um brinquedo' },
      { id: 'deixado',  emoji: '🚶', texto: 'Ser deixado de lado' }
    ],
    vontades: [
      { id: 'chorar',    emoji: '😭', texto: 'Chorar' },
      { id: 'quieto',    emoji: '🤫', texto: 'Ficar quietinho' },
      { id: 'colo',      emoji: '👐', texto: 'Pedir colo' },
      { id: 'conversar', emoji: '💬', texto: 'Conversar' }
    ],
    pensamentos: ['Queria que fosse diferente.', 'Sinto falta de alguém.', 'Queria um abraço.']
  }
];

// Cartas investigativas — ordem e perguntas exatamente como no briefing.
const CARTAS = [
  { id: 'onde',        pergunta: 'Onde sinto essa emoção?',        tipo: 'corpo',
    dica: 'Toque em uma ou mais partes do corpo.' },
  { id: 'corpo',       pergunta: 'Como meu corpo fica?',           tipo: 'multi', fonte: 'corpo',
    dica: 'Toque no que combina com você. Pode ser nenhum.' },
  { id: 'pensamento',  pergunta: 'O que passa pela minha cabeça?', tipo: 'texto',
    dica: 'O que você pensa quando sente isso?' },
  { id: 'quando',      pergunta: 'Quando isso acontece?',          tipo: 'multi', fonte: 'situacoes', outro: true,
    dica: 'Toque nas situações que lembram você.' },
  { id: 'intensidade', pergunta: 'Qual é a intensidade?',          tipo: 'intensidade',
    dica: 'Como ela está agora?' },
  { id: 'vontade',     pergunta: 'O que tenho vontade de fazer?',  tipo: 'multi', fonte: 'vontades',
    dica: 'Toque no que você tem vontade de fazer.',
    aviso: 'Sentir vontade não quer dizer que a gente precise fazer.' }
];

const ESTRATEGIAS = [
  { id: 'respirar',  nome: 'Respirar devagar',             emoji: '🌬️', tipo: 'respiracao' },
  { id: 'pausa',     nome: 'Fazer uma pausa',              emoji: '⏸️', tipo: 'pausa' },
  { id: 'ajuda',     nome: 'Pedir ajuda',                  emoji: '🙋', tipo: 'ajuda' },
  { id: 'conversar', nome: 'Conversar sobre o que sente',  emoji: '💬', tipo: 'conversa' },
  { id: 'desenhar',  nome: 'Desenhar o que está sentindo', emoji: '🎨', tipo: 'desenho' },
  { id: 'lugar',     nome: 'Escolher um lugar tranquilo',  emoji: '🛋️', tipo: 'lugar' }
];

// Conteúdo das telas de prática.
const PRATICA = {
  ajudaPessoas: [
    { id: 'mamae',     emoji: '👩',    texto: 'Mamãe' },
    { id: 'papai',     emoji: '👨',    texto: 'Papai' },
    { id: 'professor', emoji: '🧑‍🏫', texto: 'Professor(a)' },
    { id: 'outro',     emoji: '🧑',    texto: 'Outro adulto de confiança' }
  ],
  lugares: [
    { id: 'cama',     emoji: '🛏️', texto: 'Minha cama' },
    { id: 'sofa',     emoji: '🛋️', texto: 'O sofá' },
    { id: 'cantinho', emoji: '🧸', texto: 'Um cantinho com almofadas' },
    { id: 'jardim',   emoji: '🌳', texto: 'Perto das plantas' },
    { id: 'adulto',   emoji: '🤗', texto: 'Perto de um adulto' },
    { id: 'outro',    emoji: '✨', texto: 'Outro lugar' }
  ],
  conversaCrianca: [
    'Eu senti...',
    'Aconteceu que...',
    'Agora eu queria...'
  ],
  conversaAdulto: [
    'Pergunte: "O que aconteceu?"',
    'Pergunte: "Como foi sentir isso?"',
    'Diga: "Faz sentido você sentir isso."',
    'Pergunte: "O que pode te ajudar agora?"',
    'Escute com calma, sem pressa e sem corrigir.'
  ],
  coresDesenho: ['#222222', '#F25C54', '#FF9F1C', '#FFD43B', '#5CC46B', '#4D96FF', '#9B6DD6', '#FF77B7']
};

// Textos gerais da interface.
const TEXTOS = {
  titulo: 'Roleta das Emoções',
  sobretitulo: 'Educação emocional · 4 a 6 anos',
  boasVindas: 'Vamos brincar de conhecer o que a gente sente? Todas as emoções são importantes.',
  selos: [
    { emoji: '👥', texto: 'Para brincar junto com um adulto' },
    { emoji: '🔒', texto: 'Nada fica salvo' },
    { emoji: '🌈', texto: 'Não tem certo nem errado' }
  ],
  etapas: [
    { id: 'roleta',      texto: 'Roleta' },
    { id: 'emocao',      texto: 'Emoção' },
    { id: 'carta',       texto: 'Perguntas' },
    { id: 'estrategias', texto: 'Cuidar' },
    { id: 'final',       texto: 'Final' }
  ],
  roletaInstrucao: 'Toque no botão para girar a roleta.',
  estrategiasTitulo: 'Que tal experimentar um jeito de cuidar de você?',
  estrategiasDica: 'Escolha uma para experimentar com o adulto.',
  finalTitulo: 'Obrigado por brincar!',
  finalMensagem: 'Sentir é normal. Agora você conhece jeitos de cuidar de você enquanto sente suas emoções.',
  avisoAdulto: 'Este material é um apoio para a conversa entre a criança e o adulto. Não é teste, diagnóstico ou avaliação psicológica.',
  apoioAdulto: 'As respostas não são certas nem erradas e não há pontuação. O objetivo não é que a criança "controle" suas emoções, mas que tenha ferramentas para lidar com elas de forma mais segura, saudável e confiante. Use estas anotações como ponto de partida para conversar.',
  status: {
    'pulada': 'Carta pulada',
    'nao-sei': 'Não sei',
    'prefiro-nao': 'Preferiu não responder',
    'sem-resposta': 'Não chegou nesta carta'
  }
};

// Conteúdo da aba "Sobre" (baseado nas seções 1 e 2 da documentação).
const SOBRE = {
  titulo: 'Sobre a Roleta das Emoções',
  intro: 'Um site de apoio à educação emocional de crianças de 4 a 6 anos, feito para ser usado junto com um adulto mediador: psicólogo, educador, familiar ou outro responsável.',
  secoes: [
    { titulo: 'O que é',
      texto: 'A versão digital de uma atividade que já existe em formato físico, com roleta, cartões de emoções e cartões de estratégias. A criança gira a roleta, conhece a emoção sorteada, conversa sobre como ela aparece e escolhe um jeito de cuidar de si.' },
    { titulo: 'O que não é', destaque: true,
      texto: 'Não é teste, diagnóstico nem avaliação psicológica. Não há pontuação, não há respostas certas ou erradas e nenhuma emoção é apresentada como boa ou ruim.' },
    { titulo: 'Para que serve',
      lista: [
        'Reconhecer e nomear emoções básicas.',
        'Perceber sinais do corpo associados às emoções.',
        'Explorar pensamentos, situações e vontades que acompanham uma emoção.',
        'Conhecer e experimentar estratégias de regulação emocional.',
        'Estimular a conversa entre a criança e o adulto.'
      ] },
    { titulo: 'Como usar',
      lista: [
        'Gire a roleta e conheça a emoção sorteada.',
        'Respondam juntos às seis cartas. Todas podem ser puladas.',
        'Escolham uma estratégia para experimentar.',
        'No final, o adulto pode ver e imprimir um resumo da conversa.'
      ] },
    { titulo: 'Privacidade',
      texto: 'Nenhuma informação é salva ou enviada. Ao fechar ou recarregar a página, as respostas são apagadas.' }
  ],
  lembrete: 'O objetivo não é que a criança "controle" suas emoções, mas que tenha ferramentas para lidar com elas de forma mais segura, saudável e confiante.'
};

// Explicações do botão "Não sei": uma por pergunta, para cada emoção.
// Ajudam a entender a pergunta, sem indicar resposta.
const AJUDA_CARTAS = {
  alegria: {
    onde:        'Pense em um momento bem feliz. Em que parte do corpo você sentiu algo diferente? Pode ser no rosto, no peito ou no corpo todo.',
    corpo:       'Quando estamos alegres, o corpo muda um pouquinho. Será que ele fica mais animado, mais quentinho ou com vontade de se mexer?',
    pensamento:  'Lembre de uma vez em que você ficou alegre. O que pensou naquela hora? Pode contar para o adulto do seu jeito.',
    quando:      'Pense em coisas que deixam você contente. Pode ser algo que você fez, ganhou ou alguém com quem estava.',
    intensidade: 'A alegria pode ser pequenininha, como um sorriso, ou enorme, de dar pulos. Como ela está em você agora?',
    vontade:     'Quando ficamos alegres, às vezes dá vontade de fazer alguma coisa. O que dá vontade em você?'
  },
  raiva: {
    onde:        'Lembre de uma vez em que você ficou com raiva. Onde sentiu ela no corpo? Pode ser nas mãos, no rosto ou no peito.',
    corpo:       'A raiva costuma mexer com o corpo. Será que ele fica mais quente, mais duro ou mais agitado?',
    pensamento:  'Pense em uma vez em que ficou com raiva. O que passou pela sua cabeça? Pode contar do seu jeito.',
    quando:      'Pense em uma situação que deixou você com raiva. Pode ser em casa, na escola ou brincando.',
    intensidade: 'A raiva pode ser só um incômodo ou ficar bem forte. Como ela está agora?',
    vontade:     'Com raiva, às vezes dá vontade de fazer alguma coisa. Lembre: sentir vontade é diferente de fazer.'
  },
  medo: {
    onde:        'Lembre de uma vez em que sentiu medo. Onde o corpo avisou? Pode ser na barriga, no coração ou nas pernas.',
    corpo:       'O medo deixa o corpo em alerta. Será que ele treme, fica gelado ou quer se encolher?',
    pensamento:  'Pense em algo que já deu medo em você. O que você pensou naquela hora?',
    quando:      'Pense em situações que trazem medo. Pode ser algo novo, um barulho ou ficar longe de alguém.',
    intensidade: 'O medo pode ser só um friozinho ou um susto grande. Como ele está agora?',
    vontade:     'Com medo, o corpo quer se proteger. O que você tem vontade de fazer quando sente medo?'
  },
  nojo: {
    onde:        'Lembre de algo que deu nojo em você. Onde sentiu? Pode ser no nariz, na boca ou na barriga.',
    corpo:       'O nojo faz o corpo querer se afastar. Será que o rosto faz careta ou a barriga fica estranha?',
    pensamento:  'Pense em algo que deu nojo em você. O que pensou na hora?',
    quando:      'Pense em coisas que dão nojo. Pode ser um cheiro, uma comida ou algo sujo.',
    intensidade: 'O nojo pode ser fraquinho ou muito forte. Como ele está agora?',
    vontade:     'Quando sentimos nojo, dá vontade de ficar longe. O que você tem vontade de fazer?'
  },
  tristeza: {
    onde:        'Lembre de uma vez em que ficou triste. Onde você sentiu? Pode ser no peito, nos olhos ou no corpo todo.',
    corpo:       'A tristeza pode deixar o corpo diferente. Será que ele fica mais pesado, mais cansado ou com vontade de chorar?',
    pensamento:  'Pense em uma vez em que ficou triste. O que passou pela sua cabeça?',
    quando:      'Pense em situações que deixam você triste. Pode ser sentir falta de alguém ou perder algo.',
    intensidade: 'A tristeza pode ser pequenininha ou bem grande. Como ela está agora?',
    vontade:     'Quando estamos tristes, às vezes queremos colo ou ficar quietinhos. O que dá vontade em você?'
  }
};
