const sizes = {
  sm: { img: 'h-7 w-7', text: 'text-xl' },
  md: { img: 'h-9 w-9', text: 'text-2xl' },
  lg: { img: 'h-12 w-12', text: 'text-4xl' },
}

export default function Logo({ size = 'md', showText = true, className = '' }) {
  const s = sizes[size] ?? sizes.md
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img src="/logo.png" alt="" className={`${s.img} object-contain`} aria-hidden="true" />
      {showText && (
        <span
          className={`bg-astralis-gradient bg-clip-text font-display font-black tracking-tight text-transparent ${s.text}`}
        >
          ASTRALIS
        </span>
      )}
    </span>
  )
}
