import { buildEmbedUrl, getEmbedKey } from '../utils/build-embed-url'
import type { MapSearchResult } from '../types'

interface MapEmbedProps {
  markers: MapSearchResult[]
}

export function MapEmbed({ markers }: MapEmbedProps) {
  const label =
    markers.length === 1
      ? markers[0].label
      : `${markers.length} ubicaciones en el mapa`

  return (
    <iframe
      key={getEmbedKey(markers)}
      className="map-embed"
      title={`Mapa: ${label}`}
      src={buildEmbedUrl(markers)}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  )
}
