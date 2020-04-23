import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';


class Register extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                verifyPassword: '',
                password: '',
                submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }


    handleSubmit(e) {
          e.preventDefault();
          this.setState({ submitted: true });
          const { username, firstName, lastName, email, password, verifyPassword } = this.state;
          if ((username && firstName && lastName && email && password && verifyPassword)) {
              this.props.Register(username, firstName, lastName, email, password, verifyPassword);
          }

      }

    render() {
        const { username, firstName, lastName, email, password, verifyPassword } = this.state;
        return (
            <div className="Register">
              <div className="register-left">
                <h1 className="title">Create Account</h1>
                <form className="RegisterForm" onSubmit={this.handleSubmit} action="/api/user/auth/signup" method="POST">
                    <div className="username">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                    </div>
                    <div className="firstName">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={firstName} onChange={this.handleChange} />

                    </div>
                    <div className="lastName">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={lastName} onChange={this.handleChange} />

                    </div>
                    <div className="email">
                        <label htmlFor="email">Email address</label>
                        <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />

                    </div>

                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />

                    </div>
                    <div className="verifyPassword">
                        <label htmlFor="verifyPassword">Verify Password</label>
                        <input type="password" className="form-control" name="verifyPassword" value={verifyPassword} onChange={this.handleChange} />

                    </div>
                    <div className="createAccount">
                      <button type="submit">Create Account</button>
                      <small>
                        <Link to="/login" className="Accountlink">Already Have an Account?</Link>
                      </small>
                    </div>
                </form>
              </div>
              <div className="register-right-info">
                  <div className="right-info-content">
                    <h1>Register Now - It’s quick & easy!</h1>
                    <br></br>
                    <h2>By registering you’ll be able to log your trips, share your travel experiences, rate your donations and view other traveler blogs.</h2>
                    <br></br>
                    <h2>DoMAD will never sell your personal information.</h2>
                  </div>
              </div>
            </div>
        );
    }


handleChange = event => {
  this.setState({
    [event.target.name]: event.target.value
  });
};

handleSubmit = event => {
  console.log("Submitting");
  console.log(this.state);
  };
}



export default Register;
