import React from 'react';
import './Tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CountryInfoComponent from '../CountryPages/CountryInfo';
import DonationItemsComponent from '../CountryPages/DonationItems';
import OrganizationsComponent from '../CountryPages/Organizations';
import BlogPostsComponent from '../CountryPages/BlogPosts';

import countryflag from '../../images/peruflag.png';

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
        let ping = '/api/user/get-country-info?country.name:'+country;
        /*var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            console.log(xhr.responseText);
        });
        xhr.open('GET', ping);*/
        const response = await fetch(ping);
        const data = await response.json();
        if (response.status !== 200) {
            throw Error(response.message)
        }
        if (data === null) {
            console.log("null data");
        } else {
            console.log(data);
        }
        
        return data;
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
            <div id="tabs-component" style={defaultStyles}>
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
        )
    }
}

export default CountryTabs;