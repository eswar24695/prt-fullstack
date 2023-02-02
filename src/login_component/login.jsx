import React from "react";
import { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login=()=>{
    const navigate =useNavigate();
    const [login_details,setLogin]= useState({name:'',password:""});
    const [errormessage,setError]= useState("");
    const passwordhandler=(e)=>{
        if(e.target.value.length<6){
            setError("password length is minimum 6 letters")
        }
        else{
        setLogin({...login_details,password:e.target.value});
        setError("")
        }
    }
    const submitHandler=async (e)=>{
        e.preventDefault();
        const { name, password } = login_details;
        await fetch(`http://localhost:6800/login`, {
        method: "POST",
        body: JSON.stringify({
            name: name,
            password: password,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.user);
            if (data.status === "Failed") {
            setError(data.message);
            } else {
            const token = data.token;
            const user=JSON.stringify( data.user);
            localStorage.setItem('token',token)
            localStorage.setItem('userData',user)
            navigate("/home");
            }
        })
        .catch((e) => {
            console.log(e);
            setError("Server down. try after sometime !!");
        });
    }
    return(
        <body className="login_body">
            <div className="login_container">
                <h1 style={{"marginLeft":"1.5rem"}}>Member Login</h1>
                <form onSubmit={submitHandler}>
                    <input type="text" placeholder="username" onChange={(e)=>{setLogin({...login_details,name:e.target.value})}} required className="login_cred"></input><br></br>
                    <input type="password" placeholder="password" onChange={passwordhandler} required className="login_cred"></input>
                    <div className="login_submit"><button type="submit" className="login_button">Login</button></div>
                </form>
                <p style={{"color":"red"}}>{errormessage}</p>
                <p className="login-signup">Don't have an account <span className="login_to_register" onClick={()=>navigate('/signup')} style={{"color":"blue"}}>Register</span></p>

            </div>
        </body>
    )
}

export default Login