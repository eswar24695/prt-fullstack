import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./home.css"

const Home = () => {
    const navigate = useNavigate()
    const [getalltasks, setgetalltask] = useState([])
    const [inputtext, setInputtext] = useState({ Activity: "" })
    const user = JSON.parse(window.localStorage.getItem("userData"));
    const [start, setStart] = useState(false);
    const [time, setTime] = useState(0);
    const [buttonText, setButtonText] = useState("Start");

    const token = localStorage.getItem("token");
    const config = {
        headers: {
            token: token
        }
    }


    useEffect(() => {
        let interval = null;
        if (start) {
            interval = setInterval(() => {
                setTime(time => time + 1);
            }, 1000);
        } else if (!start && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [start, time]);

    const handleStart = () => {
        setStart(true);
        setButtonText("End");
    };

    const handleStop = () => {
        setStart(false);
        setButtonText("Start");
    };

    const handlePause = () => {
        setStart(false);
        setButtonText("Resume");
    };

    const formatTime = time => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        axios.get("https://todobackend-8h8i.onrender.com/tasks/all", config)
            .then((res) => {
                console.log(res.data.data)
                setgetalltask(res.data.data);
            })
            .catch((e) => {
                console.log(e.message);
            })
    }, [])
    const sendtask = async (inputtext) => {
        await axios.post("https://todobackend-8h8i.onrender.com/tasks/addtask", inputtext, config)
            .then((res) => {
                setgetalltask([...getalltasks, res.data.data]);
                console.log(res.data.data);
                document.location.reload();

            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <>
            <div className="home">
                <div className="header">
                    <div className="username">{user.name.split("@")[0]}</div>
                </div>
                <div className="home-body">
                    <div className="sidebar">
                        <h1 style={{ "marginLeft": "5rem" }}>History</h1>
                        <button className="deletebutton" onClick={() => { localStorage.clear(); navigate("/") }}>Logout</button>
                    </div>
                    <div className="activity-main">
                        <div className="input">
                            <input className="searchbar" type="text" name="Activity" onChange={(e) => { setInputtext({ inputtext, Activity: e.target.value }) }} />
                            <button onClick={() => { sendtask(inputtext) }}>Add new activity</button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Activity</th>
                                    <th>Status</th>
                                    <th>Time taken</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getalltasks?.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>{item.Activity}</td>
                                            <td>{item.status}</td>
                                            <td>{formatTime(time)}</td>
                                            <td>
                                                {start ? (
                                                    <button onClick={handlePause}>Pause</button>
                                                ) : (
                                                    <button onClick={handleStart}>{buttonText}</button>
                                                )}
                                                {start && <button onClick={handleStop}>End</button>}
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;