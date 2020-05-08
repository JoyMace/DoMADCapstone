import React from 'react';
import './SearchLocations.css';
import CountryDataTabs from '../CountryPages/Tabs.js';
import WorldMap from 'react-world-map';
import search_icon from '../../images/search_icon.png';

/* POSSIBLE ADDITIONS/CHANGES::
    -on page alert if country searched isn't a country
*/


/* COMPONENT: SendCountryOnSelect 
    Description: 
        page parent function that receives and invokes data comms from child components
    States: 
        none (holds refs to all child classes)
    Functions:  
        SendCountryOnSelect(country_name),
        sendContinentSearch(continent)
    Renders: 
        ALL main content for /search_locations. Each subcomponent handles 
        its own conditional rendering and data.
*/
class SearchLocations extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            country__selection: null 
        };
        this.sendCountryOnSelect = this.sendCountryOnSelect.bind(this);
        this.sendContinentSearch = this.sendContinentSearch.bind(this);
    }


    /* -- SendCountryOnSelect ----
        - Description: Receives a country choice by a click of a country in the searchbar
                    or the search icon and sends it as a prop to <CountryDataTabs> in Tabs.js
        - Parameters: country_name: String
        - Returns: none (sets state of searchbar filter to empty)
    */
    sendCountryOnSelect (country_name) { 
        if (this.refs.searchbar.countries.some(e => (e.name === country_name))) {
            this.refs.searchbar.setState({ filteredCountries: [], queryText: ''});
            this.setState({ country__selection: country_name });
        } 
        else {
            // Make an on page alert??
            console.log(country_name, "is not a country!");
        }
    }

    /* -- SendContinentSearch ----
        - Description: Receives a continent choice from WorldMapController and sends
                    the continent name to the search bar to be searched
        - Parameters: continent: String
        - Invokes: SearchBar.updateQueryToContinent() 
        - Returns: none 
    */
    sendContinentSearch(continent) {
        this.refs.searchbar.updateQueryToContinent(continent);
    }

    render() {
        return (
            <div id="search-locations">
                <div id='exploring-root'>
                    <div id='header-search-flexbox'>
                        <div id="title">Explore Locations</div>
                        <div className="search-column">
                            <SearchBar ref='searchbar' sendCountryOnSelect={this.sendCountryOnSelect} />
                        </div>
                    </div>
                    
                    <div id="header-desc">
                        <br/>
                        <h6 id='spacer-desc'>Filter by choosing a continent, searching by country name, 
                    or a combination of the two!<br/>Once a selection is made, relevant information will populate below.</h6>
                        
                    </div>

                    <div id='map-content-wrap'>
                        <div id="map-stretchy-wrapper">
                            <WorldMapController sendContinentSearch = {this.sendContinentSearch} />
                        </div>
                        <div id="side-navigation">
                            
                        </div>
                    </div>

                    <ToTopBtn returnstepinms="25" returnstepinpx="50"/>
                </div>

                <div>
                    <CountryDataTabs ref='datatabs' selection={this.state.country__selection}/>
                </div>
            </div>
        )
    }
}


/* COMPONENT: WorldMapController
    Description: 
        React package controller (see node_modules/react-world-map)
    States: none
    Functions: 
        handleChange(event)
    Renders: 
        the world map by continent
*/
class WorldMapController extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    /* -- handleChange ----
        - Description: Invokes searchLocations.sendContinentSearch (parent function) with the continent
                    code on change in WorldMap clicked state (see node_modules/react-world-map)
        - Parameters: e: Event 
        - Returns: none
    */
    handleChange(e) {
        this.props.sendContinentSearch(e.detail.clickedState);
        
    }

    /* -- ComponentDidMount & componentWillUnmount ----
        - Description: Adds and removes an event listener for the 'WorldMapClicked' 
                    Event (see node_modules/react-world-map)
        - Parameters: none
        - Returns: none
    */
    componentDidMount() {
        window.addEventListener('WorldMapClicked', this.handleChange);
    }
    componentWillUnmount() {
        window.removeEventListener('WorldMapClicked', this.handleChange);
    }

    render() { return (<WorldMap/>); } 
}


