import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { getTopRightPanelPosition, PANEL_MARGIN } from '../constants/presets'
import type { PanelPosition } from '../types'

export function useDraggablePanel() {
  const [panelPos, setPanelPos] = useState<PanelPosition>(() => getTopRightPanelPosition())
  const [isDragging, setIsDragging] = useState(false)

  const panelRef = useRef<HTMLDivElement>(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)

  const clampPanel = useCallback((x: number, y: number): PanelPosition => {
    const panel = panelRef.current
    if (!panel) return { x, y }

    const maxX = window.innerWidth - panel.offsetWidth - PANEL_MARGIN
    const maxY = window.innerHeight - panel.offsetHeight - PANEL_MARGIN

    return {
      x: Math.min(Math.max(PANEL_MARGIN, x), Math.max(PANEL_MARGIN, maxX)),
      y: Math.min(Math.max(PANEL_MARGIN, y), Math.max(PANEL_MARGIN, maxY)),
    }
  }, [])

  useLayoutEffect(() => {
    function placeTopRight() {
      const panel = panelRef.current
      if (!panel) return

      setPanelPos(
        clampPanel(
          window.innerWidth - panel.offsetWidth - PANEL_MARGIN,
          PANEL_MARGIN,
        ),
      )
    }

    placeTopRight()
    window.addEventListener('resize', placeTopRight)
    return () => window.removeEventListener('resize', placeTopRight)
  }, [clampPanel])

  function handleDragStart(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return

    e.currentTarget.setPointerCapture(e.pointerId)
    isDraggingRef.current = true
    setIsDragging(true)
    dragOffset.current = {
      x: e.clientX - panelPos.x,
      y: e.clientY - panelPos.y,
    }
  }

  function handleDragMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return

    setPanelPos(
      clampPanel(
        e.clientX - dragOffset.current.x,
        e.clientY - dragOffset.current.y,
      ),
    )
  }

  function handleDragEnd(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDraggingRef.current) return

    e.currentTarget.releasePointerCapture(e.pointerId)
    isDraggingRef.current = false
    setIsDragging(false)
  }

  return {
    panelRef,
    panelPos,
    isDragging,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  }
}
