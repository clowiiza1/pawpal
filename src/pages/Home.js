import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to SPCA Shelter</h1>
      <p className="text-lg mb-8">Find your forever friend or volunteer to help our animals.</p>
      <Link to="/animals" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        View Animals
      </Link>
      <Link to="/volunteer" className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Volunteer
      </Link>
    </div>
  );
};

export default Home;
