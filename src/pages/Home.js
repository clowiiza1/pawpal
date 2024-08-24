import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className=" bg-pr text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to PawPal</h1>
      <p className="text-lg mb-8">Find a Friend, Make a Difference.</p>
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
