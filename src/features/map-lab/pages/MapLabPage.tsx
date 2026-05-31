import { useState } from 'react'
import { MapEmbed } from '../components/map-embed'
import { SearchPanel } from '../components/search-panel'
import { useDraggablePanel } from '../hooks/use-draggable-panel'
import type { MapSearchResult } from '../types'
import { DEFAULT_LOCATION, resolveMapSearch } from '../utils/resolve-map-search'
import '../styles/map-lab.css'

export function MapLabPage() {
  const [location, setLocation] = useState<MapSearchResult>(DEFAULT_LOCATION)
  const [input, setInput] = useState('')
  const [searchError, setSearchError] = useState<string | null>(null)

  const {
    panelRef,
    panelPos,
    isDragging,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  } = useDraggablePanel()

  function handleSearch() {
    const trimmed = input.trim()
    if (!trimmed) return

    const resolved = resolveMapSearch(trimmed)
    if (!resolved) {
      setSearchError('Introduce una ubicación, coordenadas o URL de Google Maps.')
      return
    }

    setSearchError(null)
    setLocation(resolved)
  }

  return (
    <div className="map-lab">
      <MapEmbed location={location} />

      <SearchPanel
        panelRef={panelRef}
        panelPos={panelPos}
        isDragging={isDragging}
        location={location}
        input={input}
        searchError={searchError}
        onInputChange={(value) => {
          setInput(value)
          if (searchError) setSearchError(null)
        }}
        onSearch={handleSearch}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      />
    </div>
  )
}
