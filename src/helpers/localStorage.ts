/**
 * Creates a wrapper around localStorage with typed keys.
 * It provides methods to get, set, remove, and clear items in localStorage.
 * This utility ensures type safety when interacting with localStorage,
 * allowing developers to define specific keys and their associated types.
 * This is just a wrapper around the native localStorage API,
 * when used, you must manipulate it inside an effect or a callback yourself.
 * @returns An object with methods to interact with localStorage.
 * @template K - The type of the keys used in localStorage.
 * @example
 * const localStorage = createLocalStorage<'user' | 'settings'>()
 * localStorage.set('user', { name: 'Alice' })
 * const user = localStorage.get<{ name: string }>('user')
 * console.log(user) // { name: 'Alice' }
 */
export const createLocalStorage = <K extends string>() => {
  /**
   * Retrieves an item from localStorage by key.
   * @param key - The key of the item to retrieve.
   * @param fallback - The value to return if the item does not exist.
   * @returns The parsed value from localStorage or the fallback value.
   * @template T - The expected type of the stored value.
   * @example
   * const settings = storage.get<{ theme: string }>('settings', { theme: 'light' })
   */
  const get = <T>(key: K, fallback?: T): T | null => {
    try {
      const storedValue = localStorage.getItem(key)
      if (!storedValue) return fallback ?? null
      return JSON.parse(storedValue) as T
    } catch {
      return fallback ?? null
    }
  }

  /**
   * Assign a value to a key in localStorage.
   * @param key - The key to set the value for.
   * @param value - The value to store, which will be stringified.
   * @returns void
   * @template T - The type of the value being stored.
   * @example
   * storage.set('settings', { theme: 'dark' })
   */
  const set = <T>(key: K, value: T): void =>
    localStorage.setItem(key, JSON.stringify(value))

  /**
   * Removes an item from localStorage by key.
   * @param key - The key of the item to remove.
   * @returns void
   * @example
   * storage.remove('user')
   */
  const remove = (key: K): void => localStorage.removeItem(key)

  /**
   * Clears all items from localStorage.
   * @returns void
   * @example
   * storage.clear()
   */
  const clear = (): void => localStorage.clear()

  return { get, set, remove, clear }
}
