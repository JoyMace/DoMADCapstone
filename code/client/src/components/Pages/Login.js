import React from "react";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import './Login.css';
import axios from 'axios';

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
        this.setState({ submitted: false });
        const { username, password } = this.state;
        if ((username && password)) {
            this.props.login(username, password);
        }
        let currentComponent = this;

    axios.post('/api/user/auth/login',{username:this.state.username,password:this.state.password})
    .then(function(response){

        if(response.status === 200){
            currentComponent.setState({ submitted: true });
        }
    })
  }

  render() {
    const { username, password, submitted } = this.state;
    if (this.state.submitted) {
      // redirect to account page if signed in
      return <Redirect to = {{ pathname: "/account/:username" }} />;
    }
    return (
      <div className = "Login">
       <div className = "form-wrapper">
        <h1 className="title">Log In To DoMAD</h1>
        <form className="LoginForm" onSubmit={this.handleSubmit}  >

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
            <button type="submit" className="signinbuttonstyling">Sign In</button>
            <ul className="accountlink"><Link to="/register" className="accountlink">Don't Have Account?</Link></ul>
            <ul className="accountlink"><Link to="/forgot" className="accountlink"> Forgot Password? </Link></ul>
            <ul className="accountlink"><Link to="/contact" className="accountlink">Need More Help?</Link></ul>
          </div>
        </form>
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

    axios.post('/api/user/auth/login',{username:this.state.username,password:this.state.password})
    .then(function(response){

        if(response.status === 200){
            currentComponent.setState({ submitted: true });
        }
    })
  };
}

export default Login;