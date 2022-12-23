import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ShoppingCartProvider } from '../contexts/ShoppingCartContext'
import { BrowserRouter } from 'react-router-dom';
import UserView from '../views/UserView';
import { UserProvider } from '../contexts/UserContext';
import userEvent from '@testing-library/user-event';

interface IproviderProps {
    providerProps: Iuser
}
interface Iuser {
    _id: string,
    emailAddress: string;
    password: string,
    isAdmin: boolean,
}
const mockUser = { _id: "", emailAddress: "", password: "", isAdmin: false }
// math.random() for randomness to assure unique emailaddress.
const user = { emailAddress: `user@${Math.random() * 100}.com`, password: "password" }


describe("UserView", () => {
    const customRender = (ui: any, { providerProps, ...renderOptions }: IproviderProps) => {
        return render(
            <BrowserRouter>
                <ShoppingCartProvider>
                    <UserProvider {...providerProps}>
                        {ui}
                    </UserProvider>
                </ ShoppingCartProvider>
            </BrowserRouter>,
            renderOptions,
        )
    }

    test("can set form to register", async () => {
        const providerProps = mockUser;
        customRender(<UserView />, { providerProps });
        // click button to view register form
        fireEvent.click(await screen.findByTestId("SignUpSignInToggle"));
        // expect that register button is viewable
        expect(await screen.findByRole('button', { name: "Register" })).toBeInTheDocument();
    })
    test("can register", async () => {
        const providerProps = mockUser;
        customRender(<UserView />, { providerProps });
        // toggle the form to signup
        fireEvent.click(await screen.findByTestId("SignUpSignInToggle"));
        // find fields
        let emailField = screen.getByPlaceholderText('Enter email address');
        let passwordField = screen.getByPlaceholderText('Enter password');

        // input mock data
        userEvent.type(emailField, user.emailAddress);
        userEvent.type(passwordField, user.password);

        // find submitbutton and press it
        const submitButton = screen.getByRole('button', { name: "Register" });
        fireEvent.click(submitButton);
        // expect that the success alert is shown
        expect(await screen.findByTestId("success")).toBeInTheDocument();
    })
    test("cannot register same user twice", async () => {
        const providerProps = mockUser;
        customRender(<UserView />, { providerProps });
        // toggle the form to signup
        fireEvent.click(await screen.findByTestId("SignUpSignInToggle"));
        // find fields
        let emailField = screen.getByPlaceholderText('Enter email address');
        let passwordField = screen.getByPlaceholderText('Enter password');

        // input mock data
        userEvent.type(emailField, user.emailAddress);
        userEvent.type(passwordField, user.password);

        // find submitbutton and press it
        const submitButton = screen.getByRole('button', { name: "Register" });
        fireEvent.click(submitButton);
        // expect that the error alert is shown
        expect(await screen.findByTestId("error")).toBeInTheDocument();
    })
    test("can sign in", async () => {
        const providerProps = mockUser;
        customRender(<UserView />, { providerProps });
        // find fields
        let emailField = screen.getByPlaceholderText('Enter email address');
        let passwordField = screen.getByPlaceholderText('Enter password');

        // input mock data
        userEvent.type(emailField, user.emailAddress);
        userEvent.type(passwordField, user.password);

        // find submitbutton and press it
        const submitButton = screen.getByRole('button', { name: "Sign in" });
        fireEvent.click(submitButton);
        // expect that the text shows you are signed in
        expect(await screen.findByText('You are signed in')).toBeInTheDocument();
    })
});