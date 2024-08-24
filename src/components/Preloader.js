import React from 'react';
import preloaderGif from './preloader.gif';
import './Preloader.css'; 

const Preloader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white fade-out">
      <img src={preloaderGif} alt="Loading..." className="w-24 h-24" />
    </div>
  );
};

export default Preloader;

