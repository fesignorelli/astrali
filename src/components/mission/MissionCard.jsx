import Card from '../ui/Card'

// MissionCard — missão ativa com barra de progresso (dia / total).
export default function MissionCard({ mission }) {
  const pct = Math.min(100, Math.round((mission.day / mission.totalDays) * 100))
  return (
    <Card className="p-4">
      <p className="font-display font-bold text-white">{mission.name}</p>
      <p className="mt-0.5 font-mono text-xs text-white/50">
        {mission.crew} astronautas · Dia {mission.day}
      </p>
      <div
        className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progresso da missão ${mission.name}: ${pct}%`}
      >
        <div className="h-full bg-astralis-gradient" style={{ width: `${pct}%` }} />
      </div>
    </Card>
  )
}