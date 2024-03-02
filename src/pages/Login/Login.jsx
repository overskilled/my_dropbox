import React, { useState } from 'react'
import { auth } from '../../firebase/config';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    // State for login form
    const [loginCredentials, setLoginCredentials] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    ;

    const handleLoginCredentialsChange = (e) => {
        e.preventDefault();
        setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value });
        console.log(loginCredentials)
    }



    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        signInWithEmailAndPassword(auth, loginCredentials.email, loginCredentials.password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("User successfully logged In, welcome to my dropbox")
                navigate("/");
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Wrong credentials")
            })
            .finally(() => {
                setIsLoading(false); // Set loading state to false after login attempt
            });
    }

    const handlePasswordReset = () => {
        const email = prompt('Please enter your email');
        sendPasswordResetEmail(auth, email);
        alert('Email sent! Check your inbox for password reset instructions.');
    }

    if (isLoading) {
        return <p>Loading...</p>; // Display a loading state while logging in
    }




    return (
        <div className="form-container sign-in-container">
            <form onSubmit={handleLogin}>
                <h1 style={{ color: "black" }}>Sign in</h1>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={loginCredentials.email}
                    onChange={handleLoginCredentialsChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginCredentials.password}
                    onChange={handleLoginCredentialsChange}
                />
                <a href="#" onClick={handlePasswordReset}>Forgot your password?</a>
                <button>Sign In</button>
            </form>
        </div>
    );
}

export default Login;