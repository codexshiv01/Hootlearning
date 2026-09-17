// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

vi.mock('react-pdf', () => ({
  Document: ({ children }) => React.createElement('div', { 'data-testid': 'mock-pdf-document' }, children),
  Page: () => React.createElement('div', { 'data-testid': 'mock-pdf-page' }),
  pdfjs: { GlobalWorkerOptions: { workerSrc: '' } },
}));
