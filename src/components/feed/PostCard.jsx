import { useState } from 'react'
import { Trash2, AlertTriangle } from 'lucide-react'
import Card from '../ui/Card'
import Avatar from '../ui/Avatar'
import UserTag from '../ui/UserTag'
import Button from '../ui/Button'
import PostMedia from './PostMedia'
import PostActions from './PostActions'
import CommentSection from './CommentSection'
import { getUserById } from '../../data/users'
import { odsColor } from '../../lib/format'
import { useApp } from '../../context/AppContext'
import { useAuth } from '../../context/AuthContext'

// PostCard — unidade do feed. Resolve autor (mock ou usuário logado),
// integra curtir, comentar, salvar, compartilhar e apagar (só do próprio autor).
export default function PostCard({ post, onLike }) {
  const { comments, saved, addComment, toggleSave, deletePost } = useApp()
  const { user } = useAuth()
  const [showComments, setShowComments] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const author =
    getUserById(post.authorId) ||
    post.author ||
    (user && user.id === post.authorId ? user : null) ||
    { name: 'Explorador', initials: '??', type: 'orbital', location: 'ASTRALIS' }

  const postComments = comments[post.id] || []
  const isSaved = saved.includes(post.id)
  const isOwner = user && post.authorId === user.id

  return (
    <Card as="article" className="p-5">
      <header className="flex items-start gap-3">
        <Avatar initials={author.initials} type={author.type} />
        <div className="min-w-0">
          <p className="font-display font-bold text-white">{author.name}</p>
          <p className="font-mono text-xs text-white/50">
            {author.location} · {post.timeAgo}
          </p>
        </div>
        <UserTag type={author.type} className="ml-auto" />

        {/* apagar — só aparece nos posts do próprio usuário */}
        {isOwner && (
          <button
            onClick={() => setConfirmDelete(true)}
            aria-label="Apagar transmissão"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white/40 transition hover:bg-reentry/10 hover:text-reentry focus:outline-none focus-visible:ring-2 focus-visible:ring-reentry"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </header>

      {post.media && (
        <div className="mt-4"><PostMedia media={post.media} /></div>
      )}

      <p className="mt-4 leading-relaxed text-white/90">
        {post.text}{' '}
        {post.ods?.map((n) => (
          <span key={n} className={`ml-1 inline-block rounded-md border px-1.5 py-0.5 align-middle font-mono text-[10px] ${odsColor(n)}`}>
            ODS {n}
          </span>
        ))}
      </p>

      <div className="mt-4">
        <PostActions
          postId={post.id}
          likes={post.likes}
          comments={post.comments}
          liked={post.liked}
          saved={isSaved}
          onLike={() => onLike?.(post.id)}
          onToggleComments={() => setShowComments((s) => !s)}
          onSave={() => toggleSave(post.id)}
        />
      </div>

      {showComments && (
        <CommentSection
          comments={postComments}
          onAdd={(text) => addComment(post.id, text)}
        />
      )}

      {/* confirmação de exclusão */}
      {confirmDelete && (
        <div className="mt-4 rounded-xl border border-reentry/30 bg-reentry/10 p-4">
          <p className="flex items-center gap-2 text-sm text-white">
            <AlertTriangle className="h-4 w-4 shrink-0 text-reentry" aria-hidden="true" />
            Apagar esta transmissão? Esta ação não pode ser desfeita.
          </p>
          <div className="mt-3 flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setConfirmDelete(false)}
            >
              Cancelar
            </Button>
            <button
              onClick={() => { deletePost(post.id); setConfirmDelete(false) }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-reentry px-4 py-2 text-sm font-semibold text-void transition hover:opacity-90"
            >
              <Trash2 className="h-4 w-4" />
              Apagar
            </button>
          </div>
        </div>
      )}
    </Card>
  )
}