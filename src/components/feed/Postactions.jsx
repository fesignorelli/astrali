import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react'
import { formatCount } from '../../lib/format'

export default function PostActions({ likes, comments, liked, onLike }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onLike}
        aria-pressed={liked}
        aria-label={liked ? 'Remover curtida' : 'Curtir'}
        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition
          focus:outline-none focus-visible:ring-2 focus-visible:ring-cosmos focus-visible:ring-offset-2 focus-visible:ring-offset-void
          ${liked
            ? 'border-aurora/50 bg-aurora/10 text-aurora'
            : 'border-white/15 text-white/80 hover:border-white/30'}`}
      >
        <Heart className="h-4 w-4" fill={liked ? 'currentColor' : 'none'} aria-hidden="true" />
        {formatCount(likes)}
      </button>

      <button
        aria-label="Comentar"
        className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/30
          focus:outline-none focus-visible:ring-2 focus-visible:ring-cosmos focus-visible:ring-offset-2 focus-visible:ring-offset-void"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        {formatCount(comments)}
      </button>

      <div className="ml-auto flex items-center gap-2">
        <button
          aria-label="Compartilhar"
          className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 text-white/70 transition hover:border-white/30 hover:text-white
            focus:outline-none focus-visible:ring-2 focus-visible:ring-cosmos focus-visible:ring-offset-2 focus-visible:ring-offset-void"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          aria-label="Salvar"
          className="grid h-9 w-9 place-items-center rounded-xl border border-white/15 text-white/70 transition hover:border-white/30 hover:text-white
            focus:outline-none focus-visible:ring-2 focus-visible:ring-cosmos focus-visible:ring-offset-2 focus-visible:ring-offset-void"
        >
          <Bookmark className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}