import React from "react";
import { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const Signup=()=>{
    const navigate= useNavigate();
    const [userdetails,setDetails]= useState({username:"",password:""});
    const [errormessage,setError]= useState("");
    const [confirm,setConfirm]= useState("");
    const [accept,setAccept]= useState(false)
    const passwordhandler=(e)=>{
        if(e.target.value.length<6){
            setError("password length is minimum 6 letters")
        }
        else{
        setDetails({...userdetails,password:e.target.value});
        setError("")
        }
    }
    const confirmhandler=(e)=>{
        if(e.target.value!==userdetails.password){
            setError("password dont match")
            setAccept(false)
        }
        else{
            setConfirm(e.target.value)
            setAccept(true)
            setError("")
        }
    }
    const handlesubmit=async (e)=>{
        // if(userdetails.username==='' || userdetails.password==='' || confirm===''){
        //     setError("All fields must be filled")
        // }
        e.preventDefault();
       if(accept && errormessage===''){
        const {username,password}= userdetails;
        await fetch(`http://localhost:6800/register`,{
            method:"POST",
            body: JSON.stringify({
                name:username,
                password:password
            }),
            headers:{
                "content-Type":"application/json"
            },
        }).then((res)=> res.json())
        .then((data)=>{
            if(data.message ==="Account already exists"){
                alert("user already exists. please login!");
                navigate("/")
            }else{
                alert("Registration Successful");
                navigate("/", { replace: true });
            }
        })
        .catch((e)=>{
            alert(e.message)
        })
            
        }

    }
    return(
        <body className="signup_body">
            <div className="signup_container">
                <h1 style={{"marginLeft":"4rem"}}>Register</h1>
                <form onSubmit={handlesubmit}>
                    <input type="text" placeholder="username" onChange={(e)=>{setDetails({...userdetails,username:e.target.value})}} required className="signup_cred"></input><br></br>
                    <input type="password" placeholder="password" onChange={passwordhandler} required className="signup_cred"></input><br></br>
                    <input type="password" placeholder="confirm password" onChange={confirmhandler} required className="signup_cred"></input><br></br>
                    <div className="signup_submit"><button  type="submit" className="submit_button">Register</button></div>
                </form>
                <p style={{"color":"red"}}>{errormessage}</p>
                <span style={{"color":"red","marginLeft":"75px"}} onClick={()=>{navigate('/')}}>Member Login</span>

            </div>
        </body>
    )
}

export default Signup