
const narra = (texto, extras) => ({ texto, ...extras });
const fala  = (quem, texto, extras) => ({ quem, texto, ...extras });
const tela  = texto => ({ texto, estilo: 'tela' });

const CENAS = {

  /* ------------------------------ CENA 1 ------------------------------ */
  1: {
    hora: "22h30", local: "Casa de Victor", titulo: "Cena 1: Um segredo à meia-noite",
    cenario: "casa", musica: "casa",
    proxima: 2,
    elenco: { victor: [44, 0], amora: [14, 0], tomas: [88, 0] },
    falas: [
      narra("Victor está sentado à mesa, diante de um prato de arroz e feijão quase intocado. Toda noite ele tenta comer comida de verdade, na esperança de que um dia funcione. Mastiga uma garfada por educação e desiste: tem gosto de papel. Amora observa do sofá. Sobre a pia, uma garrafa escura de vidro está vazia.", { mostra: ["victor", "amora"] }),
      fala("amora", "Vai comer ou vai ficar olhando pra isso?"),
      fala("victor", "Estou esperando ele virar comida de verdade."),
      fala("amora", "E aí, funcionou?"),
      fala("victor", "Ainda não. Acho que ele não está levando a ameaça a sério."),
      fala("amora", "A garrafa acabou ontem. Você não vai conseguir empurrar isso até amanhã."),
      fala("victor", "Eu sei. Preciso passar na mercearia antes que a Dona Celeste feche."),
      narra("Victor dá um sorriso, mas para ao ouvir passos do lado de fora. Afasta o prato e limpa as mãos, tentando parecer normal."),
      narra("Alguém bate à porta.", { som: "batida"}),
      narra("Victor vai até a porta e abre: é Tomás.", { som: "porta_abrindo", mostra: ["victor", "amora", "tomas"] }),
      fala("tomas", "Ainda acordado? Enfim… a Helena está na biblioteca de novo, catalogando o arquivo antigo da prefeitura. Vai ficar até de madrugada. Pensei que você quisesse ir lá ver ela."),
      fala("victor", "Quero, sim. Só não tô me sentindo muito bem hoje."),
      fala("tomas", "Não precisa fazer nada demais. A gente passa lá um pouco e, se você não estiver a fim, vai embora."),
      narra("Victor olha para a rua e depois para a garrafa vazia. Ele quer ir, mas, sem se alimentar, qualquer pessoa por perto fica difícil de suportar: à sua frente, ele ouve o coração de Tomás batendo. Tem medo de que a fome o faça agir de um jeito que não consiga explicar.", { som: "coracao_tomas"}),
      { escolha: [
        { letra: "A", texto: "Aceitar o convite e ir com Tomás.",
          efeitos: { reserva: -10, remorso: -2, helena: 1 },
          depois: [
            fala("victor", "Vou, sim. Mas antes preciso passar na mercearia. Vai indo na frente que eu te alcanço."),
            fala("tomas", "Tá bom. Diz pra Dona Celeste que mandei um oi. Ela finge que não gosta de mim."),
            narra("Tomás segue para a biblioteca e avisa Helena de que Victor vem. Victor vai atrás, sozinho: não pode comprar o que precisa na frente do amigo. A fome aperta a cada quarteirão.", { mostra: ["victor"] }),
          ] },
        { letra: "B", texto: "Dizer que está cansado e sair sozinho mais tarde.",
          efeitos: { reserva: -5, remorso: 15 },
          depois: [
            fala("victor", "Hoje não, Tomás. Tô cansado. Quem sabe eu apareço mais tarde."),
            fala("tomas", "Tá bom. Descansa, então. Se mudar de ideia, a gente está lá."),
            narra("Victor fecha a porta e se escora na parede. Odeia mentir para o único amigo que tem.", {som: "porta_fechando", mostra: ["victor", "amora"] }),
            fala("amora", "Você não está cansado. Está com fome e com medo."),
            fala("victor", "Eu sei."),
            fala("amora", "Então vai logo, antes que a Celeste feche."),
            narra("Victor pega o casaco e sai sozinho, ainda remoendo a mentira.", { mostra: ["victor"] }),
          ] },
      ] },
    ],
  },

  /* ------------------------------ CENA 2 ------------------------------ */
  2: {
    hora: "22h45", local: "Mercearia", titulo: "Cena 2: A mercearia de Dona Celeste",
    cenario: "mercearia", musica: "mercearia",
    proxima: 3,
    elenco: { victor: [30, 0], celeste: [70, 0], amora: [70, 0] },
    falas: [
      narra("A mercearia está quase fechando. Para não levantar suspeitas, Victor pega uma sacola com pão, café e algumas frutas, mais por hábito do que por necessidade. Dona Celeste o observa por cima dos óculos e percebe as olheiras e o jeito inquieto dele.", { mostra: ["victor", "celeste"] }),
      fala("celeste", "Você anda vindo aqui cada vez mais tarde, hein, Victor?"),
      fala("victor", "É o único horário em que eu consigo vir."),
      fala("celeste", "Os preços não mudam de noite. Mas essa sua cara tá cada dia pior."),
      fala("victor", "Bom saber que a senhora se preocupa. E a garrafa de sempre, por favor."),
      narra("Dona Celeste vai até a câmara fria nos fundos e volta com uma garrafa escura embrulhada em papel pardo: sangue de boi, que o frigorífico da cidade lhe entrega toda semana. Ninguém além de Victor compra."),
      fala("celeste", "Só sobrou essa. O frigorífico atrasou a entrega. Faz dois anos que você leva e nunca me disse pra quê."),
      fala("victor", "Receita de família. É forte, mas resolve tudo."),
      fala("celeste", "Eu não pergunto. Mas um dia eu vou perguntar."),
      narra("Victor paga. Perto do caixa, um jornal antigo preso no mural chama sua atenção: a manchete fala do desaparecimento do cientista Augusto Valença, três anos antes. Ao lado da matéria, há a reprodução de um bilhete dele, assinado “A. Valença”. Victor leva a mão ao bolso do casaco, onde guarda o próprio bilhete, assinado “A. V.”. O nome provoca uma sensação estranha, como uma lembrança que ele quase consegue alcançar."),
      fala("victor", "Augusto Valença…"),
      fala("celeste", "Você conhecia ele?"),
      fala("victor", "Não sei. Parece que eu já ouvi esse nome, mas não lembro de onde."),
      fala("celeste", "Sumiu faz uns três anos. O laboratório dele ainda tá lá, perto do cemitério. Ninguém mexe naquilo desde então."),
      narra("Três anos. Victor sente um arrepio que não tem nada a ver com o frio."),
      fala("victor", "Ninguém foi ver o que aconteceu com ele?"),
      fala("celeste", "Alguns tentaram. Não descobriram muita coisa e deixaram pra lá. O povo daqui não gosta de mexer no que já passou."),
      narra("Victor agradece e sai. A curiosidade sobre Augusto cresce, mas a fome também. A garrafa pesa no bolso, e ele sabe que só deve bebê-la em casa, longe de olhos curiosos. Na calçada, ele hesita: beber com calma em casa antes de ir atrás de respostas, ou ir agora, enquanto a coragem dura.", { mostra: ["victor"] }),
      { escolha: [
        { letra: "A", texto: "Voltar para casa, beber com calma e conversar com Amora.",
          efeitos: { reserva: 20, remorso: -3 },
          depois: [
            narra("Em casa, Victor bebe a garrafa devagar. Não satisfaz de verdade, mas a fome recua e a cabeça clareia. Amora o espera perto da porta, com cara de quem já decidiu que vai junto.", { som: "bebendo", cenario: "casa", local: "Casa de Victor", mostra: ["victor", "amora"] }),
            fala("amora", "Já voltou?"),
            fala("victor", "Aquele nome ficou na minha cabeça. Augusto Valença. O jornal falava de três anos atrás."),
            fala("amora", "A mesma época em que você apareceu."),
            fala("victor", "O bilhete tem as iniciais A. V. Pode ser coincidência."),
            fala("amora", "Pode. Ou pode ser que a resposta esteja no laboratório. Vai procurar?"),
            fala("victor", "Vou. Quero saber por que esse nome me parece familiar."),
            fala("amora", "Então eu vou junto. Só toma cuidado."),
          ] },
        { letra: "B", texto: "Ir direto ao laboratório abandonado, deixando a garrafa para depois.",
          efeitos: { reserva: -20, remorso: 10 },
          depois: [
            narra("Victor guarda a garrafa fechada no bolso. A curiosidade é maior que a sede, e a fome adiada volta mais forte a cada passo. Ele sabe que está cansado e faminto demais para pensar com clareza. Uma sombra preta o acompanha pelos muros.", { cenario: "estrada", local: "Caminho do laboratório", mostra: ["victor"] }),
            fala("amora", "Você achou mesmo que eu ia deixar você ir sozinho?", { mostra: ["victor", "amora"] }),
            fala("victor", "Eu volto pra beber depois. Primeiro preciso saber."),
          ] },
      ] },
    ],
  },

  /* ------------------------------ CENA 3 ------------------------------ */
  3: {
    hora: "23h30", local: "Laboratório de Augusto, perto do cemitério", titulo: "Cena 3: O laboratório abandonado",
    cenario: "laboratorio", musica: "laboratorio",
    proxima: 4,
    elenco: { victor: [35, 0], amora: [70, 0] },
    falas: [
      narra("A porta range quando Victor a empurra; a fechadura está quebrada há anos. Há papéis espalhados, frascos vazios e equipamentos cobertos de poeira. Só uma mesa no centro está limpa, como se alguém tivesse acabado de se levantar dela.", { som: "porta_rangendo", mostra: ["victor", "amora"] }),
      fala("victor", "Eu imaginava que seria mais… assustador."),
      fala("amora", "Mais limpo, você quer dizer?"),
      fala("victor", "Não sei. Talvez menos familiar."),
      narra("Amora salta sobre uma bancada."),
      fala("amora", "Você esperava o dono do lugar sentado aí, com uma xícara de chá?"),
      fala("victor", "Não começa."),
      fala("amora", "Eu nem comecei."),
      narra("Sobre a mesa, há um caderno aberto e uma folha assinada. Victor tira o bilhete do bolso e compara: é a mesma letra."),
      fala("victor", "Foi ele quem escreveu o meu bilhete."),
      fala("amora", "Então ele sabia quem você era."),
      narra("Victor lê. O caderno descreve cinco experimentos para criar um ser que continuasse existindo depois da morte. Os quatro primeiros não sobreviveram. O quinto é chamado de “Exemplar V”. Aos poucos, Victor entende: Augusto o criou e desapareceu pouco depois, sem nunca voltar."),
      fala("victor", "Exemplar V. Eu fui o quinto."),
      fala("amora", "E os outros?"),
      fala("victor", "Não sobreviveram."),
      narra("Na última página, uma frase de Augusto: “Eu queria vencer a morte. Não pensei direito no preço que outra pessoa pagaria por isso.”"),
      fala("victor", "Ele sabia o que estava fazendo?"),
      fala("amora", "Sabia que havia um risco. Não sei se sabia qual."),
      fala("victor", "Está defendendo ele?"),
      fala("amora", "Não. Só acho que quem escreve “perdão” num bilhete sabia que estava errando."),
      narra("Entre as páginas, há uma anotação: “Fórmula de manutenção V-4. Suprime a sede por algumas horas. Faltam o estabilizador e a dosagem final.” A página seguinte foi arrancada. Num armário refrigerado, ainda ligado a um gerador velho, há ampolas âmbar etiquetadas “V-4 — plasma de doadores”."),
      fala("victor", "Isso é sangue humano."),
      fala("amora", "Plasma. Não sei se quem doou teve escolha."),
      narra("Do lado de fora, o feixe de uma lanterna passa pela janela: é Seu Anselmo, o vigia do cemitério, fazendo a ronda. Victor ouve o coração do homem, lento e firme, a poucos metros. A boca seca. As mãos tremem dentro das luvas.", { som: "coracao_tomas" }),
      fala("victor", "E se eu perder o controle?"),
      fala("amora", "Aí a gente tenta evitar que isso aconteça. Um passo de cada vez."),
      fala("amora", "Você não escolheu como tudo começou. Mas pode escolher o que faz agora."),
      narra("Victor olha das ampolas para a janela e para a porta. A pressa de resolver tudo de uma vez é justamente o que o assusta. Helena está na biblioteca, a poucos quarteirões dali. Ele pode seguir até ela de mãos vazias, apostar na fórmula incompleta ou deixar a sede decidir por ele."),
      { escolha: [
        { letra: "A", texto: "Fechar o caderno, deixar as ampolas e seguir para a biblioteca.",
          efeitos: { reserva: -15, remorso: -5 },
          depois: [
            narra("Victor guarda o caderno no casaco, fecha o armário e sai pelos fundos, sem cruzar o caminho do vigia. Resistir custa caro: ele caminha sem rumo pela cidade por horas, tentando se acalmar, enquanto a sede aperta mais a cada esquina, até perceber que está diante da biblioteca."),
          ] },
        { letra: "B", texto: "Tentar a fórmula incompleta de Augusto.",
          efeitos: { reserva: 30, remorso: 20 }, marcas: { usouMetodo: true },
          depois: [
            narra("Victor bebe uma ampola. O alívio é imediato e enorme, maior do que qualquer garrafa de sangue de boi, e é isso que o assusta: ele gostou, e sabe de onde veio. O vigia se afasta com a lanterna. Victor sai sem fome pela primeira vez em anos e passa horas vagando pela cidade, até perceber que está diante da biblioteca. O método é incompleto porque falta o estabilizador: o efeito não vai desaparecer aos poucos, vai acabar de uma vez.", { som: "bebendo"}),
          ] },
        { letra: "C", texto: "Ignorar as anotações e ceder ao impulso.",
          efeitos: { reserva: -30, remorso: 35 }, vaiPara: 'final3a',
          depois: [
            narra("Victor sai pela porta, atrás da lanterna, e a sede já não pede licença. A luz balança uma vez e cai no chão. Um grito curto rasga a noite e logo se cala.", { escuro: true, som: "grito_homem" }),
          ] },
      ] },
    ],
  },

  /* ------------------------------ CENA 4 ------------------------------ */
  4: {
    hora: "01h40", local: "Biblioteca municipal", titulo: "Cena 4: O que Helena não sabe",
    cenario: "biblioteca", musica: "biblioteca",
    aoEntrar: () => (ESTADO.usouMetodo ? { reserva: -60 } : {}),   // efeito atrasado do método (Escolha 3B)
    proxima: () => {                       // decide o final (valores já com os efeitos da Escolha 4)
      const r = ESTADO.reserva, m = ESTADO.remorso, h = ESTADO.helena;
      if (ESTADO.escolhas[4] === 'B') return r <= 20 ? 'final3c' : 'final2a';   // partir: faminto → 3C; senão → 2A
      if (r <= 20) return 'final3b';       // contou a verdade, mas a fome venceu → Helena
      if (m >= 20) return 'final2b';       // contou, mas o remorso não deixa ficar
      return h >= 2 ? 'final1a' : 'final1b';
    },
    elenco: { victor: [30, 0], helena: [70, 0] },
    falas: [
      narra(() => (ESTADO.usouMetodo ? 'O efeito da ampola acaba de uma vez, como uma maré recuando. A fome volta multiplicada, e Victor mal se sustenta nas pernas ao empurrar a porta.' : 'A fome que Victor carregou a noite inteira está no limite, mas a luz da biblioteca ainda está acesa.'), { som: "porta", mostra: ['victor'] }),
      narra("A biblioteca está silenciosa, iluminada apenas por algumas luminárias. Helena está cercada de caixas do arquivo da prefeitura. Quando vê Victor, parece aliviada, mas também um pouco magoada.", { mostra: ["victor", "helena"] }),
      fala("helena", "Você veio. Achei que não viria."),
      fala("victor", "Eu quase não vim…"),
      fala("helena", "O Tomás ficou até uma da manhã esperando e foi dormir. Disse que você talvez aparecesse."),
      narra("Ela observa o rosto cansado dele e não insiste. Em vez disso, mostra uma pasta."),
      fala("helena", "Achei isso nas caixas. É a pasta do desaparecimento do Augusto Valença. Tem uma foto dele em frente ao laboratório. Você conhece esse homem?"),
      fala("victor", "Mais ou menos. Pelo menos agora, conheço."),
      narra("Helena puxa uma folha da pasta e o papel velho corta a ponta do seu dedo. Uma gota de sangue aparece."),
      fala("helena", "Ai. Papel velho, o pior tipo."),
      narra(() => ESTADO.reserva <= 35 ? "O cheiro toma conta de tudo. Victor agarra a beira da mesa, os ouvidos zumbem e ele só consegue ouvir o coração dela." : "O cheiro chega e Victor fecha os punhos dentro das luvas. A fome ruge, mas ele ainda consegue respirar devagar e desviar o olhar.", { som: () => (ESTADO.reserva <= 35 ? 'coracao' : null) }),
      fala("helena", "Eu não sei o que tudo isso significa, mas sei que você sabe mais do que diz."),
      fala("victor", "Eu gosto muito de você, Helena. É por isso que está sendo tão difícil."),
      fala("helena", "Eu também gosto de você. Por isso mesmo não quero que você decida sozinho o que eu aguento ouvir."),
      narra("Victor sente o peso do que vem agora: contar tudo e deixar que ela decida o que aguenta ouvir, ou sair antes que a verdade, ou a fome, decida por ele."),
      { escolha: [
        { letra: "A", texto: "Contar a verdade sobre Augusto, a origem dele e a fome.",
          efeitos: { reserva: -15, remorso: -5, helena: 1 },
          depois: [
            fala("victor", "Augusto Valença me criou. Eu não sou humano como você. As histórias chamariam de vampiro, mas eu fui feito, não mordido. Eu vivo de sangue, o de boi que a Dona Celeste vende, e mesmo assim a fome nunca vai embora de vez."),
          ] },
        { letra: "B", texto: "Dizer que não consegue explicar e ir embora antes do amanhecer.",
          efeitos: { remorso: 5 },
          depois: [
            fala("victor", "Desculpa, Helena. Eu não consigo. Não agora."),
            fala("helena", "Victor, espera…"),
            narra("Ele para diante da porta, mas não se vira."),
            fala("victor", "É melhor assim."),
            fala("helena", "Melhor pra quem?"),
            narra("Victor não responde. Abre a porta e sai antes de hesitar e voltar atrás.", {som: "porta"}),
          ] },
      ] },
    ],
  },

  /* ------------------------------ FINAL 1A — UMA NOITE DE CADA VEZ ------------------------------ */
  final1a: {
    final: true, hora: "FINAL 1A", local: "Uma noite de cada vez", titulo: '',
    cenario: "biblioteca", musica: "esperanca",
    elenco: { victor: [30, 0], helena: [70, 0] },
    falas: [
      fala("helena", "Eu estou assustada. Mas prefiro saber a verdade a continuar imaginando.", { mostra: ["victor", "helena"] }),
      fala("victor", "Eu achei que, se você soubesse, ia embora."),
      fala("helena", "Você quase foi embora primeiro. E o sangue de boi… basta?"),
      fala("victor", "Segura por algumas horas."),
      fala("helena", "Então a gente precisa de um jeito de ser mais do que algumas horas. O arquivo da prefeitura tem mais caixas sobre o Augusto. Se existe um estabilizador, ele escreveu em algum lugar. Eu sei procurar o que ninguém quer achar."),
      narra("Ela segura a mão enluvada de Victor. Os dois saem da biblioteca quando o céu começa a ficar azul-escuro. Ele ainda tem tempo de chegar em casa antes do sol. Não há promessa de que tudo será fácil: a fome continua, e Victor ainda precisa descobrir como viver com ela. Mas agora ele não está tentando resolver tudo sozinho."),
      fala("helena", "Volta depois do pôr do sol. Eu levo café e a pasta. E aviso o Tomás, antes que ele descubra sozinho e fique ofendido."),
      fala("victor", "Eu vou. E vou tentar não sumir dessa vez."),
      tela("Nem todas as respostas aparecem de uma vez. Às vezes, o primeiro passo é parar de fugir das perguntas."),
    ],
  },

  /* ------------------------------ FINAL 1B — DEPOIS DO PÔR DO SOL ------------------------------ */
  final1b: {
    final: true, hora: "FINAL 1B", local: "Depois do pôr do sol", titulo: '',
    cenario: "biblioteca", musica: "esperanca",
    elenco: { victor: [30, 0], helena: [70, 0] },
    falas: [
      fala("helena", "Eu não sei nem o que dizer agora. Preciso de um tempo pra entender isso.", { mostra: ["victor", "helena"] }),
      fala("victor", "Tudo bem."),
      fala("helena", "Obrigada por me contar. Eu tô assustada, mas prefiro saber."),
      narra("Victor não vai embora da cidade. Sai da biblioteca antes do amanhecer, com a fome ainda presente e o peso de uma verdade que já não está só com ele."),
      fala("helena", "A gente pode conversar de novo depois? Quando eu tiver pensado um pouco. Depois do pôr do sol."),
      fala("victor", "Claro. E vou tentar não sumir dessa vez."),
      fala("helena", "Tá bom."),
      tela("Confiar não é saber como termina. É voltar para a próxima conversa."),
    ],
  },

  /* ------------------------------ FINAL 2A — A CIDADE QUE FICOU PARA TRÁS ------------------------------ */
  final2a: {
    final: true, hora: "FINAL 2A", local: "A cidade que ficou para trás", titulo: '',
    cenario: "estrada", musica: "triste",
    elenco: { victor: [30, 0], amora: [70, 0] },
    falas: [
      narra("Victor deixa Santa Bruma antes do amanhecer, sem se despedir. Acredita que sair é a maneira mais segura de evitar que alguém se machuque. Amora o acompanha até a estrada.", { mostra: ["victor", "amora"] }),
      fala("amora", "Você vai embora mesmo?"),
      fala("victor", "Se eu olhar pra trás, posso acabar ficando."),
      fala("amora", "Pode ser. Só não finge depois que não teve escolha."),
      fala("victor", "Não sei se tô fugindo ou se é melhor assim."),
      fala("amora", "Talvez não saiba mesmo. Pensa nisso quando estiver mais calmo."),
      narra("Victor olha para Santa Bruma uma última vez e segue pela estrada."),
      tela("Victor deixou Santa Bruma, mas não sabia se tinha saído do labirinto ou apenas levado o labirinto consigo."),
    ],
  },

  /* ------------------------------ FINAL 2B — CULPA DEMAIS PARA FICAR ------------------------------ */
  final2b: {
    final: true, hora: "FINAL 2B", local: "Culpa demais para ficar", titulo: '',
    cenario: "biblioteca", musica: "triste",
    elenco: { victor: [30, 0], helena: [70, 0], amora: [70, 0] },
    falas: [
      fala("helena", "Eu estou assustada, mas não vou a lugar nenhum. A gente resolve isso junto.", { mostra: ["victor", "helena"] }),
      fala("victor", "Eu menti pra todo mundo hoje. Pro Tomás, pra Dona Celeste, pra você, durante meses. Não mereço que você fique."),
      fala("helena", "Não é você quem decide isso."),
      fala("victor", "Eu sei. Por isso eu preciso ir."),
      narra("Victor sai antes do amanhecer. Helena não o segura, mas deixa a pasta de Augusto sobre a mesa, aberta, com um bilhete: “Se um dia quiser saber o que eu achar, me escreve.” Amora o espera na calçada.", { cenario: "estrada", local: "Calçada da biblioteca", mostra: ["victor", "amora"] }),
      fala("amora", "Isso não é por ela. É porque você ainda não se perdoou."),
      fala("victor", "Eu sei."),
      tela("O remorso pode ser um aviso. Mas, sem perdão, vira uma estrada sem fim."),
    ],
  },

  /* ------------------------------ FINAL 2C — SEM DESPEDIDA ------------------------------ */
  final2c: {
    final: true, hora: "FINAL 2C", local: "Sem despedida", titulo: '',
    cenario: "estrada", musica: "triste",
    elenco: { victor: [30, 0], amora: [70, 0] },
    falas: [
      narra("Victor para na esquina da biblioteca e olha a luz acesa na janela. Não sobe. Cada mentira da noite pesa mais do que a anterior. Amora o alcança.", { mostra: ["victor"] }),
      fala("amora", "Você nem vai se despedir da Helena?", { mostra: ["victor", "amora"] }),
      fala("victor", "Se eu entrar lá, vou mentir de novo. Prefiro sumir a mentir mais uma vez."),
      fala("amora", "Então não foi o Augusto que te expulsou da cidade. Foi a culpa."),
      narra("Victor segue para a estrada, sem olhar para trás."),
      tela("Nem toda fuga é de algo que está fora. Às vezes se foge de si mesmo."),
    ],
  },

  /* ------------------------------ FINAL 3A — A ÚLTIMA PESSOA (O VIGIA) ------------------------------ */
  final3a: {
    final: true, hora: "FINAL 3A", local: "A última pessoa (o vigia)", titulo: '',
    cenario: "estrada", musica: "sombrio",
    elenco: { victor: [30, 0], amora: [70, 0] },
    falas: [
      narra("Quando volta a si, Victor está sozinho na estrada do cemitério, com as mãos trêmulas e o que fez pesando em cada respiração. A lanterna de Seu Anselmo está caída no chão, ainda acesa.", { escuro: true, som: "respiracao", mostra: ["victor"] }),
      fala("victor", "Eu achei que conseguia parar.", { mostra: ["victor", "amora"] }),
      fala("amora", "Você não escolheu como tudo começou. Mas agora precisa lidar com o que fez."),
      fala("victor", "E agora? O que eu faço?"),
      fala("amora", "Primeiro, para de fingir que não aconteceu. Depois a gente vê como procurar ajuda. Você não precisa resolver tudo agora."),
      tela("O impulso pode parecer uma saída quando tudo fica confuso. Mas uma escolha feita no desespero também tem consequências."),
    ],
  },

  /* ------------------------------ FINAL 3B — A ÚLTIMA PESSOA (HELENA) ------------------------------ */
  final3b: {
    final: true, hora: "FINAL 3B", local: "A última pessoa (Helena)", titulo: '',
    cenario: "biblioteca", musica: "sombrio",
    elenco: { victor: [30, 0], helena: [70, 0], amora: [80, 0] },
    falas: [
      fala("helena", "Victor? Seus olhos…", { mostra: ["victor", "helena"] }),
      narra("Os olhos de Victor escurecem. Só resta o som do coração dela, cada vez mais rápido, e uma sede que cala todo o resto. Um grito, e depois o silêncio.", { escuro: true, som: "grito_mulher", mostra: ["victor"] }),
      narra("Quando Victor volta a si, está sentado no chão da biblioteca, com as mãos trêmulas. A pasta de Augusto está caída entre os papéis. Lá fora, a sirene de uma ambulância se afasta. Amora espera na porta.", { mostra: ["victor", "amora"] }),
      fala("victor", "Ela era a última pessoa que eu queria machucar. E eu contei a verdade.", { mostra: ["victor", "amora"] }),
      fala("amora", "Contou. Mas foi com a fome no limite. Você sabia que estava no limite."),
      fala("victor", "E agora?"),
      fala("amora", "Primeiro, para de fingir que não aconteceu. Depois, a gente procura quem possa ajudar, ela e você."),
      tela("Contar a verdade exige estar inteiro para ouvir as consequências. A fome não espera a conversa terminar."),
    ],
  },

  /* ------------------------------ FINAL 3C — A ÚLTIMA PESSOA (TOMÁS) ------------------------------ */
  final3c: {
    final: true, hora: "FINAL 3C", local: "A última pessoa (Tomás)", titulo: '',
    cenario: "estrada", musica: "sombrio",
    elenco: { victor: [30, 0], tomas: [70, 0], amora: [80, 0] },
    falas: [
      narra("Sem forças, Victor cambaleia por uma rua deserta, perto do cemitério. Uma figura se aproxima. Tomás saiu para procurar o amigo.", { mostra: ["victor", "tomas"] }),
      fala("tomas", "Victor? Cara, você tá horrível. Vem, deixa que eu te levo pra casa."),
      narra("Tomás ainda dá um passo à frente, preocupado, e estende a mão. Os olhos de Victor escurecem. Um grito rasga a rua vazia e se perde na madrugada.", { escuro: true, som: "grito_homem", mostra: ["victor", "tomas"] }),
      narra("Quando Victor volta a si, o relógio da igreja bate a madrugada e ele está sozinho no meio da rua. Amora o observa de cima de um muro.", { som: "relogio", mostra: ["victor", "amora"] }),
      fala("victor", "Ele só queria me ajudar."),
      fala("amora", "Eu sei. Você não escolheu a fome, mas escolheu não se alimentar antes de sair. Agora precisa lidar com isso."),
      fala("victor", "E agora? O que eu faço?"),
      fala("amora", "Para de fingir que não aconteceu. A gente vê como procurar ajuda. Você não precisa resolver tudo agora."),
      tela("Ninguém atravessa uma noite inteira com fome sem pagar um preço. Às vezes quem paga é quem estava por perto."),
    ],
  },
};
