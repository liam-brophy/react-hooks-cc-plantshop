import React, { useEffect, useState } from "react";

function NewPlantForm({onPlantFormSubmit, editingPlant, resetEditingPlant}) {
  const [plantName, setPlantName] = useState("");
  const [plantImage, setPlantImage] = useState("");
  const [plantPrice, setPlantPrice] = useState("");
  

  useEffect(() => { //if editing a plant, have the form start with the existing values
    if (editingPlant) {
      setPlantName(editingPlant.name);
      setPlantImage(editingPlant.image);
      setPlantPrice(editingPlant.price);
    } else {
      resetForm();
    }
  }, [editingPlant]); //editingPlant is the state variable, a dependency

  const resetForm = () => {
    setPlantName("");
    setPlantImage("");
    setPlantPrice("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedPlant = {
      name: plantName,
      image: plantImage,
      price: plantPrice,
    };
  
    try {
      let response;
      if (editingPlant) {
        //update an existing plant
        response = await fetch(`http://localhost:6001/plants/${editingPlant.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "Application/JSON",
          },
          body: JSON.stringify(updatedPlant),
        });
      } else {
        //create a new plant
        response = await fetch("http://localhost:6001/plants", {
          method: "POST",
          headers: {
            "Content-Type": "Application/JSON",
          },
          body: JSON.stringify(updatedPlant),
        });
      }

      if (response.ok) {
        const savedPlant = await response.json();
        onPlantFormSubmit(savedPlant); // update state with new data
        resetForm();
        resetEditingPlant(); // function from PlantPage
      } else {
        throw new Error(editingPlant ? "Failed to update the plant" : "Failed to add the plant");
      }
    } catch (error) {
      // console.error("Error:", error);
      // alert("Something went wrong.");
    }
  };


  return (
    <div className="new-plant-form" onSubmit={handleSubmit}> 
      <h2>New Plant</h2>
      <form>
        <input type="text" name="name" placeholder="Plant name" value={plantName} 
          onChange={(e) => setPlantName(e.target.value)} />
        <input type="text" name="image" placeholder="Image URL" value={plantImage} 
          onChange={(e) => setPlantImage(e.target.value)} />
        <input type="number" name="price" step="0.01" placeholder="Price" value={plantPrice}
          onChange={(e) => setPlantPrice(e.target.value)} />
        <button type="submit">{editingPlant ? "Update Plant" : "Add Plant"}</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
