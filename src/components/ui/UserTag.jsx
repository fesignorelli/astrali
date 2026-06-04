import { getTypeStyle } from '../../lib/format'

export default function UserTag({ type = 'orbital', label, className = '' }) {
  const style = getTypeStyle(type)
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${style.tagBg} ${style.tagText} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
      {label ?? style.label}
    </span>
  )
}