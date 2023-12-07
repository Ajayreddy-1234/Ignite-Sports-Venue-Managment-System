import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from './Button';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { useNavigate } from 'react-router-dom';
import SplitLayout from './SplitLayout';
import ReservationsCard from './ReservationsCard';
import basketball from "../assets/basketball.png";
import soccer from "../assets/soccer.png";
import football from "../assets/football.png";
import sports from "../assets/sports.png";

const VenueDetails = () => {
  const venueParams = new URLSearchParams(window.location.search);
  const id = venueParams.get('venueid');
  const navigate = useNavigate();

  const [venueData, setVenueData] = useState({});
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [venueSport, setVenueSport] = useState("");
  const [venueUserId, setVenueUserId] = useState();
  const [venueReservationTimes, setVenueReservationTimes] = useState([]);
  const [venueReservationId, setVenueReservationId] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [search, setSearch] = useState('');
  const [closed, setClosed] = useState(false);
  const isAdmin = window.localStorage.getItem('role') === 'Admin';
  const isOrganizer = window.localStorage.getItem('role') === 'Organizer';
  const isUser = window.localStorage.getItem('role') === 'Attendee';
  const [disabled, setDisabled] = useState(false);
  const [image, setImage] = useState("");
  const [mapURL, setMapURL] = useState("");

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
      setVenueUserId(venueData[0].user_id);
      const sportType = venueData[0].sport.toLowerCase();
      if (sportType === "basketball") {
        setImage(basketball);
      } else if (sportType === "soccer") {
        setImage(soccer);
      } else if (sportType === "football") {
        setImage(football);
      }
      else {
        setImage(sports);
      }
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
  const fetchMapURL = async () => {
    try {
      const response = await axios.post('/api/img-url', { venue_id: id });
      if (response.data.img_url) {
        setMapURL(response.data.img_url);
      }
      else {
        setMapURL("https://montessoridigital.org/sites/default/files/images/cards/cc129-en-p.jpg");
      }
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
  const handleMapURL = async () => {
    try {
      const response = await axios.post('/api/update-img-url', { venue_id: id, img_url: mapURL });
    } catch (error) {
      console.error('Error updating venue:', error.message);
    }
  };

  useEffect(() => {
    fetchTimes();
    fetchReservations();
    fetchMapURL();
  }, [id]);

  const handleReservationButtonClick = (reservation) => {
    setSelectedReservation((prevReservation) =>
      prevReservation === reservation ? null : reservation
    );
  };

  const handleBookButtonClick = () => {
    let userId = window.localStorage.getItem("userId");
    if(userId == null){
      alert("Please login to continue!");
      navigate(`/login`);
      window.location.reload();
    }else if(selectedReservation === null || selectedReservation.start_datetime === null){
      alert("Please select a reservation time")
    }else{
      navigate(`/review-booking?venueid=${id}&reservation=${selectedReservation ? selectedReservation.start_datetime : ''}&reservationid=${selectedReservation.reservation_id}`)
    }
  }
  const handleSignout = () => {
    window.localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const handleBookmarkButtonClick = async () => {
      if(window.localStorage.getItem("userId") == null){
        alert("Please login to bookmark the venue!");
      }else{
        console.log(id);
        const response = await fetch(`/api/bookmark`,{
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": window.localStorage.getItem("token"),
                  },
                  body: JSON.stringify({ venueId: id}),
        });
        console.log(response);
        if(response.ok){
          alert("Successfully bookmarked your Venue");
        }else if(response.statusText == "Unauthorized"){
          alert("Session Time out. Please login to continue");
          handleSignout();
        }else{
          alert("Unable to bookmark your Venue at this time. Please try later!")
        }
    }

  }

  return (
    <div className='venueDetailsBody'>
      <SplitLayout>
        <div className='venueDetailsImage' id='theImage'>
          { image && <img src={image} alt="image" className="mapImg"></img> }
        </div>
          <div className='venueDetails'>
            <div className='imageURL'>
              <div className="bookmark">
                <Button onClick={()=>handleBookmarkButtonClick()}> Bookmark </Button>
              </div>
              
              <h2 className='venueDetailsTitle'>{venueName}</h2>
            </div>
            <div className="openCloseDetail">
              {closed &&
                <p className="closeDetails">Closed</p>
              }
              {!closed &&
                <p className="openDetails">Open</p>
              }
            </div>
            <div className='small-details'>
              
              <div className='detail'>Sport: {venueSport}</div>
              <div className='detail'>Address: {venueAddress}</div>
            </div>
            
            <div className='timeslots'>
              <h4>Time Slots</h4>
              { !closed && 
              <div>
                {venueReservationTimes.map((reservation) => (
                  <Button
                    key={reservation.start_datetime}
                    buttonStyle={selectedReservation === reservation ? 'buttonPrimary' : 'buttonOutline'}
                    onClick={() => handleReservationButtonClick(reservation)}
                    disabled={disabled}
                  >
                    {reservation.start_datetime.slice(1, -1).split("T")[0]
                    + " " + reservation.start_datetime.slice(1, -1).split("T")[1]} - {reservation.end_datetime.slice(1, -1).split('T')[1]}
                  </Button>
                ))}
              </div>
              }
            </div>
            
            <div className='detail'>
                <Button onClick={() => handleBookButtonClick()}> Book It! </Button>
            </div>
            <img src={mapURL} className="mapImg"></img>
            { ((isOrganizer && parseInt(window.localStorage.getItem('userId')) === parseInt(venueUserId)) || isAdmin)  &&
              <>
                <div className="imageURL">
                    <input
                      placeholder="Architectural Map URL"
                      name={mapURL}
                      id={mapURL}
                      value={mapURL}
                      onChange={(e) => setMapURL(e.target.value)}
                      className="pictureURL"
                    />
                    <Button onClick={handleMapURL} disabled={disabled} buttonStyle='buttonPrimary' buttonSize={'buttonSmall'}>  
                      Update Image
                    </Button>
                </div>
                <div className="detail">
                  { ((isOrganizer && parseInt(window.localStorage.getItem('userId')) === parseInt(venueUserId)) || isAdmin) &&
                    ((!closed &&
                      <Button disabled={disabled} buttonStyle='buttonPrimary' buttonSize={'buttonSmall'} onClick={handleVenueStatusChange}> 
                        Close Event
                      </Button>
                    )
                    ||
                    (closed &&
                      <Button disabled={disabled} buttonStyle='buttonPrimary' buttonSize={'buttonSmall'} onClick={handleVenueStatusChange}> 
                        Open Event
                      </Button>
                    ))
                  }
                </div>
              </>
            }
          </div>
          {
            ((isOrganizer && parseInt(window.localStorage.getItem('userId')) === parseInt(venueUserId)) || isAdmin)  &&
              <div className="ChildLeft">
                <h3>Reservations:</h3>
                <div className='ReservationSearch'>
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
                      vname={reservation.username}
                      start_datetime={reservation.start_datetime.slice(1, -1).split("T")[0] + " " + reservation.start_datetime.slice(1, -1).split("T")[1]}
                      end_datetime={reservation.end_datetime.slice(1, -1).split("T")[0] + " " + reservation.end_datetime.slice(1, -1).split("T")[1]}
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