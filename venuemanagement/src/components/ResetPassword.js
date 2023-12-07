import React, {useState, useEffect} from "react";
import { Button } from "./Button";
import {Link, useNavigate} from 'react-router-dom';

//var checkPassword = false;

const ResetPassword = () => {

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
    };
    const handleSignout = () => {
      window.localStorage.clear();
      navigate("/login");
      window.location.reload();
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const { newPassword, newPasswordConfirm } = info;
    
          if (newPassword !== newPasswordConfirm) {
            console.error("Passwords do not match");
            return;
          }
    
          const token = new URLSearchParams(window.location.search).get("token");
    
          if (!token) {
            console.error("Token is missing in query parameters");
            return;
          }
    
          const response = await fetch(`/api/reset-password?token=${token}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: newPassword }),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log("Password reset successful:", data.msg);
            setSuccessMessage("Password reset successful. Redirecting to the Login page...");
                setShowSuccessMessage(true);

                setTimeout(() => {
                    window.location.href = "/login";
                }, 1000);
          } else if(response.statusText == "Unauthorized"){
            alert("Session Timeout. Please login again!");
            handleSignout();
          }else {
            const errorData = await response.json();
            console.error("Password reset failed:", errorData.msg);
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
            }, 10000); // 3000 milliseconds (3 seconds)
        }
      }, [showSuccessMessage]);
    return(
        <div className="resetPasswordBody">

            <div className="resetPasswordContainer">
            <h2>
                Reset Password
            </h2>
                <form className="resetPasswordForm" onSubmit={handleSubmit}>
                    <div className="inputBox">
                    <input name="newPassword" placeholder="New Password"
                        value={info.password}
                        required
                        onChange={handleChange}/>
                    </div>
                    <div className="inputBox">
                    <input name="newPasswordConfirm" placeholder="Confirm Password" 
                        value={info.confirmPassword}
                        required
                        onChange={handleChange}/>                    
                    </div>
                    <Button className="changePasswordButton" buttonStyle='button' > Change Password </Button> 
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

export default ResetPassword;