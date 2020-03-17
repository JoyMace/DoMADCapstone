import React from 'react';

import './SideDrawer.css';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show) {
        drawerClasses = 'side-drawer open';
    }
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
                <li><a href="/account">Profile</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="/login">Login</a></li>
            </ul>
        </nav>
    );
};

export default sideDrawer;