import React from 'react';
import './Tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CountryInfoComponent from '../CountryPages/CountryInfo';
import DonationItemsComponent from '../CountryPages/DonationItems';
import OrganizationsComponent from '../CountryPages/Organizations';
import BlogPostsComponent from '../CountryPages/BlogPosts';
//import { FaPassport } from 'react-icons/fa';


class CountryTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            active_country: '',
            active_abbr: '',
            tabIndex: 0,
            displaying: false, 
            isFetching: false, 
            hasErrors: false,
            infoData: null, blogData: null, orgData: null
        };
        this.fetchInfo = this.fetchInfo.bind(this);
        this.fetchDonationsBlogs = this.fetchDonationsBlogs.bind(this);
        this.fetchOrgs = this.fetchOrgs.bind(this);
}

    componentWillReceiveProps(props) {
        let new_country = props.selection;

        if (new_country !== null || new_country !== this.state.active_country) { //check a second time for same measure?
            //new_country = new_country.substring(0,1).toUpperCase() + new_country.substring(1); // normalized for fetching
            this.executeLoad(new_country)
                .then((res) => {
                    let new_info = [res[0]]; //Object.keys(res[0]).map(i => res[0][i]);
                    let new_blogs = res[1];
                    let new_orgs = res[2];
                    
                    this.setState({ 
                        displaying: true, 
                        isFetching: false,
                        hasErrors: false,
                        active_country: new_info[0].countryName,
                        active_abbr: new_info[1],
                        infoData: new_info,
                        blogData: new_blogs,
                        orgData: new_orgs
                    });
                });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.isFetching || nextState.infoData === null){
            return false;
        }
        return true;
    }


    /********* Main Loader******************/
    executeLoad = async (country) => {
        this.setState({ isFetching: true, displaying: false });

        const proms = [
            new Promise(resolve => resolve (this.fetchInfo(country))),
            new Promise(resolve => resolve(this.fetchDonationsBlogs(country))),
            new Promise(resolve => resolve(this.fetchOrgs(country)))
        ];
                                 
        console.log("getting data for", country);
            //this.infoJSON = info;
        return Promise.all(proms)
            .then(resp => {
                // React FLIPS OUT when an object is passed, so we make sure each is contained in an array???????
                let infoJSON = resp[0];
                let blogsJSON = resp[1];
                let orgJSON = resp[2];
                /*let infoJSON = resp[0];
                let blogsJSON = resp[1];
                let orgJSON = resp[2];*/
                return [infoJSON, blogsJSON, orgJSON];
            })
            .catch(err => {
                this.setState({ 
                    displaying: false,
                    errors: true
                });
                console.log(Error("Info GET failed:", err));
            });
    }

    /********* Data Fetching ***************/
    fetchInfo = async (country) => {
        let ping_CI = '/api/country-page/country/get-country-info?country=' + country;
        const response = await fetch(ping_CI);
        const data = await response.json();
        if (response.status !== 200) {
            throw Error(data.message);
        } else {
            return data.countryInfoData;
        }
    }

    // Data and trips are pulled from the same dataset
    fetchDonationsBlogs = async (country) => {
        let ping_DI = '/api/user/trip/all-trips?country=' + country;
        const response = await fetch(ping_DI);
        const data = await response.json();
        if (response.status !== 200) {
            throw Error(data.message);
        } else {
            return data.trips;
        }
    }

    fetchOrgs = async (country) => {
        return "Cannot find "+{country}+"organizations at this time.";
        /*let ping_OG = '/api/country-page/country/get-organizations?country=' + country;
        const response = await fetch(ping_OG);
        const data = await response.json();
        if (response.status !== 200) {
            throw Error(data.message);
        } else {
            return data; //. what??
        }*/
    }
/********************************* */

    handleTabChange = (Index, prevIndex) => {
        if (Index === prevIndex) {
            return false
        }
        this.setState({ tabIndex: Index });
    }

    render() {
        if (!this.state.hasErrors) { // && !this.state.isFetching
            let defaultStyles = { 
                display: (this.state.displaying ? 'flex' : 'none'),
                marginleft: '1%', marginright: '1%',
                transition: "visibility 0s, opacity 0.5s linear",
                transitionDuration: "0.2s", transitionDelay: "0"
            }
            let line_or_desc = ((this.state.displaying) ?
                (<hr id='spacer-line'/>) :
                (<h6 id='spacer-desc'>Filter by choosing a continent, searching by country name, 
                    or a combination of the two!<br/>Once a selection is made, relevant information will populate below.</h6>)
            );

            return (
                <div>
                {line_or_desc}
                
                <div id='country-page-container' style={defaultStyles}>
                    <div className="category-tabs">
                    <Tabs selectedIndex={this.state.tabIndex} onSelect={(i,pi) => this.handleTabChange(i,pi)} 
                        forceRenderTabPanel={true} >
                        <TabList id="tabs-flexbox">
                            <li id="flag-wrap">
                                {(this.state.active_abbr !== '')
                                    ? (<img id="flag-img" src={'./flags/'+this.state.active_abbr+'.png'} alt="No Flag" />)
                                    : (<div/>) }
                            </li>
                            <li id="name-wrap">
                                {this.state.active_country}
                            </li>
                            <Tab className="regular-tabs">Country Info</Tab>
                            <Tab className="regular-tabs">Donation Items</Tab>
                            <Tab className="regular-tabs">Organizations</Tab>
                            <Tab className="regular-tabs">Blog Posts</Tab>
                        </TabList>
    
                        <TabPanel tabIndex={0}>
                            <CountryInfoComponent ref='InfoRef' data={this.state.infoData} />
                        </TabPanel>
                        <TabPanel tabIndex={1}>
                            <DonationItemsComponent ref="DonationsRef" data={this.state.blogData} />
                        </TabPanel>
                        <TabPanel tabIndex={2}>
                            <OrganizationsComponent ref="OrgsRef" data={this.state.orgData} />
                        </TabPanel>
                        <TabPanel tabIndex={3}>
                            <BlogPostsComponent ref="BlogsRef" data={this.state} />
                        </TabPanel>
                    </Tabs>
                    </div>
                </div>
                </div>
            )
        }
        /*--- Errors found while loading data ---*/
        else { 
            return (
                <div>
                    <h2 id='spacer-desc'>An Error occured while attempting to load {this.state.active_country} 's data. Whoops!</h2>
                </div>
            )
        } 
    }
}

export default CountryTabs;