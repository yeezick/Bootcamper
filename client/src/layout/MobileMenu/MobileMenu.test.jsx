import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../../services/redux/store';
import MobileMenu from './MobileMenu';

describe('MobileMenu Component', () => {
  test('Nav links are not displayed if toggle btn is not clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<MobileMenu isOpen={false} />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  });
  const outputElement = screen.getByTestId('navlink');
  expect(outputElement).not.toBeInTheDocument();

  test('renders nav links upon click event', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<MobileMenu isOpen={false} />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
  });
  screen.debug();
});
