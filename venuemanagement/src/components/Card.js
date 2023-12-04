// Card.js
import React from "react";
import './Card.css';

function Card(props) {
  const handleCardClick = () => {
    if (props.onClick) {
      props.onClick(props.venue_id);
    }
  };

  return (
    <div className="List">
      <div key={props.venue_id} className="VenueCard" onClick={handleCardClick}>
        <i className={`bx bx-bookmark ${props.bookmark?'bookmarked-color':'unbookmarked-color'}`}/>
        <div className="CardContent">
          <h3 className="VenueName">{props.vname}</h3>
          <div className='displayStack__1'>
            <h3 className="VenueAddress">{props.address}</h3>
            <h3 className="VenueSport">{props.sport}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
