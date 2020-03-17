import React from 'react';
import ReactDOM from 'react-dom';
import './Account.css';
import WorldMapImage from '../../images/WorldMap.png';
import avatar from '../../images/Avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import KenyaImage from '../../images/KenyaSavannah.jfif';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'



class TravelMap extends React.Component {
	constructor() {
	  super()
	  this.state = {
		lat: 51.505,
		lng: -0.09,
		zoom: 13
	  }
	}
  
	render() {
	  const position = [this.state.lat, this.state.lng];
	  return (
		<Map center={position} zoom={this.state.zoom}>
		  <TileLayer
			attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'			
		  />
		  <Marker position={position}>
			<Popup>
			  A pretty CSS3 popup. <br/> Easily customizable.
			</Popup>
		  </Marker>
		</Map>
	  );
	}
  } 
	

const userInfo = {
	avatar: <img src={ avatar } alt="avatar" height='120px'/>,
	name: 'Joy Mace',
	memberSince: '1999',
	hometown: 'Denver, CO',
	totalDonations: '105',
	totalContributions: '99',
};

function UserInfo(props) {
  return (
	<div className="UserInfo">
		<div className="user-info-row">
			<div className="avatar-column">
					<div className='UserInfo-avatar'>{userInfo.avatar}</div>
			</div>
			<div className="user-info-column">
				<div className="UserInfo-name">{userInfo.name}</div>
				<div className='UserInfo-memberSince'>Member Since: {userInfo.memberSince}</div>
				<div className='UserInfo-hometown'>Hometown: {userInfo.hometown}</div>
				<div className='UserInfo-totalDonations'>Total Donations Made: {userInfo.totalDonations}</div>
				<div className='UserInfo-totalContributions'>Total Contributions to DoMAD: {userInfo.totalContributions}</div>
			</div>
		</div>
	</div>
  )
}

