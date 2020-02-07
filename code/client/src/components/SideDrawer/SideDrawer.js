import React from 'react';

import './SideDrawer.css';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show) {
        drawerClasses = 'side-drawer open';
    }
    return (
        <nav className={drawerClasses}>
            <ul>
                <li><a href="/search_locations">Explore</a></li>
                <li><a href="/blogs">Blogs</a></li>
                <li><a href="/account">Share Your Trip</a></li>
                <li><a href="/about">Info</a></li>
                <li><a href="/account">Profile</a></li>
            </ul>
        </nav>
    );
};

export default sideDrawer;