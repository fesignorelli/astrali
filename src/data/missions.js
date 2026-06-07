export const missions = [
  {
    id: 'm_iss71',
    name: 'ISS Expedição 71',
    crew: 3,
    day: 89,
    totalDays: 180,
    status: 'active',
    ods: [13, 9],
    summary: 'Pesquisa de longa duração em microgravidade e observação climática.',
  },
  {
    id: 'm_dragon9',
    name: 'Dragon Crew-9',
    crew: 2,
    day: 34,
    totalDays: 120,
    status: 'active',
    ods: [9, 11],
    summary: 'Transporte de tripulação e experimentos de habitabilidade orbital.',
  },
  {
    id: 'm_artemis',
    name: 'Artemis Base Lunar',
    crew: 4,
    day: 12,
    totalDays: 90,
    status: 'active',
    ods: [9, 11],
    summary: 'Primeiros habitantes da base lunar — testes de infraestrutura.',
  },
]

export const ods = [
  { number: 13, label: 'Clima', color: 'reentry' },
  { number: 9, label: 'Inovação', color: 'cosmos' },
  { number: 11, label: 'Cidades', color: 'terra' },
]

export const getMissionById = (id) => missions.find((m) => m.id === id)
