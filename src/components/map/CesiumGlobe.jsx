import { useEffect, useRef, useState } from 'react'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

// CesiumGlobe — globo 3D real com a ISS posicionada via wheretheiss.at.
// Encapsula todo o ciclo de vida do Cesium (criar viewer, atualizar, destruir).
//
// IMPORTANTE: cole o token do Cesium Ion abaixo (gratuito em cesium.com/ion).
// Sem token o globo carrega com imagery limitada; com token fica completo.
const CESIUM_ION_TOKEN = 'COLE_SEU_TOKEN_AQUI'

export default function CesiumGlobe({ onData }) {
  const containerRef = useRef(null)
  const viewerRef = useRef(null)
  const issRef = useRef(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    if (!containerRef.current) return

    if (CESIUM_ION_TOKEN && CESIUM_ION_TOKEN !== 'COLE_SEU_TOKEN_AQUI') {
      Cesium.Ion.defaultAccessToken = CESIUM_ION_TOKEN
    }

    // cria o viewer com a UI enxuta (sem widgets que poluem)
    const viewer = new Cesium.Viewer(containerRef.current, {
      animation: false,
      timeline: false,
      baseLayerPicker: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      infoBox: false,
      fullscreenButton: false,
      selectionIndicator: false,
    })
    viewer.scene.globe.enableLighting = true
    // cor de fundo combinando com o void
    viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#0D0720')
    viewerRef.current = viewer

    // marcador da ISS
    issRef.current = viewer.entities.add({
      name: 'ISS',
      position: Cesium.Cartesian3.fromDegrees(0, 0, 420000),
      point: {
        pixelSize: 14,
        color: Cesium.Color.fromCssColorString('#FF78CA'),
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
      },
      label: {
        text: 'ISS',
        font: '600 13px "Space Grotesk", sans-serif',
        fillColor: Cesium.Color.WHITE,
        pixelOffset: new Cesium.Cartesian2(0, -22),
      },
    })

    let alive = true
    let timer = null

    const updateISS = async () => {
      try {
        const res = await fetch('https://api.wheretheiss.at/v1/satellites/25544')
        if (!res.ok) throw new Error('ISS API')
        const d = await res.json()
        if (!alive) return

        issRef.current.position = Cesium.Cartesian3.fromDegrees(
          d.longitude,
          d.latitude,
          d.altitude * 1000
        )
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(d.longitude, d.latitude, 9_000_000),
          duration: 1.5,
        })
        setStatus('live')
        onData?.({
          latitude: d.latitude,
          longitude: d.longitude,
          altitude: Math.round(d.altitude),
          velocity: Math.round(d.velocity),
        })
      } catch {
        if (alive) setStatus((p) => (p === 'live' ? 'live' : 'error'))
      }
    }

    updateISS()
    timer = setInterval(updateISS, 5000)

    // cleanup — essencial no React pra não vazar o viewer
    return () => {
      alive = false
      if (timer) clearInterval(timer)
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy()
      }
    }
  }, [onData])

  return (
    <div className="relative h-[600px] w-full">
      <div ref={containerRef} className="h-full w-full" />
      {status === 'error' && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-void/80 px-3 py-1 font-mono text-[10px] text-reentry backdrop-blur">
          ISS offline — usando última posição conhecida
        </div>
      )}
    </div>
  )
}