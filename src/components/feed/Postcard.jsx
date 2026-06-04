import Card from '../ui/Card'
import Avatar from '../ui/Avatar'
import UserTag from '../ui/UserTag'
import PostMedia from './PostMedia'
import PostActions from './PostActions'
import { getUserById } from '../../data/users'
import { odsColor } from '../../lib/format'

export default function PostCard({ post, onLike }) {
  const author = getUserById(post.authorId)
  if (!author) return null

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
      </header>

      {post.media && (
        <div className="mt-4">
          <PostMedia media={post.media} />
        </div>
      )}

      <p className="mt-4 leading-relaxed text-white/90">
        {post.text}{' '}
        {post.ods?.map((n) => (
          <span
            key={n}
            className={`ml-1 inline-block rounded-md border px-1.5 py-0.5 align-middle font-mono text-[10px] ${odsColor(n)}`}
          >
            ODS {n}
          </span>
        ))}
      </p>

      <div className="mt-4">
        <PostActions
          likes={post.likes}
          comments={post.comments}
          liked={post.liked}
          onLike={() => onLike?.(post.id)}
        />
      </div>
    </Card>
  )
}