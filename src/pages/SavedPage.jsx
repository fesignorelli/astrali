import Card from '../components/ui/Card'
import PostCard from '../components/feed/PostCard'
import { useApp } from '../context/AppContext'

export default function SavedPage() {
  const { posts, saved, toggleLike } = useApp()
  const savedPosts = posts.filter((p) => saved.includes(p.id))

  return (
    <section className="mx-auto w-full">
      <header className="mb-6">
        <h1 className="bg-astralis-gradient bg-clip-text font-display text-4xl font-black text-transparent">
          Salvos
        </h1>
        <p className="mt-1 text-sm text-white/50">
          {savedPosts.length}{' '}
          {savedPosts.length === 1 ? 'transmissão salva' : 'transmissões salvas'}
        </p>
      </header>

      {savedPosts.length > 0 ? (
        <div className="space-y-5">
          {savedPosts.map((p) => (
            <PostCard key={p.id} post={p} onLike={toggleLike} />
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center text-sm text-white/50">
          Nenhuma transmissão salva ainda. Toque no ícone de marcador em um post para salvá-lo.
        </Card>
      )}
    </section>
  )
}
