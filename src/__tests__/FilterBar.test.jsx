import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from '../components/FilterBar';

describe('FilterBar', () => {
  const setup = (overrides = {}) => {
    const props = { search: '', onSearch: vi.fn(), filter: 'All', onFilter: vi.fn(), ...overrides };
    render(<FilterBar {...props} />);
    return props;
  };

  it('renders search input with current value', () => {
    setup({ search: 'hello' });
    expect(screen.getByPlaceholderText(/search/i)).toHaveValue('hello');
  });

  it('calls onSearch when typing', () => {
    const { onSearch } = setup();
    fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'abc' } });
    expect(onSearch).toHaveBeenCalledWith('abc');
  });

  it('renders all filter tabs', () => {
    setup();
    ['All', 'In Progress', 'Completed', 'On Hold'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('marks active tab with "active" class', () => {
    setup({ filter: 'Completed' });
    expect(screen.getByText('Completed')).toHaveClass('active');
    expect(screen.getByText('All')).not.toHaveClass('active');
  });

  it('calls onFilter when a tab is clicked', () => {
    const { onFilter } = setup();
    fireEvent.click(screen.getByText('In Progress'));
    expect(onFilter).toHaveBeenCalledWith('In Progress');
  });
});
