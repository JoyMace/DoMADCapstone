import React from 'react';
import './Tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CountryInfoComponent from '../CountryPages/CountryInfo';
import DonationItemsComponent from '../CountryPages/DonationItems';
import OrganizationsComponent from '../CountryPages/Organizations';
import BlogPostsComponent from '../CountryPages/BlogPosts';

import countryflag from '../../images/peruflag.png';

const TabComponent = props => (
    <Tabs defaultIndex={2}>
        <div className="tabs-component">
            <div className="category-tabs">
                <TabList>
                    <div className="tab-style">
                        <Tab disabled className="country-flag-block">
                            <img src={ countryflag } alt="peru flag" className="flag_image"/>
                        </Tab>
                        <Tab disabled className="country-name-block">
                            <h3 className="country-name-text">Country Name</h3>
                        </Tab>
                        <Tab default className="regular-tabs">Country Info</Tab>
                        <Tab className="regular-tabs">Donation Items</Tab>
                        <Tab className="regular-tabs">Organizations</Tab>
                        <Tab className="regular-tabs">Blog Posts</Tab>
                    </div>
                </TabList>
                <TabPanel>
                    <CountryInfoComponent />
                </TabPanel>
                <TabPanel>
                    <CountryInfoComponent />
                </TabPanel>
                <TabPanel>
                    <CountryInfoComponent />
                </TabPanel>
                <TabPanel>
                    <DonationItemsComponent />
                </TabPanel>
                <TabPanel>
                    <OrganizationsComponent />
                </TabPanel>
                <TabPanel>
                    <BlogPostsComponent />
                </TabPanel>
            </div>
        </div>
    </Tabs>
);

export default TabComponent;