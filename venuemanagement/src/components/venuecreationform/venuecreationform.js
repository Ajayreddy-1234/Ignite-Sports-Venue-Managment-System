import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import DatePicker from "react-multi-date-picker";
import createVenueSendRequest from "./createVenueSendRequest";

import "react-datetime/css/react-datetime.css";
import "./styles.css";

function validateFormInputs(formInputs) {
    let missingTotal = 0;
    if (!formInputs.reservationtype) {
        console.log("Missing Reservation type.");
        missingTotal += 1
    }
    if (!formInputs.name) {
        console.log("Missing Venue Name.");
        missingTotal += 1
    }
    if (!formInputs.addr) {
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
    if (formInputs.dates.length < 1) {
        console.log("Must choose dates.");
        missingTotal += 1
    }
    if (formInputs.time.length < 1) {
        console.log("Must choose times.");
        missingTotal += 1
    }
    return parseInt(((7.001 - missingTotal) / 7) * 100);
}
const VenueCreationForm = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("Add Venue/Activity");
    const [page, setPage] = useState(0);
    const [completion, setCompletion] = useState(0);
    const [dates, setDates] = useState();
    const [times, setTimes] = useState([]);
    const [dateSelected, setDateSelected] = useState();
    const [dateNumSelected, setDateNumSelected] = useState(0);
    const [finalTimeList, setFinalTimeList] = useState([]);
    const [submitDateTime, setSubmitDateTime] = useState(false);
    const [sendRequestMessage, setSendRequestMessage] = useState("");
    const [submitPressed, setSubmitPressed] = useState(false);
    var role = "Attendee";
    if (window.localStorage && window.localStorage.length > 0) {
        role = window.localStorage.getItem('role'); 
    }
    const [formInputs, setFormInputs] = useState({
        userid: window.localStorage.getItem('userId'),
        reservationtype: "",
        name: "",
        addr: "",
        capacity: 0,
        sporttype: "",
        dates: [],
        time: [],
        datetimes: [],
    });

    useEffect(() => {
        if (window.localStorage.getItem("formInputs")) {
            setFormInputs(window.localStorage.getItem("formInputs"));
        }
    }, []);

    useEffect(() => {
        if (page === 1) {
            setTitle(formInputs.name);
        } else {
            setTitle("Add Venue/Activity");
        }
    }, [page]);

    useEffect(() => {
        setCompletion(validateFormInputs(formInputs));
    }, [formInputs]);

    useEffect(() => {
        if (document.getElementById("requestMessage")) {
            const element = document.getElementById("requestMessage");

            if (submitPressed === "success") {
                setSendRequestMessage("Creation complete!");
                element.style.backgroundColor = "green";
            } else if (submitPressed === "error") {
                setSendRequestMessage("Creation failed...");
                element.style.backgroundColor = "red";
            }
        }
    }, [submitPressed]);

    const pageButtonClick = (event) => {
        const val = parseInt(event.target.value);
        if (val === 1) {
            if (formInputs.name && formInputs.addr && formInputs.capacity && formInputs.sporttype) {
                setPage(val);
            }
        }
        else if (val === 2) {
            setFormInputs(values => ({...values, ["dates"]: dates}));
            setDateNumSelected(0);
            if (!dateSelected) {
                setDateSelected(dates[0].year + " " + dates[0].month.name + " " + dates[0].day);
            }
            setPage(val);
        }
        else if (val === 3) {
            setFormInputs(values => ({...values, ["time"]: finalTimeList}));
            formInputs.time = times;
            setPage(val);
        }
        else {
            setPage(val);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFormInputs(formInputs) < 90) {
            return;
        }
        let datetimes = []
        for (let i = 0; i < formInputs.dates.length; i++) {
            let dateString = formInputs.dates[i].year + "-" + formInputs.dates[i].month.number 
                            + "-" + formInputs.dates[i].day;
            let datetime = [];
            for (let y = 0; y < formInputs.time[i].length; y++) {
                datetime.push([dateString +  "T" + formInputs.time[i][y][0], dateString + "T" + formInputs.time[i][y][1]]);
            }
            datetimes.push(datetime);
        }
        formInputs.datetimes = datetimes;
        const val = createVenueSendRequest(formInputs)
        setSubmitPressed(val);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormInputs(values => ({...values, [name]: value}))
    };

    const handleTimeChange = (e) => {
        let time = e.target.value;
        let id = e.target.id;
        id = id.split(",");
        let row = parseInt(id[0]);
        let col = parseInt(id[1]);
        if (col === 0) {
            times[row][col] = time;
        } else {
            times[row][col] = time;
        }
        let new_times = [];
        for (let i = 0; i < times.length; i++) {
            new_times.push(times[i]);
        }
        setTimes(new_times);
    }
    const addTimeForDate = (e) => {
        times.push(["16:30", "16:30"]);
        let new_times = []
        for (let i = 0; i < times.length; i++) {
            new_times.push(times[i]);
        }
        setTimes(new_times);
    }
    const submitTimeForDate = (e) => {
        const dateNum = dateNumSelected + 1;
        if (dateNum === dates.length) {
            setSubmitDateTime(true);
        }
        setDateNumSelected(dateNum)
        let new_times = []
        for (let i = 0; i < times.length; i++) {
            if (times && times[i]) {
                new_times.push(times[i]);
            }
        }
        finalTimeList.push(new_times);
        const initial_times = ["16:30", "16:30"];
        setTimes([initial_times]);
        let new_date = "";
        if (dateNum < dates.length) {
            new_date = dates[dateNum].year + " " + dates[dateNum].month.name + " " + dates[dateNum].day;
        }
        setDateSelected(new_date);
    }
    const deleteTimePair = (e) => {
        const id = parseInt(e.target.id);
        const element = document.getElementById("container" + id);
        element.style.visibility = "hidden";
        element.style.height = "0px";
        times[id] = [];
        setTimes(times);
    }
    const items = Array.from({ length: times.length }).map((_, i) => (
        <div className="childContainer" id={"container" + i}>
            <input className="timeChildLeft" type="time" id={[i,0]} value={times[i][0]} onChange={handleTimeChange}/>
            <input className="timeChildRight" type="time" id={[i,1]} value={times[i][1]} onChange={handleTimeChange}/>
            <button className="timeChildDelete" id={i} onClick={deleteTimePair}>
                X
            </button>
        </div>
    ));

    const veneuName = "name";
    const venueAddr = "addr";
    const capacity = "capacity";
    const sportType = "sporttype";
    const reservationType = "reservationtype";

    return (
        <div className='venueCreationBody'>
            <div className='venueCreationContainer'>

                <div className="logo">
                    <img src={logo} width={250} height={85} alt='Logo'></img>
                </div>
                {role === "Attendee" && 
                    <>
                        <h3 className='error'>Attendees cannot create Venues or Activities.</h3>
                    </>
                }
                {(role === "Organizer" || role === "Admin") && 
                    <>
                    <h2><i>{`${title}`}</i></h2>
                    <form className='venueCreationForm' onSubmit={handleSubmit}>
                        {page === 0 &&
                            <>
                                <div className="inputBox">
                                    <select name={reservationType} id={reservationType} value={formInputs.reservationtype} required onChange={handleChange}>
                                        <option value={""} selected disabled>
                                            -- Choose reservation type --
                                        </option>
                                        <option value={"Venue"}>
                                            Venue
                                        </option>
                                        <option value={"Activity"}>
                                            Activity
                                        </option>
                                    </select>
                                </div>
                                <div className="inputBox">
                                    <input
                                        placeholder="Venue/Activity Name"
                                        name={veneuName}
                                        id={veneuName}
                                        value={formInputs.name}
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="inputBox">
                                    <input
                                        placeholder="Venue/Activity Address"
                                        name={venueAddr}
                                        id={venueAddr}
                                        value={formInputs.addr}
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="inputBox">
                                    <input
                                        placeholder="Capacity"
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
                                    <select name={sportType} id={sportType} value={formInputs.sporttype} required onChange={handleChange}>
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
                                <button className='chooseDateTimeBtn' value={1} onClick={pageButtonClick}>
                                    Choose availabilty &rarr;
                                </button>
                            </>
                        }
                    { page === 1 &&
                        <>
                            <h3>Choose Dates available</h3>                            
                            <div className="inputBox">
                                <DatePicker
                                    value={dates}
                                    onChange={setDates}
                                    multiple
                                    required
                                />
                            </div>
                            <div className="childContainer">
                                <button className='childLeft' value={0} onClick={pageButtonClick}>
                                    &larr; Back
                                </button>
                                <button className='childRight' value={2} onClick={pageButtonClick}>
                                    Choose Times &rarr;
                                </button>
                            </div>
                        </>
                    }
                    {
                        page === 2 &&
                            <>
                                <div className="inputBox">
                                    <h1 className="dateSelected">{dateSelected}</h1>
                                </div>
                                <div className="childContainer">
                                    <h4 className="leftTime">Start Time</h4>
                                    <h4 className="rightTime">End Time</h4>
                                </div>
                                {dates.length > 0 && items}
                                <button className="addTimeForDateBtn" onClick={addTimeForDate}>
                                    Add time
                                </button>
                                <button className="submitTimeForDateBtn" disabled={submitDateTime} onClick={submitTimeForDate}>
                                    Submit times
                                </button>
                                <div className="childContainer">
                                    <button className='childLeft' value={1} onClick={pageButtonClick}>
                                        &larr; Back
                                    </button>
                                    <button className='childRight' disabled={!submitDateTime} value={3} onClick={pageButtonClick}>
                                        Review &rarr;
                                    </button>
                                </div>
                            </>
                    }
                    {
                        page === 3 &&
                            <>
                                {validateFormInputs(formInputs) > 90 && 
                                    <>
                                        <div className="summaryContainer">
                                            <p>Name: {formInputs.name}</p>
                                            <p>Address: {formInputs.addr}</p>
                                            <p>Capacity: {formInputs.capacity}</p>
                                            <p>Sport: {formInputs.sporttype}</p>
                                            <p>Dates Available: {formInputs.dates.toString().split(",").join(", ")}</p>
                                            <p>Times Available: {formInputs.time.join("; ")}</p>
                                        </div>
                                    </>
                                }
                                { submitPressed &&
                                    <div className="sendMessage" id="sendMessage">
                                        <p id="requestMessage">{`${sendRequestMessage}`}</p>
                                    </div>
                                }
                                <div className='childContainer'>
                                    <button className='childLeft' value={2} onClick={pageButtonClick}>
                                            &larr; Back
                                    </button>
                                    <button className='childRight' disabled={!submitDateTime} value={3} onClick={handleSubmit}>
                                        Submit
                                    </button>
                                </div>
                            </>
                    }
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
            </>
            }
            </div>
        </div>
    );
};

export default VenueCreationForm;