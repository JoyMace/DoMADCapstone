import React from 'react';
import ReactDOM from 'react-dom';
import './Account.css';
import WorldMapImage from '../../images/WorldMap.png';
import avatar from '../../images/Avatar.png';
import { FaStar } from 'react-icons/fa';
import { FaStarHalf } from 'react-icons/fa';
import { IconContext } from "react-icons";
 


function UserInfo(props) {
  return (
    <div className="UserInfo">
	  <div className='UserInfo-avatar'>{userInfo.avatar}</div>	 
      <div className="UserInfo-name">{userInfo.name}</div>
	  <div className='UserInfo-memberSince'>Member Since: {userInfo.memberSince}</div>
  	  <div className='UserInfo-hometown'>Hometown: {userInfo.hometown}</div>
	  <div className='UserInfo-totalDonations'>Total Donations Made: {userInfo.totalDonations}</div>
  	  <div className='UserInfo-totalContributions'>Total Contributions to DoMAD: {userInfo.totalContributions}</div>  	   
    </div>
  );
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
			  <UserInfo/>
			  <div className="map-image">
				<h1>Your Travel Map</h1>
				<img src={ WorldMapImage } alt="World Map" />
					<p style={{fontSize:12, lineHeight:2}}> Right click Your Travel Map at the location to drop a map pin there.</p>

			  </div>
			  <h1> Your Trips </h1>
		  <Post/>
			  
		  </div>
		</div>
	  </div>
	<div className='column'>
      <div className='right-column'>	  
        <h3>Share your recent DoMAD travel story!</h3>
			  
			  <UserDonationStory 
				style={{
				backgroundColor: 'blue',
				width: '100px',
				height: '100px'
				}}
				/>
  		  

      </div>
    </div>
	</div>

    
  );
}
const userInfo = {
	avatar: <img src={ avatar } alt="avatar" height='64px'/>,
	name: 'Joy Mace',
	memberSince: '1999',
	hometown: 'Denver, CO',
	totalDonations: '105',
	totalContributions: '99',	
};

class UserDonationStory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: '',
			destination: '',			
			donationRecipient: 'Individual',
			donationItem: 'None',
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
		
		<form>
		<div className='sub-entry'>
			<p style={{lineHeight:2}}>When did this trip occur?</p>
			<p style={{lineHeight:2}}>Where did you go?</p>
			<p style={{lineHeight:2}}>What did you donate?</p>
			<p style={{lineHeight:2}}>How was the donation received?</p>
			<p style={{lineHeight:2}}>What else would you like to share?</p>
			<p style={{lineHeight:2}}>Make private?</p>
			<select name='public_private' value={this.state.public_private} onChange={this.accountChangeHandler}>
			  <option value="Private">Private</option>
			  <option value="Public">Public</option>
			</select>	
			<p style={{lineHeight:2}}>Upload Pictures?</p>
			<input type='file' />
		</div>
		
		<div className='sub-entry'>
			<input name='date' type="date" onChange={this.accountChangeHandler } />
				
			<input type="text" />
			
			
			<select name= 'donationRecipient' value={this.state.donationRecipient} onChange={this.accountChangeHandler}>
			  <option value="Individual">Individual</option>
			  <option value="Organization">Organization</option>
			  <option value="Both">Both</option>
			</select>	
			
			<select name='donationItem' value={this.state.donationItem} onChange={this.accountChangeHandler}>
			  <option value="Tarp">Tarp</option>
			  <option value="Medical Supplies">Medical Supplies</option>
			  <option value="Toothbrush">Toothbrush</option>
			  <option value="Solar Light">Solar Light</option>
			  <option value="Supplements">Supplements</option>
			  <option value="Books">Books</option>
			  <option value="Toiletries">Toiletries</option>
			  <option value="Water Purification">Water Purification</option>
			</select>
			
			<select name= 'donationRecipient' value={this.state.donationRecipient} onChange={this.accountChangeHandler}>
			  <option value="Individual">Individual</option>
			  <option value="Organization">Organization</option>
			  <option value="Both">Both</option>
			</select>
			
			<IconContext.Provider name='rating' value={{ color: "yellow", className: "global-class-name", style: { verticalAlign: "middle" } }} onChange={this.accountChangeHandler}>
							
			 <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalf />
							
			</IconContext.Provider>
			
			<input name='description' type="text" onChange={this.accountChangeHandler}/>
		</div>	
			<p><button className="SubmitButton">Submit</button></p>
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
ReactDOM.render(
  <Account  />,
  document.getElementById('root')
);
export default Account;