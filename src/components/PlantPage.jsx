import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => {
        const plantsWithStock = data.map((plant) => ({
          ...plant,
          soldOut: plant.soldOut ?? false,
        }));
        setPlants(plantsWithStock);
      });
  }, []);

  function handleAddPlant(newPlant) {
    setPlants((currentPlants) => [
      ...currentPlants,
      { ...newPlant, soldOut: newPlant.soldOut ?? false },
    ]);
  }

  function handleToggleSoldOut(plantId) {
    setPlants((currentPlants) =>
      currentPlants.map((plant) =>
        plant.id === plantId ? { ...plant, soldOut: !plant.soldOut } : plant
      )
    );
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={filteredPlants} onToggleSoldOut={handleToggleSoldOut} />
    </main>
  );
}

export default PlantPage;
