import React from 'react';
import './Reset.css'
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class Reset extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        email: "",
        submitted: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value})
    };

    handleSubmit = event => {
      event.preventDefault();

      let currentComponent = this;

      axios.post('/api/user/reset/forgot', { email: this.state.email })
      .then(function(response) {

        if(response.status === 304) {
          currentComponent.setState( { submitted: true } );
        }
      })
    }

    render() {
      const { email } = this.state;
      if (this.state.submitted) {
        return <Redirect to = {{ pathname: "/login" }}/>;
      }
      return (
        <div className="Reset">
          <div className = "form-wrapper">
          <h1 className="title">Reset Password</h1>
            <form className="action" onSubmit={this.handleSubmit}>
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
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value})
  };

  handleSubmit = event => {
    event.preventDefault();

    let currentComponent = this;

    axios.post('/api/user/reset/forgot', { email: this.state.email })    
    .then(function(response) {
      console.log(response.status);
      if(response.status === 304) {
        currentComponent.setState( { submitted: true } );
      }
    })
  }
}

export default Reset;
