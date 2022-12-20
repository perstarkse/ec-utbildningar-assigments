import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import '@testing-library/jest-dom'
import ContactUsForm from '../components/ContactUsForm';
import userEvent from '@testing-library/user-event';

describe('ContactUsForm', () => {

    it('will display error if user tries to submit without entering correct input', () => {
        render(<ContactUsForm />);
        // find submitbutton and press it
        const submitButton = screen.getByRole('button');
        fireEvent.click(submitButton);

        // find and verify that the error field shows the error
        const commentsErrorField = screen.getByTestId('commentsError').textContent;
        expect(commentsErrorField).toContain('You must enter a comment')
    })

    it('will display success alert if sucessfull submit', async () => {
        // mock input
        const user = { name: 'test', email: 'test@test.com', comment: 'testingthisfunctionality' };

        render(<ContactUsForm />);
        // get the appropriate input fields
        let nameField = screen.getByPlaceholderText('Your Name');
        let emailField = screen.getByPlaceholderText('Your Mail');
        let commentField = screen.getByPlaceholderText('Comments');

        // input mock data
        userEvent.type(nameField, user.name);
        userEvent.type(emailField, user.email);
        userEvent.type(commentField, user.comment);

        // find submitbutton and press it
        const submitButton = screen.getByRole('button');
        fireEvent.click(submitButton);

        // expect that the success alert is shown
        expect(await screen.findByTestId("success")).toBeInTheDocument();
    })
});