import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddAttendeeForm from './AddAttendeeForm'; // Adjust the import path as necessary

describe('AddAttendeeForm', () => {
  const mockOnSubmit = jest.fn();
  const backends = [{id: 'zoom', name: 'Zoom'}, {id: 'inperson', name: 'In-Person'}];
  const allowedBackends = new Set(['zoom', 'inperson']);

  beforeEach(() => {
    render(<AddAttendeeForm
      allowedBackends={allowedBackends}
      backends={backends}
      defaultBackend="zoom"
      disabled={false}
      onSubmit={mockOnSubmit}
    />);
  });

  test('submits correct data', () => {
    const input = screen.getByPlaceholderText('Uniqname...');
    const submitButton = screen.getByRole('button', { name: '+ Add Attendee' });

    userEvent.type(input, 'testuser');
    userEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('testuser', 'zoom');
  });

  test('handles backend selection', () => {
    const select = screen.getByLabelText('Select Backend'); // Assuming you have labeled your dropdown
    userEvent.selectOptions(select, 'inperson');
    const input = screen.getByPlaceholderText('Uniqname...');
    const submitButton = screen.getByRole('button', { name: '+ Add Attendee' });

    userEvent.type(input, 'testuser');
    userEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith('testuser', 'inperson');
  });

  test('validates input correctly', () => {
    const input = screen.getByPlaceholderText('Uniqname...');
    userEvent.type(input, 'invalidemail@umich.edu');
    const submitButton = screen.getByRole('button', { name: '+ Add Attendee' });

    userEvent.click(submitButton);
    expect(screen.getByText('Invalid input')).toBeInTheDocument(); // Assuming you show an error message for invalid input
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
