import React from 'react';
import { Link } from 'react-router-dom';
import './Reset.css'

class Reset extends React.Component {
    render() {
      return (

        <div className="Reset">
          <div className = "form-wrapper">
          <h1 className="title">Reset Password</h1>
            <form className="action" action="/api/user/reset/forgot" method="POST" >
              <div className="Email">
                <label htmlFor="email">Email</label>
                <input name="email" type="text" placeholder="Enter your email"  onChange={this.handleChange}/>

              </div>

              <div className="signinbutton">
                <button type="submit">Send Link</button>
                <h4>A link will be sent shortly if the provided email has an account associated with DoMAD</h4>
              </div>
           </form>
          </div>
        </div>

    );
  }
}

export default Reset;
