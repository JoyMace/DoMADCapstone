import React from 'react';
import './Account.css';
import WorldMapImage from '../../images/Map.png';
import avatar from '../../images/Avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import ComingSoonIcon from '../../images/png_icons/comingSoonIcon.svg';
/* NOTES: We want to export the main component of the page so that everything renders properly
This means that we will display other components within the main component. 
We will need to have a main class that is the default export. This should be the AccountPage class.
Every part that appears on the page will need to be a separate component.
For instance, the Account Page will contain a UserForm, a UserProfileData section, and Posts
that are generated when the Form is used to add Trip Data to DoMAD. */


/* class with API pull of user info Displays UserData in upper left corner of AccountPage */
class User extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		firstName: "",
		lastName: "", 
		signupDate: "",
		tripsCount: "",
		donationCount: "",	
		
	};
	}

	getUser = async () => {
		const response = await fetch('/api/user/profile/profile');
		const data = await response.json();
		if (response.status !== 200) {
			throw Error(response.message)
		}
		console.log(data);
		return data;
	};

	componentDidMount() {
		this.getUser(this)
			.then(res => {
				var signUpDate = new Date(res.userData.signupDate)
				this.setState({
					firstName: res.userData.firstName,
					lastName: res.userData.lastName,
					signupDate: (signUpDate.getMonth() + 1) + "/" + signUpDate.getDate() + "/" + signUpDate.getFullYear(),
					tripsCount: res.userData.tripsCount ? res.userData.tripsCount : "None",
					donationCount: res.userData.donationCount ? res.userData.donationCount : "None",
										
				});
			})
			.catch(err => console.log(err));
	}

	render() {
		return(
		<div className="UserInfo">
				<div className="user-info-row">
					<div className="avatar-column">
							<div className='UserInfo-avatar'>
							<img src={ avatar } alt= "avatar" height='120px' />
							</div>
					</div>
					<div className="user-info-column">  
						<div className="UserInfo-name">{this.state.firstName + " " + this.state.lastName}</div>
						<div className='UserInfo-signupDate'>DoMAD Member Since: {this.state.signupDate}</div>
						<div className="UserInfo-tripsCount">Number of trips: {this.state.tripsCount}</div>
						<div className="UserInfo-donationsCount">Number of Donations: {this.state.donationCount}</div>
					</div>
				</div>
			</div>
		)}
}

/* The Form a User fills out when they want to report a trip and donation */
class UserTripForm extends React.Component {
	constructor(props) {
		super(props);	
		this.userID = this.props.userID;
		this.reloadAccount = this.props.reloadAccount;
		this.state = {
			date: "",
			country: "Select from List",
			city: "",
			donationItem: "",
			donationCategory: "",
			donationRecipient: "",
			rating: "",
			suggestedDonationItem: "",
			donationCategorySuggested: "",
			suggestedDonationReason: "",
			description: "",
			isPrivate: false,
		};
		this.accountChangeHandler = this.accountChangeHandler.bind(this);		
	}
	
	accountChangeHandler(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		console.log(name, value);
		this.setState({
		  [name]: value
		});
	  }
	

	reportTrip = async () => {
		// TODO: Create support for adding multiple items at a time
		var donations = []
		// Each donation will be added to the list of donations above in the following format.
		var newDonation = {
		  "itemName": this.state.donationItem,
		  "category": this.state.donationCategory,
		  "rating": this.state.rating, 
		  "suggestion": false,
		  "organization": false // Check in to too if we are only doing this and no organization information
		}
		/* var newSuggestedDonation = {
		  "itemName": this.state.suggestedDonationItem,
		  "category": this.state.donationCategorySuggested,
		  "suggestion": true,
		  "reason": this.state.suggestedDonationReason
		} */
		donations.push(newDonation);
		//donations.push(newSuggestedDonation);
		const reqBody = {
		  
		  "tripDate": this.state.tripDate,
		  "donations": donations,
		  "notes": this.state.description,
		  "isPrivate": this.state.isPrivate,
		  "country": this.state.country,
		  "city": this.state.city 
		}
		console.log(reqBody);
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(reqBody)
		  };
		  const response = await fetch('/api/user/trip/report', requestOptions);
		  const data = await response.json();
		  if (response.status !== 201) {
			throw Error(data.message)
		  }

