import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Login from './Login';

// Mock the fetch API
global.fetch = vi.fn();

describe('Student Login Page', () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });

  test('renders login form correctly', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByText('Teachers Portal')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('shows error message on failed login', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid credentials' }),
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@student.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  test('stores token on successful login', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'mock-jwt-token', message: 'Logged in successfully' }),
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@student.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'correctpass' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(localStorage.getItem('userToken')).toBe('mock-jwt-token');
    });
  });
});
