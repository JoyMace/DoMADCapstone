import React from 'react';
import logo from './DoMADLogoDark.svg'

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import './Navbar.css';

const navbar = props => (
    <header className="navbar">
        <nav className="navbar_navigation">
            <div className="navbar_toggle-button">
                <DrawerToggleButton click={props.drawerClickHandler} />
            </div>
            <div className="navbar_logo"><a href="/"><img src={logo} alt="" style={{height:'50px'}}/></a></div>
            <div className="navbar_navigation_items_left">
                <ul>
                    <li className="left-items"><a href="/search_locations">Explore</a></li>
                    <div className="separator" />
                    <li className="left-items"><a href="/donate">Donate</a></li>
                    <div className="separator" />
                    <li className="left-items"><a href="/blogs">Blogs</a></li>
                </ul>
            </div>
            <div className="navbar_navigation_items_right">
                <ul>
                    <li className="right-items"><a href="/about">Info</a></li>
                    <div className="separator" />
                    <li className="right-items"><a href="/account">Share Your Trip</a></li>
                    <div className="separator" />
                    <li className="right-items"><a href="/account">Profile</a></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default navbar;
