import { Code2, Video, Rocket } from 'lucide-react'

export default function Footer({ onEnter }) {
  return (
    <footer className="border-t border-white/10 px-[8%] py-12">
      <div className="grid gap-10 md:grid-cols-4">
        {/* marca */}
        <div className="md:col-span-2">
          <img src="/astralis-logo.png" alt="ASTRALIS" className="h-12 w-auto" />

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Onde o espaço encontra a Terra — em tempo real. Uma rede social que conecta quem observa
            de cima com quem vive embaixo.
          </p>

          <div className="mt-5 flex gap-3">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Repositório no GitHub"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white/70 transition hover:border-cosmos/50 hover:text-cosmos"
            >
              <Code2 className="h-5 w-5" />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vídeo-pitch"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white/70 transition hover:border-cosmos/50 hover:text-cosmos"
            >
              <Video className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* navegação */}
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/40">
            Navegação
          </h3>

          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
            <li>
              <a href="#features" className="hover:text-white">
                Diferenciais
              </a>
            </li>
            <li>
              <a href="#how" className="hover:text-white">
                Como funciona
              </a>
            </li>
            <li>
              <a href="#ods" className="hover:text-white">
                ODS da ONU
              </a>
            </li>
            <li>
              <a href="#globe" className="hover:text-white">
                Mapa orbital
              </a>
            </li>
          </ul>
        </div>

        {/* projeto */}
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-white/40">Projeto</h3>

          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-white/70">
            <li>
              <a href="#" className="hover:text-white">
                Repositório GitHub
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Vídeo-pitch
              </a>
            </li>
            <li>
              <button type="button" onClick={onEnter} className="hover:text-white">
                Entrar no app
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* créditos */}
      <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
        <p className="flex items-center gap-2 font-mono text-xs text-white/40">
          <Rocket className="h-3.5 w-3.5 text-cosmos" />
          ASTRALIS · Global Solution — FIAP
        </p>

        <p className="font-mono text-xs text-white/40">
          Dados de satélite via wheretheiss.at · Projeto acadêmico
        </p>
      </div>
    </footer>
  )
}
