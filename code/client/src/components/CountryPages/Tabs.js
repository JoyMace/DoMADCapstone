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
            curCountry: 'none'
        };
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
                            <h3>{this.state.curCountry}</h3>
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