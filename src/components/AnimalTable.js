import React from 'react';

const AnimalTable = ({ animals }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/3 px-4 py-2">Name</th>
            <th className="w-1/3 px-4 py-2">Type</th>
            <th className="w-1/3 px-4 py-2">Breed</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.id} className="text-center">
              <td className="border px-4 py-2">{animal.name}</td>
              <td className="border px-4 py-2">{animal.type}</td>
              <td className="border px-4 py-2">{animal.breed}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnimalTable;
