import React from "react";
import './Card.css';

function PlayerCard(props) {

    function availableCheck(props){
        //var availableText = "";
        if(props.available === 0){
            return("Not Available");
        }
        else{
            return("Available");
        };
    };

  return (
    <div className="List">
        <div key={props.player_id} className="PlayerCard">
            <div className="CardContent">
                <h3 className="PlayerName">{props.player_name}</h3>
                <div className='displayStack'>
                    <div className="PlayerSport">{props.sport_activity_name}</div>
                    <div className="PlayerGender">{props.gender}</div>
                    <div className="PlayerAge">{props.age}</div>
                    <div className="PlayerSkill">{props.skill_level}</div>
                    <div className="PlayerAval">{availableCheck(props)}</div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default PlayerCard;