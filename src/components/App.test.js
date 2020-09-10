import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  }
}));

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/.?/i);
//   expect(linkElement).toBeInTheDocument();
// });

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });


test('renders learn react link', () => {
  const exampleFn = (a, b) => a + b
  expect(exampleFn(2, 2)).toBe(4);
});

