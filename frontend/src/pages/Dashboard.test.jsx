import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

// Mock child components to isolate Dashboard logic
vi.mock('../components/Sidebar', () => ({
  default: ({ sections }) => (
    <div data-testid="sidebar-mock">
      {sections.map(s => <span key={s.id}>{s.label}</span>)}
    </div>
  )
}));

vi.mock('../components/ResourceGrid', () => ({
  default: ({ resources }) => (
    <div data-testid="resource-grid-mock">
      {resources.map(r => <span key={r.id}>{r.title}</span>)}
    </div>
  )
}));

describe('Dashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    Storage.prototype.getItem = vi.fn(() => 'fake-token');
  });

  it('fetches and renders categories and folders', async () => {
    global.fetch.mockImplementation(async (url) => {
      if (url.includes('/api/categories')) return { ok: true, json: async () => [{ slug: 'math', name: 'Math Content', icon: 'BookOpen' }] };
      if (url.includes('/api/folders')) return { ok: true, json: async () => [{ id: 'folder1', name: 'Term 1', categorySlug: 'math' }] };
      if (url.includes('/api/resources')) return { ok: true, json: async () => [{ id: 'res1', title: 'Math Book', category: 'math', folderId: null }] };
      return { ok: false };
    });

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    // Wait for data to load and assert UI
    await waitFor(() => {
      expect(screen.getAllByText('Math Content').length).toBeGreaterThan(0);
      expect(screen.getByText('Math Book')).toBeInTheDocument();
      expect(screen.getByText('Term 1')).toBeInTheDocument();
    });
  });
});
