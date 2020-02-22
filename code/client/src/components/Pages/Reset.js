import React from 'react';
import './Reset.css'

function Reset() {
      return (

        <div className="reset">

          <h1>Reset Password</h1>

          <form action="/api/user/reset/forgot" method="POST" >
                Email: <input type="text" name="email" /><br/>
                <button type="submit">reset password</button>
          </form>
        </div>

    )
}



export default Reset;
