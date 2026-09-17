import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from './Sidebar';

describe('Sidebar Component', () => {
  const mockSections = [
    { id: 'books', label: 'Books', icon: 'book' },
    { id: 'videos', label: 'Videos', icon: 'video' },
  ];

  it('renders all section labels', () => {
    render(
      <MemoryRouter>
        <Sidebar sections={mockSections} activeSection="books" onSelect={() => {}} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Books')).toBeInTheDocument();
    expect(screen.getByText('Videos')).toBeInTheDocument();
  });

  it('applies the active class to the selected section', () => {
    render(
      <MemoryRouter>
        <Sidebar sections={mockSections} activeSection="books" onSelect={() => {}} />
      </MemoryRouter>
    );
    
    const activeItem = screen.getByText('Books').closest('button');
    const inactiveItem = screen.getByText('Videos').closest('button');

    expect(activeItem).toHaveClass('active');
    expect(inactiveItem).not.toHaveClass('active');
  });

  it('calls onSelect when an item is clicked', () => {
    const onSelectMock = vi.fn();
    render(
      <MemoryRouter>
        <Sidebar sections={mockSections} activeSection="books" onSelect={onSelectMock} />
      </MemoryRouter>
    );
    
    const videosItem = screen.getByText('Videos');
    fireEvent.click(videosItem);

    expect(onSelectMock).toHaveBeenCalledWith('videos');
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});
