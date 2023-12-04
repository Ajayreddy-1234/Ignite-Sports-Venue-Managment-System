import React, { useState } from "react";
import { Button } from "./Button";
import {Link, useNavigate} from 'react-router-dom';
import UserCard from "./UserCard";

const UserPage =()=>{
    const navigate = useNavigate();

    const handleSignout = () => {
        window.localStorage.clear();
        navigate("/");
        window.location.reload();
    };

    return(
    <div className="accountBody">
            <div className="accountContainer">
                <div>
                    <UserCard/>
                </div>
                <Button className="signoutBtn" buttonStyle='button' onClick={handleSignout}>
                    SIGN OUT 
                </Button>
            </div>
    </div>
    )
};
export default UserPage;