import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Product, catalog } from './catalog'

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: catalog
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}, // No actions on the catalog.
});

export const selectProducts = (state: RootState) => state.products

export default productSlice.reducer;
