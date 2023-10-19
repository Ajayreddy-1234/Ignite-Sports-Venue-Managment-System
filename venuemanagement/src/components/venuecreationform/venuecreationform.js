import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import Calendar from 'react-calendar';

function validateFormInputs(formInputs) {
    let missingTotal = 0;
    if (!formInputs.venuename) {
        console.log("Missing Venue Name.");
        missingTotal += 1
    }
    if (!formInputs.venueaddr) {
        console.log("Missing Address.");
        missingTotal += 1
    }
    if (formInputs.capacity < 1) {
        console.log("Capacity must be greater than 1.");
        missingTotal += 1
    }
    if (!formInputs.sporttype) {
        console.log("Must choose Sport Type.");
        missingTotal += 1
    }
    return parseInt(((4.001 - missingTotal) / 7) * 100);
}
const VenueCreationForm = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("Add Venue");
    const [page, setPage] = useState(0);
    const [completion, setCompletion] = useState(0);
    const [dates, setDates] = useState(new Date());
    const [dateCountList, setDateCountList] = useState([0]);

    const [formInputs, setFormInputs] = useState({
        reservationtype: "",
        venuename: "",
        venueaddr: "",
        capacity: 0,
        sporttype: "",
        date: [],
    });

    const chooseDateTimeButtonClick = (event) => {
        if (formInputs.venuename && formInputs.venueaddr && formInputs.capacity && formInputs.sporttype) {
            setPage(1);
        }
    }


    const addDateTime = (event) => {
        let newDates = dateCountList.slice();
        newDates.push(dateCountList.length + 1);
        setDateCountList(newDates);
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormInputs(values => ({...values, [name]: value}))
    };
    const handleDateChange = (event, index) => {
        setDates(event.target.value);
    };
    useEffect(() => {
        if (page === 1) {
            setTitle(formInputs.venuename);
        } else {
            setTitle("Add Venue");
        }
    }, [page]);

    useEffect(() => {
        setCompletion(validateFormInputs(formInputs));
    }, [formInputs]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formInputs);
    };

    const veneuName = "venuename";
    const venueAddr = "venueaddr";
    const capacity = "capacity";
    const sportType = "sporttype";
    const reservationType = "reservationtype";
    const date = "date";

    return (
        <div className='venueCreationBody'>
            <div className='venueCreationContainer'>

                <div className="logo">
                    <img src={logo }width={250} height={85} alt='Logo'></img>
                </div>

                <h2><i>{`${title}`}</i> availabilty:</h2>
                <form className='venueCreationForm' onSubmit={handleSubmit}>
                    {page === 0 &&
                        <>
                            <div className="inputBox">
                                <select name={reservationType} id={reservationType} required onChange={handleChange}>
                                    <option value={""} selected disabled>
                                        -- Choose reservation type --
                                    </option>
                                    <option value={"Venue"}>
                                        Venue
                                    </option>
                                    <option value={"Player"}>
                                        Player
                                    </option>
                                    <option value={"Activity"}>
                                        Activity
                                    </option>
                                </select>
                            </div>
                            <div className="inputBox">
                                <input
                                    placeholder="Venue Name"
                                    name={veneuName}
                                    id={veneuName}
                                    value={formInputs.venuename}
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    placeholder="Venue Address"
                                    name={venueAddr}
                                    id={venueAddr}
                                    value={formInputs.venueaddr}
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    placeholder="Venue Capacity"
                                    type="number"
                                    min="1"
                                    name={capacity}
                                    id={capacity}
                                    value={formInputs.capacity}
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="inputBox">
                                <select name={sportType} id={sportType} required onChange={handleChange}>
                                    <option value={""} selected disabled>
                                        -- Choose a sport --
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

                            <button className='chooseDateTimeBtn' onClick={chooseDateTimeButtonClick}>
                                Choose availabilty &rarr;
                            </button>
                        </>
                    }
                    {/* {page === 1 && */}
                        <>
                            <button className='Add Date Time' onClick={addDateTime}>
                                Choose availabilty &rarr;
                            </button>
                            <Calendar />
                        </>
                    {/* } */}
                    <div className='inputBox'>
                        <div className='progressContainer'>
                            <div className='progressBar' style={{width: `${completion}%`}}>
                                { completion > 10 &&
                                    <p>{completion}%</p>
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VenueCreationForm;