class UserDonationStory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: '',
			country: '',	
			city: '',	
			donationRecipient: '',
			donationItem: '',
			donationCategory: '',
			rating: '',
			description: '',
			public_private: 'Public',
			suggestedDonationItem: ""
		};
	}
	accountChangeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		console.log(nam, val);
		this.setState({[nam]: val});
	}
	render() {
		const { post } = this.props
		return (

		<form action="/api/user/trip/report" method="POST">
			<ul class="flex-outer">
				<input name="userID" value="123" type="hidden"/>
				<li>
					<label for="date">When did this trip occur?</label>
					<input id="date" name='date' type="date" onChange={this.accountChangeHandler } />
				</li>

				<li>
					<label name="country" className="country">Where did you go?</label>
					<select name="country" className="country"value={this.state.country} onChange={this.accountChangeHandler}>
						<option value="Afganistan">Afghanistan</option>
						<option value="Albania">Albania</option>
						<option value="Algeria">Algeria</option>
						<option value="American Samoa">American Samoa</option>
						<option value="Andorra">Andorra</option>
						<option value="Angola">Angola</option>
						<option value="Anguilla">Anguilla</option>
						<option value="Antigua & Barbuda">Antigua & Barbuda</option>
						<option value="Argentina">Argentina</option>
						<option value="Armenia">Armenia</option>
						<option value="Aruba">Aruba</option>
						<option value="Australia">Australia</option>
						<option value="Austria">Austria</option>
						<option value="Azerbaijan">Azerbaijan</option>
						<option value="Bahamas">Bahamas</option>
						<option value="Bahrain">Bahrain</option>
						<option value="Bangladesh">Bangladesh</option>
						<option value="Barbados">Barbados</option>
						<option value="Belarus">Belarus</option>
						<option value="Belgium">Belgium</option>
						<option value="Belize">Belize</option>
						<option value="Benin">Benin</option>
						<option value="Bermuda">Bermuda</option>
						<option value="Bhutan">Bhutan</option>
						<option value="Bolivia">Bolivia</option>
						<option value="Bonaire">Bonaire</option>
						<option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
						<option value="Botswana">Botswana</option>
						<option value="Brazil">Brazil</option>
						<option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
						<option value="Brunei">Brunei</option>
						<option value="Bulgaria">Bulgaria</option>
						<option value="Burkina Faso">Burkina Faso</option>
						<option value="Burundi">Burundi</option>
						<option value="Cambodia">Cambodia</option>
						<option value="Cameroon">Cameroon</option>
						<option value="Canada">Canada</option>
						<option value="Canary Islands">Canary Islands</option>
						<option value="Cape Verde">Cape Verde</option>
						<option value="Cayman Islands">Cayman Islands</option>
						<option value="Central African Republic">Central African Republic</option>
						<option value="Chad">Chad</option>
						<option value="Channel Islands">Channel Islands</option>
						<option value="Chile">Chile</option>
						<option value="China">China</option>
						<option value="Christmas Island">Christmas Island</option>
						<option value="Cocos Island">Cocos Island</option>
						<option value="Colombia">Colombia</option>
						<option value="Comoros">Comoros</option>
						<option value="Congo">Congo</option>
						<option value="Cook Islands">Cook Islands</option>
						<option value="Costa Rica">Costa Rica</option>
						<option value="Cote DIvoire">Cote DIvoire</option>
						<option value="Croatia">Croatia</option>
						<option value="Cuba">Cuba</option>
						<option value="Curaco">Curacao</option>
						<option value="Cyprus">Cyprus</option>
						<option value="Czech Republic">Czech Republic</option>
						<option value="Denmark">Denmark</option>
						<option value="Djibouti">Djibouti</option>
						<option value="Dominica">Dominica</option>
						<option value="Dominican Republic">Dominican Republic</option>
						<option value="East Timor">East Timor</option>
						<option value="Ecuador">Ecuador</option>
						<option value="Egypt">Egypt</option>
						<option value="El Salvador">El Salvador</option>
						<option value="Equatorial Guinea">Equatorial Guinea</option>
						<option value="Eritrea">Eritrea</option>
						<option value="Estonia">Estonia</option>
						<option value="Ethiopia">Ethiopia</option>
						<option value="Falkland Islands">Falkland Islands</option>
						<option value="Faroe Islands">Faroe Islands</option>
						<option value="Fiji">Fiji</option>
						<option value="Finland">Finland</option>
						<option value="France">France</option>
						<option value="French Guiana">French Guiana</option>
						<option value="French Polynesia">French Polynesia</option>
						<option value="French Southern Ter">French Southern Ter</option>
						<option value="Gabon">Gabon</option>
						<option value="Gambia">Gambia</option>
						<option value="Georgia">Georgia</option>
						<option value="Germany">Germany</option>
						<option value="Ghana">Ghana</option>
						<option value="Gibraltar">Gibraltar</option>
						<option value="Great Britain">Great Britain</option>
						<option value="Greece">Greece</option>
						<option value="Greenland">Greenland</option>
						<option value="Grenada">Grenada</option>
						<option value="Guadeloupe">Guadeloupe</option>
						<option value="Guam">Guam</option>
						<option value="Guatemala">Guatemala</option>
						<option value="Guinea">Guinea</option>
						<option value="Guyana">Guyana</option>
						<option value="Haiti">Haiti</option>
						<option value="Hawaii">Hawaii</option>
						<option value="Honduras">Honduras</option>
						<option value="Hong Kong">Hong Kong</option>
						<option value="Hungary">Hungary</option>
						<option value="Iceland">Iceland</option>
						<option value="Indonesia">Indonesia</option>
						<option value="India">India</option>
						<option value="Iran">Iran</option>
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
						<option value="Korea North">Korea North</option>
						<option value="Korea Sout">Korea South</option>
						<option value="Kuwait">Kuwait</option>
						<option value="Kyrgyzstan">Kyrgyzstan</option>
						<option value="Laos">Laos</option>
						<option value="Latvia">Latvia</option>
						<option value="Lebanon">Lebanon</option>
						<option value="Lesotho">Lesotho</option>
						<option value="Liberia">Liberia</option>
						<option value="Libya">Libya</option>
						<option value="Liechtenstein">Liechtenstein</option>
						<option value="Lithuania">Lithuania</option>
						<option value="Luxembourg">Luxembourg</option>
						<option value="Macau">Macau</option>
						<option value="Macedonia">Macedonia</option>
						<option value="Madagascar">Madagascar</option>
						<option value="Malaysia">Malaysia</option>
						<option value="Malawi">Malawi</option>
						<option value="Maldives">Maldives</option>
						<option value="Mali">Mali</option>
						<option value="Malta">Malta</option>
						<option value="Marshall Islands">Marshall Islands</option>
						<option value="Martinique">Martinique</option>
						<option value="Mauritania">Mauritania</option>
						<option value="Mauritius">Mauritius</option>
						<option value="Mayotte">Mayotte</option>
						<option value="Mexico">Mexico</option>
						<option value="Midway Islands">Midway Islands</option>
						<option value="Moldova">Moldova</option>
						<option value="Monaco">Monaco</option>
						<option value="Mongolia">Mongolia</option>
						<option value="Montserrat">Montserrat</option>
						<option value="Morocco">Morocco</option>
						<option value="Mozambique">Mozambique</option>
						<option value="Myanmar">Myanmar</option>
						<option value="Nambia">Nambia</option>
						<option value="Nauru">Nauru</option>
						<option value="Nepal">Nepal</option>
						<option value="Netherland Antilles">Netherland Antilles</option>
						<option value="Netherlands">Netherlands (Holland, Europe)</option>
						<option value="Nevis">Nevis</option>
						<option value="New Caledonia">New Caledonia</option>
						<option value="New Zealand">New Zealand</option>
						<option value="Nicaragua">Nicaragua</option>
						<option value="Niger">Niger</option>
						<option value="Nigeria">Nigeria</option>
						<option value="Niue">Niue</option>
						<option value="Norfolk Island">Norfolk Island</option>
						<option value="Norway">Norway</option>
						<option value="Oman">Oman</option>
						<option value="Pakistan">Pakistan</option>
						<option value="Palau Island">Palau Island</option>
						<option value="Palestine">Palestine</option>
						<option value="Panama">Panama</option>
						<option value="Papua New Guinea">Papua New Guinea</option>
						<option value="Paraguay">Paraguay</option>
						<option value="Peru">Peru</option>
						<option value="Phillipines">Philippines</option>
						<option value="Pitcairn Island">Pitcairn Island</option>
						<option value="Poland">Poland</option>
						<option value="Portugal">Portugal</option>
						<option value="Puerto Rico">Puerto Rico</option>
						<option value="Qatar">Qatar</option>
						<option value="Republic of Montenegro">Republic of Montenegro</option>
						<option value="Republic of Serbia">Republic of Serbia</option>
						<option value="Reunion">Reunion</option>
						<option value="Romania">Romania</option>
						<option value="Russia">Russia</option>
						<option value="Rwanda">Rwanda</option>
						<option value="St Barthelemy">St Barthelemy</option>
						<option value="St Eustatius">St Eustatius</option>
						<option value="St Helena">St Helena</option>
						<option value="St Kitts-Nevis">St Kitts-Nevis</option>
						<option value="St Lucia">St Lucia</option>
						<option value="St Maarten">St Maarten</option>
						<option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
						<option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
						<option value="Saipan">Saipan</option>
						<option value="Samoa">Samoa</option>
						<option value="Samoa American">Samoa American</option>
						<option value="San Marino">San Marino</option>
						<option value="Sao Tome & Principe">Sao Tome & Principe</option>
						<option value="Saudi Arabia">Saudi Arabia</option>
						<option value="Senegal">Senegal</option>
						<option value="Seychelles">Seychelles</option>
						<option value="Sierra Leone">Sierra Leone</option>
						<option value="Singapore">Singapore</option>
						<option value="Slovakia">Slovakia</option>
						<option value="Slovenia">Slovenia</option>
						<option value="Solomon Islands">Solomon Islands</option>
						<option value="Somalia">Somalia</option>
						<option value="South Africa">South Africa</option>
						<option value="Spain">Spain</option>
						<option value="Sri Lanka">Sri Lanka</option>
						<option value="Sudan">Sudan</option>
						<option value="Suriname">Suriname</option>
						<option value="Swaziland">Swaziland</option>
						<option value="Sweden">Sweden</option>
						<option value="Switzerland">Switzerland</option>
						<option value="Syria">Syria</option>
						<option value="Tahiti">Tahiti</option>
						<option value="Taiwan">Taiwan</option>
						<option value="Tajikistan">Tajikistan</option>
						<option value="Tanzania">Tanzania</option>
						<option value="Thailand">Thailand</option>
						<option value="Togo">Togo</option>
						<option value="Tokelau">Tokelau</option>
						<option value="Tonga">Tonga</option>
						<option value="Trinidad & Tobago">Trinidad & Tobago</option>
						<option value="Tunisia">Tunisia</option>
						<option value="Turkey">Turkey</option>
						<option value="Turkmenistan">Turkmenistan</option>
						<option value="Turks & Caicos Is">Turks & Caicos Is</option>
						<option value="Tuvalu">Tuvalu</option>
						<option value="Uganda">Uganda</option>
						<option value="United Kingdom">United Kingdom</option>
						<option value="Ukraine">Ukraine</option>
						<option value="United Arab Erimates">United Arab Emirates</option>
						<option value="United States of America">United States of America</option>
						<option value="Uraguay">Uruguay</option>
						<option value="Uzbekistan">Uzbekistan</option>
						<option value="Vanuatu">Vanuatu</option>
						<option value="Vatican City State">Vatican City State</option>
						<option value="Venezuela">Venezuela</option>
						<option value="Vietnam">Vietnam</option>
						<option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
						<option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
						<option value="Wake Island">Wake Island</option>
						<option value="Wallis & Futana Is">Wallis & Futana Is</option>
						<option value="Yemen">Yemen</option>
						<option value="Zaire">Zaire</option>
						<option value="Zambia">Zambia</option>
						<option value="Zimbabwe">Zimbabwe</option>
						</select>
				
				</li>

				<li>
					<label name="city" className="city">What city?</label>
					<input name="city" type="text" placeholder="Enter city name" value={this.state.city} onChange={this.accountChangeHandler}/>
				</li>

				<li>
					<label name="donationItem" className="donationItem">What did you donate?</label>
					<input name="donationItem" className="donationItem" type="text" placeholder="Enter Donation Item" value={this.state.donationItem} onChange={this.accountChangeHandler}/>
				</li>
				<li>
					<label name="donationCategory" className="donationCategory"></label>
					<select name='donationCategory' value={this.state.donationCategory} onChange={this.accountChangeHandler}>
					  <option selected="selected">Select the Donation Category</option>
					  <option value="AnimalWelfare">Animal Welfare</option>
					  <option value="Art">Art</option>
					  <option value="Clothing">Clothing</option>
					  <option value="Education">Education</option>
					  <option value="Environment">Environment</option>
					  <option value="Food">Food</option>
					  <option value="Health">Health</option>
					  <option value="Household">Household</option>
					  <option value="Miscellaneous">Miscellaneous</option>
					  <option value="Sports">Sports</option>
					</select>
				</li>
				<li>
					<p>Did you donate to an Individual or Organization?</p>
						<ul class="flex-inner">
							<li>
							<label for="donationRecipient" name="donationRecipient">Individual</label>
							<input type="checkbox" id="Individual" name="donationRecipient" value={this.state.donationRecipient}/>
							</li>

							<li>
							<label for="donationRecipient" name="donationRecipient">Organization</label>
							<input type="checkbox" id="Organization"/>
							</li>

						</ul>
				</li>

				<li>
					<label name="rating" className="rating">How was the donation received?</label>
						<div className='star-rating'>
							<FontAwesomeIcon icon={faStar} />
							<FontAwesomeIcon icon={faStar} />
							<FontAwesomeIcon icon={faStar} />
							<FontAwesomeIcon icon={faStar} />
							<FontAwesomeIcon icon={faStar} />
						</div>

				</li>

				<li>
					<button>Add Item</button>

				</li>

				<li>
					<label name="suggestedDonationItem" className="suggestedDonationItem">Suggest Future Donation Item?</label>
					<input name="suggestedDonationItem" className="suggestedDonationItem" type="text" placeholder="Enter Donation Item"value={this.state.suggestedDonationItem} onChange={this.accountChangeHandler} />
				</li>
				<li>
					<label name="donationCategory" className="donationCategory"></label>
					<select name='donationCategory' value={this.state.donationCategory} onChange={this.accountChangeHandler}>
					  <option selected="selected">Select the Donation Category</option>
					  <option value="AnimalWelfare">Animal Welfare</option>
					  <option value="Art">Art</option>
					  <option value="Clothing">Clothing</option>
					  <option value="Education">Education</option>
					  <option value="Environment">Environment</option>
					  <option value="Food">Food</option>
					  <option value="Health">Health</option>
					  <option value="Household">Household</option>
					  <option value="Miscellaneous">Miscellaneous</option>
					  <option value="Sports">Sports</option>
					</select>
				</li>
				<li>
					<label name="donationReason" className="donationReason"></label>
					<input name="donationReason" type="text" placeholder="Enter Reason for Future Donation" value={this.state.donationReason} onchange={this.accountChangeHandler}/>
				</li>
				<li>
					<label name="description" className="description" >What else would you like to share?</label>
					<input name='description' type="text" placeholder="Type your story here." onChange={this.accountChangeHandler}/>
				</li>

				<li>
					<p>Make Private?</p>
						<ul class="flex-inner">
						<li>
						<label for="private" name="public_private" className="public_private">Private</label>
						<input type="checkbox" id="private"/>
						</li>
						</ul>
				</li>

				<li>
					<label name="pictures" className="pictures">Upload Pictures?</label>
					<input type='file' size="100"/>
				</li>

				<li>
					<button type="submit">Submit</button>
				</li>
			</ul>
		</form>
		);
	}
}



class PostContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = { 
			date: "",
			city: "",
			country: "",
			donationItem: "",
			rating: "",
			description: "",
		 }
	}
	render() {
		return <Post post={this.state} />
	}

	componentDidMount() {
		fetch("/api/user/trip/user-trips")
		  .then(res => res.json())
		  .then(
			(result) => {
			  this.setState({
				isLoaded: true,
				items: result.items
			  });
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
			  this.setState({
				isLoaded: true,
				error
			  });
			}
		  )
	  }

}


function Post(props) {
	return (
	<div className="Post">

		<div className="post-top-row">

			<div className="post-destination-column">
				<div className="Post-destination">Kenya {PostContainer.destination}</div>
			</div>

			<div className="post-date-column">
				<div className="Post-date"> 2/20/2020 {PostContainer.date}</div>
			</div>

		</div>
		<div className="post-middle-row">
			<div className="Post-image">
			<img src={ KenyaImage } alt="Kenya Savannah" height='175px'/>
			</div>
		</div>
		<br></br>
		<div className="post-description-row">
			Lorem ipsum dolor sit amet,
			consectetur adipiscing elit, sed do eiusmod tempor incididunt
			ut labore et dolore magna aliqua. Ut enim ad minim veniam,
			quis nostrud exercitation ullamco laboris nisi ut aliquip
		</div>
		<br></br>
			<div className="Post-donation-row"> Items Donated:  {PostContainer.donation}</div>
		<br></br>

			<div className="Post-stars"> Donation rating: {PostContainer.stars}
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
				<FontAwesomeIcon icon={faStar} />
			</div>
		<br></br>
		<div className="Post-donation-row"> Suggested Donations:  {PostContainer.donation}</div>
		<br></br>
	</div>
  );
}

