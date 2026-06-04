import { odsColor } from '../../lib/format'

// ODSBadge — selo numerado de um Objetivo de Desenvolvimento Sustentável.
export default function ODSBadge({ number, label }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`grid h-8 w-8 place-items-center rounded-lg border font-display text-sm font-black ${odsColor(number)}`}
      >
        {number}
      </span>
      <span className="text-sm text-white/80">{label}</span>
    </div>
  )
}