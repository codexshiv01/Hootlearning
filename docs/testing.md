# Testing Environment

The Hoot Portal employs a robust multi-tiered testing strategy utilizing **Playwright** for End-to-End (E2E) testing, alongside **Vitest** and **React Testing Library** for lightning-fast unit and component testing.

## End-to-End Testing (Playwright)
Playwright is configured to automatically test user flows across multiple browsers (Chromium, Firefox, WebKit) and device viewports (Desktop & Mobile). 
- **`playwright.config.js`**: Contains the E2E configuration, defining test directories and browser environments.
- **Execution**: To run E2E tests, execute `npx playwright test` in the `frontend` directory.

## Unit Testing (Vitest & RTL)
Since the project uses Vite as its bundler, Vitest is the natural choice for unit tests. It shares the exact same configuration pipeline as Vite (`vite.config.js`), meaning zero complex setup for ESM modules, JSX, or path aliases.

- **`vite.config.js`**: Contains the `test` block, setting the environment to `jsdom` (which simulates a browser in Node.js) and enabling global test APIs (so you don't have to `import { describe, it } from 'vitest'` in every file).
- **`src/setupTests.js`**: Automatically imports `@testing-library/jest-dom`, which extends the standard assertions with powerful DOM-specific matchers like `.toBeInTheDocument()` and `.toHaveClass()`.

## Running Tests
To run the test suite, open a terminal in the `frontend` directory and run:

```bash
npm run test
```

Vitest runs in "watch mode" by default in development, meaning it will automatically re-run your tests every time you save a file.

## Backend Testing (Jest & Supertest)
The backend utilizes **Jest** and **Supertest** to execute route tests without spinning up a live Express server.
- Uses `--experimental-vm-modules` to support ES Modules.
- Mocks Prisma using `jest-mock-extended` (or module overriding) to prevent hitting the real database during tests.

Run backend tests by executing:
```bash
npm run test
```
inside the `server` directory.

## Writing Tests
Tests should be placed next to the component they are testing and named with the `.test.jsx` extension. 

Example:
```javascript
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
```

*Note: If testing components that utilize `react-router-dom` (like the Sidebar with its `<Link>` tags), you must wrap the component in a `<MemoryRouter>` during the `render()` call.*
