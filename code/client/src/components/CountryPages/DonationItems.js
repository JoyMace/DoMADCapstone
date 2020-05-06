import React from 'react';
import './DonationItems.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

/* Given a specific set of categorical donations, render the 
list tab displaying their donations and suggested donations */
class DonationCategory extends React.Component {
    constructor(props) {
        super(props);        
        console.log("GETTING ANYTHING?", this.props.data);
        this.state = {
            donatedItemName: (this.props.data && this.props.data[0]) ? this.props.data[0].itemName : "None",
            donatedItemRating: (this.props.data && this.props.data[0]) ? this.props.data[0].rating : "None",
            suggestedItemName: (this.props.data && this.props.data[1]) ? this.props.data[1].itemName : "None",
        };
    }  

    render () {
        var star_number;
		var rating_number = this.state.donatedItemRating;
		if (rating_number === 1) 
		{
			star_number = <div><FontAwesomeIcon icon={faStar} color='yellow' /></div>
		}
		else if (rating_number === 2)
		{
			star_number = <div><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /></div>
		}
		else if (rating_number === 3)
		{
			star_number = <div><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /></div>
		}
		else if (rating_number === 4)
		{
			star_number = <div><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /></div>
		}
		else if (rating_number === 5)
		{
			star_number = <div><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /></div>
		}
        var donationsHTML = null;
        /*if (this.state.donations !== null) {
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
        }*/

        var suggestionsHTML = null;
        /*if (this.state.suggested !== null) {
            suggestionsHTML = this.state.suggested.map(item => {
                return (
                    <div className="single-suggested-item">
                    <p className="suggestion-date">{item.date}</p>
                <p className="suggested-item">{item.name}s</p>
                    <p className="suggested-item-reason">I was told by the people that live here that they need work gloves.</p>
                </div>
                )
            });
        }*/
       
        return (
            <div className="donations-tab-wrapper">
                <div className="column-donations">
                    <div className="donations-header">
                        <h4>Items Donated by Users</h4>
                    </div>
                    <div className="item-list">
                        {this.state.donatedItemName } {star_number}
                    </div>
                </div>
                <div className="column-suggested-donations">
                    <div className="suggestions-header">
                        <h4>Items Suggested as Future Donations</h4>
                        {/*<p>These items are user submitted suggestions based on experiences while traveling; these include the date of submission, suggested item, and reason the item may be needed. </p>*/}
                    </div>
                    <div className="suggested-items-list">
                        {this.state.suggestedItemName}
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
            donatedItemsDict: {},
            suggestedItemsDict: {}
        }        
    }

    componentDidUpdate(prevProps, prevState) {
            if (prevProps.data !== this.props.data /*&& this.props.data !== null*/) {
                var dicts;
                dicts = this.populateDonations(this.props.data); //this is working
                this.setState({
                    donatedItemsDict: dicts[0],
                    suggestedItemsDict: dicts[1]
                })
                console.log(dicts);
        }
    }
    /* This function currently only works when you can only report a single donated item and a single suggested item per trip.
    It will need to be altered to allow for multiple donations per trip parsing */
    populateDonations(tripData) {
        //console.log("TripData", tripData);
        var donationCategory;
        var suggestedItemCategory;
        var donatedItems = {};
        var suggestedItems = {};
        var trips = tripData.trips;
        for (var i = 0; i < trips.length; i++) 
        {
            //console.log("TRIP: ", trips[i].donations); //TO DO You got it to print out each individual trip

            var suggestedItem = {};
            var donatedItem = {};
            if (trips[i].donations)
            {
                if (trips[i].donations[0].suggestion)
                {
                    suggestedItem["itemName"] =  trips[i].donations[0].itemName;
                    suggestedItem["date"] = trips[i].reportingDate;
                    suggestedItem["category"] =  trips[i].donations[0].category;
                    suggestedItem["city"] = trips[i].locationID.city;
                    suggestedItem["with_org"] = trips[i].organization;
                    suggestedItem["rating"] = trips[i].donations[0].rating;
                }
                if(!trips[i].donations[0].suggestion)
                {
                    donatedItem["itemName"] =  trips[i].donations[0].itemName;
                    donatedItem["date"] = trips[i].reportingDate;
                    donatedItem["category"] =  trips[i].donations[0].category;
                    donatedItem["city"] = trips[i].locationID.city;
                    donatedItem["with_org"] = trips[i].organization;
                    donatedItem["rating"] = trips[i].donations[0].rating;
                }
                if (trips[i].donations.length > 1)
                {
                    donatedItem["itemName"] =  trips[i].donations[1].itemName;
                    donatedItem["date"] = trips[i].reportingDate;
                    donatedItem["category"] =  trips[i].donations[1].category;
                    donatedItem["city"] = trips[i].locationID.city;
                    donatedItem["with_org"] = trips[i].organization;
                    donatedItem["rating"] = trips[i].donations[1].rating;
                }
                
            } 
            donationCategory = donatedItem.category;
            //console.log("Donated Item Category: ",donationCategory);
            suggestedItemCategory = suggestedItem.category;
            //console.log("Suggested Item Category: ", suggestedItemCategory);  
            donatedItems[donationCategory] = donatedItem;
            suggestedItems[suggestedItemCategory] = suggestedItem;      
        }       
        
        
        console.log("Results of Populate function: ", donatedItems, suggestedItems);
        return [donatedItems, suggestedItems];
    }
    

