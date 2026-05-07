import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectModal from '../components/ProjectModal';

const project = { id: 1, name: 'Alpha', manager: 'Alice', status: 'In Progress', deadline: '2025-12-01', description: 'Some desc' };

describe('ProjectModal', () => {
  it('renders nothing when project is null', () => {
    const { container } = render(<ProjectModal project={null} onClose={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders project name and details', () => {
    render(<ProjectModal project={project} onClose={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Some desc')).toBeInTheDocument();
    expect(screen.getByText(/Alice/)).toBeInTheDocument();
    expect(screen.getByText(/2025-12-01/)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<ProjectModal project={project} onClose={onClose} onEdit={vi.fn()} onDelete={vi.fn()} />);
    fireEvent.click(screen.getByText('✕'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onEdit with project when Edit is clicked', () => {
    const onEdit = vi.fn();
    render(<ProjectModal project={project} onClose={vi.fn()} onEdit={onEdit} onDelete={vi.fn()} />);
    fireEvent.click(screen.getByText(/Edit/));
    expect(onEdit).toHaveBeenCalledWith(project);
  });

  it('calls onDelete with project id when Delete is clicked', () => {
    const onDelete = vi.fn();
    render(<ProjectModal project={project} onClose={vi.fn()} onEdit={vi.fn()} onDelete={onDelete} />);
    fireEvent.click(screen.getByText(/Delete/));
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
