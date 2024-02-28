import { useRef, useContext } from 'react';
import { CartContext } from '../store/shopping-cart-context.jsx';

import CartModal from './CartModal.jsx';

export default function Header() {

  const modal = useRef();
  const {items} = useContext(CartContext);
  let  cartQuantity = 0;
  items.map(item => {
    cartQuantity += item.quantity;
  });

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modal}
        title="Your Cart"
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Fashion Ease</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
