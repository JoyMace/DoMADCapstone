import React from 'react';
import './Reset_token.css'
import ReactDOM from 'react-dom'; //added to retrive token from url
import {BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";

function Reset_token() {

      let { token } = useParams();

      return (

        <div className="Reset_token">
          <div className = "form-wrapper">
          <h1 className="title">Enter New Password</h1>
          <br></br>
          <form className="action" action={"api/user/reset/"+token} method="POST">
        
                <label htmlFor="passowrd">New Password</label>
                <input required = "Required" name="password" type="password" placeholder="New password" />
           
                <label htmlFor="confirm">Confirm Password</label>
                <input required = "Required" name="confirm" type="password" placeholder="Confirm password" />
             

              
                <button className='reset-button' type="submit">Update Password</button>
              
          </form>
          </div>
        </div>

    )
}



export default Reset_token;
