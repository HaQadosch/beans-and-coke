import React from 'react';
import { getByAltText, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { App } from './App';

test('renders the title Beans and Coke', () => {
  const { getByAltText, getByText } = render(
    <Provider store={ store }>
      <App />
    </Provider>
  );

  expect(getByAltText(/beans/i)).toBeInTheDocument();
  expect(getByText(/beans/i, { selector: 'h1' })).toBeInTheDocument();
});
