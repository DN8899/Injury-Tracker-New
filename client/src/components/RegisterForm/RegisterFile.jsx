import { useState } from "react";

const API_BASE = "http://localhost:3000";

const PasswordError = () => {
    return (
        <p className="FieldError">Passwrod should have at least 8 characters</p>
    );
};



function RegisterFile() {
    const [newUsername, setUsername] = useState("");
    const [newEmail, setEmail] = useState("");
    const [newPassword, setPassword] = useState("");


    // Putting new user data into the database
    const registerUser = async (newUsername, newEmail, newPassword) => {
        const data = await fetch(
            API_BASE + "/register/submit", 
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
        }).then((res) => res.json());

        // setUsername(data.username);
        // setEmail(data.email);
        // setPassword(data.password);

        console.log(newUsername);
        console.log(newPassword);
        console.log(newEmail);


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

                <button onClick={ () => registerUser(newUsername, newEmail, newPassword)}>Submit</button>                
            </form>
        </div>
    )
}

export default RegisterFile;