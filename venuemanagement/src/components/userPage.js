import React from "react";
import { Button } from "./Button";
import {Link, useNavigate} from 'react-router-dom';

function UserPage (){
    const navigate = useNavigate();

    const handleSignout = () => {
        window.localStorage.clear();
        navigate("/");
        window.location.reload();
    };
    const handleEditProfileDetails = () => {
        navigate("/edit-profile-details");
        window.location.reload();
    };

    return(
    <>
            <div className="signoutContainer">
                <Button className="signoutBtn" buttonStyle='button' onClick={handleSignout}> SIGN OUT </Button>
                <Button className="signoutBtn" buttonStyle='button' onClick={handleEditProfileDetails}> EDIT PROFILE DETAILS </Button>
            </div>
    </>
    )
};
export default UserPage;