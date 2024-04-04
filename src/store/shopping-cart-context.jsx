import { useState, createContext, useEffect } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

export const CartContext = createContext({
    items: [],
    favoriteItem : [],
    onAddToCart : () => {},
    onUpdateToCart : () => {},
    onAddToFavorite : () => {}
});

export default function CartContextProvider({children}){
  
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const favoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];

  const [shoppingCart, setShoppingCart] = useState({
      items: []
  });

  const [favoriteShoppingItem, setFavoriteShoppingItems] = useState({
      favoriteItem: []
  });

  useEffect(() => {
    setShoppingCart({
      items: cartItems
    });
    }, []);
  
  useEffect(() => {
    setFavoriteShoppingItems({
      favoriteItem: favoriteItems
    });
  }, []);

  function handleAddToFavorite(id){
    setFavoriteShoppingItems((prevFavoriteItems)=>{
      const favorite = [...prevFavoriteItems.favoriteItem];    
      const existingFavoriteItemIndex = favorite.findIndex((item)=>item.id === id);
      const existingFavItem = favorite[existingFavoriteItemIndex];

      if(existingFavItem){
        favorite.pop(id);
      }
      else{
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        favorite.push({
          id: id,
          name: product.title,
          price: product.price
        });
      }
      
      localStorage.setItem('favoriteItems', JSON.stringify(favorite));

      return {
        favoriteItem: favorite,
      };
    });
  }

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
      favoriteItem : favoriteShoppingItem.favoriteItem,
      onAddToCart : handleAddItemToCart,
      onUpdateToCart : handleUpdateCartItemQuantity,
      onAddToFavorite : handleAddToFavorite
  };

  return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
}