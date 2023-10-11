import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
import video from "../assets/background2.mp4"
import { Button } from "./Button";
import './homeBody.css';

const HomeBody = () =>{
    const navigate = useNavigate();
    const gotoLoginPage = () => navigate("/login");

    return(
        <div className="homeContainer">
            <video src={video} autoPlay loop muted/>
            <div className="homeBodyButtons">
                <Link to="/venues">
                    <Button className='buttons' buttonStyle="buttonOutline" buttonSize="buttonLarge">
                        RESERVE NOW
                    </Button>
                </Link>
            </div>
            
        </div>
    )
    
}
export default HomeBody;