# Roleta das Emoções

Site infantil de apoio à educação emocional (4 a 6 anos), feito com HTML, CSS e JavaScript puros.

## Como abrir

Dê um duplo clique em `index.html`. Ele abre no Chrome, no Edge ou no Firefox e não precisa de internet nem de instalação.

Nada é salvo: fechar ou recarregar a página apaga as respostas.

## Como editar o conteúdo

Todos os textos e opções ficam em `js/data.js`:

- `EMOCOES`: nome, cor, emoji, frase e as opções das cartas 2, 3, 4 e 6 de cada emoção. A ordem da lista é a ordem das fatias na roleta.
- `REGIOES_CORPO`: as opções da carta 1.
- `INTENSIDADES`: a escala da carta 5.
- `CARTAS`: as perguntas das cartas investigativas.
- `ESTRATEGIAS` e `PRATICA`: as estratégias e o conteúdo das telas de prática.
- `TEXTOS`: os textos gerais e os avisos do resumo.

Dica: prefira emojis antigos e bem conhecidos. Os mais novos aparecem como um quadrado no Windows 10.

## Estrutura

| Arquivo | Função |
|---|---|
| `index.html` | Página única, botões de topo e modal de configurações |
| `css/style.css` | Tema, layout, animações e impressão |
| `js/data.js` | Conteúdo (somente dados) |
| `js/state.js` | Estado da sessão em memória |
| `js/audio.js` | Sons com a Web Audio API |
| `js/wheel.js` | Roleta em SVG, sorteio e animação |
| `js/screens.js` | Uma função por tela |
| `js/app.js` | Navegação e eventos |