    render() {
        console.log("render: ", this.state.donatedItemsDict);
        return (
        <Tabs defaultIndex={0}>
            <div id="donation-tabs-component">
                <TabList>
                    <div className="column-categories">
                    <div className="categories-style">
                        <h4 className="category-header">Categories</h4>
                        <Tab className="category-tab">Art</Tab>
                        <Tab className="category-tab">Clothing</Tab>
                        <Tab className="category-tab">Education</Tab>
                        <Tab className="category-tab">Animal Welfare</Tab>
                        <Tab className="category-tab">Food</Tab>
                        <Tab className="category-tab">Health</Tab>
                        <Tab className="category-tab">Household</Tab>
                        <Tab className="category-tab">Sports</Tab>
                        <Tab className="category-tab">Miscellaneous</Tab>
                        
                    </div>
                    </div>
                </TabList>

                <TabPanel>
                    <DonationCategory data={[this.state.donatedItemsDict["Art"], this.state.suggestedItemsDict["Art"]]}/>
                </TabPanel>
                <TabPanel>
                    <DonationCategory data={[this.state.donatedItemsDict["Clothing"], this.state.suggestedItemsDict["Clothing"]]}/>
                </TabPanel>
                <TabPanel>
                    <DonationCategory data={[this.state.donatedItemsDict["Education"], this.state.suggestedItemsDict["Education"]]}/>
                </TabPanel>
                <TabPanel>
                    <DonationCategory data={[this.state.donatedItemsDict["Animal Welfare"], this.state.suggestedItemsDict["Animal Welfare"]]}/>
                </TabPanel>
                <TabPanel>
                    <DonationCategory data={[this.state.donatedItemsDict["Food"], this.state.suggestedItemsDict["Food"]]}/>
                </TabPanel>
                <TabPanel>
                    <DonationCategory data={[this.state.donatedItemsDict["Health"], this.state.suggestedItemsDict["Health"]]}/>
                </TabPanel>
                <TabPanel>
                    <DonationCategory data={[this.state.donatedItemsDict["Household"], this.state.suggestedItemsDict["Houselhold"]]}/>
                </TabPanel>
                <TabPanel>
                    <DonationCategory data={[this.state.donatedItemsDict["Sports"], this.state.suggestedItemsDict["Sports"]]}/>
                </TabPanel>
                <TabPanel>
                    <DonationCategory data={[this.state.donatedItemsDict["Miscellaneous"], this.state.suggestedItemsDict["Miscellaneous"]]}/>
                </TabPanel>
            </div>
        </Tabs>
        )
    }
}


export default DonationItems;