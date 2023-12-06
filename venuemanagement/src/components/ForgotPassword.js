import React, {useState, useEffect} from "react";
import { Button } from "./Button";
import {Link, useNavigate} from 'react-router-dom';

const ForgotPassword = () => {

    const [info, setInfo] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
    console.log("handleChange called");
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    
    setInfo(values => ({...values, [name]: value}))
    console.log(value);
    }
    const handleSignout = () => {
      window.localStorage.clear();
      navigate("/");
      window.location.reload();
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch("/api/forgot-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log("Password reset email sent:", data.message);
            setSuccessMessage("Password reset email sent successfully. Redirecting to the Login page...");
                setShowSuccessMessage(true);

                setTimeout(() => {
                    window.location.href = "/login";
                }, 1000);
          } else {
            const errorData = await response.json();
            console.error("Failed to send password reset email:", errorData.msg);
          }
        } catch (error) {
          console.error("Password reset error:", error);
        }
      };
      useEffect(() => {
        if (showSuccessMessage) {
            // Clear the success message and hide it after 3 seconds
            setTimeout(() => {
                setSuccessMessage("");
                setShowSuccessMessage(false);
            }, 10000); 
        }
      }, [showSuccessMessage]);

    return(
        <div className="forgotPasswordBody">
            <div className="forgotPasswordContainer">
                <h2>
                    Forgot Password
                </h2>
                <form className="forgotPasswordForm" onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <input className="input" name='email' placeholder="Email"                         
                        value={info.email}
                        required
                        onChange={handleChange}/>
                    </div>
                    <Button className="sendEmail" buttonStyle='button'>Send Email</Button>
                </form>
                {showSuccessMessage && (
                    <div className="inviteFriendMessageContainer">
                        <p className="inviteFriendMessage">{successMessage}</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ForgotPassword;