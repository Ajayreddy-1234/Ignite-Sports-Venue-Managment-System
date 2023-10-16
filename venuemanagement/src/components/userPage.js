import React from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import isLoggedin from "./Login";

function UserPage (){

    var handleSignout = () => {
        isLoggedin = false;
    };

    return(
    <div className="signoutContainer">
        <Link to="/">
            <Button className="signoutBtn" buttonStyle='button' onClick={handleSignout}> SIGN OUT </Button>
        </Link>
    </div>)
};

export default UserPage;