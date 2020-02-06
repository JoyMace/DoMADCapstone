import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ReactDOM from 'react-dom'; //added to retrive token from url
import {BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";


class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));

  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body;
  };


  render() {

    return (
      <Router>
      <div>
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

        <h1>Login</h1>

        <form action="/api/user/login" method="POST" >
          Username: <input type="text" name="username" /><br/>
          Password: <input type="password" name="password" /><br/>
          <button type="submit">send</button>
        </form>

        <h1>Reset Password</h1>

        <form action="/api/user/forgot" method="POST" >
          Email: <input type="text" name="email" /><br/>
          <button type="submit">reset password</button>
        </form>


        <h1>Enter Reset Password Credentials</h1>

        <div>
          <Switch>
            <Route path="/:token" children={<Token />} />
          </Switch>
        </div>


        <form action="/api/user/logout" method="POST" >
          <button type="submit">logout</button>
        </form>
      </div>
      </Router>
    );
  }

}



//Function to retrive token from password reset url
function Token() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { token } = useParams();

  return (

    <form action={"api/user/"+token} method="POST">
        password: <input type="password" name="password" placeholder="New password" />
        confirm: <input type="password" name="confirm" placeholder="Confirm password" />
        <button type="submit" >Update Password</button>
    </form>

  );
}

export default App;
