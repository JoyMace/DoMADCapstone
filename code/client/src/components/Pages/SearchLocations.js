import React from 'react';
import ReactDOM from 'react-dom';
import './SearchLocations.css';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import avatar from '../../images/Avatar.png';
import WorldMapImage from '../../images/WorldMap.png';

/* Stars and rating stuff from Account js */
/*import { FaStar } from 'react-icons/fa';*/
/*import { FaStarHalf } from 'react-icons/fa';*/
/*import { IconContext } from "react-icons";*/
 
const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

function SearchLocations() {
    return (
        <div id="search-locations">
            <div id='top'>

                <div id='searching-wrap'>
                    <div id='search-title'>
                        <p>Search locations</p>
                    </div>
                    <div class="search-container">
                        <form action="">
                            <input id='search-bar' type='text' placeholder="Search Countries.."></input>
                            <button id='search-btn' type="submit">
                                <p>Go</p>
                            </button>
                        </form>
                    </div>
                    
                </div>

                <div>
                    <ComposableMap>
                        <Geographies Geography={geoUrl}>
                            {({ Geographies }) =>
                            geographies.map(geo => <Geography key={geo.rsmKey} Geography={geo} />)
                            }
                        </Geographies>
                    </ComposableMap>
                </div>
            </div>
            <div className='explore-content-master'>

            </div>
        </div>
    )
}


export default SearchLocations;

/*
<div class="topnav">
    <a class="active" href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
    <div class="search-container">
    <form action="/action_page.php">
        <input type="text" placeholder="Search.." name="search">
        <button type="submit"><i class="fa fa-search"></i></button>
    </form>
    </div>
</div>
*/