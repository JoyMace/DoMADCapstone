import React from 'react';
import './Account.css';
import WorldMapImage from '../../images/WorldMap.png'
import Avatar from '../../images/Avatar.png'
function Account() {
    return (
        <div className="account">
                       
			<div className='row'>
            	<div className='column'>
					<div className='left-column'>
                        <div className='member-avatar'>
                            <img src={ Avatar } alt="Avatar" />
                        </div>
                            <div className='member-name'>                    
                                <p> First Last </p>
                            </div>
                            <div className='member-info'>
                                <p>  DoMAD Member since: 1999 </p>
                                <p>  Hometown: Denver </p>
                                <p>  Total Donations: 100</p>
                                <p>  Total Contributions: 100</p>
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
        </div>
    )
}

export default Account;