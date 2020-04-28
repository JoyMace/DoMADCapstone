import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import logo from '../../images/DoMADLogoDark.svg';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Navbar.css';
import { FaCaretDown } from 'react-icons/fa';

// it was decided that if a user was not logged in they would not be able to access the blogs page or Share Your Trip page so those are removed as options when a user isn't logged in

var loggedin = false; // need this in order to determine if the user is logged in or not

class Navbar extends React.Component {
    constructor(props) {
        super(props);
		this.state = {
            loading: 'true', reloadAccount: this.reload
        };
    }

    reload = () => { // same reload function as used in the blogs file except it calls checkLoggedInStatus instead of getTrips
        this.setState({ loading: 'true', reloadAccount: this.reload });
        this.checkLoggedInStatus(this)
          .then(res => {
            this.setState({
              loading: 'false',
              reloadAccount: this.reload
            });
          });
    }

    checkLoggedInStatus = async () => { // the get request to check if a user is logged in
        const response = await fetch('/api/user/auth/check-login'); // calling the api
        const data = await response.json();
        if (response.status === 200) { // response will be 200 if user is logged in and 500 if not
            loggedin = true;
            console.log("this is the log in response", response.status);
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
        console.log("this function is being called");
        const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" }
		};
        const response2 = await fetch('/api/user/auth/logout' , requestOptions);
        console.log("this api is being called");
        if (response2.status === 200) {
            loggedin = false;
            this.setState({
                loading: 'false',
                reloadAccount: this.reload
            });
            window.location.reload();
        }
        else {
            console.log("");
        }
    };

    render () {
        if(loggedin === true) {
            return (
                <div>
                    <header className="navbar">
                        <nav className="navbar_navigation">
                            <div className="navbar_toggle-button">
                                <DrawerToggleButton click={this.props.drawerClickHandler} />
                            </div>
                            <div className="navbar_logo"><a href="/"><img src={logo} alt="" style={{height:'50px'}}/></a></div>
                            <div className="navbar_navigation_items">
                                <ul>
                                    <li><a href="/search_locations" className="no-dropdown">Explore</a></li>
                                    <div className="separator" />
                                    <li><a href="/how_it_works" className="no-dropdown">How It works</a></li>
                                    <div className="separator" />
                                    <li><a href="/blogs" className="no-dropdown">Blogs</a></li>
                                    <div className="spacer" />
                                    <li><a href="/account" className="no-dropdown">Share Your Trip</a></li>
                                    <div className="separator" />
                                    <li className="info-dropdown">
                                        <a href="javascript:void(0)" className="info-label">Info<FaCaretDown /></a>
                                        <div className="info-dropdown-content">
                                            <Link to="/about" className="dropdown-options">About Us</Link>
                                            <Link to="/faq" className="dropdown-options">FAQ</Link>
                                            <Link to="/contact" className="dropdown-options">Contact Us</Link>
                                        </div>
                                    </li>
                                    <div className="separator" />
                                    <li className="info-dropdown">
                                        <a href="javascript:void(0)" className="info-label">Profile<FaCaretDown /></a>
                                        <div className="info-dropdown-content">
                                            <a href="/account" className="dropdown-options">Account</a>
                                            <a href="/" onClick={this.handleLogoutClick}>
                                                <div className="dropdown-options">Log Out</div>
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>
                </div>
            )
        }
        else if(loggedin === false) {
            return (
                <div>
                    <header className="navbar">
                        <nav className="navbar_navigation">
                            <div className="navbar_toggle-button">
                                <DrawerToggleButton click={this.props.drawerClickHandler} />
                            </div>
                            <div className="navbar_logo"><a href="/"><img src={logo} alt="" style={{height:'50px'}}/></a></div>
                            <div className="navbar_navigation_items">
                                <ul>
                                    <li><a href="/search_locations" className="no-dropdown">Explore</a></li>
                                    <div className="separator" />
                                    <li><a href="/how_it_works" className="no-dropdown">How It works</a></li>
                                    <div className="spacer" />
                                    <li className="info-dropdown">
                                        <a href="javascript:void(0)" className="info-label">Info<FaCaretDown /></a>
                                        <div className="info-dropdown-content">
                                            <Link to="/about" className="dropdown-options">About Us</Link>
                                            <Link to="/faq" className="dropdown-options">FAQ</Link>
                                            <Link to="/contact" className="dropdown-options">Contact Us</Link>
                                        </div>
                                    </li>
                                    <div className="separator" />
                                    <li className="info-dropdown">
                                        <a href="javascript:void(0)" className="info-label">Log In<FaCaretDown /></a>
                                        <div className="info-dropdown-content">
                                            <Link to="/login" className="dropdown-options">Log In</Link>
                                            <Link to="/register" className="dropdown-options">Register</Link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>
                </div>
            );
        }
    }
}

export default Navbar;
