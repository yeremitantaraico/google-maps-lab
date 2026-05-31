import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { unregisterStaleServiceWorkers } from './features/map-lab/utils/unregister-stale-service-workers'
import './index.css'
import App from './App.tsx'

unregisterStaleServiceWorkers()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
