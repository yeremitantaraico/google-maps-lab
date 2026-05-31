import { MAP_ZOOM } from '../constants/presets'
import { parseCoordinates } from './parse-coordinates'

export interface ParsedMapsUrl {
  lat?: number
  lng?: number
  zoom?: number
  query?: string
}

export function parseGoogleMapsUrl(input: string): ParsedMapsUrl | null {
  const trimmed = input.trim()

  try {
    const url = new URL(trimmed)
    const isGoogleMaps =
      url.hostname.includes('google.') &&
      (url.pathname.includes('/maps') || url.pathname === '/')

    if (!isGoogleMaps) return null

    const atMatch = trimmed.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?),(\d+(?:\.\d+)?)z/i)
    if (atMatch) {
      return {
        lat: Number(atMatch[1]),
        lng: Number(atMatch[2]),
        zoom: Math.round(Number(atMatch[3])),
      }
    }

    const qParam = url.searchParams.get('q')
    if (qParam) {
      const coords = parseCoordinates(qParam)
      if (coords) {
        const zoomParam = url.searchParams.get('z')
        return {
          lat: coords.lat,
          lng: coords.lng,
          zoom: zoomParam ? Math.round(Number(zoomParam)) : MAP_ZOOM,
        }
      }

      return {
        query: decodeURIComponent(qParam.replace(/\+/g, ' ')),
        zoom: MAP_ZOOM,
      }
    }

    const llParam = url.searchParams.get('ll')
    if (llParam) {
      const coords = parseCoordinates(llParam)
      if (coords) {
        const zoomParam = url.searchParams.get('z')
        return {
          lat: coords.lat,
          lng: coords.lng,
          zoom: zoomParam ? Math.round(Number(zoomParam)) : MAP_ZOOM,
        }
      }
    }

    return null
  } catch {
    return null
  }
}
