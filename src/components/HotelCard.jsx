import React from 'react';
import './HotelCard.css';

const HotelCard = ({ hotel }) => {
  return (
    <div className="hotel-card">
      <img src={hotel.image} alt={hotel.name} />
      <h3>{hotel.name}</h3>
      <p>{hotel.city}</p>
      <p>₹{hotel.minPrice} - ₹{hotel.maxPrice}</p>
      <button>View</button>
    </div>
  );
};

export default HotelCard;