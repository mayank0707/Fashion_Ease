import { useState, createContext, useEffect } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

export const CartContext = createContext({
    items: [],
    onAddToCart : () => {},
    onUpdateToCart : () => {}
});

export default function CartContextProvider({children}){
  
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const [shoppingCart, setShoppingCart] = useState({
      items: []
  });

  useEffect(() => {
    setShoppingCart({
      items: cartItems
    });
    }, []);

  function handleAddItemToCart(id) {

    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };

        updatedItems[existingCartItemIndex] = updatedItem;

      } else {

        const product = DUMMY_PRODUCTS.find((product) => product.id === id);

        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      
      return {
        items: updatedItems,
      };
    });
  }
  
  function handleUpdateCartItemQuantity(productId, updatedQuantity) {

      setShoppingCart((prevShoppingCart) => {
        const updatedItems = [...prevShoppingCart.items];

        const updatedItemIndex = updatedItems.findIndex(
          (item) => item.id === productId
        );
  
        const updatedItem = {
          ...updatedItems[updatedItemIndex],
        };
        updatedItem.quantity += updatedQuantity;
  
        if (updatedItem.quantity <= 0) {
          updatedItems.splice(updatedItemIndex, 1);
          
        } else {
          updatedItems[updatedItemIndex] = updatedItem;
        }

        localStorage.setItem('cartItems', JSON.stringify(updatedItems));

        return {
          items: updatedItems,
        };
      });

  }
  
  const ctxValue = {
      items : shoppingCart.items,
      onAddToCart : handleAddItemToCart,
      onUpdateToCart : handleUpdateCartItemQuantity
  };

  return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
}