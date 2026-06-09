import { useState, useEffect } from 'react'
import Card from '../ui/Card'
import MissionCard from '../mission/MissionCard'
import ODSBadge from '../mission/ODSBadge'
import { missions, ods } from '../../data/missions'
import { trends } from '../../data/posts'
import { Radar, X } from 'lucide-react'

// Conteúdo do painel (reutilizado no desktop e no drawer mobile)
function PanelContent() {
  return (
    <>
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
    </>
  )
}

export default function RightRail() {
  const [open, setOpen] = useState(false)

  // a ASTRA pode pedir para abrir/fechar o painel durante o tour
  useEffect(() => {
    const openPanel = () => setOpen(true)
    const closePanel = () => setOpen(false)
    window.addEventListener('astra:openPanel', openPanel)
    window.addEventListener('astra:closePanel', closePanel)
    return () => {
      window.removeEventListener('astra:openPanel', openPanel)
      window.removeEventListener('astra:closePanel', closePanel)
    }
  }, [])

  return (
    <>
      {/* DESKTOP — coluna fixa (lg+) */}
      <aside className="hidden w-80 shrink-0 flex-col gap-5 p-4 lg:flex" aria-label="Painel orbital">
        <div className="flex items-center gap-2 px-1">
          <Radar className="h-5 w-5 text-cosmos" aria-hidden="true" />
          <h2 className="font-display text-lg font-black text-white">Painel orbital</h2>
        </div>
        <PanelContent />
      </aside>

      {/* MOBILE — botão flutuante para abrir o painel (some no lg+) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir painel orbital"
        className="fixed bottom-6 left-6 z-40 grid h-12 w-12 place-items-center rounded-full border border-cosmos/40 bg-nebula text-cosmos shadow-xl transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-cosmos lg:hidden"
        style={{ boxShadow: '0 0 20px rgba(178,143,255,0.4)' }}
      >
        <Radar className="h-5 w-5" />
      </button>

      {/* MOBILE — backdrop + drawer deslizante (some no lg+) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-80 max-w-[85vw] flex-col gap-5 overflow-y-auto border-l border-white/10 bg-void p-4 transition-transform duration-300 lg:hidden
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Painel orbital"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radar className="h-5 w-5 text-cosmos" aria-hidden="true" />
            <h2 className="font-display text-lg font-black text-white">Painel orbital</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Fechar painel"
            className="grid h-9 w-9 place-items-center rounded-lg text-white/70 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <PanelContent />
      </aside>
    </>
  )
}
