import React from 'react';
import storyImage from './success-dog.jpg'; // Replace with your image file

const SuccessStories = () => {
  return (
    <div className="success-stories-section bg-pr py-16 text-center relative">
      <div className="w-full relative">
        
    
        <h2 className="text-4xl font-bold text-sc mb-10">Success Stories</h2>
        
     
        <button className="absolute left-20 top-1/2 transform -translate-y-1/2 p-4 text-3xl text-sc hover:text-st">
         
          &lt;
        </button>
        
        <button className="absolute right-20 top-1/2 transform -translate-y-1/2 p-4 text-3xl text-sc hover:text-st">
         
          &gt;
        </button>

        <div className="flex flex-col items-center max-w-3xl mx-auto">
          
          <div className="rounded-full overflow-hidden w-40 h-40 mb-6">
            <img src={storyImage} alt="Success Story" className="object-cover w-full h-full" />
          </div>
          
          
          <p className="text-lg text-br mb-6">
            This is our beloved Brownie, adopted from PawPal just six weeks ago. With the support of your lovely foster carers 
            and now with a permanent home, she has come out of her shell and absolutely adores her new life. We are so thankful 
            to have her in our life.
          </p>
          
          <p className="text-xl font-semibold text-sc">The Whitten Family and Brownie</p>
          
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
