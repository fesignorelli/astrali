import { useEffect, useRef } from 'react'

export default function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width, height, stars, particles, raf

    const init = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      const area = width * height
      const starCount = Math.min(140, Math.floor(area / 11000))
      const partCount = Math.min(20, Math.floor(area / 80000))

      stars = Array.from({ length: starCount }, () => {
        const big = Math.random() < 0.25
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: big ? Math.random() * 2.2 + 1.6 : Math.random() * 1.1 + 0.4,
          glow: big,
          baseAlpha: Math.random() * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          phase: Math.random() * Math.PI * 2,
        }
      })

      const colors = ['178,143,255', '255,120,202', '110,223,160'] 
      particles = Array.from({ length: partCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 3 + 2, 
        vy: -(Math.random() * 0.2 + 0.04),
        vx: (Math.random() - 0.5) * 0.1,
        alpha: Math.random() * 0.4 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    }

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const s of stars) {
        const alpha = reduceMotion
          ? s.baseAlpha
          : s.baseAlpha + Math.sin(t * s.twinkleSpeed * 60 + s.phase) * 0.25
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, alpha)})`
        if (s.glow) {
          ctx.shadowBlur = 12
          ctx.shadowColor = `rgba(178,143,255,${Math.max(0, alpha)})`
        }
        ctx.fill()
        ctx.shadowBlur = 0
      }

      for (const p of particles) {
        if (!reduceMotion) {
          p.y += p.vy
          p.x += p.vx
          if (p.y < -10) {
            p.y = height + 10
            p.x = Math.random() * width
          }
          if (p.x < -10) p.x = width + 10
          if (p.x > width + 10) p.x = -10
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`
        ctx.shadowBlur = 14
        ctx.shadowColor = `rgba(${p.color},${p.alpha})`
        ctx.fill()
        ctx.shadowBlur = 0
      }

      t += 1
      raf = requestAnimationFrame(draw)
    }

    init()
    draw()
    if (reduceMotion) cancelAnimationFrame(raf)

    const onResize = () => init()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 0 }}
    />
  )
}
