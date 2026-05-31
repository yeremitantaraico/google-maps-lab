// Limpia service workers huérfanos en localhost que pueden generar avisos en consola.
export function unregisterStaleServiceWorkers(): void {
  if (!('serviceWorker' in navigator)) return

  void navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const registration of registrations) {
      void registration.unregister()
    }
  })
}
