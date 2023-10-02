import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

//    const isValidEmail = (email) => {
//        const email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//    };

    const handleSubmit = (e) => {
        console.log("handleSubmit called");
        e.preventDefault();
//        if (!isValidEmail(email)) {
//            alert("Invalid email");
//        }
//        else{
            console.log({ email, password });
            setPassword("");
            setEmail("");
//        }
    };

    const gotoSignUpPage = () => navigate("/register");

    return (
        
        
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
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                <button className='loginBtn' data-testid="loginButton">Login</button>
                <div className="forgot">
                    Forgot password?{" "}
                    <span className="forgotPasswordLink">
                        Click here
                    </span>
                </div>
                <p>
                    Don't have an account?{" "}
                    <span className='link' data-testid="toSignin" onClick={gotoSignUpPage}>
                        Sign up
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;