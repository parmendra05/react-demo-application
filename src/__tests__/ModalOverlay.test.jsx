import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalOverlay from '../components/ModalOverlay';

describe('ModalOverlay', () => {
  it('renders children', () => {
    render(<ModalOverlay onClose={vi.fn()}><p>Content</p></ModalOverlay>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onClose when overlay background is clicked', () => {
    const onClose = vi.fn();
    render(<ModalOverlay onClose={onClose}><p>Content</p></ModalOverlay>);
    fireEvent.click(screen.getByText('Content').closest('.modal-overlay'));
    expect(onClose).toHaveBeenCalled();
  });

  it('does not call onClose when inner modal is clicked', () => {
    const onClose = vi.fn();
    render(<ModalOverlay onClose={onClose}><p>Content</p></ModalOverlay>);
    fireEvent.click(screen.getByText('Content').closest('.modal'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('applies extra className to inner modal', () => {
    render(<ModalOverlay onClose={vi.fn()} className="form-modal"><p>X</p></ModalOverlay>);
    expect(screen.getByText('X').closest('.modal')).toHaveClass('form-modal');
  });
});
