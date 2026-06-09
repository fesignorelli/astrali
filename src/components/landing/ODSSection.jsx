import Reveal from '../ui/Reveal'
import { odsColor } from '../../lib/format'

// ODSSection — conexão do ASTRALIS com os Objetivos de Desenvolvimento Sustentável.
const odsList = [
  {
    number: 13,
    label: 'Ação Climática',
    text: 'Astronautas detectam queimadas, derretimento e eventos extremos do espaço; pessoas no solo confirmam em tempo real.',
  },
  {
    number: 9,
    label: 'Indústria e Inovação',
    text: 'Dados de satélite e sensoriamento remoto abrem caminho para novas tecnologias e infraestrutura.',
  },
  {
    number: 11,
    label: 'Cidades Sustentáveis',
    text: 'Monitoramento orbital de expansão urbana e qualidade ambiental apoia comunidades mais resilientes.',
  },
]

export default function ODSSection() {
  return (
    <section id="ods" className="px-[8%] py-16">
      <Reveal>
        <span className="font-mono text-[10px] uppercase tracking-widest text-cosmos">
          Compromisso global
        </span>
        <h2 className="mt-2 font-display text-3xl font-black md:text-4xl">
          Alinhado aos ODS da ONU
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-white/70">
          O ASTRALIS conecta a observação espacial a objetivos concretos de desenvolvimento
          sustentável — transformando dados orbitais em ação no planeta.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {odsList.map((o, i) => (
          <Reveal key={o.number} delay={i * 120}>
            <div className="h-full rounded-2xl border border-white/10 bg-nebula/30 p-6 backdrop-blur-md">
              <span
                className={`grid h-12 w-12 place-items-center rounded-xl border font-display text-xl font-black ${odsColor(o.number)}`}
              >
                {o.number}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-white">{o.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{o.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
