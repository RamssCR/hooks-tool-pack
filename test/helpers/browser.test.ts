import { afterEach, describe, expect, test, vi } from 'vitest'
import { isBrowser } from '@helpers/browser'

describe('isBrowser', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test('should return true in a browser-like environment', () => {
    vi.stubGlobal('window', {})
    vi.stubGlobal('navigator', {})

    expect(isBrowser()).toBe(true)
  })

  test('should return false in a non-browser environment', () => {
    vi.stubGlobal('window', undefined)
    vi.stubGlobal('navigator', undefined)
    expect(isBrowser()).toBe(false)
  })
})
