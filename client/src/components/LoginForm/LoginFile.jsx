import { FaUserInjured } from "react-icons/fa6";
import React, { useState } from 'react';
import { RiAlarmWarningFill, RiLockPasswordFill } from "react-icons/ri";
import './LoginFile.css';
import { useNavigate } from 'react-router-dom';

const API_BASE = "http://localhost:3000";


function LoginFile() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("")
    const navigate = useNavigate();

    // Calls Async on the route to check if the user is in the database
    // Preventdefault to stop from reloading the page
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(
            API_BASE + "/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            }
        )
        const data = await response;

        if (data.status === 200) {
            alert("Login successful");
            navigate("/");
        }
        else if (data.status === 404) {
            alert("User does not exist. Please register");
            navigate("/register");
            console.log(data)
        }
        else if (data.status === 400) {
            alert("Password is incorrect");
        }
        
    }


    return (
        <div className="login-page">
            <div className='wrapper'>
            <form action=''>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input 
                        type='text' 
                        placeholder='Username' 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                        />
                        <FaUserInjured className="icon"/>
                    </div>
                    <div className="input-box">
                        <input 
                        type='password'
                        placeholder='Password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        />
                        <RiLockPasswordFill className="icon"/>
                    </div>

                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember me</label>
                        <a href="#">Forgot Password?</a>
                    </div>

                    <button type='submit' onClick={handleSubmit}>Login</button>

                    <div className="register-link">
                        <p>Don't Have an account? <a href="http://localhost:3001/register">Register</a></p>
                    </div>

            </form>
            </div>
        </div>
    );
};

export default LoginFile;