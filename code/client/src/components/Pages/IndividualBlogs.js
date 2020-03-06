import React from 'react';
import './IndividualBlogs.css';

function IndividualBlogs() {
    return (
        <div className="individual-blogs">
            <div className="blog-country-name">
                <h1>Country Name</h1>
            </div>
            <div className="blog-info-container">
                <p>Date of travel: 01/20/2020</p>
                <div className="blog-donations">
                    <h2>Donations</h2>
                    <div className="blog-donation-items">
                        <div className="blog-donation-column">
                            <h5 className="donated-item-label">Donation Item</h5>
                        </div>
                        <div className="blog-location-column">
                            <h5>Individual or Organization?</h5>
                        </div>
                        <div className="blog-rating-column">
                            <h5>Item Rating</h5>
                        </div>
                    </div>
                </div>
                <div className="blog-suggested-donations">
                    <h2>Suggested Donations</h2>
                    <div className="blog-suggested-donation-items">
                        Suggested Donatation Items
                    </div>
                </div>
                <div className="travel-story">
                    <h2>Travel Story</h2>
                    <div className="travel-story-information">
                        Travel Story
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndividualBlogs;