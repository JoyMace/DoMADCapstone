import React from 'react';
import './Blogs.css';
import defaultblogimage from '../../images/png_icons/comingSoonIcon.svg';
import { FaStar } from 'react-icons/fa';
import { IconContext } from "react-icons";

let blogAPI = 'api/user/trip/all-trips?'; // the API call
let countryselected = false; // will show true when a country has been selected from the continent drop down options

class BlogInfo extends React.Component { // this is what pull the back end trip info and assigns it to variables set in the state
    constructor(props) {
		super(props)

        var tripInfo = this.props.tripInfo;
        var tripDate = new Date(tripInfo.tripDate);

        this.state = {
            city: tripInfo.locationID.city,
            country: tripInfo.locationID.country,
            tripDate: (tripDate.getMonth() + 1) + "/" +  tripDate.getDate() + "/" +  tripDate.getFullYear(),
            notes: tripInfo.notes,
            donationItem: ( tripInfo.donations && tripInfo.donations.length > 1) ? tripInfo.donations[1].itemName : "None",
		    donationRating: ( tripInfo.donations && tripInfo.donations.length > 1) ? tripInfo.donations[1].rating : "None",
            privatePost: tripInfo.isPrivate
        }
    }

	render() {
		return <BlogEntry blog={this.state} /> // the state with all back end info is returned to the function BlogEntry so it can be shown on the page
	}
}

function BlogEntry(props) { // need to take in props in order to pull from class BlogInfo
    var star_amount; // star amount is the amount of stars shown for the donation rating based on the rating pulled from the back end
    if(props.blog.donationRating === 1) {
        star_amount = <div><FaStar /></div> // <FaStar /> is a separate package that is imported into the file in order to use the star icons
    }
    else if(props.blog.donationRating === 2) {
        star_amount = <div><FaStar /> <FaStar /></div>
    }
    else if(props.blog.donationRating === 3) {
        star_amount = <div><FaStar /> <FaStar /> <FaStar /></div>
    }
    else if(props.blog.donationRating === 4) {
        star_amount = <div><FaStar /> <FaStar /> <FaStar /> <FaStar /></div>
    }
    else if(props.blog.donationRating === 5) {
        star_amount = <div><FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /></div>
    }

    return (
        <div className="blog-container">
            <div className="blog-entry">
                <div className="top-blog-image">
                    <img src={ defaultblogimage } alt="icon of person donating something" /> {/* default image used for blogs image since currently there is no functionality to upload images*/}
                </div>
                <div className="bottom-blog-content">
                    <div className="blog-same-line">Location:  {props.blog.country} {/* props is needed in order to pull the data from another class - in this case the class BlogInfo */}
                    </div>
                    <div className="blog-same-line"> Travel Date: {props.blog.tripDate} </div>
                    <div className="blog-same-line"> Donation Item: {props.blog.donationItem}</div>
                    <div className="star-blog-rating">
                        <IconContext.Provider value={{ color: "yellow", className: "global-class-name", style: { verticalAlign: "middle" } }}> {/* this sets styling for the star icons used */}
                            <div className="star-blog-rating"> Rating: {star_amount} {/* stars are returned in brackets in order to render */}
                            </div>
                        </IconContext.Provider>
                    </div>
                    <div className="blog-same-line"> {props.blog.notes} </div>
                   
                </div>
            </div>
        </div>
    );
}

class BlogContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            loading: 'true', reloadAccount: this.reload // loading is used to know when to reload the page after changes have been made
        };
    }

    reload = () => { // this function is used to reload the information needed
        this.setState({ loading: 'true', reloadAccount: this.reload });
        this.getTrips(this) // reload calls getTrips so that the function can call the api again after loading
          .then(res => {
            this.setState({
              trips: res,
              loading: 'false',
              reloadAccount: this.reload
            });
          });
      }

    getTrips = async () => {        
        
        if(countryselected === false) { // if a country hasn't been selected from the drop downs then the normal api is called for all trips
            const response = await fetch('/api/user/trip/all-trips');
            const data = await response.json();
            if (response.status !== 200) {
                throw Error(response.message)
            }
            return data;
        }
        else { // if a country has been selected then the altered api call from updateCountryonClick is called - see notes in that function for details
            var response2 = await fetch(this.state.countryAppend); // need to make this instance of response a var because it needs to be called twice - therefore it can't be a const
            response2 = await fetch(this.state.countryAppend); // need to call this twice because without it the first time a country is selected the api is undefined - calling this twice causes the api call to include the correct information
            const data2 = await response2.json();
            if (response2.status !== 200) {
              throw Error(response2.message)
            }
            return data2;
        }
    };
    
    componentDidMount() {
        this.getTrips(this)
        .then(res => {
            this.setState({
                trips: res,
                loading: 'false',
                reloadAccount: this.reload
            });
        })
      .catch(err => console.log(err)); // TODO: handle all errors and relay to user
    }

    updateCountryonClick = (event) => { // is triggered when a country is selected from the drop downs
        const target = event.target; // this gets information from the select statement in the BlogDropDown class
        const name = target.value; // this gets the value of the country that was selected
        const countryAppend = blogAPI + 'country=' + name; // this takes the api call at the top and adds what's needed to query by country - that is api/country=countryname
        countryselected = true; // this changes countryselected to be true so that the normal api isn't called when getTrips runs
        this.setState({
            countryAppend: countryAppend,
            loading: 'false',
            reloadAccount: this.reload
        });
        this.reload(); // this is needed in order to render the correct trips
    }

	render() {
        if(this.state.loading === 'false'){
            return (
                <div>
                    <div className="page-info">
                        <p>View Donation Stories by country or scroll down to see the most recent posts. All stories are sorted by country and then by date with most recent stories appearing first. Click on the name of a continent to see where DoMAD users have been!</p>
                    </div>
                    <div className="country-button-container">
                        <BlogDropDown updateCountry={this.updateCountryonClick} /> {/* this pulls in the class BlogDropDown so that it can be accessed by updateCountryonClick */}
                    </div>
                    <Blogs blog={this.state} />
                </div>
            )
        }
        return (
            <div>
                <div className="page-info">
                    <p>View Donation Stories by country or scroll down to see the most recent posts. All stories are sorted by country and then by date with most recent stories appearing first. Click on the name of a continent to see where DoMAD users have been!</p>
                </div>
                <div className="country-button-container">
                    <BlogDropDown updateCountry={this.updateCountryonClick} />
                </div>
                <Blogs blog={this.state} />
            </div>
        )
	}
}

class BlogDropDown extends React.Component { // this class has only the drop down information and no other functionality
    constructor(props) {
		super(props)
		this.state = {
            
        };
    }

    render () {
        return (
            <div className="country-button-container"> {/* each country is listed and sorted by continent */}
                <select name="country" value={this.state.value} className="country-buttons" onChange={this.props.updateCountry}> {/* for select statements you need to use onChange so when an option is selected it triggers onChange */}
                    <option selected>Africa</option> {/* this is needed in order to show the continent as the default value before selecting anything */}
                    <option value="Algeria">Algeria</option>
                    <option value="Angola">Angola</option>
                    <option value="Benin">Benin</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cabo Verde">Cabo Verde</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Egypt">Egypt</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Eswatini">Eswatini</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-Bissau">Guinea-Bissau</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libya">Libya</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Mali">Mali</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Réunion">Réunion</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Sudan">South Sudan</option>
                    <option value="Saint Helena, Ascension and Tristan da Cunha">Saint Helena, Ascension and Tristan da Cunha</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                    <option value="Togo">Togo</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                </select>

                <select name="country" value={this.state.value} className="country-buttons" onChange={this.props.updateCountry}>
                    <option selected>Asia</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="China">China</option>
                    <option value="Georgia">Georgia</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Israel">Israel</option>
                    <option value="Japan">Japan</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palestine, State of">Palestine, State of</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                    <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Viet Nam">Viet Nam</option>
                    <option value="Yemen">Yemen</option>
                </select>

                <select name="country" value={this.state.value} className="country-buttons" onChange={this.props.updateCountry}>
                    <option selected>Europe</option>
                    <option value="Albania">Albania</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Austria">Austria</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czechia">Czechia</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Italy">Italy</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="North Macedonia">North Macedonia</option>
                    <option value="Malta">Malta</option>
                    <option value="Moldova, Republic of">Moldova, Republic of</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Norway">Norway</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Romania">Romania</option>
                    <option value="Russian Federation">Russian Federation</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Spain">Spain</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Kingdom">United Kingdom</option>
                </select>

                <select name="country" value={this.state.value} className="country-buttons" onChange={this.props.updateCountry}>
                    <option selected>North America</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belize">Belize</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>
                    <option value="Virgin Islands, British">Virgin Islands, British</option>
                    <option value="Canada">Canada</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Panama">Panama</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                    <option value="Saint Lucia">Saint Lucia</option>
                    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                    <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                    <option value="Sint Maarten (Dutch part)">Sint Maarten (Dutch part)</option>
                    <option value="Saint Martin (French part)">Saint Martin (French part)</option>
                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                    <option value="United States">United States</option>
                    <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                </select>

                <select name="country" value={this.state.value} className="country-buttons" onChange={this.props.updateCountry}>
                    <option selected>Oceania</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Australia">Australia</option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="Guam">Guam</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                    <option value="Nauru">Nauru</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Niue">Niue</option>
                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option value="Palau">Palau</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Samoa">Samoa</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Timor-Leste">Timor-Leste</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Wallis and Futuna">Wallis and Futuna</option>
                </select>

                <select name="country" value={this.state.value} className="country-buttons" onChange={this.props.updateCountry}>
                    <option selected>South America</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Bolivia, Plurinational State of">Bolivia, Plurinational State of</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Chile">Chile</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Venezuela, Bolivarian Republic of">Venezuela, Bolivarian Republic of</option>
                </select>
            </div>
        )
    }
}

function Blogs(props) { // function to take back end data and display it

    var trips = <div></div>

    if(props.blog.loading === "false"){
        var tripData = props.blog.trips.trips;

        trips = tripData.map(trip => {
        return <div className='blog-container-wrapper'>
            <BlogInfo tripInfo={trip} />
        </div>
        });

        trips = <div className="blog-trips-container">
            {trips.reverse()} {/* trips needs to be displayed in reverse order to show newest to oldest */}
        </div>
    }

    return (
        <div className="blogs">
            {trips}
        </div>
    );
}

export default BlogContainer; // have to export the BlogContainer class in order to get everything to render