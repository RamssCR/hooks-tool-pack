/**
 * Checks if the current environment is a server (Node.js) environment.
 * @returns True if the environment is a server, false otherwise.
 * @example
 * const isServerEnv = isServer();
 * console.log(isServerEnv); // Outputs: true or false
 */
export const isServer = () =>
  typeof process !== 'undefined' && process.env.NODE_ENV !== 'production'
