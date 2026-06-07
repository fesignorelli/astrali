// ASTRALIS — helpers de apresentação
// Centraliza o princípio "verde = Terra": a cor sai do tipo, não de decisão manual.

// Estilos por tipo de usuário/mídia. Orbital = cosmos/aurora, Terrestre = terra.
export const typeStyles = {
  orbital: {
    label: 'Em órbita',
    dot: 'bg-cosmos',
    text: 'text-cosmos',
    ring: 'ring-cosmos/40',
    avatarBg: 'bg-gradient-to-br from-cosmos to-aurora',
    tagBg: 'bg-cosmos/15',
    tagText: 'text-cosmos',
    border: 'border-cosmos/30',
  },
  terrestrial: {
    label: 'Terrestre',
    dot: 'bg-terra',
    text: 'text-terra',
    ring: 'ring-terra/40',
    avatarBg: 'bg-gradient-to-br from-terra to-cosmos',
    tagBg: 'bg-terra/15',
    tagText: 'text-terra',
    border: 'border-terra/30',
  },
}

export const getTypeStyle = (type) => typeStyles[type] ?? typeStyles.orbital

// Cor por tier de badge
export const tierStyles = {
  common: 'border-white/15 text-white/70',
  rare: 'border-cosmos/50 text-cosmos',
  legendary: 'border-reentry/60 text-reentry',
}

// Cor de um ODS pelo número (usado em selos)
export const odsColor = (n) => {
  if (n === 13) return 'text-reentry border-reentry/40 bg-reentry/10'
  if (n === 9) return 'text-cosmos border-cosmos/40 bg-cosmos/10'
  if (n === 11) return 'text-terra border-terra/40 bg-terra/10'
  return 'text-white/70 border-white/20 bg-white/5'
}

// Formata números grandes: 1420 -> "1.4k"
export const formatCount = (n) => {
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'k'
  return String(n)
}
