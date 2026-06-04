export default function Card({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag
      className={`rounded-2xl border border-white/10 bg-nebula/40 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}