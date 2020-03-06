import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/DoMADLogoDark.svg'

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import './Navbar.css';
import { FaCaretDown } from 'react-icons/fa';

const navbar = props => (
    <header className="navbar">
        <nav className="navbar_navigation">
            <div className="navbar_toggle-button">
                <DrawerToggleButton click={props.drawerClickHandler} />
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
                    <li><a href="/account" className="no-dropdown">Profile</a></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default navbar;