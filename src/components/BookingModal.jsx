import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './BookingModal.css';

const BookingModal = ({ 
  isOpen, 
  onClose, 
  hotelName, 
  roomName, 
  roomImage,
  amenities 
}) => {
  const [guests, setGuests] = useState([{ name: '', age: '', gender: 'Male' }]);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!checkOut) newErrors.checkOut = 'Check-out date is required';
    
    guests.forEach((guest, index) => {
      if (!guest.name) newErrors[`name${index}`] = 'Name is required';
      if (!guest.age || guest.age < 1) newErrors[`age${index}`] = 'Valid age is required';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddGuest = () => {
    if (guests.length < 4) {
      setGuests([...guests, { name: '', age: '', gender: 'Male' }]);
    }
  };

  const handleRemoveGuest = (index) => {
    if (guests.length > 1) {
      const newGuests = guests.filter((_, i) => i !== index);
      setGuests(newGuests);
    }
  };

  const handleGuestChange = (index, field, value) => {
    const newGuests = [...guests];
    newGuests[index] = { ...newGuests[index], [field]: value };
    setGuests(newGuests);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast.success('Booking successful!', {
        duration: 3000,
        position: 'top-center',
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div>
            <h2>{hotelName}</h2>
            <h3>{roomName}</h3>
          </div>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>

        <div className="room-preview">
          <img src={roomImage} alt={roomName} className="room-preview-image" />
          <div className="amenities-list">
            <h4>Room Amenities</h4>
            <div className="amenities-grid">
              {amenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="date-inputs">
            <div className="date-field">
              <label>Check-in</label>
              <DatePicker
                selected={checkIn}
                onChange={date => setCheckIn(date)}
                minDate={new Date()}
                placeholderText="Select date"
                className="date-picker"
              />
              {errors.checkIn && <span className="error">{errors.checkIn}</span>}
            </div>
            <div className="date-field">
              <label>Check-out</label>
              <DatePicker
                selected={checkOut}
                onChange={date => setCheckOut(date)}
                minDate={checkIn || new Date()}
                placeholderText="Select date"
                className="date-picker"
              />
              {errors.checkOut && <span className="error">{errors.checkOut}</span>}
            </div>
          </div>

          <div className="guests-section">
            {guests.map((guest, index) => (
              <div key={index} className="guest-inputs">
                <h4>Person {index + 1}</h4>
                <div className="guest-fields">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Name"
                      value={guest.name}
                      onChange={(e) => handleGuestChange(index, 'name', e.target.value)}
                      className="name-input"
                    />
                    {errors[`name${index}`] && <span className="error">{errors[`name${index}`]}</span>}
                  </div>
                  
                  <div className="input-group">
                    <input
                      type="number"
                      placeholder="Age"
                      value={guest.age}
                      onChange={(e) => handleGuestChange(index, 'age', e.target.value)}
                      className="age-input"
                    />
                    {errors[`age${index}`] && <span className="error">{errors[`age${index}`]}</span>}
                  </div>
                  
                  <div className="gender-select">
                    <button
                      type="button"
                      className={`gender-btn ${guest.gender === 'Male' ? 'active' : ''}`}
                      onClick={() => handleGuestChange(index, 'gender', 'Male')}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      className={`gender-btn ${guest.gender === 'Female' ? 'active' : ''}`}
                      onClick={() => handleGuestChange(index, 'gender', 'Female')}
                    >
                      Female
                    </button>
                  </div>
                  
                  {guests.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveGuest(index)}
                      className="remove-guest"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {guests.length < 4 && (
            <button
              type="button"
              onClick={handleAddGuest}
              className="add-person"
            >
              + ADD PERSON
            </button>
          )}

          <button type="submit" className="book-button">
            Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;