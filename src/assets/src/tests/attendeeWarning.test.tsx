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
  userEvent.type(input, 'osong@');
  // This will be the actual text from the error message displayed on the UI
  const errorMessage = await screen.findByText("You need to use a uniqname and not an email address");
  expect(errorMessage).toBeInTheDocument();
});

it('validates input correctly', async () => {
  const mockOnSubmit = jest.fn(() => true);
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
  userEvent.type(input, '@');
  
  // This will be the actual text from the error message displayed on the UI
  const errorMessage = await screen.findByText("Uniqnames must be at least 3 characters long.");
  expect(errorMessage).toBeInTheDocument();
});