import React from 'react';
import './SearchLocations.css';
import CountryDataTabs from '../CountryPages/Tabs.js';
import WorldMap from 'react-world-map';
import search_icon from '../../images/search_icon.png';


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
        
        this.sendCountryOnSelect = this.sendCountryOnSelect.bind(this);
        this.sendContinentSearch = this.sendContinentSearch.bind(this);
    }

    /* -- SendCountryOnSelect ----
        - Description: Receives a country choice by a click of a country in the searchbar
                    or the search icon and sends the choice to <CountryDataTabs> in Tabs.js
        - Parameters: country_name: String
        - Returns: none (sets state of searchbar filter to empty)
    */
    sendCountryOnSelect (country_name) {
        if (this.refs.searchbar.countries.some(e => (e.name.toLowerCase()).includes(country_name.toLowerCase()) == 1 )) {
            console.log("sending!");
            this.refs.datatabs.receiveCountry(country_name);
            this.refs.searchbar.setState({filteredCountries: [], queryText: ''}); 
        } else {
            console.log("Thats not a country!")
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
                        <div id="title"><p>Explore Locations</p></div>
                        <div>
                            <SearchBar ref='searchbar' sendCountryOnSelect={this.sendCountryOnSelect} />
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
        /*
        <option value="Afghanistan">Afghanistan</option>
        <option value="Albania">Albania</option>
        <option value="Algeria">Algeria</option>
        <option value="American Samoa">American Samoa</option>
        <option value="Andorra">Andorra</option>
        <option value="Angola">Angola</option>
        <option value="Anguilla">Anguilla</option>
        <option value="Antigua and Barbuda">Antigua and Barbuda</option>
        <option value="Argentina">Argentina</option>
        <option value="Armenia">Armenia</option>
        <option value="Aruba">Aruba</option>
        <option value="Australia">Australia</option>
        <option value="Austria">Austria</option>
        <option value="Azerbaijan">Azerbaijan</option>
        <option value="Bahamas, The">Bahamas, The</option>
        <option value="Bahrain">Bahrain</option>
        <option value="Bangladesh">Bangladesh</option>
        <option value="Barbados">Barbados</option>
        <option value="Belarus">Belarus</option>
        <option value="Belgium">Belgium</option>
        <option value="Belize">Belize</option>
        <option value="Benin">Benin</option>
        <option value="Bermuda">Bermuda</option>
        <option value="BES Islands">BES Islands</option>
        <option value="Bhutan">Bhutan</option>
        <option value="Bolivia">Bolivia</option>
        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
        <option value="Botswana">Botswana</option>
        <option value="Brazil">Brazil</option>
        <option value="British Virgin Islands">British Virgin Islands</option>
        <option value="Brunei Darussalam">Brunei Darussalam</option>
        <option value="Bulgaria">Bulgaria</option>
        <option value="Burkina Faso">Burkina Faso</option>
        <option value="Burundi">Burundi</option>
        <option value="Cambodia">Cambodia</option>
        <option value="Cameroon">Cameroon</option>
        <option value="Canada">Canada</option>
        <option value="Cape Verde">Cape Verde</option>
        <option value="Cayman Islands">Cayman Islands</option>
        <option value="Central African Republic">Central African Republic</option>
        <option value="Chad">Chad</option>
        <option value="Channel Islands">Channel Islands</option>
        <option value="Chile">Chile</option>
        <option value="China">China</option>
        <option value="Colombia">Colombia</option>
        <option value="Comoros">Comoros</option>
        <option value="Congo, Dem. Rep.">Congo, Dem. Rep.</option>
        <option value="Congo, Rep.">Congo, Rep.</option>
        <option value="Cook Islands">Cook Islands</option>
        <option value="Costa Rica">Costa Rica</option>
        <option value="Cote d'Ivoire">Cote d'Ivoire</option>
        <option value="Croatia">Croatia</option>
        <option value="Cuba">Cuba</option>
        <option value="Curacao">Curacao</option>
        <option value="Cyprus">Cyprus</option>
        <option value="Czech Republic">Czech Republic</option>
        <option value="Denmark">Denmark</option>
        <option value="Djibouti">Djibouti</option>
        <option value="Dominica">Dominica</option>
        <option value="Dominican Republic">Dominican Republic</option>
        <option value="Ecuador">Ecuador</option>
        <option value="Egypt, Arab Rep.">Egypt, Arab Rep.</option>
        <option value="El Salvador">El Salvador</option>
        <option value="Equatorial Guinea">Equatorial Guinea</option>
        <option value="Eritrea">Eritrea</option>
        <option value="Estonia">Estonia</option>
        <option value="Ethiopia">Ethiopia</option>
        <option value="Faroe Islands">Faroe Islands</option>
        <option value="Falkland Islands">Falkland Islands</option>
        <option value="Fiji">Fiji</option>
        <option value="Finland">Finland</option>
        <option value="France">France</option>
        <option value="French Guyana">French Guyana</option>
        <option value="French Polynesia">French Polynesia</option>
        <option value="Gabon">Gabon</option>
        <option value="Gambia, The">Gambia, The</option>
        <option value="Georgia">Georgia</option>
        <option value="Germany">Germany</option>
        <option value="Ghana">Ghana</option>
        <option value="Gibraltar">Gibraltar</option>
        <option value="Greece">Greece</option>
        <option value="Greenland">Greenland</option>
        <option value="Grenada">Grenada</option>
        <option value="Guadeloupe">Guadeloupe</option>
        <option value="Guam">Guam</option>
        <option value="Guatemala">Guatemala</option>
        <option value="Guinea">Guinea</option>
        <option value="Guinea-Bissau">Guinea-Bissau</option>
        <option value="Guyana">Guyana</option>
        <option value="Haiti">Haiti</option>
        <option value="Honduras">Honduras</option>
        <option value="Hong Kong SAR, China">Hong Kong SAR, China</option>
        <option value="Hungary">Hungary</option>
        <option value="Iceland">Iceland</option>
        <option value="India">India</option>
        <option value="Indonesia">Indonesia</option>
        <option value="Iran, Islamic Rep.">Iran, Islamic Rep.</option>
        <option value="Iraq">Iraq</option>
        <option value="Ireland">Ireland</option>
        <option value="Isle of Man">Isle of Man</option>
        <option value="Israel">Israel</option>
        <option value="Italy">Italy</option>
        <option value="Jamaica">Jamaica</option>
        <option value="Japan">Japan</option>
        <option value="Jordan">Jordan</option>
        <option value="Kazakhstan">Kazakhstan</option>
        <option value="Kenya">Kenya</option>
        <option value="Kiribati">Kiribati</option>
        <option value="Korea, Dem. Rep.">Korea, Dem. Rep.</option>
        <option value="Korea, Rep.">Korea, Rep.</option>
        <option value="Kosovo">Kosovo</option>
        <option value="Kuwait">Kuwait</option>
        <option value="Kyrgyz Republic">Kyrgyz Republic</option>
        <option value="Lao PDR">Lao PDR</option>
        <option value="Latvia">Latvia</option>
        <option value="Lebanon">Lebanon</option>
        <option value="Lesotho">Lesotho</option>
        <option value="Liberia">Liberia</option>
        <option value="Libya">Libya</option>
        <option value="Liechtenstein">Liechtenstein</option>
        <option value="Lithuania">Lithuania</option>
        <option value="Luxembourg">Luxembourg</option>
        <option value="Macao SAR, Chin">Macao SAR, China</option>
        <option value="Macedonia, FYR">Macedonia, FYR</option>
        <option value="Madagascar">Madagascar</option>
        <option value="Malawi">Malawi</option>
        <option value="Malaysia">Malaysia</option>
        <option value="Maldives">Maldives</option>
        <option value="Mali">Mali</option>
        <option value="Malta">Malta</option>
        <option value="Marshall Islands">Marshall Islands</option>
        <option value="Martinique">Martinique</option>
        <option value="Mauritania">Mauritania</option>
        <option value="Mauritius">Mauritius</option>
        <option value="Mayotte">Mayotte</option>
        <option value="Mexico">Mexico</option>
        <option value="Micronesia, Fed. Sts.">Micronesia, Fed. Sts.</option>
        <option value="Moldova">Moldova</option>
        <option value="Monaco">Monaco</option>
        <option value="Mongolia">Mongolia</option>
        <option value="Montenegro">Montenegro</option>
        <option value="Montserrat">Montserrat</option>
        <option value="Morocco">Morocco</option>
        <option value="Mozambique">Mozambique</option>
        <option value="Myanmar">Myanmar</option>
        <option value="Namibia">Namibia</option>
        <option value="Nauru">Nauru</option>
        <option value="Nepal">Nepal</option>
        <option value="Netherlands">Netherlands</option>
        <option value="Netherlands Antilles">Netherlands Antilles</option>
        <option value="New Caledonia">New Caledonia</option>
        <option value="New Zealand">New Zealand</option>
        <option value="Nicaragua">Nicaragua</option>
        <option value="Niger">Niger</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Niue">Niue</option>
        <option value="Northern Mariana Islands">Northern Mariana Islands</option>
        <option value="Norway">Norway</option>
        <option value="Oman">Oman</option>
        <option value="Pakistan">Pakistan</option>
        <option value="Palau">Palau</option>
        <option value="Panama">Panama</option>
        <option value="Papua New Guinea">Papua New Guinea</option>
        <option value="Paraguay">Paraguay</option>
        <option value="Peru">Peru</option>
        <option value="Philippines">Philippines</option>
        <option value="Poland">Poland</option>
        <option value="Portugal">Portugal</option>
        <option value="Puerto Rico">Puerto Rico</option>
        <option value="Qatar">Qatar</option>
        <option value="Reunion">Reunion</option>
        <option value="Romania">Romania</option>
        <option value="Russian Federation">Russian Federation</option>
        <option value="Rwanda">Rwanda</option>
        <option value="Saint Pierre et Miquelon">Saint Pierre et Miquelon</option>
        <option value="Samoa">Samoa</option>
        <option value="San Marino">San Marino</option>
        <option value="Sao Tome and Principe">Sao Tome and Principe</option>
        <option value="Saudi Arabia">Saudi Arabia</option>
        <option value="Senegal">Senegal</option>
        <option value="Serbia">Serbia</option>
        <option value="Seychelles">Seychelles</option>
        <option value="Sierra Leone">Sierra Leone</option>
        <option value="Singapore">Singapore</option>
        <option value="Sint Maarten (Dutch part)">Sint Maarten (Dutch part)</option>
        <option value="Slovak Republic">Slovak Republic</option>
        <option value="Slovenia">Slovenia</option>
        <option value="Solomon Islands">Solomon Islands</option>
        <option value="Somalia">Somalia</option>
        <option value="South Africa">South Africa</option>
        <option value="South Sudan">South Sudan</option>
        <option value="Spain">Spain</option>
        <option value="Sri Lanka">Sri Lanka</option>
        <option value="St. Helena">St. Helena</option>
        <option value="St. Kitts and Nevis">St. Kitts and Nevis</option>
        <option value="St. Lucia">St. Lucia</option>
        <option value="St. Martin (French part)">St. Martin (French part)</option>
        <option value="St. Vincent and the Grenadines">St. Vincent and the Grenadines</option>
        <option value="Sudan">Sudan</option>
        <option value="Suriname">Suriname</option>
        <option value="Swaziland">Swaziland</option>
        <option value="Sweden">Sweden</option>
        <option value="Switzerland">Switzerland</option>
        <option value="Syrian Arab Republic">Syrian Arab Republic</option>
        <option value="Taiwan, China">Taiwan, China</option>
        <option value="Tajikistan">Tajikistan</option>
        <option value="Tanzania">Tanzania</option>
        <option value="Thailand">Thailand</option>
        <option value="Timor-Leste">Timor-Leste</option>
        <option value="Togo">Togo</option>
        <option value="Tonga">Tonga</option>
        <option value="Trinidad and Tobago">Trinidad and Tobago</option>
        <option value="Tunisia">Tunisia</option>
        <option value="Turkey">Turkey</option>
        <option value="Turkmenistan">Turkmenistan</option>
        <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
        <option value="Tuvalu">Tuvalu</option>
        <option value="Uganda">Uganda</option>
        <option value="Ukraine">Ukraine</option>
        <option value="United Arab Emirates">United Arab Emirates</option>
        <option value="United Kingdom">United Kingdom</option>
        <option value="United States">United States</option>
        <option value="Uruguay">Uruguay</option>
        <option value="Uzbekistan">Uzbekistan</option>
        <option value="Vanuatu">Vanuatu</option>
        <option value="Venezuela, RB">Venezuela, RB</option>
        <option value="Vietnam">Vietnam</option>
        <option value="Virgin Islands (U.S.)">Virgin Islands (U.S.)</option>
        <option value="Wallis and Futuna">Wallis and Futuna</option>
        <option value="West Bank and Gaza">West Bank and Gaza</option>
        <option value="Western Sahara">Western Sahara</option>
        <option value="Yemen, Rep.">Yemen, Rep.</option>
        <option value="Zambia">Zambia</option>
        <option value="Zimbabwe">Zimbabwe</option>
        */
       
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
            'as': "Asia",
            'af': "Africa",
            'eu': "Europe",
            'oc': "Oceania", 
            'na': "North America",
            'sa': "South America",
            'an': "Antarctica"
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
            return
        }
    }

    /* -- updateQueryToContinent ----
        - Description: updates query text and filter based on continent key when 
                    a world map continent is selected. Is invoked in 
                    searchLocations.sendContinentSearch(continent) by a ref.
        - Parameters: cont_key: String
        - Returns: new queryText and filteredCountries state
    */
    updateQueryToContinent(cont_key) { 
        if (cont_key === 'none') { // unclick country
            this.setState({filteredCountries: [], queryText: ''});
            this.refs.search.value = '';
        } else {
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
            <React.Fragment>
                <div id="search-wrap">
                    <input id="search-input" ref='search' onKeyUp={(e) => this.handleSearch(e.target.value)} 
                        type="text" placeholder="Search Countries.." maxLength='100'/>
                    <button id='search-btn' type="submit" onClick={() => this.props.sendCountryOnSelect(this.refs.search.value)}>
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
            </React.Fragment>
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