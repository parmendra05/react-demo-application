import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCard from '../components/ProjectCard';

const project = { id: 1, name: 'Alpha', manager: 'Bob', status: 'In Progress', deadline: '2025-12-01', description: 'Desc text' };

describe('ProjectCard', () => {
  it('renders project name', () => {
    render(<ProjectCard project={project} onClick={vi.fn()} />);
    expect(screen.getByText('Alpha')).toBeInTheDocument();
  });

  it('renders manager name', () => {
    render(<ProjectCard project={project} onClick={vi.fn()} />);
    expect(screen.getByText(/Bob/)).toBeInTheDocument();
  });

  it('renders deadline', () => {
    render(<ProjectCard project={project} onClick={vi.fn()} />);
    expect(screen.getByText(/2025-12-01/)).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<ProjectCard project={project} onClick={vi.fn()} />);
    expect(screen.getByText('Desc text')).toBeInTheDocument();
  });

  it('renders status badge', () => {
    render(<ProjectCard project={project} onClick={vi.fn()} />);
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('calls onClick with the project when clicked', () => {
    const onClick = vi.fn();
    render(<ProjectCard project={project} onClick={onClick} />);
    fireEvent.click(screen.getByText('Alpha'));
    expect(onClick).toHaveBeenCalledWith(project);
  });
});
