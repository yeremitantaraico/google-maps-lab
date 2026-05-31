import type { MapCenter } from '../types'

export function parseCoordinates(input: string): MapCenter | null {
  const match = input.trim().match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/)
  if (!match) return null

  return {
    lat: Number(match[1]),
    lng: Number(match[2]),
  }
}
