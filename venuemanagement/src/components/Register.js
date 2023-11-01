import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
import captchaSendRequest from "./captchaSendRequest";
import ReCAPTCHA from "react-google-recaptcha";
const Register = () => {
    //const [email, setEmail] = useState("");
    //const [username, setUsername] = useState("");
    //const [password, setPassword] = useState("");
    //const [userType, setUserType] = useState("");
    const [info, setInfo] = useState({});

    const recaptchaRef = React.createRef();

    const navigate = useNavigate();

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
        const recaptchaValue = recaptchaRef.current.getValue();

        const message = captchaSendRequest(recaptchaValue);

        if (!message === "success") {
            console.log("failed", message);
        }
        try {
          const response = await fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log("Registration successful:", data);
            navigate("/login");
          } else {
            const errorData = await response.json();
            console.error("Registration failed:", errorData);
          }
        } catch (error) {
          console.error("Registration error:", error);
        }
      };

    const gotoLoginPage = () => navigate("/login");

    return (
        <div className='signupBody'>
        <div className='signupContainer'>
            <div className="logo">
                <img src={logo }width={250} height={85} alt='Logo'></img>
            </div>
            <h2>Sign up</h2>
            <form className='signupForm' data-testid='registerForm' onSubmit={handleSubmit}>
            

                <div className="inputBox">
                <i className='bx bxs-envelope'/>
                    <input
                        placeholder="Email"
                        type='email'
                        name='email'
                        id='email'
                        value={info.email}
                        required
                        //onChange={(e) => setInfo(e.target.value)}
                        onChange={handleChange}
                    />
                </div>
                <div className="inputBox">
                <i className="bx bxs-user"/>
                    <input
                        placeholder="Username"
                        type='text'
                        id='username'
                        name='username'
                        value={info.username}
                        required
                        //onChange={(e) => setInfo(e.target.value)}
                        onChange={handleChange}
                    />
                </div>
                <div className="inputBox">
                <i className="bx bxs-lock-alt"></i>
                    <input
                        placeholder="Password"
                        type='password'
                        name='password'
                        id='password'
                        minLength={8}
                        required
                        value={info.password}
                        //onChange={(e) => setInfo(e.target.value)}
                        onChange={handleChange}
                    />
                </div>
                <div className="inputBox">
                    <select name='role' id='role'value={info.role} onChange={handleChange} required>
                        <option>
                            Role Type
                        </option>
                        <option value={"Attendee"}>
                            Attendee
                        </option>
                        <option value={"Admin"}>
                            Admin
                        </option>
                        <option value={"Organizer"}>
                            Organizer
                        </option>
                    </select>
                </div>
                <ReCAPTCHA 
                    ref={recaptchaRef}
                    sitekey={"6LdAz9EoAAAAADcjpAdNdL8WLScq5oeB2u6-5xVB"}
                    required
                />
                    <button className='signupBtn' data-testid='register'>
                        Sign Up
                    </button>
                <p>
                    Already have an account?{" "}
                    <span className='link' onClick={gotoLoginPage}>
                        Login
                    </span>
                </p>
            </form>
        </div>
        </div>
    );
};

export default Register;