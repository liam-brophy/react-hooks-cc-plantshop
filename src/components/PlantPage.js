import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchInput, setSearchInput] = useState("")
  const [editingPlant, setEditingPlant] = useState(null);

//DATA FETCHING
  useEffect(() => {  //DATA FETCHING
    (async () => {
      try {
        const resp = await fetch("http://localhost:6001/plants")
        const data = await resp.json()
        setPlants(data)
      } catch (error) {
        alert(error.message)
      }
    })()
  }, [])

  //SEARCH Function
  const handleSearch = (value) => {  //SEARCH FUNCTION to pass down
    setSearchInput(value)
  }

//FORM SUBMIT function
  const handlePlantFormSubmit = (savedPlant) => {
    if (editingPlant) {
      //updated plant to state
      setPlants(plants.map((plant) => (plant.id === editingPlant.id ? savedPlant : plant)));
    } else {
      //new plant to state
      setPlants([...plants, savedPlant]);
    }
  };

//EDITING RESET function
  const resetEditingPlant = () => setEditingPlant(null);

  const handleEdit = (plant) => {
    setEditingPlant(plant);
  };

// // scrapped EDITING function
  // const handleEditPlant = async (updatedPlant) => {
  //   try {
  //     const response = await fetch(`http://localhost:6001/plants/${editingPlant.id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedPlant),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to update the plant");
  //     }

  //     setPlants(
  //       plants.map((plant) =>
  //         plant.id === editingPlant.id ? { ...plant, ...updatedPlant } : plant
  //       )
  //     );

  //     setEditingPlant(null); //reset state?
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("Something went wrong while editing the plant.");
  //   }
  // };


//DELETE function
  const handleDelete = async (id) => {
    try {
      // Send DELETE request to the backend
      const response = await fetch(`http://localhost:6001/plants/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the plant");
      }

      // Remove the deleted plant from state
      setPlants(plants.filter((plant) => plant.id !== id));
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while deleting the plant.");
    }
  };


  return (
    <main>
      <NewPlantForm onPlantFormSubmit={handlePlantFormSubmit} editingPlant={editingPlant} resetEditingPlant={resetEditingPlant} />
      <Search handleSearch={handleSearch} />
      <PlantList plants={plants} searchInput={searchInput} handleDelete={handleDelete} handleEdit={handleEdit} />
    </main>
  );
}

export default PlantPage;
