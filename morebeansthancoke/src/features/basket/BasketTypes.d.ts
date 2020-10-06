import { Product } from "../products/ProductTypes";

export type BasketItem = Pick<Product, 'sku' | 'name' | 'pricePerKg' | 'pricePerUnit' | 'priceDisplayed'> & {
  uuid: string;
};

export interface OfferItem {
  id: number;
  description: string;
  savingPerUnit: number;
  savingDisplayed: string;
}

export interface BasketState {
  items: BasketItem[];
  offers: OfferItem[];
}