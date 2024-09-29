import React, { useState, useEffect } from 'react';
import storyImage1 from './success-dog.jpg'; // Replace with your image file
import storyImage2 from './success-cat.jpg'; // Add another image file for the new story

const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState('fade-in'); // State for managing fade effect

  const stories = [
    {
      image: storyImage1,
      text: "This is our beloved Brownie, adopted from PawPal just six weeks ago. With the support of your lovely foster carers and now with a permanent home, she has come out of her shell and absolutely adores her new life. We are so thankful to have her in our life.",
      author: "The Whitten Family and Brownie",
    },
    {
      image: storyImage2,
      text: "Meet Luna, who found her forever home through PawPal. After a tough start, she's now thriving in her new environment, bringing joy and love to everyone she meets. We couldn't imagine our lives without her!",
      author: "The Morgan Family and Luna",
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // Move to the next slide every 30 seconds
    }, 30000); // Change story every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setFadeState('fade-out');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
      setFadeState('fade-in');
    }, 500); // Time for fade-out effect
  };

  const handleNext = () => {
    setFadeState('fade-out');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
      setFadeState('fade-in');
    }, 500); // Time for fade-out effect
  };

  return (
    <div className="success-stories-section bg-pr py-16 text-center relative">
      <div className="w-full relative">
        <h2 className="text-4xl font-bold text-sc mb-10">Success Stories</h2>

        <button
          className="absolute left-20 top-1/2 transform -translate-y-1/2 p-4 text-3xl text-sc hover:text-st"
          onClick={handlePrev}
        >
          &lt;
        </button>

        <button
          className="absolute right-20 top-1/2 transform -translate-y-1/2 p-4 text-3xl text-sc hover:text-st"
          onClick={handleNext}
        >
          &gt;
        </button>

        <div className={`flex flex-col items-center max-w-3xl mx-auto transition-opacity duration-500 ${fadeState}`}>
          <div className="rounded-full overflow-hidden w-40 h-40 mb-6">
            <img
              src={stories[currentIndex].image}
              alt={`Success Story ${currentIndex + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-lg text-br mb-6">
            {stories[currentIndex].text}
          </p>
          <p className="text-xl font-semibold text-sc">
            {stories[currentIndex].author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
