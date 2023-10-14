import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"

const VenueCreationForm = () => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        venuename: "",
        venueaddr: "",
        capacity: 0,
        sporttype: "",
    });

    const chooseDateTimeButtonClick = (event) => {
        console.log("datebutton clicked!!");
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;        
        setInputs(values => ({...values, [name]: value}))
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
    };

    const veneuName = "venuename";
    const venueAddr = "venueaddr";
    const capacity = "capacity";
    const sportType = "sporttype";

    return (
        <div className='venueCreation'>
            <div className='venueCreationContainer'>

                <div className="logo">
                    <img src={logo }width={250} height={85} alt='Logo'></img>
                </div>

                <h2>Add Venue</h2>
                <form className='veneuCreationForm' onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <input
                            placeholder="Venue Name"
                            name={veneuName}
                            id={veneuName}
                            value={inputs.venuename}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputBox">
                        <input
                            placeholder="Venue Address"
                            name={venueAddr}
                            id={venueAddr}
                            value={inputs.venueaddr}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputBox">
                        <input
                            placeholder="Venue Capacity"
                            name={capacity}
                            id={capacity}
                            value={inputs.capacity}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="inputBox">
                        <select name={sportType} id={sportType} value={inputs.sporttype} onChange={handleChange}>
                            <option>
                                Sport
                            </option>
                            <option value={"Soccer"}>
                                Soccer
                            </option>
                            <option value={"Football"}>
                                Football
                            </option>
                            <option value={"Basketball"}>
                                Basketball
                            </option>
                        </select>
                    </div>

                    <button className='chooseDateTime' onClick={chooseDateTimeButtonClick}>
                        Choose availabilty &rarr;
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VenueCreationForm;