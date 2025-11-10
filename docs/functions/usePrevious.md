[**hooks-tool-pack**](../README.md)

***

[hooks-tool-pack](../README.md) / usePrevious

# Function: usePrevious()

> **usePrevious**\<`T`\>(`value`): `T` \| `null`

Defined in: [src/hooks/usePrevious.ts:12](https://github.com/RamssCR/hooks-tool-pack/blob/1c8903ce0542bd7238dec2ae07ec771396c8295d/src/hooks/usePrevious.ts#L12)

Hook to store the previous value of a prop or state.

## Type Parameters

### T

`T`

## Parameters

### value

`T`

The current value to track.

## Returns

`T` \| `null`

The previous value or null if not available.

## Example

```ts
const [count, setCount] = useState(0);
const previousCount = usePrevious(count);
// previousCount will hold the value of count from the previous render.
```
