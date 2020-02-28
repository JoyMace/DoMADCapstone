import React from 'react';
import logo from '../../images/DoMADLogoDark.svg'

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import './Navbar.css';

const navbar = props => (
    <header className="navbar">
        <nav className="navbar_navigation">
            <div className="navbar_toggle-button">
                <DrawerToggleButton click={props.drawerClickHandler} />
            </div>
            <div className="navbar_logo"><a href="/"><img src={logo} alt="" style={{height:'50px'}}/></a></div>
            <div className="navbar_navigation_items">
                <ul>
                    <li><a href="/search_locations">Explore</a></li>
                    <div className="separator" />
                    <li><a href="/donate">Donate</a></li>
                    <div className="separator" />
                    <li><a href="/blogs">Blogs</a></li>
                    <div className="spacer" />
                    <li><a href="/account">Share Your Trip</a></li>
                    <div className="separator" />
                    <li><a href="/about">Info</a></li>
                    <div className="separator" />
                    <li><a href="/account">Profile</a></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default navbar;