import React from 'react';
import './DonationItems.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { FaStar } from 'react-icons/fa';
import { FaStarHalf } from 'react-icons/fa';
import { IconContext } from "react-icons";

class DonationItems extends React.Component {
    constructor(props) {
        super(props);

        this.base_path = '/api/user/trip/all-trips?country='
        this.getDonations = this.getDonations.bind(this);
    }

    getDonations = async (country) => {
        let ping_DI = this.base_path + country;
        const response = await fetch(ping_DI);
        const data = await response.json();

        if (response.status !== 200) {
            throw Error(data.message);
        } 
        else {
            //this.callbackJSON = data.countryInfoData;
            console.log(data);
           
            // FILL DATA
            /*this.setState({ });*/
            return;
        }
    }

    render() {
        return (
        <Tabs defaultIndex={0}>
            <div className="donation-tabs-component">
                <TabList>
                    <div className="column1-donations">
                        <div className="donation-tab-style">
                            <h4 className="category-header">Select a category to view donation items</h4>
                            <Tab default className="donation-tabs">Animal Welfare</Tab>
                            <Tab className="donation-tabs">Art</Tab>
                            <Tab className="donation-tabs">Clothing</Tab>
                            <Tab className="donation-tabs">Education</Tab>
                            <Tab className="donation-tabs">Food</Tab>
                            <Tab className="donation-tabs">Health</Tab>
                            <Tab className="donation-tabs">Household</Tab>
                            <Tab className="donation-tabs">Miscellaneous</Tab>
                            <Tab className="donation-tabs">Sports</Tab>
                        </div>
                    </div>
                </TabList>
                    <TabPanel>
                        <div className="donationitems">
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
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                    <div className="donationitems">
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
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                    <div className="donationitems">
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
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                    <div className="donationitems">
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
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                    <div className="donationitems">
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
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                    <div className="donationitems">
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
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                    <div className="donationitems">
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
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                    <div className="donationitems">
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
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                    <div className="donationitems">
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
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </div>
        </Tabs>
        )
    }

}

export default DonationItems;