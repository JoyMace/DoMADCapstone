import React from 'react';
import './SearchLocations.css';
import CountryDataTabs from '../CountryPages/Tabs.js';
import WorldMap from 'react-world-map';
import search_icon from '../../images/search_icon.png';

// TO DO ===============
// On WorldMap Click --> SearchBar.queryText = 'Continent'
// On SearchBar Select --> CountryDataTabs.cCountry = 'Country'
// =====================

class SearchLocations extends React.Component {
    constructor(props) {
        super(props);
        this.state = { countryToView: ''};

        this.sendCountryOnSelect = this.sendCountryOnSelect.bind(this);
        this.sendContinentSearch = this.sendContinentSearch.bind(this);
    }

    // Receives Country selection from <SearchBar/> and sends to CountryDataTabs
    sendCountryOnSelect (country) {
        /*console.log('parent received country selection...\n sending', country.name, 'to Country Data Tabs!');*/
        this.refs.datatabs.populateCountry(country.name);
    }
    // Received Continent selection from <WorldMap/> and sends to SearchBar
    sendContinentSearch(continent) {
        /*console.log('parent received continent change...\n', 'sending', continent, 'to SearchBar');*/
        this.refs.searchbar.handleQueryChange(continent);
    }

    render() {
        return (
            <div id="search-locations">
                <div id='exploring-root'>
                    <div id='header-search-flexbox'>
                        <div id="title"><p>Explore Locations</p></div>
                        <div>
                            <SearchBar ref='searchbar' sendCountryOnSelect = {this.sendCountryOnSelect} />
                        </div>
                    </div>
                    
                    <div id="description-box">
                        <h5>Choose a country to view by filtering for a specific continent on the world map, searching by name, or a combination of the two!</h5>
                    </div>

                    <div id='map-content-wrap'>
                        <div id="map-stretchy-wrapper">
                            <WorldMapController sendContinentSearch = {this.sendContinentSearch} />
                        </div>
                        <div id="side-navigation">
                            
                        </div>
                    </div>

                    <div id="description-box">
                        <h5>Once a country is selected tabular donation and country information will populate below.</h5>
                    </div>

                    <ToTopBtn returnstepinms="25" returnstepinpx="50"/>
                    <footer id='explore-spacer'><hr/></footer>
                </div>

                <div id='master-content-root'>
                    <div className="country-pages">
                        <CountryDataTabs ref='datatabs'/>
                    </div>
                </div>
            </div>
        )
    }
}

/* ======== Main Map renderer & handler ======== */
class WorldMapController extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.sendContinentSearch(e.detail.clickedState);
    }

    componentDidMount() {
        window.addEventListener('WorldMapClicked', this.handleChange);
    }
    componentWillUnmount() {
        window.removeEventListener('WorldMapClicked', this.handleChange);
    }

    render() {
        return (
            <WorldMap/>
        );
    } 
}

