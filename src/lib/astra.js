// ASTRA — base de conhecimento do assistente-guia do ASTRALIS.
// Cada entrada tem palavras-chave (para casar com a pergunta) e uma resposta.
// Estrutura pensada para depois ser trocada por IA real sem mudar a interface.

export const astraKnowledge = [
  {
    id: 'welcome',
    keywords: ['oi', 'olá', 'ola', 'inicio', 'começar', 'comecar', 'ajuda', 'help'],
    answer:
      'Olá! Sou a ASTRA, sua guia aqui no ASTRALIS. 🚀 Posso explicar como funciona o feed, as missões, o mapa orbital, a gamificação e muito mais. É só perguntar! Por onde quer começar?',
  },
  {
    id: 'what_is',
    keywords: [
      'o que é',
      'que é astralis',
      'sobre',
      'plataforma',
      'rede social',
      'funciona o astralis',
    ],
    answer:
      'O ASTRALIS é uma rede social que conecta quem está no espaço com quem está na Terra. Astronautas transmitem fotos, dados e descobertas em órbita, e pessoas no solo respondem com relatos locais — criando uma ponte entre o que se vê de cima e o que se vive embaixo.',
  },
  {
    id: 'feed',
    keywords: ['feed', 'post', 'postar', 'transmitir', 'transmissão', 'transmissao', 'publicar'],
    answer:
      'No Feed você vê e cria transmissões. Para postar, escreva na caixa "Registre algo do seu ponto de vista" e clique em Transmitir. Cada transmissão sua vale +50 XP! Posts de astronautas aparecem em roxo/rosa, e de terráqueos em verde.',
  },
  {
    id: 'xp_levels',
    keywords: ['xp', 'nível', 'nivel', 'level', 'pontos', 'experiência', 'experiencia', 'subir'],
    answer:
      'Você ganha XP agindo na plataforma: transmitir um post (+50), receber uma curtida (+5), curtir alguém (+2) e comentar (+2). Ao acumular XP, você sobe de nível e desbloqueia novos títulos de explorador. Veja seu progresso no Perfil!',
  },
  {
    id: 'badges',
    keywords: [
      'badge',
      'conquista',
      'medalha',
      'desbloquear',
      'troféu',
      'trofeu',
      'insígnia',
      'insignia',
    ],
    answer:
      'Conquistas são desbloqueadas automaticamente conforme você usa o ASTRALIS: sua primeira transmissão, sua décima curtida recebida, sua sequência de dias ativos... Cada uma aparece no seu Perfil e te notifica na hora. Já desbloqueou a "Primeira Órbita"?',
  },
  {
    id: 'map',
    keywords: [
      'mapa',
      'orbital',
      'iss',
      'localização',
      'localizacao',
      'geolocalização',
      'satélite',
      'satelite',
      'tempo real',
    ],
    answer:
      'O Mapa Orbital mostra a posição REAL da Estação Espacial Internacional (ISS), atualizada a cada 5 segundos via dados de satélite ao vivo. Você vê latitude, longitude, altitude e velocidade reais — não é simulação!',
  },
  {
    id: 'missions',
    keywords: ['missão', 'missao', 'missões', 'missoes', 'expedição', 'expedicao', 'astronauta'],
    answer:
      'Em Missões você acompanha as expedições ativas, como a ISS Expedição 71 e a Dragon Crew-9, com linha do tempo e progresso de cada uma. Se você se cadastrou como astronauta, seus dias de expedição também são registrados no seu perfil!',
  },
  {
    id: 'gallery',
    keywords: ['galeria', 'foto', 'imagem', 'fotos', 'imagens'],
    answer:
      'A Galeria reúne todos os registros visuais — imagens da Terra capturadas do espaço e fotos do solo, cada uma com sua legenda e contexto. É a memória visual do ASTRALIS.',
  },
  {
    id: 'ods',
    keywords: ['ods', 'sustentável', 'sustentavel', 'onu', 'clima', 'objetivo', 'desenvolvimento'],
    answer:
      'O ASTRALIS se conecta aos Objetivos de Desenvolvimento Sustentável da ONU. Por exemplo: quando uma astronauta detecta queimadas do espaço e alguém confirma no solo, isso liga ao ODS 13 (Ação Climática). Também trabalhamos com o ODS 9 (Inovação) e o ODS 11 (Cidades Sustentáveis).',
  },
  {
    id: 'save_share',
    keywords: ['salvar', 'salvo', 'salvos', 'compartilhar', 'link', 'guardar'],
    answer:
      'Em qualquer transmissão você pode clicar no marcador para Salvar (encontra depois em "Salvos") ou no ícone de compartilhar para copiar o link e enviar a quem quiser.',
  },
  {
    id: 'comments',
    keywords: ['comentar', 'comentário', 'comentario', 'responder', 'resposta'],
    answer:
      'Para comentar, clique no ícone de balão em uma transmissão. A seção de comentários abre, você escreve e envia — aparece na hora, e ainda ganha XP por interagir!',
  },
  {
    id: 'type',
    keywords: ['terráqueo', 'terraqueo', 'terrestre', 'orbital', 'verde', 'roxo', 'cor', 'tipo'],
    answer:
      'No ASTRALIS, a cor conta uma história: usuários terrestres aparecem em verde (a cor da Terra), e usuários em órbita aparecem em roxo e rosa. Assim você sabe na hora de onde vem cada transmissão. 🌍',
  },
]

// resposta padrão quando nada casa
export const astraFallback =
  'Hmm, ainda não sei responder isso com detalhes, mas posso te explicar sobre: o Feed, as Missões, o Mapa Orbital, a Galeria, como ganhar XP e conquistas, ou os ODS da ONU. Sobre qual desses quer saber?'

// passos do tour automático (primeiro acesso) — cada um aponta uma página
export const astraTour = [
  {
    page: 'Feed',
    title: 'Olá! Eu sou a ASTRA ✨',
    text: 'Sua guia aqui no ASTRALIS. Vou te apresentar a plataforma em poucos passos — vamos lá?',
  },
  {
    page: 'Feed',
    title: 'Este é o seu Feed',
    text: 'Aqui astronautas e terráqueos trocam transmissões com fotos, dados e descobertas. Transmita algo e ganhe +50 XP!',
  },
  {
    page: 'Feed',
    openPanel: true,
    title: 'Painel Orbital',
    text: 'Aqui à direita você acompanha os ODS em destaque, as missões ativas e as tendências do momento. No celular, ele abre como um painel.',
  },
  {
    page: 'Mapa',
    title: 'Mapa Orbital ao vivo',
    text: 'Acompanhe a posição REAL da Estação Espacial Internacional, atualizada a cada 5 segundos via satélite. Não é simulação!',
  },
  {
    page: 'Missões',
    title: 'Explorador de Missões',
    text: 'Veja as expedições ativas com linha do tempo e progresso. Se você é astronauta, seus dias de expedição contam aqui.',
  },
  {
    page: 'Galeria',
    title: 'Galeria da Terra',
    text: 'Todos os registros visuais reunidos — imagens da Terra vista do espaço e do solo, cada uma com seu contexto.',
  },
  {
    page: 'Perfil',
    title: 'Seu Perfil espacial',
    text: 'Acompanhe seu nível, XP, conquistas e reputação. Tudo sobe conforme você interage. Boa exploração! 🚀',
  },
]
