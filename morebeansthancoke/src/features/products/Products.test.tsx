import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../app/store'
import { ProductCard, Products } from './Products'
import { selectProducts } from './productSlice'

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

test('renders the Beans details', () => {
  const { products } = selectProducts({
    counter: { value: 0 },
    products: {
      products: [
        {
          sku: '1',
          name: 'Beans',
          description: 'is a perfect addition to your dishes. Bring protein, fiber and flavor to your favorite recipes.',
          pricePerKg: null,
          pricePerUnit: 0.5,
          picture: 'Beans.png'
        },
      ]
    }
  })

  const { debug, getByText, getByRole } = render(
    <ProductCard { ...products[0] } />
  )
  expect(getByText(/Beans/))
  expect(getByText(/add to basket/))
  expect(getByText(/0.5/))
  expect(getByText(/is a perfect addition to your dishes/))
  debug()
})