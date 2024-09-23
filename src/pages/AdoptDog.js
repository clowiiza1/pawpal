import React, { useEffect, useState } from 'react';
import DogCard from '../components/DogCard';
import { getAnimals } from '../apis/api'; // Import the function from your api.js file

const AdoptDog = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    // Fetch animals from backend when the component mounts
    const fetchAnimals = async () => {
      const fetchedAnimals = await getAnimals(); // Call the function from api.js
      setAnimals(fetchedAnimals);
    };

    fetchAnimals();
  }, []);

  return (
    <div className="min-h-screen bg-pr py-10"> {/* Using custom colors defined in your Tailwind config */}
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-sc mb-8">Loveable Puppies & Dogs</h1> {/* Custom color for text */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            className="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sc"
            placeholder="I'm looking for a dog that..."
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {animals.length > 0 ? (
            animals.map((animal) => (
              <DogCard key={animal.id} dog={animal} /> // Pass the animal object as props
            ))
          ) : (
            <p className="text-center col-span-3 text-lg text-br">No dogs available for adoption at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdoptDog;
