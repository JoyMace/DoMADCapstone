import React from 'react';
import './DonationItems.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { FaStar } from 'react-icons/fa';
//import { FaStarHalf } from 'react-icons/fa';
import { IconContext } from "react-icons";



/* Given a specific set of categorical donations, render the 
list tab displaying their donations and suggested donations */
class DonationCategory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: props.category,
            donations: null,
            suggested: null
        };
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.data);
        if (prevProps.data !== this.props.data && this.props.data !== null) {
            this.setState({
                category: this.props.category,
                donations: this.props.data.filter((donation) => {
                    return (donation.suggested === false)
                }), 
                suggested: this.props.data.filter((donation) => {
                    return (donation.suggested === true)
                })
            });
        }
    }

    render () {
        var donationsHTML = null;
        if (this.state.donations !== null) {
            donationsHTML = this.state.donations.map(item => {
                return (<div className="donation-item">
                    <p>{item.name}</p>
                    <div className="item-rating">
                        <IconContext.Provider value={{ color: "yellow", className: "global-class-name", style: { verticalAlign: "middle" } }}>
                            <FaStar />  <FaStar />  <FaStar />  <FaStar />
                        </IconContext.Provider>
                    </div>
                </div>)
            });
        }

        var suggestionsHTML = null;
        if (this.state.suggested !== null) {
            suggestionsHTML = this.state.suggested.map(item => {
                return (
                    <div className="single-suggested-item">
                    <p className="suggestion-date">{item.date}</p>
                <p className="suggested-item">{item.name}s</p>
                    <p className="suggested-item-reason">I was told by the people that live here that they need work gloves.</p>
                </div>
                )
            });
        }
       
        return (
            <div className="donations-tab-wrapper">
                <div className="column-donations">
                    <div className="donations-header">
                        <h4>Donated</h4>
                    </div>
                    <div className="item-list">
                        {donationsHTML}
                    </div>
                </div>
                <div className="column-suggested-donations">
                    <div className="suggestions-header">
                        <h4>User Suggested</h4>
                        {/*<p>These items are user submitted suggestions based on experiences while traveling; these include the date of submission, suggested item, and reason the item may be needed. </p>*/}
                    </div>
                    <div className="suggested-items-list">
                        {suggestionsHTML}
                    </div>
                </div>
            </div>
        )
    }
}



class DonationItems extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            welfareDonations: null,
            artDonations: null,
            clothingDonations: null,
            educationDonations: null,
            foodDonations: null,
            healthDonations: null,
            householdDonations: null,
            sportsDonations: null,
            miscellaneousDonations: null
        };
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("did update prevProps", prevProps.data);
        console.log("did update prevState", prevState.healthDonations);
        console.log("did update props", this.props.data);
        if (prevProps.data !== this.props.data && this.props.data !== null) {
            this.populateDonations(this.props.data);
        }
    }

    populateDonations(tripData) {
        var donations = [];
        for (var id in tripData) {
            let trip = tripData[id].donations;
            for (var item in trip) {
                var don = [
                    {'name': trip[item].itemName},
                    {'category': trip[item].category},
                    {'city': trip[item].locationID.city},
                    {'with_org': trip[item].organization},
                    {'rating': trip[item].rating},
                    {'date': trip[item].reportingDataTime},
                    {'suggestion': trip[item].suggestion}
                ];
                donations.push(don);
            }
        } 
        this.setState({ 
            welfareDonations: donations.filter((donation) => {
                return (donation.category === 'Welfare')
            }),
            artDonations: donations.filter((donation) => {
                return (donation.category === 'Art')
            }),
            clothingDonations: donations.filter((donation) => {
                return (donation.category === 'Clothing')
            }),
            educationDonations: donations.filter((donation) => {
                return (donation.category === 'Education')
            }),
            foodDonations: donations.filter((donation) => {
                return (donation.category === 'Food')
            }),
            healthDonations: donations.filter((donation) => {
                console.log(donation);
                return (donation.category === 'Health');
            }),
            householdDonations: donations.filter((donation) => {
                return (donation.category === 'Household')
            }),
            sportsDonations: donations.filter((donation) => {
                return (donation.category === 'Sports')
            }),
            miscellaneousDonations: donations.filter((donation) => {
                return (donation.category === 'Miscellaneous')
            })
        });
    }

    render() {
        console.log("render: ", this.state.healthDonations);
        return (
        <Tabs defaultIndex={0}>
            <div id="donation-tabs-component">
                <TabList>
                    <div className="column-categories">
                    <div className="categories-style">
                        <h4 className="category-header">Categories</h4>
                        <Tab default className="category-tab">Animal Welfare</Tab>
                        <Tab className="category-tab">Art</Tab>
                        <Tab className="category-tab">Clothing</Tab>
                        <Tab className="category-tab">Education</Tab>
                        <Tab className="category-tab">Food</Tab>
                        <Tab className="category-tab">Health</Tab>
                        <Tab className="category-tab">Household</Tab>
                        <Tab className="category-tab">Miscellaneous</Tab>
                        <Tab className="category-tab">Sports</Tab>
                    </div>
                    </div>
                </TabList>

                <TabPanel>
                    <DonationCategory data={this.state.artDonations}/>
                </TabPanel>
                <TabPanel>
                    <DonationCategory data={this.state.clothingDonations}/>
                </TabPanel>
                <TabPanel>
                    <DonationCategory data={this.state.educationDonations}/>
                </TabPanel>
                <TabPanel>
                    <DonationCategory data={this.state.foodDonations}/>
                </TabPanel>
                <TabPanel>
                    <DonationCategory data={this.state.healthDonations}/>
                </TabPanel>
                <TabPanel>
                    <DonationCategory data={this.state.householdDonations}/>
                </TabPanel>
                <TabPanel>
                    <DonationCategory data={this.state.sportsDonations}/>
                </TabPanel>
                <TabPanel>
                    <DonationCategory data={this.state.miscellaneousDonations}/>
                </TabPanel>
            </div>
        </Tabs>
        )
    }
}


export default DonationItems;