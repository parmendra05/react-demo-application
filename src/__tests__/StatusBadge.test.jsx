import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatusBadge from '../components/StatusBadge';

describe('StatusBadge', () => {
  it('renders the status text', () => {
    render(<StatusBadge status="In Progress" />);
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('applies correct class for "In Progress"', () => {
    render(<StatusBadge status="In Progress" />);
    expect(screen.getByText('In Progress')).toHaveClass('badge-in-progress');
  });

  it('applies correct class for "Completed"', () => {
    render(<StatusBadge status="Completed" />);
    expect(screen.getByText('Completed')).toHaveClass('badge-completed');
  });

  it('applies correct class for "On Hold"', () => {
    render(<StatusBadge status="On Hold" />);
    expect(screen.getByText('On Hold')).toHaveClass('badge-on-hold');
  });
});
