import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link, Form } from "react-router-dom";
import { Button } from "./Button";
import withAuth from './withAuth';

function ReviewBooking(){

    const bookingParams = new URLSearchParams(window.location.search);
    const userEmail = window.localStorage.userEmail;
    const id = bookingParams.get('venueid');
    const reservationId = bookingParams.get('reservationid');
    const dateTime = bookingParams.get('reservation');
    const navigate = useNavigate();

    const [venueData, setVenueData] = useState({});
    const [venueName, setVenueName] = useState("");
    const [venueCost, setVenueCost] = useState("");

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
          setVenueCost(venueData[0].total_cost);
        }
      }, [venueData]);

    const finishReview = () =>{
        navigate(`/payment?venueid=${id}&reservation=${dateTime}&reservationid=${reservationId}`);
        //alert("Venue booked!");
    }

    return(
        <div className="reviewBookingBody">
            <div className="reviewBookingContainer">
                <h2>Review Booking</h2>
                <form className="reviewBookingForm">
                    <h3>Venue</h3>
                    <div className="venueName"> {venueName} </div>
                    <h3>Date and Time</h3>
                    <div className="venueDates"> {dateTime} </div>
                    <h3>Cost</h3>
                    <div className="venueCost"> ${venueCost} </div>
                    <h3>Email</h3>
                    <div className="userReviewEmail"> {userEmail} </div>
                    <Button className="bookRevervationBtn" onClick={finishReview}> Book It! </Button>
                </form>
            </div>
        </div>
    ) 
};

export default withAuth(ReviewBooking);
