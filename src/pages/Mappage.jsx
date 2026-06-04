import Card from '../components/ui/Card'
import UserTag from '../components/ui/UserTag'
import { users } from '../data/users'
import { useISS } from '../hooks/useISS'

// MapPage — mapa orbital. A ISS usa posição REAL (wheretheiss.at);
// os demais usuários são mockados. SVG puro, sem libs de mapa.
export default function MapPage() {
  const { iss, status } = useISS(5000)
  const orbital = users.filter((u) => u.type === 'orbital')
  const terrestrial = users.filter((u) => u.type === 'terrestrial')

  // mapeia a longitude real da ISS (-180..180) para um ângulo na órbita
  const issAngle = ((iss.longitude + 180) / 360) * Math.PI * 2 - Math.PI / 2
  const issX = 200 + Math.cos(issAngle) * 140
  const issY = 160 + Math.sin(issAngle) * 90

  const groundPos = (i, total) => {
    const angle = (i / total) * Math.PI - Math.PI / 2
    return { x: 200 + Math.cos(angle) * 55, y: 160 + Math.sin(angle) * 55 }
  }
  const otherOrbitPos = (i, total) => {
    const angle = (i / total) * Math.PI * 2 + Math.PI / 3
    return { x: 200 + Math.cos(angle) * 140, y: 160 + Math.sin(angle) * 90 }
  }
  const otherOrbital = orbital.slice(1) // a 1ª (Ana) vira a ISS ao vivo

  return (
    <section className="mx-auto w-full max-w-3xl">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="bg-astralis-gradient bg-clip-text font-display text-4xl font-black text-transparent">
            Mapa Orbital
          </h1>
          <p className="mt-1 text-sm text-white/50">
            Geolocalização em tempo real — {users.length} exploradores conectados
          </p>
        </div>
        <StatusPill status={status} />
      </header>

      {/* dados reais da ISS */}
      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <DataCard label="Latitude" value={`${iss.latitude.toFixed(2)}°`} />
        <DataCard label="Longitude" value={`${iss.longitude.toFixed(2)}°`} />
        <DataCard label="Altitude" value={`${iss.altitude} km`} />
        <DataCard label="Velocidade" value={`${iss.velocity.toLocaleString('pt-BR')} km/h`} />
      </div>

      <Card className="p-4">
        <svg viewBox="0 0 400 320" className="w-full" role="img" aria-label="Mapa de usuários em órbita e no solo, com a ISS em tempo real">
          {[...Array(50)].map((_, i) => (
            <circle key={i} cx={(i * 71) % 400} cy={(i * 43) % 320} r={(i % 3) * 0.4 + 0.3}
              fill="white" opacity={0.2 + (i % 4) * 0.15} />
          ))}

          <ellipse cx="200" cy="160" rx="140" ry="90" fill="none" stroke="#B28FFF" strokeOpacity="0.3" strokeDasharray="4 4" />

          {/* Terra */}
          <circle cx="200" cy="160" r="55" fill="#1A0F3A" stroke="#6EDFA0" strokeOpacity="0.4" />
          <circle cx="185" cy="150" r="14" fill="#6EDFA0" opacity="0.5" />
          <circle cx="215" cy="172" r="10" fill="#6EDFA0" opacity="0.4" />
          <circle cx="200" cy="145" r="7" fill="#B28FFF" opacity="0.4" />

          {/* terrestres */}
          {terrestrial.map((u, i) => {
            const { x, y } = groundPos(i, terrestrial.length)
            return (
              <g key={u.id}>
                <circle cx={x} cy={y} r="9" fill="#6EDFA0" />
                <text x={x} y={y + 3} textAnchor="middle" fontSize="7" fill="#0D0720" fontWeight="bold">{u.initials}</text>
              </g>
            )
          })}

          {/* outros orbitais (mock) */}
          {otherOrbital.map((u, i) => {
            const { x, y } = otherOrbitPos(i, otherOrbital.length)
            return (
              <g key={u.id}>
                <circle cx={x} cy={y} r="11" fill="#B28FFF" />
                <text x={x} y={y + 3} textAnchor="middle" fontSize="8" fill="#0D0720" fontWeight="bold">{u.initials}</text>
              </g>
            )
          })}

          {/* ISS — posição REAL */}
          <g style={{ transition: 'all 1s linear' }}>
            <circle cx={issX} cy={issY} r="16" fill="#FF78CA" opacity="0.25" />
            <circle cx={issX} cy={issY} r="9" fill="#FF78CA" />
            <text x={issX} y={issY + 3} textAnchor="middle" fontSize="7" fill="#0D0720" fontWeight="bold">ISS</text>
          </g>
        </svg>
        <p className="mt-2 text-center font-mono text-[10px] text-white/40">
          Posição da ISS atualizada a cada 5s via wheretheiss.at
        </p>
      </Card>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {users.map((u) => (
          <Card key={u.id} className="flex items-center justify-between gap-2 p-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{u.name}</p>
              <p className="truncate font-mono text-[10px] text-white/50">{u.location}</p>
            </div>
            <UserTag type={u.type} />
          </Card>
        ))}
      </div>
    </section>
  )
}

function StatusPill({ status }) {
  const map = {
    live: { text: 'AO VIVO', cls: 'bg-terra/15 text-terra', dot: 'bg-terra' },
    loading: { text: 'Conectando', cls: 'bg-white/10 text-white/60', dot: 'bg-white/40' },
    error: { text: 'Offline', cls: 'bg-reentry/15 text-reentry', dot: 'bg-reentry' },
  }
  const s = map[status] ?? map.loading
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${s.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot} ${status === 'live' ? 'animate-pulse' : ''}`} />
      {s.text}
    </span>
  )
}

function DataCard({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-nebula/40 p-3">
      <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">{label}</p>
      <p className="mt-1 font-display text-lg font-black text-white">{value}</p>
    </div>
  )
}