import { configureStore } from '@reduxjs/toolkit'
import { render, fireEvent } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { Basket } from './Basket'
import basketReducer, { BasketItem } from './basketSlice'

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
        basket: []
      }
    })
    const { debug, container } = render(
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
        basket: [item1, item2, item3]
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
        basket: [item1, item2, item3]
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
})