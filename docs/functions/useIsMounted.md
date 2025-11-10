[**hooks-tool-pack**](../README.md)

***

[hooks-tool-pack](../README.md) / useIsMounted

# Function: useIsMounted()

> **useIsMounted**(): `boolean`

Defined in: [src/hooks/useIsMounted.ts:12](https://github.com/RamssCR/hooks-tool-pack/blob/584beee882f8ad4c4e91becd60bfc68728c2a98f/src/hooks/useIsMounted.ts#L12)

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
