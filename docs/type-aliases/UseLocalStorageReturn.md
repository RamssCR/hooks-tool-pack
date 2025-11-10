[**hooks-tool-pack**](../README.md)

***

[hooks-tool-pack](../README.md) / UseLocalStorageReturn

# Type Alias: UseLocalStorageReturn\<T\>

> **UseLocalStorageReturn**\<`T`\> = `object`

Defined in: [src/hooks/useLocalStorage.ts:12](https://github.com/RamssCR/hooks-tool-pack/blob/584beee882f8ad4c4e91becd60bfc68728c2a98f/src/hooks/useLocalStorage.ts#L12)

The return type of the useLocalStorage hook.
It includes the current value, a function to set a new value,
a function to remove the item from storage, and a function to clear all storage.

## Type Parameters

### T

`T`

The type of the value being stored.

## Properties

### clearStorage()

> **clearStorage**: () => `void`

Defined in: [src/hooks/useLocalStorage.ts:16](https://github.com/RamssCR/hooks-tool-pack/blob/584beee882f8ad4c4e91becd60bfc68728c2a98f/src/hooks/useLocalStorage.ts#L16)

#### Returns

`void`

***

### remove()

> **remove**: () => `void`

Defined in: [src/hooks/useLocalStorage.ts:15](https://github.com/RamssCR/hooks-tool-pack/blob/584beee882f8ad4c4e91becd60bfc68728c2a98f/src/hooks/useLocalStorage.ts#L15)

#### Returns

`void`

***

### setValue()

> **setValue**: (`newValue`) => `void`

Defined in: [src/hooks/useLocalStorage.ts:14](https://github.com/RamssCR/hooks-tool-pack/blob/584beee882f8ad4c4e91becd60bfc68728c2a98f/src/hooks/useLocalStorage.ts#L14)

#### Parameters

##### newValue

`T`

#### Returns

`void`

***

### value

> **value**: `T`

Defined in: [src/hooks/useLocalStorage.ts:13](https://github.com/RamssCR/hooks-tool-pack/blob/584beee882f8ad4c4e91becd60bfc68728c2a98f/src/hooks/useLocalStorage.ts#L13)
