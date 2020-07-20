import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import api from '../../services/api';
import { toBRL } from '../../utils/format';
import * as CartActions from '../../store/modules/cart/actions';

function Home({ history }) {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const amount = useSelector((state) =>
    state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount;
      return amount;
    }, {})
  );

  useEffect(() => {
    async function loadResources() {
      const response = await api.get('/products');

      const data = response.data.map((value) => ({
        ...value,
        priceFormatted: toBRL(value.price),
      }));

      setProducts(data);
    }

    loadResources();
  }, []);

  function handleAddToCart(id) {
    dispatch(CartActions.addToCartRequest(id, history));
  }
  return (
    <ProductList>
      {products.map((value) => (
        <li key={value.id}>
          <img src={value.image} alt="shoes" />

          <strong>{value.title}</strong>
          <span>{value.priceFormatted}</span>

          <button type="button" onClick={() => handleAddToCart(value.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />{' '}
              {amount[value.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

export default Home;
