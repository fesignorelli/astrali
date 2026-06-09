import Reveal from '../ui/Reveal'

const facts = [
  { stat: '+11.000', label: 'satélites ativos em órbita da Terra hoje' },
  { stat: 'US$ 1,8 tri', label: 'tamanho projetado da economia espacial até 2035' },
  { stat: '1969 → hoje', label: 'da corrida à Lua à nova corrida tecnológica' },
]

export default function SpaceEconomy() {
  return (
    <section id="contexto" className="px-[8%] py-16">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <Reveal>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-cosmos">
              A próxima fronteira
            </span>
            <h2 className="mt-2 font-display text-3xl font-black md:text-4xl">
              A economia espacial já começou
            </h2>
            <p className="mt-4 leading-relaxed text-white/70">
              Satélites monitoram o clima, orientam o agronegócio, evitam desastres e conectam
              regiões remotas. Há pessoas vivendo e trabalhando em órbita — e a necessidade de se
              conectar, compartilhar e registrar o que vivem nunca foi tão real.
            </p>
            <p className="mt-3 leading-relaxed text-white/70">
              O ASTRALIS nasce nesse ponto de virada: uma plataforma pensada para o espaço, que
              revela algo sobre como nos conectamos aqui na Terra.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 120}>
              <div className="rounded-2xl border border-white/10 bg-nebula p-5 backdrop-blur-md">
                <p className="bg-astralis-gradient bg-clip-text font-display text-3xl font-black text-transparent">
                  {f.stat}
                </p>
                <p className="mt-1 text-sm text-white/70">{f.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
