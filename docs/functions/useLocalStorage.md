[**hooks-tool-pack**](../README.md)

***

[hooks-tool-pack](../README.md) / useLocalStorage

# Function: useLocalStorage()

> **useLocalStorage**\<`T`\>(`key`, `initialValue`): [`UseLocalStorageReturn`](../type-aliases/UseLocalStorageReturn.md)\<`T`\>

Defined in: [src/hooks/useLocalStorage.ts:34](https://github.com/RamssCR/hooks-tool-pack/blob/584beee882f8ad4c4e91becd60bfc68728c2a98f/src/hooks/useLocalStorage.ts#L34)

A React hook to manage state synchronized with localStorage.
It consumes a wrapper around localStorage with typed keys and values.
This hook provides a way to read from and write to localStorage,
while keeping the React state in sync. It also listens for changes
to localStorage made in other tabs or windows.

## Type Parameters

### T

`T`

The type of the value being stored.

## Parameters

### key

`string`

The key in localStorage to bind the state to.

### initialValue

`T`

The initial value to use if the key does not exist in localStorage.

## Returns

[`UseLocalStorageReturn`](../type-aliases/UseLocalStorageReturn.md)\<`T`\>

An object containing the current value, a function to update the value, and functions to remove the value or clear the storage.

## Example

```ts
const { value, setValue, remove, clearStorage } = useLocalStorage<{ theme: string }>('settings', { theme: 'light' })
console.log(value) // { theme: 'light' }
setValue({ theme: 'dark' })
```
