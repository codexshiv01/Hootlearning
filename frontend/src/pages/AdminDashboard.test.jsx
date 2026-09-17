import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

describe('AdminDashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
    Storage.prototype.getItem = vi.fn(() => 'fake-admin-token');
  });

  it('fetches and displays categories and resources on mount', async () => {
    global.fetch.mockImplementation(async (url) => {
      if (url.includes('/api/categories')) return { ok: true, json: async () => [{ slug: 'science', name: 'Science', allowDownload: true }] };
      if (url.includes('/api/folders')) return { ok: true, json: async () => [] };
      if (url.includes('/api/resources')) return { ok: true, json: async () => [{ id: 'res1', title: 'Biology Notes', category: 'science', actionType: 'download' }] };
      if (url.includes('/api/admin/users')) return { ok: true, json: async () => [] };
      return { ok: false };
    });

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Biology Notes')).toBeInTheDocument();
    });
  });
});
