import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

const USERS_KEY = 'astralis:users'     
const SESSION_KEY = 'astralis:session'  

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
const write = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { }
}

const defaultGamification = () => ({
  xp: 0,
  reputation: 0,
  rank: 999,
  badges: ['b_welcome'],
  streak: 1,
  lastLogin: new Date().toDateString(),
  postsCount: 0,
  likesReceived: 0,
  missionsCompleted: 0,
  completedMissionIds: [],
})

const normalizeUser = (u) => {
  if (!u) return u
  return {
    ...u,
    type: u.type || 'terrestrial',
    initials: u.initials || (u.name ? u.name.slice(0, 2).toUpperCase() : 'VC'),
    gamification: { ...defaultGamification(), ...(u.gamification || {}) },
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const session = read(SESSION_KEY, null)
    if (session) setUser(normalizeUser(session))
    setReady(true)
  }, [])

  const signup = useCallback(({ name, email, password, type }) => {
    const users = read(USERS_KEY, {})
    if (users[email]) {
      return { ok: false, error: 'Já existe uma conta com esse e-mail.' }
    }
    const newUser = {
      id: `u_${Date.now()}`,
      name,
      email,
      password,
      type,     
      initials: name.trim().slice(0, 2).toUpperCase() || 'VC',
      location: type === 'orbital' ? 'ISS · Órbita' : 'Terra',
      role: type === 'orbital' ? 'Novo astronauta' : 'Novo observador',
      bio: 'Começando minha jornada no ASTRALIS.',
      gamification: {
        xp: 0,
        reputation: 0,
        rank: 999,
        badges: ['b_welcome'],
        streak: 1,
        lastLogin: new Date().toDateString(),
        postsCount: 0,
        likesReceived: 0,
      },
    }
    users[email] = newUser
    write(USERS_KEY, users)
    write(SESSION_KEY, newUser)
    setUser(newUser)
    return { ok: true }
  }, [])

  const login = useCallback(({ email, password }) => {
    const users = read(USERS_KEY, {})
    const found = users[email]
    if (!found) return { ok: false, error: 'Conta não encontrada.' }
    if (found.password !== password) return { ok: false, error: 'Senha incorreta.' }
    const norm = normalizeUser(found)
    write(SESSION_KEY, norm)
    setUser(norm)
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    try { localStorage.removeItem(SESSION_KEY) } catch {  }
    setUser(null)
  }, [])

  const updateUser = useCallback((updater) => {
    setUser((prev) => {
      if (!prev) return prev
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
      write(SESSION_KEY, next)
      const users = read(USERS_KEY, {})
      users[next.email] = next
      write(USERS_KEY, users)
      return next
    })
  }, [])

  const value = { user, ready, signup, login, logout, updateUser }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>')
  return ctx
}