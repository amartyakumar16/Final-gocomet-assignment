import React from 'react';
import { X, Wifi, Tv, Wind, Ship, Bath, Coffee } from 'lucide-react';
import './FacilitiesModal.css';

const FacilitiesModal = ({ isOpen, onClose, roomName, amenities }) => {
  if (!isOpen) return null;

  // Map amenities to icons
  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'free wi-fi':
        return <Wifi className="amenity-icon" />;
      case 'tv':
        return <Tv className="amenity-icon" />;
      case 'air conditioning':
        return <Wind className="amenity-icon" />;
      case 'balcony':
        return <Ship className="amenity-icon" />;
      case 'jaccuzi':
        return <Bath className="amenity-icon" />;
      default:
        return <Coffee className="amenity-icon" />;
    }
  };

  return (
    <div className="facilities-modal-overlay">
      <div className="facilities-modal">
        <div className="facilities-header">
          <h2>{roomName} Amenities</h2>
          <button onClick={onClose} className="close-facilities">
            <X size={24} />
          </button>
        </div>
        
        <div className="facilities-grid">
          {amenities.map((amenity, index) => (
            <div key={index} className="facility-card">
              {getAmenityIcon(amenity)}
              <span className="facility-name">{amenity}</span>
            </div>
          ))}
        </div>

        <div className="facilities-footer">
          <p className="facility-note">* Additional amenities may be available upon request</p>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesModal;