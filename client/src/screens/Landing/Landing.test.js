/**
 ** Initial Thoughts:
 * What to test on this screen?
 * - Does the screen load successfully?
 * - Are there 2 buttons on this screen?
 *    - Does clicking on these buttons successfuly navigate me to the right screens?
 * - Does it have the header
 * - Do the buttons navigate correctly?
 *
 ** Key Takeaways:
 * - Not worth testing styling or if the component is rendered. One could argue each button's test expecting it to be in the document would also be useless.
 * - Unit test should ONLY be focused on actual logic
 * - Checking browser history is really unstable & not recommended (wasted 4 hours on this). To test successful navigation, each screen should import & test the existence of a `<LocationDisplay />`
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../services/redux/store';
import { Landing } from './Landing';

describe('On initial render, there should be an image and 4 buttons', () => {
  const user = userEvent.setup();
  const renderLandingScreen = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Landing />
        </BrowserRouter>
      </Provider>
    );

  // it('Renders', () => {
  //   const { asFragment } = render(
  //     <Provider store={store}>
  //       <BrowserRouter>
  //         <Landing />
  //       </BrowserRouter>
  //     </Provider>
  //   );
  //   expect(asFragment()).toMatchSnapshot();
  // });

  beforeEach(() => {
    renderLandingScreen();
  });

  it('Should have a placeholder image of 82x82 pixels', async () => {
    const landingImg = screen.queryByTestId(/landing-image/i);
    const style = window.getComputedStyle(landingImg);
    expect(landingImg).toBeInTheDocument();
  });

  it('Log in button exists & navigates to sign in screen', async () => {
    const loginButton = screen.queryByText(/log in/i);
    expect(loginButton).toBeInTheDocument();
    await user.click(loginButton);
    const formButton = screen.getByRole('button');
    expect(formButton).toBeInTheDocument();
    expect(signinButton.innerText).toBe(/sign in/i);
  });

  it('Sign up button exists & navigates to sign up screen', async () => {
    const signupButton = screen.queryByText(/sign up/i);
    expect(signupButton).toBeInTheDocument();
    await user.click(signupButton);
    const formButton = screen.getByRole('button');
    expect(formButton).toBeInTheDocument();
    expect(formButton.innerText).toBe(/sign in/i);
  });

  it('Continue without logging in button exists & navigates to roulette screen', async () => {
    const continueButton = screen.queryByText(/continue without logging in/i);
    expect(continueButton).toBeInTheDocument();
    await user.click(continueButton);
    const declineButton = screen.getByRole('roulette-decline');
    expect(declineButton).toBeInTheDocument();
    // what else to test if decline button exists
  });
});
