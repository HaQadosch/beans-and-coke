import { catalog } from './../products/catalog';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Product } from "../products/ProductTypes";
import { v4 as uuidv4 } from 'uuid';
import { BasketState } from './BasketTypes';

const initialState: BasketState = {
  items: [],
  offers: []
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    // { type: 'basket/addItem', payload: '1' }
    addItem: (state, action: PayloadAction<Product['sku']>) => {
      const [foundItem] = catalog
        .filter(({ sku }) => sku === action.payload)
        .map(({ sku, name, pricePerKg, pricePerUnit, priceDisplayed }) => ({ sku, name, pricePerKg, pricePerUnit, priceDisplayed, uuid: uuidv4() }))
      if (foundItem?.sku !== undefined) state.items.push(foundItem)
    },
    // { type: 'basket/removeItem', payload: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' }
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(({ uuid }) => uuid !== action.payload)
    },
  },
});

export const { addItem, removeItem } = basketSlice.actions;

export const selectBasket = (state: RootState) => state;

export default basketSlice.reducer;
