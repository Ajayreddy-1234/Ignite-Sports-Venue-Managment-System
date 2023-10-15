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
    const handleSubmit = (e) => {
    console.log("handleSubmit called");
    e.preventDefault();
        console.log({ info });
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