import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Register.css';
import axios from 'axios';

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
          
          let currentComponent = this;
      
          axios.post('/api/user/auth/signup',
          {
            username:this.state.username,
            password:this.state.password, 
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            verifyPassword: this.state.verifyPassword
          })
          .then(function(response){
              if(response.status === 200){
                  currentComponent.setState({ submitted: true });
              }
          })

      }

    render() {
        const { username, firstName, lastName, email, password, verifyPassword } = this.state;
        if (this.state.submitted) 
        {
          return <Redirect to ={{ pathname:"/login" }} />;
        }
        return (
            <div className="Register">
              <div className='register-row'>
              <div className="register-left">
                <h1 className="title">Create Account</h1>
                <form className="RegisterForm" onSubmit={this.handleSubmit}>
                    <div className="username">
                        <label htmlFor="username">Username</label>
                        <input placeholder="Username" required="Required" type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                    </div>
                    <div className="firstName">
                        <label htmlFor="firstName">First Name</label>
                        <input placeholder="First Name" required = "Required" type="text" className="form-control" name="firstName" value={firstName} onChange={this.handleChange} />
                    </div>
                    <div className="lastName">
                        <label htmlFor="lastName">Last Name</label>
                        <input placeholder="Last Name" required = "Required" type="text" className="form-control" name="lastName" value={lastName} onChange={this.handleChange} />
                    </div>
                    <div className="email">
                        <label htmlFor="email">Email address</label>
                        <input placeholder="Email Address" required = "Required" type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password  (minimum 8 characters, one upper case, one lower case)</label>
                        <p style={{fontSize: 10}}> </p>
                        <input placeholder="Password (minimum 8 characters, one upper case, one lower case)" required = "Required" type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        
                    </div>
                    <div className="verifyPassword">
                        <label htmlFor="verifyPassword">Verify Password</label>
                        <input placeholder="Type Password Again" required = "Required" type="password" className="form-control" name="verifyPassword" value={verifyPassword} onChange={this.handleChange} />
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
              <h1 className="title">Register Now</h1>
              <h2 className="title">It’s quick & easy!</h2>
                  <div className="right-info-content">
                    <br></br>
                    <h2>By registering you’ll be able to log your trips, share your travel experiences, rate your donations and view other traveler blogs.</h2>
                    <br></br>
                    <h2>DoMAD will never sell your personal information.</h2>
                  </div>
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
      event.preventDefault();
          let currentComponent = this;
          axios.post('/api/user/auth/signup',
          {
            username:this.state.username,
            password:this.state.password, 
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            verifyPassword: this.state.verifyPassword
          })
          .then(function(response){
            console.log(response.status);
              if(response.status === 201){
                  currentComponent.setState({ submitted: true });                  
              }
          })
      console.log("Submitting", this.state.submitted);
      console.log(this.state);
      };
    
}

export default Register;
