/* TELA DE INÍCIO: título animado, cidade, estrelas, "Como jogar" e "Créditos" (vem do arquivo original).
   Único elo com o jogo: iniciarJogo() dispara o evento "jogo:iniciar", que o motor.js escuta. */
const $=s=>document.querySelector(s);
/* Título: letra por letra */
function split(el,txt,off){[...txt].forEach((c,i)=>{const s=document.createElement('span');s.className='ch';s.style.setProperty('--i',i+off);s.innerHTML=c===' '?'&nbsp;':c;s.setAttribute('aria-hidden','true');el.appendChild(s)})}
split($('#l1'),'DEPOIS DA',0);split($('#l2'),'MEIA-NOITE',9);
/* Cidade gerada por código */
let seed=7;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;
function houses(w,h,color,lit,minH,maxH){let s='',x=-20;
while(x<w){const bw=46+rnd()*70,bh=h*(minH+rnd()*(maxH-minH)),y=h-bh;
s+=`<path d="M${x} ${h}V${y+16}L${x+bw/2} ${y-14}L${x+bw} ${y+16}V${h}Z" fill="${color}"/>`;
if(lit)for(let i=0;i<3;i++)if(rnd()>.5)s+=`<rect class="win" style="animation-delay:${(rnd()*6).toFixed(1)}s" x="${(x+8+rnd()*(bw-22)).toFixed(0)}" y="${(y+26+rnd()*(bh-50)).toFixed(0)}" width="7" height="10" rx="1"/>`;
x+=bw+rnd()*6}return s}
$('#far').innerHTML=houses(1500,300,'#190f38',false,.2,.5);
const tower=`<g transform="translate(940,0)" fill="#06030c"><rect x="0" y="40" width="46" height="220"/><path d="M-6 44 23 -20 52 44z"/>
<circle class="clock" cx="23" cy="86" r="14"/><path d="M23 86v-10M23 86v-12" stroke="#06030c" stroke-width="2" stroke-linecap="round"/><rect x="17" y="130" width="12" height="22" rx="6" fill="#ffb347" class="win"/></g>`;
const lab=`<g transform="translate(120,0)" fill="#06030c"><path d="M0 260V190h70v70zM-4 192 35 160 74 192z"/><rect class="lab" x="28" y="208" width="14" height="18" rx="2"/>
<path d="M110 260v-34h6v34zM103 236h20v5h-20zM150 260v-26h5v26zM144 242h17v4h-17z"/></g>`;
$('#near').innerHTML=houses(1500,260,'#06030c',true,.15,.45)+lab+tower;
/* Estrelas, vaga-lumes, estrela cadente e paralaxe */
const cv=$('#fx'),cx=cv.getContext('2d'),px=[...document.querySelectorAll('.px')];
let W,H,stars,flies,shoot=null,tx=0,ty=0,mx=0,my=0;
function size(){const D=devicePixelRatio||1;W=innerWidth;H=innerHeight;cv.width=W*D;cv.height=H*D;cx.setTransform(D,0,0,D,0,0);
stars=Array.from({length:Math.round(W*H/7500)},()=>({x:Math.random()*W,y:Math.random()*H*.55,r:Math.random()*1.2+.25,p:Math.random()*6.28,s:Math.random()*2+.5}));
flies=Array.from({length:24},()=>({x:Math.random()*W,y:H*(.5+Math.random()*.5),p:Math.random()*6.28,v:Math.random()*.22+.06}))}
addEventListener('resize',size);size();
function frame(t){cx.clearRect(0,0,W,H);cx.fillStyle='#fff';
for(const s of stars){cx.globalAlpha=.3+.7*Math.abs(Math.sin(t/1000*s.s+s.p));cx.beginPath();cx.arc(s.x,s.y,s.r,0,6.283);cx.fill()}
for(const f of flies){f.y-=f.v;f.x+=Math.sin(t/1500+f.p)*.4;if(f.y<H*.45){f.y=H+10;f.x=Math.random()*W}
const a=.3+.5*Math.abs(Math.sin(t/700+f.p)),g=cx.createRadialGradient(f.x,f.y,0,f.x,f.y,9);
g.addColorStop(0,`rgba(255,200,110,${a})`);g.addColorStop(1,'rgba(255,200,110,0)');cx.globalAlpha=1;cx.fillStyle=g;cx.fillRect(f.x-9,f.y-9,18,18)}
if(!shoot&&Math.random()<.0025)shoot={x:Math.random()*W*.7,y:Math.random()*H*.25,k:0};
if(shoot){const k=++shoot.k,x=shoot.x+k*9,y=shoot.y+k*4;cx.globalAlpha=Math.max(0,1-k/40);cx.strokeStyle='#fff';cx.lineWidth=1.5;cx.beginPath();cx.moveTo(x,y);cx.lineTo(x-42,y-19);cx.stroke();if(k>40)shoot=null}
mx+=(tx-mx)*.05;my+=(ty-my)*.05;
px.forEach(e=>{const d=+e.dataset.d;e.style.transform=`translate(${(-mx*d).toFixed(1)}px,${(-my*d*.5).toFixed(1)}px)`});
requestAnimationFrame(frame)}
requestAnimationFrame(frame);
/* Janelas (Como jogar / Créditos) */
const modal=$('#modal');
function open(id){modal.querySelectorAll('section').forEach(s=>s.classList.toggle('on',s.id===id));modal.classList.add('on');$('#close').focus()}
document.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>open(b.dataset.open));
$('#close').onclick=()=>modal.classList.remove('on');
modal.onclick=e=>{if(e.target===modal)modal.classList.remove('on')};
/* Início do jogo: ponto de ligação para a Cena 1 */
const fade=$('#fade');
function iniciarJogo(){fade.classList.add('on');setTimeout(()=>fade.classList.add('intro'),1000);
document.dispatchEvent(new CustomEvent('jogo:iniciar'))}
$('#play').onclick=iniciarJogo;
$('#back').onclick=()=>{fade.classList.remove('intro','stub');setTimeout(()=>fade.classList.remove('on'),300)};
addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('on');
if(e.key==='Enter'&&!modal.classList.contains('on')&&!fade.classList.contains('on')&&document.activeElement===document.body)iniciarJogo()});
