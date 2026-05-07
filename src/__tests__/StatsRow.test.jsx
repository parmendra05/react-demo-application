import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatsRow from '../components/StatsRow';

const projects = [
  { id: 1, status: 'In Progress' },
  { id: 2, status: 'In Progress' },
  { id: 3, status: 'Completed' },
  { id: 4, status: 'On Hold' },
];

describe('StatsRow', () => {
  it('shows correct total count', () => {
    render(<StatsRow projects={projects} />);
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('shows correct In Progress count', () => {
    render(<StatsRow projects={projects} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('shows correct Completed count', () => {
    render(<StatsRow projects={projects} />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('shows correct On Hold count', () => {
    render(<StatsRow projects={projects} />);
    expect(screen.getByText('On Hold')).toBeInTheDocument();
  });

  it('shows zeros when no projects', () => {
    render(<StatsRow projects={[]} />);
    const zeros = screen.getAllByText('0');
    expect(zeros).toHaveLength(4);
  });
});
