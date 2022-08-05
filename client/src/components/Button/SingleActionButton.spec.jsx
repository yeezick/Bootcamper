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
/*
-renders successfully
-passsing in a string to the title prop should also be rendered
-passing in a handler to the button will successfully execute it on press
-if a style prop is "disabled", then background should = '#EBEBE4'and text should be '#5c5c5c'
-if a style prop doesnt exist ("defaultStyle"), then background should = '#1b1b1b' and text should be '#fff'
-if a style prop is "lightStyle", then background should = 'rgba(0,0,0,0)', borderWidth: 1, borderColor: '#000',and text should be '#000'
-if type="long", check if width is set to 250
 */

import React from 'react';
import { SingleActionButton } from "./SingleActionButton"
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';



it('renders', () => {
  const { asFragment } = render(<SingleActionButton />);
  expect(asFragment()).toMatchSnapshot();

});
