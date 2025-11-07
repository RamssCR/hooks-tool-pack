import { isBrowser } from '@helpers/browser'
import { useIsomorphicEffect } from './useIsomorphicEffect'
import { useState } from 'react'

/**
 * A hook that returns the current network status (online/offline).
 * It uses the browser's `navigator.onLine` property and listens for
 * `online` and `offline` events to update the status in real-time.
 * It uses an isomorphic effect to ensure compatibility with server-side rendering.
 * @description
 * This hook is useful for applications that need to respond to changes
 * in network connectivity, such as displaying offline messages or
 * disabling certain features when the user is offline.
 * @returns The current network status: `true` if online, `false` if offline.
 * @example
 * const Component = () => {
 *   const isOnline = useNetworkStatus()
 *   return (
 *     <div>
 *       {isOnline ? 'You are online' : 'You are offline'}
 *     </div>
 *   )
 * }
 */
export const useNetworkStatus = (): boolean => {
  const isValidBrowser = isBrowser()
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    isValidBrowser ? navigator.onLine : true,
  )

  /**
   * Handles the online event.
   * @returns void
   * @example
   * setOnline()
   */
  const setOnline = () => setIsOnline(true)

  /**
   * Handles the offline event.
   * @returns void
   * @example
   * setOffline()
   */
  const setOffline = () => setIsOnline(false)

  useIsomorphicEffect(() => {
    if (!isValidBrowser) return

    window.addEventListener('online', setOnline)
    window.addEventListener('offline', setOffline)

    return () => {
      window.removeEventListener('online', setOnline)
      window.removeEventListener('offline', setOffline)
    }
  }, [])

  return isOnline
}
