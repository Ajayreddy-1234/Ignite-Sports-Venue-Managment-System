import React, { useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";


function UserCard(props) {

    const navigate = useNavigate();

    const handleEditProfileDetails = () => {
        navigate("/edit-profile-details");
        window.location.reload();
    };


    return(
        <div>
            <div key={props.userId} className="UserCard">
                <div className="CardContent">
                    <h3 className="UserCardTitle"> My Account </h3>
                    <div className='displayStack'>
                        <div className="info">{"User ID - "+window.localStorage.getItem('userId')}</div>
                        <div className="info">{"Username - "+window.localStorage.getItem('username')}</div>
                        <div className="info">{"Email - "+window.localStorage.getItem('userEmail')}</div>
                        <div className="info">{"Role - "+window.localStorage.getItem('role')}</div>
                    </div>
                    <div className="display2">
                        <Button onClick={handleEditProfileDetails}>Edit Account</Button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default UserCard;