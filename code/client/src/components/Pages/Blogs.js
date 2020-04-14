import React, { Fragment }from 'react';
import './Blogs.css';
import blogimage from '../../images/boulder_image.jpg';
import { FaStar } from 'react-icons/fa';
import { FaStarHalf } from 'react-icons/fa';
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
        notes: tripInfo.notes ,
        donations: tripInfo.donations,
        ratings: tripInfo.ratings,
        userID: tripInfo.userID
        }
	}

	render() {
		return <BlogEntry blog={this.state} />
	}
}

function BlogEntry(props) {
    return (
        <div className="blog-container">
            <div className="blog-entry">
                <div className="top-blog-image">
                    <img src={ blogimage } alt="boulder" />
                </div>
                <div className="bottom-blog-content">
                    <p>Location: {props.blog.country}</p>
                    <p>Donation: {props.blog.userID}</p>
                    <p>Travel Story: {props.blog.notes}</p>
                    <div className="star-blog-rating">
                        <IconContext.Provider value={{ color: "yellow", className: "global-class-name", style: { verticalAlign: "middle" } }}>
                            <div>
                                <p>Rating: <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalf /></p>
                            </div>
                        </IconContext.Provider>
                    </div>
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

    getTrips = async (props) => {        
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
            <React.Fragment>
                <div className="top-buttons-blog">
                    <li className="dropdown-africa">
                        <button href="javascript:void(0)" className="country-buttons">Africa<FaCaretDown /></button>
                        <div className="dropdown-content-africa">
                            <select name="country" value={this.state.value} className="country" onChange={this.updateCountryonClick}>
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
                        </div>
                    </li>
                    <li className="dropdown-asia">
                        <button href="javascript:void(0)" className="country-buttons">Asia<FaCaretDown /></button>
                        <div className="dropdown-content-asia">
                            <option value='AFG'>Afghanistan</option>
                            <option value='ARM'>Armenia</option>
                            <option value='AZE'>Azerbaijan</option>
                            <option value='BHR'>Bahrain</option>
                            <option value='BGD'>Bangladesh</option>
                            <option value='BTN'>Bhutan</option>
                            <option value='BRN'>Brunei Darussalam</option>
                            <option value='KHM'>Cambodia</option>
                            <option value='CHN'>China</option>
                            <option value='GEO'>Georgia</option>
                            <option value='HKG'>Hong Kong SAR, China</option>
                            <option value='IND'>India</option>
                            <option value='IDN'>Indonesia</option>
                            <option value='IRN'>Iran, Islamic Rep.</option>
                            <option value='IRQ'>Iraq</option>
                            <option value='ISR'>Israel</option>
                            <option value='JPN'>Japan</option>
                            <option value='JOR'>Jordan</option>
                            <option value='KAZ'>Kazakhstan</option>
                            <option value='PRK'>Korea, Dem. Rep.</option>
                            <option value='KOR'>Korea, Rep.</option>
                            <option value='KWT'>Kuwait</option>
                            <option value='KGZ'>Kyrgyz Republic</option>
                            <option value='LAO'>Lao PDR</option>
                            <option value='LBN'>Lebanon</option>
                            <option value='MAC'>Macao SAR, China</option>
                            <option value='MYS'>Malaysia</option>
                            <option value='MDV'>Maldives</option>
                            <option value='MNG'>Mongolia</option>
                            <option value='MMR'>Myanmar</option>
                            <option value='NPL'>Nepal</option>
                            <option value='OMN'>Oman</option>
                            <option value='PAK'>Pakistan</option>
                            <option value='PHL'>Philippines</option>
                            <option value='QAT'>Qatar</option>
                            <option value='RUS'>Russian Federation</option>
                            <option value='SAU'>Saudi Arabia</option>
                            <option value='SGP'>Singapore</option>
                            <option value='LKA'>Sri Lanka</option>
                            <option value='SYR'>Syrian Arab Republic</option>
                            <option value='TWN'>Taiwan, China</option>
                            <option value='TJK'>Tajikistan</option>
                            <option value='THA'>Thailand</option>
                            <option value='TLS'>Timor-Leste</option>
                            <option value='TKM'>Turkmenistan</option>
                            <option value='ARE'>United Arab Emirates</option>
                            <option value='UZB'>Uzbekistan</option>
                            <option value='VNM'>Vietnam</option>
                            <option value='PSE'>West Bank and Gaza</option>
                            <option value='YEM'>Yemen, Rep.</option>
                        </div>
                    </li>
                    <li className="dropdown-australia">
                        <button href="javascript:void(0)" className="country-buttons">Australia<FaCaretDown /></button>
                        <div className="dropdown-content-australia">
                            <option value='ASM'>American Samoa</option>
                            <option value='AUS'>Australia</option>
                            <option value='COK'>Cook Islands</option>
                            <option value='FJI'>Fiji</option>
                            <option value='PYF'>French Polynesia</option>
                            <option value='GUM'>Guam</option>
                            <option value='KIR'>Kiribati</option>
                            <option value='MHL'>Marshall Islands</option>
                            <option value='FSM'>Micronesia, Fed. Sts.</option>
                            <option value='NRU'>Nauru</option>
                            <option value='NCL'>New Caledonia</option>
                            <option value='NZL'>New Zealand</option>
                            <option value='NIU'>Niue</option>
                            <option value='MNP'>Northern Mariana Islands</option>
                            <option value='PLW'>Palau</option>
                            <option value='PNG'>Papua New Guinea</option>
                            <option value='WSM'>Samoa</option>
                            <option value='SLB'>Solomon Islands</option>
                            <option value='TON'>Tonga</option>
                            <option value='TUV'>Tuvalu</option>
                            <option value='VUT'>Vanuatu</option>
                            <option value='WLF'>Wallis and Futuna</option>
                        </div>
                    </li>
                    <li className="dropdown-europe">
                        <button href="javascript:void(0)" className="country-buttons">Europe<FaCaretDown /></button>
                        <div className="dropdown-content-europe">
                            <option value='ALB'>Albania</option>
                            <option value='AND'>Andorra</option>
                            <option value='AUT'>Austria</option>
                            <option value='BLR'>Belarus</option>
                            <option value='BEL'>Belgium</option>
                            <option value='BIH'>Bosnia and Herzegovina</option>
                            <option value='BGR'>Bulgaria</option>
                            <option value='CHI'>Channel Islands</option>
                            <option value='HRV'>Croatia</option>
                            <option value='CYP'>Cyprus</option>
                            <option value='CZE'>Czech Republic</option>
                            <option value='DNK'>Denmark</option>
                            <option value='EST'>Estonia</option>
                            <option value='FRO'>Faroe Islands</option>
                            <option value='FIN'>Finland</option>
                            <option value='FRA'>France</option>
                            <option value='DEU'>Germany</option>
                            <option value='GIB'>Gibraltar</option>
                            <option value='GRC'>Greece</option>
                            <option value='GRL'>Greenland</option>
                            <option value='HUN'>Hungary</option>
                            <option value='ISL'>Iceland</option>
                            <option value='IRL'>Ireland</option>
                            <option value='IMN'>Isle of Man</option>
                            <option value='ITA'>Italy</option>
                            <option value='XKX'>Kosovo</option>
                            <option value='LVA'>Latvia</option>
                            <option value='LIE'>Liechtenstein</option>
                            <option value='LTU'>Lithuania</option>
                            <option value='LUX'>Luxembourg</option>
                            <option value='MKD'>Macedonia, FYR</option>
                            <option value='MLT'>Malta</option>
                            <option value='MDA'>Moldova</option>
                            <option value='MCO'>Monaco</option>
                            <option value='MNE'>Montenegro</option>
                            <option value='NLD'>Netherlands</option>
                            <option value='NOR'>Norway</option>
                            <option value='POL'>Poland</option>
                            <option value='PRT'>Portugal</option>
                            <option value='ROU'>Romania</option>
                            <option value='SMR'>San Marino</option>
                            <option value='SRB'>Serbia</option>
                            <option value='SVK'>Slovak Republic</option>
                            <option value='SVN'>Slovenia</option>
                            <option value='ESP'>Spain</option>
                            <option value='SWE'>Sweden</option>
                            <option value='CHE'>Switzerland</option>
                            <option value='TUR'>Turkey</option>
                            <option value='UKR'>Ukraine</option>
                            <option value='GBR'>United Kingdom</option>
                        </div>
                    </li>
                    <li className="dropdown-north">
                        <button href="javascript:void(0)" className="country-buttons">North America<FaCaretDown /></button>
                        <div className="dropdown-content-north">
                            <option value='AIA'>Anguilla</option>
                            <option value='ATG'>Antigua and Barbuda</option>
                            <option value='ABW'>Aruba</option>
                            <option value='BHS'>Bahamas, The</option>
                            <option value='BRB'>Barbados</option>
                            <option value='BLZ'>Belize</option>
                            <option value='BMU'>Bermuda</option>
                            <option value='VGB'>British Virgin Islands</option>
                            <option value='CAN'>Canada</option>
                            <option value='CYM'>Cayman Islands</option>
                            <option value='CRI'>Costa Rica</option>
                            <option value='CUB'>Cuba</option>
                            <option value='DMA'>Dominica</option>
                            <option value='DOM'>Dominican Republic</option>
                            <option value='SLV'>El Salvador</option>
                            <option value='GRD'>Grenada</option>
                            <option value='GLP'>Guadeloupe</option>
                            <option value='GTM'>Guatemala</option>
                            <option value='HTI'>Haiti</option>
                            <option value='HND'>Honduras</option>
                            <option value='JAM'>Jamaica</option>
                            <option value='MTQ'>Martinique</option>
                            <option value='MEX'>Mexico</option>
                            <option value='MSR'>Montserrat</option>
                            <option value='ANT'>Netherlands Antilles</option>
                            <option value='NIC'>Nicaragua</option>
                            <option value='PAN'>Panama</option>
                            <option value='PRI'>Puerto Rico</option>
                            <option value='SPM'>Saint Pierre et Miquelon</option>
                            <option value='SXM'>Sint Maarten (Dutch part)</option>
                            <option value='KNA'>St. Kitts and Nevis</option>
                            <option value='LCA'>St. Lucia</option>
                            <option value='MAF'>St. Martin (French part)</option>
                            <option value='VCT'>St. Vincent and the Grenadines</option>
                            <option value='TTO'>Trinidad and Tobago</option>
                            <option value='TCA'>Turks and Caicos Islands</option>
                            <option value='USA'>United States</option>
                            <option value='VIR'>Virgin Islands (U.S.)</option>
                        </div>
                    </li>
                    <li className="dropdown-south">
                        <button href="javascript:void(0)" className="country-buttons">South America<FaCaretDown /></button>
                        <div className="dropdown-content-south">
                            <option value='ARG'>Argentina</option>
                            <option value='BES'>BES Islands</option>
                            <option value='BOL'>Bolivia</option>
                            <option value='BRA'>Brazil</option>
                            <option value='CHL'>Chile</option>
                            <option value='COL'>Colombia</option>
                            <option value='CUW'>Curacao</option>
                            <option value='ECU'>Ecuador</option>
                            <option value='FLK'>Falkland Islands</option>
                            <option value='GUF'>French Guyana</option>
                            <option value='GUY'>Guyana</option>
                            <option value='PRY'>Paraguay</option>
                            <option value='PER'>Peru</option>
                            <option value='SUR'>Suriname</option>
                            <option value='URY'>Uruguay</option>
                            <option value='VEN'>Venezuela, RB</option>
                        </div>
                    </li>
                </div>
                {/*<BlogContainer countryblog={this.state}/>*/}
            </React.Fragment>
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