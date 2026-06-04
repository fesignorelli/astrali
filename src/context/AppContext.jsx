import { createContext, useContext, useState, useCallback } from 'react'
import { posts as initialPosts } from '../data/posts'
import { currentUser } from '../data/users'

// AppContext — estado compartilhado do app.
// Centraliza os posts para que Feed, Galeria, Mapa e Perfil leiam a mesma fonte.
const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts)

  // alterna curtida de um post (otimista, sem backend)
  const toggleLike = useCallback((postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) }
          : p
      )
    )
  }, [])

  // cria um novo post do usuário atual no topo do feed
  const addPost = useCallback((text) => {
    const newPost = {
      id: `p_${Date.now()}`,
      authorId: currentUser.id,
      timeAgo: 'agora',
      text,
      media: null,
      ods: [],
      likes: 0,
      comments: 0,
      liked: false,
    }
    setPosts((prev) => [newPost, ...prev])
  }, [])

  const value = { posts, toggleLike, addPost, currentUser }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// hook de acesso — lança erro claro se usado fora do provider
export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp deve ser usado dentro de <AppProvider>')
  return ctx
}