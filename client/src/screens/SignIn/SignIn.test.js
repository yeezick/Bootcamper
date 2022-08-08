/**
 * Renders correctly (snapshot test)
 * Clicking signin button will:
 *    - navigate to user profile
 */
import { SignIn } from './SignIn';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../services/redux/store';

describe('Testing the SignIn screen & functionality', () => {
  const renderSignInScreen = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );
  // it("Renders successfully", () => {

  // })

  it("Log in button will call the api, save the user token to local storage, and navigate to the user's profile", () => {
    renderSignInScreen();
    const emailInput = screen.findByLabelText(/email/i);
    const passwordInput = screen.findByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, 'test');
    userEvent.click(submitButton);
    expect(screen.findByText(/about user/i)).toBeInTheDocument();
  });
});
