import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import api from '../../services/api';
import { toBRL } from '../../utils/format';
import * as CartActions from '../../store/modules/cart/actions';

function Home({ amount, addToCartRequest, history }) {
  const [products, setProducts] = useState([]);

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
    addToCartRequest(id, history);
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

const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