/* ======== Main Searchbar query handler ======== */
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { queryText: '', filteredCountries: []};

        this.countries = [
            {"name": "Afghanistan","continent": "AS"},
            {"name": "Albania","continent": "EU"},
            {"name": "Algeria","continent": "AF"},
            {"name": "American Samoa","continent": "OC"},
            {"name": "Andorra","continent": "EU"},
            {"name": "Angola", "continent": "AF"},
            {"name": "Anguilla","continent": "NA"},
            {"name": "Antarctica","continent": "AN"},
            {"name": "Antigua and Barbuda","continent": "NA"},
            {"name": "Argentina","continent": "SA"},
            {"name": "Armenia","continent": "AS"},
            {"name": "Aruba","continent": "NA"},
            {"name": "Australia","continent": "OC"},
            {"name": "Austria","continent": "EU"},
            {"name": "Azerbaijan","continent": "AS"},

            {"name": "Bahamas","continent": "NA"},
            {"name": "Bahrain","continent": "AS"},
            {"name": "Bangladesh","continent": "AS"},
            {"name": "Barbados","continent": "NA"},
            {"name": "Belarus","continent": "EU"},
            {"name": "Belgium","continent": "EU"},
            {"name": "Belize","continent": "NA"},
            {"name": "Benin","continent": "AF"},
            {"name": "Bermuda","continent": "NA"},
            {"name": "Bhutan","continent": "AS"},
            {"name": "Bolivia","continent": "SA"},
            {"name": "Bosnia and Herzegovina","continent": "EU"},
            {"name": "Botswana","continent": "AF"},
            {"name": "Bouvet Island","continent": "AN"},
            {"name": "Brazil","continent": "SA"},
            {"name": "British Indian Ocean Territory","continent": "AF"},
            {"name": "Brunei","continent": "AS"},
            {"name": "Bulgaria","continent": "EU"},
            {"name": "Burkina Faso","continent": "AF"},
            {"name": "Burundi","continent": "AF"},

            {"name": "Cambodia","continent": "AS"},
            {"name": "Cameroon","continent": "AF"},
            {"name": "Canada","continent": "NA"},
            {"name": "Cape Verde","continent": "AF"},
            {"name": "Cayman Islands","continent": "NA"},
            {"name": "Central AFn Republic","continent": "AF"},
            {"name": "Chad","continent": "AF"},
            {"name": "Chile","continent": "SA"},
            {"name": "China","continent": "AS"},
            {"name": "Christmas Island","continent": "OC"},
            {"name": "Cocos (Keeling) Islands","continent": "OC"},
            {"name": "Colombia","continent": "SA"},
            {"name": "Comoros","continent": "AF"},
            {"name": "Congo","continent": "AF"},
            {"name": "Cook Islands","continent": "OC"},
            {"name": "Costa Rica","continent": "NA"},
            {"name": "Croatia","continent": "EU"},
            {"name": "Cuba","continent": "NA"},
            {"name": "Cyprus","continent": "AS"},
            {"name": "Czech Republic","continent": "EU"},

            {"name": "Denmark","continent": "EU"},
            {"name": "Djibouti","continent": "AF"},
            {"name": "Dominica","continent": "NA"},
            {"name": "Dominican Republic","continent": "NA"},

            {"name": "East Timor","continent": "AS"},
            {"name": "Ecuador","continent": "SA"},
            {"name": "Egypt","continent": "AF"},
            {"name": "El Salvador","continent": "NA"},
            {"name": "England","continent": "EU"},
            {"name": "Equatorial Guinea","continent": "AF"},
            {"name": "Eritrea","continent": "AF"},
            {"name": "Estonia","continent": "EU"},
            {"name": "Ethiopia","continent": "AF"},

            {"name": "Falkland Islands","continent": "SA"},
            {"name": "Faroe Islands","continent": "EU"},
            {"name": "Fiji Islands","continent": "OC"},
            {"name": "Finland","continent": "EU"},
            {"name": "France","continent": "EU"},
            {"name": "French Guiana","continent": "SA"},
            {"name": "French Polynesia","continent": "OC"},
            {"name": "French Southern Territories","continent": "AN"},

            {"name": "Gabon","continent": "AF"},
            {"name": "Gambia","continent": "AF"},
            {"name": "Georgia","continent": "AS"},
            {"name": "Germany","continent": "EU"},
            {"name": "Ghana","continent": "AF"},
            {"name": "Gibraltar","continent": "EU"},
            {"name": "Greece","continent": "EU"},
            {"name": "Greenland","continent": "NA"},
            {"name": "Grenada","continent": "NA"},
            {"name": "Guadeloupe","continent": "NA"},
            {"name": "Guam","continent": "OC"},
            {"name": "Guatemala","continent": "NA"},
            {"name": "Guinea","continent": "AF"},
            {"name": "Guinea-Bissau","continent": "AF"},
            {"name": "Guyana","continent": "SA"},

            {"name": "Haiti","continent": "NA"},
            {"name": "Heard Island and McDonald Islands","continent": "AN"},
            {"name": "Holy See (Vatican City State)","continent": "EU"},
            {"name": "Honduras","continent": "NA"},
            {"name": "Hong Kong","continent": "AS"},
            {"name": "Hungary","continent": "EU"},

            {"name": "Iceland","continent": "EU"},
            {"name": "India","continent": "AS"},
            {"name": "Indonesia","continent": "AS"},
            {"name": "Iran","continent": "AS"},
            {"name": "Iraq","continent": "AS"},
            {"name": "Ireland","continent": "EU"},
            {"name": "Israel","continent": "AS"},
            {"name": "Italy","continent": "EU"},
            {"name": "Ivory Coast","continent": "AF"},

            {"name": "Jamaica","continent": "NA"},
            {"name": "Japan","continent": "AS"},
            {"name": "Jordan","continent": "AS"},

            {"name": "Kazakhstan","continent": "AS"},
            {"name": "Kenya","continent": "AF"},
            {"name": "Kiribati","continent": "OC"},
            {"name": "Kuwait","continent": "AS"},
            {"name": "Kyrgyzstan","continent": "AS"},

            {"name": "Laos","continent": "AS"},
            {"name": "Latvia","continent": "EU"},
            {"name": "Lebanon","continent": "AS"},
            {"name": "Lesotho","continent": "AF"},
            {"name": "Liberia","continent": "AF"},
            {"name": "Libyan Arab Jamahiriya","continent": "AF"},
            {"name": "Liechtenstein","continent": "EU"},
            {"name": "Lithuania","continent": "EU"},
            {"name": "Luxembourg","continent": "EU"},

            {"name": "Macao","continent": "AS"},
            {"name": "North Macedonia","continent": "EU"},
            {"name": "Madagascar","continent": "AF"},
            {"name": "Malawi","continent": "AF"},
            {"name": "Malaysia","continent": "AS"},
            {"name": "Maldives","continent": "AS"},
            {"name": "Mali","continent": "AF"},
            {"name": "Malta","continent": "EU"},
            {"name": "Marshall Islands","continent": "OC"},
            {"name": "Martinique","continent": "NA"},
            {"name": "Mauritania","continent": "AF"},
            {"name": "Mauritius","continent": "AF"},
            {"name": "Mayotte","continent": "AF"},
            {"name": "Mexico","continent": "NA"},
            {"name": "Micronesia, Federated States of","continent": "OC"},
            {"name": "Moldova","continent": "EU"},
            {"name": "Monaco","continent": "EU"},
            {"name": "Mongolia","continent": "AS"},
            {"name": "Montserrat","continent": "NA"},
            {"name": "Morocco","continent": "AF"},
            {"name": "Mozambique","continent": "AF"},
            {"name": "Myanmar","continent": "AS"},

            {"name": "Namibia","continent": "AF"},
            {"name": "Nauru","continent": "OC"},
            {"name": "Nepal","continent": "AS"},
            {"name": "Netherlands","continent": "EU"},
            {"name": "Netherlands Antilles","continent": "NA"},
            {"name": "New Caledonia","continent": "OC"},
            {"name": "New Zealand","continent": "OC"},
            {"name": "Nicaragua","continent": "NA"},
            {"name": "Niger","continent": "AF"},
            {"name": "Nigeria","continent": "AF"},
            {"name": "Niue","continent": "OC"},
            {"name": "Norfolk Island","continent": "OC"},
            {"name": "North Korea","continent": "AS"},
            {"name": "Northern Ireland","continent": "EU"},
            {"name": "Northern Mariana Islands","continent": "OC"},
            {"name": "Norway","continent": "EU"},

            {"name": "Oman","continent": "AS"},

            {"name": "Pakistan","continent": "AS"},
            {"name": "Palau","continent": "OC"},
            {"name": "Palestine","continent": "AS"},
            {"name": "Panama","continent": "NA"},
            {"name": "Papua New Guinea","continent": "OC"},
            {"name": "Paraguay","continent": "SA"},
            {"name": "Peru","continent": "SA"},
            {"name": "Philippines","continent": "AS"},
            {"name": "Pitcairn","continent": "OC"},
            {"name": "Poland","continent": "EU"},
            {"name": "Portugal","continent": "EU"},
            {"name": "Puerto Rico","continent": "NA"},

            {"name": "Qatar","continent": "AS"},

            {"name": "Reunion","continent": "AF"},
            {"name": "Romania","continent": "EU"},
            {"name": "Russian Federation","continent": "EU"},
            {"name": "Rwanda","continent": "AF"},

            {"name": "Saint Helena","continent": "AF"},
            {"name": "Saint Kitts and Nevis","continent": "NA"},
            {"name": "Saint Lucia","continent": "NA"},
            {"name": "Saint Pierre and Miquelon","continent": "NA"},
            {"name": "Saint Vincent and the Grenadines","continent": "NA"},
            {"name": "Samoa","continent": "OC"},
            {"name": "San Marino","continent": "EU"},
            {"name": "Sao Tome and Principe","continent": "AF"},
            {"name": "Saudi Arabia","continent": "AS"},
            {"name": "Scotland","continent": "EU"},
            {"name": "Senegal","continent": "AF"},
            {"name": "Seychelles","continent": "AF"},
            {"name": "Sierra Leone","continent": "AF"},
            {"name": "Singapore","continent": "AS"},
            {"name": "Slovakia","continent": "EU"},
            {"name": "Slovenia","continent": "EU"},
            {"name": "Solomon Islands","continent": "OC"},
            {"name": "Somalia","continent": "AF"},
            {"name": "South AF","continent": "AF"},
            {"name": "South Georgia and the South Sandwich Islands","continent": "AN"},
            {"name": "South Korea","continent": "AS"},
            {"name": "South Sudan","continent": "AF"},
            {"name": "Spain","continent": "EU"},
            {"name": "Sri Lanka","continent": "AS"},
            {"name": "Sudan","continent": "AF"},
            {"name": "Suriname","continent": "SA"},
            {"name": "Svalbard and Jan Mayen","continent": "EU"},
            {"name": "Swaziland","continent": "AF"},
            {"name": "Sweden","continent": "EU"},
            {"name": "Switzerland","continent": "EU"},
            {"name": "Syria","continent": "AS"},

            {"name": "Tajikistan","continent": "AS"},
            {"name": "Tanzania","continent": "AF"},
            {"name": "Thailand","continent": "AS"},
            {"name": "The Democratic Republic of Congo","continent": "AF"},
            {"name": "Togo","continent": "AF"},
            {"name": "Tokelau","continent": "OC"},
            {"name": "Tonga","continent": "OC"},
            {"name": "Trinidad and Tobago","continent": "NA"},
            {"name": "Tunisia","continent": "AF"},
            {"name": "Turkey","continent": "AS"},
            {"name": "Turkmenistan","continent": "AS"},
            {"name": "Turks and Caicos Islands","continent": "NA"},
            {"name": "Tuvalu","continent": "OC"},

            {"name": "Uganda","continent": "AF"},
            {"name": "Ukraine","continent": "EU"},
            {"name": "United Arab Emirates","continent": "AS"},
            {"name": "United Kingdom","continent": "EU"},
            {"name": "United States","continent": "NA"},
            {"name": "United States Minor Outlying Islands","continent": "OC"},
            {"name": "Uruguay","continent": "SA"},
            {"name": "Uzbekistan","continent": "AS"},

            {"name": "Vanuatu","continent": "OC"},
            {"name": "Venezuela","continent": "SA"},
            {"name": "Vietnam","continent": "AS"},
            {"name": "Virgin Islands, British","continent": "NA"},
            {"name": "Virgin Islands, U.S.","continent": "NA"},

            {"name": "Wales","continent": "EU"},
            {"name": "Wallis and Futuna","continent": "OC"},
            {"name": "Western Sahara","continent": "AF"},

            {"name": "Yemen","continent": "AS"},
            {"name": "Yugoslavia","continent": "EU"},

            {"name": "Zambia","continent": "AF"},
            {"name": "Zimbabwe","continent": "AF"}];
        
        this.handleQueryChange = this.handleQueryChange.bind(this);
    }

    // Should the component re-render? if input is nominal, don't update state
    componentDidUpdate(prevProps, prevState) { 
        if (prevState.queryText !== this.state.queryText.trim()) {
            return
        }
    }

    // On key up OR continent choice => filter for a country list or continent flavore query
    handleQueryChange(text) {
        console.log('SearchBar updating query to', text);
        let qText = text.toUpperCase();
        qText = qText.trim();

        if (qText.length == 0) {
            this.setState({
                filteredCountries: [],
                queryText: qText
            });
        } else {
            let newFilteredCountries = this.countries.filter((country) => {
                let cName = country.name.toUpperCase();
                let cContinent = country.continent.toUpperCase();
                return (cName.includes(qText) !== false || cContinent.substring(qText) === qText)
            });
            console.log('SearchBar updating query to', qText);
            this.setState({
                filteredCountries: newFilteredCountries,
                queryText: qText
            });
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <div id="search-wrap">
                    <input id="search-input" type="text" onKeyUp={(e) => this.handleQueryChange(e.target.value)} 
                        placeholder="Search Countries.." maxLength='100' />
                    <button id='search-btn' type="submit">
                        <img id="icon" src={search_icon}/>
                    </button>

                    <div id='searchUL-wrap'>
                        <ul className="searchUL">
                            {this.state.filteredCountries.map(country => (
                                <li className="filtered-country-items" key={country.name} onClick={() => this.props.sendCountryOnSelect(country)}>
                                    {country.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

/* ======== 'Scroll to Top' button ======== */
class ToTopBtn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            scrollInterval: 0
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    componentDidMount() {
        this.handleScroll();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    /*-- Determine button rendering based on pageYoffset value --*/
    handleScroll() {
        if (window.pageYOffset > 400) {
            if (!this.state.show) {
                //this.props.style.display = "block";
                this.setState({show: true });
            }
        } else {
            if (this.state.show) {
                //this.props.style.display = "none";
                this.setState({show: false });
            }
        }
    }

    /*-- Creates a dynamic scroll effect by scrolling X pixels every Y milliseconds --*/
    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.scrollInterval);
        }
        window.scroll(0, window.pageYOffset - this.props.returnstepinpx);
    }

    /*-- Initiate scrolling the document to top on button click --*/
    scrollToTop() { 
        let interval = setInterval(this.scrollStep.bind(this), this.props.returnstepinms);
        this.setState({ scrollInterval: interval});
    }

    render () {
        let defaultStyles = {
            position: "fixed", 
            bottom: "75px", right: "10px",
            padding: "12px",
            zIndex: "98", /*--make sure theres no overlap */
            outline: "none",
            border: "none", borderRadius: "6px",
            backgroundColor: "#CBB95A",
            fontSize: "0.9em", 
            color: "black",
            cursor: "pointer", 
            
            display: "block", /* toggling display doesnt allow for animation */
            opacity: (this.state.show ? 1 : 0),
            visibility: (this.state.show ? 'visible' : 'hidden'),
            transition: "visibility 0s, opacity 0.5s linear",
            transitionDuration: "0.2s", transitionDelay: "0"
        }
        /*ref=> https://stackoverflow.com/questions/3331353/transitions-on-the-css-display-property */
        
        return (
            <div>
                <button id='toTopBtn' style={defaultStyles}
                    onClick={ () => {this.scrollToTop()}}>To Top</button>
            </div>
        )
    }
}

export default SearchLocations;