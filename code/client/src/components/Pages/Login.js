import React from "react";
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
        if (username && password) {
            this.props.login(username, password);
        }
    }

  render() {
    const { loggingIn} = this.props;
    const { email, password, submitted } = this.state;
    return (
      <div className = "Login">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input name="email" type="text" placeholder="Enter your email" value={email} onChange={this.handleChange}
          />
          {submitted && !email &&
            <div className="help-block">Email is required</div>
          }

          <label htmlFor="password">Password</label>
          <input name="password" type="password" placeholder="Enter your password" value={password} onChange={this.handleChange}
          />
          {submitted && !password &&
            <div className="help-block">Password is required</div>
          }

          <button type="submit">Sign In</button>
          <p> Don't Have Account? </p>
          <p> Forgot Password? </p>
          <p> Need More Help? </p>
        </form>
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
