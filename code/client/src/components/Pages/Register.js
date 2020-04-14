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
        const { registering } = this.props;
        const { username, firstName, lastName, emailaddress, password, verifyPassword, submitted, homecountry } = this.state;
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
                        {submitted && !lastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className="emailaddress">
                        <label htmlFor="emailaddress">Email address</label>
                        <input type="text" className="form-control" name="emailaddress" value={emailaddress} onChange={this.handleChange} />
                        {submitted && !emailaddress &&
                            <div className="help-block">Email address is required</div>
                        }
                    </div>
                    <div className="homecountry">
                        <label htmlFor="homecountry">Home country</label>
                        <input type="text" className="form-control" name="homecountry" value={homecountry} onChange={this.handleChange} />
                        {submitted && !homecountry &&
                            <div className="help-block">Home country is required</div>
                        }

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

                  <h2>Register Now – It’s quick & easy!</h2>
                  <h2>By registering you’ll be able to log your trips, share your travel experiences, and rate your donations.</h2>

                  <h2>DoMAD will never sell your personal information.</h2>
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
