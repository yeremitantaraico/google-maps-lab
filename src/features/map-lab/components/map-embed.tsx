import { buildEmbedUrl, getEmbedKey } from '../utils/build-embed-url'
import type { MapSearchResult } from '../types'

interface MapEmbedProps {
  location: MapSearchResult
}

export function MapEmbed({ location }: MapEmbedProps) {
  return (
    <iframe
      key={getEmbedKey(location)}
      className="map-embed"
      title={`Mapa: ${location.label}`}
      src={buildEmbedUrl(location)}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  )
}
