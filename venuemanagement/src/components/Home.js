import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

const Home = () =>{
    const navigate = useNavigate();
    const gotoLoginPage = () => navigate("/login");

    return(

            <button className='toLoginBtn' onClick={gotoLoginPage}>
                Login
            </button>
 
    )
    
}
export default Home;