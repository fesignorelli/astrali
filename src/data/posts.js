export const posts = [
  {
    id: 'p_001',
    authorId: 'u_ana',
    timeAgo: '2h atrás',
    text: 'Queimadas detectadas no MT — visíveis mesmo a 408 km. A fumaça alcançou 200 km de extensão. Alguém no Brasil consegue confirmar no chão?',
    media: {
      kind: 'orbital',
      geo: '51.6° incl · alt 408km · 06:42 UTC',
      caption: 'Vista noturna do Brasil — Centro-Oeste sob fumaça.',
    },
    ods: [13],
    likes: 142,
    comments: 38,
    liked: false,
  },
  {
    id: 'p_002',
    authorId: 'u_marcos',
    timeAgo: '3h atrás',
    text: 'Confirmado, Ana. Céu laranja desde as 14h, fumaça pesada, difícil respirar. Área afetada: ~2.300 km². Fotos em breve.',
    media: {
      kind: 'terrestrial',
      geo: 'Cuiabá, MT · 15h · 34°C · qualidade do ar: ruim',
      caption: 'Horizonte tomado pela fumaça das queimadas.',
    },
    ods: [13],
    likes: 89,
    comments: 24,
    liked: false,
    replyTo: 'p_001',
  },
  {
    id: 'p_003',
    authorId: 'u_kenji',
    timeAgo: '5h atrás',
    text: 'Oceano Pacífico Sul — temperatura superficial 2,1°C acima da média histórica. Dados enviados ao módulo de monitoramento. Registro #2847.',
    media: {
      kind: 'orbital',
      geo: '51.6° incl · alt 408km · Pacífico Sul',
      caption: 'Leitura térmica do oceano via sensoriamento remoto.',
    },
    ods: [13, 9],
    likes: 201,
    comments: 61,
    liked: true,
  },
]

export const trends = [
  { tag: '#queimadas', count: '1.2k' },
  { tag: '#ISS', count: '847' },
  { tag: '#ODS13', count: '634' },
  { tag: '#Pacífico', count: '312' },
]