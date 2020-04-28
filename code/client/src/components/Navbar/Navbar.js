import React from 'react';
import { Link, Redirect } from 'react-router-dom';
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
            loading: 'true', reloadAccount: this.reload, redirect: false
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
        if (response.status === 200) { // response will be 200 if user is logged in and 500 if not
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

    // set redirect to true when called
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    // redirect to home page when called if redirect is set to true
    renderRedirect = () => {
        if(this.state.redirect) {
            return <Redirect to="/" />
        }
    }

    // call the logout api, there is no response so that doesn't get assigned to anything
    // set loggedin to false and then call set redirect
    // renderRedirect() is called in the render & return statements
    handleLogoutClick = async () => {
        const response2 = await fetch('/api/user/auth/logout');
        loggedin = false;
        this.setRedirect();
    };

    render () {
        if(loggedin === true) {
            return (
                <div>
                    {this.renderRedirect() }
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
                                            <div onClick={this.handleLogoutClick}>
                                                <div className="dropdown-options">Log Out</div>
                                            </div>
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
                    {this.renderRedirect() }
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
