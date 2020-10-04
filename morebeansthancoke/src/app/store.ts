import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productsReducer from '../features/products/productSlice'
import basketReducer from '../features/basket/basketSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
    basket: basketReducer
  },
});

export const testState = {
  counter: { value: 0 },
  basket: [],
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
