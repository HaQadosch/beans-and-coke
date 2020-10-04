import React from 'react';
import { Products } from './features/products/Products';
import { Basket } from './features/basket/Basket';

import 'nes.css/css/nes.min.css';
import './App.css';

export const App: React.FC = () => {
  return (
    <main className="nes-container is-rounded">
      <header>
        <h1>Beans<span role="img" aria-label="and">➕</span>Coke</h1>
        <p>At beans and coke, we love beans and we love coke. More than just a meat substitute, beans are so nutritious that the latest dietary guidelines recommend we triple our current intake from 1 to 3 cups per week.</p>
        <p>Add a glass of coke, because Together Tastes Better.</p>
      </header>
      <article>
        <Products />
        <Basket />
      </article>
    </main>
  );
}

