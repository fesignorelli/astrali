import { useState, useEffect } from 'react'

const ISS_URL = 'https://api.wheretheiss.at/v1/satellites/25544'

const FALLBACK = {
  latitude: -23.55,
  longitude: -46.63,
  altitude: 408,
  velocity: 27600,
  isFallback: true,
}

export function useISS(intervalMs = 5000) {
  const [data, setData] = useState(FALLBACK)
  const [status, setStatus] = useState('loading') 
  useEffect(() => {
    let alive = true

    const fetchPosition = async () => {
      try {
        const res = await fetch(ISS_URL)
        if (!res.ok) throw new Error('ISS API indisponível')
        const json = await res.json()
        if (!alive) return
        setData({
          latitude: json.latitude,
          longitude: json.longitude,
          altitude: Math.round(json.altitude),
          velocity: Math.round(json.velocity),
          isFallback: false,
        })
        setStatus('live')
      } catch {
        if (!alive) return
        setStatus((prev) => (prev === 'live' ? 'live' : 'error'))
      }
    }

    fetchPosition()
    const id = setInterval(fetchPosition, intervalMs)
    return () => {
      alive = false
      clearInterval(id)
    }
  }, [intervalMs])

  return { iss: data, status }
}

export function usePeopleInSpace() {
  const [people, setPeople] = useState({ number: null, names: [], isFallback: true })

  useEffect(() => {
    let alive = true
    fetch('https://corsproxy.io/?url=http://api.open-notify.org/astros.json')
      .then((r) => r.json())
      .then((json) => {
        if (!alive || !json?.number) return
        setPeople({
          number: json.number,
          names: (json.people || []).map((p) => p.name),
          isFallback: false,
        })
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  return people
}
