import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png"
import { Button } from "./Button";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
    //const [email, setEmail] = useState("");
    //const [password, setPassword] = useState("");
    const navigate = useNavigate();
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
        //    setPassword("");
        //    setEmail("");
    };

    const gotoSignUpPage = () => navigate("/register"); 

    return (
        
        <div className="loginBody">
        <div className='loginContainer'>
            <div className="logo">
                <img src={logo }width={250} height={85} alt='Logo'></img>
            </div>
            <h2>Login </h2>
            <form className='loginForm' data-testid='loginForm' onSubmit={handleSubmit}>
                <div className="inputBox">
                    <i className='bx bxs-envelope'/>
                    <input
                        placeholder="Email"
                        type='text'
                        id='email'
                        name='email'
                        value={info.email}
                        required
                        //onChange={(e) => setEmail(e.target.value)}
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
                        onChange={handleChange}
                        //onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                <button className="loginBtn"> Login </button>
                <div className="forgot">
                    Forgot password?{" "}
                    <Link to="/forgot-password" className="forgotPasswordLink">
                        Click here
                    </Link>
                </div>
                <p>
                    Don't have an account?{" "}
                    <span className='link' data-testid="toSignin" onClick={gotoSignUpPage}>
                        Sign up
                    </span>
                </p>
            </form>
        </div>
        </div>
    );
};

export default Login;