import React, { useState, useEffect  } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
import video from "../assets/background2.mp4"
import { Button } from "./Button";
import './homeBody.css';
import HomeCarousel from "./home-carousel/HomeCarousel";
import ReservationsList from "./reservations-list-carousel/ReservationsList";
import ChatComponent from "./chat";
import API_BASE_URL from '../apiConfig';
import axios from 'axios';

const HomeBody = () =>{
    const navigate = useNavigate();
    const gotoLoginPage = () => navigate("/login");

    // state variable to store the profile data
    const [profileData, setProfileData] = useState(null);
    const profileApiUrl = `${API_BASE_URL}/user/profile`;

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
              const response = await axios.get(profileApiUrl, {
                headers: {
                  Authorization: `Bearer ${window.localStorage.getItem("token")}`
                },
              });
          
              if (response.status === 200) {
                const data = response.data;          
                // Update the profileData state with the fetched data
                setProfileData(data);
              } else {
                console.error('Failed to fetch profile data');
              }
            } catch (error) {
              console.error('Error while fetching profile data:', error);
              // Provide a default profile data in case of an error
              setProfileData({
                user_id: 16,
                username: 'AjayReddy',
                email: 'gajulapallyajay@gmail.com',
                password_hash: '$2b$10$wFSQc6LkUjlTSDBwMO7me.m1Yu8g/.ewum.R3cL1mkGN1Uu7.bY3e',
                role: 'Admin',
                two_factor_enabled: null,
                two_factor_secret: null,
                created_at: '2023-10-09T17:30:49.000Z',
                update_at: '2023-10-09T17:30:49.000Z',
              });
            }
          };

        fetchProfileData();
    }, []); // The empty dependency array ensures this effect runs once when the component mounts

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
            <div class='profileContainer'><span class='profileHeading'>My Account</span><a className='editProfile' href='edit()' >(edit)</a>
            {profileData && (

                <table className='profileTable'>
                  <tbody  className='profileTableData'>
                    <tr>
                      <td>User ID</td> 
                      <td>{profileData.user_id}</td>
                    </tr>
                    <tr>
                      <td>Username</td>
                      <td>{profileData.username}</td> 
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>{profileData.email}</td>
                    </tr>
                    <tr>
                      <td>Role</td>
                      <td>{profileData.role}</td>
                    </tr>
                  </tbody>
                </table>
                )}
            </div>

            <ReservationsList/>    
            <HomeCarousel/>
            <ChatComponent/>
        </div>
    )
    
}
export default HomeBody;