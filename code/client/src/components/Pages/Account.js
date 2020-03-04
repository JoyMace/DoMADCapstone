import React from 'react';
import ReactDOM from 'react-dom';
import './Account.css';
import WorldMapImage from '../../images/WorldMap.png';
import avatar from '../../images/Avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

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
	<div className="row">
		<div className="column">
			<div className="avatar-column">				
				<div className='UserInfo-avatar'>{userInfo.avatar}</div>
			</div>
		</div>
		<div className="column">
			<div className="user-info-column">
				<div className="UserInfo-name">{userInfo.name}</div>
				<div className='UserInfo-memberSince'>Member Since: {userInfo.memberSince}</div>
				<div className='UserInfo-hometown'>Hometown: {userInfo.hometown}</div>
				<div className='UserInfo-totalDonations'>Total Donations Made: {userInfo.totalDonations}</div>
				<div className='UserInfo-totalContributions'>Total Contributions to DoMAD: {userInfo.totalContributions}</div>
			</div>
		</div>
	</div>
    </div>
  );
}

class UserDonationStory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: '',
			destination: '',			
			donationRecipient: 'Individual',
			donationItem: 'None',
			donationCategory: 'None',
			rating: '',
			description: '',
			public_private: 'Public',			
			
		};
	}
	accountChangeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		this.setState({[nam]: val});
	}
	render() {
		const { post } = this.props
		return (
		
		<form action="/api/user/trip/report" method="POST">
			<ul class="flex-outer">
				<li>
					<label for="date">When did this trip occur?</label>
					<input id="date" name='date' type="date" onChange={this.accountChangeHandler } />	
				</li>
				
				<li>
					<label name="destination" className="destination">Where did you go?</label>
					<input name="destination" type="text" placeholder="Enter city, country" value={this.state.destination} onchange={this.accountChangeHandler}/>
				</li>
				
				<li>
					<label name="donationItem" className="donationItem">What did you donate?</label>
					<input name="donationItem" className="donationItem" type="text" placeholder="Enter Donation Item"/>
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
					<label name="donationItem" className="donationItem">Suggest Future Donation Item?</label>
					<input name="donationItem" className="donationItem" type="text" placeholder="Enter Donation Item"/>
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

const post = {
	date: UserDonationStory.date, 
	destination: UserDonationStory.destination,
	donation: UserDonationStory.donationItem,
	stars: UserDonationStory.rating,
	description: UserDonationStory.description,
};

class PostContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = { post }
	}
	render() {
		return <Post post={this.state.post} />
	}
	/* componentDidMount() {
		.ajax({
			url: "/",
			dataType: "json",
			success: post =>
				this.setState({post: post}),
		})
	} */
	
}

function Post(props) {
	return (
	<div className="Post"> 
	  <div className="Post-date"> Date: {post.date}</div>
	  <div className="Post-destination"> Destination: {post.destination}</div>
	  <div className="Post-donation"> Items Donated:  {post.donation}</div>
	  <div className="Post-stars"> Donation rating: {post.stars}</div>
	  <div className="Post-description">Travel Story: {post.description}</div>
	  
	</div>
  );
}

function Account(props) {
  return (
  
	<div className='row'>
		<div className='column'>
		<div className='left-column'>
		  <div className="Account">
		  <div className='user-info-container'>
			<UserInfo/>
		  </div>
		  <br></br>
		  <div className="map-image">
			<h1>Your Travel Map</h1>
			<img src={ WorldMapImage } alt="World Map" />
				<p style={{fontSize:12, lineHeight:2}}> Right click Your Travel Map at the location to drop a map pin there.</p>

		  </div>
			  <h1> Your Trips </h1>
			  <div className='post-container'>
				<Post/>
			  </div>
			  
		  </div>
		</div>
	  </div>
	<div className='column'>
      <div className='right-column'>	  
			  <div className='container'>
			  <h3 style={{fontSize: 18, textAlign: "center", lineHeight: 5}}>Share your recent DoMAD travel story!</h3>
			  <UserDonationStory />
			  </div>

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