import { useState } from 'react'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import { useAuth } from '../../context/AuthContext'

export default function CommentSection({ comments = [], onAdd }) {
  const { user } = useAuth()
  const [text, setText] = useState('')

  const submit = () => {
    if (!text.trim()) return
    onAdd?.(text)
    setText('')
  }

  return (
    <div className="mt-4 border-t border-white/10 pt-4">
      {/* lista */}
      {comments.length > 0 && (
        <ul className="mb-4 space-y-3">
          {comments.map((c) => (
            <li key={c.id} className="flex gap-2.5">
              <Avatar initials={c.initials} type={c.authorType} size="sm" />
              <div className="min-w-0 flex-1 rounded-xl bg-nebula/40 px-3 py-2">
                <p className="text-xs font-semibold text-white">
                  {c.authorName}{' '}
                  <span className="font-mono font-normal text-white/40">· {c.time}</span>
                </p>
                <p className="mt-0.5 text-sm text-white/85">{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* input */}
      {user && (
        <div className="flex items-center gap-2.5">
          <Avatar initials={user.initials} type={user.type} size="sm" />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="Escreva um comentário..."
            aria-label="Escreva um comentário"
            className="flex-1 rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/30
              focus:border-cosmos/50 focus:outline-none focus:ring-2 focus:ring-cosmos/30"
          />
          <Button variant="primary" size="sm" onClick={submit} disabled={!text.trim()}>
            Enviar
          </Button>
        </div>
      )}
    </div>
  )
}
