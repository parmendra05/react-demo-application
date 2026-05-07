import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ManagerSelect from '../components/ManagerSelect';

const managers = ['Alice', 'Bob'];

describe('ManagerSelect', () => {
  it('renders a select with existing managers', () => {
    render(<ManagerSelect managers={managers} value="Alice" onChange={vi.fn()} isNew={false} onToggleNew={vi.fn()} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('calls onChange when a manager is selected', () => {
    const onChange = vi.fn();
    render(<ManagerSelect managers={managers} value="Alice" onChange={onChange} isNew={false} onToggleNew={vi.fn()} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Bob' } });
    expect(onChange).toHaveBeenCalledWith('Bob');
  });

  it('calls onToggleNew when "Add New Manager" is selected', () => {
    const onToggleNew = vi.fn();
    render(<ManagerSelect managers={managers} value="Alice" onChange={vi.fn()} isNew={false} onToggleNew={onToggleNew} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '__new__' } });
    expect(onToggleNew).toHaveBeenCalled();
  });

  it('renders text input when isNew is true', () => {
    render(<ManagerSelect managers={managers} value="" onChange={vi.fn()} isNew={true} onToggleNew={vi.fn()} />);
    expect(screen.getByPlaceholderText(/new manager/i)).toBeInTheDocument();
  });

  it('calls onChange when typing in new manager input', () => {
    const onChange = vi.fn();
    render(<ManagerSelect managers={managers} value="" onChange={onChange} isNew={true} onToggleNew={vi.fn()} />);
    fireEvent.change(screen.getByPlaceholderText(/new manager/i), { target: { value: 'Carol' } });
    expect(onChange).toHaveBeenCalledWith('Carol');
  });

  it('calls onToggleNew when cancel button is clicked in new manager mode', () => {
    const onToggleNew = vi.fn();
    render(<ManagerSelect managers={managers} value="" onChange={vi.fn()} isNew={true} onToggleNew={onToggleNew} />);
    fireEvent.click(screen.getByText('✕'));
    expect(onToggleNew).toHaveBeenCalled();
  });
});
