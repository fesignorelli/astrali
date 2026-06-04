import { getTypeStyle } from '../../lib/format'

const sizes = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
}

export default function Avatar({ initials, type = 'orbital', size = 'md', className = '' }) {
  const style = getTypeStyle(type)
  return (
    <div
      className={`${sizes[size]} ${style.avatarBg} rounded-full flex items-center justify-center font-display font-black text-white shrink-0 ${className}`}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}