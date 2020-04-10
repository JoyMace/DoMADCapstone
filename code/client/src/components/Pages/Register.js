import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';


class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstname: '',
                lastname: '',
                emailaddress: '',
                homecountry: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password) {
            this.props.register(user);
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="Register">
              <div className="register-left">
                <h1 className="title">Create Account</h1>
                <form className="RegisterForm" onSubmit={this.handleSubmit}>
                    <div className="firstname">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                        {submitted && !user.firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className="lastname">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                        {submitted && !user.lastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className="emailaddress">
                        <label htmlFor="emailaddress">Email address</label>
                        <input type="text" className="form-control" name="emailaddress" value={user.emailaddress} onChange={this.handleChange} />
                        {submitted && !user.emailaddress &&
                            <div className="help-block">Email address is required</div>
                        }
                    </div>
                    <div className="homecountry">
                        <label htmlFor="homecountry">Home country</label>
                        <input type="text" className="form-control" name="homecountry" value={user.homecountry} onChange={this.handleChange} />
                        {submitted && !user.homecountry &&
                            <div className="help-block">Home country is required</div>
                        }
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
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
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}



export default Register;
