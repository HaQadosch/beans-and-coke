import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './basket.css'
import { removeItem, selectBasket } from './basketSlice'

export const Basket: React.FC = () => {
  const { basket } = useSelector(selectBasket)
  const dispatch = useDispatch()

  return (
    <section className="basket nes-table-responsive">
      <div className="nes-container is-rounded with-title">
        <p className="title">Basket</p>
        <div className="lists">
          <ul className="nes-list is-disc">
            { basket.map(({ uuid, name, priceDisplayed }) => (
              <li key={ uuid }>
                <button type="button" onClick={ () => dispatch(removeItem(uuid)) } className="nes-btn"><i className="nes-icon close is-small"></i></button>
                { name } { ' ' }
                <span className="nes-text is-success">{ priceDisplayed }</span>
              </li>
            )) }
            <li>----</li>
            <li>Sub-total <span className="nes-text is-success">{
              basket.reduce((acc, curr) => (curr.pricePerKg || curr.pricePerUnit || 0) + acc, 0).toFixed(2)
            }</span></li>
          </ul>
        </div>
      </div>
      <div className="nes-container is-rounded with-title">
        <p className="title">Savings</p>
        <div className="lists">
          <ul className="nes-list is-circle">
            <li>Beans 3 for 2 <span className="nes-text is-success">-0.50</span></li>
            <li>Coke 2 for #1 <span className="nes-text is-success">-0.40</span></li>
            <li>----</li>
            <li>Total savings <span className="nes-text is-success">-0.90</span></li>
          </ul>
        </div>
      </div>
      <div className="nes-container is-dark is-rounded">
        <p>Total to pay: <span className="nes-text is-success">2.40</span></p>
      </div>
    </section>
  )
}