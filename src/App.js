// App.js
import React, { useState } from 'react';
import './App.css'; // Import your CSS file

const FoodItem = ({ food, onDelete, onUpdate }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={`food-item ${isChecked ? 'checked' : ''}`}>
      <h3>{food.name}</h3>
      <p>Price: Rp. {food.price}</p>
      <button onClick={() => onDelete(food.id)}>Delete</button>
      <button onClick={() => onUpdate(food.id)}>Update</button>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        id={`foodCheckbox-${food.id}`}
      />
      <label htmlFor={`foodCheckbox-${food.id}`}>Done</label>
    </div>
  );
};

const FoodList = ({ foods, onDelete, onUpdate }) => {
  return (
    <div className='food-list'>
      {foods.map((food) => (
        <FoodItem
          key={food.id}
          food={food}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

const AddFoodForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, price });
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nama Makanan"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Harga"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit">Tambah</button>
    </form>
  );
};

const App = () => {
  const [foods, setFoods] = useState([]);

  const addFood = (food) => {
    setFoods([...foods, { ...food, id: new Date().getTime(), done: false }]);
  };

  const deleteFood = (id) => {
    setFoods(foods.filter((food) => food.id !== id));
  };

  const updateFood = (id) => {
    const updateFoods = foods.map((food) => {
      if (food.id === id) {
        return { ...food, name: 'Update Food', price : 10.000 };
      }
      return food;
    });
    setFoods(updateFoods);
  };

  return (
    <div className='App'>
      <h1>Harga Makanan</h1>
      <AddFoodForm onAdd={addFood} />
      <FoodList foods={foods} onDelete={deleteFood} onUpdate={updateFood} />
    </div>
  );
};

export default App;
