import { configureStore } from '@reduxjs/toolkit'
import { render, fireEvent, within, waitFor, cleanup } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { Products } from '../products/Products'
import { Basket } from './Basket'
import basketReducer, { BasketItem } from './basketSlice'
import productReducer from '../products/productSlice'
import { catalog } from '../products/catalog'

afterEach(cleanup)

const item1: BasketItem = {
  sku: '1',
  name: 'Beans',
  pricePerKg: null,
  pricePerUnit: 0.5,
  priceDisplayed: '0.50',
  uuid: 'd5879246-60e4-4da0-b2f5-d85a3dd129a0'
}
const item2: BasketItem = {
  sku: '2',
  name: 'Coke',
  pricePerKg: null,
  pricePerUnit: 0.7,
  priceDisplayed: '0.70',
  uuid: '5a5e9e7b-bda8-4056-b54a-e677962ce4f1'
}
const item3: BasketItem = {
  sku: '3',
  name: 'Oranges',
  pricePerKg: 1.99,
  pricePerUnit: null,
  priceDisplayed: '1.99',
  uuid: 'cb6fe7c5-58a4-410c-954d-4a2f70461d3e'
}

describe('<Basket />', () => {
  test('renders an empty list if the basket is empty', () => {
    const store = configureStore({
      reducer: {
        basket: basketReducer
      },
      preloadedState: {
        basket: {
          items: [],
          offers: []
        }
      }
    })
    const { container } = render(
      <Provider store={ store }>
        <Basket />
      </Provider>
    )

    expect(container.querySelectorAll('button')).toHaveLength(0)
  })

  test('renders the list of items in the basket', () => {
    const store = configureStore({
      reducer: {
        basket: basketReducer
      },
      preloadedState: {
        basket: {
          items: [item1, item2, item3],
          offers: []
        }
      }
    })
    const { debug, container, getByText } = render(
      <Provider store={ store }>
        <Basket />
      </Provider>
    )

    expect(container.querySelectorAll('button')).toHaveLength(3)
    expect(getByText(/beans/i))
    expect(getByText(/0.50/i))
    expect(getByText(/coke/i))
    expect(getByText(/0.70/i))
    expect(getByText(/oranges/i))
    expect(getByText(/1.99/i))
  })

  test('removes the item when the X button is clicked', () => {
    const store = configureStore({
      reducer: {
        basket: basketReducer
      },
      preloadedState: {
        basket: {
          items: [item1, item2, item3],
          offers: []
        },
      }
    })
    const { debug, container, getByText } = render(
      <Provider store={ store }>
        <Basket />
      </Provider>
    )

    // Click the X button of the second item (Coke)
    expect(container.querySelectorAll('button')).toHaveLength(3)

    fireEvent.click(container.querySelectorAll('button')[1])
    expect(container.querySelectorAll('button')).toHaveLength(2)
    expect(getByText(/beans/i))
    expect(getByText(/oranges/i))
  })

  describe('Basket total price', () => {
    test('total is 0 when basket is empty', () => {
      const store = configureStore({
        reducer: {
          basket: basketReducer
        },
        preloadedState: {
          basket: {
            items: [],
            offers: []
          },
        }
      })
      const { getByText } = render(
        <Provider store={ store }>
          <Basket />
        </Provider>
      )

      const basketTotal = getByText('Sub-total')
      within(basketTotal).getByText('0.00')
    })

    test('total is the sum of the prices of the listed articles', async () => {
      const store = configureStore({
        reducer: {
          basket: basketReducer,
          products: productReducer
        },
        preloadedState: {
          basket: {
            items: [item1, item2, item3],
            offers: []
          },
          products: { products: catalog }
        }
      })
      const { getByText, container, debug } = render(
        <Provider store={ store }>
          <Products />
          <Basket />
        </Provider>
      )

      const basketTotal = getByText('Sub-total')
      within(basketTotal).getByText('3.19') // 0.5 + 0.7 + 1.99

      // adding an article
      fireEvent.click(container.querySelectorAll('button[aria-label="add Beans to basket"]')[0])
      await waitFor(() => {
        within(basketTotal).getByText('3.69') // 0.5 + 0.7 + 1.99 + 0.5
      })

      // removing an article
      fireEvent.click(container.querySelectorAll('li button')[0])
      await waitFor(() => {
        within(basketTotal).getByText('3.19') // 0.7 + 1.99 + 0.5
      })
    })

  })
})