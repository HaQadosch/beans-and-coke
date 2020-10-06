export interface Product {
  sku: string;
  name: string;
  description: string;
  priceDisplayed: string;
  pricePerUnit: number | null;
  pricePerKg: number | null;
  picture: string;
}

export interface ProductsState {
  products: Product[];
}