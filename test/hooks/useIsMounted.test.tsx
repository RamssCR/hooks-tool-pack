import { describe, expect, test } from 'vitest'
import { render, renderHook } from '@testing-library/react'
import { useIsMounted } from '@hooks/useIsMounted'

const MockComponent = () => {
  const isMounted = useIsMounted()
  return <div>{isMounted ? 'Mounted' : 'Not Mounted'}</div>
}

describe('useIsMounted Hook', () => {
  test('should return true when component is mounted', () => {
    const { result } = renderHook(() => useIsMounted())
    expect(result.current).toBe(true)
  })

  test('should update state correctly on mount and unmount', () => {
    const { getByText, queryByText, unmount } = render(<MockComponent />)

    expect(getByText('Mounted')).toBeTruthy()
    unmount()
    expect(queryByText('Mounted')).toBeFalsy()
  })
})
