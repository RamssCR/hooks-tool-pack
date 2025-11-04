import { useCallback, useState } from 'react'

/**
 * Custom hook to manage a boolean toggle state.
 * This hook provides methods to toggle, turn on, and turn off the state.
 * @param initial - The initial state of the toggle (default is false).
 * @returns An object containing the current state and methods to manipulate it.
 * @example
 * const { active, toggle, on, off } = useToggle(true);
 * console.log(active); // true
 * toggle();
 * console.log(active); // false
 */
export const useToggle = (initial = false) => {
  const [active, setActive] = useState(initial)

  /**
   * Toggles the current state.
   */
  const toggle = useCallback(() => setActive((prev) => !prev), [])

  /**
   * Sets the state to true.
   */
  const on = useCallback(() => setActive(true), [])

  /**
   * Sets the state to false.
   */
  const off = useCallback(() => setActive(false), [])

  return {
    active,
    toggle,
    on,
    off,
  }
}
