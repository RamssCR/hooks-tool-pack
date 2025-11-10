[**hooks-tool-pack**](../README.md)

***

[hooks-tool-pack](../README.md) / createLocalStorage

# Function: createLocalStorage()

> **createLocalStorage**\<`K`\>(): `object`

Defined in: [src/helpers/localStorage.ts:16](https://github.com/RamssCR/hooks-tool-pack/blob/584beee882f8ad4c4e91becd60bfc68728c2a98f/src/helpers/localStorage.ts#L16)

Creates a wrapper around localStorage with typed keys.
It provides methods to get, set, remove, and clear items in localStorage.
This utility ensures type safety when interacting with localStorage,
allowing developers to define specific keys and their associated types.
This is just a wrapper around the native localStorage API,
when used, you must manipulate it inside an effect or a callback yourself.

## Type Parameters

### K

`K` *extends* `string`

The type of the keys used in localStorage.

## Returns

An object with methods to interact with localStorage.

### clear()

> **clear**: () => `void`

Clears all items from localStorage.

#### Returns

`void`

void

#### Example

```ts
storage.clear()
```

### get()

> **get**: \<`T`\>(`key`, `fallback?`) => `T` \| `null`

Retrieves an item from localStorage by key.

#### Type Parameters

##### T

`T`

The expected type of the stored value.

#### Parameters

##### key

`K`

The key of the item to retrieve.

##### fallback?

`T`

The value to return if the item does not exist.

#### Returns

`T` \| `null`

The parsed value from localStorage or the fallback value.

#### Example

```ts
const settings = storage.get<{ theme: string }>('settings', { theme: 'light' })
```

### remove()

> **remove**: (`key`) => `void`

Removes an item from localStorage by key.

#### Parameters

##### key

`K`

The key of the item to remove.

#### Returns

`void`

void

#### Example

```ts
storage.remove('user')
```

### set()

> **set**: \<`T`\>(`key`, `value`) => `void`

Assign a value to a key in localStorage.

#### Type Parameters

##### T

`T`

The type of the value being stored.

#### Parameters

##### key

`K`

The key to set the value for.

##### value

`T`

The value to store, which will be stringified.

#### Returns

`void`

void

#### Example

```ts
storage.set('settings', { theme: 'dark' })
```

## Example

```ts
const localStorage = createLocalStorage<'user' | 'settings'>()
localStorage.set('user', { name: 'Alice' })
const user = localStorage.get<{ name: string }>('user')
console.log(user) // { name: 'Alice' }
```
