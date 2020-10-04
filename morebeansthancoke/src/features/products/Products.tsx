import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Product } from './catalog'
import { selectProducts } from './productSlice'
import './products.css'
import { addItem } from '../basket/basketSlice'

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

export const ProductCard: React.FC<Product> = ({ sku, name, description, pricePerKg, priceDisplayed, picture }) => {
  const [picSrc, setPicSrc] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    import(`../../assets/${ picture }`).then(src => {
      setPicSrc(src.default)
    })
  }, [picture])

  return (
    <article className="nes-container is-rounded card">
      <div className="card__header">
        <figure className="card__figure">
          <img src={ picSrc } alt={ name } className="card__image" />
        </figure>
      </div>
      <div className="card__body">
        <h2 className="card__title">{ name }</h2>
        <h3 className="card__price">
          <button className="nes-badge is-splited">
            <span className="is-dark"><i className="nes-icon coin is-small"></i>{ pricePerKg ? '/kg' : '' }</span>
            <span className="is-success">{ priceDisplayed }</span>
          </button>
        </h3>
        <p className="card__copy">
          Beans and Coke <span className="nes-text is-primary">{ name }</span> { description }
        </p>
      </div>
      <footer className="card__footer">
        <div className="card__actions">
          <button type="button" onClick={ () => dispatch(addItem(sku)) } className="button nes-btn is-primary" aria-label={`add ${name} to basket`}>
            Add to basket
          </button>
        </div>
      </footer>
    </article>
  )
}