import React from 'react';

import './SideDrawer.css';

import { Link } from 'react-router-dom';

let drawerClasses = 'side-drawer';

var loggedin = false;

class sideDrawer extends React.Component {
    constructor(props) {
        super(props);
		this.state = {
            loading: 'true', reloadAccount: this.reload
        };
    }

    reload = () => {
        console.log('READLOAD');
        this.setState({ loading: 'true', reloadAccount: this.reload });
        this.checkLoggedInStatus(this)
          .then(res => {
            this.setState({
              loading: 'false',
              reloadAccount: this.reload
            });
          });
    }

    checkLoggedInStatus = async () => {
        const response = await fetch('/api/user/auth/check-login');
        const data = await response.json();
        if (response.status === 200) {
            loggedin = true;
            this.setState({
                loading: 'true',
                reloadAccount: this.reload
            });
        }
        else {
            loggedin = false;
            this.setState({
                loading: 'true',
                reloadAccount: this.reload
            });
        }
        return data;
    };
    
    componentDidMount() {
        this.checkLoggedInStatus(this)
        .then(res => {
            this.setState({
                loading: 'false',
                reloadAccount: this.reload
            });
        })
      .catch(err => console.log(err)); // TODO: handle all errors and relay to user
    }

    handleLogoutClick = async () => {
        const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" }
		};
        const response2 = await fetch('/api/user/auth/logout' , requestOptions);
        if (response2.status === 200) {
            loggedin = false;
            this.setState({
                loading: 'true',
                reloadAccount: this.reload
            });
            window.location.reload();
        }
        else {
            console.log("")
        }
    };

    render() {
        if(this.props.show) {
            drawerClasses = 'side-drawer open';
        }
        if(loggedin === true) {
            return (
                <nav className={drawerClasses}>
                    <ul className="side-drawer-links">
                        <li><a href="/search_locations">Explore</a></li>
                        <li><a href="/how_it_works">How It Works</a></li>
                        <li><a href="/blogs">Blogs</a></li>
                        <li><a href="/account">Share Your Trip</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/faq">FAQ</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/disclaimer">Disclaimer</a></li>
                        <li><a href="/account">Profile</a></li>
                        <div onClick={this.handleLogoutClick}>
                            <Link to="/">Log Out</Link>
                        </div>
                    </ul>
                </nav>
            )
        }
        else {
            return (
                <nav className={drawerClasses}>
                    <ul className="side-drawer-links">
                        <li><a href="/search_locations">Explore</a></li>
                        <li><a href="/how_it_works">How It Works</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/faq">FAQ</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/disclaimer">Disclaimer</a></li>
                        <li><a href="/register">Register</a></li>
                        <li><a href="/login">Login</a></li>
                    </ul>
                </nav>
            )
        }
    }
};

export default sideDrawer;