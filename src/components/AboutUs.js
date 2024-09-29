import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AboutUsSection = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="about-us-section bg-sc py-20 text-center w-full rounded-md">
      <div className="w-full px-4">
      
        <h2 className="text-4xl font-bold text-pr mb-8">A little bit <span className="text-st underline">about us</span>.</h2>

        <p className="text-m text-pr mb-8 max-w-3xl mx-auto">
          PawPal is dedicated to finding forever homes for every stray and abandoned animal. With love and care, we rescue animals, provide them with shelter, and connect them with loving families. Each wagging tail and purring kitten brings hope for a brighter future. Come be a part of our mission to make a difference in the lives of these amazing animals.
        </p>

        <button
          className="px-6 py-3 bg-st text-white rounded-lg shadow-lg hover:bg-sc transition duration-300"
          onClick={() => navigate('/volunteer')} // Correct use of navigate
        >
          Want to volunteer?
        </button>
      </div>
    </div>
  );
};

export default AboutUsSection;
