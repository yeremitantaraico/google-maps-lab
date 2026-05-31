import type { RefObject } from 'react'
import type { MapPreset, MapSearchResult, PanelPosition } from '../types'

interface SearchPanelProps {
  panelRef: RefObject<HTMLDivElement | null>
  panelPos: PanelPosition
  isDragging: boolean
  markers: MapSearchResult[]
  input: string
  bulkInput: string
  queue: MapSearchResult[]
  searchError: string | null
  presets: readonly MapPreset[]
  onInputChange: (value: string) => void
  onBulkInputChange: (value: string) => void
  onSearch: () => void
  onAddToQueue: () => void
  onMarkAll: () => void
  onRemoveFromQueue: (id: string) => void
  onClearQueue: () => void
  onPresetSelect: (presetQuery: string) => void
  onDragStart: (e: React.PointerEvent<HTMLDivElement>) => void
  onDragMove: (e: React.PointerEvent<HTMLDivElement>) => void
  onDragEnd: (e: React.PointerEvent<HTMLDivElement>) => void
}

export function SearchPanel({
  panelRef,
  panelPos,
  isDragging,
  markers,
  input,
  bulkInput,
  queue,
  searchError,
  presets,
  onInputChange,
  onBulkInputChange,
  onSearch,
  onAddToQueue,
  onMarkAll,
  onRemoveFromQueue,
  onClearQueue,
  onPresetSelect,
  onDragStart,
  onDragMove,
  onDragEnd,
}: SearchPanelProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSearch()
  }

  const pendingCount = queue.length + (bulkInput.trim() ? bulkInput.split(/\r?\n|;/).filter(Boolean).length : 0)

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
          <div className="search-actions">
            <button type="button" className="secondary" onClick={onAddToQueue}>
              Agregar a la lista
            </button>
          </div>
        </form>

        <div className="bulk-form">
          <label htmlFor="bulk-locations">Varias ubicaciones (una por línea)</label>
          <textarea
            id="bulk-locations"
            value={bulkInput}
            onChange={(e) => onBulkInputChange(e.target.value)}
            placeholder={'Torre Eiffel, París\nPlaza Mayor, Madrid\n-11.8724547,-77.020378'}
            rows={4}
          />
          <div className="search-actions">
            <button type="button" onClick={onMarkAll}>
              Marcar todos{pendingCount > 0 ? ` (${pendingCount})` : ''}
            </button>
            {(queue.length > 0 || bulkInput.trim()) && (
              <button type="button" className="secondary" onClick={onClearQueue}>
                Limpiar lista
              </button>
            )}
          </div>
        </div>

        {searchError && <p className="search-error">{searchError}</p>}

        {queue.length > 0 && (
          <ul className="marker-queue">
            {queue.map((item, index) => (
              <li key={item.id}>
                <span>
                  {index + 1}. {item.label}
                </span>
                <button
                  type="button"
                  className="remove-marker"
                  aria-label={`Quitar ${item.label}`}
                  onClick={() => onRemoveFromQueue(item.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="presets">
          {presets.map(({ label, query: presetQuery }) => (
            <button
              key={label}
              type="button"
              className={
                markers.length === 1 && markers[0].label === presetQuery ? 'active' : undefined
              }
              onClick={() => onPresetSelect(presetQuery)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="current-location">
          {markers.length === 1 ? (
            <p>
              Marcado: <strong>{markers[0].label}</strong>
            </p>
          ) : (
            <>
              <p>
                Marcados: <strong>{markers.length} puntos</strong>
              </p>
              <ol className="marker-list">
                {markers.map((item) => (
                  <li key={item.id}>{item.label}</li>
                ))}
              </ol>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
