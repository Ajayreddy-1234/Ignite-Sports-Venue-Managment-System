import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [tel, setTel] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, username, tel, password });
        setEmail("");
        setTel("");
        setUsername("");
        setPassword("");
    };
    const gotoLoginPage = () => navigate("/");

    return (
        <div className='signupContainer'>
            <div classname="logo">
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
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="inputBox">
                <i className="bx bxs-user"/>
                    <input
                        placeholder="Username"
                        type='text'
                        id='username'
                        name='username'
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="inputBox">
                    <i className='bx bxs-phone'/>
                    <input
                        placeholder="Phone number"
                        type='tel'
                        name='tel'
                        id='tel'
                        value={tel}
                        required
                        onChange={(e) => setTel(e.target.value)}
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
                <button className='signupBtn' data-testid='register'>Sign Up</button>
                <p>
                    Already have an account?{" "}
                    <span className='link' onClick={gotoLoginPage}>
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Register;