[**hooks-tool-pack**](../README.md)

***

[hooks-tool-pack](../README.md) / useIsMounted

# Function: useIsMounted()

> **useIsMounted**(): `boolean`

Defined in: [src/hooks/useIsMounted.ts:12](https://github.com/RamssCR/hooks-tool-pack/blob/1c8903ce0542bd7238dec2ae07ec771396c8295d/src/hooks/useIsMounted.ts#L12)

Hook to determine if a component is currently mounted.

## Returns

`boolean`

A boolean indicating whether the component is mounted.

## Example

```ts
const isMounted = useIsMounted();
isMounted
  ? // Safe to perform operations that require the component to be mounted.
  : // Component is unmounted, avoid performing such operations.
```
