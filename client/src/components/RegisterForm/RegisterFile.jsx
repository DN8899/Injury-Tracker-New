import { useState } from "react";
import { useNavigate } from "react-router-dom";


const API_BASE = "http://localhost:3000";

const PasswordError = () => {
    return (
        <p className="FieldError">Password should have at least 8 characters</p>
    );
};

/*
* Need to create a register schema for username, email, password
* 
*/


function RegisterFile() {
    const [newUsername, setUsername] = useState("");
    const [newEmail, setEmail] = useState("");
    const [newPassword, setPassword] = useState("");
    const navigate = useNavigate();

    // Putting new user data into the database
    const registerUser = async (event) => {
        event.preventDefault();
        const response = await fetch(
            API_BASE + "/register", 
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: newUsername,
                email: newEmail,
                password: newPassword,
            }),
        })

        const data = await response;

        if (data.status === 200) {
            console.log("Registration successful");
            navigate("/login");
        } else if (data.status === 400) {
            console.log("Registration failed: " , data);
            alert("Registration failed, User already exists");
        }
        else {
            alert("Something else happened")
        }


    };




    return (
        <div className="register-wrapper">
            <h1>Register</h1>
            <form >

                <div className="input-box">
                    <input 
                    type="text"
                    placeholder="Email"
                    value={newEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    />
                </div>

                <div className="input-box">
                    <input 
                    type="text" 
                    placeholder="Username"
                    value={newUsername}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
                </div>

                <div className="input-box">
                    <input 
                    type="text"
                    placeholder="Password"
                    value={newPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>

                <button type='submit' onClick={registerUser}>Submit</button>                
            </form>
        </div>
    )
}

export default RegisterFile;