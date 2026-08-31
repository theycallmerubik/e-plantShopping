import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.cost * item.quantity, 0).toFixed(2);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert("Coming Soon");
  };

  return (
    <div className="cart-container">
      <h2>Total Items in Cart: {calculateTotalItems()}</h2>
      <h2>Total Cart Amount: ${calculateTotalCost()}</h2>
      
      <div className="cart-items-list">
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Unit Price: ${item.cost}</p>
              <p>Subtotal: ${(item.cost * item.quantity).toFixed(2)}</p>
              
              <div className="quantity-controls">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
              </div>
            </div>
            <button onClick={() => handleRemove(item)} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px', cursor: 'pointer' }}>
              Delete
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
        <button className="continue-shopping-btn" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
