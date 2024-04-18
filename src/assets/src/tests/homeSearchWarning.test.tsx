import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MeetingBackend } from '../models';
import '@testing-library/jest-dom';
import { HomePage } from '../components/home';
import { BrowserRouter } from 'react-router-dom';

it('validates input correctly', async () => {
    const mockOnSubmit = jest.fn();
    const backends_t:MeetingBackend[] = [{name: "zoom", friendly_name: "Zoom", enabled: true, docs_url: null, telephone_num: null, intl_telephone_url: null }];
    const user = {
      id: 1,
      username: 'osong', 
      first_name: 'oscar', 
      last_name: 'song',
    }
    render(<BrowserRouter>
      <HomePage
        backends={backends_t}
        defaultBackend="zoom"
        loginUrl=""
        user={user} // include any other props your component needs
      />
    </BrowserRouter>);
  
    const input = screen.getByPlaceholderText('Queue name or host uniqname...');
    userEvent.type(input, 'osong@');
    
    // This will be the actual text from the error message displayed on the UI
    const errorMessage = await screen.findByText("Emails cannot be entered.");
    expect(errorMessage).toBeInTheDocument();
  });