import React, {useState} from "react";
import { Button } from "./Button";


const ForgotPassword = () => {

    const [info, setInfo] = useState({});

    const handleChange = (event) => {
    console.log("handleChange called");
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    
    setInfo(values => ({...values, [name]: value}))
    console.log(value);
    }
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
          } else {
            const errorData = await response.json();
            console.error("Failed to send password reset email:", errorData.msg);
          }
        } catch (error) {
          console.error("Password reset error:", error);
        }
      };

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
            </div>
        </div>
    );
};

export default ForgotPassword;