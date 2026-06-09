import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import { posts as initialPosts } from '../data/posts'
import { getMissionById } from '../data/missions'
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
  const [xpHistory, setXpHistory] = useState(persisted?.xpHistory ?? [])
  const [alerts, setAlerts] = useState([])
  const [toasts, setToasts] = useState([])
  const toastId = useRef(0)
  const alertId = useRef(0)

  useEffect(() => {
    saveFeed({ posts, comments, saved, xpHistory })
  }, [posts, comments, saved, xpHistory])

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
          missionsCompleted: extraStats.missionsCompleted ?? g.missionsCompleted ?? 0,
        }
        const earned = evaluateBadges(stats)
        const newBadges = earned.filter((b) => !g.badges.includes(b))

        events.push({ type: 'xp', title: `+${amount} XP`, subtitle: reason })
        if (after.level > before.level) {
          const t = titleForLevel(after.level, prev.type)
          events.push({ type: 'level', title: `Nível ${after.level} alcançado!`, subtitle: t })
          window.dispatchEvent(
            new CustomEvent('astra:levelUp', { detail: { level: after.level, title: t } })
          )
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
            missionsCompleted: stats.missionsCompleted,
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
        const key = `like:${postId}`
        if (!xpHistory.includes(key)) {
          setXpHistory((prev) => [...prev, key])
          grantXP(XP_RULES.giveLike, 'Você curtiu uma transmissão')
          if (post.authorId === user.id) {
            grantXP(XP_RULES.receiveLike, 'Sua transmissão foi curtida', {
              likesReceived: (user.gamification.likesReceived ?? 0) + 1,
            })
          }
        }
      }
    },
    [posts, user, grantXP, xpHistory]
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
      const key = `comment:${postId}`
      if (!xpHistory.includes(key)) {
        setXpHistory((prev) => [...prev, key])
        grantXP(XP_RULES.giveLike, 'Você comentou em uma transmissão')
      }
    },
    [user, grantXP, xpHistory]
  )

  const toggleSave = useCallback((postId) => {
    setSaved((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    )
  }, [])

  const completeMission = useCallback(
    (missionId) => {
      if (!user) return
      const g = user.gamification
      const done = g.completedMissionIds ?? []
      if (done.includes(missionId)) return

      const newCount = (g.missionsCompleted ?? 0) + 1
      updateUser((prev) => {
        if (!prev) return prev
        const pg = prev.gamification
        const pdone = pg.completedMissionIds ?? []
        if (pdone.includes(missionId)) return prev
        return {
          ...prev,
          gamification: { ...pg, completedMissionIds: [...pdone, missionId] },
        }
      })

      const mission = getMissionById(missionId)
      if (mission) {
        const autoPost = {
          id: `p_${Date.now()}`,
          authorId: user.id,
          author: {
            name: user.name,
            initials: user.initials,
            type: user.type,
            location: user.location,
          },
          timeAgo: 'agora',
          text: `✅ Missão concluída: ${mission.name}! ${mission.summary}`,
          media: null,
          ods: mission.ods ?? [],
          likes: 0,
          comments: 0,
          liked: false,
        }
        setPosts((prev) => [autoPost, ...prev])
      }
      grantXP(XP_RULES.completeMission, 'Missão concluída', { missionsCompleted: newCount })
    },
    [user, updateUser, grantXP]
  )

  const deletePost = useCallback(
    (postId) => {
      const post = posts.find((p) => p.id === postId)
      if (!post || !user || post.authorId !== user.id) return
      setPosts((prev) => prev.filter((p) => p.id !== postId))
      setSaved((prev) => prev.filter((id) => id !== postId))
      setComments((prev) => {
        const next = { ...prev }
        delete next[postId]
        return next
      })
    },
    [posts, user]
  )

  const value = {
    posts,
    comments,
    saved,
    alerts,
    toggleLike,
    addPost,
    addComment,
    toggleSave,
    deletePost,
    completeMission,
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
