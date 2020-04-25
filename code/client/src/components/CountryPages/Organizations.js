import React from 'react';
import './Organizations.css';
import mapfiller from '../../images/map_filler.PNG';
import { Link } from 'react-router-dom';


class Organizations extends React.Component {
    constructor(props) {
        super(props);
        
        this.base_path_ORG = '/api/country-page/country/get-organizations?country=';
        this.getOrgs = this.getOrgs.bind(this);
    }

    getOrgs = async (country) => {
        let ping_orgs = this.base_path_ORG + country;
        console.log(ping_orgs);

        const response = await fetch(ping_orgs);
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

    render () {
        return (
            <div className="organizations">
                <div className="organizations-column1">
                    <div className="map-row">
                        <img src={ mapfiller } alt="map" className="map_image"/>
                    </div>
                    <div className="below-map-row">
                        <p>
                            Have a trip you'd like to share to CountryName? Click <Link to="/account" className="shareaccountlink">here</Link> to submit your info!
                        </p>
                    </div>
                </div>
                <div className="organizations-column2">
                    <h3 className="country-organizations-header">Organizations</h3>
                    <Link to="/some-organization" className="organization-links">Organization 1</Link>
                    <Link to="/some-organization" className="organization-links">Organization 2</Link>
                    <Link to="/some-organization" className="organization-links">Organization 3</Link>
                    <Link to="/some-organization" className="organization-links">Organization 4</Link>
                    <Link to="/some-organization" className="organization-links">Organization 5</Link>
                </div>
            </div>
        )
    }

}

export default Organizations;