import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const plantsArray = [
  {
    category: "Air Purifying Plants",
    plants: [
      { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae2b7e", cost: 15 },
      { name: "Spider Plant", image: "https://images.unsplash.com/photo-1612053075218-c2b4870f7d54", cost: 12 },
      { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593696954577-16d8bd2d334e", cost: 18 },
      { name: "Boston Fern", image: "https://images.unsplash.com/photo-1596409562768-b71007acb362", cost: 14 },
      { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651", cost: 22 },
      { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361", cost: 25 }
    ]
  },
  {
    category: "Aromatic Plants",
    plants: [
      { name: "Lavender", image: "https://images.unsplash.com/photo-1595806622415-3232810a95e0", cost: 20 },
      { name: "Rosemary", image: "https://images.unsplash.com/photo-1594917411267-33eb97c11fcc", cost: 18 },
      { name: "Mint", image: "https://images.unsplash.com/photo-1601758125946-6be59f237ebc", cost: 10 },
      { name: "Lemon Balm", image: "https://images.unsplash.com/photo-1615569429188-75d1dcb74b0c", cost: 14 },
      { name: "Chamomile", image: "https://images.unsplash.com/photo-1602498456745-e9503b30470b", cost: 15 },
      { name: "Thyme", image: "https://images.unsplash.com/photo-1595834863380-60b6b281f6bc", cost: 12 }
    ]
  },
  {
    category: "Succulents",
    plants: [
      { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9fc5d8d4284b", cost: 10 },
      { name: "Jade Plant", image: "https://images.unsplash.com/photo-1592489637775-6f913d9418af", cost: 14 },
      { name: "Echeveria", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b", cost: 8 },
      { name: "Zebra Plant", image: "https://images.unsplash.com/photo-1601004812389-8d7ed25ba6b4", cost: 12 },
      { name: "String of Pearls", image: "https://images.unsplash.com/photo-1618355201121-6d73eb8b2fb7", cost: 16 },
      { name: "Bunny Ears Cactus", image: "https://images.unsplash.com/photo-1594098905273-030ec603411b", cost: 11 }
    ]
  }
];

const ProductList = ({ onBackToHome }) => {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo" onClick={onBackToHome} style={{ cursor: 'pointer' }}>
          <h2>Paradise Nursery</h2>
        </div>
        <div className="nav-links">
          <a onClick={onBackToHome}>Home</a>
          <a onClick={() => setShowCart(false)}>Plants</a>
          <a onClick={() => setShowCart(true)}>
            Cart ({totalItems})
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-list-container">
          {plantsArray.map((category, index) => (
            <div key={index} className="category-section">
              <h2 style={{ textAlign: 'center', marginTop: '20px' }}>{category.category}</h2>
              <div className="product-grid">
                {category.plants.map((plant, plantIndex) => {
                  const isInCart = cartItems.some(item => item.name === plant.name);
                  
                  return (
                    <div key={plantIndex} className="plant-card">
                      <img src={plant.image} alt={plant.name} />
                      <h3>{plant.name}</h3>
                      <p>${plant.cost}</p>
                      <button 
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(plant)}
                        disabled={isInCart}
                      >
                        {isInCart ? "Added" : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
};

export default ProductList;
