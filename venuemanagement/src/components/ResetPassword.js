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



    return(
        <div className="resetPasswordBody">

            <div className="resetPasswordContainer">
            <h2>
                Reset Password
            </h2>
                <form className="resetPasswordForm">
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