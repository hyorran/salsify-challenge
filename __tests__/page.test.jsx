import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../app/page';
import datastore from '../public/datastore.json';
import { formatProductsForTable } from '@/lib/utils';
import '@testing-library/jest-dom';

jest.mock('@/lib/utils', () => ({
  formatProductsForTable: jest.fn(),
  debounce: jest.fn(fn => fn),
  compareValues: jest.fn()
}));

describe('Home', () => {
  beforeEach(() => {
    formatProductsForTable.mockReturnValue({
      data: datastore.products,
      headers: ['Header 1', 'Header 2']
    });
  });

  it('should render the page with filters and table', () => {
    render(<Home />);

    expect(screen.getByLabelText(/Property/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Operator/i)).toBeInTheDocument();
  });

  it('should update the filter properties when dropdown is changed', async () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText(/Property/i), { target: { value: datastore.properties[0].id } });

    await waitFor(() => expect(screen.getByLabelText(/Operator/i)).toBeInTheDocument());
  });

  it('should show custom input based on selected property type', async () => {
    render(<Home />);

    fireEvent.change(screen.getByLabelText(/Property/i), { target: { value: datastore.properties[0].id } });

    await waitFor(() => expect(screen.getByLabelText(/Value/i)).toBeInTheDocument());
  });
});
