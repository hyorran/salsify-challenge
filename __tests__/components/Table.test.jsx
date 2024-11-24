import { render, screen } from '@testing-library/react';
import Table from '../../components/Table/Table';
import '@testing-library/jest-dom';  // For the `toBeInTheDocument` matcher

describe('Table Component', () => {
  const headers = ['Header 1', 'Header 2'];
  const data = [
    { 'Header 1': 'Row 1, Col 1', 'Header 2': 'Row 1, Col 2' },
    { 'Header 1': 'Row 2, Col 1', 'Header 2': 'Row 2, Col 2' }
  ];

  it('should render table with headers and rows', () => {
    render(<Table headers={headers} data={data} />);

    headers.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });

    data.forEach(row => {
      Object.values(row).forEach(cell => {
        expect(screen.getByText(cell)).toBeInTheDocument();
      });
    });
  });

  it('should render a message when there is no data', () => {
    render(<Table headers={headers} data={[]} />);

    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });

  it('should render a message when headers and data are both missing', () => {
    render(<Table headers={[]} data={[]} />);

    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });

  it('should render a table even if some data fields are missing', () => {
    const incompleteData = [
      { 'Header 1': 'Row 1, Col 1' },
      { 'Header 2': 'Row 2, Col 2' }
    ];

    render(<Table headers={headers} data={incompleteData} />);

    expect(screen.getByText('Row 1, Col 1')).toBeInTheDocument();
    expect(screen.getByText('Row 2, Col 2')).toBeInTheDocument();
    expect(screen.queryByText('Row 1, Col 2')).toBeNull();
  });
});
