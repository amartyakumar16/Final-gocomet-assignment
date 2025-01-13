import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, MapPin, Users } from "lucide-react";
import './HotelDetails.css';
import { Toaster } from 'react-hot-toast';
import BookingModal from './BookingModal';
import FacilitiesModal from './FacilitiesModal';
import Header from '../pages/Header';

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isFacilitiesModalOpen, setIsFacilitiesModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(
          `https://www.gocomet.com/api/assignment/hotels/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch hotel details");
        }
        const data = await response.json();
        setHotel(data.hotel);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  if (loading)
    return <div className="loading-screen">Loading...</div>;
  if (error)
    return <div className="error-screen">Error: {error}</div>;

  const RoomCard = ({ room }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = (e) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev + 1) % room.image_urls.length);
    };

    const prevImage = (e) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) => (prev - 1 + room.image_urls.length) % room.image_urls.length);
    };
    const handleViewFacilities = (e) => {
      e.stopPropagation();
      setSelectedRoom(room);
      setIsFacilitiesModalOpen(true);
    };

    return (
      <div className="room-card">
        <div className="image-container">
          <img
            src={room.image_urls[currentImageIndex]}
            alt={room.name}
            className="room-image"
          />
          <div className="image-controls">
            <button onClick={prevImage} className="nav-button prev">
              <ChevronLeft size={24} />
            </button>
            <div className="image-counter">
              {currentImageIndex + 1}/{room.image_urls.length}
            </div>
            <button onClick={nextImage} className="nav-button next">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        <div className="room-details">
          <div className="room-header">
            <h3 className="room-title">{room.name}</h3>
            <div className="occupancy">
              <Users size={18} />
              <span>2</span>
            </div>
          </div>
          <div className="price-section">
            <span className="price">₹ {room.price}</span>
            <span className="per-night">per night</span>
          </div>
          <div className="room-actions">
          <button 
              className="view-facilities"
              onClick={handleViewFacilities}
            >
              View facilities
            </button>
            <button 
              className="book-now"
              onClick={() => {
                setSelectedRoom(room);
                setIsBookingModalOpen(true);
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
   
    <div className="hotel-details">
       <Header></Header>
      <div className="hero">
        <img src={hotel.image_url} alt={hotel.name} className="hero-image" />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>{hotel.name}</h1>
            <div className="hotel-info">
              <div className="location">
                <MapPin size={20} />
                <span>{hotel.city}, India</span>
              </div>
              <div className="rating">
                <Star size={20} className="star-icon" />
                <span>{hotel.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="room-cards-container">
          {hotel.rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        <div className="about-section">
          <h2>About {hotel.name}</h2>
          <div className="about-content">
            <p>{hotel.description}</p>
          </div>
        </div>
      </div>
      <Toaster />
      {selectedRoom && (
        <>
          <BookingModal
            isOpen={isBookingModalOpen}
            onClose={() => {
              setIsBookingModalOpen(false);
              setSelectedRoom(null);
            }}
            hotelName={hotel.name}
            roomName={selectedRoom.name}
            roomImage={selectedRoom.image_urls[0]}
            amenities={selectedRoom.amenities}
          />
          <FacilitiesModal
            isOpen={isFacilitiesModalOpen}
            onClose={() => {
              setIsFacilitiesModalOpen(false);
              setSelectedRoom(null);
            }}
            roomName={selectedRoom.name}
            amenities={selectedRoom.amenities}
          />
        </>
      )}
    </div>
  );
};
   

export default HotelDetails;