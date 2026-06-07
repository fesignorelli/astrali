import PostComposer from '../components/feed/PostComposer'
import PostCard from '../components/feed/PostCard'
import { useApp } from '../context/AppContext'

// FeedPage — coluna central. Lê posts do contexto e repassa as ações.
export default function FeedPage() {
  const { posts, toggleLike, addPost } = useApp()

  return (
    <section className="mx-auto w-full max-w-2xl">
      <header className="mb-6">
        <h1 className="bg-astralis-gradient bg-clip-text font-display text-4xl font-black text-transparent">
          Feed
        </h1>
        <p className="mt-1 text-sm text-white/50">{posts.length} registros orbitais e terrestres</p>
      </header>

      <div className="mb-5">
        <PostComposer onTransmit={addPost} />
      </div>

      <div className="space-y-5">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={toggleLike} />
        ))}
      </div>
    </section>
  )
}
