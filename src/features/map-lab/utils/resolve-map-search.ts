import { MAP_PRESETS, MAP_ZOOM } from '../constants/presets'
import type { MapSearchResult } from '../types'
import { parseCoordinates } from './parse-coordinates'
import { parseGoogleMapsUrl } from './parse-google-maps-url'

function createId(): string {
  return crypto.randomUUID()
}

function fromCoordinates(
  label: string,
  lat: number,
  lng: number,
  zoom = MAP_ZOOM,
): MapSearchResult {
  return {
    id: createId(),
    label,
    q: `${lat},${lng}`,
    zoom,
  }
}

export function resolveMapSearch(input: string): MapSearchResult | null {
  const trimmed = input.trim()
  if (!trimmed) return null

  const preset = MAP_PRESETS.find((item) => item.query === trimmed)
  if (preset) {
    return fromCoordinates(preset.query, preset.lat, preset.lng)
  }

  const coords = parseCoordinates(trimmed)
  if (coords) {
    return fromCoordinates(trimmed, coords.lat, coords.lng)
  }

  const parsedUrl = parseGoogleMapsUrl(trimmed)
  if (parsedUrl) {
    if (parsedUrl.lat !== undefined && parsedUrl.lng !== undefined) {
      return fromCoordinates(trimmed, parsedUrl.lat, parsedUrl.lng, parsedUrl.zoom ?? MAP_ZOOM)
    }

    if (parsedUrl.query) {
      return {
        id: createId(),
        label: parsedUrl.query,
        q: parsedUrl.query,
        zoom: parsedUrl.zoom ?? MAP_ZOOM,
      }
    }
  }

  return {
    id: createId(),
    label: trimmed,
    q: trimmed,
    zoom: MAP_ZOOM,
  }
}

export function resolveMapSearchBatch(input: string): MapSearchResult[] {
  const lines = input
    .split(/\r?\n|;/)
    .map((line) => line.trim())
    .filter(Boolean)

  const results: MapSearchResult[] = []

  for (const line of lines) {
    const resolved = resolveMapSearch(line)
    if (resolved) results.push(resolved)
  }

  return results
}

export function presetToSearchResult(query: string): MapSearchResult | null {
  const preset = MAP_PRESETS.find((item) => item.query === query)
  if (!preset) return null

  return fromCoordinates(preset.query, preset.lat, preset.lng)
}
