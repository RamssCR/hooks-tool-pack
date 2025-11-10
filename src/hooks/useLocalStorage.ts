import { useEffect, useState } from 'react'
import { createLocalStorage } from '@helpers/localStorage'

const storage = createLocalStorage<string>()

/**
 * The return type of the useLocalStorage hook.
 * It includes the current value, a function to set a new value,
 * a function to remove the item from storage, and a function to clear all storage.
 * @template T - The type of the value being stored.
 */
export type UseLocalStorageReturn<T> = {
  value: T
  setValue: (newValue: T) => void
  remove: () => void
  clearStorage: () => void
}

/**
 * A React hook to manage state synchronized with localStorage.
 * It consumes a wrapper around localStorage with typed keys and values.
 * This hook provides a way to read from and write to localStorage,
 * while keeping the React state in sync. It also listens for changes
 * to localStorage made in other tabs or windows.
 * @param key - The key in localStorage to bind the state to.
 * @param initialValue - The initial value to use if the key does not exist in localStorage.
 * @returns An object containing the current value, a function to update the value, and functions to remove the value or clear the storage.
 * @template T - The type of the value being stored.
 * @example
 * const { value, setValue, remove, clearStorage } = useLocalStorage<{ theme: string }>('settings', { theme: 'light' })
 * console.log(value) // { theme: 'light' }
 * setValue({ theme: 'dark' })
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): UseLocalStorageReturn<T> => {
  const [value, setValueState] = useState<T>(() => {
    const storedValue = storage.get<T>(key, initialValue)
    return storedValue ?? initialValue
  })

  /**
   * Sets a new value both in state and in localStorage.
   * @param newValue - The new value to set.
   * @returns void
   * @example
   * setValue({ theme: 'dark' })
   */
  const setValue = (newValue: T) =>
    setValueState(() => {
      storage.set(key, newValue)
      return newValue
    })

  /**
   * Removes the item from localStorage and resets state to initial value.
   * @returns void
   * @example
   * remove()
   */
  const remove = () => {
    storage.remove(key)
    setValueState(initialValue)
  }

  /**
   * Clears all items from localStorage and resets state to initial value.
   * @returns void
   * @example
   * clearStorage()
   */
  const clearStorage = () => {
    storage.clear()
    setValueState(initialValue)
  }

  useEffect(() => {
    /**
     * Handles storage events to keep state in sync across tabs/windows.
     * It validates if the changed key matches and updates state accordingly.
     * @param e - The storage event.
     * @returns void
     * @example
     * // This function is used internally by the hook.
     */
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== e.oldValue) {
        try {
          setValueState(e.newValue ? JSON.parse(e.newValue) : initialValue)
        } catch {
          setValueState(initialValue)
        }
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [key, initialValue])

  return { value, setValue, remove, clearStorage }
}
