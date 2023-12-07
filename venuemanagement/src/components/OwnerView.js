// VenuesTable.js
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { Link, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from './Button';

import withAuth from './withAuth';
import bgimg from "../assets/backgroundImage.jpg";


const OwnerView = ()  => {
  const [venues, setVenues] = useState([]);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.post('/api/owner-venues', { userid: window.localStorage.getItem('userId')});
      setVenues(response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
    try {
      const response = await axios.post('/api/owner-activities', { userid: window.localStorage.getItem('userId')});
      setActivities(response.data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleCardClick = (venueId) => {
    console.log('Clicked Card with ID:', venueId);
    navigate(`/venue/venue-details?venueid=${venueId}`);
  };
  const handleAddVenueButtonClick = () => {
    navigate('/venuecreationform');
    window.location.reload();
  }
  useEffect(() => {
    fetchData();
  }, []);

  const [search, setSearch] = useState('');
  console.log(search);

  return (
    <div className='venueViewHost'>
      <img className="bgImage" src={bgimg}/>
        <div className='Search'>
            <form className='searchForm'>
                <input className="searchInput" placeholder="Search Venues" onChange={(e) => setSearch(e.target.value)}/>
            <div className="ChildRight2">
                <Button className="changePasswordButton" buttonStyle='button' onClick={handleAddVenueButtonClick}> Add Venue/Activity </Button> 
            </div>
            </form>
        </div>
        <div className='OwnerViewTitle'>
          <h1>Venue Owner View</h1>
        </div>
        <div className='ChildContainer'>
            <div className="ChildLeft">
                <h3>Venues:</h3>
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
            <div className="ChildRight">
                <h3>Activities:</h3>
                {activities.filter((item) => {
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

export default withAuth(OwnerView);