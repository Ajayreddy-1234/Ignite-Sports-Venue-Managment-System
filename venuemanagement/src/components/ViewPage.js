// VenuesTable.js
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { Link, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from './Button';
import API_BASE_URL from '../apiConfig';

function VenuesTable() {
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/venueList`, {});
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
    fetchData();
  }, []);

  const [search, setSearch] = useState('');
  console.log(search);

  return (
    <div className='venueViewHost'>
      <form className='searchForm'>
        <input className="searchInput" placeholder="Search Venues or Activities" onChange={(e) => setSearch(e.target.value)}/>
      </form>
      <div className='ViewPageBody'>
        <div>
          {venues.filter((item) => {
            return search.toLowerCase() === '' ? item 
            : 
            (item.vname.toLowerCase().includes(search)
            ||
            item.sport.toLowerCase().includes(search)
            ||
            item.address.toLowerCase().includes(search));
          })
          .map((venue) => (
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
    </div>
  );
}

export default VenuesTable;
