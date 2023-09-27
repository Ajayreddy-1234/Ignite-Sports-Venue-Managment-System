import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password });
        setPassword("");
        setEmail("");
    };

    const gotoSignUpPage = () => navigate("/register");

    return (
        
        
        <div className='loginContainer'>
            <div class="logo">
            <img src={logo }width={250} height={85} alt='Logo'></img>
            </div>
            <h2>Login </h2>
            <form className='loginForm' onSubmit={handleSubmit}>
                <div className="inputBox">
                    <i class="bx bxs-user"></i>
                    <input
                        placeholder="Email"
                        type='text'
                        id='email'
                        name='email'
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>
                <div className="inputBox">
                <i class="bx bxs-lock-alt"></i>
                    <input
                        placeholder="Password"
                        type='password'
                        name='password'
                        id='password'
                        minLength={8}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                <button className='loginBtn'>Login</button>
                <div className="forgot">
                    Forgot password?{" "}
                    <span className="forgotPasswordLink">
                        Click here
                    </span>
                </div>
                <p>
                    Don't have an account?{" "}
                    <span className='link' onClick={gotoSignUpPage}>
                        Sign up
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;