import Card from '../components/ui/Card'
import PostMedia from '../components/feed/PostMedia'
import UserTag from '../components/ui/UserTag'
import { useApp } from '../context/AppContext'
import { getUserById } from '../data/users'

export default function GalleryPage() {
  const { posts } = useApp()
  const withMedia = posts.filter((p) => p.media)

  return (
    <section className="mx-auto w-full max-w-3xl">
      <header className="mb-6">
        <h1 className="bg-astralis-gradient bg-clip-text font-display text-4xl font-black text-transparent">
          Galeria
        </h1>
        <p className="mt-1 text-sm text-white/50">
          {withMedia.length} registros visuais — da órbita ao solo
        </p>
      </header>

      {withMedia.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {withMedia.map((p) => {
            const author = getUserById(p.authorId)
            return (
              <Card key={p.id} className="overflow-hidden p-3">
                <PostMedia media={p.media} />
                <div className="mt-3 flex items-center justify-between gap-2 px-1">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{author?.name}</p>
                    <p className="truncate font-mono text-[10px] text-white/50">
                      {p.media.caption}
                    </p>
                  </div>
                  {author && <UserTag type={author.type} />}
                </div>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="p-8 text-center text-sm text-white/50">
          Nenhuma imagem capturada ainda.
        </Card>
      )}
    </section>
  )
}
