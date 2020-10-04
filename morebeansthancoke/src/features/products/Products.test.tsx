import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import { Products } from './Products'

test('renders the list of products available in the store', () => {
  const { debug, getAllByText, getByText } = render(
    <Provider store={ store }>
      <Products />
    </Provider>
  )

  expect(getAllByText(/add to basket/i)).toHaveLength(3)
  expect(getByText(/Beans/))
  expect(getByText(/Coke/))
  expect(getByText(/Oranges/))
})