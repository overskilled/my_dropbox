import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../functions/authFunction';
import './Signup.module.scss'

const Signup = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signUp(email, password);
            navigate("/home");
        } catch (err) {
            setError(err.message);
        }


        return (
            <div className="form-container sign-up-container">
                <form >
                    <h1 style={{ color: "black" }}>Create Account</h1>
                    <input
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button onClick={(e) => {handleSubmit(e)}}>Sign Up</button>
                </form>
            </div>
        );
    }
}
    export default Signup;