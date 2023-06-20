export const cartLocalStorageMiddleware = ({ getState }) => next => action => {
  const result = next(action);

  if (action.type === 'cart/addToCart' || action.type === 'cart/removeFromCart' || action.type === 'cart/increaseQuantity' || action.type === 'cart/decreaseQuantity') {
    const cartState = getState().cart;
    localStorage.setItem('cart', JSON.stringify(cartState));
  }

  return result;
};


