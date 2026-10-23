/* ====================================================================
   SONS  (música de fundo e efeitos)
   arquivo : caminho do áudio na pasta audio/ (mp3, ogg ou wav).
   volume  : de 0 a 1.
   Se o arquivo NÃO existir, o jogo toca uma versão sintetizada (gerada por
   código, em js/audio.js), então já tem som mesmo sem nenhum arquivo.
   Quando você colocar o arquivo na pasta audio/ com o nome abaixo, ele passa
   a ser usado no lugar da versão sintetizada. É só isso.
   Os ids (casa, porta, grito...) são usados em cenas.js: musica: 'casa'  /  som: 'porta'
   ==================================================================== */
const SONS = {
  /* ---- Músicas de fundo (tocam em repetição) ---- */
  casa:        { arquivo: 'audio/musica_casa.mp3',        volume: 0.3 },
  mercearia:   { arquivo: 'audio/musica_casa.mp3',   volume: 0.3 },
  laboratorio: { arquivo: 'audio/musica_casa.mp3', volume: 0.3 },
  biblioteca:  { arquivo: 'audio/musica_casa.mp3',  volume: 0.3 },
  esperanca:   { arquivo: 'audio/musica_esperanca.mp3',   volume: 0.3 },  // finais 1A e 1B
  triste:      { arquivo: 'audio/musica_triste.mp3',      volume: 0.3 },  // finais 2A, 2B e 2C
  sombrio:     { arquivo: 'audio/musica_sombrio.mp3',     volume: 0.3 },  // finais 3A, 3B e 3C

  /* ---- Efeitos ---- */
  batida:  { arquivo: 'audio/batida.mp3',  volume: 0.8 },  // batidas na porta
  porta_abrindo:   { arquivo: 'audio/porta_abrindo.mp3',   volume: 0.8 },
  porta_fechando:   { arquivo: 'audio/porta_fechando.mp3',   volume: 0.8 },  // batidas + porta rangendo (Tomás chega)
  coracao_tomas:  { arquivo: 'audio/coracao_tomas.mp3',   volume: 0.8 },
  bebendo:  { arquivo: 'audio/bebendo.mp3',   volume: 0.8 },
  porta_rangendo:   { arquivo: 'audio/porta_rangendo.mp3',   volume: 0.8 },
  porta:   { arquivo: 'audio/porta.mp3',   volume: 0.8 },
  respiracao:   { arquivo: 'audio/respiracao.mp3',   volume: 0.6 },
  coracao: { arquivo: 'audio/coracao.mp3', volume: 0.7 },  // batimento (aura vermelha: fome no limite)
  culpa:   { arquivo: 'audio/culpa.mp3',   volume: 0.6 },  // sino grave (aura roxa: remorso no limite)
  grito_mulher:   { arquivo: 'audio/grito_mulher.mp3',   volume: 0.7 },
  grito_homem:   { arquivo: 'audio/grito_homem.mp3',   volume: 0.7 },
  relogio: { arquivo: 'audio/relogio.mp3', volume: 0.6 },
};
