import React, { useState } from "react";
import { Button } from "./Button";
import {Link, useNavigate} from 'react-router-dom';
import UserCard from "./UserCard";
import withAuth from './withAuth';

const UserPage =()=>{
    const navigate = useNavigate();

    const handleSignout = () => {
        window.localStorage.clear();
        navigate("/");
        window.location.reload();
    };
    const handleInviteFriend = () => {
        navigate("/invite-friend");
    };

    return(
    <div className="accountBody">
            <div className="accountContainer">
                <div>
                    <UserCard/>
                </div>
                <Button className="inviteFriendBtn" buttonStyle='button' onClick={handleInviteFriend} >
                    INVITE FRIEND
                </Button>
                <Button className="signoutBtn" buttonStyle='button' onClick={handleSignout}>
                    SIGN OUT 
                </Button>
            </div>
    </div>
    )
};
export default withAuth(UserPage);