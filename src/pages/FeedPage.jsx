import PostComposer from '../components/feed/PostComposer'
import PostCard from '../components/feed/PostCard'
import { useApp } from '../context/AppContext'

export default function FeedPage() {
  const { posts, toggleLike, addPost } = useApp()

  return (
    <section className="mx-auto w-full">
      <header className="mb-6">
        <h1 className="bg-astralis-gradient bg-clip-text font-display font-black text-transparent text-4xl">
          Feed
        </h1>
        <p className="mt-1 text-white/50">{posts.length} registros orbitais e terrestres</p>
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
