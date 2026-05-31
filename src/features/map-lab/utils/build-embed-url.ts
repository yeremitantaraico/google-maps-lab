import { MAP_LOCALE } from '../constants/presets'
import type { MapSearchResult } from '../types'

function buildSingleMarkerUrl(marker: MapSearchResult): string {
  const params = new URLSearchParams({
    q: marker.q,
    hl: MAP_LOCALE,
    z: String(marker.zoom),
    output: 'embed',
  })

  return `https://maps.google.com/maps?${params.toString()}`
}

function buildDirectionsUrl(markers: MapSearchResult[]): string {
  const origin = markers[0].q
  const destination = markers[markers.length - 1].q
  const waypoints = markers.slice(1, -1)

  const daddr =
    waypoints.length > 0
      ? `${waypoints.map((marker) => marker.q).join(' to ')} to ${destination}`
      : destination

  const params = new URLSearchParams({
    saddr: origin,
    daddr,
    hl: MAP_LOCALE,
    output: 'embed',
  })

  return `https://maps.google.com/maps?${params.toString()}`
}

export function buildEmbedUrl(markers: MapSearchResult[]): string {
  if (markers.length === 0) {
    throw new Error('Se requiere al menos un marcador.')
  }

  if (markers.length === 1) {
    return buildSingleMarkerUrl(markers[0])
  }

  return buildDirectionsUrl(markers)
}

export function getEmbedKey(markers: MapSearchResult[]): string {
  return markers.map((marker) => `${marker.q}|${marker.zoom}`).join(';;')
}
