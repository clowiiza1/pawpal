import React from 'react';
import AnimalCard from './AnimalCard';
import './BrowseAnimals.css'; // This is where the container and button styles will go

const BrowseAnimals = () => {
    return (
        <div className="container">
            <h1>Browse Animals</h1>
            <p>Find your next best friend today at SPCA VAAL</p>

            <div className="card-container">
                <AnimalCard 
                    image="dog.jpg" 
                    name="NAME 1" 
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
                />
                <AnimalCard 
                    image="dog.jpg" 
                    name="NAME 2" 
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
                />
                <AnimalCard 
                    image="dog.jpg" 
                    name="NAME 3" 
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
                />
                <AnimalCard 
                    image="dog.jpg" 
                    name="NAME 4" 
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." 
                />
            </div>

            <button className="browse-more">Browse more</button>
        </div>
    );
};

export default BrowseAnimals;
