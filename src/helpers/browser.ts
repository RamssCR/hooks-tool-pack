/**
 * Check if the code is running in a browser environment.
 * @returns True if in a browser, false otherwise.
 * @example
 * if (isBrowser()) {
 *   console.log('Running in a browser')
 * } else {
 *   console.log('Running in Node.js or other non-browser environment')
 * }
 */
export const isBrowser = () =>
  typeof window !== 'undefined' && typeof navigator !== 'undefined'
