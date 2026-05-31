import type { RefObject } from 'react'
import type { MapSearchResult, PanelPosition } from '../types'

interface SearchPanelProps {
  panelRef: RefObject<HTMLDivElement | null>
  panelPos: PanelPosition
  isDragging: boolean
  location: MapSearchResult
  input: string
  searchError: string | null
  onInputChange: (value: string) => void
  onSearch: () => void
  onDragStart: (e: React.PointerEvent<HTMLDivElement>) => void
  onDragMove: (e: React.PointerEvent<HTMLDivElement>) => void
  onDragEnd: (e: React.PointerEvent<HTMLDivElement>) => void
}

export function SearchPanel({
  panelRef,
  panelPos,
  isDragging,
  location,
  input,
  searchError,
  onInputChange,
  onSearch,
  onDragStart,
  onDragMove,
  onDragEnd,
}: SearchPanelProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSearch()
  }

  return (
    <div
      ref={panelRef}
      className={`search-panel${isDragging ? ' dragging' : ''}`}
      style={{ transform: `translate(${panelPos.x}px, ${panelPos.y}px)` }}
    >
      <div
        className="panel-handle"
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      >
        <span className="panel-title">Google Maps Lab</span>
        <span className="panel-grip" aria-hidden="true">
          ⠿
        </span>
      </div>

      <div className="panel-body">
        <form className="search-form" onSubmit={handleSubmit}>
          <label htmlFor="location">Buscar ubicación</label>
          <div className="search-row">
            <input
              id="location"
              type="text"
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Dirección, URL de Maps o lat,lng"
            />
            <button type="submit">Marcar</button>
          </div>
        </form>

        {searchError && <p className="search-error">{searchError}</p>}

        <p className="current-location">
          Marcado: <strong>{location.label}</strong>
        </p>
      </div>
    </div>
  )
}
