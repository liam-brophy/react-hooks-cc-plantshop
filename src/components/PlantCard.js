import React, { useState } from "react";

function PlantCard({plant, handleDelete, handleEdit}) {
  const [inStock, setInStock] = useState(true);

  const handleStockToggle = () => {
    setInStock((prevStockStatus) => !prevStockStatus);
  };


  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <button 
       className={inStock ? "primary" : ""} 
       onClick={handleStockToggle}
      >
      {inStock ? "In Stock" : "Out of Stock"}
      </button>

    <button className="bonusButton" onClick={() => handleDelete(plant.id)}>🗑️</button>

    <button className="bonusButton" onClick={() => handleEdit(plant)}>✏️</button>
    </li>
  );
}

export default PlantCard;
