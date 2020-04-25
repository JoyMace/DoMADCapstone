import React from 'react';
import './Tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CountryInfoComponent from '../CountryPages/CountryInfo';
import DonationItemsComponent from '../CountryPages/DonationItems';
import OrganizationsComponent from '../CountryPages/Organizations';
import BlogPostsComponent from '../CountryPages/BlogPosts';

// Batch import all flag files?????
//const flags = require.context('./flags', false);
//const flagPath = (name) => flags(name, true);


/* More to add???
    - fading tab animations
*/

class CountryTabs extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            tabIndex: 0,
            display: false, 
            errors: false
        };

        this.spacer_line = (<hr id='spacer-line'/>);
        this.spacer_desc = (<h6 id='spacer-desc'>Filter by choosing a continent, searching by country name, 
            or a combination of the two!<br/>Once a selection is made, relevant information will populate below.</h6>);
        
        this.loadCountry = this.loadCountry.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    // Invoked from parent passing down selected country name
    // Passes country to the loader handler
    loadCountry(country) {
        this.setState({
            active_name: (country.substring(0,1).toUpperCase() + country.substring(1)),
            display: false, errors: false, tabIndex: 0
        });

        this.fetchData(country);
    }

    /* Calls the 4 components serverside functions on country selection
        asynchronously after country info is returned
    */
    fetchData = async (country) => {
        const proms = [
            new Promise(resolve => this.refs.DonationsRef.getDonations(country)),
            new Promise(resolve => this.refs.BlogsRef.getBlogs(country)),
            /*new Promise(resolve=> this.refs.OrgsRef.getOrgs(country))*/
        ];
        // GET callback from CountryInfo
        this.refs.InfoRef.getInfo(country)
            .then(resp => { 
                this.setState({ 
                    display: true, 
                    active_name: resp[0],
                    active_abbr: resp[1]
                });
                // On successful fetch of country info, GET the other 3 tab's data
                return Promise.all(proms);
            })
            .then(loads => {
                console.log("Fetched donation data");
                console.log(loads);
                console.log("Fetched Blog information")
            })
            .catch(err => {
                this.setState({ errors: true, display: false });
                console.log(Error("Info GET failed:", err));
            });
    }
            

    handleTabChange = (Index, prevIndex) => {
        console.log(Index, prevIndex);

        if (Index === prevIndex) {
            return false
        } /*else {
            if (Index === 0) {

            }
            if (Index === 1) {
                
            }
            if (Index === 2) {
                
            }
            if (Index === 3) {
                
            }
        }*/
        this.setState({ tabIndex: Index });
    }


    render() {
        /*--- Construct and conditionally render tabs ---*/
        if (!this.state.errors) { 
            let dataStyles = { // initial
                display: (this.state.display ? 'flex' : 'none'),
                marginleft: '1%', marginright: '1%',
                transition: "visibility 0s, opacity 0.5s linear",
                transitionDuration: "0.2s", transitionDelay: "0"
            }

            // <Tabs selectedTabPanelClassName="" selectedTabClassName="">
            return ( 
                <div>
                {this.state.display ? this.spacer_line : this.spacer_desc}

                <div id='country-page-container' style={dataStyles}>
                    <Tabs selectedIndex={this.state.tabIndex} onSelect={(i,pi) => this.handleTabChange(i,pi)} 
                        forceRenderTabPanel={true}>
                        <TabList id="tabs-flexbox">
                            <li id="flag-wrap">
                                <img id="flag-img" src={'./flags/'+this.state.active_abbr+'.png'} alt="No Flag" />
                            </li>
                            <li id="name-wrap">
                                <p>{this.state.active_name}</p>
                            </li>
                            <Tab active="true" className="regular-tabs">Country Info</Tab>
                            <Tab className="regular-tabs">Donation Items</Tab>
                            <Tab className="regular-tabs">Organizations</Tab>
                            <Tab className="regular-tabs">Blog Posts</Tab>
                        </TabList>

                        <TabPanel tabIndex={0}>
                            <CountryInfoComponent ref='InfoRef' />
                        </TabPanel>
                        <TabPanel tabIndex={1}>
                            <DonationItemsComponent ref="DonationsRef" />
                        </TabPanel>
                        <TabPanel tabIndex={2}>
                            <OrganizationsComponent ref="OrgsRef" />
                        </TabPanel>
                        <TabPanel tabIndex={3}>
                            <BlogPostsComponent ref="BlogsRef" />
                        </TabPanel>
                    </Tabs>
                </div>
                </div>
            )
        }
        /*--- Errors found while loading data ---*/
        else { 
            return (
                <div>
                    <h2 id='spacer-desc'>An Error occured while attempting to load {this.state.active_name} 's data. Whoops!</h2>
                </div>
            )
        } 
    }
}

export default CountryTabs;