		  return data;
		};

		onSubmit = (e) => {
		  e.preventDefault()
		  console.log(this.state);
		  console.log('SUBMIT');

		  this.reportTrip()
			.then(res => {
			  console.log(res)
			  this.reloadAccount();
			})
			.catch(err => console.log(err)); // TODO: Handle all errors and relay to user
		}

	render() {
		return (

		<form onSubmit={this.onSubmit}>
			<ul className="flex-outer">
				{/*<input name="userID" value={this.userID} type="hidden"/>*/}
				<li>{/* Trip Date Entry */}
					<label name="date">When did this trip occur?</label>
					<input id="tripDate" name='tripDate' type="date" onChange={this.accountChangeHandler } />
				</li>
				
				<li>{/* Country Selection List */}
					<label> Where did you go?</label>
					<select name="country" value={this.state.value} onChange={this.accountChangeHandler}>
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
					</select>
				
				</li>

				<li>{/* City Text Entry*/}
					<label name="city" className="city">What city?</label>
					<input name="city" type="text" placeholder="Enter city name" value={this.state.city} onChange={this.accountChangeHandler}/>
				</li>

				<li>{/* Donation Item Text Entry */}
					<label name="donationItem" className="donationItem">What did you donate?</label>
					<input name="donationItem" className="donationItem" type="text" placeholder="Enter Donation Item" value={this.state.donationItem} onChange={this.accountChangeHandler}/>
				</li>
				
				<li>{/* Donation Item Category Selection List */}
					<label name="donationCategory" className="donationCategory"></label>
					<select name='donationCategory' value={this.state.donationCategory} onChange={this.accountChangeHandler}>
					  <option value="selected">Select the Donation Category</option>
					  <option value="Animal Welfare">Animal Welfare</option>
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
				
				<li>{/* Individual or Organization Drop Down */}	
					<label name="donationRecipient" className="donationRecipient"></label>				
					<select name="donationRecipient" value={this.state.donationRecipient} onChange={this.accountChangeHandler}>
						<option value="selected">Individual or Organization?</option>
						<option value="individual">Donation to an Individual</option>
						<option value="organization">Donation to an Organization</option>
					</select>
						
				</li>

				<li>{/* Donation Usefulness Rating DropDown */}
					<label name="rating" className="rating">How useful was this donation? 5 = Very Useful</label>
					<select name='rating' value={this.state.rating} onChange={this.accountChangeHandler}>
					  <option value="selected">Score out of 5</option>
					  <option value="1">1</option>
					  <option value="2">2</option>
					  <option value="3">3</option>
					  <option value="4">4</option>
					  <option value="5">5</option>					  
					</select>

				</li>
				{/* To-Do: Add Another Item functionality*/}
				{/* <li>
					<button>Add Item</button>

				</li> */}

				<li>{/* Suggested Future Donation Item Name Text Entry */}
					<label name="suggestedDonationItem" className="suggestedDonationItem">Suggest Future Donation Item?</label>
					<input name="suggestedDonationItem" className="suggestedDonationItem" type="text" placeholder="Enter Donation Item"value={this.state.suggestedDonationItem} onChange={this.accountChangeHandler} />
				</li>
				
				<li>{/* Suggested Future Donation Item Category Selection List */}
					<label name="donationCategorySuggested" className="donationCategorySuggested"></label>
					<select name='donationCategorySuggested' value={this.state.donationCategorySuggested} onChange={this.accountChangeHandler}>
					  <option value="selected">Select the Donation Category</option>
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
				
				<li>{/* Suggested Future Donation Item Readon Text Entry */}
				<label name="suggestedDonationReason" className="suggestedDonationReason"></label>
				<input name="suggestedDonationReason" className="suggestedDonationReason" type="text" placeholder="Enter Reason for Future Donation" value={this.state.donationReason} onChange={this.accountChangeHandler}/>
				</li>
				
				<li>{/* Trip Descritption Text Entry */}
					<label name="description" className="description" >What else would you like to share?</label>
					<input name='description' type="text" placeholder="Type your story here." onChange={this.accountChangeHandler}/>
				</li>

				{/* <li> Make Private  Checkbox - feature currently not supported: checkbox not sending bool to console
					<label>Make Private?</label>
						<ul className="flex-inner">						
						<label>Private
						<input name="isPrivate" type="checkbox"  checked={this.state.isPrivate} onChange={this.accountChangeHandler} />
						</label>	
            </ul>
				<li>
				{/* Image Upload not currently supported. Uncomment this code to show button and add functionality
				<li>
					<label name="pictures" className="pictures">Upload Pictures?</label>
					<input type='file' size="100"/>
				</li>
				*/}
				<li> {/* Submit Button */}
					<button type="submit">Submit</button>
				</li>
			</ul>
		</form>
		);
	}
}


