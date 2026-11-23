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
  { id: 'bracos',   emoji: '💪', texto: 'Braços' },
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

// Cartas investigativas: a parte do corpo e, depois, as cartas de cuidado.
const CARTAS = [
  { id: 'onde',        pergunta: 'Onde sinto essa emoção?',        tipo: 'corpo',
    dica: 'Toque em uma ou mais partes do corpo.' },
  { id: 'cuidar',      pergunta: 'Como posso cuidar dessa emoção?', tipo: 'regulacao',
    dica: 'Toque numa cartinha para ver como fazer. Escolha as que quiser experimentar.' }
];

// Etapa "Cuidar": só a opção de desenhar.
const ESTRATEGIAS = [
  { id: 'desenhar',  nome: 'Desenhar o que está sentindo', emoji: '🎨', tipo: 'desenho' }
];

/* Cartas de regulação (carta "Como posso cuidar dessa emoção?").
   10 por emoção. Textos de cartas-regulacao.md, sem alteração.
   A ilustração de cada carta é desenhada em js/ilustracoes.js
   (chave: emoção + número da carta). */
const CARTAS_REGULACAO = {
  raiva: [
    { nome: 'Respiração do balão',
      comoRegular: 'inspirar pelo nariz enchendo a barriga como um balão e soltar o ar devagar pela boca.',
      pergunta: 'O que o seu corpo sente quando fica bravo? Onde sente primeiro?',
      ilustracao: 'criança com as mãos na barriga, que está inflada como um balão.' },
    { nome: 'Apertar e soltar',
      comoRegular: 'apertar os punhos bem forte por alguns segundos e depois soltar, sentindo o corpo relaxar.',
      pergunta: 'Como ficam suas mãos quando você está com raiva? E depois de soltar?',
      ilustracao: 'criança apertando os punhos e, ao lado, mãos abertas e relaxadas.' },
    { nome: 'Contar até dez',
      comoRegular: 'contar devagar até dez, respirando entre os números, antes de decidir o que fazer.',
      pergunta: 'O que acontece com a raiva enquanto você conta?',
      ilustracao: 'criança de olhos fechados com números de 1 a 10 flutuando ao redor.' },
    { nome: 'Abraço na almofada',
      comoRegular: 'abraçar uma almofada com força para acalmar o corpo.',
      pergunta: 'Qual coisa ou pessoa te acalma quando você está bravo?',
      ilustracao: 'criança abraçando uma almofada grande, com expressão mais calma.' },
    { nome: 'Cantinho calmo',
      comoRegular: 'ir para um lugar tranquilo por alguns minutos para esfriar a cabeça.',
      pergunta: 'Como seria o seu cantinho calmo? O que teria nele?',
      ilustracao: 'criança sentada em um cantinho com almofadas, tapete e um ursinho.' },
    { nome: 'Dizer com palavras',
      comoRegular: 'usar a frase "Eu estou bravo(a) porque..." em vez de gritar ou bater.',
      pergunta: 'Como você consegue contar para alguém que está bravo?',
      ilustracao: 'balões de fala entre duas crianças conversando.' },
    { nome: 'Desenhar a raiva',
      comoRegular: 'rabiscar ou desenhar a raiva em um papel, com a cor e o formato que ela tiver.',
      pergunta: 'Que cor e que formato a sua raiva tem?',
      ilustracao: 'criança rabiscando uma folha com giz de cera vermelho.' },
    { nome: 'Pedir ajuda',
      comoRegular: 'procurar um adulto de confiança quando a raiva estiver muito grande.',
      pergunta: 'Quem pode te ajudar quando você está muito bravo?',
      ilustracao: 'criança de mãos dadas com um adulto, ambos sentados.' },
    { nome: 'Mexer o corpo',
      comoRegular: 'pular, andar ou fazer força contra a parede para gastar a energia da raiva.',
      pergunta: 'O que seu corpo precisa fazer quando está cheio de raiva?',
      ilustracao: 'criança pulando com linhas de movimento e energia saindo do corpo.' },
    { nome: 'Esfriar o vulcão',
      comoRegular: 'imaginar a raiva como um vulcão e respirar até ele esfriar.',
      pergunta: 'Se a raiva fosse um vulcão, como você faria ele esfriar?',
      ilustracao: 'vulcão fumegante ficando azul e calmo, com criança respirando ao lado.' }
  ],
  alegria: [
    { nome: 'Guardar o momento',
      comoRegular: 'fechar os olhos e guardar na memória o que está sendo bom agora.',
      pergunta: 'O que está te deixando feliz? Como o corpo sente isso?',
      ilustracao: 'criança de olhos fechados, sorrindo, com a mão no peito.' },
    { nome: 'Compartilhar',
      comoRegular: 'contar a alguém o que deixou você feliz.',
      pergunta: 'Com quem você gosta de dividir as coisas boas?',
      ilustracao: 'duas crianças sorrindo e conversando, com corações ao redor.' },
    { nome: 'Dançar',
      comoRegular: 'colocar a alegria para fora dançando ou se movimentando.',
      pergunta: 'Como o seu corpo mostra que está feliz?',
      ilustracao: 'criança dançando com notas musicais no ar.' },
    { nome: 'Baixar a velocidade',
      comoRegular: 'quando a alegria é grande demais, respirar fundo para o corpo desacelerar.',
      pergunta: 'O que você faz quando está tão animado que não consegue parar?',
      ilustracao: 'criança respirando fundo, com um velocímetro passando de rápido para devagar.' },
    { nome: 'Dizer obrigado',
      comoRegular: 'lembrar de algo bom do dia e agradecer.',
      pergunta: 'Qual foi a coisa boa que aconteceu hoje?',
      ilustracao: 'criança com um coração nas mãos e um sol sorrindo.' },
    { nome: 'Desenhar o momento feliz',
      comoRegular: 'desenhar algo que fez você sentir alegria.',
      pergunta: 'Como seria o desenho do seu dia mais feliz?',
      ilustracao: 'criança desenhando um sol e uma festa em uma folha.' },
    { nome: 'Olhar o outro',
      comoRegular: 'perceber se quem está perto também está feliz e se divertindo.',
      pergunta: 'Como você percebe que o outro também está se divertindo?',
      ilustracao: 'grupo de crianças brincando, com atenção a uma criança que observa.' },
    { nome: 'Caixa de memórias',
      comoRegular: 'guardar lembranças boas em uma caixinha para olhar quando precisar.',
      pergunta: 'O que você colocaria na sua caixa de coisas felizes?',
      ilustracao: 'caixa aberta com estrelas, fotos e desenhos saindo dela.' },
    { nome: 'Gesto gentil',
      comoRegular: 'fazer algo bom por alguém para espalhar a alegria.',
      pergunta: 'O que você poderia fazer para alegrar alguém?',
      ilustracao: 'criança entregando uma flor para um amigo.' },
    { nome: 'Celebrar com calma',
      comoRegular: 'comemorar com um abraço ou um sorriso, respeitando o espaço dos outros.',
      pergunta: 'Como você gosta de comemorar quando algo dá certo?',
      ilustracao: 'duas crianças se abraçando com confete caindo.' }
  ],
  tristeza: [
    { nome: 'Pode chorar',
      comoRegular: 'permitir-se chorar, pois chorar ajuda o corpo a soltar a tristeza.',
      pergunta: 'O que você sente quando chora? Depois de chorar, como fica?',
      ilustracao: 'criança sentada com lágrimas e um adulto acolhedor por perto.' },
    { nome: 'Pedir um abraço',
      comoRegular: 'pedir um abraço a alguém de confiança.',
      pergunta: 'Quem te dá um abraço bom quando você está triste?',
      ilustracao: 'criança sendo abraçada por um adulto ou amigo.' },
    { nome: 'Falar sobre o que dói',
      comoRegular: 'contar para alguém o que está deixando você triste.',
      pergunta: 'O que está pesando no seu coração hoje?',
      ilustracao: 'criança com um coração pesado e um balão de fala saindo dele.' },
    { nome: 'Desenhar a tristeza',
      comoRegular: 'desenhar ou pintar a tristeza, com a cor e a forma que ela tiver.',
      pergunta: 'Que cor tem a sua tristeza?',
      ilustracao: 'criança pintando com tons de azul.' },
    { nome: 'Mão no coração',
      comoRegular: 'colocar a mão no peito, respirar e dizer algo gentil para si mesmo.',
      pergunta: 'O que você diria a um amigo que está se sentindo assim?',
      ilustracao: 'criança com a mão no peito e uma luz suave ao redor.' },
    { nome: 'Lembrar do que é bom',
      comoRegular: 'lembrar de pessoas, lugares ou momentos que fazem bem.',
      pergunta: 'Que lembrança boa te faz sentir melhor?',
      ilustracao: 'criança com um balão de pensamento mostrando um passeio feliz.' },
    { nome: 'Música calma',
      comoRegular: 'ouvir uma música tranquila para acalmar o coração.',
      pergunta: 'Que música ou som te acalma?',
      ilustracao: 'criança de fones de ouvido, sentada, com notas musicais suaves.' },
    { nome: 'Ar livre',
      comoRegular: 'sair um pouco, olhar o céu ou caminhar para mudar de ares.',
      pergunta: 'Onde você gosta de ir quando quer se sentir melhor?',
      ilustracao: 'criança olhando o céu em um parque, com árvores e nuvens.' },
    { nome: 'Tristeza é nuvem',
      comoRegular: 'lembrar que a tristeza passa, como uma nuvem que vai embora.',
      pergunta: 'Já se sentiu triste e depois melhorou? O que ajudou?',
      ilustracao: 'nuvem chuvosa se afastando e o sol aparecendo atrás de uma criança.' },
    { nome: 'Quem pode ajudar',
      comoRegular: 'escolher uma pessoa de confiança para procurar quando a tristeza for grande.',
      pergunta: 'Quem são as pessoas a quem você pode recorrer?',
      ilustracao: 'criança cercada por rostos de pessoas queridas.' }
  ],
  medo: [
    { nome: 'Respirar flor e vela',
      comoRegular: 'cheirar uma flor imaginária (inspirar) e soprar uma vela (soltar o ar).',
      pergunta: 'Onde o medo aparece no seu corpo? E quando respira, o que muda?',
      ilustracao: 'criança com uma flor em uma mão e uma vela na outra.' },
    { nome: 'Dar nome ao medo',
      comoRegular: 'dizer em voz alta "Eu estou com medo de...".',
      pergunta: 'Do que você sente medo? Como ele é?',
      ilustracao: 'criança falando e um monstrinho do medo aparecendo pequeno ao lado.' },
    { nome: 'Objeto de conforto',
      comoRegular: 'segurar um brinquedo ou objeto que traz segurança.',
      pergunta: 'O que te faz sentir seguro quando tem medo?',
      ilustracao: 'criança abraçando um ursinho, com um escudo brilhando em volta.' },
    { nome: 'Ficar perto de alguém',
      comoRegular: 'pedir para alguém de confiança ficar por perto.',
      pergunta: 'Quem você gostaria de ter ao lado quando sente medo?',
      ilustracao: 'criança de mãos dadas com um adulto na escuridão suave.' },
    { nome: 'Passos pequenos',
      comoRegular: 'enfrentar o medo aos poucos, um passinho de cada vez.',
      pergunta: 'Qual seria o primeiro passinho para enfrentar esse medo?',
      ilustracao: 'escada pequena com uma criança subindo o primeiro degrau.' },
    { nome: 'Cinco sentidos',
      comoRegular: 'olhar 5 coisas, ouvir 4, tocar 3, cheirar 2 e sentir 1 gosto para voltar ao agora.',
      pergunta: 'O que você consegue ver e ouvir à sua volta agora?',
      ilustracao: 'criança com ícones de olho, ouvido, mão, nariz e boca.' },
    { nome: 'Frase de coragem',
      comoRegular: 'repetir "Eu sou capaz, eu estou seguro(a)".',
      pergunta: 'Qual frase te dá coragem?',
      ilustracao: 'criança com capa de herói e um balão de fala com uma estrela.' },
    { nome: 'Medo bem pequeno',
      comoRegular: 'imaginar o medo bem pequeno ou com uma aparência engraçada.',
      pergunta: 'Como ficaria o seu medo se ele fosse engraçado?',
      ilustracao: 'monstrinho do medo encolhendo, com chapéu de festa.' },
    { nome: 'Lugar seguro',
      comoRegular: 'fechar os olhos e imaginar um lugar em que se sente protegido.',
      pergunta: 'Como é o seu lugar seguro? O que tem lá?',
      ilustracao: 'criança dentro de uma bolha com uma casinha na árvore e sol.' },
    { nome: 'O que ajudaria',
      comoRegular: 'contar a um adulto o que ajudaria a se sentir mais seguro.',
      pergunta: 'O que as pessoas poderiam fazer para te ajudar com o medo?',
      ilustracao: 'criança conversando com um adulto, ambos sorrindo levemente.' }
  ],
  nojo: [
    { nome: 'Sinal do corpo',
      comoRegular: 'perceber que o nojo é um aviso do corpo para se afastar de algo.',
      pergunta: 'Quando você sente nojo? Onde o corpo sente?',
      ilustracao: 'criança franzindo o nariz com uma setinha apontando para o corpo.' },
    { nome: 'Afastar-se',
      comoRegular: 'ficar longe do que causa o incômodo.',
      pergunta: 'O que você faz quando algo te dá nojo?',
      ilustracao: 'criança dando um passo para trás de um objeto desconhecido.' },
    { nome: 'Dizer "não gosto"',
      comoRegular: 'falar com calma "Isso me incomoda".',
      pergunta: 'Como você explica que algo te deu nojo sem machucar ninguém?',
      ilustracao: 'criança com um balão de fala e a mão levantada em sinal de pare.' },
    { nome: 'Respirar e pausar',
      comoRegular: 'respirar fundo e fazer uma pausa antes de reagir.',
      pergunta: 'O que ajuda a sensação de nojo passar?',
      ilustracao: 'criança respirando de olhos fechados, com ondas suaves ao redor.' },
    { nome: 'Limpar-se',
      comoRegular: 'lavar as mãos ou se limpar para se sentir melhor.',
      pergunta: 'Como você se sente depois de se limpar?',
      ilustracao: 'criança lavando as mãos com bolhas de sabão.' },
    { nome: 'Conhecer aos poucos',
      comoRegular: 'chegar perto de algo novo devagar: olhar, depois cheirar, sem obrigação de provar.',
      pergunta: 'O que daria para fazer primeiro, sem forçar?',
      ilustracao: 'criança olhando um prato novo, com uma seta passo a passo.' },
    { nome: 'Cada um sente diferente',
      comoRegular: 'entender que o que dá nojo em uma pessoa pode não dar em outra.',
      pergunta: 'Já aconteceu de algo dar nojo em você e não em um amigo?',
      ilustracao: 'duas crianças reagindo diferente ao mesmo objeto.' },
    { nome: 'Pedir ajuda',
      comoRegular: 'pedir a um adulto que resolva ou retire o que está incomodando.',
      pergunta: 'Quem pode te ajudar quando algo te dá nojo?',
      ilustracao: 'criança apontando para algo e um adulto vindo ajudar.' },
    { nome: 'Trocar de lugar',
      comoRegular: 'mudar de ambiente se o incômodo continuar.',
      pergunta: 'Para onde você pode ir quando algo te incomoda?',
      ilustracao: 'criança caminhando de um cômodo bagunçado para um limpo.' },
    { nome: 'Nojo ou medo?',
      comoRegular: 'aprender a diferenciar nojo de outras emoções, como o medo.',
      pergunta: 'Como o nojo é diferente do medo no corpo?',
      ilustracao: 'dois rostos, um com nojo e outro com medo, lado a lado.' }
  ]
};

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
    vontade:     'Quando ficamos alegres, às vezes dá vontade de fazer alguma coisa. O que dá vontade em você?',
    cuidar:      'Olhe as cartinhas com o adulto. Qual delas parece boa para cuidar da alegria? Pode escolher uma, várias ou nenhuma.'
  },
  raiva: {
    onde:        'Lembre de uma vez em que você ficou com raiva. Onde sentiu ela no corpo? Pode ser nas mãos, no rosto ou no peito.',
    corpo:       'A raiva costuma mexer com o corpo. Será que ele fica mais quente, mais duro ou mais agitado?',
    pensamento:  'Pense em uma vez em que ficou com raiva. O que passou pela sua cabeça? Pode contar do seu jeito.',
    quando:      'Pense em uma situação que deixou você com raiva. Pode ser em casa, na escola ou brincando.',
    intensidade: 'A raiva pode ser só um incômodo ou ficar bem forte. Como ela está agora?',
    vontade:     'Com raiva, às vezes dá vontade de fazer alguma coisa. Lembre: sentir vontade é diferente de fazer.',
    cuidar:      'Olhe as cartinhas com o adulto. Qual delas parece boa para cuidar da raiva? Pode escolher uma, várias ou nenhuma.'
  },
  medo: {
    onde:        'Lembre de uma vez em que sentiu medo. Onde o corpo avisou? Pode ser na barriga, no coração ou nas pernas.',
    corpo:       'O medo deixa o corpo em alerta. Será que ele treme, fica gelado ou quer se encolher?',
    pensamento:  'Pense em algo que já deu medo em você. O que você pensou naquela hora?',
    quando:      'Pense em situações que trazem medo. Pode ser algo novo, um barulho ou ficar longe de alguém.',
    intensidade: 'O medo pode ser só um friozinho ou um susto grande. Como ele está agora?',
    vontade:     'Com medo, o corpo quer se proteger. O que você tem vontade de fazer quando sente medo?',
    cuidar:      'Olhe as cartinhas com o adulto. Qual delas parece boa para cuidar do medo? Pode escolher uma, várias ou nenhuma.'
  },
  nojo: {
    onde:        'Lembre de algo que deu nojo em você. Onde sentiu? Pode ser no nariz, na boca ou na barriga.',
    corpo:       'O nojo faz o corpo querer se afastar. Será que o rosto faz careta ou a barriga fica estranha?',
    pensamento:  'Pense em algo que deu nojo em você. O que pensou na hora?',
    quando:      'Pense em coisas que dão nojo. Pode ser um cheiro, uma comida ou algo sujo.',
    intensidade: 'O nojo pode ser fraquinho ou muito forte. Como ele está agora?',
    vontade:     'Quando sentimos nojo, dá vontade de ficar longe. O que você tem vontade de fazer?',
    cuidar:      'Olhe as cartinhas com o adulto. Qual delas parece boa para cuidar do nojo? Pode escolher uma, várias ou nenhuma.'
  },
  tristeza: {
    onde:        'Lembre de uma vez em que ficou triste. Onde você sentiu? Pode ser no peito, nos olhos ou no corpo todo.',
    corpo:       'A tristeza pode deixar o corpo diferente. Será que ele fica mais pesado, mais cansado ou com vontade de chorar?',
    pensamento:  'Pense em uma vez em que ficou triste. O que passou pela sua cabeça?',
    quando:      'Pense em situações que deixam você triste. Pode ser sentir falta de alguém ou perder algo.',
    intensidade: 'A tristeza pode ser pequenininha ou bem grande. Como ela está agora?',
    vontade:     'Quando estamos tristes, às vezes queremos colo ou ficar quietinhos. O que dá vontade em você?',
    cuidar:      'Olhe as cartinhas com o adulto. Qual delas parece boa para cuidar da tristeza? Pode escolher uma, várias ou nenhuma.'
  }
};
