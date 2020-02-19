import React from 'react';
import ReactDOM from 'react-dom';
import './Account.css';
import WorldMapImage from '../../images/WorldMap.png';
//import Avatar from '../../images/Avatar.png';
//import DatePicker from "react-datepicker.css";

function Avatar(props) {
  return (
    <img
      className="Avatar"
      src={userInfo.avatarUrl}
      alt={userInfo.name}
    />
  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.userInfo} />
      <div className="UserInfo-name">{userInfo.name}</div>
	  <div className='UserInfo-memberSince'>{userInfo.memberSince}</div>
  	  <div className='UserInfo-hometown'>{userInfo.hometown}</div>
	  <div className='UserInfo-totalDonations'>{userInfo.totalDonations}</div>
  	  <div className='UserInfo-totalContributions'>{userInfo.totalContributions}</div>
  	  <div className='UserInfo-avatar'>{userInfo.avatar}</div>	  
    </div>
  );
}

function Post(props) {
	return (
	<div className="Post">
	  <div className="Post-date">{post.date}</div>
	  <div className="Post-destination">{post.destination}</div>
	  <div className="Post-donation">{post.donation}</div>
	  <div className="Post-stars">{post.stars}</div>
	  <div className="Post-description">{post.description}</div>
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
			  <Post/>
		  </div>
		</div>
	  </div>
	<div className='column'>
      <div className='right-column'>	  
          <div className="map-image">
              <p> Your Travel Map </p>
              <img src={ WorldMapImage } alt="World Map" />
          </div>
      </div>
    </div>
	</div>

    
  );
}
const userInfo = {
	name: 'name',
	memberSince: '1999',
	hometown: 'Denver',
	totalDonations: '99',
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