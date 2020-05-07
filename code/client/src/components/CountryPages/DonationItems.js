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
        //console.log("GETTING ANYTHING?", this.props.data);
        this.state = {
            donatedItems: (this.props.data && this.props.data[0]) ? this.props.data[0] : "None",
            suggestedItems: (this.props.data && this.props.data[1]) ? this.props.data[1] : "None",
        };
        /* console.log("In Class DonationCategory: donatedItems: ", this.state.donatedItems);
        console.log("In Class DonationCategory: suggestedDonationItems: ", this.state.suggestedItems); */
    }  

    starRating(rating_number) {
        if (rating_number === 1) 
		{
			return  <div><FontAwesomeIcon icon={faStar} color='yellow' /></div>
		}
		else if (rating_number === 2)
		{
			return  <div><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /></div>
		}
		else if (rating_number === 3)
		{
			return  <div><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /></div>
		}
		else if (rating_number === 4)
		{
			return  <div><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /></div>
		}
		else if (rating_number === 5)
		{
			return <div><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /><FontAwesomeIcon icon={faStar} color='yellow' /></div>
		}
    }

    dateChange(date) {
        if(date == undefined) {
            return null;
        }
        else {
            var tripDate = new Date(date);
            tripDate = (tripDate.getMonth() + 1) + "/" +  tripDate.getDate() + "/" +  tripDate.getFullYear();
            return tripDate;
        }
    }

    render () {       
        return (            
            <div className="donations-tab-wrapper">
                <div className="column-donations">
                    <div className="donations-header">
                        <h4>Items Donated by Users</h4>
                    </div>
                    <div className="item-list">
                       { 
                       Object.keys(this.state.donatedItems).map(item =>(
                        <div className="blog-same-line">{this.state.donatedItems[item].itemName}<div className="donation-spacer"></div>{this.starRating(this.state.donatedItems[item].rating)}
                        </div>
                       ))                     
                        
                    }
                         
                    </div>
                </div>
                <div className="column-suggested-donations">
                    <div className="suggestions-header">
                        <h4>Items Suggested as Future Donations</h4>
                        {/*<p>These items are user submitted suggestions based on experiences while traveling; these include the date of submission, suggested item, and reason the item may be needed. </p>*/}
                    </div>
                    <div className="suggested-items-list">
                    { 
                       Object.keys(this.state.suggestedItems).map(item =>(
                        <div className="suggested-items-style">
                            <div>{ this.dateChange(this.state.suggestedItems[item].date) }</div>
                            <div>{ this.state.suggestedItems[item].itemName }</div>
                            <div>{ this.state.suggestedItems[item].itemDescription }</div>
                        </div>
                       ))                     
                        
                    }
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
            if (prevProps.data !== this.props.data)
            {
                if (this.props.data !== null) {
                    var dicts;
                    dicts = this.populateDonations(this.props.data); 
                    this.setState({
                        donatedItemsDict: dicts[0],
                        suggestedItemsDict: dicts[1]
                    })
                    console.log(dicts);
                    }
            }
        }
    /* This function currently only works when you can only report a single donated item and a single suggested item per trip.
    It will need to be altered to allow for multiple donations per trip parsing */
    populateDonations(tripData) {

        var donatedItems = {};
        var donatedItemsList = [];
        var suggestedItems = {};
        var suggestedItemsList = [];
        var trips = tripData.trips;
        for (var i = 0; i < trips.length; i++) 
        {
            /* console.log("Number of trips: ", trips.length);
            console.log("TRIP: ", trips[i].donations);  */

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
                    suggestedItem["itemDescription"] = trips[i].donations[0].itemDescription;
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

            donatedItemsList.push(donatedItem);
            suggestedItemsList.push(suggestedItem);

        }       
        donatedItems["Art"] = donatedItemsList.filter(function(item) {
            return item.category === "Art";
        });
        donatedItems["Clothing"] = donatedItemsList.filter(function(item) {
            return item.category === "Clothing";
        })
        donatedItems["Education"] = donatedItemsList.filter(function(item) {
            return item.category === "Education";
        })
        donatedItems["Animal Welfare"] = donatedItemsList.filter(function(item) {
            return item.category === "Animal Welfare";
        })
        donatedItems["Food"] = donatedItemsList.filter(function(item) {
            return item.category === "Food";
        })
        donatedItems["Health"] = donatedItemsList.filter(function(item) {
            return item.category === "Health";
        })
        donatedItems["Household"] = donatedItemsList.filter(function(item) {
            return item.category === "Household";
        })
        donatedItems["Sports"] = donatedItemsList.filter(function(item) {
            return item.category === "Sports";
        })
        donatedItems["Miscellaneous"] = donatedItemsList.filter(function(item) {
            return item.category === "Miscellaneous";
        })
        /* SUGGESTED DONATIONS */
        suggestedItems["Art"] = suggestedItemsList.filter(function(item) {
            return item.category === "Art";
        });
        suggestedItems["Clothing"] = suggestedItemsList.filter(function(item) {
            return item.category === "Clothing";
        })
        suggestedItems["Education"] = suggestedItemsList.filter(function(item) {
            return item.category === "Education";
        })
        suggestedItems["Animal Welfare"] = suggestedItemsList.filter(function(item) {
            return item.category === "Animal Welfare";
        })
        suggestedItems["Food"] = suggestedItemsList.filter(function(item) {
            return item.category === "Food";
        })
        suggestedItems["Health"] = suggestedItemsList.filter(function(item) {
            return item.category === "Health";
        })
        suggestedItems["Household"] = suggestedItemsList.filter(function(item) {
            return item.category === "Household";
        })
        suggestedItems["Sports"] = suggestedItemsList.filter(function(item) {
            return item.category === "Sports";
        })
        suggestedItems["Miscellaneous"] = suggestedItemsList.filter(function(item) {
            return item.category === "Miscellaneous";
        })

        
        //console.log("Donated Items Dictionary: ", donatedItems);
        //console.log("Suggested Items Dictionary: ", suggestedItems);
        return [donatedItems, suggestedItems];
    }
    

    render() {
        //console.log("render: ", this.state.donatedItemsDict);
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