import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectForm from '../components/ProjectForm';

const projects = [{ id: 1, name: 'Existing', manager: 'Alice', status: 'In Progress', deadline: '2025-12-01', description: '' }];

const initialProject = { id: 2, name: 'Edit Me', manager: 'Alice', status: 'Completed', deadline: '2025-11-01', description: 'Old desc' };

describe('ProjectForm — Add mode', () => {
  it('renders "Add New Project" title when no initial', () => {
    render(<ProjectForm initial={null} onSave={vi.fn()} onCancel={vi.fn()} projects={projects} />);
    expect(screen.getByText('Add New Project')).toBeInTheDocument();
  });

  it('renders "Add Project" submit button', () => {
    render(<ProjectForm initial={null} onSave={vi.fn()} onCancel={vi.fn()} projects={projects} />);
    expect(screen.getByText('Add Project')).toBeInTheDocument();
  });

  it('calls onCancel when Cancel is clicked', () => {
    const onCancel = vi.fn();
    render(<ProjectForm initial={null} onSave={vi.fn()} onCancel={onCancel} projects={projects} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });

  it('does not submit when name is empty', () => {
    const onSave = vi.fn();
    render(<ProjectForm initial={null} onSave={onSave} onCancel={vi.fn()} projects={projects} />);
    fireEvent.click(screen.getByText('Add Project'));
    expect(onSave).not.toHaveBeenCalled();
  });
});

describe('ProjectForm — Edit mode', () => {
  it('renders "Edit Project" title when initial is provided', () => {
    render(<ProjectForm initial={initialProject} onSave={vi.fn()} onCancel={vi.fn()} projects={projects} />);
    expect(screen.getByText('Edit Project')).toBeInTheDocument();
  });

  it('renders "Save Changes" submit button', () => {
    render(<ProjectForm initial={initialProject} onSave={vi.fn()} onCancel={vi.fn()} projects={projects} />);
    expect(screen.getByText('Save Changes')).toBeInTheDocument();
  });

  it('pre-fills the name field with initial value', () => {
    render(<ProjectForm initial={initialProject} onSave={vi.fn()} onCancel={vi.fn()} projects={projects} />);
    expect(screen.getByDisplayValue('Edit Me')).toBeInTheDocument();
  });

  it('pre-fills the description field', () => {
    render(<ProjectForm initial={initialProject} onSave={vi.fn()} onCancel={vi.fn()} projects={projects} />);
    expect(screen.getByDisplayValue('Old desc')).toBeInTheDocument();
  });
});
