// VenuesTable.js
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function VenuesTable() {
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.post('/api/venueList', {});
      setVenues(response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleCardClick = (venueId) => {
    console.log('Clicked Card with ID:', venueId);
    navigate(`/venue/venue-details?venueid=${venueId}`);
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className='ViewPageBody'>
    <div>
      {venues.map((venue) => (
        <Card
          key={venue.venue_id}
          id={venue.venue_id}
          vname={venue.vname}
          address={venue.address}
          sport={venue.sport}
          onClick={() => handleCardClick(venue.venue_id)}
        />
      ))}
    </div>
    </div>
  );
}

export default VenuesTable;