function Account(props) {
  return (
	<div className="Account">
		<div className='main-top-row'>
			<div className='left-column'>
				<div className='user-info-container'>
					<UserInfo/>
				</div>
					<br></br>
					<div id="mapid">
					<h1>Your Travel Map</h1>
					<div className='map' >
						<TravelMap/>
					</div>
					<p style={{fontSize:12, lineHeight:2}}> Right click Your Travel Map at the location to drop a map pin there.</p>
				</div>

			</div>
			<div className='right-column'>
				  <div className='container'>
					<h3 style={{fontSize: 18, textAlign: "center", lineHeight: 5}}>
						Share your recent DoMAD travel story!
					</h3>
					<UserDonationStory />
				  </div>
			</div>
		</div>
		<h1> Your Trips </h1>
		<div className="main-bottom-row">

			<div className='post-container'>
				<Post/>
			</div>
			<div className='post-container'>
				<Post/>
			</div>
			<div className='post-container'>
				<Post/>
			</div>
			<div className='post-container'>
				<Post/>
			</div>
			<div className='post-container'>
				<Post/>
			</div>
			<div className='post-container'>
				<Post/>
			</div>


		</div>
	</div>
	);
}

ReactDOM.render(
  <Account  />,
  document.getElementById('root')
);

export default Account;