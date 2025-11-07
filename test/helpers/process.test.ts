import { describe, expect, test } from 'vitest'
import { isServer } from '@helpers/process'

describe('isServer', () => {
  test('returns true in a server environment', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    expect(isServer()).toBe(true)
    process.env.NODE_ENV = originalEnv
  })

  test('returns false in a client environment', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    expect(isServer()).toBe(false)
    process.env.NODE_ENV = originalEnv
  })
})
