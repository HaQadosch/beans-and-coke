import { configureStore } from '@reduxjs/toolkit'
import { render, waitFor, fireEvent, getByText, cleanup } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { store, testState } from '../../app/store'
import { Basket } from '../basket/Basket'
import { ProductCard, Products } from './Products'
import { selectProducts } from './productSlice'
import basketReducer from '../basket/basketSlice'
import productReducer from './productSlice'
import { catalog } from './catalog'

afterEach(cleanup)

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
            pricePerUnit: 0.50,
            priceDisplayed: '0.50',
            picture: 'Beans.png'
          },
        ]
      }
    })

    const { getByText, getByAltText, container } = render(
      <Provider store={ store }>
        <ProductCard { ...products[0] } />
      </Provider>
    )

    await waitFor(() => {
      expect(container.querySelector('img')?.src).toMatch(/Beans.png/i)
    })
    expect(getByText(/Beans/i, { selector: 'h2' }))
    expect(getByText(/add to basket/i))
    expect(getByText(/0.50/))
    expect(getByText(/is a perfect addition to your dishes/i))
    expect(getByAltText(/Beans/i))
  })

  test('add the item in the basket when clicking add to basket', async () => {
    const { debug, getAllByText, getByText, container } = render(
      <Provider store={ store }>
        <Products />
        <Basket />
      </Provider>
    )

    expect(getAllByText(/add to basket/i)).toHaveLength(3)
    expect(container.querySelectorAll('li button')).toHaveLength(0)

    fireEvent.click(container.querySelectorAll('button[aria-label="add Beans to basket"]')[0])
    await waitFor(() => {
      expect(container.querySelectorAll('li button')).toHaveLength(1)
    })
    expect(getByText('Beans', { selector: 'li' }))
  })

  test('add the item twice if add to basket is clicked twice', async () => {
    const storeWithEmptyBasket = configureStore({
      reducer: {
        basket: basketReducer,
        products: productReducer
      },
      preloadedState: {
        products: { products: catalog },
        basket: [],
      }
    })
    const { getAllByText, container } = render(
      <Provider store={ storeWithEmptyBasket }>
        <Products />
        <Basket />
      </Provider>
    )

    expect(getAllByText(/add to basket/i)).toHaveLength(3)
    expect(container.querySelectorAll('li button')).toHaveLength(0)

    fireEvent.click(container.querySelectorAll('button[aria-label="add Beans to basket"]')[0])
    fireEvent.click(container.querySelectorAll('button[aria-label="add Beans to basket"]')[0])
    await waitFor(() => {
      expect(container.querySelectorAll('li button')).toHaveLength(2)
    })
    expect(getAllByText('Beans', { selector: 'li' }))
  })
})