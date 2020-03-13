import React from 'react';
import './IndividualBlogs.css';

function IndividualBlogs() {
    return (
        <div className="individual-blogs">
            <div className="blog-country-name">
                <h1>Country Name</h1>
            </div>
            <div className="blog-info-container">
                <h3>Date of travel: 01/20/2020</h3>
                <div className="travel-story">
                    <h2>Travel Story</h2>
                    <div className="travel-story-information">
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                    </div>
                </div>
                <div className="blog-donations">
                    <h2>Donations</h2>
                    <div className="blog-donation-items">
                        <div className="blog-donation-column">
                            <h5 className="donated-item-label">Donation Item</h5>
                            <p>Tarp</p>
                        </div>
                        <div className="blog-donation-column">
                            <h5 className="donated-item-label">Individual or Organization?</h5>
                            <p>Individual</p>
                        </div>
                        <div className="blog-donation-column">
                            <h5 className="donated-item-label">Item Rating</h5>
                            <p>4/5</p>
                        </div>
                    </div>
                </div>
                <div className="blog-suggested-donations">
                    <h2>Suggested Donations</h2>
                    <div className="blog-suggested-donation-items">
                        <p>Item: Tarp</p>
                        <p>Reason for suggestion: They need it.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndividualBlogs;