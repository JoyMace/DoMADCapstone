import React from 'react';
import ReactDOM from 'react-dom';
import './Account.css';
import WorldMapImage from '../../images/WorldMap.png';
//import avatar from '../../images/Avatar.png';
//import DatePicker from "react-datepicker.css";

function Avatar(props) {
  return (
    <img
      className="Avatar"
      src={userInfo.avatar}
      alt={'Picture of ', userInfo.name}
    />
  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar userInfo={props.userInfo} />
      <div className="UserInfo-name">{userInfo.name}</div>
	  <div className='UserInfo-memberSince'>Member Since: {userInfo.memberSince}</div>
  	  <div className='UserInfo-hometown'>Hometown: {userInfo.hometown}</div>
	  <div className='UserInfo-totalDonations'>Total Donations Made: {userInfo.totalDonations}</div>
  	  <div className='UserInfo-totalContributions'>Total Contributions to DoMAD: {userInfo.totalContributions}</div>
  	  <div className='UserInfo-avatar'>{userInfo.avatar}</div>	  
    </div>
  );
}

function Post(props) {
	return (
	<div className="Post"> Your Trips
	  <div className="Post-date"> Date: {post.date}</div>
	  <div className="Post-destination"> Destination: {post.destination}</div>
	  <div className="Post-donation"> Items Donated:  {post.donation}</div>
	  <div className="Post-stars"> How the items were received: {post.stars}</div>
	  <div className="Post-description">Travel Story: {post.description}</div>
	  <div className="UserDonationStory">{props.post}</div>
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
			  <UserDonationStory/>
		  </div>
		</div>
	  </div>
	<div className='column'>
      <div className='right-column'>	  
          <div className="map-image">
              Your Travel Map
              <img src={ WorldMapImage } alt="World Map" />
          </div>
		  <Post/>
      </div>
    </div>
	</div>

    
  );
}
const userInfo = {
	name: 'Joy Mace',
	memberSince: '1999',
	hometown: 'Denver, CO',
	totalDonations: '105',
	totalContributions: '99',
	avatar: null
};

const post = {
	date: '2/14/2020', 
	destination: 'Mexico',
	donation: 'Tarp',
	stars: '*****',
	description: 'blahblahblah',
};  
class UserDonationStory extends React.Component {
	render() {
		const { userInfo } = this.props
		return (
		<form>
			<h1>Share your recent DoMAD travel story! </h1>
			<p>Where did you go?</p>
			<input
				type="text"
				/>
		</form>
			);
	}
} 

ReactDOM.render(
  <Account  />,
  document.getElementById('root')
);
export default Account;