/* ====================================================================
   CONFIGURAÇÕES, VARIÁVEIS E REGRAS DE FIM DE JOGO
   ==================================================================== */
const CENA_INICIAL = 1;          // id da primeira cena (chave em CENAS, no arquivo cenas.js)
const VELOCIDADE_TEXTO = 20;     // milissegundos por letra (menor = texto mais rápido)

/* Limites das auras (efeito visual e sonoro):
   Reserva igual ou abaixo de LIMITE_RESERVA → aura VERMELHA + batimento cardíaco.
   Remorso igual ou acima de LIMITE_REMORSO  → aura ROXA + sino grave. */
const LIMITE_RESERVA = 20;
const LIMITE_REMORSO = 50;

/* As barras do jogo. Para criar uma nova, copie uma linha.
   id = nome usado nos "efeitos" das escolhas | inicial = valor ao começar (0 a 100) */
const VARIAVEIS = [
  { id: 'reserva', rotulo: 'Reserva', cor: '#e11d38', inicial: 60 },
  { id: 'remorso', rotulo: 'Remorso', cor: '#8b3dff', inicial: 15 },
  { id: 'helena',  rotulo: 'Helena',  cor: '#7fb2ff', inicial: 0  },
];

/* Memória do jogo. Os valores das barras ficam aqui (ESTADO.reserva...), as escolhas feitas
   em ESTADO.escolhas ({ 1: 'A', 2: 'B' }: cena → letra) e os marcadores em ESTADO.usouMetodo. */
const ESTADO = { escolhas: {}, usouMetodo: false };

/* REGRAS DE FIM ANTECIPADO. O motor chama esta função ao entrar numa cena ('entrar')
   e ao terminá-la ('sair'). Devolve o id de um final, ou null para seguir normalmente.
   Os finais 1A, 1B, 2A, 2B, 3B são decididos pela "proxima" da Cena 4 (em cenas.js). */
function verificarFim(cena, momento) {
  if (String(cena).startsWith('final')) return null;
  // Reserva zerada em qualquer momento → Final 3C (exceto ao fim da Cena 4, que decide sozinha)
  if (ESTADO.reserva <= 0 && !(cena === 4 && momento === 'sair')) return 'final3c';
  // Remorso alto depois da Cena 3 → Final 2C
  if (cena === 3 && momento === 'sair' && ESTADO.remorso >= 55) return 'final2c';
  return null;
}
