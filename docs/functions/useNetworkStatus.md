[**hooks-tool-pack**](../README.md)

***

[hooks-tool-pack](../README.md) / useNetworkStatus

# Function: useNetworkStatus()

> **useNetworkStatus**(): `boolean`

Defined in: [src/hooks/useNetworkStatus.ts:24](https://github.com/RamssCR/hooks-tool-pack/blob/584beee882f8ad4c4e91becd60bfc68728c2a98f/src/hooks/useNetworkStatus.ts#L24)

A hook that returns the current network status (online/offline).
It uses the browser's `navigator.onLine` property and listens for
`online` and `offline` events to update the status in real-time.
It uses an isomorphic effect to ensure compatibility with server-side rendering.
This hook is useful for applications that need to respond to changes
in network connectivity, such as displaying offline messages or
disabling certain features when the user is offline.

## Returns

`boolean`

The current network status: `true` if online, `false` if offline.

## Example

```ts
const Component = () => {
  const isOnline = useNetworkStatus()
  return (
    <div>
      {isOnline ? 'You are online' : 'You are offline'}
    </div>
  )
}
```
