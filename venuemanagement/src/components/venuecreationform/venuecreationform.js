import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import DatePicker from "react-multi-date-picker"
import "react-datetime/css/react-datetime.css";

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

    const [title, setTitle] = useState("Add Venue");
    const [page, setPage] = useState(0);
    const [completion, setCompletion] = useState(0);
    const [dates, setDates] = useState();
    const [timeCount, setTimeCount] = useState(0);
    const [times, setTimes] = useState([]);
    const [dateSelected, setDateSelected] = useState();
    const [dateNumSelected, setDateNumSelected] = useState(0);
    const [finalTimeList, setFinalTimeList] = useState([]);
    const [submitDateTime, setSubmitDateTime] = useState(false);

    const [formInputs, setFormInputs] = useState({
        reservationtype: "",
        name: "",
        addr: "",
        capacity: 0,
        sporttype: "",
        dates: [],
        time: [],
    });

    const pageButtonClick = (event) => {
        const val = parseInt(event.target.value);
        if (val === 1) {
            if (formInputs.name && formInputs.addr && formInputs.capacity && formInputs.sporttype) {
                setPage(val);
            }
        }
        else if (val === 2) {
            formInputs.dates = dates;
            setFormInputs(formInputs);
            setDateNumSelected(0);
            if (!dateSelected) {
                setDateSelected(dates[0].year + " " + dates[0].month.name + " " + dates[0].day);
            }
            setPage(val);
        }
        else if (val === 3) {
            formInputs.time = finalTimeList;
            setFormInputs(formInputs);
            setPage(val);
        }
         else {
            setPage(val);
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormInputs(values => ({...values, [name]: value}))
    };

    useEffect(() => {
        if (page === 1) {
            setTitle(formInputs.name);
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
        setTimes(times);
        setTimeCount(timeCount + 1);
    }
    const submitTimeForDate = (e) => {
        if (dateNumSelected + 1 === dates.length) {
            setSubmitDateTime(true);
        }
        setDateNumSelected(dateNumSelected + 1)
        finalTimeList.push(times);
        setFinalTimeList(finalTimeList);
        const new_times = ["16:30", "16:30"];
        setTimes([new_times]);
        setTimeCount(1);
        const new_date = dates[dateNumSelected+1].year + " " + dates[dateNumSelected+1].month.name + " " + dates[dateNumSelected+1].day;
        setDateSelected(new_date);
    }
    const items = Array.from({ length: timeCount }).map((_, i) => (
        <div className="childContainer">
            <input className="timeChildLeft" type="time" id={[i,0]} value={times[i][0]} onChange={handleTimeChange}/>
            <input className="timeChildRight" type="time" id={[i,1]} value={times[i][1]} onChange={handleTimeChange}/>
        </div>
    ));

    const veneuName = "name";
    const venueAddr = "addr";
    const capacity = "capacity";
    const sportType = "sporttype";
    const reservationType = "reservationtype";
    const curentDates = "dates";

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
                                    value={formInputs.name}
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="inputBox">
                                <input
                                    placeholder="Venue Address"
                                    name={venueAddr}
                                    id={venueAddr}
                                    value={formInputs.addr}
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
                                    Choose Dates &rarr;
                                </button>
                            </div>
                        </>
                    }
                    {
                        page === 2 &&
                            <>
                                <div className="inputBox">
                                    <h1>{dateSelected}</h1>
                                </div>
                                {dates.length > 0 && items}
                                <button className="addTimeForDateBtn" onClick={addTimeForDate}>
                                    Add time
                                </button>
                                <button className="submitTimeForDateBtn" onClick={submitTimeForDate}>
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
                                            <p>Times Available: {formInputs.time.join(", ")}</p>
                                        </div>
                                    </>
                                }
                                <div className='childContainer'>
                                    <button className='childLeft' value={2} onClick={pageButtonClick}>
                                            &larr; Back
                                    </button>
                                    <button className='childRight' disabled={!submitDateTime} value={3} onClick={pageButtonClick}>
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
            </div>
        </div>
    );
};

export default VenueCreationForm;