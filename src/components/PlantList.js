import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, searchInput, handleDelete, handleEdit  }) {
  // console.log("Searching with input:", searchInput); // debug

  const filteredPlants = plants.filter(plant =>
    searchInput ? plant.name.toLowerCase().includes(searchInput.toLowerCase()) : true
  );
  // console.log("Filtered plants:", filteredPlants); //debug


  return (
    <ul className="cards">
      {filteredPlants.map((filteredPlant) => (
        <PlantCard key={filteredPlant.id} plant={filteredPlant} handleDelete={handleDelete} handleEdit={handleEdit}/>
      ))}
    </ul>
  );
}

export default PlantList;
