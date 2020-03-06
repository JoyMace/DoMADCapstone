import React from 'react';
import './SearchLocations.css';
//import ReactDOM from 'react-dom';

// Map package, DON'T use react-simple-maps
//import JSON_Map from '../ExploreMap/the_world_50m_simplified.json';
import WorldMap from 'react-world-map';

/* Stars and rating stuff from Account js */
    /*import avatar from '../../images/Avatar.png';*/
    /*import { FaStar } from 'react-icons/fa';*/
    /*import { FaStarHalf } from 'react-icons/fa';*/
    /*import { IconContext } from "react-icons";*/
    
function SearchLocations() {
    return (
        <div id="search-locations">

            <div id='exploring-root'>

                <div id='toolbar-flex-wrapper'>
                    <div id='title-container'>
                        <p>Search locations</p>
                    </div>
                    <div id="input-container">
                        <SearchBar />
                    </div>
                </div>

                <div id='map-content-wrap'>
                    <div id="side-navigation">
                        <form>
                            <input id="sidenavInput" type="text" onkeyup={sidenavFunction()} placeholder="Filter your search.."></input>
                            <ul id="sidenavUL">
                                <li><a href="#">Andorra</a></li>
                                <li><a href="#">Albania</a></li>

                                <li><a href="#">Botswana</a></li>
                                <li><a href="#">Russia</a></li>

                                <li><a href="#">Hungary</a></li>
                                <li><a href="#">Kenya</a></li>
                                <li><a href="#">United States</a></li>
                            </ul>
                        </form>
                    </div>
                    
                    <div id="map-stretchy-wrapper">
                        <WorldMapController />
                    </div>
                </div>

                <button id="to-top-btn" title="Go to top" onclick={topFunction()}>Top</button>

            </div>

            <div id='master-content-root'></div>
        </div>
            
    )
}

/* ======== Main Map renderer & handler ======== */
class WorldMapController extends React.Component {
    render() {
        return <WorldMap />;
    } 
}
window.addEventListener('WorldMapClicked', 
    function(e) { console.log('map was clicked, current selection is: ', e.detail.clickedState) }
);



/* ======== Main Searchbar query handler ======== */
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { countryQuery: '' };
    }

    mySubmitHandler = (event) => {
        event.preventDefault(); /* DELETE later, prevents form from 'actually' submitting */
        alert("Country Selection is: " + this.state.countryQuery);
    }
    myChangeHandler = (event) => {
        this.setState({countryQuery: event.target.value});
    }
    
    render() {
        return (
            <form action="" method='get' onSubmit={this.mySubmitHandler}>
                <input id='search-input' type='search' onChange={this.myChangeHandler} placeholder="Search Countries.." maxLength='100' >    
                </input>
                <button id='search-btn' type="submit">GO</button>
            </form>
        )
    }
}


/* === FINISH --> concatenate function into the class declaration below to allow for onKeyUp handling */
/* ======== Sidenav Search Query routines ======== */
function sidenavFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('sidenavInput');
    console.log("hey");
    //filter = input.value.toUpperCase();

    ul = document.getElementById("sidenavUL");
    //li = ul.getElementsByTagName('li');
    /*
    // Loop through ALL country list items, hide those that don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
    */
}
/*class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }
  
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
  }*/



/* ======== 'Scroll to Top' button ======== */
// Displays 'to-top' button when user scrolls down 20px from document top
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    var top_button = document.getElementById("to-top-btn");

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        top_button.style.display = "block";
    } else {
        top_button.style.display = "none";
    }
}
// Initiate scroll the document top on button click
function topFunction() { 
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


/*
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
    * {
    box-sizing: border-box;
    }
    #myInput {
    background-image: url('/css/searchicon.png');
    background-position: 10px 12px;
    background-repeat: no-repeat;
    width: 100%;
    font-size: 16px;
    padding: 12px 20px 12px 40px;
    border: 1px solid #ddd;
    margin-bottom: 12px;
    }
    #myUL {
    list-style-type: none;
    padding: 0;
    margin: 0;
    }
    #myUL li a {
    border: 1px solid #ddd;
    margin-top: -1px; ---------Prevent double borders
    background-color: #f6f6f6;
    padding: 12px;
    text-decoration: none;
    font-size: 18px;
    color: black;
    display: block
    }

    #myUL li a:hover:not(.header) {
    background-color: #eee;
    }
</style>
</head>
<body>

    <h2>My Phonebook</h2>
    <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.." title="Type in a name">

    <ul id="myUL">
        <li><a href="#">Adele</a></li>
        <li><a href="#">Agnes</a></li>
        <li><a href="#">Billy</a></li>
        <li><a href="#">Bob</a></li>

        <li><a href="#">Calvin</a></li>
        <li><a href="#">Christina</a></li>
        <li><a href="#">Cindy</a></li>
    </ul>

    <script>
    function myFunction() {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUL");
        li = ul.getElementsByTagName("li");

        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }
    </script>

</body>
</html>
*/

export default SearchLocations;