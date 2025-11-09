![Pull Request Automation](https://github.com/RamssCR/hooks-tool-pack/actions/workflows/unit-testing.yaml/badge.svg)

# Hooks Tool Pack
---
A collection of useful custom react hooks for various purposes.
Designed to simplify state management, side effects, and enhance component
functionality. Works for both library approach (React only) and meta-frameworks
like Next.js, Remix, etc.
---

## Index
- [Purpose](#purpose)
- [Installation](#installation)
- [Usage](#usage)
- [Available Hooks](#available-hooks)
- [Contributing](#contributing)

## Purpose
The Hooks Tool Pack aims to provide developers with a set of reusable custom React hooks
that simplify common tasks and enhance the overall development experience.

By reducing boilerplate code and promoting best practices, these hooks help developers
build more efficient and maintainable React applications.

It is designed to be framework-agnostic, making it suitable for use in various React-based
projects (built with Vite, for example), also including those built with popular
meta-frameworks like Next.js and Remix.

## Installation
You can install the Hooks Tool Pack via npm or yarn:

```bash
# Using npm
npm install hooks-tool-pack
```


```bash
# Using yarn
yarn add hooks-tool-pack
```

## Usage
To use a hook from the Hooks Tool Pack, simply import it into your React component:

```jsx
import { useIsomorphicEffect } from 'hooks-tool-pack';

function MyComponent() {
  useIsomorphicEffect(() => {
    console.log('uses useLayoutEffect on client, useEffect on server');
  }, []);

  return <div>My Component</div>;
}
```

## Available Hooks
For this initial version, a set of eleven hooks were created to cover a variety of use cases:

| Custom Hook                  | Description                                                         |
|------------------------------|---------------------------------------------------------------------|
| `useDebounce`                | Debounces a value or function to limit its execution rate.          |
| `useDocumentTitle`           | Sets the document title dynamically.                                |
| `useEventListener`           | Attaches event listeners to DOM elements (with cleanup).            |
| `useIsMounted`               | Tracks if a component is currently mounted.                         |
| `useIsomorphicEffect`        | Chooses between useEffect and useLayoutEffect based on environment. |
| `useLocalStorage`            | Wrapper around localStorage for state persistence.                  |
| `useNetworkStatus`           | Monitors online/offline status of the browser.                      |
| `usePerformanceMark`         | Measures performance of code blocks and components.                 |
| `usePrevious`                | Tracks the previous value of a state or prop.                       |
| `useThrottle`                | Throttles a value or function to limit its execution rate.          |
| `useToggle`                  | Manages boolean state with a toggle function.                       |

> [!NOTE]
> This is the initial version of the Hooks Tool Pack. More hooks and features
> will be added in future releases based on user feedback and requirements.

## Contributing
Contributions are welcome! If you have ideas for new hooks or improvements:

1. Fork or clone the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and ensure tests are included.
4. Submit a pull request detailing your changes.

Don't forget to follow the project's coding style. Documentation is handled by typedoc, so
you must ensure your code comments are clear and comprehensive.

Thank you for your interest in contributing to the Hooks Tool Pack!