import { useState } from 'react'
import { Heart, MessageCircle, Share2, Bookmark, Check } from 'lucide-react'
import { formatCount } from '../../lib/format'

export default function PostActions({
  postId,
  likes,
  comments,
  liked,
  saved,
  onLike,
  onToggleComments,
  onSave,
}) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = `${window.location.origin}/?post=${postId}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.prompt('Copie o link da transmissão:', url)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onLike}
        aria-pressed={liked}
        aria-label={liked ? 'Remover curtida' : 'Curtir'}
        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition
          focus:outline-none focus-visible:ring-2 focus-visible:ring-cosmos
          ${liked ? 'border-aurora/50 bg-aurora/10 text-aurora' : 'border-white/15 text-white/80 hover:border-white/30'}`}
      >
        <Heart className="h-4 w-4" fill={liked ? 'currentColor' : 'none'} aria-hidden="true" />
        {formatCount(likes)}
      </button>

      <button
        onClick={onToggleComments}
        aria-label="Ver comentários"
        className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/30
          focus:outline-none focus-visible:ring-2 focus-visible:ring-cosmos"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        {formatCount(comments)}
      </button>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={handleShare}
          aria-label="Compartilhar (copiar link)"
          className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cosmos
            ${copied ? 'border-terra/50 bg-terra/10 text-terra' : 'border-white/15 text-white/70 hover:border-white/30 hover:text-white'}`}
        >
          {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
          {copied ? 'Copiado!' : ''}
        </button>
        <button
          onClick={onSave}
          aria-pressed={saved}
          aria-label={saved ? 'Remover dos salvos' : 'Salvar'}
          className={`grid h-9 w-9 place-items-center rounded-xl border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cosmos
            ${saved ? 'border-cosmos/50 bg-cosmos/10 text-cosmos' : 'border-white/15 text-white/70 hover:border-white/30 hover:text-white'}`}
        >
          <Bookmark className="h-4 w-4" fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
