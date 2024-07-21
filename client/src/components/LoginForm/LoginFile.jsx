import { FaUserInjured } from "react-icons/fa6";
import React, { useState } from 'react';
import { RiLockPasswordFill } from "react-icons/ri";
import './LoginFile.css';


const LoginFile = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    return (
        <body className="login-page">
            <div className='wrapper'>
            <form action=''>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input 
                        type='text' 
                        placeholder='Username' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
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

                    <button type='submit'>Login</button>

                    <div className="register-link">
                        <p>Don't Have an account? <a href="#">Register</a></p>
                    </div>

            </form>
            </div>
        </body>
    );
};

export default LoginFile;