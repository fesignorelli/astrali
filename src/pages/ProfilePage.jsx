import Card from '../components/ui/Card'
import Avatar from '../components/ui/Avatar'
import UserTag from '../components/ui/UserTag'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import PostCard from '../components/feed/PostCard'
import { getBadges } from '../data/badges'
import { useApp } from '../context/AppContext'
import { getTypeStyle, formatCount } from '../lib/format'

// ProfilePage — perfil espacial. Vitrine da gamificação (STARLINK LIFE):
// nível, XP, reputação, rank e badges. Mostra também os posts do usuário.
export default function ProfilePage({ user }) {
  const { posts, toggleLike } = useApp()
  if (!user) return null

  const g = user.gamification
  const style = getTypeStyle(user.type)
  const xpPct = Math.min(100, Math.round((g.xp / g.xpToNext) * 100))
  const userBadges = getBadges(g.badges)
  const userPosts = posts.filter((p) => p.authorId === user.id)

  return (
    <section className="mx-auto w-full max-w-2xl">
      {/* cabeçalho do perfil */}
      <Card className="overflow-hidden">
        <div className="h-24 bg-astralis-gradient opacity-80" aria-hidden="true" />
        <div className="px-6 pb-6">
          <div className="-mt-10 flex items-end gap-4">
            <Avatar initials={user.initials} type={user.type} size="lg" className="ring-4 ring-void" />
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-black text-white">{user.name}</h1>
                <UserTag type={user.type} />
              </div>
              <p className="font-mono text-xs text-white/50">{user.role} · {user.location}</p>
            </div>
            <Button variant="secondary" size="sm">Seguir missão</Button>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/80">{user.bio}</p>

          {/* nível + barra de XP */}
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <span className={`font-display text-sm font-bold ${style.text}`}>
                Nível {g.level} · {g.title}
              </span>
              <span className="font-mono text-xs text-white/50">
                {formatCount(g.xp)} / {formatCount(g.xpToNext)} XP
              </span>
            </div>
            <div
              className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-valuenow={xpPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progresso de XP: ${xpPct}%`}
            >
              <div className="h-full bg-astralis-gradient" style={{ width: `${xpPct}%` }} />
            </div>
          </div>

          {/* stats */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            <Stat label="Reputação" value={formatCount(g.reputation)} />
            <Stat label="Ranking" value={`#${g.rank}`} />
            <Stat label="Conquistas" value={userBadges.length} />
          </div>
        </div>
      </Card>

      {/* badges */}
      <div className="mt-6">
        <h2 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
          Conquistas
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {userBadges.map((b) => (
            <Badge key={b.id} badge={b} format="card" />
          ))}
        </div>
      </div>

      {/* posts do usuário */}
      <div className="mt-6">
        <h2 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
          Transmissões
        </h2>
        {userPosts.length > 0 ? (
          <div className="space-y-5">
            {userPosts.map((p) => (
              <PostCard key={p.id} post={p} onLike={toggleLike} />
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center text-sm text-white/50">
            Nenhuma transmissão ainda.
          </Card>
        )}
      </div>
    </section>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-nebula/40 p-3 text-center">
      <p className="font-display text-xl font-black text-white">{value}</p>
      <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">{label}</p>
    </div>
  )
}