import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {AddAttendeeForm} from '../components/queueManager'; // Adjust the import path as necessary
import { MeetingBackend } from '../models';
import '@testing-library/jest-dom';
it('validates input correctly', async () => {
  const mockOnSubmit = jest.fn();
  const backends_t:MeetingBackend[] = [{name: "zoom", friendly_name: "Zoom", enabled: true, docs_url: null, telephone_num: null, intl_telephone_url: null }];
  const allowedBackends = new Set(['zoom', 'inperson']);

  render(<AddAttendeeForm
    allowedBackends={allowedBackends}
    backends={backends_t}
    defaultBackend="zoom"
    disabled={false}
    onSubmit={mockOnSubmit}
  />);

  const input = screen.getByPlaceholderText('Uniqname...');
  const submitButton = screen.getByRole('button', { name: '+ Add Attendee' });
  // console.log(submitButton);

  userEvent.type(input, 'osong@');
  // userEvent.click(submitButton);
  
  // This will be the actual text from the error message displayed on the UI
  const errorMessage = await screen.findByText("You need to use a uniqname and not an email address");
  expect(errorMessage).toBeInTheDocument();
  // console.log(errorMessage);
  // expect(errorMessage.toBeVisible())
  // expect(await screen.findByText('Invalid User Name')).toBeVisible()
  // expect(errorMessage).toBeInTheDocument();
  // expect(mockOnSubmit).toHaveBeenCalledWith('testuser', 'zoom');
});

it('validates input correctly', async () => {
  const mockOnSubmit = jest.fn();
  const backends_t:MeetingBackend[] = [{name: "zoom", friendly_name: "Zoom", enabled: true, docs_url: null, telephone_num: null, intl_telephone_url: null }];
  const allowedBackends = new Set(['zoom', 'inperson']);

  render(<AddAttendeeForm
    allowedBackends={allowedBackends}
    backends={backends_t}
    defaultBackend="zoom"
    disabled={false}
    onSubmit={mockOnSubmit}
  />);

  const input = screen.getByPlaceholderText('Uniqname...');
  const submitButton = screen.getByRole('button', { name: '+ Add Attendee' });
  // console.log(submitButton);

  userEvent.type(input, 'osong@');
  // userEvent.click(submitButton);
  
  // This will be the actual text from the error message displayed on the UI
  const errorMessage = await screen.findByText("You need to use a uniqname and not an email address");
  expect(errorMessage).toBeInTheDocument();
  // console.log(errorMessage);
  // expect(errorMessage.toBeVisible())
  // expect(await screen.findByText('Invalid User Name')).toBeVisible()
  // expect(errorMessage).toBeInTheDocument();
  // expect(mockOnSubmit).toHaveBeenCalledWith('testuser', 'zoom');
});