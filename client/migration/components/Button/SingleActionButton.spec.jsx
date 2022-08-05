// import {render, screen} from "@testing-library/react"
// import { SingleActionButton } from "./SingleActionButton"
// import '@testing-library/jest-dom'

// describe('sample test to ensure tests are passing', () => {
//     test('renders button', () => {
//         render(<SingleActionButton />)
//         const buttonElement = screen.getByTestId("button");
//         expect(buttonElement).toBeInTheDocument()
//     })
// })

import React from 'react';
import { SingleActionButton } from "./SingleActionButton"
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

it('renders', () => {
  const { asFragment } = render(<SingleActionButton />);
  expect(asFragment()).toMatchSnapshot();
});
