import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ResourceGrid from './ResourceGrid';

describe('ResourceGrid Component', () => {
  const mockResources = [
    { id: '1', title: 'Test PDF', actionType: 'download', fileUrl: 'http://test.com/pdf' },
    { id: '2', title: 'Test Video', actionType: 'video', videoUrl: 'http://test.com/vid' },
  ];

  it('renders resource cards correctly', () => {
    render(<ResourceGrid resources={mockResources} onOpen={() => {}} />);
    
    expect(screen.getByText('Test PDF')).toBeInTheDocument();
    expect(screen.getByText('Test Video')).toBeInTheDocument();
  });

  it('calls onOpen when a resource is clicked', () => {
    const onOpenMock = vi.fn();
    render(<ResourceGrid resources={mockResources} onOpen={onOpenMock} />);
    
    const pdfCard = screen.getByText('Test PDF').closest('div');
    fireEvent.click(pdfCard);

    expect(onOpenMock).toHaveBeenCalledWith(mockResources[0]);
    expect(onOpenMock).toHaveBeenCalledTimes(1);
  });
});
