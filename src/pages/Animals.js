import React, { useEffect, useState } from 'react';
import AnimalTable from '../components/AnimalTable';

const Animals = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    // Fetch animal data from backend API
    fetch('/api/animals')
      .then(response => response.json())
      .then(data => setAnimals(data));
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Available Animals for Adoption</h2>
      <AnimalTable animals={animals} />
    </div>
  );
};

export default Animals;
