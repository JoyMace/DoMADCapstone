import React from './node_modules/react';
import './Register.css';

function Register() {
    return (
        <div className="register">
            <h1>Register</h1>
            <p>This is the register page.</p>
            <h1>Signup</h1>

            <form action="/api/user/signup" method="POST" >
            Username: <input type="text" name="username" /><br/>
            First Name: <input type="text" name="firstName" /><br/>
            Last Name: <input type="text" name="lastName" /><br/>
            Email: <input type="text" name="email" /><br/>
            Password: <input type="password" name="password" /><br/>
            Verify Password: <input type="password" name="verifyPassword" /><br/>
            <button type="submit">send</button>
            </form>
        </div>
    )
}

export default Register;