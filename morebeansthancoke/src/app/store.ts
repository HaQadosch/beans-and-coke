import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productSlice'
import basketReducer from '../features/basket/basketSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    basket: basketReducer
  },
});

export const testState = {
  basket: {
    items: [],
    offers: []
  },
  products: {
    products: [
    ]
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
