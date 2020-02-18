import React from 'react';
import './Reset_token.css'
import ReactDOM from 'react-dom'; //added to retrive token from url
import {BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

function Reset_token() {

      let { token } = useParams();

      return (

        <div className="reset_token">

          <h1>Reset Password</h1>

          <h1>{token}</h1>

          <form action={"api/user/reset/"+token} method="POST">
              Password: <input type="password" name="password" placeholder="New password" /><br/>
              Confirm: <input type="password" name="confirm" placeholder="Confirm password" /><br/>
              <button type="submit" >Update Password</button>
          </form>
        </div>

    )
}



export default Reset_token;
