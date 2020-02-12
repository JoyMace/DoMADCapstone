import React from 'react';
import './Account.css';

function Account() {
    return (
        <div className="account">
            <h1>Account</h1>
            <p>This is the account page.</p>
			<div class='row'>
				<div class='column'>
					<div class='blue-column'>
					This is where you add your trip
				    </div>
			    </div>
            <div class='column'>
                <div class='green-column'>
                    This side will have the posts, newest first
                </div>
            </div>
            </div>
        </div>
    )
}

export default Account;