export const PANEL_WIDTH = 360
export const PANEL_MARGIN = 16
export const MAP_ZOOM = 15
export const MAP_LOCALE = 'es'

export function getTopRightPanelPosition(panelWidth = PANEL_WIDTH) {
  return {
    x: Math.max(PANEL_MARGIN, window.innerWidth - panelWidth - PANEL_MARGIN),
    y: PANEL_MARGIN,
  }
}