/* The card that displays a user's trip information by date in descending order */
class PostContainer extends React.Component {
	constructor(props) {
		super(props)
    var tripInfo = this.props.tripInfo;
    var tripDate = new Date(tripInfo.tripDate);
    this.state = {
      city: tripInfo.locationID.city,
      country: tripInfo.locationID.country,
      tripDate: (tripDate.getMonth() + 1) + "/" +  tripDate.getDate() + "/" +  tripDate.getFullYear(),
	  notes: tripInfo.notes, 
	  donationItem: tripInfo.donations ? tripInfo.donations[0].itemName : "None",
	  donationRating: tripInfo.donations ? tripInfo.donations[0].rating : "None",
	  userID: tripInfo.userID  
	 
    }
	}
	render() {
		return <Post post={this.state} />
	}
}

/* This function handles the formatting of the Trip Cards on an Account Page */
function Post(props) {
	var star_number;
	var rating_number = props.post.donationRating;
	if (rating_number === 1) 
	{
		star_number = <div><FontAwesomeIcon icon={faStar} color='yellow' /></div>
	}
	else if (rating_number === 2)
	{
		star_number = <div><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /></div>
	}
	else if (rating_number === 3)
	{
		star_number = <div><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /></div>
	}
	else if (rating_number === 4)
	{
		star_number = <div><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /></div>
	}
	else if (rating_number === 5)
	{
		star_number = <div><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /></div>
	}
	return (
	<div className="Post">
		<div className="post-top-row">
			<div className="post-destination-column">
				<div className="Post-destination">{props.post.city}, {props.post.country}</div>
			</div>
			<div className="post-date-column">
				<div className="Post-date"> {props.post.tripDate}</div>
			</div>
		</div>
		<div className="post-middle-row">
			<div className="Post-image">
			<img src={ ComingSoonIcon } alt="One person helping another" height='175px'/>
			</div>
		</div>
		<br></br>
		<div className="post-description-row"> {props.post.notes} </div>
		<br></br>
		<div className="Post-donation-row"> Items Donated:  {props.post.donationItem}</div>
		<br></br>
			<div className="Post-stars"> Donation rating: {star_number}	</div>
		<br></br>
		<div className="Post-donation-row"> Suggested Donations:  {props.post.donationItem}</div>
		<br></br>
	</div>
  );
}
/* This component loads Trip Info from the database for Trip Cards on an Account Page */
class AccountContainer extends React.Component {
	constructor(props) {
		super(props)
    this.state = { loading: 'true', reloadAccount: this.reload };
	}
  reload = () => {
    console.log('READLOAD');
    this.setState({ loading: 'true', reloadAccount: this.reload });
    this.getTrips(this)
      .then(res => {
        this.setState({
          trips: res,
          loading: 'false',
          reloadAccount: this.reload
        });
      });
  }
  getTrips = async () => {
    const response = await fetch('/api/user/trip/user-trips');
    const data = await response.json();
    if (response.status !== 200) {
      throw Error(response.message)
	}
	console.log(data);
    return data;
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
	render() {
    if(this.state.loading === 'false'){
		  return <Account post={this.state} />
    }
		return <Account post={this.state} />
	}
}

/* This function handles the formatting and rendering of the entire Account Page */
function Account(props) {
	var trips = <div></div>
	if(props.post.loading === "false"){
	  var tripData = props.post.trips.trips;
	  trips = tripData.map(trip => {
		return <div className='post-container'>
		  <PostContainer tripInfo={trip} />
		</div>
	  });
	  trips = <div>{trips.reverse()} </div>
	}
	
	return (
	  <div className="Account">
		  <div className='account-row'>
			  <div className='account-column'>
				  <div className='user-info-container'>
					  <User /> 
				  </div>
					  <br></br>
					  <div id="mapid">
					  <h1>Your Travel Map</h1>
					  <div className='map' >
						  <img src={ WorldMapImage } alt="map of the world" width='600px'/>
					  </div>
					  <p style={{textAlign: "center", fontSize:20, lineHeight:2}}> Interactive Map Feature Coming Soon.</p>
				  </div>
			  </div>
			  <div className='account-column'>
					<div className='container'>
					  <h3 style={{fontSize: 18, textAlign: "center", lineHeight: 5}}>
						  Share your recent DoMAD travel story!
					  </h3>
					  <UserTripForm reloadAccount={props.post.reloadAccount} />
					</div>
			  </div>
		  </div>
		  <h1 style={{lineHeight:2}}> Your Trips </h1>
		  <div className='account-row'>
		  	
	  		{trips}
		  	</div>
	  </div>
	  );
  }

export default AccountContainer;