import React from 'react';
import './Login.css'

function Login() {
    return (
        <div className="login">
            <h1>Login</h1>
            <p>This is the login page.</p>

            <h1>Login</h1>

            <form action="/api/user/login" method="POST" >
                Username: <input type="text" name="username" /><br/>
                Password: <input type="password" name="password" /><br/>
                <button type="submit">send</button>
            </form>

            <li><a href="/forgot">Reset Password</a></li>

            <form action="/api/user/logout" method="POST" >
                <button type="submit">logout</button>
            </form>
        </div>
    )
}

export default Login;
