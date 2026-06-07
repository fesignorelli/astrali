import { useEffect, useState } from 'react'
import * as Icons from 'lucide-react'

export default function GameToast({ toasts, onDismiss }) {
  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

const THEME = {
  xp: {
    icon: 'Zap',
    glow: 'rgba(178,143,255,0.45)',
    ring: 'rgba(178,143,255,0.5)',
    text: 'text-cosmos',
  },
  level: {
    icon: 'TrendingUp',
    glow: 'rgba(255,120,202,0.5)',
    ring: 'rgba(255,120,202,0.55)',
    text: 'text-aurora',
  },
  badge: {
    icon: 'Award',
    glow: 'rgba(255,159,90,0.5)',
    ring: 'rgba(255,159,90,0.55)',
    text: 'text-reentry',
  },
}

function ToastItem({ toast, onDismiss }) {
  const [phase, setPhase] = useState('enter')

  useEffect(() => {
    const t0 = requestAnimationFrame(() => setPhase('shown'))
    const t1 = setTimeout(() => setPhase('leave'), 3400)
    const t2 = setTimeout(() => onDismiss(toast.id), 3800)
    return () => {
      cancelAnimationFrame(t0)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [toast.id, onDismiss])

  const theme = THEME[toast.type] ?? THEME.xp
  const Icon = Icons[theme.icon] ?? Icons.Star

  return (
    <div
      role="status"
      className="pointer-events-auto flex items-center gap-3 rounded-2xl px-4 py-3"
      style={{
        background: 'rgba(26, 15, 58, 0.55)',
        backdropFilter: 'blur(18px) saturate(160%)',
        WebkitBackdropFilter: 'blur(18px) saturate(160%)',
        border: `1px solid ${theme.ring}`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.45), 0 0 24px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,0.12)`,
        transform:
          phase === 'enter'
            ? 'translateX(120%) scale(0.95)'
            : phase === 'leave'
              ? 'translateX(120%) scale(0.95)'
              : 'translateX(0) scale(1)',
        opacity: phase === 'shown' ? 1 : 0,
        transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease',
      }}
    >
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${theme.text}`}
        style={{
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow: `0 0 16px ${theme.glow}`,
        }}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="pr-1">
        <p className="text-sm font-bold text-white">{toast.title}</p>
        {toast.subtitle && <p className="text-xs text-white/70">{toast.subtitle}</p>}
      </div>
    </div>
  )
}
