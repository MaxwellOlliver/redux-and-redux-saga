import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';

import * as CartActions from '../../store/modules/cart/actions';
import { toBRL } from '../../utils/format';

function Cart({ cart, removeFromCart, updateAmountRequest, total }) {
  function handleRemoveProduct(product) {
    removeFromCart(product.id);
  }

  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="imagem" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="remove" />
          </tr>
        </thead>
        <tbody>
          {cart.map((value) => (
            <tr>
              <td>
                <img src={value.image} alt="shoes" />
              </td>
              <td>
                <strong>{value.titel}</strong>
                <span>R$129,90</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(value)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={value.amount} />
                  <button type="button" onClick={() => increment(value)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{value.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(value)}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart.map((value) => ({
    ...value,
    subtotal: toBRL(value.price * value.amount),
  })),
  total: toBRL(
    state.cart.reduce((acc, cur) => cur.price * cur.amount + acc, 0)
  ),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
