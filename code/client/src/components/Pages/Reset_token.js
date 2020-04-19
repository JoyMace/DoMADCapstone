import React from 'react';
import './Reset_token.css'
import {BrowserRouter as useParams } from "react-router-dom";

function Reset_token() {

      let { token } = useParams();

      return (

        <div className="Reset_token">
          <div className = "form-wrapper">
          <h1 className="title">Enter New Password</h1>

          <form className="action" action={"api/user/reset/"+token} method="POST">

              <div className="Password">
                <label htmlFor="passowrd">New Password</label>
                <input name="password" type="password" placeholder="New password" />
              </div>

              <div className="Confirm">
                <label htmlFor="confirm">Confirm Password</label>
                <input name="confirm" type="password" placeholder="Confirm password" />
              </div>

              <div className="resetbutton">
                <button type="submit">Update Password</button>
              </div>
          </form>
          </div>
        </div>

    )
}



export default Reset_token;
