import Card from '../components/ui/Card'
import { useApp } from '../context/AppContext'
import * as Icons from 'lucide-react'

export default function AlertsPage() {
  const { alerts } = useApp()

  const iconFor = (type) => {
    if (type === 'badge') return { Icon: Icons.Award, cls: 'text-reentry' }
    if (type === 'level') return { Icon: Icons.TrendingUp, cls: 'text-aurora' }
    return { Icon: Icons.Zap, cls: 'text-cosmos' }
  }

  const fmtTime = (ts) => {
    const diff = Math.floor((Date.now() - ts) / 1000)
    if (diff < 60) return 'agora'
    if (diff < 3600) return `${Math.floor(diff / 60)}min atrás`
    return `${Math.floor(diff / 3600)}h atrás`
  }

  return (
    <section className="mx-auto w-full">
      <header className="mb-6">
        <h1 className="bg-astralis-gradient bg-clip-text font-display text-4xl font-black text-transparent">
          Alertas
        </h1>
        <p className="mt-1 text-sm text-white/50">Suas conquistas e progresso no ASTRALIS</p>
      </header>

      {alerts.length > 0 ? (
        <ul className="space-y-3">
          {alerts.map((a) => {
            const { Icon, cls } = iconFor(a.type)
            return (
              <li key={a.id}>
                <Card className="flex items-center gap-4 p-4">
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-nebula/40 ${cls}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white">{a.title}</p>
                    {a.subtitle && <p className="text-xs text-white/60">{a.subtitle}</p>}
                  </div>
                  <span className="shrink-0 font-mono text-[10px] text-white/40">
                    {fmtTime(a.time)}
                  </span>
                </Card>
              </li>
            )
          })}
        </ul>
      ) : (
        <Card className="p-8 text-center text-sm text-white/50">
          Nenhum alerta ainda. Comece a transmitir e curtir para ganhar XP e conquistas!
        </Card>
      )}
    </section>
  )
}
