export interface PanelPosition {
  x: number
  y: number
}

export interface MapPreset {
  label: string
  query: string
  lat: number
  lng: number
}

export interface MapCenter {
  lat: number
  lng: number
}

export interface MapSearchResult {
  id: string
  label: string
  q: string
  zoom: number
}
