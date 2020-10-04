import React from 'react'
import { useSelector } from 'react-redux'
import { Product } from './catalog'
import { selectProducts } from './productSlice'

interface IProducts {

}

export const Products: React.FC<IProducts> = () => {
  const { products } = useSelector(selectProducts)

  return (
    <section className="products"> {
      products.map((product: Product) =>
        <ProductCard key={ product.sku } { ...product } />
      )
    }</section>
  )
}

const ProductCard: React.FC<Product> = ({ sku, name, description, pricePerKg, pricePerUnit, picture }) => {
  return (
    <article className="nes-container is-rounded card">
      add to basket - { name }
    </article>
  )
}