import React from 'react';
import './SearchLocations.css';
import CountryDataTabs from '../CountryPages/Tabs.js';
import WorldMap from 'react-world-map';
import search_icon from '../../images/search_icon.png';


class SearchLocations extends React.Component {
    constructor(props) {
        super(props);
        this.state = { countryToView: ''};

        this.sendCountryOnSelect = this.sendCountryOnSelect.bind(this);
        this.sendContinentSearch = this.sendContinentSearch.bind(this);
    }

    // Get Country click from <SearchBar/> => send to <CountryDataTabs/>
    sendCountryOnSelect (country) {
        this.refs.datatabs.populateCountry(country.name);
    }
    // Get Continent click from <WorldMap/> => send to <SearchBar/>
    sendContinentSearch(continent) {
        this.refs.searchbar.updateQueryToContinent(continent);
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


/* ======== Main World Map Handler ======== */
class WorldMapController extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.sendContinentSearch(e.detail.clickedState);
    }

    componentDidMount() {
        // have to add event listener because we can;'t directly access <WorldMap/>
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
        this.state = { 
            queryText: '', 
            filteredCountries: []
        };

        this.countries = [
            {"name": "Afghanistan","continent": "Asia", "contCode": "as"},
            {"name": "Albania","continent": "Europe", "contCode": "eu"},
            {"name": "Algeria","continent": "Africa", "contCode": "af"},
            {"name": "American Samoa","continent": "Oceania", "contCode": "oc"},
            {"name": "Andorra","continent": "Europe", "contCode": "eu"},
            {"name": "Angola", "continent": "Africa", "contCode": "af"},
            {"name": "Anguilla","continent": "North America", "contCode": "na"},
            {"name": "Antarctica","continent": "Antarctica", "contCode": "an"},
            {"name": "Antigua and Barbuda","continent": "North America", "contCode": "na"},
            {"name": "Argentina","continent": "South America", "contCode": "sa"},
            {"name": "Armenia","continent": "Asia", "contCode": "as"},
            {"name": "Aruba","continent": "North America", "contCode": "na"},
            {"name": "Australia","continent": "Oceania", "contCode": "oc"},
            {"name": "Austria","continent": "Europe", "contCode": "eu"},
            {"name": "Azerbaijan","continent": "Asia", "contCode": "as"},

            {"name": "Bahamas","continent": "North America", "contCode": "na"},
            {"name": "Bahrain","continent": "Asia", "contCode": "as"},
            {"name": "Bangladesh","continent": "Asia", "contCode": "as"},
            {"name": "Barbados","continent": "North America", "contCode": "na"},
            {"name": "Belarus","continent": "Europe", "contCode": "eu"},
            {"name": "Belgium","continent": "Europe", "contCode": "eu"},
            {"name": "Belize","continent": "North America", "contCode": "na"},
            {"name": "Benin","continent": "Africa", "contCode": "af"},
            {"name": "Bermuda","continent": "North America", "contCode": "na"},
            {"name": "Bhutan","continent": "Asia", "contCode": "as"},
            {"name": "Bolivia","continent": "South America", "contCode": "sa"},
            {"name": "Bosnia and Herzegovina","continent": "Europe", "contCode": "eu"},
            {"name": "Botswana","continent": "Africa", "contCode": "af"},
            {"name": "Bouvet Island","continent": "Antarctica", "contCode": "an"},
            {"name": "Brazil","continent": "South America", "contCode": "sa"},
            {"name": "British Indian Ocean Territory","continent": "Africa", "contCode": "af"},
            {"name": "Brunei","continent": "Asia", "contCode": "as"},
            {"name": "Bulgaria","continent": "Europe", "contCode": "eu"},
            {"name": "Burkina Faso","continent": "Africa", "contCode": "af"},
            {"name": "Burundi","continent": "Africa", "contCode": "af"},

            {"name": "Cambodia","continent": "Asia", "contCode": "as"},
            {"name": "Cameroon","continent": "Africa", "contCode": "af"},
            {"name": "Canada","continent": "North America", "contCode": "na"},
            {"name": "Cape Verde","continent": "Africa", "contCode": "af"},
            {"name": "Cayman Islands","continent": "North America", "contCode": "na"},
            {"name": "Central AFn Republic","continent": "Africa", "contCode": "af"},
            {"name": "Chad","continent": "Africa", "contCode": "af"},
            {"name": "Chile","continent": "South America", "contCode": "sa"},
            {"name": "China","continent": "Asia", "contCode": "as"},
            {"name": "Christmas Island","continent": "Oceania", "contCode": "oc"},
            {"name": "Cocos (Keeling) Islands","continent": "Oceania", "contCode": "oc"},
            {"name": "Colombia","continent": "South America", "contCode": "sa"},
            {"name": "Comoros","continent": "Africa", "contCode": "af"},
            {"name": "Congo","continent": "Africa", "contCode": "af"},
            {"name": "Cook Islands","continent": "Oceania", "contCode": "oc"},
            {"name": "Costa Rica","continent": "North America", "contCode": "na"},
            {"name": "Croatia","continent": "Europe", "contCode": "eu"},
            {"name": "Cuba","continent": "North America", "contCode": "na"},
            {"name": "Cyprus","continent": "Asia", "contCode": "as"},
            {"name": "Czech Republic","continent": "Europe", "contCode": "eu"},

            {"name": "Denmark","continent": "Europe", "contCode": "eu"},
            {"name": "Djibouti","continent": "Africa", "contCode": "af"},
            {"name": "Dominica","continent": "North America", "contCode": "na"},
            {"name": "Dominican Republic","continent": "North America", "contCode": "na"},

            {"name": "East Timor","continent": "Asia", "contCode": "as"},
            {"name": "Ecuador","continent": "South America", "contCode": "sa"},
            {"name": "Egypt","continent": "Africa", "contCode": "af"},
            {"name": "El Salvador","continent": "North America", "contCode": "na"},
            {"name": "England","continent": "Europe", "contCode": "eu"},
            {"name": "Equatorial Guinea","continent": "Africa", "contCode": "af"},
            {"name": "Eritrea","continent": "Africa", "contCode": "af"},
            {"name": "Estonia","continent": "Europe", "contCode": "eu"},
            {"name": "Ethiopia","continent": "Africa", "contCode": "af"},

            {"name": "Falkland Islands","continent": "South America", "contCode": "sa"},
            {"name": "Faroe Islands","continent": "Europe", "contCode": "eu"},
            {"name": "Fiji Islands","continent": "Oceania", "contCode": "oc"},
            {"name": "Finland","continent": "Europe", "contCode": "eu"},
            {"name": "France","continent": "Europe", "contCode": "eu"},
            {"name": "French Guiana","continent": "South America", "contCode": "sa"},
            {"name": "French Polynesia","continent": "Oceania", "contCode": "oc"},
            {"name": "French Southern Territories","continent": "Antarctica", "contCode": "an"},

            {"name": "Gabon","continent": "Africa", "contCode": "af"},
            {"name": "Gambia","continent": "Africa", "contCode": "af"},
            {"name": "Georgia","continent": "Asia", "contCode": "as"},
            {"name": "Germany","continent": "Europe", "contCode": "eu"},
            {"name": "Ghana","continent": "Africa", "contCode": "af"},
            {"name": "Gibraltar","continent": "Europe", "contCode": "eu"},
            {"name": "Greece","continent": "Europe", "contCode": "eu"},
            {"name": "Greenland","continent": "North America", "contCode": "na"},
            {"name": "Grenada","continent": "North America", "contCode": "na"},
            {"name": "Guadeloupe","continent": "North America", "contCode": "na"},
            {"name": "Guam","continent": "Oceania", "contCode": "oc"},
            {"name": "Guatemala","continent": "North America", "contCode": "na"},
            {"name": "Guinea","continent": "Africa", "contCode": "af"},
            {"name": "Guinea-Bissau","continent": "Africa", "contCode": "af"},
            {"name": "Guyana","continent": "South America", "contCode": "sa"},

            {"name": "Haiti","continent": "North America", "contCode": "na"},
            {"name": "Heard Island and McDonald Islands","continent": "Antarctica", "contCode": "an"},
            {"name": "Holy See (Vatican City State)","continent": "Europe", "contCode": "eu"},
            {"name": "Honduras","continent": "North America", "contCode": "na"},
            {"name": "Hong Kong","continent": "Asia", "contCode": "as"},
            {"name": "Hungary","continent": "Europe", "contCode": "eu"},

            {"name": "Iceland","continent": "Europe", "contCode": "eu"},
            {"name": "India","continent": "Asia", "contCode": "as"},
            {"name": "Indonesia","continent": "Asia", "contCode": "as"},
            {"name": "Iran","continent": "Asia", "contCode": "as"},
            {"name": "Iraq","continent": "Asia", "contCode": "as"},
            {"name": "Ireland","continent": "Europe", "contCode": "eu"},
            {"name": "Israel","continent": "Asia", "contCode": "as"},
            {"name": "Italy","continent": "Europe", "contCode": "eu"},
            {"name": "Ivory Coast","continent": "Africa", "contCode": "af"},

            {"name": "Jamaica","continent": "North America", "contCode": "na"},
            {"name": "Japan","continent": "Asia", "contCode": "as"},
            {"name": "Jordan","continent": "Asia", "contCode": "as"},

            {"name": "Kazakhstan","continent": "Asia", "contCode": "as"},
            {"name": "Kenya","continent": "Africa", "contCode": "af"},
            {"name": "Kiribati","continent": "Oceania", "contCode": "oc"},
            {"name": "Kuwait","continent": "Asia", "contCode": "as"},
            {"name": "Kyrgyzstan","continent": "Asia", "contCode": "as"},

            {"name": "Laos","continent": "Asia", "contCode": "as"},
            {"name": "Latvia","continent": "Europe", "contCode": "eu"},
            {"name": "Lebanon","continent": "Asia", "contCode": "as"},
            {"name": "Lesotho","continent": "Africa", "contCode": "af"},
            {"name": "Liberia","continent": "Africa", "contCode": "af"},
            {"name": "Libyan Arab Jamahiriya","continent": "Africa", "contCode": "af"},
            {"name": "Liechtenstein","continent": "Europe", "contCode": "eu"},
            {"name": "Lithuania","continent": "Europe", "contCode": "eu"},
            {"name": "Luxembourg","continent": "Europe", "contCode": "eu"},

            {"name": "Macao","continent": "Asia", "contCode": "as"},
            {"name": "North Macedonia","continent": "Europe", "contCode": "eu"},
            {"name": "Madagascar","continent": "Africa", "contCode": "af"},
            {"name": "Malawi","continent": "Africa", "contCode": "af"},
            {"name": "Malaysia","continent": "Asia", "contCode": "as"},
            {"name": "Maldives","continent": "Asia", "contCode": "as"},
            {"name": "Mali","continent": "Africa", "contCode": "af"},
            {"name": "Malta","continent": "Europe", "contCode": "eu"},
            {"name": "Marshall Islands","continent": "Oceania", "contCode": "oc"},
            {"name": "Martinique","continent": "North America", "contCode": "na"},
            {"name": "Mauritania","continent": "Africa", "contCode": "af"},
            {"name": "Mauritius","continent": "Africa", "contCode": "af"},
            {"name": "Mayotte","continent": "Africa", "contCode": "af"},
            {"name": "Mexico","continent": "North America", "contCode": "na"},
            {"name": "Micronesia, Federated States of","continent": "Oceania", "contCode": "oc"},
            {"name": "Moldova","continent": "Europe", "contCode": "eu"},
            {"name": "Monaco","continent": "Europe", "contCode": "eu"},
            {"name": "Mongolia","continent": "Asia", "contCode": "as"},
            {"name": "Montserrat","continent": "North America", "contCode": "na"},
            {"name": "Morocco","continent": "Africa", "contCode": "af"},
            {"name": "Mozambique","continent": "Africa", "contCode": "af"},
            {"name": "Myanmar","continent": "Asia", "contCode": "as"},

            {"name": "Namibia","continent": "Africa", "contCode": "af"},
            {"name": "Nauru","continent": "Oceania", "contCode": "oc"},
            {"name": "Nepal","continent": "Asia", "contCode": "as"},
            {"name": "Netherlands","continent": "Europe", "contCode": "eu"},
            {"name": "Netherlands Antilles","continent": "North America", "contCode": "na"},
            {"name": "New Caledonia","continent": "Oceania", "contCode": "oc"},
            {"name": "New Zealand","continent": "Oceania", "contCode": "oc"},
            {"name": "Nicaragua","continent": "North America", "contCode": "na"},
            {"name": "Niger","continent": "Africa", "contCode": "af"},
            {"name": "Nigeria","continent": "Africa", "contCode": "af"},
            {"name": "Niue","continent": "Oceania", "contCode": "oc"},
            {"name": "Norfolk Island","continent": "Oceania", "contCode": "oc"},
            {"name": "North Korea","continent": "Asia", "contCode": "as"},
            {"name": "Northern Ireland","continent": "Europe", "contCode": "eu"},
            {"name": "Northern Mariana Islands","continent": "Oceania", "contCode": "oc"},
            {"name": "Norway","continent": "Europe", "contCode": "eu"},

            {"name": "Oman","continent": "Asia", "contCode": "as"},

            {"name": "Pakistan","continent": "Asia", "contCode": "as"},
            {"name": "Palau","continent": "Oceania", "contCode": "oc"},
            {"name": "Palestine","continent": "Asia", "contCode": "as"},
            {"name": "Panama","continent": "North America", "contCode": "na"},
            {"name": "Papua New Guinea","continent": "Oceania", "contCode": "oc"},
            {"name": "Paraguay","continent": "South America", "contCode": "sa"},
            {"name": "Peru","continent": "South America", "contCode": "sa"},
            {"name": "Philippines","continent": "Asia", "contCode": "as"},
            {"name": "Pitcairn","continent": "Oceania", "contCode": "oc"},
            {"name": "Poland","continent": "Europe", "contCode": "eu"},
            {"name": "Portugal","continent": "Europe", "contCode": "eu"},
            {"name": "Puerto Rico","continent": "North America", "contCode": "na"},

            {"name": "Qatar","continent": "Asia", "contCode": "as"},

            {"name": "Reunion","continent": "Africa", "contCode": "af"},
            {"name": "Romania","continent": "Europe", "contCode": "eu"},
            {"name": "Russian Federation","continent": "Europe", "contCode": "eu"},
            {"name": "Rwanda","continent": "Africa", "contCode": "af"},

            {"name": "Saint Helena","continent": "Africa", "contCode": "af"},
            {"name": "Saint Kitts and Nevis","continent": "North America", "contCode": "na"},
            {"name": "Saint Lucia","continent": "North America", "contCode": "na"},
            {"name": "Saint Pierre and Miquelon","continent": "North America", "contCode": "na"},
            {"name": "Saint Vincent and the Grenadines","continent": "North America", "contCode": "na"},
            {"name": "Samoa","continent": "Oceania", "contCode": "oc"},
            {"name": "San Marino","continent": "Europe", "contCode": "eu"},
            {"name": "Sao Tome and Principe","continent": "Africa", "contCode": "af"},
            {"name": "Saudi Arabia","continent": "Asia", "contCode": "as"},
            {"name": "Scotland","continent": "Europe", "contCode": "eu"},
            {"name": "Senegal","continent": "Africa", "contCode": "af"},
            {"name": "Seychelles","continent": "Africa", "contCode": "af"},
            {"name": "Sierra Leone","continent": "Africa", "contCode": "af"},
            {"name": "Singapore","continent": "Asia", "contCode": "as"},
            {"name": "Slovakia","continent": "Europe", "contCode": "eu"},
            {"name": "Slovenia","continent": "Europe", "contCode": "eu"},
            {"name": "Solomon Islands","continent": "Oceania", "contCode": "oc"},
            {"name": "Somalia","continent": "Africa", "contCode": "af"},
            {"name": "South AF","continent": "Africa", "contCode": "af"},
            {"name": "South Georgia and the South Sandwich Islands","continent": "Antarctica", "contCode": "an"},
            {"name": "South Korea","continent": "Asia", "contCode": "as"},
            {"name": "South Sudan","continent": "Africa", "contCode": "af"},
            {"name": "Spain","continent": "Europe", "contCode": "eu"},
            {"name": "Sri Lanka","continent": "Asia", "contCode": "as"},
            {"name": "Sudan","continent": "Africa", "contCode": "af"},
            {"name": "Suriname","continent": "South America", "contCode": "sa"},
            {"name": "Svalbard and Jan Mayen","continent": "Europe", "contCode": "eu"},
            {"name": "Swaziland","continent": "Africa", "contCode": "af"},
            {"name": "Sweden","continent": "Europe", "contCode": "eu"},
            {"name": "Switzerland","continent": "Europe", "contCode": "eu"},
            {"name": "Syria","continent": "Asia", "contCode": "as"},

            {"name": "Tajikistan","continent": "Asia", "contCode": "as"},
            {"name": "Tanzania","continent": "Africa", "contCode": "af"},
            {"name": "Thailand","continent": "Asia", "contCode": "as"},
            {"name": "The Democratic Republic of Congo","continent": "Africa", "contCode": "af"},
            {"name": "Togo","continent": "Africa", "contCode": "af"},
            {"name": "Tokelau","continent": "Oceania", "contCode": "oc"},
            {"name": "Tonga","continent": "Oceania", "contCode": "oc"},
            {"name": "Trinidad and Tobago","continent": "North America", "contCode": "na"},
            {"name": "Tunisia","continent": "Africa", "contCode": "af"},
            {"name": "Turkey","continent": "Asia", "contCode": "as"},
            {"name": "Turkmenistan","continent": "Asia", "contCode": "as"},
            {"name": "Turks and Caicos Islands","continent": "North America", "contCode": "na"},
            {"name": "Tuvalu","continent": "Oceania", "contCode": "oc"},

            {"name": "Uganda","continent": "Africa", "contCode": "af"},
            {"name": "Ukraine","continent": "Europe", "contCode": "eu"},
            {"name": "United Arab Emirates","continent": "Asia", "contCode": "as"},
            {"name": "United Kingdom","continent": "Europe", "contCode": "eu"},
            {"name": "United States","continent": "North America", "contCode": "na"},
            {"name": "United States Minor Outlying Islands","continent": "Oceania", "contCode": "oc"},
            {"name": "Uruguay","continent": "South America", "contCode": "sa"},
            {"name": "Uzbekistan","continent": "Asia", "contCode": "as"},

            {"name": "Vanuatu","continent": "Oceania", "contCode": "oc"},
            {"name": "Venezuela","continent": "South America", "contCode": "sa"},
            {"name": "Vietnam","continent": "Asia", "contCode": "as"},
            {"name": "Virgin Islands, British","continent": "North America", "contCode": "na"},
            {"name": "Virgin Islands, U.S.","continent": "North America", "contCode": "na"},

            {"name": "Wales","continent": "Europe", "contCode": "eu"},
            {"name": "Wallis and Futuna","continent": "Oceania", "contCode": "oc"},
            {"name": "Western Sahara","continent": "Africa", "contCode": "af"},

            {"name": "Yemen","continent": "Asia", "contCode": "as"},
            {"name": "Yugoslavia","continent": "Europe", "contCode": "eu"},

            {"name": "Zambia","continent": "Africa", "contCode": "af"},
            {"name": "Zimbabwe","continent": "Africa", "contCode": "af"}
        ];
        
        this.continents = {
            'as': "Asia",'af': "Africa",'eu': "Europe",'oc': "Oceania", 
            'na': "North America",'sa': "South America",'an': "Antarctica"
        };
        
        this.updateQueryToContinent = this.updateQueryToContinent.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    //--> dont update if input is nominal
    componentDidUpdate(prevProps, prevState) { 
        if (prevState.queryText !== this.state.queryText.trim()) {
            return
        }
    }

    updateQueryToContinent(cont_key) { // Continent code entry (from map)
        let newCountryFilter = this.countries.filter((country) => {
            return (country.contCode.substring(cont_key) === cont_key)
        });
        let name = this.continents[cont_key];

        this.setState({filteredCountries: newCountryFilter, queryText: name});
        this.refs.search.value = name;
    }

    //--> Key up OR continent choice => filter for a country list or continent flavore query
    handleSearch(text) {
        let query = text.toUpperCase().trim();
        
        if (query.length == 0) {
            this.setState({filteredCountries: [], queryText: query});
        }   
        else { // Text entry search
            let newCountryFilter = this.countries.filter((country) => {
                let country_name = country.name.toUpperCase();
                let continent_name = country.continent.toUpperCase();
                return (country_name.includes(query) !== false || continent_name.substring(query) === query)
            });
            this.setState({ filteredCountries: newCountryFilter, queryText: query});
        }
    }
    
    render() {
        return (
            <React.Fragment>
                <div id="search-wrap">
                    <input id="search-input" ref='search' onKeyUp={(e) => this.handleSearch(e.target.value)} 
                        type="text" placeholder="Search Countries.." maxLength='100'/>
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