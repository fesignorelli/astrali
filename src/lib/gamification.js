// ASTRALIS — regras de gamificação (a "engine" do jogo).
// Centraliza tudo que define progressão para ficar fácil de balancear.

// XP concedido por ação
export const XP_RULES = {
  transmit: 50,        // criar um post
  receiveLike: 5,      // alguém curtiu seu post
  giveLike: 2,         // você curtiu alguém
  dailyLogin: 20,      // primeiro acesso do dia
  streakBonus: 10,     // por dia consecutivo (multiplicado pelo streak)
}

// Curva de nível: XP necessário para ATINGIR o nível n (acumulado).
// Crescimento suave no início, mais íngreme depois.
export function xpForLevel(level) {
  return Math.round(100 * Math.pow(level - 1, 1.5))
}

// A partir do XP total, descobre nível atual e progresso até o próximo.
export function levelFromXP(totalXP) {
  let level = 1
  while (totalXP >= xpForLevel(level + 1)) level++
  const currentBase = xpForLevel(level)
  const nextBase = xpForLevel(level + 1)
  const intoLevel = totalXP - currentBase
  const span = nextBase - currentBase
  return {
    level,
    intoLevel,
    span,
    pct: Math.min(100, Math.round((intoLevel / span) * 100)),
    xpToNext: nextBase - totalXP,
  }
}

// Título do explorador conforme o nível (sabor narrativo).
export function titleForLevel(level, type) {
  const orbital = ['Recruta Orbital', 'Explorador Orbital', 'Comandante', 'Lenda Orbital']
  const terra = ['Recruta Terrestre', 'Sentinela', 'Guardião da Terra', 'Lenda Terrestre']
  const list = type === 'terrestrial' ? terra : orbital
  if (level < 3) return list[0]
  if (level < 7) return list[1]
  if (level < 12) return list[2]
  return list[3]
}

// Condições de desbloqueio de badge, avaliadas sobre as stats do usuário.
// Cada função recebe { posts, totalLikesReceived, streak, type } e retorna bool.
export const BADGE_UNLOCKS = {
  b_welcome: () => true, // ganho ao criar conta
  b_first_orbit: ({ posts }) => posts >= 1,
  b_earth_eye: ({ posts }) => posts >= 5,
  b_climate_watch: ({ totalLikesReceived }) => totalLikesReceived >= 10,
  b_veteran: ({ streak }) => streak >= 3,
}

// Retorna os ids de badges que o usuário JÁ deveria ter, dado o estado atual.
export function evaluateBadges(stats) {
  return Object.entries(BADGE_UNLOCKS)
    .filter(([, cond]) => {
      try { return cond(stats) } catch { return false }
    })
    .map(([id]) => id)
}