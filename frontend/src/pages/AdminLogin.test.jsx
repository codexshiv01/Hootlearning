import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import AdminLogin from './AdminLogin';

global.fetch = vi.fn();

describe('Admin Login Page', () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });

  test('renders admin login form', () => {
    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );
    expect(screen.getByText('Admin Portal')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter admin username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter admin password')).toBeInTheDocument();
  });

  test('shows error message on network failure', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter admin username'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByPlaceholderText('Enter admin password'), { target: { value: 'pass' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Cannot connect to server/i)).toBeInTheDocument();
    });
  });

  test('stores adminToken on success', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'super-admin-token' }),
    });

    render(
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter admin username'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByPlaceholderText('Enter admin password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(localStorage.getItem('adminToken')).toBe('super-admin-token');
    });
  });
});
