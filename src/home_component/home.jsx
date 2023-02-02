import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./home.css"

const Home = () => {
    const navigate = useNavigate()
    const [getalltasks,setgetalltask]=useState([])
    const [inputtext,setInputtext]=useState({Activity:""})
    const user=JSON.parse(window.localStorage.getItem("userData"));
    
    const token = localStorage.getItem("token");
    const config={
        headers:{
            token:token
        }
    }
        useEffect(()=>{
            axios.get("http://localhost:6800/tasks/all",config)
            .then((res)=>{
                console.log(res.data.data)
                setgetalltask(res.data.data);
            })
            .catch((e)=>{
                console.log(e.message);
            })
        },[])
        const sendtask=async(inputtext)=>{
            await axios.post("http://localhost:6800/tasks/addtask",inputtext,config)
            .then((res)=>{
                setgetalltask([...getalltasks,res.data.data]);
                console.log(res.data.data);
                document.location.reload();

            })
            .catch((e)=>{
                console.log(e);
            })
        } 
        
return(
    <>
        <div className="home">
            <div className="header">
                <div className="username">{user.name.split("@")[0]}</div>
            </div>
            <div className="home-body">
                <div className="sidebar">
                    <h1>History</h1>
                    <button onClick={() => { localStorage.clear(); navigate("/") }}>Logout</button>
                </div>
                <div className="activity-main">
                    <div className="input">
                        <input type="text" name="Activity" onChange={(e)=>{setInputtext({inputtext, Activity:e.target.value})}}/>
                        <button onClick={()=>{sendtask(inputtext)}}>Add new activity</button>
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
                            {getalltasks?.map((item)=>{
                                return(
                                    <tr key={item._id}>
                                        <td>{item.Activity}</td>
                                        <td>{item.status}</td>
                                        <td>time</td>
                                        <td>
                                            <button>Start</button>
                                            <button>End</button>
                                            <button>Pause</button>
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
)}
export default Home;