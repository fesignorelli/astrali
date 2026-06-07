import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import { posts as initialPosts } from '../data/posts'
import { useAuth } from './AuthContext'
import { XP_RULES, levelFromXP, titleForLevel, evaluateBadges } from '../lib/gamification'
import { getBadge } from '../data/badges'

const AppContext = createContext(null)

const FEED_KEY = 'astralis:feed'
const loadFeed = () => {
  try {
    const raw = localStorage.getItem(FEED_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}
const saveFeed = (data) => {
  try {
    localStorage.setItem(FEED_KEY, JSON.stringify(data))
  } catch {}
}

export function AppProvider({ children }) {
  const { user, updateUser } = useAuth()

  const persisted = loadFeed()
  const [posts, setPosts] = useState(persisted?.posts ?? initialPosts)
  const [comments, setComments] = useState(persisted?.comments ?? {})
  const [saved, setSaved] = useState(persisted?.saved ?? [])
  const [alerts, setAlerts] = useState([])
  const [toasts, setToasts] = useState([])
  const toastId = useRef(0)
  const alertId = useRef(0)

  useEffect(() => {
    saveFeed({ posts, comments, saved })
  }, [posts, comments, saved])

  const pendingEvents = useRef([])
  const [eventTick, setEventTick] = useState(0)

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  useEffect(() => {
    if (pendingEvents.current.length === 0) return
    const events = pendingEvents.current
    pendingEvents.current = []

    setToasts((prev) => [...prev, ...events.map((e) => ({ id: ++toastId.current, ...e }))])
    setAlerts((prev) => [
      ...events.map((e) => ({ id: ++alertId.current, time: Date.now(), ...e })),
      ...prev,
    ])
  }, [eventTick])

  const queueEvents = useCallback((events) => {
    if (!events.length) return
    pendingEvents.current.push(...events)
    setEventTick((t) => t + 1)
  }, [])

  const grantXP = useCallback(
    (amount, reason, extraStats = {}) => {
      const events = []
      updateUser((prev) => {
        if (!prev) return prev
        const g = prev.gamification
        const before = levelFromXP(g.xp)
        const newXP = g.xp + amount
        const after = levelFromXP(newXP)

        const stats = {
          posts: extraStats.posts ?? g.postsCount,
          totalLikesReceived: extraStats.likesReceived ?? g.likesReceived,
          streak: g.streak,
          type: prev.type,
        }
        const earned = evaluateBadges(stats)
        const newBadges = earned.filter((b) => !g.badges.includes(b))

        events.push({ type: 'xp', title: `+${amount} XP`, subtitle: reason })
        if (after.level > before.level) {
          const t = titleForLevel(after.level, prev.type)
          events.push({ type: 'level', title: `Nível ${after.level} alcançado!`, subtitle: t })
        }
        newBadges.forEach((id) => {
          const b = getBadge(id)
          if (b) events.push({ type: 'badge', title: 'Conquista desbloqueada!', subtitle: b.name })
        })

        return {
          ...prev,
          gamification: {
            ...g,
            xp: newXP,
            reputation: g.reputation + Math.round(amount / 2),
            badges: [...g.badges, ...newBadges],
            postsCount: stats.posts,
            likesReceived: stats.totalLikesReceived,
          },
        }
      })
      queueEvents(events)
    },
    [updateUser, queueEvents]
  )

  const toggleLike = useCallback(
    (postId) => {
      const post = posts.find((p) => p.id === postId)
      if (!post) return
      const willLike = !post.liked

      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, liked: willLike, likes: p.likes + (willLike ? 1 : -1) } : p
        )
      )

      if (willLike && user) {
        grantXP(XP_RULES.giveLike, 'Você curtiu uma transmissão')
        if (post.authorId === user.id) {
          grantXP(XP_RULES.receiveLike, 'Sua transmissão foi curtida', {
            likesReceived: (user.gamification.likesReceived ?? 0) + 1,
          })
        }
      }
    },
    [posts, user, grantXP]
  )

  const addPost = useCallback(
    (text) => {
      if (!user) return
      const newPost = {
        id: `p_${Date.now()}`,
        authorId: user.id,
        author: {
          name: user.name,
          initials: user.initials,
          type: user.type,
          location: user.location,
        },
        timeAgo: 'agora',
        text,
        media: null,
        ods: [],
        likes: 0,
        comments: 0,
        liked: false,
      }
      setPosts((prev) => [newPost, ...prev])
      grantXP(XP_RULES.transmit, 'Transmissão enviada', {
        posts: (user.gamification.postsCount ?? 0) + 1,
      })
    },
    [user, grantXP]
  )

  const addComment = useCallback(
    (postId, text) => {
      if (!user || !text.trim()) return
      const comment = {
        id: `c_${Date.now()}`,
        authorId: user.id,
        authorName: user.name,
        authorType: user.type,
        initials: user.initials,
        text: text.trim(),
        time: 'agora',
      }
      setComments((prev) => ({ ...prev, [postId]: [...(prev[postId] || []), comment] }))
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, comments: p.comments + 1 } : p))
      )
      grantXP(XP_RULES.giveLike, 'Você comentou em uma transmissão')
    },
    [user, grantXP]
  )

  const toggleSave = useCallback((postId) => {
    setSaved((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    )
  }, [])

  const value = {
    posts,
    comments,
    saved,
    alerts,
    toggleLike,
    addPost,
    addComment,
    toggleSave,
    toasts,
    dismissToast,
    grantXP,
  }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp deve ser usado dentro de <AppProvider>')
  return ctx
}
