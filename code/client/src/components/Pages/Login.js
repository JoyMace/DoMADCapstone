import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './Login.css';
import User from './Account';

/* NOTES: We need to add an Authenticated Path that makes a HomeRoute and a Route so that when Authenticated, 
users will be redirected to their profile and not the login page*/

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
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
        const { username, password } = this.state;
        if ((username && password)) {
            this.setState({
              loggedIn: true
            })
        }

    }

  render() {
      if(this.state.loggedIn){
        return <Redirect to="/account/:userId" component={User}/>
      }
    const { loggingIn} = this.props;
    const { username, password, submitted } = this.state;
    return (
      <div className = "Login">
       <div className = "form-wrapper">
        <h1 className="title">Log In To DoMAD</h1>
        <form className="LoginForm" onSubmit={this.handleSubmit} action="/api/user/auth/login" method="POST">

          <div className="username">
              <label htmlFor="username">Username</label>
              <input name="username" type="text" placeholder="Enter your username" value={username} onChange={this.handleChange}/>
              {submitted && !username &&
                <div className="help-block">username is required</div>
              }
          </div>

          <div className="password">
              <label htmlFor="password">Password</label>
              <input name="password" type="password" placeholder="Enter your password" value={password} onChange={this.handleChange}/>
              {submitted && !password &&
                <div className="help-block">Password is required</div>
               }
          </div>
          <div className="signinbutton">
            <button type="submit">Sign In</button>
            <ul><Link to="/register" className="accountlink">Don't Have Account?</Link></ul>
            <ul><Link to="/forgot" className="accountlink"> Forgot Password? </Link></ul>
            <ul><Link to="/contact" className="accountlink">Need More Help?</Link></ul>
          </div>
        </form>
       </div>
      </div>
      );
    }

  
}

export default Login;