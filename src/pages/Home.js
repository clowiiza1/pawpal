import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import header1 from './header1.jpg';
import header2 from './header2.jpg';
import header from './header4.jpg';
import './Home.css'; 
import IconSection from '../components/IconSection'; 
import AboutUsSection from '../components/AboutUs'; 
import SuccessStories from '../components/Success'; 

const Home = () => {
  const [cardsOpen, setCardsOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCardsOpen(true);
    }, 500); // Trigger the animation after the page loads

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="page-wrap font-poppins">
      <header className="page-header flex mx-auto py-30 px-10">
        <div className="w-1/2 px-6">
          <div className="h-full space-y-10 justify-center flex flex-col px-6 pt-6">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-4xl text-sc font-bold uppercase">Find a Friend -</h1>
              <h1 className="text-4xl text-sc font-bold uppercase">Make a Difference</h1>
              <p className="text-br pt-2">
                Bringing adorable pets and loving families together, one wag and purr at a time.
                Your new best friend is just a heartbeat away!
              </p>
            </div>
            {/* Wrap the button with Link for navigation */}
            <Link to="/adoptadog">
              <button className="px-6 py-3 mr-auto font-large text-xl rounded-lg bg-st text-pr shadow-lg hover:bg-sc transition duration-300">
                Find your Friend
              </button>
            </Link>
          </div>
        </div>
        <div className="w-1/2">
          <div className={`flex justify-center relative cards-container ${cardsOpen ? 'cards-open' : ''}`}>
            <ul>
              <li className="absolute card left-card">
                <img src={header1} alt="A cute dog being petted by its owners" className="custom-size object-cover p-1 shadow-sm bg-st rounded-lg shadow-lg" />
              </li>
              <li className="relative z-10 card center-card">
                <img src={header} alt="A woman high-fiving her dog" className="custom-size object-cover p-1 shadow-sm bg-st rounded-lg shadow-lg" />
              </li>
              <li className="absolute card right-card">
                <img src={header2} alt="A close-up of a ginger cat." className="custom-size object-cover p-1 shadow-sm bg-st rounded-lg shadow-lg" />
              </li>
            </ul>
          </div>
        </div>
      </header>
      <IconSection /> 
      <AboutUsSection />
      <SuccessStories />
    </div>
  );
};

export default Home;
