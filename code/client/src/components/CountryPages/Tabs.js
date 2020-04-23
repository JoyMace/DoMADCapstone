import React from 'react';
import './Tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CountryInfoComponent from '../CountryPages/CountryInfo';
import DonationItemsComponent from '../CountryPages/DonationItems';
import OrganizationsComponent from '../CountryPages/Organizations';
import BlogPostsComponent from '../CountryPages/BlogPosts';

import countryflag from '../../images/peruflag.png';
//import e from 'express';

class CountryTabs extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            active: false, 
            current_country: 'none',
            country_image_url: ''
        };

        this.getData = this.getData.bind(this);
        this.receiveCountry = this.receiveCountry.bind(this);
    }

    getData = async (country) => {
        console.log('country:', country);
        //let ping = '/api/country-page/country/get-country-info';

        // blogposts & donation items - OK
        // let ping_BP_DI = '/api/user/trip/all-trips?country=' + country;
        // Organizations - NOT WORKING
        // let ping_O = '/api/country-page/country/get-organizations?country=' + country;
        // country info - NOT WORKING
        
        try {
            let ping_CI = '/api/country-page/country/get-country-info?country=' + country;
            
            const response = await fetch(ping_CI);
            const data = await response.json();
            console.log('STATUS:', response.status);
            console.log('ERROR TEXT?:', data.message);

            if (response.status !== 200) {
                console.log("THROW");
                throw Error(data.message);
            }
            return data;

        } catch (error) {
            //console.log("CAUGHT ERROR: ", error);
            throw error;
        }
    }
    
    // Invoked from parent passing down selected country name
    receiveCountry(country) {
        // only do this once we grab the data
        this.setState({
            current_country: (country.substring(0,1).toUpperCase() + country.substring(1)),
            active: true
        });
        this.getData(country);
    }

    render() {
        let defaultStyles = {
            display: (this.state.active ? 'flex' : 'none'),
            marginright: '1%',
            marginleft: '1%',
            transition: "visibility 0s, opacity 0.5s linear",
            transitionDuration: "0.2s", transitionDelay: "0"
        }
        return (
        <div id='country-pages-wrapper'>
            <div id="tabs-wrapper" style={defaultStyles}>
                <Tabs>
                    <TabList className="tab-style">
                        <li className="country-flag-block">
                            <img src={countryflag} alt="peru flag" className="flag_image"/>
                        </li>
                        <li className="country-name-block">
                            <h3>{this.state.current_country}</h3>
                        </li>
                        <Tab active className="regular-tabs">Country Info</Tab>
                        <Tab className="regular-tabs">Donation Items</Tab>
                        <Tab className="regular-tabs">Organizations</Tab>
                        <Tab className="regular-tabs">Blog Posts</Tab>
                    </TabList>

                    <TabPanel tabIndex={0}>
                        <CountryInfoComponent />
                    </TabPanel>
                    <TabPanel tabIndex={1}>
                        <DonationItemsComponent />
                    </TabPanel>
                    <TabPanel tabIndex={2}>
                        <OrganizationsComponent />
                    </TabPanel>
                    <TabPanel tabIndex={3}>
                        <BlogPostsComponent />
                    </TabPanel>
            </Tabs>
            </div>
        </div>
        )
    }
}

export default CountryTabs;