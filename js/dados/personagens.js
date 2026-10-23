/* ====================================================================
   PERSONAGENS
   Cada personagem tem:
     nome   : como aparece na caixa de diálogo
     cor    : cor do nome
     img    : caminho do PNG (fundo transparente, personagem de frente,
              com os pés encostados na borda de baixo da imagem).
              Sugestão: 800 x 1200 px. Deixe '' enquanto não tiver a imagem
              (aparece um quadro tracejado no lugar).
     altura : (opcional) tamanho em % do palco. Padrão 100. A gata é menor.
   O "id" (victor, amora...) é o que você escreve nas falas: fala('victor', '...')
   ==================================================================== */
const PERSONAGENS = {
  victor: { nome: 'Victor',       cor: '#ffb347', img: 'img/personagens/victor.png' },
  amora:  { nome: 'Amora',        cor: '#ffd23f', img: 'img/personagens/amora.png', altura: 60 },
  tomas:  { nome: 'Tomás',        cor: '#c9a36b', img: 'img/personagens/tomas.png' },
  celeste:{ nome: 'Dona Celeste', cor: '#c9a0dc', img: 'img/personagens/celeste.png' },
  helena: { nome: 'Helena',       cor: '#d9772b', img: 'img/personagens/helena.png', altura: 90 },
  // augusto:{ nome: 'Augusto Valença', cor: '#9fb0c8', img: 'img/personagens/augusto.png' },
};
