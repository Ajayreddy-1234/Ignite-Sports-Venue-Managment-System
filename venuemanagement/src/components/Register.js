import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [tel, setTel] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("")

    
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ firstName, lastName, email, username, tel, password, userType });
        setFirstName("");
        setLastName("");
        setEmail("");
        setTel("");
        setUsername("");
        setPassword("");
        setUserType("");
    };
    const gotoLoginPage = () => navigate("/login");

    return (
        <div className='signupContainer'>
            <div classname="logo">
                <img src={logo }width={250} height={85} alt='Logo'></img>
            </div>
            <h2>Sign up</h2>
            <form className='signupForm' data-testid='registerForm' onSubmit={handleSubmit}>
            <div className="inputBoxName">
                <span className="firstSpan">
                    <input className="first"
                        placeholder="First Name"
                        type='firstName'
                        name='firstName'
                        id='firstName'
                        value={firstName}
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </span>
                <span className="lastSpan">
                    <input className="last"
                        placeholder="Last Name"
                        type='lastName'
                        name='lastName'
                        id='lastName'
                        value={lastName}
                        required
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </span>
                </div>

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
                        required={true}
                        minLength={10}
                        maxLength={10}
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
                <div className="inputBox">
                    <select onChange={(e) => setUserType(e.target.value)}>
                        <option disabled defaultValue={"role type"}>
                            Role Type
                        </option>
                        <option value={"user"}>
                            User
                        </option>
                        <option value={"owner"}>
                            Venue Owner
                        </option>
                        
                    </select>
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