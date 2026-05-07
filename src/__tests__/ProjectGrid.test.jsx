import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectGrid from '../components/ProjectGrid';

const projects = [
  { id: 1, name: 'Alpha', manager: 'Alice', status: 'In Progress', deadline: '2025-12-01', description: '' },
  { id: 2, name: 'Beta', manager: 'Bob', status: 'Completed', deadline: '2025-11-01', description: '' },
];

describe('ProjectGrid', () => {
  it('shows loading message when loading', () => {
    render(<ProjectGrid loading={true} projects={[]} onCardClick={vi.fn()} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows empty message when no projects', () => {
    render(<ProjectGrid loading={false} projects={[]} onCardClick={vi.fn()} />);
    expect(screen.getByText(/no projects/i)).toBeInTheDocument();
  });

  it('renders a card for each project', () => {
    render(<ProjectGrid loading={false} projects={projects} onCardClick={vi.fn()} />);
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('does not show loading or empty when projects exist', () => {
    render(<ProjectGrid loading={false} projects={projects} onCardClick={vi.fn()} />);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/no projects/i)).not.toBeInTheDocument();
  });
});