/* COMPONENT: SearchBar
    Description: 
        A text entry searchbar with a selectable dropdown of all world 
        countries. Sortable by country and continent.
    States: 
        queryText: String
        filteredCountries: Array
    Variables: 
        countries: Dict - world countries names, continent, and continent code
        continents: Dict - the 7 continents and their code
    Functions:
        updateQueryToContinent(cont_key)
        handleSearch(text) 
    Renders: 
        search bar in the upper right
*/
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            queryText: '', 
            filteredCountries: []
        };
       
        this.countries = [
            {"name": "Afghanistan", "continent": "Asia", "contCode": "as"},
            {"name": "Albania", "continent": "Europe", "contCode": "eu"},
            {"name": "Algeria", "continent": "Africa", "contCode": "af"},
            {"name": "American Samoa", "continent": "Oceania", "contCode": "oc"},
            {"name": "Andorra", "continent": "Europe", "contCode": "eu"},
            {"name": "Angola", "continent": "Africa", "contCode": "af"},
            {"name": "Anguilla", "continent": "North America", "contCode": "na"},
            {"name": "Antigua and Barbuda", "continent": "North America", "contCode": "na"},
            {"name": "Argentina", "continent": "South America", "contCode": "sa"},
            {"name": "Armenia", "continent": "Asia", "contCode": "as"},
            {"name": "Aruba", "continent": "North America", "contCode": "na"},
            {"name": "Australia", "continent": "Oceania", "contCode": "oc"},
            {"name": "Austria", "continent": "Europe", "contCode": "eu"},
            {"name": "Azerbaijan", "continent": "Asia", "contCode": "as"},
            {"name": "Bahamas", "continent": "North America", "contCode": "na"},
            {"name": "Bahrain", "continent": "Asia", "contCode": "as"},
            {"name": "Bangladesh", "continent": "Asia", "contCode": "as"},
            {"name": "Barbados", "continent": "North America", "contCode": "na"},
            {"name": "Belarus", "continent": "Europe", "contCode": "eu"},
            {"name": "Belgium", "continent": "Europe", "contCode": "eu"},
            {"name": "Belize", "continent": "North America", "contCode": "na"},
            {"name": "Benin", "continent": "Africa", "contCode": "af"},
            {"name": "Bermuda", "continent": "North America", "contCode": "na"},
            {"name": "Bonaire, Sint Eustatius and Saba", "continent": "North America", "contCode": "na"},
            {"name": "Bhutan", "continent": "Asia", "contCode": "as"},
            {"name": "Bolivia, Plurinational State of", "continent": "South America", "contCode": "sa"},
            {"name": "Bosnia and Herzegovina", "continent": "Europe", "contCode": "eu"},
            {"name": "Botswana", "continent": "Africa", "contCode": "af"},
            {"name": "Brazil", "continent": "South America", "contCode": "sa"},
            {"name": "Virgin Islands, British", "continent": "North America", "contCode": "na"},
            {"name": "Brunei Darussalam", "continent": "Asia", "contCode": "as"},
            {"name": "Bulgaria", "continent": "Europe", "contCode": "eu"},
            {"name": "Burkina Faso", "continent": "Africa", "contCode": "af"},
            {"name": "Burundi", "continent": "Africa", "contCode": "af"},
            {"name": "Cabo Verde", "continent": "Africa", "contCode": "af"},
            {"name": "Cambodia", "continent": "Asia", "contCode": "as"},
            {"name": "Cameroon", "continent": "Africa", "contCode": "af"},
            {"name": "Canada", "continent": "North America", "contCode": "na"},
            {"name": "Cayman Islands", "continent": "North America", "contCode": "na"},
            {"name": "Central African Republic", "continent": "Africa", "contCode": "af"},
            {"name": "Chad", "continent": "Africa", "contCode": "af"},
            {"name": "Chile", "continent": "South America", "contCode": "sa"},
            {"name": "China", "continent": "Asia", "contCode": "as"},
            {"name": "Colombia", "continent": "South America", "contCode": "sa"},
            {"name": "Comoros", "continent": "Africa", "contCode": "af"},
            {"name": "Congo", "continent": "Africa", "contCode": "af"},
            {"name": "Cook Islands", "continent": "Oceania", "contCode": "oc"},
            {"name": "Costa Rica", "continent": "North America", "contCode": "na"},
            {"name": "Côte d'Ivoire", "continent": "Africa", "contCode": "af"},
            {"name": "Croatia", "continent": "Europe", "contCode": "eu"},
            {"name": "Cuba", "continent": "North America", "contCode": "na"},
            {"name": "Netherlands", "continent": "Europe", "contCode": "eu"},
            {"name": "Cyprus", "continent": "Europe", "contCode": "eu"},
            {"name": "Czechia", "continent": "Europe", "contCode": "eu"},
            {"name": "Denmark", "continent": "Europe", "contCode": "eu"},
            {"name": "Djibouti", "continent": "Africa", "contCode": "af"},
            {"name": "Dominica", "continent": "North America", "contCode": "na"},
            {"name": "Dominican Republic", "continent": "North America", "contCode": "na"},
            {"name": "Ecuador", "continent": "South America", "contCode": "sa"},
            {"name": "Egypt", "continent": "Africa", "contCode": "af"},
            {"name": "El Salvador", "continent": "North America", "contCode": "na"},
            {"name": "Equatorial Guinea", "continent": "Africa", "contCode": "af"},
            {"name": "Eritrea", "continent": "Africa", "contCode": "af"},
            {"name": "Estonia", "continent": "Europe", "contCode": "eu"},
            {"name": "Eswatini", "continent": "Africa", "contCode": "af"},
            {"name": "Ethiopia", "continent": "Africa", "contCode": "af"},
            {"name": "Faroe Islands", "continent": "Europe", "contCode": "eu"},
            {"name": "Falkland Islands (Malvinas)", "continent": "South America", "contCode": "sa"},
            {"name": "Fiji", "continent": "Oceania", "contCode": "oc"},
            {"name": "Finland", "continent": "Europe", "contCode": "eu"},
            {"name": "France", "continent": "Europe", "contCode": "eu"},
            {"name": "French Guiana", "continent": "South America", "contCode": "sa"},
            {"name": "French Polynesia", "continent": "Oceania", "contCode": "oc"},
            {"name": "Gabon", "continent": "Africa", "contCode": "af"},
            {"name": "Gambia", "continent": "Africa", "contCode": "af"},
            {"name": "Georgia", "continent": "Asia", "contCode": "as"},
            {"name": "Germany", "continent": "Europe", "contCode": "eu"},
            {"name": "Ghana", "continent": "Africa", "contCode": "af"},
            {"name": "Gibraltar", "continent": "Europe", "contCode": "eu"},
            {"name": "Greece", "continent": "Europe", "contCode": "eu"},
            {"name": "Greenland", "continent": "North America", "contCode": "na"},
            {"name": "Grenada", "continent": "North America", "contCode": "na"},
            {"name": "Guam", "continent": "Oceania", "contCode": "oc"},
            {"name": "Guatemala", "continent": "North America", "contCode": "na"},
            {"name": "Guinea", "continent": "Africa", "contCode": "af"},
            {"name": "Guinea-Bissau", "continent": "Africa", "contCode": "af"},
            {"name": "Guyana", "continent": "South America", "contCode": "sa"},
            {"name": "Haiti", "continent": "North America", "contCode": "na"},
            {"name": "Honduras", "continent": "North America", "contCode": "na"},
            {"name": "Hungary", "continent": "Europe", "contCode": "eu"},
            {"name": "Iceland", "continent": "Europe", "contCode": "eu"},
            {"name": "India", "continent": "Asia", "contCode": "as"},
            {"name": "Indonesia", "continent": "Asia", "contCode": "as"},
            {"name": "Iran, Islamic Republic of", "continent": "Asia", "contCode": "as"},
            {"name": "Iraq", "continent": "Asia", "contCode": "as"},
            {"name": "Ireland", "continent": "Europe", "contCode": "eu"},
            {"name": "Isle of Man", "continent": "Europe", "contCode": "eu"},
            {"name": "Israel", "continent": "Asia", "contCode": "as"},
            {"name": "Italy", "continent": "Europe", "contCode": "eu"},
            {"name": "Jamaica", "continent": "North America", "contCode": "na"},
            {"name": "Japan", "continent": "Asia", "contCode": "as"},
            {"name": "Jordan", "continent": "Asia", "contCode": "as"},
            {"name": "Kazakhstan", "continent": "Asia", "contCode": "as"},
            {"name": "Kenya", "continent": "Africa", "contCode": "af"},
            {"name": "Kiribati", "continent": "Oceania", "contCode": "oc"},
            {"name": "Korea, Democratic People's Republic of", "continent": "Asia", "contCode": "as"},
            {"name": "Serbia", "continent": "Europe", "contCode": "eu"},
            {"name": "Kuwait", "continent": "Asia", "contCode": "as"},
            {"name": "Kyrgyzstan", "continent": "Asia", "contCode": "as"},
            {"name": "Lao People's Democratic Republic", "continent": "Asia", "contCode": "as"},
            {"name": "Latvia", "continent": "Europe", "contCode": "eu"},
            {"name": "Lebanon", "continent": "Asia", "contCode": "as"},
            {"name": "Lesotho", "continent": "Africa", "contCode": "af"},
            {"name": "Liberia", "continent": "Africa", "contCode": "af"},
            {"name": "Libya", "continent": "Africa", "contCode": "af"},
            {"name": "Liechtenstein", "continent": "Europe", "contCode": "eu"},
            {"name": "Lithuania", "continent": "Europe", "contCode": "eu"},
            {"name": "Luxembourg", "continent": "Europe", "contCode": "eu"},
            {"name": "North Macedonia", "continent": "Europe", "contCode": "eu"},
            {"name": "Madagascar", "continent": "Africa", "contCode": "af"},
            {"name": "Malawi", "continent": "Africa", "contCode": "af"},
            {"name": "Malaysia", "continent": "Asia", "contCode": "as"},
            {"name": "Maldives", "continent": "Asia", "contCode": "as"},
            {"name": "Mali", "continent": "Africa", "contCode": "af"},
            {"name": "Malta", "continent": "Europe", "contCode": "eu"},
            {"name": "Marshall Islands", "continent": "Oceania", "contCode": "oc"},
            {"name": "Martinique", "continent": "North America", "contCode": "na"},
            {"name": "Mauritania", "continent": "Africa", "contCode": "af"},
            {"name": "Mauritius", "continent": "Africa", "contCode": "af"},
            {"name": "Mexico", "continent": "North America", "contCode": "na"},
            {"name": "Micronesia, Federated States of", "continent": "Oceania", "contCode": "oc"},
            {"name": "Moldova, Republic of", "continent": "Europe", "contCode": "eu"},
            {"name": "Monaco", "continent": "Europe", "contCode": "eu"},
            {"name": "Mongolia", "continent": "Asia", "contCode": "as"},
            {"name": "Montenegro", "continent": "Europe", "contCode": "eu"},
            {"name": "Montserrat", "continent": "North America", "contCode": "na"},
            {"name": "Morocco", "continent": "Africa", "contCode": "af"},
            {"name": "Mozambique", "continent": "Africa", "contCode": "af"},
            {"name": "Myanmar", "continent": "Asia", "contCode": "as"},
            {"name": "Namibia", "continent": "Africa", "contCode": "af"},
            {"name": "Nauru", "continent": "Oceania", "contCode": "oc"},
            {"name": "Nepal", "continent": "Asia", "contCode": "as"},
            {"name": "New Caledonia", "continent": "Oceania", "contCode": "oc"},
            {"name": "New Zealand", "continent": "Oceania", "contCode": "oc"},
            {"name": "Nicaragua", "continent": "North America", "contCode": "na"},
            {"name": "Nigeria", "continent": "Africa", "contCode": "af"},
            {"name": "Niue", "continent": "Oceania", "contCode": "oc"},
            {"name": "Northern Mariana Islands", "continent": "Oceania", "contCode": "oc"},
            {"name": "Norway", "continent": "Europe", "contCode": "eu"},
            {"name": "Oman", "continent": "Asia", "contCode": "as"},
            {"name": "Pakistan", "continent": "Asia", "contCode": "as"},
            {"name": "Palau", "continent": "Oceania", "contCode": "oc"},
            {"name": "Palestine, State of", "continent": "Asia", "contCode": "as"},
            {"name": "Panama", "continent": "North America", "contCode": "na"},
            {"name": "Papua New Guinea", "continent": "Oceania", "contCode": "oc"},
            {"name": "Paraguay", "continent": "South America", "contCode": "sa"},
            {"name": "Peru", "continent": "South America", "contCode": "sa"},
            {"name": "Philippines", "continent": "Asia", "contCode": "as"},
            {"name": "Poland", "continent": "Europe", "contCode": "eu"},
            {"name": "Portugal", "continent": "Europe", "contCode": "eu"},
            {"name": "Puerto Rico", "continent": "North America", "contCode": "na"},
            {"name": "Qatar", "continent": "Asia", "contCode": "as"},
            {"name": "Réunion", "continent": "Africa", "contCode": "af"},
            {"name": "Romania", "continent": "Europe", "contCode": "eu"},
            {"name": "Russian Federation", "continent": "Europe", "contCode": "eu"},
            {"name": "Rwanda", "continent": "Africa", "contCode": "af"},
            {"name": "Saint Kitts and Nevis", "continent": "North America", "contCode": "na"},
            {"name": "Saint Lucia", "continent": "North America", "contCode": "na"},
            {"name": "Saint Pierre and Miquelon", "continent": "North America", "contCode": "na"},
            {"name": "Saint Vincent and the Grenadines", "continent": "North America", "contCode": "na"},
            {"name": "Samoa", "continent": "Oceania", "contCode": "oc"},
            {"name": "San Marino", "continent": "Europe", "contCode": "eu"},
            {"name": "Sao Tome and Principe", "continent": "Africa", "contCode": "af"},
            {"name": "Saudi Arabia", "continent": "Asia", "contCode": "as"},
            {"name": "Senegal", "continent": "Africa", "contCode": "af"},
            {"name": "Seychelles", "continent": "Africa", "contCode": "af"},
            {"name": "Sierra Leone", "continent": "Africa", "contCode": "af"},
            {"name": "Singapore", "continent": "Asia", "contCode": "as"},
            {"name": "Sint Maarten (Dutch part)", "continent": "North America", "contCode": "na"},
            {"name": "Slovakia", "continent": "Europe", "contCode": "eu"},
            {"name": "Slovenia", "continent": "Europe", "contCode": "eu"},
            {"name": "Solomon Islands", "continent": "Oceania", "contCode": "oc"},
            {"name": "Somalia", "continent": "Africa", "contCode": "af"},
            {"name": "South Africa", "continent": "Africa", "contCode": "af"},
            {"name": "South Sudan", "continent": "Africa", "contCode": "af"},
            {"name": "Spain", "continent": "Europe", "contCode": "eu"},
            {"name": "Sri Lanka", "continent": "Asia", "contCode": "as"},
            {"name": "Saint Helena, Ascension and Tristan da Cunha", "continent": "Africa", "contCode": "af"},
            {"name": "Saint Martin (French part)", "continent": "North America", "contCode": "na"},
            {"name": "Sudan", "continent": "Africa", "contCode": "af"},
            {"name": "Suriname", "continent": "South America", "contCode": "sa"},
            {"name": "Sweden", "continent": "Europe", "contCode": "eu"},
            {"name": "Switzerland", "continent": "Europe", "contCode": "eu"},
            {"name": "Syrian Arab Republic", "continent": "Asia", "contCode": "as"},
            {"name": "Taiwan, Province of China", "continent": "Asia", "contCode": "as"},
            {"name": "Tajikistan", "continent": "Asia", "contCode": "as"},
            {"name": "Tanzania, United Republic of", "continent": "Africa", "contCode": "af"},
            {"name": "Thailand", "continent": "Asia", "contCode": "as"},
            {"name": "Timor-Leste", "continent": "Oceania", "contCode": "oc"},
            {"name": "Togo", "continent": "Africa", "contCode": "af"},
            {"name": "Tonga", "continent": "Oceania", "contCode": "oc"},
            {"name": "Trinidad and Tobago", "continent": "North America", "contCode": "na"},
            {"name": "Tunisia", "continent": "Africa", "contCode": "af"},
            {"name": "Turkey", "continent": "Asia", "contCode": "as"},
            {"name": "Turkmenistan", "continent": "Asia", "contCode": "as"},
            {"name": "Turks and Caicos Islands", "continent": "North America", "contCode": "na"},
            {"name": "Tuvalu", "continent": "Oceania", "contCode": "oc"},
            {"name": "Uganda", "continent": "Africa", "contCode": "af"},
            {"name": "Ukraine", "continent": "Europe", "contCode": "eu"},
            {"name": "United Arab Emirates", "continent": "Asia", "contCode": "as"},
            {"name": "United Kingdom", "continent": "Europe", "contCode": "eu"},
            {"name": "United States", "continent": "North America", "contCode": "na"},
            {"name": "Uruguay", "continent": "South America", "contCode": "sa"},
            {"name": "Uzbekistan", "continent": "Asia", "contCode": "as"},
            {"name": "Vanuatu", "continent": "Oceania", "contCode": "oc"},
            {"name": "Venezuela, Bolivarian Republic of", "continent": "South America", "contCode": "sa"},
            {"name": "Viet Nam", "continent": "Asia", "contCode": "as"},
            {"name": "Virgin Islands, U.S.", "continent": "North America", "contCode": "na"},
            {"name": "Wallis and Futuna", "continent": "Oceania", "contCode": "oc"},
            {"name": "Western Sahara", "continent": "Africa", "contCode": "af"},
            {"name": "Yemen", "continent": "Asia", "contCode": "as"},
            {"name": "Zambia", "continent": "Africa", "contCode": "af"},
            {"name": "Zimbabwe", "continent": "Africa", "contCode": "af"},
            {"name": "Åland Islands", "continent": "Europe", "contCode": "eu"},
            {"name": "Antarctica", "continent": "Antarctica", "contCode": "an"},
            {"name": "French Southern Territories", "continent": "Antarctica", "contCode": "an"},
            {"name": "Saint Barthélemy", "continent": "North America", "contCode": "na"},
            {"name": "Bouvet Island", "continent": "Antarctica", "contCode": "an"},
            {"name": "Cocos (Keeling) Islands", "continent": "Asia", "contCode": "as"},
            {"name": "Congo, The Democratic Republic of the", "continent": "Africa", "contCode": "af"},
            {"name": "Curaçao", "continent": "North America", "contCode": "na"},
            {"name": "Christmas Island", "continent": "Oceania", "contCode": "oc"},
            {"name": "Guernsey", "continent": "Europe", "contCode": "eu"},
            {"name": "Guadeloupe", "continent": "North America", "contCode": "na"},
            {"name": "Hong Kong", "continent": "Asia", "contCode": "as"},
            {"name": "Heard Island and McDonald Islands", "continent": "Antarctica", "contCode": "an"},
            {"name": "British Indian Ocean Territory", "continent": "Asia", "contCode": "as"},
            {"name": "Jersey", "continent": "Europe", "contCode": "eu"},
            {"name": "Korea, Republic of", "continent": "Asia", "contCode": "as"},
            {"name": "Macao", "continent": "Asia", "contCode": "as"},
            {"name": "Mayotte", "continent": "Africa", "contCode": "af"},
            {"name": "Niger", "continent": "Africa", "contCode": "af"},
            {"name": "Norfolk Island", "continent": "Oceania", "contCode": "oc"},
            {"name": "Pitcairn", "continent": "Oceania", "contCode": "oc"},
            {"name": "South Georgia and the South Sandwich Islands", "continent": "Antarctica", "contCode": "an"},
            {"name": "Svalbard and Jan Mayen", "continent": "Europe", "contCode": "eu"},
            {"name": "Tokelau", "continent": "Oceania", "contCode": "oc"},
            {"name": "United States Minor Outlying Islands", "continent": "Oceania", "contCode": "oc"},
            {"name": "Holy See (Vatican City State)", "continent": "Europe", "contCode": "eu"},
        ];
        
        this.continents = {
            'as': "Asia",
            'af': "Africa",
            'eu': "Europe",
            'oc': "Oceania", 
            'na': "North America",
            'sa': "South America"
            /*'an': "Antarctica"*/
        };
        
        this.updateQueryToContinent = this.updateQueryToContinent.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    /* -- componentDidUpdate ----
        - Description: React member function (on 'True' stops the component from re-rendering), checks
                    if the new query text is nominal, aka whitespace
        - Parameters: prevState: Object
        - Returns: T/F
    */
    componentDidUpdate(prevState) { 
        if (prevState.queryText !== this.state.queryText.trim()) {
            return false;
        }
    }

    /* -- updateQueryToContinent ----
        - Description: Updates search bar state on text entry or continent map
                    selection. Closes search if the current continent unselected.
                    Function is invoked in searchLocations.sendContinentSearch(continent) 
                    by a ref call.
        - Parameters: cont_key: String
        - Returns: new queryText and filteredCountries state
    */
    updateQueryToContinent(cont_key) { 
        if (cont_key === 'none') { // unclick country
            this.setState({filteredCountries: [], queryText: ''});
            this.refs.search.value = '';
        } 
        else {
            let newCountryFilter = this.countries.filter((country) => {
                return (country.contCode.substring(cont_key) === cont_key)
            });
            let name = this.continents[cont_key];

            this.setState({filteredCountries: newCountryFilter, queryText: name});
            this.refs.search.value = name;
        }
    }

    /* -- handleSearch ----
        - Description: handles text entry in the search bar (not continent click).
        - Parameters: text: String
        - Returns: new queryText and filteredCountries state
    */
    handleSearch(text) {
        let query = text.toUpperCase().trim();
        
        if (query.length === 0) {
            this.setState({filteredCountries: [], queryText: query});
        }   
        else { // Text entry search
            let newCountryFilter = this.countries.filter((country) => {
                let country_name = country.name.toUpperCase();
                let continent_name = country.continent.toUpperCase();
                return (country_name.includes(query) !== false || continent_name.substring(query) === query)
            });
            this.setState({filteredCountries: newCountryFilter, queryText: query});
        }
    }
    
    render() {
        return (           
            <div id="search-wrap">
                <input id="search-input" ref='search' onKeyUp={(e) => this.handleSearch(e.target.value)} 
                    type="text" placeholder="Search Countries.." />
                <button id='search-btn' type="submit" onClick={() => this.props.sendCountryOnSelect(this.refs.search.value.trim())}>
                    <img id="icon" src={search_icon} alt=""/>
                </button>

                <div id='searchUL-wrap'>
                    <ul className="searchUL">
                        {this.state.filteredCountries.map(country => (
                            <li className="filtered-country-items" key={country.name} onClick={() => this.props.sendCountryOnSelect(country.name)}>
                                {country.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>           
        )
    }
}


/* COMPONENT: SendCountryOnSelect 
    Description: 
        button appearing on page scroll that scrolls user to the top of the page
    Functions:
        handleScroll()
        scrollToTop()
        scrollStep()
    States: 
        show: Bool - show or hide the button
        scrollInterval - helper state for scrolling to top
*/
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

    /* -- componentDidMount ----
        - Description: Member function called on page load and re-render, invokes an initial
                    handle of page position and adds scroll event listener.
    */
    componentDidMount() {
        this.handleScroll();
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    /* -- handleScroll --->
        - Description: Determines button render state based on pageYoffset value
        - Parameters: none
        - Returns: T/F button show state
    */
    handleScroll() {
        if (window.pageYOffset > 100) {
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

    /* -- SendCountryOnSelect ---
        - Description: Initiate scrolling the document to top on button click
        - Parameters: none
        - Returns: new interval state for next scroll step
    */
    scrollToTop() { 
        let interval = setInterval(this.scrollStep.bind(this), this.props.returnstepinms);
        this.setState({ scrollInterval: interval});
    }

    /* -- scrollStep ---
        - Description: Creates a dynamic scroll effect as part of scrollToTop() 
                    by scrolling X pixels every Y milliseconds 
        - Parameters: none
        - Returns: scrolls window up
    */
    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.scrollInterval);
        }
        window.scroll(0, window.pageYOffset - this.props.returnstepinpx);
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
        
        return (
            <div>
                <button id='new-search-btn' style={defaultStyles}
                    onClick={ () => {this.scrollToTop()}}>To Top</button>
            </div>
        )
    }
}

export default SearchLocations;