import React from "react";
import { Button } from "./Button";
import {useNavigate} from 'react-router-dom';

function UserPage (){
    const navigate = useNavigate();

    var handleSignout = () => {
        window.localStorage.clear();
        navigate("/");
        window.location.reload();
    };

    return(
    <div className="signoutContainer">
        <Button className="signoutBtn" buttonStyle='button' onClick={handleSignout}> SIGN OUT </Button>
    </div>)
};
export default UserPage;