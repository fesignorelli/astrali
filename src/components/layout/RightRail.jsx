import Card from '../ui/Card'
import MissionCard from '../mission/MissionCard'
import ODSBadge from '../mission/ODSBadge'
import { missions, ods } from '../../data/missions'
import { trends } from '../../data/posts'

// RightRail — coluna direita: ODS em destaque, missões ativas e tendências.
export default function RightRail() {
  return (
    <aside className="hidden w-80 shrink-0 flex-col gap-5 p-4 lg:flex" aria-label="Contexto">
      {/* ODS em destaque */}
      <Card className="p-4">
        <h2 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
          ODS em destaque
        </h2>
        <div className="flex flex-col gap-3">
          {ods.map((o) => (
            <ODSBadge key={o.number} number={o.number} label={o.label} />
          ))}
        </div>
      </Card>

      {/* missões ativas */}
      <div>
        <h2 className="mb-3 px-1 font-mono text-[10px] uppercase tracking-widest text-white/40">
          Missões ativas
        </h2>
        <div className="flex flex-col gap-3">
          {missions.slice(0, 2).map((m) => (
            <MissionCard key={m.id} mission={m} />
          ))}
        </div>
      </div>

      {/* tendências */}
      <Card className="p-4">
        <h2 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-white/40">
          Tendências
        </h2>
        <ul className="flex flex-col gap-2.5">
          {trends.map((t) => (
            <li key={t.tag} className="flex items-center justify-between text-sm">
              <span className="text-cosmos">{t.tag}</span>
              <span className="font-mono text-xs text-white/50">{t.count}</span>
            </li>
          ))}
        </ul>
      </Card>
    </aside>
  )
}
