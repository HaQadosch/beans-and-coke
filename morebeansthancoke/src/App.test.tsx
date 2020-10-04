import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders the title Beans and Coke', () => {
  const { getByRole, getByText } = render(
    <Provider store={ store }>
      <App />
    </Provider>
  );

  expect(getByRole(/img/i)).toBeInTheDocument();
  expect(getByText(/beans/i, { selector: 'h1' })).toBeInTheDocument();
});
