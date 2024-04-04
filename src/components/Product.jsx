import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context.jsx";

export default function Product({
  id,
  image,
  title,
  price,
  description
}) {

  const {items, favoriteItem, onAddToCart, onUpdateToCart, onAddToFavorite} = useContext(CartContext);

  let itemQuantity, element, isFavorite, favoriteElement;

  if(items !== undefined && items.length > 0){
    element = items.find((item)=> item.id === id);
    
    if (element !== undefined) {
      itemQuantity = element.quantity;
    }
  }

  if(favoriteItem !==undefined && favoriteItem.length > 0){
    favoriteElement = favoriteItem.find((item)=>item.id === id);

    if(favoriteElement !== undefined){
      isFavorite = true;
    }
    else{
      isFavorite = false;
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
        <div className="favorite-addCart">
          <button  onClick={()=>onAddToFavorite(id)} className="heart-button">
            {isFavorite ? 
              (
                <svg xmlns="http://www.w3.org/2000/svg" width="24.336" height="20.954" viewBox="0 0 24.336 20.954">
                  <path id="Path_422" data-name="Path 422" d="M10.053,15.879A6.721,6.721,0,0,1,13.46,13.7a5.391,5.391,0,0,1,5.552,2.1,5.224,5.224,0,0,1,.217,5.788,7.9,7.9,0,0,1-1.084,1.3q-3.6,3.573-7.232,7.119c-.779.764-.99.764-1.765,0-2.579-2.542-5.194-5.051-7.72-7.644A5.016,5.016,0,0,1,.958,15.9a5.41,5.41,0,0,1,8.114-.938c.314.276.612.569.98.913" transform="translate(1.188 -12.545)" fill="#f4b115" stroke="#f4b115" strokeLinecap="round" strokeWidth="2"></path>
                </svg>
              ):
              (
                <svg xmlns="http://www.w3.org/2000/svg" width="24.336" height="20.954" viewBox="0 0 24.336 20.954">
                  <path id="Path_422" data-name="Path 422" d="M10.053,15.879A6.721,6.721,0,0,1,13.46,13.7a5.391,5.391,0,0,1,5.552,2.1,5.224,5.224,0,0,1,.217,5.788,7.9,7.9,0,0,1-1.084,1.3q-3.6,3.573-7.232,7.119c-.779.764-.99.764-1.765,0-2.579-2.542-5.194-5.051-7.72-7.644A5.016,5.016,0,0,1,.958,15.9a5.41,5.41,0,0,1,8.114-.938c.314.276.612.569.98.913" transform="translate(1.188 -12.545)" fill="#c1d8ef" stroke="#c1d8ef" strokeLinecap="round" strokeWidth="2"></path>c
                </svg>
              )
            }
            <div className="heart-tooltip">Mark Favorite</div> {/* Tooltip */}
          </button>
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
      </div>
    </article>
  );
}
