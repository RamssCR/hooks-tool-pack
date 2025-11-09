import { useEffect, useLayoutEffect } from 'react'

/**
 * A hook that uses `useLayoutEffect` on the client and `useEffect` on the server.
 * This is useful for avoiding warnings when rendering on the server while still
 * ensuring that effects run synchronously on the client.
 * @see https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 * @example
 * import { useIsomorphicEffect } from 'src/hooks/useIsomorphicEffect'
 * function MyComponent() {
 *   useIsomorphicEffect(() => {
 *     // Your effect logic here
 *   }, [])
 *   return <div>My Component</div>
 * }
 */
export const useIsomorphicEffect =
  typeof window !== 'undefined' &&
  Boolean(window.document) &&
  Boolean(window.document.createElement)
    ? useLayoutEffect
    : useEffect
