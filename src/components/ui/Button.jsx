const variants = {
  primary:
    'bg-astralis-gradient text-white font-semibold hover:opacity-90 border border-transparent',
  secondary:
    'bg-transparent text-white border border-white/20 hover:border-white/40 hover:bg-white/5',
  ghost:
    'bg-transparent text-white/70 border border-transparent hover:text-white hover:bg-white/5',
}

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl transition
        focus:outline-none focus-visible:ring-2 focus-visible:ring-cosmos focus-visible:ring-offset-2 focus-visible:ring-offset-void
        ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}