import { MAP_LOCALE } from '../constants/presets'
import type { MapSearchResult } from '../types'

export function buildEmbedUrl(location: MapSearchResult): string {
  const params = new URLSearchParams({
    q: location.q,
    hl: MAP_LOCALE,
    z: String(location.zoom),
    output: 'embed',
  })

  return `https://maps.google.com/maps?${params.toString()}`
}

export function getEmbedKey(location: MapSearchResult): string {
  return `${location.q}|${location.zoom}`
}
