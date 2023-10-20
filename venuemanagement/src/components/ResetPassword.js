import React, {useState} from "react";
import { Button } from "./Button";

//var checkPassword = false;

const ResetPassword = () => {

    const [info, setInfo] = useState({});
    const handleChange = (event) => {
        console.log("handleChange called");
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;

        setInfo(values => ({...values, [name]: value}))
        console.log(value);
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
          } else {
            const errorData = await response.json();
            console.error("Password reset failed:", errorData.msg);
          }
        } catch (error) {
          console.error("Password reset error:", error);
        }
      };

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
            </div>
        </div>
    );
};

export default ResetPassword;