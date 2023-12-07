import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import withAuth from '../withAuth';


const EditProfileDetails = () => {
    const [info, setInfo] = useState(
        {
            userid: window.localStorage.getItem('userId'),
            role: window.localStorage.getItem('role'),
            email: window.localStorage.getItem('userEmail'),
            username: window.localStorage.getItem('username')
        }
    );
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await fetch("/api/profile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log("User update successful:", data);
          } else {
            const errorData = await response.json();
            console.error("User update failed:", errorData);
          }
        } catch (error) {
          console.error("User update error:", error);
        }
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
                window.localStorage.setItem("userId", data.user.user_id);
                window.localStorage.setItem("role", data.user.role);
                window.localStorage.setItem("userEmail", data.user.email);
                window.localStorage.setItem("username", data.user.username);
                window.localStorage.setItem("token", "Bearer " + data.authorization);
                console.log("Login successful:", data);
            } else {
              const errorData = await response.json();
              console.error("Login failed:", errorData);
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    const handleChange = (event) => {
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        
        setInfo(values => ({...values, [name]: value}))
    }

    return (
        <div className='signupBody'>
            <div className='signupContainer'>
                <h2>User Details:</h2>
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
                        <h3>Enter password and submit to change User Details</h3>
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
                            />
                        </div>
                        <button className='signupBtn'>
                            Submit Changes
                        </button>
                    </form>
                </div>
            </div>
    );

};

export default withAuth(EditProfileDetails);