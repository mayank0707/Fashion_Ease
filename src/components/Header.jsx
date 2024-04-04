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
        <div className='main-header-buttons'>
          <button >
            Favorites <svg xmlns="http://www.w3.org/2000/svg" className='heart-icon' width="24.336" height="20.954" viewBox="0 0 24.336 20.954">
                        <path id="Path_422" data-name="Path 422" d="M10.053,15.879A6.721,6.721,0,0,1,13.46,13.7a5.391,5.391,0,0,1,5.552,2.1,5.224,5.224,0,0,1,.217,5.788,7.9,7.9,0,0,1-1.084,1.3q-3.6,3.573-7.232,7.119c-.779.764-.99.764-1.765,0-2.579-2.542-5.194-5.051-7.72-7.644A5.016,5.016,0,0,1,.958,15.9a5.41,5.41,0,0,1,8.114-.938c.314.276.612.569.98.913" transform="translate(1.188 -12.545)" fill="#ffa602" stroke="black" strokeLinecap="round" strokeWidth="2"></path>
                    </svg>
          </button>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </div>
      </header>
    </>
  );
}
