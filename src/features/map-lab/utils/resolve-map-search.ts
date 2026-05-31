import { MAP_ZOOM } from '../constants/presets'
import type { MapSearchResult } from '../types'
import { parseCoordinates } from './parse-coordinates'
import { parseGoogleMapsUrl } from './parse-google-maps-url'

function fromCoordinates(
  label: string,
  lat: number,
  lng: number,
  zoom = MAP_ZOOM,
): MapSearchResult {
  return {
    label,
    q: `${lat},${lng}`,
    zoom,
  }
}

export function resolveMapSearch(input: string): MapSearchResult | null {
  const trimmed = input.trim()
  if (!trimmed) return null

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
        label: parsedUrl.query,
        q: parsedUrl.query,
        zoom: parsedUrl.zoom ?? MAP_ZOOM,
      }
    }
  }

  return {
    label: trimmed,
    q: trimmed,
    zoom: MAP_ZOOM,
  }
}

export const DEFAULT_LOCATION = fromCoordinates(
  'Torre Eiffel, París',
  48.858844,
  2.294351,
)
