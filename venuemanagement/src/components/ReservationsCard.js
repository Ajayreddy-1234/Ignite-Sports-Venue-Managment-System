// Card.js
import React from "react";
import './Card.css';

export const ReservationsCard = (props) => {
  const handleCardClick = () => {
    if (props.onClick) {
      props.onClick(props.venue_id);
    }
  };

  return (
    <div className="ReservationList">
      <div key={props.venue_id} className="VenueCard" onClick={handleCardClick}>
        <div className="CardContent">
          <h3 className="VenueName">{props.vname}</h3>
          <div className='displayStack__1'>
            <h3 className="VenueAddress">{props.start_datetime}</h3>
            <h3 className="VenueSport">{props.end_datetime}</h3>
            <h3 className="VenueSport">{props.value_paid}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationsCard;
