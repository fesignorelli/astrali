import { useState, useCallback } from 'react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import CesiumGlobe from '../components/map/CesiumGlobe'
import { Satellite, Globe2, Users } from 'lucide-react'

export default function LandingPage({ onEnter }) {
  const [iss, setIss] = useState(null)
  const handleData = useCallback((data) => setIss(data), [])

  return (
    <div className="min-h-screen bg-void text-white">
      <header className="flex items-center justify-between px-[8%] py-6">
        <span className="bg-astralis-gradient bg-clip-text font-display text-2xl font-black tracking-tight text-transparent">
          ASTRALIS
        </span>
        <nav className="hidden gap-7 text-sm text-white/70 md:flex">
          <a href="#features" className="hover:text-white">
            Diferenciais
          </a>
          <a href="#globe" className="hover:text-white">
            Mapa orbital
          </a>
          <button onClick={onEnter} className="hover:text-white">
            Entrar
          </button>
        </nav>
      </header>

      <section className="grid items-center gap-10 px-[8%] py-16 md:grid-cols-2">
        <div>
          <h1 className="font-display text-5xl font-black leading-tight md:text-6xl">
            Onde o espaço encontra a{' '}
            <span className="bg-astralis-gradient bg-clip-text text-transparent">Terra</span> — em
            tempo real.
          </h1>
          <p className="mt-6 max-w-xl leading-relaxed text-white/70">
            ASTRALIS conecta astronautas, cientistas e habitantes da Terra através de transmissões
            com fotos, geolocalização orbital e dados ambientais — uma ponte entre quem observa de
            cima e quem vive embaixo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" onClick={onEnter}>
              Explorar transmissões
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                document.getElementById('globe')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Ver mapa orbital
            </Button>
          </div>
        </div>

        <Card className="mx-auto w-full max-w-sm p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-display font-bold">Feed orbital</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-terra">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-terra" /> AO VIVO
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cosmos to-aurora" />
            <div>
              <p className="text-sm font-semibold">Ana Fischer</p>
              <p className="font-mono text-xs text-white/50">ISS · Módulo Columbus · agora</p>
            </div>
          </div>
          <div className="mt-3 h-36 overflow-hidden rounded-xl bg-gradient-to-b from-nebula to-void">
            <div className="flex h-full items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-terra/60 to-cosmos/40" />
            </div>
          </div>
          <p className="mt-3 text-sm text-white/80">
            Vista noturna do Brasil — dá pra ver SP iluminado do litoral ao planalto.
          </p>
        </Card>
      </section>

      <section id="features" className="px-[8%] py-16">
        <h2 className="mb-8 font-display text-3xl font-black">O que torna o ASTRALIS diferente?</h2>
        <div className="grid gap-5 md:grid-cols-3">
          <Feature
            icon={Satellite}
            title="Transmissões com contexto"
            text="Cada registro carrega geolocalização, dados climáticos e informações da missão — não só uma foto."
          />
          <Feature
            icon={Globe2}
            title="Mapa orbital em tempo real"
            text="Acompanhe a posição real da ISS e veja qual parte da Terra está sendo observada agora."
          />
          <Feature
            icon={Users}
            title="Ponte Terra–espaço"
            text="Pessoas no solo respondem com relatos locais, confirmando do chão o que se vê do alto."
          />
        </div>
      </section>

      <section id="globe" className="px-[8%] pb-24">
        <h2 className="mb-2 font-display text-3xl font-black">Mapa orbital ao vivo</h2>
        <p className="mb-6 text-sm text-white/50">
          Posição real da ISS, atualizada a cada 5 segundos.
        </p>

        <div className="relative overflow-hidden rounded-3xl border border-white/15">
          <CesiumGlobe onData={handleData} />

          <div className="absolute left-6 top-6 w-60 rounded-2xl border border-white/15 bg-void/70 p-4 backdrop-blur">
            <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-cosmos">
              ISS · ao vivo
            </h3>
            <DataRow label="Latitude" value={iss ? `${iss.latitude.toFixed(2)}°` : '—'} />
            <DataRow label="Longitude" value={iss ? `${iss.longitude.toFixed(2)}°` : '—'} />
            <DataRow label="Altitude" value={iss ? `${iss.altitude} km` : '—'} />
            <DataRow
              label="Velocidade"
              value={iss ? `${iss.velocity.toLocaleString('pt-BR')} km/h` : '—'}
            />
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button variant="primary" size="lg" onClick={onEnter}>
            Entrar no ASTRALIS
          </Button>
        </div>
      </section>
    </div>
  )
}

function Feature({ icon: Icon, title, text }) {
  return (
    <Card className="p-6">
      <Icon className="mb-3 h-6 w-6 text-cosmos" aria-hidden="true" />
      <h3 className="mb-2 font-display text-lg font-bold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-white/70">{text}</p>
    </Card>
  )
}

function DataRow({ label, value }) {
  return (
    <div className="mb-2.5 last:mb-0">
      <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">{label}</p>
      <p className="font-display font-bold text-white">{value}</p>
    </div>
  )
}
