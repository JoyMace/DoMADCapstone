import React from "react";
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
        const { username, password } = this.state;
        if (!(username && password)) {
            this.props.login(username, password);
        }
    }

  render() {
    const { loggingIn} = this.props;
    const { email, password, submitted } = this.state;
    return (
      <div className = "Login">
       <div className = "form-wrapper">
        <h1 className="title">Log In To DoMAD</h1>
        <form className="LoginForm" onSubmit={this.handleSubmit}>
          <div className="email">
              <label htmlFor="email">Email</label>
              <input name="email" type="text" placeholder="Enter your email" value={email} onChange={this.handleChange}/>
              {submitted && !email &&
                <div className="help-block">Email is required</div>
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

export default Login;
