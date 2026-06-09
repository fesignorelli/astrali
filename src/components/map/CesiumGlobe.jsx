import { useEffect, useRef, useState } from 'react'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

const CESIUM_ION_TOKEN = 'COLE_SEU_TOKEN_AQUI'

export default function CesiumGlobe({ onData, users = [], showMyLocation = false }) {
  const containerRef = useRef(null)
  const viewerRef = useRef(null)
  const issRef = useRef(null)
  const userEntitiesRef = useRef([])
  const myLocationRef = useRef(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    if (!containerRef.current) return

    if (CESIUM_ION_TOKEN && CESIUM_ION_TOKEN !== 'COLE_SEU_TOKEN_AQUI') {
      Cesium.Ion.defaultAccessToken = CESIUM_ION_TOKEN
    }

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
    viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#0D0720')
    viewerRef.current = viewer

    issRef.current = viewer.entities.add({
      name: 'ISS',
      position: Cesium.Cartesian3.fromDegrees(0, 0, 420000),
      point: {
        pixelSize: 15,
        color: Cesium.Color.fromCssColorString('#FF78CA'),
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
      },
      label: {
        text: 'ISS',
        font: '600 13px "Space Grotesk", sans-serif',
        fillColor: Cesium.Color.WHITE,
        pixelOffset: new Cesium.Cartesian2(0, -24),
      },
    })

    userEntitiesRef.current = users
      .filter((user) => typeof user.latitude === 'number' && typeof user.longitude === 'number')
      .map((user) => {
        const isOrbital = user.type === 'orbital'

        return viewer.entities.add({
          name: user.name,
          position: Cesium.Cartesian3.fromDegrees(
            user.longitude,
            user.latitude,
            isOrbital ? 420000 : 0
          ),
          point: {
            pixelSize: isOrbital ? 13 : 11,
            color: Cesium.Color.fromCssColorString(isOrbital ? '#B28FFF' : '#6EDFA0'),
            outlineColor: Cesium.Color.fromCssColorString('#0D0720'),
            outlineWidth: 2,
          },
          label: {
            text: user.initials || user.name,
            font: '600 12px "Space Grotesk", sans-serif',
            fillColor: Cesium.Color.WHITE,
            pixelOffset: new Cesium.Cartesian2(0, -22),
          },
          description: `
            <strong>${user.name}</strong><br />
            ${user.location || 'Localização simulada'}
          `,
        })
      })

    if (showMyLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords

          myLocationRef.current = viewer.entities.add({
            name: 'Você',
            position: Cesium.Cartesian3.fromDegrees(longitude, latitude, 0),
            point: {
              pixelSize: 14,
              color: Cesium.Color.fromCssColorString('#FFFFFF'),
              outlineColor: Cesium.Color.fromCssColorString('#6EDFA0'),
              outlineWidth: 3,
            },
            label: {
              text: 'Você',
              font: '700 12px "Space Grotesk", sans-serif',
              fillColor: Cesium.Color.WHITE,
              pixelOffset: new Cesium.Cartesian2(0, -24),
            },
          })
        },
        () => {
          console.warn('Localização do usuário não permitida.')
        },
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 60000,
        }
      )
    }

    let alive = true
    let timer = null
    let firstCameraMove = true

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

        if (firstCameraMove) {
          viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(d.longitude, d.latitude, 9000000),
            duration: 1.5,
          })

          firstCameraMove = false
        }

        setStatus('live')

        onData?.({
          latitude: d.latitude,
          longitude: d.longitude,
          altitude: Math.round(d.altitude),
          velocity: Math.round(d.velocity),
        })
      } catch {
        if (alive) setStatus((previous) => (previous === 'live' ? 'live' : 'error'))
      }
    }

    updateISS()
    timer = setInterval(updateISS, 5000)

    return () => {
      alive = false

      if (timer) clearInterval(timer)

      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy()
      }
    }
  }, [onData, users, showMyLocation])

  return (
    <div className="relative h-[600px] w-full">
      <div ref={containerRef} className="h-full w-full" />

      {status === 'loading' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-void/80 backdrop-blur-sm">
          <div className="relative mb-4 h-16 w-16">
            <div className="absolute inset-0 rounded-full border-2 border-cosmos/20" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-cosmos border-r-aurora" />
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora shadow-[0_0_20px_rgba(255,120,202,0.8)]" />
          </div>

          <p className="font-display text-sm font-bold text-white">Conectando ao Mapa Orbital</p>

          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/40">
            Buscando posição da ISS em tempo real
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-void/80 px-3 py-1 font-mono text-[10px] text-reentry backdrop-blur">
          ISS offline — usando última posição conhecida
        </div>
      )}
    </div>
  )
}
