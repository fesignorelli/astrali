export const MAX_LEVEL = 10

export const XP_RULES = {
  transmit: 50,
  receiveLike: 5,
  giveLike: 2,
  dailyLogin: 20,
  streakBonus: 10,
  completeMission: 120,
}

export function xpForLevel(level) {
  return Math.round(100 * Math.pow(level - 1, 1.5))
}

export function levelFromXP(totalXP) {
  let level = 1
  while (level < MAX_LEVEL && totalXP >= xpForLevel(level + 1)) level++

  if (level >= MAX_LEVEL) {
    return {
      level: MAX_LEVEL,
      intoLevel: 0,
      span: 0,
      pct: 100,
      xpToNext: 0,
      isMax: true,
    }
  }

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
    isMax: false,
  }
}

export function titleForLevel(level, type) {
  const orbital = ['Recruta Orbital', 'Explorador Orbital', 'Comandante', 'Lenda Orbital']
  const terra = ['Recruta Terrestre', 'Sentinela', 'Guardião da Terra', 'Lenda Terrestre']
  const list = type === 'terrestrial' ? terra : orbital
  if (level < 3) return list[0]
  if (level < 7) return list[1]
  if (level < 10) return list[2]
  return list[3]
}

export const BADGE_UNLOCKS = {
  b_welcome: () => true,
  b_first_orbit: ({ posts }) => posts >= 1,
  b_earth_eye: ({ posts }) => posts >= 5,
  b_climate_watch: ({ totalLikesReceived }) => totalLikesReceived >= 10,
  b_veteran: ({ streak }) => streak >= 3,
  b_first_mission: ({ missionsCompleted }) => missionsCompleted >= 1,
  b_mission_specialist: ({ missionsCompleted }) => missionsCompleted >= 2,
  b_mission_commander: ({ missionsCompleted }) => missionsCompleted >= 3,
}

export function evaluateBadges(stats) {
  return Object.entries(BADGE_UNLOCKS)
    .filter(([, cond]) => {
      try {
        return cond(stats)
      } catch {
        return false
      }
    })
    .map(([id]) => id)
}
