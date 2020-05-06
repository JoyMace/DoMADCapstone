import React from 'react';
import './Organizations.css';
import WorldMapImage from '../../images/Map_soon.svg';
import { Link } from 'react-router-dom';
import mapfiller from '../../images/map_filler.PNG'

class Organizations extends React.Component {
    constructor(props) {
        super(props);
        
        this.fillOrganisations = this.fillOrganisations.bind(this);
    }

    componentDidUpdate(props) {
        if (props.data !== null) {
            //console.log(props.data);
            /* populate data here */
            return;
        }
    }

    fillOrganisations(orgsJSON) {
        //console.log(orgsJSON);
        return;
    }

    render () {
        return (
            <div className="organizations">
                <div className="organizations-column1">
                    <div className="map-row">
                        <img src={ WorldMapImage } alt="map" className="map_image"/>
                    </div>
                    <div className="below-map-row">
                        <p>Have a trip you'd like to share? Log In or Register to submit your info!</p>
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