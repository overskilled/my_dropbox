import React, { useState } from 'react'
import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    // State for signup form
    const [signupCredentials, setSignupCredentials] = useState({ email: '', password: '' });
    const [signupError, setSignupError] = useState('')

    const handleSignupCredentialsChange = (e) => {
        e.preventDefault();
        setSignupCredentials({ ...signupCredentials, [e.target.name]: e.target.value });
        console.log(signupCredentials);
    }

    const handleSignup = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, signupCredentials.email, signupCredentials.password)
            .then((usersCredential) => {
                // Signed up 
                const user = usersCredential.user;
                console.log("User:", user);
                alert("Welcome to my dropbox");

                console.log("UserCredentials:", user);
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Wrong Signup credentials")
            });

    }


    return (
        <div className="form-container sign-up-container">
            <form onSubmit={handleSignup}>
                <h1 style={{ color: "black"}}>Create Account</h1>
                
                <input
                    type="text"
                    name="name"
                    value={signupCredentials.name}
                    onChange={handleSignupCredentialsChange}
                    placeholder="Name"
                />
                <input
                    type="email"
                    name="email"
                    value={signupCredentials.email}
                    onChange={handleSignupCredentialsChange}
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={signupCredentials.password}
                    onChange={handleSignupCredentialsChange}
                    placeholder="Password"
                />
                <button>Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;