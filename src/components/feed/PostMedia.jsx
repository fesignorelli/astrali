export default function PostMedia({ media }) {
  if (!media) return null
  const isOrbital = media.kind === 'orbital'

  return (
    <figure className="relative overflow-hidden rounded-xl border border-white/10">
      <div
        className={`relative h-44 w-full ${
          isOrbital
            ? 'bg-gradient-to-b from-nebula to-void'
            : 'bg-gradient-to-b from-reentry/40 via-reentry/20 to-void'
        }`}
        role="img"
        aria-label={media.caption ?? (isOrbital ? 'Imagem orbital' : 'Imagem terrestre')}
      >
        {isOrbital ? <OrbitalScene /> : <TerrestrialScene />}

        {media.geo && (
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-void/70 px-3 py-1 font-mono text-[10px] text-white/70 backdrop-blur">
            {media.geo}
          </span>
        )}
      </div>
      {media.caption && <figcaption className="sr-only">{media.caption}</figcaption>}
    </figure>
  )
}

function OrbitalScene() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 176" aria-hidden="true">
      {[...Array(40)].map((_, i) => (
        <circle
          key={i}
          cx={(i * 53) % 400}
          cy={(i * 37) % 176}
          r={(i % 3) * 0.4 + 0.4}
          fill="white"
          opacity={0.3 + (i % 4) * 0.15}
        />
      ))}
      <ellipse cx="200" cy="88" rx="70" ry="26" fill="none" stroke="#B28FFF" strokeOpacity="0.35" />
      <circle cx="200" cy="88" r="26" fill="#1A0F3A" stroke="#B28FFF" strokeOpacity="0.5" />
      <circle cx="190" cy="82" r="7" fill="#6EDFA0" opacity="0.7" />
      <circle cx="206" cy="92" r="5" fill="#B28FFF" opacity="0.6" />
      <circle cx="270" cy="88" r="3.5" fill="#FF9F5A" />
    </svg>
  )
}

function TerrestrialScene() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 176" aria-hidden="true">
      <ellipse cx="120" cy="120" rx="90" ry="30" fill="#FF9F5A" opacity="0.35" />
      <ellipse cx="250" cy="100" rx="110" ry="34" fill="#FF9F5A" opacity="0.3" />
      <ellipse cx="320" cy="130" rx="80" ry="28" fill="#FF78CA" opacity="0.2" />
    </svg>
  )
}
