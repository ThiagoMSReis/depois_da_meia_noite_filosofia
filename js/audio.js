/* ====================================================================
   SOM: música de fundo e efeitos.
   Para cada id (ver js/dados/sons.js):
     1) se o arquivo existe em audio/, ele é tocado;
     2) se não existe, toca uma versão sintetizada (gerada por código, mais abaixo).
   Uso:  Som.musica('casa')   Som.efeito('porta')   Som.loop('coracao')   Som.parar('coracao')
   O navegador só libera o áudio depois de um clique: Som.iniciar() é chamado no botão "Começar a noite".
   ==================================================================== */
const Som = (() => {
  let ac = null, mestre = null, mudo = false;
  let musicaAtual = null;        // { id, h } música em repetição
  const loops = {};              // efeitos em repetição: { id: manipulador }
  const elementos = new Set();   // arquivos tocando (para o botão de som)

  function iniciar() {
    if (!ac) {
      ac = new (window.AudioContext || window.webkitAudioContext)();
      mestre = ac.createGain(); mestre.gain.value = mudo ? 0 : 0.8; mestre.connect(ac.destination);
    }
    if (ac.state === 'suspended') ac.resume();
  }

  /* ---- Toca um som (arquivo ou sintetizado). Devolve { parar(segundos) } ---- */
  function tocar(id, repetir) {
    iniciar();
    const cfg = SONS[id] || {}, vol = cfg.volume ?? 0.6;
    let parar = () => {}, usouSintese = false;
    const sintese = () => {
      if (usouSintese) return; usouSintese = true;
      if (SINTESE[id]) parar = SINTESE[id](repetir, vol);
      else console.warn('Sem arquivo e sem versão sintetizada para o som:', id);
    };
    if (cfg.arquivo) {
      const a = new Audio(cfg.arquivo); a.loop = repetir; a.volume = vol; a.muted = mudo; elementos.add(a);
      a.onerror = sintese;                 // arquivo não existe → usa a versão sintetizada
      a.play().catch(sintese);
      parar = t => { const v = setInterval(() => { a.volume = Math.max(0, a.volume - vol / 10); if (a.volume < 0.02) { clearInterval(v); a.pause(); elementos.delete(a); } }, t * 100); };
    } else sintese();
    return { parar: (t = 1) => parar(t) };
  }

  const musica = id => { if (musicaAtual && musicaAtual.id === id) return; if (musicaAtual) musicaAtual.h.parar(2); musicaAtual = id ? { id, h: tocar(id, true) } : null; };
  const efeito = id => tocar(id, false);
  const loop = id => { if (!loops[id]) loops[id] = tocar(id, true); };
  const parar = id => { if (loops[id]) { loops[id].parar(1); delete loops[id]; } };
  const pararTudo = () => { musica(null); Object.keys(loops).forEach(parar); };
  const mutar = b => { mudo = b; if (mestre) mestre.gain.value = b ? 0 : 0.8; elementos.forEach(a => a.muted = b); };

  const SINTESE = {};

  return { iniciar, musica, efeito, loop, parar, pararTudo, mutar, get mudo() { return mudo; } };
})();
