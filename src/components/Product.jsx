import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context.jsx";

export default function Product({
  id,
  image,
  title,
  price,
  description
}) {

  const {items, onAddToCart, onUpdateToCart} = useContext(CartContext);

  let itemQuantity, element;

  if(items !== undefined && items.length > 0){
    element = items.find((item)=> item.id === id);
    
    if (element !== undefined) {
      itemQuantity = element.quantity;
    }
  }

  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className='product-price'>${price}</p>
          <p>{description}</p>
        </div>
        {(itemQuantity ===undefined || itemQuantity===0) && 
          (<p className='product-actions'>
            <button onClick={() => onAddToCart(id)}>Add to Cart</button>
          </p>)}
        {itemQuantity >0 && 
        (<div className="product-item-actions">
          <button onClick={() => onUpdateToCart(element.id, -1)}>
            -
          </button>
          {itemQuantity}
          <button onClick={() => onUpdateToCart(element.id, 1)}>
            +
          </button>
        </div>)}
      </div>
    </article>
  );
}
