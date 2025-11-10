[**hooks-tool-pack**](../README.md)

***

[hooks-tool-pack](../README.md) / useDebounce

# Function: useDebounce()

> **useDebounce**\<`T`\>(`callback`, `delay`): (...`args`) => `void` & `object`

Defined in: [src/hooks/useDebounce.ts:19](https://github.com/RamssCR/hooks-tool-pack/blob/1c8903ce0542bd7238dec2ae07ec771396c8295d/src/hooks/useDebounce.ts#L19)

Custom hook to debounce a function call.
This hook returns a debounced version of the provided function,
which delays its execution until after a specified delay period
has passed since the last time it was invoked.

## Type Parameters

### T

`T` *extends* `unknown`[]

## Parameters

### callback

(...`args`) => `void`

The function to be debounced.

### delay

`number`

The delay in milliseconds.

## Returns

A debounced version of the provided function.

## Example

```ts
const debouncedFunction = useDebounce((value) => {
  console.log(value);
}, 300);
debouncedFunction('Hello'); // Will log 'Hello' after 300ms if not called again within that time.
debouncedFunction.cancel(); // Cancels the pending execution.
debouncedFunction.flush(); // Immediately invokes the function if there's a pending execution.
```
