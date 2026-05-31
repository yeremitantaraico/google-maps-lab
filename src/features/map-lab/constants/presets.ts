import type { MapPreset, PanelPosition } from '../types'

export const MAP_PRESETS: readonly MapPreset[] = [
  { label: 'Torre Eiffel', query: 'Torre Eiffel, París', lat: 48.858844, lng: 2.294351 },
  { label: 'Plaza Mayor', query: 'Plaza Mayor, Madrid', lat: 40.415363, lng: -3.707398 },
  { label: 'Times Square', query: 'Times Square, New York', lat: 40.758, lng: -73.9855 },
  { label: 'CDMX', query: '19.4326,-99.1332', lat: 19.4326, lng: -99.1332 },
] as const

export const PANEL_WIDTH = 360
export const PANEL_MARGIN = 16
export const MAP_ZOOM = 15
export const MAP_LOCALE = 'es'

export function getTopRightPanelPosition(panelWidth = PANEL_WIDTH): PanelPosition {
  return {
    x: Math.max(PANEL_MARGIN, window.innerWidth - panelWidth - PANEL_MARGIN),
    y: PANEL_MARGIN,
  }
}
