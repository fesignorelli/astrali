export const badges = {
  b_welcome: {
    id: 'b_welcome',
    name: 'Bem-vindo a bordo',
    description: 'Criou seu perfil no ASTRALIS.',
    icon: 'Rocket',
    tier: 'common',
    scope: 'any',
  },
  b_first_orbit: {
    id: 'b_first_orbit',
    name: 'Primeira Órbita',
    description: 'Completou sua primeira transmissão em órbita.',
    icon: 'Orbit',
    tier: 'common',
    scope: 'orbital',
  },
  b_ground_truth: {
    id: 'b_ground_truth',
    name: 'Verdade de Campo',
    description: 'Confirmou no solo um registro feito do espaço.',
    icon: 'MapPin',
    tier: 'rare',
    scope: 'terrestrial',
  },
  b_earth_eye: {
    id: 'b_earth_eye',
    name: 'Olho na Terra',
    description: 'Publicou 50 imagens da Terra vista do espaço.',
    icon: 'Eye',
    tier: 'rare',
    scope: 'orbital',
  },
  b_climate_watch: {
    id: 'b_climate_watch',
    name: 'Vigia do Clima',
    description: 'Contribuiu com um alerta ligado ao ODS 13.',
    icon: 'CloudAlert',
    tier: 'rare',
    scope: 'any',
  },
  b_ocean_data: {
    id: 'b_ocean_data',
    name: 'Dados do Oceano',
    description: 'Enviou leituras de temperatura oceânica ao monitoramento.',
    icon: 'Waves',
    tier: 'rare',
    scope: 'orbital',
  },
  b_veteran: {
    id: 'b_veteran',
    name: 'Veterano de Missão',
    description: 'Acumulou mais de 60 dias de missão ativa.',
    icon: 'Medal',
    tier: 'legendary',
    scope: 'orbital',
  },
}

export const getBadge = (id) => badges[id]
export const getBadges = (ids = []) => ids.map((id) => badges[id]).filter(Boolean)