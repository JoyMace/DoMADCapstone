import React from 'react';
import './DonationItems.css';

import { FaStar } from 'react-icons/fa';
import { FaStarHalf } from 'react-icons/fa';
import { IconContext } from "react-icons";

const DonationItems = props => (
    <div className="donationitems">
        <div className="column1-donations">
            <h4 className="category-header">Select a category to view donation items</h4>
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
            <div className="donations-header">
                <h4>Donated</h4>
                {/*<p>These items have been donated by users, and the rating given reflects the average rating for each donated item based on all user donation ratings for that item.</p>*/}
            </div>
            <div className="donation-items-list">
                <div className="donation-item-line">
                    <p className="donation-item">Bandages</p>
                    <div className="donation-item-rating">
                        <IconContext.Provider value={{ color: "yellow", className: "global-class-name", style: { verticalAlign: "middle" } }}>
                            <div>
                                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalf />
                            </div>
                        </IconContext.Provider>
                    </div>
                </div>
                <div className="donation-item-line">
                    <p className="donation-item">Eyeglasses</p>
                    <div className="donation-item-rating">
                        <IconContext.Provider value={{ color: "yellow", className: "global-class-name", style: { verticalAlign: "middle" } }}>
                            <div>
                                <FaStar /> <FaStar /> <FaStar /> <FaStar />
                            </div>
                        </IconContext.Provider>
                    </div>
                </div>
                <div className="donation-item-line">
                    <p className="donation-item">Soap</p>
                    <div className="donation-item-rating">
                        <IconContext.Provider value={{ color: "yellow", className: "global-class-name", style: { verticalAlign: "middle" } }}>
                            <div>
                                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
                            </div>
                        </IconContext.Provider>
                    </div>
                </div>
            </div>
        </div>
        <div className="column3-donations">
            <div className="suggestions-header">
                <h4>User Suggested</h4>
                {/*<p>These items are user submitted suggestions based on experiences while traveling; these include the date of submission, suggested item, and reason the item may be needed. </p>*/}
            </div>
            <div className="suggested-items-list">
                <div className="single-suggested-item">
                    <p className="suggestion-date">01/24/2020</p>
                    <p className="suggested-item">Work Gloves</p>
                    <p className="suggested-item-reason">I was told by the people that live here that they need work gloves.</p>
                </div>
                <div className="single-suggested-item">
                    <p className="suggestion-date">01/24/2020</p>
                    <p className="suggested-item">Toothbrush</p>
                    <p className="suggested-item-reason">A lot of people don't have access to toothpaste.</p>
                </div>
                <div className="single-suggested-item">
                    <p className="suggestion-date">01/24/2020</p>
                    <p className="suggested-item">Safety Goggles</p>
                    <p className="suggested-item-reason">People said they need safety goggles.</p>
                </div>
            </div>
        </div>
    </div>
);

export default DonationItems;