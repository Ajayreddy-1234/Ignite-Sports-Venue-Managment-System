import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from './Button';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { useNavigate } from 'react-router-dom';
import SplitLayout from './SplitLayout';

const VenueDetails = () => {
  const venueParams = new URLSearchParams(window.location.search);
  const id = venueParams.get('venueid');
  const navigate = useNavigate();

  const [venueData, setVenueData] = useState({});
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [venueSport, setVenueSport] = useState("");
  const [venueReservationTimes, setVenueReservationTimes] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.post('/api/venue-details', { venue_id: id });
      setVenueData(response.data);
    } catch (error) {
      console.error('Error fetching venue details:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (venueData && venueData.length > 0) {
      setVenueName(venueData[0].vname);
      setVenueSport(venueData[0].sport);
      setVenueAddress(venueData[0].address);
    }
  }, [venueData]);

  const fetchTimes = async () => {
    try {
      const response = await axios.post('/api/venue-reservation-times', { venue_id: id });
      setVenueReservationTimes(response.data);
    } catch (error) {
      console.error('Error fetching venue reservation times:', error.message);
    }
  };

  useEffect(() => {
    fetchTimes();
  }, [id]);

  const handleReservationButtonClick = (reservation) => {
    setSelectedReservation((prevReservation) =>
      prevReservation === reservation ? null : reservation
    );
  };

  const handleBookButtonClick = () => {
    if(selectedReservation === null || selectedReservation.start_datetime === null){
      alert("Please select a reservation time")
    }else{
      navigate(`/review-booking?venueid=${id}&reservation=${selectedReservation ? selectedReservation.start_datetime : ''}`)
    }
  }

  return (
    <div className='venueDetailsBody'>
      <SplitLayout>
        <div className='venueDetailsImage'>
          <div className='theImage'>image</div>
        </div>
        
          <div className='venueDetails'>
          <h2 className='venueDetailsTitle'>{venueName}</h2>
            <div className='detail'>Sport: {venueSport}</div>
            <div className='detail'>Address: {venueAddress}</div>
            <div className='detail'>
              Time Slots - 
              <div>
                {venueReservationTimes.map((reservation) => (
                  <Button
                    key={reservation.start_datetime}
                    buttonStyle={selectedReservation === reservation ? 'buttonPrimary' : 'buttonOutline'}
                    onClick={() => handleReservationButtonClick(reservation)}
                  >
                    {reservation.start_datetime}
                  </Button>
                ))}
              </div>
            </div>
            <div className='detail'>
              <Button> Bookmark </Button>
            </div>
            <div className='detail'>
                <Button onClick={() => handleBookButtonClick()}> Book It! </Button>
            </div>
          </div>
        
      </SplitLayout>
    </div>
  );
};

export default VenueDetails;