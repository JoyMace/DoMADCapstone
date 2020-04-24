import React from 'react';

import './DrawerToggleButton.css';

// the purpose of this file is to show the three lines on the left part of the navbar when the browser is small enough, and adds an onClick so when they are selected it pulls from the navbar file to open the sidedrawer

const drawerToggleButton = props => (
    <button className="toggle-button" onClick={props.click}>
        <div className="toggle-button_line" />
        <div className="toggle-button_line" />
        <div className="toggle-button_line" />
    </button>
);

export default drawerToggleButton;