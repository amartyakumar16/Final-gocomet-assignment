import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { Star, MapPin, IndianRupee } from 'lucide-react';
import './ExploreHotels.css';

function ExploreHotels() {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const hotelsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels();
  }, [currentPage]);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://www.gocomet.com/api/assignment/hotels?page=${currentPage}&size=${hotelsPerPage}`
      );
      const data = await response.json();
      const hotelsWithPrices = data.hotels.map(hotel => ({
        ...hotel,
        minPrice: Math.min(...hotel.rooms.map(room => room.price)),
        maxPrice: Math.max(...hotel.rooms.map(room => room.price))
      }));
      setHotels(hotelsWithPrices);
      setTotalPages(Math.ceil(30 / hotelsPerPage)); // Assuming total of 30 hotels
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="explore-page">
      <Header />
      
      <div className="explore-container">
        <div className="explore-header">
          <h1>Explore Amazing Hotels</h1>
          <p>Discover the perfect stay from our curated collection of hotels</p>
        </div>

        {loading ? (
          <div className="loading-skeleton">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-line-long"></div>
                  <div className="skeleton-line-short"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="hotels-grid">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="hotel-card">
                <div className="card-image-container">
                  <img src={hotel.image_url} alt={hotel.name} className="hotel-image" />
                  <div className="rating">
                    <Star size={16} fill="gold" stroke="gold" />
                    <span>{Number(hotel.rating).toFixed(1)}</span>
                  </div>
                </div>
                
                <div className="card-content">
                  <h3>{hotel.name}</h3>
                  <div className="location">
                    <MapPin size={16} />
                    <span>{hotel.city}</span>
                  </div>
                  
                  <div className="price-range">
                    <IndianRupee size={16} />
                    <span>{hotel.minPrice.toLocaleString()} - {hotel.maxPrice.toLocaleString()}</span>
                  </div>
                  
                  <div className="room-types">
                    <p>{hotel.rooms.length} room types available</p>
                  </div>
                  
                  <button 
                    className="view-details"
                    onClick={() => navigate(`/hotels/${hotel.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreHotels;