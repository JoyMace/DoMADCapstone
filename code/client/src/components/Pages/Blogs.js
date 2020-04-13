import React, { Fragment }from 'react';
import './Blogs.css';
import blogimage from '../../images/boulder_image.jpg';
import { FaStar } from 'react-icons/fa';
import { IconContext } from "react-icons";
import { FaCaretDown } from 'react-icons/fa';

let blogAPI = '/api/user/trip/all-trips?';

class BlogInfo extends React.Component {
    constructor(props) {
		super(props)

        var tripInfo = this.props.tripInfo;
        var tripDate = new Date(tripInfo.tripDate);

        this.state = {
            city: tripInfo.locationID.city,
            country: tripInfo.locationID.country,
            tripDate: (tripDate.getMonth() + 1) + "/" +  tripDate.getDate() + "/" +  tripDate.getFullYear(),
            notes: tripInfo.notes,
            donations: tripInfo.donations,
            ratings: tripInfo.ratings,
            userID: tripInfo.userID,
            isPrivate: tripInfo.isPrivate
        }
        console.log(tripInfo);
    }

	render() {
		return <BlogEntry blog={this.state} />
	}
}

function BlogEntry(props) {
    var star_amount;
    var rating = 4;
    if(rating == 1) {
        star_amount = <div><FaStar /></div>
    }
    else if(rating == 2) {
        star_amount = <div><FaStar /> <FaStar /></div>
    }
    else if(rating == 3) {
        star_amount = <div><FaStar /> <FaStar /> <FaStar /></div>
    }
    else if(rating == 4) {
        star_amount = <div><FaStar /> <FaStar /> <FaStar /> <FaStar /></div>
    }
    else if(rating == 5) {
        star_amount = <div><FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar /></div>
    }

    return (
        <div className="blog-container">
            <div className="blog-entry">
                <div className="top-blog-image">
                    <img src={ blogimage } alt="boulder" />
                </div>
                <div className="bottom-blog-content">
                    <div className="blog-same-line">
                        <h4>Location: </h4>
                        {props.blog.country}
                    </div>
                    <div className="blog-same-line">
                        <h4>Travel Date: </h4>
                        {props.blog.tripDate}
                    </div>
                    <div className="blog-same-line">
                        <h4>Donation Item: </h4>
                        {props.blog.donations}
                    </div>
                    <div className="star-blog-rating">
                        <IconContext.Provider value={{ color: "yellow", className: "global-class-name", style: { verticalAlign: "middle" } }}>
                            <div className="star-blog-rating">
                                <h4>Rating: </h4>
                                {star_amount}
                            </div>
                        </IconContext.Provider>
                    </div>
                    <h4>Travel Story:</h4>{props.blog.notes}
                </div>
            </div>
        </div>
    );
}

class BlogContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            loading: 'true', reloadAccount: this.reload
        };
    }

    reload = () => {
        console.log('READLOAD');
        this.setState({ loading: 'true', reloadAccount: this.reload });
        this.getTrips(this).
          then(res => {
            this.setState({
              trips: res,
              loading: 'false',
              reloadAccount: this.reload
            });
          });
      }

    getTrips = async () => {        
        // console.log(props.countryblog);
        const response = await fetch(blogAPI);
            const data = await response.json();
            if (response.status != 200) {
              throw Error(response.message)
            }
            return data;

        /*if(props.countryblog == "") {
            const response = await fetch(blogAPI);
            const data = await response.json();
            if (response.status != 200) {
            throw Error(response.message)
            }
            return data;
        }
        else {
            const response = await fetch(props.countryblog);
            const data = await response.json();
            if (response.status != 200) {
              throw Error(response.message)
            }
            return data;
        }*/
    };
    
    componentDidMount() {
        this.getTrips(this).
        then(res => {
            this.setState({
                trips: res,
                loading: 'false',
                reloadAccount: this.reload
            });
        })
      .catch(err => console.log(err)); // TODO: handle all errors and relay to user
    }

	render() {
        if(this.state.loading == 'false'){
            return <Blogs blog={this.state} />
        }
        return (
            <div>
                <Blogs blog={this.state} />
            </div>
        )
	}
}

class BlogDropDown extends React.Component {
    constructor(props) {
		super(props)
		this.state = {

        };
    }

    updateCountryonClick = (event) => {
        const target = event.target;
        const name = target.value;
        const countryAppend = blogAPI + 'country=' + name;
        console.log(countryAppend);
        this.setState({
            countryAppend: countryAppend
        });
    }

    render() {
        return (
            /*<BlogContainer countryblog={this.state.countryAppend}/>*/
            /*<React.Fragment>*/
                <div className="top-buttons-blog">
                    {/*<BlogContainer countryblog={this.state.countryAppend}/>*/}
                    {/*<li className="dropdown-africa">*/}
                        {/*<div className="country-buttons">*/}
                            {/*<div className="dropdown-content-africa">*/}
                                <select name="country" value={this.state.value} className="country-buttons" onChange={this.updateCountryonClick}>
                                    <option selected>Africa</option>
                                    <option value='Algeria'>Algeria</option>
                                    <option value='Angola'>Angola</option>
                                    <option value='Benin'>Benin</option>
                                    <option value='Botswana'>Botswana</option>
                                    <option value='Burkina Faso'>Burkina Faso</option>
                                    <option value='Burundi'>Burundi</option>
                                    <option value='Cameroon'>Cameroon</option>
                                    <option value='Cape Verde'>Cape Verde</option>
                                    <option value='Central African Republic'>Central African Republic</option>
                                    <option value='Chad'>Chad</option>
                                    <option value='Comoros'>Comoros</option>
                                    <option value='Congo, Dem. Rep.'>Congo, Dem. Rep.</option>
                                    <option value='Congo, Rep.'>Congo, Rep.</option>
                                    <option value="Cote d'Ivoire">Cote d'Ivoire</option>
                                    <option value='Djibouti'>Djibouti</option>
                                    <option value='Egypt, Arab Rep.'>Egypt, Arab Rep.</option>
                                    <option value='Equatorial Guinea'>Equatorial Guinea</option>
                                    <option value='Eritrea'>Eritrea</option>
                                    <option value='Ethiopia'>Ethiopia</option>
                                    <option value='Gabon'>Gabon</option>
                                    <option value='Gambia'>Gambia, The</option>
                                    <option value='Ghana'>Ghana</option>
                                    <option value='Guinea'>Guinea</option>
                                    <option value='Guinea-Bissau'>Guinea-Bissau</option>
                                    <option value='Kenya'>Kenya</option>
                                    <option value='Lesotho'>Lesotho</option>
                                    <option value='Liberia'>Liberia</option>
                                    <option value='Libya'>Libya</option>
                                    <option value='Madagascar'>Madagascar</option>
                                    <option value='Malawi'>Malawi</option>
                                    <option value='Mali'>Mali</option>
                                    <option value='Mauritania'>Mauritania</option>
                                    <option value='Mauritius'>Mauritius</option>
                                    <option value='Mayotte'>Mayotte</option>
                                    <option value='Morocco'>Morocco</option>
                                    <option value='Mozambique'>Mozambique</option>
                                    <option value='Namibia'>Namibia</option>
                                    <option value='Niger'>Niger</option>
                                    <option value='Nigeria'>Nigeria</option>
                                    <option value='Reunion'>Reunion</option>
                                    <option value='Rwanda'>Rwanda</option>
                                    <option value='Sao Tome and Principe'>Sao Tome and Principe</option>
                                    <option value='Senegal'>Senegal</option>
                                    <option value='Seychelles'>Seychelles</option>
                                    <option value='Sierra Leone'>Sierra Leone</option>
                                    <option value='Somalia'>Somalia</option>
                                    <option value='South Africa'>South Africa</option>
                                    <option value='South Sudan'>South Sudan</option>
                                    <option value='St. Helena'>St. Helena</option>
                                    <option value='Sudan'>Sudan</option>
                                    <option value='Swaziland'>Swaziland</option>
                                    <option value='Tanzania'>Tanzania</option>
                                    <option value='Togo'>Togo</option>
                                    <option value='Tunisia'>Tunisia</option>
                                    <option value='Uganda'>Uganda</option>
                                    <option value='Western Sahara'>Western Sahara</option>
                                    <option value='Zambia'>Zambia</option>
                                    <option value='Zimbabwe'>Zimbabwe</option>
                                </select>
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</li>*/}
                    <li className="dropdown-asia">
                        <button href="javascript:void(0)" className="country-buttons">Asia<FaCaretDown /></button>
                        <div className="dropdown-content-asia">
                            <option value='Afghanistan'>Afghanistan</option>
                            <option value='Armenia'>Armenia</option>
                            <option value='Azerbaijan'>Azerbaijan</option>
                            <option value='Bahrain'>Bahrain</option>
                            <option value='Bangladesh'>Bangladesh</option>
                            <option value='Bhutan'>Bhutan</option>
                            <option value='Brunei Darussalam'>Brunei Darussalam</option>
                            <option value='Cambodia'>Cambodia</option>
                            <option value='China'>China</option>
                            <option value='Georgia'>Georgia</option>
                            <option value='Hong Kong SAR, China'>Hong Kong SAR, China</option>
                            <option value='India'>India</option>
                            <option value='Indonesia'>Indonesia</option>
                            <option value='Iran, Islamic Rep.'>Iran, Islamic Rep.</option>
                            <option value='Iraq'>Iraq</option>
                            <option value='Israel'>Israel</option>
                            <option value='Japan'>Japan</option>
                            <option value='Jordan'>Jordan</option>
                            <option value='Kazakhstan'>Kazakhstan</option>
                            <option value='Korea, Dem. Rep.'>Korea, Dem. Rep.</option>
                            <option value='Korea, Rep.'>Korea, Rep.</option>
                            <option value='Kuwait'>Kuwait</option>
                            <option value='Kyrgyz Republic'>Kyrgyz Republic</option>
                            <option value='Lao PDR'>Lao PDR</option>
                            <option value='Lebanon'>Lebanon</option>
                            <option value='Macao SAR, Chin'>Macao SAR, China</option>
                            <option value='Malaysia'>Malaysia</option>
                            <option value='Maldives'>Maldives</option>
                            <option value='Mongolia'>Mongolia</option>
                            <option value='Myanmar'>Myanmar</option>
                            <option value='Nepal'>Nepal</option>
                            <option value='Oman'>Oman</option>
                            <option value='Pakistan'>Pakistan</option>
                            <option value='Philippines'>Philippines</option>
                            <option value='Qatar'>Qatar</option>
                            <option value='Russian Federation'>Russian Federation</option>
                            <option value='Saudi Arabia'>Saudi Arabia</option>
                            <option value='Singapore'>Singapore</option>
                            <option value='Sri Lanka'>Sri Lanka</option>
                            <option value='Syrian Arab Republic'>Syrian Arab Republic</option>
                            <option value='Taiwan, China'>Taiwan, China</option>
                            <option value='Tajikistan'>Tajikistan</option>
                            <option value='Thailand'>Thailand</option>
                            <option value='Timor-Leste'>Timor-Leste</option>
                            <option value='Turkmenistan'>Turkmenistan</option>
                            <option value='United Arab Emirates'>United Arab Emirates</option>
                            <option value='Uzbekistan'>Uzbekistan</option>
                            <option value='Vietnam'>Vietnam</option>
                            <option value='West Bank and Gaza'>West Bank and Gaza</option>
                            <option value='Yemen, Rep.'>Yemen, Rep.</option>
                        </div>
                    </li>
                    <li className="dropdown-australia">
                        <button href="javascript:void(0)" className="country-buttons">Australia<FaCaretDown /></button>
                        <div className="dropdown-content-australia">
                            <option value='American Samoa'>American Samoa</option>
                            <option value='Australia'>Australia</option>
                            <option value='Cook Islands'>Cook Islands</option>
                            <option value='Fiji'>Fiji</option>
                            <option value='French Polynesia'>French Polynesia</option>
                            <option value='Guam'>Guam</option>
                            <option value='Kiribati'>Kiribati</option>
                            <option value='Marshall Islands'>Marshall Islands</option>
                            <option value='Micronesia, Fed. Sts.'>Micronesia, Fed. Sts.</option>
                            <option value='Nauru'>Nauru</option>
                            <option value='New Caledonia'>New Caledonia</option>
                            <option value='New Zealand'>New Zealand</option>
                            <option value='Niue'>Niue</option>
                            <option value='Northern Mariana Islands'>Northern Mariana Islands</option>
                            <option value='Palau'>Palau</option>
                            <option value='Papua New Guinea'>Papua New Guinea</option>
                            <option value='Samoa'>Samoa</option>
                            <option value='Solomon Islands'>Solomon Islands</option>
                            <option value='Tonga'>Tonga</option>
                            <option value='Tuvalu'>Tuvalu</option>
                            <option value='Vanuatu'>Vanuatu</option>
                            <option value='Wallis and Futuna'>Wallis and Futuna</option>
                        </div>
                    </li>
                    <li className="dropdown-europe">
                        <button href="javascript:void(0)" className="country-buttons">Europe<FaCaretDown /></button>
                        <div className="dropdown-content-europe">
                            <option value='Albania'>Albania</option>
                            <option value='Andorra'>Andorra</option>
                            <option value='Austria'>Austria</option>
                            <option value='Belarus'>Belarus</option>
                            <option value='Belgium'>Belgium</option>
                            <option value='Bosnia and Herzegovina'>Bosnia and Herzegovina</option>
                            <option value='Bulgaria'>Bulgaria</option>
                            <option value='Channel Islands'>Channel Islands</option>
                            <option value='Croatia'>Croatia</option>
                            <option value='Cyprus'>Cyprus</option>
                            <option value='Czech Republic'>Czech Republic</option>
                            <option value='Denmark'>Denmark</option>
                            <option value='Estonia'>Estonia</option>
                            <option value='Faroe Islands'>Faroe Islands</option>
                            <option value='Finland'>Finland</option>
                            <option value='France'>France</option>
                            <option value='Germany'>Germany</option>
                            <option value='Gibraltar'>Gibraltar</option>
                            <option value='Greece'>Greece</option>
                            <option value='Greenland'>Greenland</option>
                            <option value='Hungary'>Hungary</option>
                            <option value='Iceland'>Iceland</option>
                            <option value='Ireland'>Ireland</option>
                            <option value='Isle of Man'>Isle of Man</option>
                            <option value='Italy'>Italy</option>
                            <option value='Kosovo'>Kosovo</option>
                            <option value='Latvia'>Latvia</option>
                            <option value='Liechtenstein'>Liechtenstein</option>
                            <option value='Lithuania'>Lithuania</option>
                            <option value='Luxembourg'>Luxembourg</option>
                            <option value='Macedonia'>Macedonia, FYR</option>
                            <option value='Malta'>Malta</option>
                            <option value='Moldova'>Moldova</option>
                            <option value='Monaco'>Monaco</option>
                            <option value='Montenegro'>Montenegro</option>
                            <option value='Netherlands'>Netherlands</option>
                            <option value='Norway'>Norway</option>
                            <option value='Poland'>Poland</option>
                            <option value='Portugal'>Portugal</option>
                            <option value='Romania'>Romania</option>
                            <option value='San Marino'>San Marino</option>
                            <option value='Serbia'>Serbia</option>
                            <option value='Slovak Republic'>Slovak Republic</option>
                            <option value='Slovenia'>Slovenia</option>
                            <option value='Spain'>Spain</option>
                            <option value='Sweden'>Sweden</option>
                            <option value='Switzerland'>Switzerland</option>
                            <option value='Turkey'>Turkey</option>
                            <option value='Ukraine'>Ukraine</option>
                            <option value='United Kingdom'>United Kingdom</option>
                        </div>
                    </li>
                    <li className="dropdown-north">
                        <button href="javascript:void(0)" className="country-buttons">North America<FaCaretDown /></button>
                        <div className="dropdown-content-north">
                            <option value='Anguilla'>Anguilla</option>
                            <option value='Antigua and Barbuda'>Antigua and Barbuda</option>
                            <option value='Aruba'>Aruba</option>
                            <option value='Bahamas, The'>Bahamas, The</option>
                            <option value='Barbados'>Barbados</option>
                            <option value='Belize'>Belize</option>
                            <option value='Bermuda'>Bermuda</option>
                            <option value='British Virgin Islands'>British Virgin Islands</option>
                            <option value='Canada'>Canada</option>
                            <option value='Cayman Islands'>Cayman Islands</option>
                            <option value='Costa Rica'>Costa Rica</option>
                            <option value='Cuba'>Cuba</option>
                            <option value='Dominica'>Dominica</option>
                            <option value='Dominican Republic'>Dominican Republic</option>
                            <option value='El Salvador'>El Salvador</option>
                            <option value='Grenada'>Grenada</option>
                            <option value='Guadeloupe'>Guadeloupe</option>
                            <option value='Guatemala'>Guatemala</option>
                            <option value='Haiti'>Haiti</option>
                            <option value='Honduras'>Honduras</option>
                            <option value='Jamaica'>Jamaica</option>
                            <option value='Martinique'>Martinique</option>
                            <option value='Mexico'>Mexico</option>
                            <option value='Montserrat'>Montserrat</option>
                            <option value='Netherlands Antilles'>Netherlands Antilles</option>
                            <option value='Nicaragua'>Nicaragua</option>
                            <option value='Panama'>Panama</option>
                            <option value='Puerto Rico'>Puerto Rico</option>
                            <option value='Saint Pierre et Miquelon'>Saint Pierre et Miquelon</option>
                            <option value='Sint Maarten (Dutch part)'>Sint Maarten (Dutch part)</option>
                            <option value='St. Kitts and Nevis'>St. Kitts and Nevis</option>
                            <option value='St. Lucia'>St. Lucia</option>
                            <option value='St. Martin (French part)'>St. Martin (French part)</option>
                            <option value='St. Vincent and the Grenadines'>St. Vincent and the Grenadines</option>
                            <option value='Trinidad and Tobago'>Trinidad and Tobago</option>
                            <option value='Turks and Caicos Islands'>Turks and Caicos Islands</option>
                            <option value='United States'>United States</option>
                            <option value='Virgin Islands (U.S.'>Virgin Islands (U.S.)</option>
                        </div>
                    </li>
                    <li className="dropdown-south">
                        <button href="javascript:void(0)" className="country-buttons">South America<FaCaretDown /></button>
                        <div className="dropdown-content-south">
                            <option value='Argentina'>Argentina</option>
                            <option value='BES Islands'>BES Islands</option>
                            <option value='Bolivia'>Bolivia</option>
                            <option value='Brazil'>Brazil</option>
                            <option value='Chile'>Chile</option>
                            <option value='Colombia'>Colombia</option>
                            <option value='Curacao'>Curacao</option>
                            <option value='Ecuador'>Ecuador</option>
                            <option value='Falkland Islands'>Falkland Islands</option>
                            <option value='French Guyana'>French Guyana</option>
                            <option value='Guyana'>Guyana</option>
                            <option value='Paraguay'>Paraguay</option>
                            <option value='Peru'>Peru</option>
                            <option value='Suriname'>Suriname</option>
                            <option value='Uruguay'>Uruguay</option>
                            <option value='Venezuela, RB'>Venezuela, RB</option>
                        </div>
                    </li>
                </div>
                /*<BlogContainer countryblog={this.state.countryAppend}/>*/
            /*</React.Fragment>*/
        )
    }
}

function Blogs(props) {

    var trips = <div></div>

    if(props.blog.loading == "false"){
        var tripData = props.blog.trips.trips;

        var trips = tripData.map(trip => {
        return <div className='blog-container-wrapper'>
            <BlogInfo tripInfo={trip} />
        </div>
        });

        trips = <div className="blog-trips-container">
            {trips.reverse()}
        </div>
    }

    return (
        <div className="blogs">
            <div className="page-info">
                <p>View Donation Stories by country or scroll down to see the most recent posts. All stories are sorted by country and then by date with most recent stories appearing first. Click on the name of a continent to see where DoMAD users have been!</p>
            </div>
            <div className="country-button-container">
                <IconContext.Provider value={{ className: "global-class-name", style: { verticalAlign: "middle" } }}>
                    <BlogDropDown/>
                </IconContext.Provider>
            </div>
            {trips}
        </div>
    );
}

export default BlogContainer;