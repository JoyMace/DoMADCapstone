import React from 'react';
import './DonationItems.css';

function DonationItems() {
    return (
        <div className="donationitems">
            <div className="column1-donations">
                <h4 className="category-header">Select a category for more info</h4>
                <div className="donation-row">Animal Welfare</div>
                <div className="donation-row">Art</div>
                <div className="donation-row">Clothing</div>
                <div className="donation-row">Education</div>
                <div className="donation-row">Food</div>
                <div className="donation-row">Health</div>
                <div className="donation-row">Household</div>
                <div className="donation-row">Miscellaneous</div>
                <div className="donation-row">Sports</div>
            </div>
            <div className="column2-donations">

            </div>
            <div className="column3-donations">

            </div>
        </div>
    )
}

export default DonationItems;
