import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../components/Input/Input';
import '@testing-library/jest-dom';

describe('Input Component', () => {
  const mockOnChange = jest.fn();

  it('should render input with label and value', () => {
    render(<Input value="Test Value" onChange={mockOnChange} label="Test Label" name="test-input" type="text" />);

    expect(screen.getByLabelText(/Test Label/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Value')).toBeInTheDocument();
  });

  it('should call onChange handler when value changes', () => {
    render(<Input value="" onChange={mockOnChange} label="Test Label" name="test-input" type="text" />);

    fireEvent.change(screen.getByLabelText(/Test Label/i), { target: { value: 'New Value' } });

    expect(mockOnChange).toHaveBeenCalledWith({ value: 'New Value', name: 'test-input' });
  });

  it('should render with the correct name and id attributes', () => {
    render(<Input value="Test Value" onChange={mockOnChange} label="Test Label" name="test-input" type="text" />);

    const inputElement = screen.getByLabelText(/Test Label/i);
    expect(inputElement).toHaveAttribute('name', 'test-input');
    expect(inputElement).toHaveAttribute('id', 'test-input');
  });

  it('should render input with correct type', () => {
    render(<Input value="" onChange={mockOnChange} label="Test Label" name="test-input" type="password" />);

    const inputElement = screen.getByLabelText(/Test Label/i);
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  it('should render input with empty value if no value is provided', () => {
    render(<Input onChange={mockOnChange} label="Test Label" name="test-input" type="text" />);

    expect(screen.getByLabelText(/Test Label/i)).toHaveValue('');
  });

  it('should render input with correct class names', () => {
    render(<Input value="Test Value" onChange={mockOnChange} label="Test Label" name="test-input" type="text" />);

    const inputElement = screen.getByLabelText(/Test Label/i);
    expect(inputElement).toHaveClass('input');
  });
});
