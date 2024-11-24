import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '../../components/Dropdown/Dropdown';
import '@testing-library/jest-dom';

describe('Dropdown Component', () => {
  const options = [
    { id: '1', name: 'Option 1' },
    { id: '2', name: 'Option 2' },
    { id: '3', name: 'Option 3' }
  ];

  const mockOnChange = jest.fn();

  it('should render dropdown with options and label', () => {
    render(<Dropdown options={options} onChange={mockOnChange} label="Test Label" name="test-dropdown" />);

    expect(screen.getByLabelText(/Test Label/i)).toBeInTheDocument();
    options.forEach(option => {
      expect(screen.getByText(option.name)).toBeInTheDocument();
    });
  });

  it('should render default option if no value is selected', () => {
    render(<Dropdown options={options} onChange={mockOnChange} label="Test Label" name="test-dropdown" />);

    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('should call onChange handler when an option is selected', () => {
    render(<Dropdown options={options} onChange={mockOnChange} label="Test Label" name="test-dropdown" />);

    fireEvent.change(screen.getByLabelText(/Test Label/i), { target: { value: '2' } });

    expect(mockOnChange).toHaveBeenCalledWith({ value: '2', name: 'test-dropdown' });
  });

  it('should display custom default option if provided', () => {
    render(
      <Dropdown
        options={options}
        onChange={mockOnChange}
        label="Test Label"
        name="test-dropdown"
        defaultOption="Choose an option"
      />
    );

    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });

  it('should not render options if options array is empty', () => {
    render(<Dropdown options={[]} onChange={mockOnChange} label="Test Label" name="test-dropdown" />);

    expect(screen.getByText('Select an option')).toBeInTheDocument();
    expect(screen.queryByText('Option 1')).toBeNull();
  });

  it('should render dropdown with the correct name attribute', () => {
    render(<Dropdown options={options} onChange={mockOnChange} label="Test Label" name="test-dropdown" />);

    expect(screen.getByLabelText(/Test Label/i).getAttribute('name')).toBe('test-dropdown');
  });
});
