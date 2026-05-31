import { useState } from 'react'
import { MapEmbed } from '../components/map-embed'
import { SearchPanel } from '../components/search-panel'
import { MAP_PRESETS } from '../constants/presets'
import { useDraggablePanel } from '../hooks/use-draggable-panel'
import type { MapSearchResult } from '../types'
import {
  presetToSearchResult,
  resolveMapSearch,
  resolveMapSearchBatch,
} from '../utils/resolve-map-search'
import '../styles/map-lab.css'

const INITIAL_MARKER =
  presetToSearchResult(MAP_PRESETS[0].query) ?? resolveMapSearch(MAP_PRESETS[0].query)!

export function MapLabPage() {
  const [markers, setMarkers] = useState<MapSearchResult[]>([INITIAL_MARKER])
  const [input, setInput] = useState('')
  const [bulkInput, setBulkInput] = useState('')
  const [queue, setQueue] = useState<MapSearchResult[]>([])
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
    setMarkers([resolved])
    setQueue([])
    setBulkInput('')
  }

  function handleAddToQueue() {
    const trimmed = input.trim()
    if (!trimmed) return

    const resolved = resolveMapSearch(trimmed)
    if (!resolved) {
      setSearchError('No se pudo interpretar esa ubicación.')
      return
    }

    setSearchError(null)
    setQueue((current) => [...current, resolved])
    setInput('')
  }

  function handleMarkAll() {
    const fromBulk = resolveMapSearchBatch(bulkInput)
    const combined = [...queue, ...fromBulk]

    if (combined.length === 0) {
      setSearchError('Agrega ubicaciones a la lista o escribe una por línea en el área múltiple.')
      return
    }

    setSearchError(null)
    setMarkers(combined)
    setQueue([])
    setBulkInput('')
    setInput('')
  }

  function handleRemoveFromQueue(id: string) {
    setQueue((current) => current.filter((item) => item.id !== id))
  }

  function handleClearQueue() {
    setQueue([])
    setBulkInput('')
  }

  function handlePresetSelect(presetQuery: string) {
    const resolved = presetToSearchResult(presetQuery)
    if (!resolved) return

    setSearchError(null)
    setInput(resolved.label)
    setMarkers([resolved])
    setQueue([])
    setBulkInput('')
  }

  return (
    <div className="map-lab">
      <MapEmbed markers={markers} />

      <SearchPanel
        panelRef={panelRef}
        panelPos={panelPos}
        isDragging={isDragging}
        markers={markers}
        input={input}
        bulkInput={bulkInput}
        queue={queue}
        searchError={searchError}
        presets={MAP_PRESETS}
        onInputChange={(value) => {
          setInput(value)
          if (searchError) setSearchError(null)
        }}
        onBulkInputChange={(value) => {
          setBulkInput(value)
          if (searchError) setSearchError(null)
        }}
        onSearch={handleSearch}
        onAddToQueue={handleAddToQueue}
        onMarkAll={handleMarkAll}
        onRemoveFromQueue={handleRemoveFromQueue}
        onClearQueue={handleClearQueue}
        onPresetSelect={handlePresetSelect}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
      />
    </div>
  )
}
