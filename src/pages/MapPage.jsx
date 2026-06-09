import { useCallback, useState } from 'react'
import Card from '../components/ui/Card'
import UserTag from '../components/ui/UserTag'
import CesiumGlobe from '../components/map/CesiumGlobe'
import { users } from '../data/users'

export default function MapPage() {
  const [iss, setIss] = useState({
    latitude: 0,
    longitude: 0,
    altitude: 0,
    velocity: 0,
  })

  const [status, setStatus] = useState('loading')

  const handleData = useCallback((data) => {
    setIss(data)
    setStatus('live')
  }, [])

  return (
    <section className="mx-auto w-full max-w-5xl">
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

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <DataCard label="Latitude" value={`${iss.latitude.toFixed(2)}°`} />
        <DataCard label="Longitude" value={`${iss.longitude.toFixed(2)}°`} />
        <DataCard label="Altitude" value={`${iss.altitude} km`} />
        <DataCard label="Velocidade" value={`${iss.velocity.toLocaleString('pt-BR')} km/h`} />
      </div>

      <Card className="overflow-hidden p-0">
        <CesiumGlobe users={users} showMyLocation onData={handleData} />

        <p className="border-t border-white/10 bg-void/70 px-4 py-3 text-center font-mono text-[10px] text-white/40">
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
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${s.cls}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${s.dot} ${status === 'live' ? 'animate-pulse' : ''}`}
      />
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