// VenuesTable.js
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { Link, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from './Button';
import API_BASE_URL from '../apiConfig';

function VenuesTable() {
  const [venues, setVenues] = useState([]);
  const [isBookmarkChecked, setIsBookmarkChecked] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const dataToSend = {
          userId: window.localStorage.getItem("userId"),
      };
      const response = await axios.post(`${API_BASE_URL}/venueList`, dataToSend, config);
      setVenues(response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleCardClick = (venueId) => {
    console.log('Clicked Card with ID:', venueId);
    navigate(`/venue/venue-details?venueid=${venueId}`);
  };

  const handleBookmarkChange = (e) => {
    setIsBookmarkChecked(e.target.checked);
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
        <div className='bookmarkCheckbox'>
          <label>
            Bookmarked
            <input className="checkbox" type="checkbox" checked={isBookmarkChecked} onChange={handleBookmarkChange} />
          </label>
        </div>
      </form>
      <div className='ViewPageBody'>
        <div>
          {venues.filter((item) => {
            const matchesSearch = (
              item.vname.toLowerCase().includes(search) ||
              item.sport.toLowerCase().includes(search) ||
              item.address.toLowerCase().includes(search)
            );

            const matchesBookmark = (
              !isBookmarkChecked ||
              (isBookmarkChecked && item.bookmark === 1)
            );

            return matchesSearch && matchesBookmark;
          })
          .map((venue) => (
            <Card
              key={venue.venue_id}
              id={venue.venue_id}
              vname={venue.vname}
              address={venue.address}
              sport={venue.sport}
              bookmark = {venue.bookmark}
              onClick={() => handleCardClick(venue.venue_id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VenuesTable;
