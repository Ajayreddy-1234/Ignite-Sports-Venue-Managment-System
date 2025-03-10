import React, { useState, useEffect  } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/igniteHomeImg.jpeg";
import bgimg from "../assets/backgroundImage.jpg";
import { Button } from "./Button";
import './homeBody.css';
import API_BASE_URL from '../apiConfig';
import axios from 'axios';
import ReservationsCard from "./ReservationsCard";
import UserCard from "./UserCard";

const HomeBody = () =>{
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [reservations, setReservations] = useState([]);
    const userId = window.localStorage.getItem("userId");

    // state variable to store the profile data
    const [profileData, setProfileData] = useState(
      {
        user_id: window.localStorage.getItem('userId') || "",
        username: window.localStorage.getItem('username') || "",
        email: window.localStorage.getItem('userEmail') || "",
        role: window.localStorage.getItem('role') || ""
      }
    );

    const fetchReservations = async () => {
      try {
        const response = await axios.post('/api/user-reservations', { user_id: window.localStorage.getItem('userId') });
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error.message);
      }
    };

    useEffect(() => {
      fetchReservations();
    }, []);
    const profileApiUrl = `${API_BASE_URL}/user/profile`;

    return(
        <div className="homeContainer">
          <img className="bgImage" src={bgimg}/>
            <img className="homeImg" src={img} style={{maxwidth: 50% + "em" }}/>
            <div className="theHome">
                <div className="homeBodyButtons">
                    <Link to="/venues">
                        <Button className='buttons' buttonStyle="buttonOutline" buttonSize="buttonLarge">
                            RESERVE NOW
                        </Button>
                    </Link>
                </div>
                {userId != null &&<div className="profileContainer">
                  <UserCard/>
                </div>}

                {userId != null && <div className="ChildLeft">
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
                          vname={reservation.vname}
                          start_datetime={reservation.start_datetime}
                          end_datetime={reservation.end_datetime}
                          value_paid={reservation.value_paid === 1 ? 'Paid' : 'Not Paid'}
                        />
                    ))}
                  </div>}
              </div>
        </div>
    )
    
}
export default HomeBody;