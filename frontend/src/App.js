import React, { useState } from 'react';
import './App.css';

const fruitOptions = ['Apple', 'Banana', 'Melon', 'Lime'];

function App() {
  const [selectedFruit, setSelectedFruit] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [basket, setBasket] = useState([]);
  const [total, setTotal] = useState('');

  const addItem = () => {
    if (!selectedFruit || quantity < 1) return;

    // Count existing items of selected fruit
    const currentCount = basket.filter(item => item === selectedFruit).length;
    const remaining = 10 - currentCount;

    // Limit to add no more the 10 type of any particular fruit
    if (remaining <= 0) {
      alert(`You can't add more than 10 ${selectedFruit}s`);
      return;
    }

    const actualQtyToAdd = Math.min(quantity, remaining);
    const newItems = Array.from({ length: actualQtyToAdd }, () => selectedFruit);
    setBasket(prev => [...prev, ...newItems]);
    setSelectedFruit('');
    setQuantity(1);
  };

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:4000/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: basket }),
    });
    const data = await res.json();
    setTotal(data.total);
  };

  return (
    <div className="container">
      <div className="card">
        <h1> Shopping Basket 🛒</h1>

        <div className="form-group">
          <select value={selectedFruit} onChange={(e) => setSelectedFruit(e.target.value)}>
            <option value="">Select Fruit</option>
            {fruitOptions.map(fruit => (
              <option key={fruit} value={fruit}>{fruit}</option>
            ))}
          </select>

          <select value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}>
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>

          <button onClick={addItem}>Add Item</button>
        </div>

        <div className="offers">
          <h3>🍒 Current Offers</h3>
          <ul>
            <li>🍈 <strong>Melon</strong> - Buy 1 Get 1 Free</li>
            <li>🟢 <strong>Lime</strong> - Get 3 for the Price of 2</li>
          </ul>
        </div>

        {basket.length > 0 && (
          <>
            {basket.length > 0 && (
              <>
                <h3>Items in Basket:</h3>
                <ul className="basket-list">
                  {Object.entries(
                    basket.reduce((acc, item) => {
                      acc[item] = (acc[item] || 0) + 1;
                      return acc;
                    }, {})
                  ).map(([fruit, count]) => (
                    <li key={fruit}>
                      {fruit} <span>x{count}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

          </>
        )}

        <button className="calc-btn" onClick={handleSubmit}>Calculate Total</button>
        {total && <h2>Total: <span>{total}</span></h2>}
      </div>
    </div>
  );
}

export default App;
