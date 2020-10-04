import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './basket.css'
import { removeItem, selectBasket } from './basketSlice'

interface IBasket {

}

export const Basket: React.FC<IBasket> = () => {
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
            <li>Sub-total <span className="nes-text is-success">3.30</span></li>
          </ul>
        </div>
      </div>
    </section>
  )
}