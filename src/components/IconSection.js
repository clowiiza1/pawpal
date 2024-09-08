import React, { useState } from 'react';
import './IconSection.css'; // Separate CSS for the icon section
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import catStatic from './cat-static.png'; // Add a static version of the cat icon
import dogStatic from './dog-static.png'; // Add a static version of the dog icon
import volunteerStatic from './volunteer-static.png';

const IconSection = () => {
  // Hover state for each icon
  const [isCatHovered, setIsCatHovered] = useState(false);
  const [isDogHovered, setIsDogHovered] = useState(false);
  const [isVolunteerHovered, setIsVolunteerHovered] = useState(false);

  return (
    <div className="icon-section bg-pr py-20 ">
      <div className="container mx-auto flex justify-center space-x-80">
        
        <Link to="/adoptadog" className="icon-card hover-effect"
          onMouseEnter={() => setIsDogHovered(true)}  // Trigger the GIF on hover
          onMouseLeave={() => setIsDogHovered(false)} // Go back to static image on mouse leave
        >
          <div className="icon-placeholder">
            <img
              src={isDogHovered ? require('./dog.gif') : dogStatic}  // Dynamically load GIF on hover
              alt="Animated Dog Icon"
              className="animated-icon"
            />
          </div>
          <p className="text-center text-xl text-sc mt-4">I'd like to adopt a dog.</p>
        </Link>

        <Link to="/adoptacat" className="icon-card hover-effect"
          onMouseEnter={() => setIsCatHovered(true)}
          onMouseLeave={() => setIsCatHovered(false)}
        >
          <div className="icon-placeholder">
            <img
              src={isCatHovered ? require('./cat.gif') : catStatic}  // Dynamically load GIF on hover
              alt="Animated Cat Icon"
              className="animated-icon"
            />
          </div>
          <p className="text-center text-xl text-sc mt-4">I'm more of a cat person.</p>
        </Link>

        <Link to="/volunteer" className="icon-card hover-effect"
          onMouseEnter={() => setIsVolunteerHovered(true)}
          onMouseLeave={() => setIsVolunteerHovered(false)}
        >
          <div className="icon-placeholder">
            <img
              src={isVolunteerHovered ? require('./volunteer.gif') : volunteerStatic}  // Dynamically load GIF on hover
              alt="Animated Cat Icon"
              className="animated-icon"
            />
          </div>
          <p className="text-center text-xl text-sc mt-4">I'd like to help and volunteer.</p>
        </Link>


      </div>
    </div>
  );
};

export default IconSection;
