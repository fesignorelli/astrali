import * as Icons from 'lucide-react'
import { tierStyles } from '../../lib/format'

export default function Badge({ badge, format = 'chip', className = '' }) {
  if (!badge) return null
  const Icon = Icons[badge.icon] ?? Icons.Award
  const tier = tierStyles[badge.tier] ?? tierStyles.common

  if (format === 'card') {
    return (
      <div
        className={`flex items-start gap-3 rounded-xl border bg-nebula/40 p-3 ${tier} ${className}`}
        title={badge.description}
      >
        <Icon className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-white">{badge.name}</p>
          <p className="text-xs text-white/60">{badge.description}</p>
        </div>
      </div>
    )
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs ${tier} ${className}`}
      title={badge.description}
    >
      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
      {badge.name}
    </span>
  )
}