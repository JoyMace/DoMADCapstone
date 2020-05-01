import React from 'react';
import { Link } from 'react-router-dom';
import './Reset.css'

class Reset extends React.Component {
    render() {
      return (

        <div className="Reset">
          <div className = "form-wrapper">
            <h1 className="title">Reset Password</h1>
            <br></br>
              <form className="action" action="/api/user/reset/forgot" method="POST" >               
                <label htmlFor="email">Email</label>
                <input name="email" type="text" placeholder="Enter your email"  onChange={this.handleChange}/>           
                <br></br>
                <button className='reset-button' type="submit">Send Link </button>
                <h4 className="reset-message-header">A link will be sent shortly if the provided email has an account associated with DoMAD. Be sure to check your spam folder if you aren't seeing an email in your inbox.</h4>
              </form>
          </div>
        </div>

    );
  }
}

export default Reset;