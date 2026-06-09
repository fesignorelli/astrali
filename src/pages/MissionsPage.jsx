import { CheckCircle2 } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { odsColor } from '../lib/format'
import { missions } from '../data/missions'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'

export default function MissionsPage() {
  const { completeMission } = useApp()
  const { user } = useAuth()
  const completedIds = user?.gamification?.completedMissionIds ?? []

  return (
    <section className="mx-auto w-full">
      <header className="mb-6">
        <h1 className="bg-astralis-gradient bg-clip-text font-display text-4xl font-black text-transparent">
          Missões
        </h1>
        <p className="mt-1 text-sm text-white/50">
          {missions.length} missões ativas no ecossistema ASTRALIS
        </p>
      </header>

      <ol className="relative border-l border-white/10 pl-6">
        {missions.map((m) => {
          const pct = Math.min(100, Math.round((m.day / m.totalDays) * 100))
          const isDone = completedIds.includes(m.id)
          return (
            <li key={m.id} className="mb-8 last:mb-0">
              <span
                className={`absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-void ${
                  isDone ? 'bg-terra' : 'bg-cosmos'
                }`}
                aria-hidden="true"
              />
              <Card className={`p-5 ${isDone ? 'border border-terra/30' : ''}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="flex items-center gap-2 font-display text-lg font-bold text-white">
                      {m.name}
                      {isDone && (
                        <CheckCircle2 className="h-4 w-4 text-terra" aria-label="Concluída" />
                      )}
                    </p>
                    <p className="font-mono text-xs text-white/50">
                      {m.crew} astronautas · Dia {m.day} de {m.totalDays}
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    {m.ods.map((n) => (
                      <span
                        key={n}
                        className={`rounded-md border px-1.5 py-0.5 font-mono text-[10px] ${odsColor(n)}`}
                      >
                        ODS {n}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-white/80">{m.summary}</p>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                      Progresso
                    </span>
                    <span className="font-mono text-xs text-white/60">{pct}%</span>
                  </div>
                  <div
                    className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10"
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Progresso de ${m.name}: ${pct}%`}
                  >
                    <div className="h-full bg-astralis-gradient" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <div className="mt-4">
                  {isDone ? (
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-terra/30 bg-terra/10 px-4 py-2 text-sm font-semibold text-terra">
                      <CheckCircle2 className="h-4 w-4" />
                      Missão concluída
                    </span>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => completeMission(m.id)}
                    >
                      Concluir missão
                    </Button>
                  )}
                </div>
              </Card>
            </li>
          )
        })}
      </ol>
    </section>
  )
}