import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from './Button';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { useNavigate } from 'react-router-dom';
import SplitLayout from './SplitLayout';
import ReservationsCard from './ReservationsCard';

const VenueDetails = () => {
  const venueParams = new URLSearchParams(window.location.search);
  const id = venueParams.get('venueid');
  const navigate = useNavigate();

  const [venueData, setVenueData] = useState({});
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [venueSport, setVenueSport] = useState("");
  const [venueReservationTimes, setVenueReservationTimes] = useState([]);
  const [venueReservationId, setVenueReservationId] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [search, setSearch] = useState('');
  const [closed, setClosed] = useState(false);
  const isAdmin = window.localStorage.getItem('role') === 'Admin';
  const isOrganizer = window.localStorage.getItem('role') === 'Organizer';
  const isUser = window.localStorage.getItem('role') === 'User';
  const [disabled, setDisabled] = useState(false);

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
      setClosed(parseInt(venueData[0].closed) === 1)
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

  const fetchReservations = async () => {
    try {
      const response = await axios.post('/api/reservations', { venue_id: id });
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error.message);
    }
  };
  const handleVenueStatusChange = async () => {
    let api_path
    if (closed) {
      api_path = 'open-event';
      setClosed(false);
      setDisabled(false);
    } else {
      api_path = 'close-event';
      setClosed(true);
      setDisabled(true);
    }
    try {
      const response = await axios.post('/api/' + api_path, { venue_id: id, vname: venueName });
    } catch (error) {
      console.error('Error updating venue:', error.message);
    }
    
  };

  useEffect(() => {
    fetchTimes();
    fetchReservations();
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
      navigate(`/review-booking?venueid=${id}&reservation=${selectedReservation ? selectedReservation.start_datetime : ''}&reservationid=${selectedReservation.reservation_id}`)
    }
  }

  return (
    <div className='venueDetailsBody'>
      <SplitLayout>
        <div className='venueDetailsImage'>
          <div className='theImage'>image</div>
        </div>
        
          <div className='venueDetails'>
            { (isAdmin || isOrganizer) &&
              ((!closed &&
                <button className="CloseBtn" onClick={handleVenueStatusChange}> 
                  Close Event
                </button>
              )
              ||
              (closed &&
                <button className="OpenBtn" onClick={handleVenueStatusChange}> 
                  Open Event
                </button>
              ))
            }
            <h2 className='venueDetailsTitle'>{venueName}</h2>
            <div className='detail'>Sport: {venueSport}</div>
            <div className='detail'>Address: {venueAddress}</div>
            <div className='detail'>
              Time Slots - 
              { !closed && 
              <div>
                {venueReservationTimes.map((reservation) => (
                  <Button
                    key={reservation.start_datetime}
                    buttonStyle={selectedReservation === reservation ? 'buttonPrimary' : 'buttonOutline'}
                    onClick={() => handleReservationButtonClick(reservation)}
                    disabled={disabled}
                  >
                    {reservation.start_datetime} - {reservation.end_datetime}
                  </Button>
                ))}
              </div>
              }
            </div>
            <div className='detail'>
              <Button> Bookmark </Button>
            </div>
            <div className='detail'>
                <Button onClick={() => handleBookButtonClick()}> Book It! </Button>
            </div>
          </div>
          {
            !isUser &&
              <div className="ChildLeft">
                <h3>Reservations:</h3>
                <div className='Search'>
                  <input className="searchInput" placeholder="Search Reservations" onChange={(e) => setSearch(e.target.value)}/>
                </div>
                {reservations.filter((item) => {
                return search.toLowerCase() === '' ? item 
                    : 
                    (item.username.toLowerCase().includes(search)
                    ||
                    item.start_datetime.toLowerCase().includes(search)
                    ||
                    item.end_datetime.toLowerCase().includes(search));
                })
                .map((reservation) => (
                    <ReservationsCard
                      key={reservation.venue_id}
                      id={reservation.venue_id}
                      username={reservation.username}
                      start_datetime={reservation.start_datetime}
                      end_datetime={reservation.end_datetime}
                      value_paid={reservation.value_paid === 1 ? 'Paid' : 'Not Paid'}
                    />
                ))}
              </div>
          }
          
        
      </SplitLayout>
    </div>
  );
};

export default VenueDetails;