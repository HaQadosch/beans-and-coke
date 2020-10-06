
import { BasketItem, BasketState } from "./BasketTypes";
import reducer from './basketSlice'

describe('basket/removeItem', () => {
  test('noop if the basket is already empty', () => {
    const originState: BasketState = {
      items: [],
      offers: []
    }
    const newState = reducer(originState, { type: 'basket/removeItem', payload: 'uuid' });
    expect(newState.items).toEqual(originState.items);
  });

  test('noop if the uuid is not found', () => {
    const originState: BasketState = {
      items: [
        {
          sku: '1',
          name: 'Beans',
          pricePerKg: null,
          pricePerUnit: 0.5,
          priceDisplayed: '0.50',
          uuid: '7af8273b-0065-487e-96ed-30d89ff48ca3'
        }
      ],
      offers: []
    }
    const newState = reducer(originState, { type: 'basket/removeItem', payload: 'uuid' });
    expect(newState.items).toEqual(originState.items);
  });

  test('removes only the element with the matching uuid', () => {
    const targetItem: BasketItem = {
      sku: '1',
      name: 'Beans',
      pricePerKg: null,
      pricePerUnit: 0.5,
      priceDisplayed: '0.50',
      uuid: '86b71838-f2cc-4425-9c78-1575984a68be'
    }

    const item1: BasketItem = {
      sku: '1',
      name: 'Beans',
      pricePerKg: null,
      pricePerUnit: 0.5,
      priceDisplayed: '0.50',
      uuid: 'd5879246-60e4-4da0-b2f5-d85a3dd129a0'
    }
    const item2: BasketItem = {
      sku: '1',
      name: 'Beans',
      pricePerKg: null,
      pricePerUnit: 0.5,
      priceDisplayed: '0.50',
      uuid: '4a5a0d13-e39c-4b70-b506-71fa635d6f60'
    }

    const originState: BasketState = {
      items: [item1, targetItem, item2],
      offers: []
    }

    const newState = reducer(originState, { type: 'basket/removeItem', payload: targetItem.uuid });
    expect(newState.items).toEqual(expect.arrayContaining([item1, item2]))
    expect(newState.items).not.toEqual(expect.arrayContaining([targetItem]))
    expect(newState.items).toHaveLength(2) // makes sure it doesn't add extra item.
  })
})

describe('basket/addItem', () => {
  test('noop if no payload', () => {
    const originState: BasketState = {
      items: [],
      offers: []
    }
    const newState = reducer(originState, { type: 'basket/addItem' });
    expect(newState.items).toEqual(originState.items);
  })

  test('noop if payload is a sku not in the catalog', () => {
    const originState: BasketState = {
      items: [],
      offers: []
    }
    const newState = reducer(originState, { type: 'basket/addItem', payload: 'notInTheCalog' });
    expect(newState.items).toEqual(originState.items);
  })

  test('add the item with the sku matching the payload', () => {
    const originState: BasketState = {
      items: [],
      offers: []
    }
    const newState = reducer(originState, { type: 'basket/addItem', payload: '1' });
    expect(newState.items).toHaveLength(1);
    expect(newState.items[0]).toHaveProperty('sku', '1')
    expect(newState.items[0]).toHaveProperty('name', 'Beans')
  })
})