import Card from '../components/ui/Card'
import Avatar from '../components/ui/Avatar'
import UserTag from '../components/ui/UserTag'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import PostCard from '../components/feed/PostCard'
import { getBadges, badges as allBadges } from '../data/badges'
import { useApp } from '../context/AppContext'
import { getTypeStyle, formatCount } from '../lib/format'
import { levelFromXP, titleForLevel } from '../lib/gamification'
import { Rocket, Flame, MapPin } from 'lucide-react'

export default function ProfilePage({ user }) {
  const { posts, toggleLike } = useApp()
  if (!user) return null

  const g = user.gamification
  const style = getTypeStyle(user.type)
  const lvl = levelFromXP(g.xp)
  const title = titleForLevel(lvl.level, user.type)
  const userBadges = getBadges(g.badges)
  const userPosts = posts.filter((p) => p.authorId === user.id)

  const expeditionDays = (() => {
    const created = parseInt(user.id.replace('u_', ''), 10)
    if (!created || Number.isNaN(created)) return 1
    const diff = Date.now() - created
    return Math.max(1, Math.floor(diff / 86_400_000) + 1)
  })()

  const lockedBadges = Object.values(allBadges).filter((b) => !g.badges.includes(b.id))

  return (
    <section className="mx-auto w-full">
      <Card className="overflow-hidden">
        <div className="flex items-center gap-2 bg-astralis-gradient px-6 py-3">
          <MapPin className="h-4 w-4 text-white" aria-hidden="true" />
          <span className="font-mono  text-white">{user.location}</span>
          <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] text-white/90">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            {user.type === 'orbital' ? 'EM ÓRBITA' : 'EM SOLO'}
          </span>
        </div>

        <div className="px-6 pb-6 pt-6">
          <div className="flex items-end gap-4">
            <Avatar
              initials={user.initials}
              type={user.type}
              size="lg"
              className="ring-4 ring-void"
            />
            <div className="flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-display font-black text-white">{user.name}</p>
                <UserTag type={user.type} />
              </div>
              <p className="font-mono  text-white/50">
                {user.role} · {user.location}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/80">{user.bio}</p>

          {user.type === 'orbital' && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-cosmos/30 bg-cosmos/10 px-4 py-2">
              <Rocket className="h-4 w-4 text-cosmos" aria-hidden="true" />
              <span className="text-sm text-white">
                <strong className="font-display">Dia {expeditionDays}</strong> de expedição
              </span>
            </div>
          )}

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <span className={`font-display text-sm font-bold ${style.text}`}>
                Nível {lvl.level} · {title}
              </span>
              <span className="font-mono  text-white/50">
                faltam {formatCount(lvl.xpToNext)} XP
              </span>
            </div>
            <div
              className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-valuenow={lvl.pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progresso de XP: ${lvl.pct}%`}
            >
              <div
                className="h-full bg-astralis-gradient transition-all duration-700"
                style={{ width: `${lvl.pct}%` }}
              />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-4 gap-3">
            <Stat label="XP" value={formatCount(g.xp)} />
            <Stat label="Reputação" value={formatCount(g.reputation)} />
            <Stat label="Streak" value={`${g.streak ?? 1}d`} icon={Flame} />
            <Stat label="Conquistas" value={userBadges.length} />
          </div>
        </div>
      </Card>

      <div className="mt-6">
        <h2 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
          Conquistas ({userBadges.length})
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {userBadges.map((b) => (
            <Badge key={b.id} badge={b} format="card" />
          ))}
        </div>
      </div>

      {lockedBadges.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
            A conquistar
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {lockedBadges.map((b) => (
              <div key={b.id} className="opacity-40 grayscale">
                <Badge badge={b} format="card" />
              </div>
            ))}
          </div>
        </div>
      )}

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
            Nenhuma transmissão ainda. Que tal a primeira?
          </Card>
        )}
      </div>
    </section>
  )
}

function Stat({ label, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-white/10 bg-nebula/40 p-3 text-center">
      <p className="flex items-center justify-center gap-1 font-display text-lg font-black text-white">
        {Icon && <Icon className="h-4 w-4 text-reentry" aria-hidden="true" />}
        {value}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">{label}</p>
    </div>
  )
}
