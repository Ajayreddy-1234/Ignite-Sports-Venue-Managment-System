import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import logo from "../assets/logo.png"

function NavBar(){
    const navigate = useNavigate();
    return(
    <>
        <nav className="navBar">
            <div className="navBarContainer">
                <div className="navBarLogo">
                    iGNITE
                </div>
            </div>
        </nav>
    </>
    );
}

export default NavBar