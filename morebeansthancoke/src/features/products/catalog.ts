export interface Product {
  sku: string
  name: string
  description: string
  pricePerUnit: number | null
  pricePerKg: number | null
  picture: string
}

export const beans: Product = {
  sku: '1',
  name: 'Beans',
  description: 'is a perfect addition to your dishes. Bring protein, fiber and flavor to your favorite recipes.',
  pricePerKg: null,
  pricePerUnit: 0.50,
  picture: 'Beans.png'
}
export const coke: Product = {
  sku: '2',
  name: 'Coke',
  description: 'is crisp, delicious taste with Beans, on the go, or to share. Serve ice cold for maximum refreshment.',
  pricePerKg: null,
  pricePerUnit: 0.70,
  picture: 'Coke.png'
}
export const oranges: Product = {
  sku: '3',
  name: 'Oranges',
  description: 'are not intended to diagnose, treat, cure, or prevent any disease or health condition.',
  pricePerKg: 1.99,
  pricePerUnit: null,
  picture: 'Oranges.jpg'
}

export const catalog: Product[] = [
  beans,
  coke,
  oranges
]