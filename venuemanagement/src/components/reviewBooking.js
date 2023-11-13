import React, { useState } from "react";
import { useNavigate, Link, Form } from "react-router-dom";
import { Button } from "./Button";

function ReviewBooking(){

    var finishReview=()=>{
        alert("Venue booked!");
    }

    return(
        <div className="reviewBookingBody">
            <div className="reviewBookingContainer">
                <h2>Review Booking</h2>
                <form className="reviewBookingForm" onSubmit={finishReview}>
                    <h3>Venue</h3>
                    <div className="venueName"> Venue name Here </div>
                    <h3>Dates and Times</h3>
                    <div className="venueDates"> Reservation Dates Here </div>
                    <h3>Cost</h3>
                    <div className="venueCost"> Total Price Here </div>
                    <h3>Email</h3>
                    <div className="userReviewEmail"> User Email Here </div>
                    <button className="bookRevervationBtn"> Book It! </button>
                </form>
            </div>
        </div>
    ) 
};

export default ReviewBooking;
