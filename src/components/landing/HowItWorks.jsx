import Reveal from '../ui/Reveal'
import { UserPlus, Radio, Heart, Trophy } from 'lucide-react'

const steps = [
  {
    icon: UserPlus,
    title: 'Crie seu perfil',
    text: 'Cadastre-se como astronauta ou terráqueo — sua cor e jornada começam aqui.',
  },
  {
    icon: Radio,
    title: 'Transmita',
    text: 'Compartilhe registros com fotos, geolocalização e dados do seu ponto de vista.',
  },
  {
    icon: Heart,
    title: 'Conecte-se',
    text: 'Curta, comente e responda transmissões, criando a ponte entre espaço e Terra.',
  },
  {
    icon: Trophy,
    title: 'Evolua',
    text: 'Ganhe XP, suba de nível e desbloqueie conquistas a cada interação.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="px-[8%] py-16">
      <Reveal>
        <span className="font-mono text-[10px] uppercase tracking-widest text-cosmos">
          Em quatro passos
        </span>
        <h2 className="mt-2 font-display text-3xl font-black md:text-4xl">Como funciona</h2>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 120}>
            <div className="relative h-full rounded-2xl border border-white/10 bg-nebula p-6 backdrop-blur-md">
              <span className="absolute right-4 top-4 font-display text-3xl font-black text-white/10">
                {i + 1}
              </span>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-cosmos/15 text-cosmos">
                <s.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
