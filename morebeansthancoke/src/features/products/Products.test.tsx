import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { store, testState } from '../../app/store'
import { ProductCard, Products } from './Products'
import { selectProducts } from './productSlice'

describe('<Product />', () => {
  test('renders the list of products available in the store', () => {
    const { debug, getAllByText, getByText } = render(
      <Provider store={ store }>
        <Products />
      </Provider>
    )

    expect(getAllByText(/add to basket/i)).toHaveLength(3)
    expect(getByText(/Beans/i, { selector: 'h2' }))
    expect(getByText(/Coke/i, { selector: 'h2' }))
    expect(getByText(/Oranges/i, { selector: 'h2' }))
  })

  test('renders the Beans details', async () => {
    const { products } = selectProducts({
      ...testState,
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

    const { getByText, getByAltText, container } = render(
      <ProductCard { ...products[0] } />
    )

    await waitFor(() => {
      expect(container.querySelector('img')?.src).toMatch(/Beans.png/i)
    })
    expect(getByText(/Beans/i, { selector: 'h2' }))
    expect(getByText(/add to basket/i))
    expect(getByText(/0.5/))
    expect(getByText(/is a perfect addition to your dishes/i))
    expect(getByAltText(/Beans/i))
  })
})