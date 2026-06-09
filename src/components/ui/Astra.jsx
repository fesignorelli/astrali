import { useState, useEffect } from 'react'
import { X, Sparkles } from 'lucide-react'
import { astraTour } from '../../data/astra'

const SEEN_KEY = 'astralis:astra_seen'

export default function Astra({ onNavigate }) {
  const [active, setActive] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    let seen = false
    try {
      seen = localStorage.getItem(SEEN_KEY) === '1'
    } catch {
      /* ignora */
    }
    if (!seen) setActive(true)
  }, [])

  useEffect(() => {
    if (active && astraTour[step]) onNavigate?.(astraTour[step].page)
  }, [active, step, onNavigate])

  const finish = () => {
    setActive(false)
    setStep(0)
    try {
      localStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* ignora */
    }
    onNavigate?.('Feed')
  }

  const next = () => {
    if (step < astraTour.length - 1) setStep((s) => s + 1)
    else finish()
  }
  const back = () => {
    if (step > 0) setStep((s) => s - 1)
  }
  const startTour = () => {
    setStep(0)
    setActive(true)
  }

  if (!active) {
    return (
      <button
        onClick={startTour}
        aria-label="Abrir tour com a ASTRA"
        className="group fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl rounded-br-sm border border-cosmos/30 px-4 py-3 shadow-xl transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-cosmos"
        style={{
          background: 'linear-gradient(160deg, rgba(42,24,90,0.92), rgba(13,7,32,0.92))',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 8px 28px rgba(0,0,0,0.45), 0 0 24px rgba(178,143,255,0.35)',
        }}
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full border border-cosmos/40 bg-nebula">
          <img src="/astra.png" alt="" className="h-full w-full object-cover object-top" />
        </span>

        <span className="text-left">
          <span className="block font-display text-sm font-bold text-white">Precisa de ajuda?</span>
          <span className="block font-mono text-[10px] text-cosmos">Falar com a ASTRA</span>
        </span>

        <span className="relative ml-1 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terra opacity-70" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-terra" />
        </span>
      </button>
    )
  }

  const current = astraTour[step]
  const isFirst = step === 0
  const isLast = step === astraTour.length - 1

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-40 bg-void/30" aria-hidden="true" />

      <div className="fixed bottom-0 right-0 z-50 flex items-end justify-end gap-0 p-4 sm:p-6">
        <div className="relative mb-6 mr-[-12px] w-[300px] max-w-[calc(100vw-11rem)] sm:w-[360px]">
          <div
            className="overflow-hidden rounded-3xl border border-cosmos/30"
            style={{
              background: 'linear-gradient(160deg, rgba(42,24,90,0.92), rgba(13,7,32,0.92))',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.55), 0 0 40px rgba(178,143,255,0.25)',
            }}
            role="dialog"
            aria-label="Tour guiado da ASTRA"
          >
            <div className="flex items-center gap-2 bg-astralis-gradient px-4 py-2.5">
              <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
              <span className="font-display text-sm font-black text-white">ASTRA</span>
              <span className="ml-auto font-mono text-[10px] text-white/80">
                {step + 1} / {astraTour.length}
              </span>
              <button
                onClick={finish}
                aria-label="Pular tour"
                className="ml-1 grid h-6 w-6 place-items-center rounded-md text-white/80 hover:bg-white/20"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="px-5 py-4">
              <p className="font-display text-lg font-bold text-cosmos">{current.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/85">{current.text}</p>

              <div className="mt-4 flex justify-center gap-2">
                {astraTour.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 rounded-full transition-all ${
                      i === step ? 'w-6 bg-astralis-gradient' : 'w-2 bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={back}
                  disabled={isFirst}
                  className="flex-1 rounded-xl border border-white/15 px-3 py-2 text-sm text-white/80 transition enabled:hover:border-white/30 disabled:opacity-30"
                >
                  Voltar
                </button>
                <button
                  onClick={next}
                  className="flex-1 rounded-xl bg-astralis-gradient px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  {isLast ? 'Concluir ✨' : 'Continuar →'}
                </button>
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-8 right-[-9px] h-4 w-4 rotate-45 border-b border-r border-cosmos/30"
            style={{ background: 'rgba(13,7,32,0.92)' }}
            aria-hidden="true"
          />
        </div>

        <img
          src="/astra.png"
          alt="ASTRA, sua guia no ASTRALIS"
          className="h-44 w-auto drop-shadow-2xl sm:h-60 md:h-72"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(178,143,255,0.45))',
            transform: 'scaleX(-1)',
          }}
        />
      </div>
    </>
  )
}
