import React from 'react';
import "nes.css/css/nes.min.css";
import './App.css';
import beans from "./assets/Beans.png"
import coke from "./assets/Coke.png"
import oranges from "./assets/Oranges.jpg"

function App() {
  return (
    <main className="nes-container is-rounded">
      <header>
        <h1>Beans <span role="img" aria-label="and">➕</span> Coke</h1>
        <p>At beans and coke, we love beans and we love coke. More than just a meat substitute, beans are so nutritious that the latest dietary guidelines recommend we triple our current intake from 1 to 3 cups per week.</p>
        <p>Add a glass of coke, because Together Tastes Better.</p>
      </header>
      <article>
        <section className="products">
          <article className="nes-container is-rounded card">
            <div className="card__header">
              <figure className="card__figure">
                <img src={beans} alt="" className="card__image" />
              </figure>
            </div>
            <div className="card__body">
              <h2 className="card__title">Beans</h2>
              <h3 className="card__price">
                <button className="nes-badge is-splited">
                  <span className="is-dark"><i className="nes-icon coin is-small"></i></span>
                  <span className="is-success">0.50</span>
                </button>
              </h3>
              <p className="card__copy">
                Beans and Coke <span className="nes-text is-primary">Beans</span> is a perfect addition to your dishes. Bring protein, fiber and flavor to your favorite recipes.
              </p>
            </div>
            <footer className="card__footer">
              <div className="card__actions">
                <button type="button" className="button nes-btn is-primary">
                  Add to basket
                </button>
              </div>
            </footer>
          </article>
          <article className="nes-container is-rounded card">
            <div className="card__header">
              <figure className="card__figure">
                <img src={coke} alt="" className="card__image" />
              </figure>
            </div>
            <div className="card__body">
              <h2 className="card__title">Coke</h2>
              <h3 className="card__price">
                <button className="nes-badge is-splited">
                  <span className="is-dark"><i className="nes-icon coin is-small"></i></span>
                  <span className="is-success">0.70</span>
                </button>
              </h3>
              <p className="card__copy">
                Beans and Coke <span className="nes-text is-primary">Coke</span> is crisp, delicious taste with Beans, on the go, or to share. Serve ice cold for maximum refreshment.
              </p>
            </div>
            <footer className="card__footer">
              <div className="card__actions">
                <button type="button" className="button nes-btn is-primary">
                  Add to basket
                </button>
              </div>
            </footer>
          </article>
          <article className="nes-container is-rounded card">
            <div className="card__header">
              <figure className="card__figure">
                <img src={oranges} alt="" className="card__image" />
              </figure>
            </div>
            <div className="card__body">
              <h2 className="card__title">Oranges</h2>
              <h3 className="card__price">
                <button className="nes-badge is-splited">
                  <span className="is-dark"><i className="nes-icon coin is-small"></i>/kg</span>
                  <span className="is-success">1.99</span>
                </button>
              </h3>
              <p className="card__copy">
                Beans and Coke <span className="nes-text is-primary">Oranges</span> are not intended to diagnose, treat, cure, or prevent any disease or health condition.
              </p>
              <label htmlFor="default_select">Select Quantity</label>
              <div className="nes-select">
                <select required id="default_select">
                  <option value="" disabled selected hidden>Select...</option>
                  <option value="0">200g</option>
                  <option value="1">600g</option>
                  <option value="2">800g</option>
                </select>
              </div>
            </div>
            <footer className="card__footer">
              <div className="card__actions">
                <button type="button" className="button nes-btn is-primary">
                  Add to basket
                </button>
              </div>
            </footer>
          </article>
        </section>
        <section className="basket nes-table-responsive">
          <div className="nes-container is-rounded with-title">
            <p className="title">Basket</p>
            <div className="lists">
              <ul className="nes-list is-disc">
                <li><button type="button" className="nes-btn"><i className="nes-icon close is-small"></i></button>Beans 0.50</li>
                <li><button type="button" className="nes-btn"><i className="nes-icon close is-small"></i></button>Beans 0.50</li>
                <li><button type="button" className="nes-btn"><i className="nes-icon close is-small"></i></button>Beans 0.50</li>
                <li><button type="button" className="nes-btn"><i className="nes-icon close is-small"></i></button>Coke 0.70</li>
                <li><button type="button" className="nes-btn"><i className="nes-icon close is-small"></i></button>Coke 0.70</li>
                <li><button type="button" className="nes-btn"><i className="nes-icon close is-small"></i></button>Oranges 0.200 kg @ #1.99kg 0.40</li>
                <li>----</li>
                <li>Sub-total 3.30</li>
              </ul>
            </div>
          </div>
          <div className="nes-container is-rounded with-title">
            <p className="title">Savings</p>
            <div className="lists">
              <ul className="nes-list is-circle">
                <li>Beans 3 for 2 -0.50</li>
                <li>Coke 2 for #1</li>
                <li>----</li>
                <li>Total savings -0.90</li>
              </ul>
            </div>
          </div>
          <div className="nes-container is-dark is-rounded">
            <p>Total to pay: 2.40</p>
          </div>
        </section>
      </article>
    </main >
  );
}

export default App;
