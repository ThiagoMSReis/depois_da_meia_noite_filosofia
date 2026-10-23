/* ====================================================================
   MOTOR DO JOGO  (normalmente você NÃO precisa mexer aqui)
   Lê os dados de config.js, personagens.js, cenarios.js e cenas.js.
   Fluxo:
     botão "Começar a noite" → evento 'jogo:iniciar' → ir(CENA_INICIAL)
     ir(id)        : mostra o cartão de hora/local e monta a cena
     proximaFala() : mostra a próxima fala, ou abre as escolhas, ou encerra a cena
     fimDaCena()   : confere a derrota e vai para a próxima cena
   ==================================================================== */
(() => {
const $ = s => document.querySelector(s);

/* ---- Elementos da tela (ids do index.html) ---- */
const jogo = $('#game'), fundo = $('#bg'), lugar = $('#lugar'), palco = $('#palco'),
      caixa = $('#cx'), nome = $('#nm'), texto = $('#tx'), opcoes = $('#op'),
      seta = $('#nx'), cartaoEl = $('#fade');
const SEM_ANIMACAO = matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ---- Memória do motor ---- */
let cena = null;          // cena atual
let fila = [];            // falas que ainda faltam nesta cena
let noPalco = [];         // ids dos personagens visíveis agora
let sprites = {};         // elementos HTML dos personagens da cena
let destino = null;       // cena escolhida por uma opção (vaiPara)
let timer = null, digitando = false, textoAtual = '';
let aguardandoEscolha = false, bloqueado = true;

/* ================= 1. BARRAS ================= */
$('#hud').innerHTML = VARIAVEIS.map(v =>
  `<div class="hb"><span>${v.rotulo}</span><b><i id="b-${v.id}" style="--c:${v.cor}"></i></b>` +
  `<em><small class="d" id="d-${v.id}"></small><span id="v-${v.id}"></span></em></div>`).join('');

function atualizarBarras() {
  VARIAVEIS.forEach(v => {
    $('#b-' + v.id).style.setProperty('--v', ESTADO[v.id] + '%');
    $('#v-' + v.id).textContent = ESTADO[v.id];
  });
  atualizarAuras();
}

// Auras e sons de alerta quando a Reserva ou o Remorso chegam ao limite (valores em config.js)
let fomeLigada = false, culpaLigada = false;
function atualizarAuras() {
  const fome = ESTADO.reserva <= LIMITE_RESERVA, culpa = ESTADO.remorso >= LIMITE_REMORSO;
  jogo.classList.toggle('fome', fome);
  jogo.classList.toggle('culpa', culpa);
  if (fome && !fomeLigada) Som.loop('coracao');      // batimento enquanto a fome está no limite
  if (!fome && fomeLigada) Som.parar('coracao');
  if (culpa && !culpaLigada) Som.loop('culpa');
  if (!culpa && culpaLigada) Som.parar('culpa');   // sino grave ao entrar na zona de culpa
  fomeLigada = fome; culpaLigada = culpa;
}

// Aplica os "efeitos" de uma escolha (ex.: { reserva: -5 }) e mostra o aviso +/−.
function aplicarEfeitos(efeitos) {
  for (const id in efeitos) {
    if (!(id in ESTADO)) continue;
    ESTADO[id] = Math.max(0, Math.min(100, ESTADO[id] + efeitos[id]));
    const aviso = $('#d-' + id);
    aviso.textContent = (efeitos[id] > 0 ? '+' : '−') + Math.abs(efeitos[id]);
    aviso.classList.remove('on'); void aviso.offsetWidth; aviso.classList.add('on');
  }
  atualizarBarras();
}

/* ================= 2. CENÁRIO ================= */
function mostrarCenario(id, comFade) {
  const c = CENARIOS[id] || { cor: '#0b0618' };
  const pintar = () => {
    fundo.style.backgroundColor = c.cor;                          // cor de reserva
    fundo.style.backgroundImage = c.img ? `url("${c.img}")` : 'none'; // imagem (PNG)
    fundo.style.opacity = 1;
  };
  if (comFade) { fundo.style.opacity = 0; setTimeout(pintar, 500); } else pintar();
}

/* ================= 3. PERSONAGENS ================= */
// Cria o elemento de um personagem na posição [x, y] da cena.
function criarSprite(id, [x, y]) {
  const p = PERSONAGENS[id] || { nome: id };
  const div = document.createElement('div');
  div.className = 'sp off';
  div.style.left = x + '%';
  div.style.bottom = y + '%';
  div.style.setProperty('--alt', p.altura || 100);
  // Quadro tracejado usado quando o PNG não existe ou não carrega
  const vazio = () => { const v = document.createElement('div'); v.className = 'vazio'; v.textContent = p.nome; return v; };
  if (p.img) {
    const img = new Image();
    img.alt = p.nome;
    img.onerror = () => img.replaceWith(vazio());
    img.src = p.img;
    div.appendChild(img);
  } else div.appendChild(vazio());
  palco.appendChild(div);
  return div;
}

// Mostra/esconde cada personagem e escurece quem não está falando.
function atualizarPersonagens(quem) {
  for (const id in sprites) {
    let c = 'sp';
    if (!noPalco.includes(id)) c += ' off';
    else if (quem && noPalco.includes(quem) && quem !== id) c += ' dim';
    sprites[id].className = c;
  }
}

/* ================= 4. FALAS ================= */
function mostrarFala(f) {
  if (f.mostra) noPalco = f.mostra;
  if (f.cenario) mostrarCenario(f.cenario, true);
  if (f.local) lugar.querySelector('span').textContent = f.local;
  atualizarPersonagens(f.quem);
  const p = PERSONAGENS[f.quem] || { nome: f.quem || '', cor: '' };
  nome.textContent = p.nome;
  nome.style.color = p.cor;
  texto.className = f.quem ? '' : (f.estilo === 'tela' ? 'n q' : 'n');   // 'n' = narrador, 'q' = texto de tela
  opcoes.innerHTML = '';
  if (f.musica) Som.musica(f.musica);                                  // troca a música de fundo
  const s = typeof f.som === 'function' ? f.som() : f.som;             // efeito sonoro desta fala
  if (s) Som.efeito(s);
  jogo.classList.toggle('escuro', !!f.escuro);                         // escurece a tela (cenas de ataque)
  digitar(typeof f.texto === 'function' ? f.texto() : f.texto);
}

// Efeito de máquina de escrever
function digitar(t) {
  clearInterval(timer);
  textoAtual = t; digitando = true; texto.textContent = ''; seta.style.visibility = 'hidden';
  if (SEM_ANIMACAO) { texto.textContent = t; return terminouDigitar(); }
  let i = 0;
  timer = setInterval(() => {
    texto.textContent = t.slice(0, ++i);
    if (i >= t.length) { clearInterval(timer); terminouDigitar(); }
  }, VELOCIDADE_TEXTO);
}
function terminouDigitar() { digitando = false; seta.style.visibility = 'visible'; }

// Chamada a cada clique/tecla: completa o texto ou passa para a próxima fala.
function avancar() {
  if (aguardandoEscolha || bloqueado) return;
  if (digitando) { clearInterval(timer); texto.textContent = textoAtual; return terminouDigitar(); }
  proximaFala();
}

function proximaFala() {
  const f = fila.shift();
  if (!f) return fimDaCena();
  if (f.escolha) return mostrarEscolha(f.escolha);
  if (f.estilo === 'tela') return telaFinal(f.texto);   // frase final: tela cheia, no centro
  mostrarFala(f);
}

/* ================= TELA DE FINAL (centro da tela, com impacto) ================= */
// Mostra o número e o nome do final, e a frase. A cor muda: final 1 dourado, 2 roxo, 3 vermelho.
function telaFinal(frase) {
  aguardandoEscolha = true;                                    // bloqueia o avanço por clique/tecla
  const tipo = (String(cena.id).match(/^final(\d)/) || [0, '1'])[1];
  const [titulo, sub] = cena.local.replace(')', '').split(' (');
  $('#final').className = 'on f' + tipo;
  $('#fn').textContent = cena.hora.replace('FINAL', 'Final');
  const ft = $('#ft'); ft.innerHTML = '';
  [...titulo].forEach((c, i) => {                              // título letra por letra
    const s = document.createElement('span'); s.className = 'ch'; s.style.setProperty('--i', i);
    s.textContent = c === ' ' ? '\u00a0' : c; ft.appendChild(s);
  });
  $('#fs').textContent = sub ? sub[0].toUpperCase() + sub.slice(1) : '';
  $('#fq').textContent = frase;
  if (tipo === '3') Som.loop('coracao'); else Som.parar('coracao');   // final 3 termina com batimento
  setTimeout(() => $('#fr').focus(), 6500);
  document.dispatchEvent(new CustomEvent('jogo:fim', { detail: ESTADO }));   // gancho para o epílogo
}
$('#fr').onclick = () => location.reload();

/* ================= 5. ESCOLHAS ================= */
function mostrarEscolha(lista) {
  aguardandoEscolha = true; seta.style.visibility = 'hidden';
  lista.forEach(o => {
    const b = document.createElement('button');
    b.className = 'opt'; b.textContent = o.texto;
    b.onclick = e => { e.stopPropagation(); escolher(o); };
    opcoes.appendChild(b);
  });
  opcoes.firstChild.focus();
}

function escolher(o) {
  aguardandoEscolha = false; opcoes.innerHTML = '';
  ESTADO.escolhas[cena.id] = o.letra;      // guarda a escolha (útil para o epílogo)
  aplicarEfeitos(o.efeitos || {});         // efeitos aplicados uma única vez
  Object.assign(ESTADO, o.marcas || {});   // marcadores (ex.: usouMetodo)
  if (o.vaiPara) destino = o.vaiPara;
  fila.unshift(...(o.depois || []));       // as falas "depois" passam na frente da fila
  proximaFala();
}

/* ================= 6. CENAS ================= */
// Cartão preto com hora e local entre uma cena e outra.
function cartao(k, depois) {
  cartaoEl.querySelector('.t1').textContent = k.hora;
  cartaoEl.querySelector('.t2').textContent = k.local;
  cartaoEl.querySelector('.t3').textContent = k.titulo;
  if (!cartaoEl.classList.contains('on')) { cartaoEl.classList.add('on'); setTimeout(() => cartaoEl.classList.add('intro'), 1000); }
  setTimeout(() => { depois(); cartaoEl.classList.remove('intro'); setTimeout(() => cartaoEl.classList.remove('on'), 700); }, 3800);
}

function ir(id) {
  const k = CENAS[id];
  if (!k) return console.error('Cena não encontrada em cenas.js:', id);
  if (k.aoEntrar) aplicarEfeitos(k.aoEntrar());     // efeitos que acontecem ao entrar na cena
  const fimAntes = verificarFim(id, 'entrar');       // regras de fim antecipado (config.js)
  if (fimAntes) return ir(fimAntes);
  bloqueado = true;
  cartao(k, () => { montarCena({ ...k, id }); bloqueado = false; proximaFala(); });
}

function montarCena(k) {
  cena = k; destino = null;
  jogo.classList.add('on'); jogo.classList.remove('escuro'); document.activeElement.blur(); caixa.focus();
  if (k.musica) Som.musica(k.musica);
  lugar.innerHTML = `<b>${k.hora}</b><span>${k.local}</span>`;
  palco.innerHTML = ''; sprites = {}; noPalco = [];
  for (const id in k.elenco) sprites[id] = criarSprite(id, k.elenco[id]);
  mostrarCenario(k.cenario, false);
  fila = [...k.falas];
  atualizarBarras();
}

function fimDaCena() {
  const prox = destino ?? verificarFim(cena.id, 'sair') ?? (typeof cena.proxima === 'function' ? cena.proxima() : cena.proxima);
  prox ? ir(prox) : fim();
}

// Acabaram as cenas escritas. O evento 'jogo:fim' é o gancho para o epílogo.
function fim() {
  aguardandoEscolha = true; nome.textContent = 'Fim'; texto.className = 'n';
  texto.textContent = cena.final ? 'Fim. Você alcançou o final: ' + cena.local + '.' : 'Fim das cenas criadas até agora.'; Som.pararTudo(); seta.style.visibility = 'hidden';
  opcoes.innerHTML = '<button class="btn">Voltar ao início</button>';
  opcoes.firstChild.onclick = e => { e.stopPropagation(); location.reload(); };
  document.dispatchEvent(new CustomEvent('jogo:fim', { detail: ESTADO }));
}

/* ================= 7. ENTRADAS ================= */
caixa.onclick = avancar;
addEventListener('keydown', e => {
  if (!jogo.classList.contains('on')) return;
  e.stopPropagation();
  if (['Enter', ' ', 'ArrowRight'].includes(e.key)) {
    if (!opcoes.contains(document.activeElement) && document.activeElement.id !== 'fr') { e.preventDefault(); avancar(); }
  } else if (e.key >= '1' && e.key <= '9') {          // teclas 1, 2, 3... escolhem a opção
    const b = opcoes.children[e.key - 1]; if (b) b.click();
  }
}, true);

// Elo com a tela de início (inicio.js dispara este evento)
document.addEventListener('jogo:iniciar', () => {
  Som.iniciar();                                       // o áudio só pode começar depois de um clique
  VARIAVEIS.forEach(v => ESTADO[v.id] = v.inicial);
  ESTADO.escolhas = {}; ESTADO.usouMetodo = false;
  ir(CENA_INICIAL);
});

// Botão "Som: ligado/desligado"
$('#som').onclick = e => { e.stopPropagation(); Som.mutar(!Som.mudo); e.target.textContent = Som.mudo ? 'Som: desligado' : 'Som: ligado'; };
})();
