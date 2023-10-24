import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png"
import { Button } from "./Button";
import ForgotPassword from "./ForgotPassword";
import NavBar from "./navBar";

var isLoggedIn = false;

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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log("Login successful:", data);
            window.localStorage.setItem("userId", data.user.user_id);
            window.localStorage.setItem("role", data.user.role);
            window.localStorage.setItem("userEmail", data.user.email);
            window.localStorage.setItem("username", data.user.username);
            isLoggedIn = true;
            console.log(isLoggedIn);
            navigate("/");
            window.location.reload();
          } else {
            const errorData = await response.json();
            console.error("Login failed:", errorData);
          }
        } catch (error) {
          console.error("Login error:", error);
        }
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
                        placeholder="Username"
                        type='text'
                        id='username'
                        name='username'
                        value={info.username}
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
export var isLoggedIn;
export default Login;