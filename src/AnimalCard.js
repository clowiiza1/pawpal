import React from 'react';
import './AnimalCard.css'; // This is where the CSS styles will go
import dogImage from './dogtest.jpg';

const AnimalCard = ({ image, name, description }) => {
    return (
        <div className="card">
            <img src={dogImage} alt="Animal" />
            <div className="card-content">
                <h2 className="name">{name}</h2>
                <p className="description">{description}</p>
            </div>
        </div>
    );
};

export default AnimalCard;